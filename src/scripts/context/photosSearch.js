import React from "react";
import { createContext, useState } from "react";

const PhotosContext = createContext();

function PhotosSearchContextProvider({ children }) {
	const [searchKey, setSearchKey] = useState("");
	const [query, setQuery] = useState("");
	const [color, setColor] = useState("");
	const [orientation, setOrientation] = useState("");
	const [selectedPhoto, setSelectedPhoto] = useState("");

	const valueToShare = {
		searchKey,
		setSearchKey,
		query,
		setQuery,
		color,
		setColor,
		orientation,
		setOrientation,
		selectedPhoto,
		setSelectedPhoto,
	};

	return (
		<PhotosContext.Provider value={valueToShare}>
			{children}
		</PhotosContext.Provider>
	);
}

export { PhotosSearchContextProvider };
export default PhotosContext;
