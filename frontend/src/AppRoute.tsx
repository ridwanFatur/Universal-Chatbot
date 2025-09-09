import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import ChatbotPage from "./pages/chatbot/ChatbotPage";
import NotFoundPage from "./pages/not_found/NotFoundPage";
import HomeLayout from "./layout/home/HomeLayout";
import KnowledgePage from "./pages/knowledge/KnowledgePage";

export default function AppRoute() {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeLayout />} >
				<Route index element={<Navigate to="chatbot" replace />} />
				<Route path="chatbot" element={<ChatbotPage />} />
				<Route path="knowledge" element={<KnowledgePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
}