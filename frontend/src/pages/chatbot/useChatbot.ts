import React, { useState, useRef, useEffect } from 'react';
import type { Message } from './chatbotTypes';
import ChatService from '../../websockets/ChatService';

export default function useChatbot() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const scrollToBottom = (): void => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		return () => {
			ChatService.disconnect();
		};
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setInput(e.target.value);

		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			const scrollHeight = textarea.scrollHeight;
			const maxHeight = 4 * 24;
			textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleSubmit = async (): Promise<void> => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = { role: 'user', content: input.trim() };
		const botMessage: Message = { role: 'assistant', content: '' };

		setMessages(prev => [...prev, userMessage, botMessage]);
		const currentInput = input.trim();
		setInput('');
		setIsLoading(true);

		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
		}

		try {
			await ChatService.sendMessage(currentInput, (newMessage) => {
				setMessages(prev => {
					const newMessages = [...prev];
					const lastMessage = newMessages[newMessages.length - 1];
					if (lastMessage.role === 'assistant') {
						lastMessage.content = newMessage;
					}
					return newMessages;
				});
			});
		} catch (error) {
			console.error('Error calling chat server');
			setMessages(prev => {
				const newMessages = [...prev];
				const lastMessage = newMessages[newMessages.length - 1];
				if (lastMessage.role === 'assistant') {
					lastMessage.content = `Error: Unable to connect to chat server. Please make sure the server is running and WebSocket connection is available.`;
				}
				return newMessages;
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		handleInputChange,
		handleKeyDown,
		messages,
		isLoading,
		messagesEndRef,
		handleSubmit,
		input,
		textareaRef,
	}
}