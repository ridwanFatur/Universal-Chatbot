export default function LoadingView() {
	return <div className="animate-pulse">
		<div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{[...Array(6)].map((_, i) => (
				<div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
					<div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
					<div className="space-y-2 mb-4">
						<div className="h-4 bg-gray-200 rounded"></div>
						<div className="h-4 bg-gray-200 rounded w-5/6"></div>
						<div className="h-4 bg-gray-200 rounded w-4/6"></div>
					</div>
					<div className="h-3 bg-gray-200 rounded w-1/3"></div>
				</div>
			))}
		</div>
	</div>

}