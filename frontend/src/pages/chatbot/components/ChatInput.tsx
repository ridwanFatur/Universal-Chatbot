import { Loader2, Send } from "lucide-react";

export default function ChatInput({
	isLoading,
	handleSubmit,
	input,
	handleInputChange,
	handleKeyDown,
	textareaRef
}: {
	isLoading: boolean
	handleSubmit: () => void
	input: string
	handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
	textareaRef: React.RefObject<HTMLTextAreaElement | null>
}) {
	return (
		<div className="bg-white border-t border-gray-200 p-4">
			<div className="flex gap-2 items-center">
				<div className="flex-1 relative flex items-center">
					<textarea
						ref={textareaRef}
						value={input}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder="Type your message..."
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-[45px] max-h-[96px] overflow-y-auto"
						rows={1}
						disabled={isLoading}
					/>
				</div>

				<button
					onClick={handleSubmit}
					disabled={!input.trim() || isLoading}
					className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center transition-colors"
				>
					{isLoading ? (
						<Loader2 className="w-5 h-5 animate-spin" />
					) : (
						<Send className="w-5 h-5" />
					)}
				</button>
			</div>

			<p className="text-xs text-gray-500 mt-2">
				Press Enter to send your message
			</p>
		</div>
	)
}