import type { PaginatedTextKnowledge } from "../../../models/TextKnowledge";

export default function PaginationView({
	nextPage,
	prevPage,
	page,
	data
}: {
	nextPage: () => void,
	prevPage: () => void,
	page: number,
	data: PaginatedTextKnowledge
}) {
	return <>
		<div className="flex items-center justify-center mt-12">
			<div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				<button
					className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors cursor-pointer border-r border-gray-200"
					onClick={() => {
						prevPage()
					}}
					disabled={page === 1}
				>
					<div className="flex items-center gap-1">
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Previous
					</div>
				</button>

				<div className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
					<span className="text-blue-600 font-semibold">{data.page}</span> of {Math.ceil(data.total / data.page_size)}
				</div>

				<button
					className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors cursor-pointer"
					onClick={() => {
						nextPage()
					}}
					disabled={page >= Math.ceil(data.total / data.page_size)}
				>
					<div className="flex items-center gap-1">
						Next
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</button>
			</div>
		</div>

		<div className="text-center mt-4">
			<p className="text-sm text-gray-500">
				Showing {((data.page - 1) * data.page_size) + 1} to {Math.min(data.page * data.page_size, data.total)} of {data.total} results
			</p>
		</div>
	</>
}