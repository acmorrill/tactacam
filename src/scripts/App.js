import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav";
import Photos from "./pages/photos";
import PhotoDetails from "./pages/photoDetails";
import NoMatch from "./pages/404";
import { PhotosSearchContextProvider } from "./context/photosSearch";

function App() {
	return (
		<>
			<Nav />
			<PhotosSearchContextProvider>
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/photos" replace />}
					/>
					<Route path="photos" element={<Photos />} />
					<Route
						path="photos/photo-details"
						element={<PhotoDetails />}
					/>
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</PhotosSearchContextProvider>
		</>
	);
}

export default App;
