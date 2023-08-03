import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Home() {
	return (
		<div className="page-not-found">
			<Container maxWidth="lg">
				<Card variant="outlined">
					<CardContent>
						<Typography sx={{ fontSize: 18 }} color="text.primary">
							404 bro! Page not found n stuff!
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</div>
	);
}

export default Home;
