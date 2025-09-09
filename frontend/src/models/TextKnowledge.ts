export interface TextKnowledge {
	id: number;
	title: string;
	content: string;
	created_at: string;
}

export interface TextKnowledgeCreate {
	title: string;
	content: string;
}

export interface PaginatedTextKnowledge {
	page: number;
	page_size: number;
	total: number;
	items: TextKnowledge[];
}