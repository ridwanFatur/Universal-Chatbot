import type { TextKnowledge } from "../../../models/TextKnowledge";

interface ViewKnowledgeDialogProps {
	isOpen: boolean;
	onClose: () => void;
	knowledge: TextKnowledge | null;
}

export function ViewKnowledgeDialog({ isOpen, onClose, knowledge }: ViewKnowledgeDialogProps) {
	if (!isOpen || !knowledge) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
								<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
							</div>
							<h2 className="text-xl font-semibold text-gray-800">Knowledge Details</h2>
						</div>
						<button
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
						>
							<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-500 mb-2">Title</label>
						<h1 className="text-2xl font-bold text-gray-800 leading-relaxed">
							{knowledge.title}
						</h1>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-500 mb-2">Content</label>
						<div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
							<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
								{knowledge.content}
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
							<p className="text-gray-700 text-sm">
								{new Date(knowledge.created_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit'
								})}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">ID</label>
							<p className="text-gray-700 text-sm font-mono">#{knowledge.id}</p>
						</div>
					</div>
				</div>

				<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}