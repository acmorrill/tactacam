import React, { useState, useContext, useEffect, useCallback } from "react";
import PhotosContext from "../context/photosSearch";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import searchPhotos from "../unsplash_api";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function PhotosList() {
	const [photos, setPhotos] = useState([]);
	const [photosLoading, setPhotosLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [photosError, setPhotosError] = useState(null);
	const [page, setPage] = useState(0);
	const { query, color, orientation, setSelectedPhoto } =
		useContext(PhotosContext);
	const navigate = useNavigate();

	/////////////////////////////////////////////////
	// redraw everything if search params change
	useEffect(() => {
		setPage(0);
		setHasNextPage(true);
		setPhotos([]);
		setPhotosLoading(false);
		setPhotosError(null);
	}, [query, color, orientation]);

	//////////////////////////////////////////////////
	// figure the columns by breakpoint for responsive image grid
	const theme = useTheme();
	const largeOrBigger = useMediaQuery(theme.breakpoints.up("lg"));
	const mediumOrBigger = useMediaQuery(theme.breakpoints.up("md"));
	const smallOrBigger = useMediaQuery(theme.breakpoints.up("sm"));
	const imageCols = largeOrBigger
		? 5
		: mediumOrBigger
		? 3
		: smallOrBigger
		? 2
		: 1;

	/////////////////////////////////////////////////
	// do the actual photo search and loading state
	const fetchPhotos = useCallback(async () => {
		if (query !== "" && query.length > 3 && hasNextPage) {
			try {
				setPhotosLoading(true);
				setPhotosError(null);
				const searchData = await searchPhotos(
					query,
					color,
					orientation,
					page + 1
				);

				if (searchData.length === 0) {
					setHasNextPage(false);
				}

				setPhotos((photos) => [...photos, ...searchData]);
			} catch (e) {
				setPhotosError(e);
			} finally {
				setPhotosLoading(false);
			}
		}
	}, [query, color, orientation, page, hasNextPage]);

	/////////////////////////////////////////////////
	// setup the photo grid infinite scroll
	const fetchNextPhotos = useCallback(async () => {
		if (query !== "" && query.length > 3 && hasNextPage) {
			fetchPhotos();
			setPage(page + 1);
		}
	}, [query, page, fetchPhotos, hasNextPage]);
	const [sentryRef] = useInfiniteScroll({
		loading: photosLoading,
		hasNextPage: hasNextPage,
		onLoadMore: fetchNextPhotos,
		disabled: !!photosError,
		rootMargin: "0px 0px 400px 0px",
	});

	////////////////////////////////////////////
	// go to photo details page on click
	const onClickPhotoDetails = (e, photo) => {
		e.preventDefault();
		setSelectedPhoto(photo);
		navigate("/photos/photo-details");
	};

	/////////////////////////////////////////////
	// add a cool hover state for the images
	// in the grid for funzies
	const ImageListItemWithStyle = styled(ImageListItem)(({ theme }) => ({
		"&:hover": {
			cursor: "pointer",
			transition: "transform 250ms",
			transitionTimingFunction: "ease-out",
			transform: "scale(1.05)",
			border: "solid 1px #444",
			zIndex: 3000,
		},
	}));

	let photosList;
	if (photosError) {
		photosList = (
			<Container maxWidth="lg" sx={{ marginTop: 3 }}>
				<Card variant="outlined">
					<CardContent>
						<Typography
							variant="h3"
							color="text.primary"
							align="justify"
						>
							There was an error from the unsplash api
						</Typography>
					</CardContent>
				</Card>
			</Container>
		);
	} else {
		photosList = (
			<ImageList cols={imageCols} gap={8}>
				{photos.map((photo) => (
					<ImageListItemWithStyle
						key={photo.id}
						onClick={(e) => onClickPhotoDetails(e, photo)}
					>
						<img src={photo.urls.small} alt={photo.alt} />
						<ImageListItemBar
							title={
								(photo.width || "") +
								" x " +
								(photo.height || "")
							}
							subtitle={
								photo.description || photo.alt_description
							}
						/>
					</ImageListItemWithStyle>
				))}
			</ImageList>
		);
	}

	let loading;
	if (photosLoading) {
		loading = <CircularProgress size={200} thickness={4} />;
	}

	return (
		<section id="photos-list">
			<Box sx={{ flexgrow: 1 }}>{photosList}</Box>
			<Box
				ref={sentryRef}
				display="flex"
				alignItems="center"
				justifyContent="center"
				sx={{ flexgrow: 1 }}
			>
				{loading}
			</Box>
		</section>
	);
}

export default PhotosList;
