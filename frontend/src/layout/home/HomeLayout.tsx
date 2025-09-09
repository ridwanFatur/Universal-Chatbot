import { Outlet, Link } from "react-router-dom";
import { Bot, FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomeLayout() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="w-full  h-dvh  flex flex-col md:flex-row">
			<header className="fixed top-0 left-0 w-full z-30 flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200 md:hidden h-16">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
						<Bot className="w-5 h-5 text-white" />
					</div>
					<h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
				</div>

				<button
					onClick={toggleMobileMenu}
					className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
					aria-label="Toggle menu"
				>
					<Menu className="w-6 h-6 text-gray-700" />
				</button>
			</header>

			{isMobileMenuOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm  z-40"
					onClick={closeMobileMenu}
				/>
			)}

			<nav
				className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
					}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
							<Bot className="w-5 h-5 text-white" />
						</div>
						<h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
					</div>
					<button
						onClick={closeMobileMenu}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
						aria-label="Close menu"
					>
						<X className="w-5 h-5 text-gray-700" />
					</button>
				</div>

				<div className="flex flex-col p-4 gap-2">
					<Link
						to="/chatbot"
						onClick={closeMobileMenu}
						className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
					>
						<Bot className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
						<span className="text-sm font-medium text-gray-700">Chatbot</span>
					</Link>

					<Link
						to="/knowledge"
						onClick={closeMobileMenu}
						className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
					>
						<FileText className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
						<span className="text-sm font-medium text-gray-700">Knowledge</span>
					</Link>
				</div>
			</nav>

			<nav className="hidden md:flex w-[100px] h-full bg-white shadow-lg border-r border-gray-200 flex-col items-center py-6">
				<div className="mb-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
					<Bot className="w-6 h-6 text-white" />
				</div>

				<div className="flex flex-col gap-4">
					<Link
						to="/chatbot"
						className="w-16 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-200 group"
					>
						<Bot className="w-6 h-6 text-blue-500 group-hover:text-blue-600 mb-1" />
						<span className="text-[10px] text-gray-700 font-medium text-center leading-tight">
							Chatbot
						</span>
					</Link>

					<Link
						to="/knowledge"
						className="w-16 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-200 group"
					>
						<FileText className="w-6 h-6 text-blue-500 group-hover:text-blue-600 mb-1" />
						<span className="text-[10px] text-gray-700 font-medium text-center leading-tight">
							Knowledge
						</span>
					</Link>
				</div>

				<div className="flex-1"></div>
			</nav>

			<div className="flex-1 h-full md:h-full md:pt-0 pt-16">
				<Outlet />
			</div>
		</div>
	);
}
