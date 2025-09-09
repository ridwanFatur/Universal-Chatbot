import type { TextKnowledge } from "../../../models/TextKnowledge";

interface ItemKnowledgeProps {
	item: TextKnowledge;
	onDelete: () => void;
	onView: () => void;
}
export default function ItemKnowledge({ item, onDelete, onView }: ItemKnowledgeProps) {
	return (
		<div
			key={item.id}
			className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 group cursor-pointer"
		>
			<div className="flex items-start justify-between mb-3">
				<h2 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
					{item.title}
				</h2>
				<div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2 ml-2"></div>
			</div>

			<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
				{item.content}
			</p>

			<div className="flex items-center justify-between pt-3 border-t border-gray-100">
				<span className="text-xs text-gray-400 font-medium">
					{new Date(item.created_at).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</span>

				<div className="flex items-center gap-2">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onView();
						}}
						className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 cursor-pointer"
						title="View details"
					>
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							onDelete();
						}}
						className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
						title="Delete item"
					>
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>

					<div className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}