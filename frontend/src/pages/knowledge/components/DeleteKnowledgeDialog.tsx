import { useState } from "react";
import TextKnowledgeRepo from "../../../repositories/TextKnowledgeRepo";
import type { TextKnowledge } from "../../../models/TextKnowledge";

interface DeleteKnowledgeDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	knowledge: TextKnowledge | null;
}

export function DeleteKnowledgeDialog({
	isOpen,
	onClose,
	onSuccess,
	knowledge,
}: DeleteKnowledgeDialogProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleDelete = async () => {
		if (!knowledge?.id) return;

		setLoading(true);
		setError('');

		try {
			await TextKnowledgeRepo.delete(knowledge.id);
			onSuccess();
			onClose();
		} catch (err) {
			setError('Failed to delete knowledge. Please try again.');
			console.error('Delete knowledge error:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setError('');
		onClose();
	};

	if (!isOpen || !knowledge) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
				<div className="px-6 py-4 border-b border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
							<svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<h2 className="text-lg font-semibold text-gray-800">Delete Knowledge</h2>
					</div>
				</div>

				<div className="px-6 py-4">
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<p className="text-gray-600 mb-4">
						Are you sure you want to delete this knowledge? This action cannot be undone.
					</p>

					<div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
						<h3 className="font-medium text-gray-800 text-sm">{knowledge.title}</h3>
						<p className="text-gray-600 text-xs mt-1 line-clamp-2">
							{knowledge.content}
						</p>
					</div>
				</div>

				<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
					<button
						onClick={handleClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
						disabled={loading}
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						disabled={loading}
						className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
					>
						{loading ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Deleting...
							</div>
						) : (
							'Delete'
						)}
					</button>
				</div>
			</div>
		</div>
	);
}