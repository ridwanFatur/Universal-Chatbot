import { useEffect, useState } from "react";
import type { PaginatedTextKnowledge, TextKnowledge } from "../../models/TextKnowledge";
import TextKnowledgeRepo from "../../repositories/TextKnowledgeRepo";
import { AddKnowledgeDialog } from "./components/AddKnowledgeDialog";
import { ViewKnowledgeDialog } from "./components/ViewKnowledgeDialog";
import { DeleteKnowledgeDialog } from "./components/DeleteKnowledgeDialog";
import ItemKnowledge from "./components/ItemKnowledge";
import PaginationView from "./components/PaginationView";
import LoadingView from "./components/LoadingView";
export default function KnowledgePage() {
	const [data, setData] = useState<PaginatedTextKnowledge | null>(null);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const pageSize = 5;
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showViewDialog, setShowViewDialog] = useState(false);
	const [selectedKnowledge, setSelectedKnowledge] = useState<TextKnowledge | null>(null);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await TextKnowledgeRepo.fetch(page, pageSize);
			setData(res);
		} catch (err) {
			console.error("Failed to fetch knowledge:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	const handleAddSuccess = () => {
		fetchData();
	};

	const handleDeleteSuccess = () => {
		fetchData();
	};


	return <main className="w-full h-full flex flex-col">
		<div className="w-full flex-1 p-6 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8 flex md:items-center md:justify-between md:flex-row flex-col space-y-2">
					<div>
						<h1 className="text-3xl font-bold text-gray-800 mb-2">AI Knowledge Base</h1>
						<p className="text-gray-600">
							Add custom knowledge to enhance your assistant's responses.
						</p>
					</div>

					<button
						onClick={() => { 
							setShowAddDialog(true)
						}}
						className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
					>
						Add Knowledge
					</button>
				</div>


				{
					loading ? <LoadingView /> :
						!data || data.items.length === 0 ?
							<>
								<div className="flex flex-col items-center justify-center py-20">
									<div className="w-24 h-24 mb-6 text-gray-300">
										<svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
											<path d="M9 2a1 1 0 000 2h6a1 1 0 100-2H9z" />
											<path fillRule="evenodd" d="M4 5a2 2 0 012-2h1a1 1 0 000 2H6v6.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V5z" clipRule="evenodd" />
											<path d="M7.5 5h9A1.5 1.5 0 0118 6.5v11a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 17.5v-11A1.5 1.5 0 017.5 5z" />
										</svg>
									</div>
									<h3 className="text-xl font-semibold text-gray-700 mb-2">No Knowledge Found</h3>
									<p className="text-gray-500 text-center max-w-md">
										You haven't added any knowledge data yet. Start by creating a new one.
									</p>
								</div>
							</> :
							data != null && <>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{data.items.map((item: TextKnowledge) => (
										<ItemKnowledge item={item} key={item.id}
											onDelete={() => {
												setSelectedKnowledge(item)
												setShowDeleteDialog(true)
											}}
											onView={() => {
												setSelectedKnowledge(item)
												setShowViewDialog(true)
											}}
										/>
									))}
								</div>

								<PaginationView
									prevPage={() => {
										setPage((prev) => Math.max(prev - 1, 1))
									}}
									nextPage={() => {
										setPage((prev) => prev + 1)
									}}
									page={page}
									data={data}
								/>
							</>
				}
			</div>
		</div>
		<AddKnowledgeDialog
			isOpen={showAddDialog}
			onClose={() => setShowAddDialog(false)}
			onSuccess={handleAddSuccess}
		/>

		<ViewKnowledgeDialog
			isOpen={showViewDialog}
			onClose={() => setShowViewDialog(false)}
			knowledge={selectedKnowledge}
		/>

		<DeleteKnowledgeDialog
			isOpen={showDeleteDialog}
			onClose={() => setShowDeleteDialog(false)}
			onSuccess={handleDeleteSuccess}
			knowledge={selectedKnowledge}
		/>
	</main>
}