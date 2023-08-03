import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

function Nav() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} sx={{ marginBottom: 3 }}>
				<Grid xs={12} lg={4} sx={{ padding: 0 }}>
					<Box
						display="flex"
						bgcolor="black"
						alignItems="center"
						justifyContent="center"
						height={123}
					>
						<img
							id="logo"
							src="https://www.tactacam.com/wp-content/themes/tactacam/library/images/logo.png"
							alt="Tactacam Hunting Camera"
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Nav;
