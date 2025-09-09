export interface Message {
	role: 'user' | 'assistant';
	content: string;
}

export interface ChatCompletionResponse {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: {
		index: number;
		finish_reason: string | null;
		delta?: {
			content?: string;
		};
	}[];
}
