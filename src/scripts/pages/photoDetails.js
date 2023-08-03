import React, { useContext } from "react";
import PhotoCard from "../components/photoCard";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import PhotosContext from "../context/photosSearch";

function PhotoDetails() {
	const { setSelectedPhoto } = useContext(PhotosContext);

	const navigate = useNavigate();

	const onClick = (e) => {
		setSelectedPhoto(null);
		navigate("/photos");
	};

	return (
		<div className="photo-details">
			<Container maxWidth="lg">
				<Button
					variant="contained"
					startIcon={<ArrowBackIosIcon />}
					onClick={(e) => onClick(e)}
				>
					Back
				</Button>
				<PhotoCard />
			</Container>
		</div>
	);
}

export default PhotoDetails;
