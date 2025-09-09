import ChatInput from "./components/ChatInput";
import useChatbot from "./useChatbot";
import MessageList from "./components/MessageList";

export default function ChatbotPage() {
	const {
		handleInputChange,
		handleKeyDown,
		messages,
		isLoading,
		messagesEndRef,
		handleSubmit,
		input,
		textareaRef,
	} = useChatbot();

	return <main className="w-full h-full flex flex-col">
		<MessageList
			messages={messages}
			isLoading={isLoading}
			messagesEndRef={messagesEndRef}
		/>

		<ChatInput
			isLoading={isLoading}
			handleSubmit={handleSubmit}
			input={input}
			handleInputChange={handleInputChange}
			handleKeyDown={handleKeyDown}
			textareaRef={textareaRef}
		/>
	</main>
}