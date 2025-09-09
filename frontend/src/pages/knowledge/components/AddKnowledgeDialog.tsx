import { useState } from 'react';
import TextKnowledgeRepo from '../../../repositories/TextKnowledgeRepo';

interface AddKnowledgeDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export function AddKnowledgeDialog({ isOpen, onClose, onSuccess }: AddKnowledgeDialogProps) {
	const [formData, setFormData] = useState({
		title: '',
		content: ''
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.title.trim() || !formData.content.trim()) {
			setError('Please fill in all fields');
			return;
		}

		setLoading(true);
		setError('');

		try {
			await TextKnowledgeRepo.create(formData);
			setFormData({ title: '', content: '' });
			onSuccess();
			onClose();
		} catch (err) {
			setError('Failed to create knowledge. Please try again.');
			console.error('Create knowledge error:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setFormData({ title: '', content: '' });
		setError('');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold text-gray-800">Add New Knowledge</h2>
						<button
							onClick={handleClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
						>
							<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div className="p-6">
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Title *
							</label>
							<input
								type="text"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
								placeholder="Enter knowledge title..."
								disabled={loading}
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Content *
							</label>
							<textarea
								value={formData.content}
								onChange={(e) => setFormData({ ...formData, content: e.target.value })}
								rows={8}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
								placeholder="Enter knowledge content..."
								disabled={loading}
							/>
						</div>

						<div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
							<button
								type="button"
								onClick={handleClose}
								className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
								disabled={loading}
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={loading}
								className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
							>
								{loading ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										Creating...
									</div>
								) : (
									'Create Knowledge'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}