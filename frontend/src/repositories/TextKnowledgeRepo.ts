import axiosClient from "../lib/axiosClient";
import type { PaginatedTextKnowledge, TextKnowledge, TextKnowledgeCreate } from "../models/TextKnowledge";

const TextKnowledgeRepo = {
	async create(data: TextKnowledgeCreate): Promise<TextKnowledge> {
		const res = await axiosClient.post<TextKnowledge>("/text-knowledge/", data);
		return res.data;
	},
	async delete(id: number): Promise<{ message: string }> {
		const res = await axiosClient.delete<{ message: string }>(`/text-knowledge/${id}`);
		return res.data;
	},

	async fetch(page = 1, page_size = 5): Promise<PaginatedTextKnowledge> {
		const res = await axiosClient.get<PaginatedTextKnowledge>("/text-knowledge/", {
			params: { page, page_size },
		});
		return res.data;
	},
}

export default TextKnowledgeRepo;