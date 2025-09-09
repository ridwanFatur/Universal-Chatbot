import AppRoute from "./AppRoute"
import GlobalProvider from "./GlobalState"

function App() {
	return <>
		<GlobalProvider>
			<AppRoute />
		</GlobalProvider>
	</>
}

export default App
