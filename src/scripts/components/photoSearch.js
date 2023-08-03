import React, { useContext, useRef, useEffect } from "react";
import { useState } from "react";
import PhotosContext from "../context/photosSearch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

let searchDelayTimer;
function Menu() {
	const {
		searchKey,
		setSearchKey,
		setQuery,
		color,
		setColor,
		orientation,
		setOrientation,
	} = useContext(PhotosContext);

	const inputRef = useRef(null); // reference to the search input so can set focus later

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const onQuerySearch = (e) => {
		// we don't search until a delay after we stop typing
		clearTimeout(searchDelayTimer);

		let query = "";
		if (e.target.value != null && e.target.value !== "") {
			query = e.target.value;
		}
		setSearchKey(query);

		// only set the query on a delay and if there are at least 3 characters
		if (query.length > 3) {
			searchDelayTimer = setTimeout(async () => {
				setQuery(query);
			}, 250);
		} else {
			searchDelayTimer = setTimeout(async () => {
				setQuery("");
			}, 250);
		}
	};

	return (
		<Container maxWidth="lg">
			<Card variant="outlined">
				<CardContent>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<TextField
							ref={inputRef}
							label="Search Photos"
							value={searchKey}
							onChange={(e) => onQuerySearch(e)}
						/>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="color-select-helper-label">
							Color
						</InputLabel>
						<Select
							labelId="color-select-helper-label"
							value={color}
							label="Color"
							onChange={(e) => {
								setColor(e.target.value);
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value="black_and_white">
								Black & White
							</MenuItem>
							<MenuItem value="black">Black</MenuItem>
							<MenuItem value="white">White</MenuItem>
							<MenuItem value="yellow">Yellow</MenuItem>
							<MenuItem value="orange">Orange</MenuItem>
							<MenuItem value="red">Red</MenuItem>
							<MenuItem value="purple">Purple</MenuItem>
							<MenuItem value="magenta">Magenta</MenuItem>
							<MenuItem value="green">Green</MenuItem>
							<MenuItem value="teal">Teal</MenuItem>
							<MenuItem value="blue">Blue</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="orientation-select-helper-label">
							Orientation
						</InputLabel>
						<Select
							labelId="orientation-select-helper-label"
							value={orientation}
							label="Orientation"
							onChange={(e) => {
								setOrientation(e.target.value);
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value="landscape">Landscape</MenuItem>
							<MenuItem value="portrait">Portrait</MenuItem>
							<MenuItem value="squarish">Squarish</MenuItem>
						</Select>
					</FormControl>
				</CardContent>
			</Card>
		</Container>
	);
}

export default Menu;
