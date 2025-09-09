import { Bot, Loader2, User } from "lucide-react"
import type { Message } from "../chatbotTypes"
import ReactMarkdown from "react-markdown";

export default function MessageList({
	messages,
	isLoading,
	messagesEndRef
}: {
	messages: Message[]
	isLoading: boolean
	messagesEndRef: React.RefObject<HTMLDivElement | null>
}) {
	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{messages.length === 0 && (
				<div className="text-center text-gray-500 mt-8">
					<Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
					<p className="text-lg">Your AI assistant is ready 👋</p>
					<p className="text-sm">Ask anything below and press Enter to begin.</p>
				</div>
			)}

			{messages.map((message, index) => (
				<div
					key={index}
					className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
						}`}
				>
					{message.role === "assistant" && (
						<div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
							<Bot className="w-5 h-5 text-white" />
						</div>
					)}

					<div
						className={`max-w-3xl px-4 py-2 rounded-lg whitespace-pre-wrap ${message.role === "user"
							? "bg-primary text-white rounded-br-sm"
							: "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
							}`}
					>
						<ReactMarkdown>{message.content.trim()}</ReactMarkdown>
						{message.role === "assistant" &&
							message.content === "" &&
							isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
					</div>

					{message.role === "user" && (
						<div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
							<User className="w-5 h-5 text-white" />
						</div>
					)}
				</div>
			))}
			<div ref={messagesEndRef} />
		</div>
	)

}