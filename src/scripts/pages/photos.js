import PhotoSearch from "../components/photoSearch";
import PhotosList from "../components/photosList";

function Home() {
	return (
		<div className="photos">
			<PhotoSearch />
			<PhotosList />
		</div>
	);
}

export default Home;
