interface ChatCompletionResponse {
	type: 'start' | 'chunk' | 'done' | 'error';
	content: string;
}

class ChatService {
	private ws: WebSocket | null = null;
	private isConnecting = false;

	private async connect(): Promise<WebSocket> {
		return new Promise((resolve, reject) => {
			if (this.ws?.readyState === WebSocket.OPEN) {
				resolve(this.ws);
				return;
			}

			if (this.isConnecting) {
				const checkConnection = () => {
					if (this.ws?.readyState === WebSocket.OPEN) {
						resolve(this.ws);
					} else if (!this.isConnecting) {
						reject(new Error('Connection failed'));
					} else {
						setTimeout(checkConnection, 100);
					}
				};
				checkConnection();
				return;
			}

			this.isConnecting = true;
			const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

			this.ws = new WebSocket(`${wsUrl}/chatbot/ws`);

			this.ws.onopen = () => {
				this.isConnecting = false;
				resolve(this.ws!);
			};

			this.ws.onerror = () => {
				this.isConnecting = false;
				console.error('WebSocket error');
				reject(new Error('WebSocket connection failed'));
			};

			this.ws.onclose = () => {
				this.isConnecting = false;
				this.ws = null;
			};
		})
	}

	async sendMessage(message: string, onNewMessage: (newMessage: string) => void): Promise<void> {
		try {
			const ws = await this.connect();
			let accumulatedContent = "";
			const messageHandler = (event: MessageEvent) => {
				try {
					const data: ChatCompletionResponse = JSON.parse(event.data);
					switch (data.type) {
						case 'start':
							accumulatedContent = "";
							break;
						case 'chunk':
							if (data.content) {
								accumulatedContent += data.content;
								onNewMessage(accumulatedContent);
							}
							break;
						case 'done':
							ws.removeEventListener('message', messageHandler);
							break;
						case 'error':
							onNewMessage(`Error: ${data.content}`);
							ws.removeEventListener('message', messageHandler);
							break;
						default:
							console.warn('Unknown message type:', data.type);
					}
				} catch (err) {
					console.error('Failed to parse WebSocket message:', err);
				}
			}

			ws.addEventListener('message', messageHandler);

			ws.send(JSON.stringify({
				query: message
			}));
		} catch (error) {
			console.error('Error sending message:', error);
			onNewMessage(`Error: Unable to connect to chat server. Please try again.`);
			throw error;
		}
	}


	disconnect(): void {
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
	}
}

export default new ChatService();