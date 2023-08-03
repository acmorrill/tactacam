import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import PhotosContext from "../context/photosSearch";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Moment from "react-moment";

function PhotoCard() {
	const { selectedPhoto } = useContext(PhotosContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!selectedPhoto) {
			// go back to photos route if no photo is selected
			navigate("/photos");
		}
	}, [selectedPhoto, navigate]);

	if (!selectedPhoto) {
		return <div></div>;
	}

	return (
		<Card variant="outlined">
			<CardHeader
				title={
					(selectedPhoto.width || "") +
					" x " +
					(selectedPhoto.height || "")
				}
				subheader={
					selectedPhoto.description || selectedPhoto.alt_description
				}
			/>
			<Grid container spacing={0}>
				<Grid xs={12} md={8}>
					<CardContent>
						<CardMedia
							component="img"
							image={selectedPhoto.urls.regular}
							alt={selectedPhoto.alt_description}
						/>
					</CardContent>
				</Grid>
				<Grid xs={12} md={4}>
					<CardContent>
						<nav aria-label="main mailbox folders">
							<List>
								<ListItem disablePadding>
									<ListItemText
										primary="ID"
										secondary={selectedPhoto.id}
									/>
								</ListItem>
								<ListItem disablePadding>
									<ListItemText
										primary="Likes"
										secondary={selectedPhoto.likes}
									/>
								</ListItem>
								<ListItem disablePadding>
									<ListItemText
										primary="Color"
										secondary={selectedPhoto.color}
									/>
								</ListItem>
								<ListItem disablePadding>
									<ListItemText
										primary="Created At"
										secondary={
											<Moment format="MMM DD YYYY h:mm A">
												{selectedPhoto.created_at}
											</Moment>
										}
									/>
								</ListItem>
								<ListItem disablePadding>
									<ListItemText
										primary="Tags"
										secondary={selectedPhoto.tags.map(
											(tag, index) => {
												return (
													(index ? ", " : "") +
													tag.title
												);
											}
										)}
									/>
								</ListItem>
								<ListItem disablePadding>
									<ListItemText
										primary="Creator"
										secondary={
											selectedPhoto.user.first_name
										}
									/>
								</ListItem>
								<ListItem disablePadding>
									<ListItemText
										primary="Creator Bio"
										secondary={selectedPhoto.user.bio}
									/>
								</ListItem>
							</List>
						</nav>
					</CardContent>
				</Grid>
			</Grid>
		</Card>
	);
}

export default PhotoCard;
