import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Hotel from "../components/Hotel.jsx";

function Hotels() {
	const { fetchHotels, hotels } = useContext(AuthContext);
	const [city, setCity] = useState("");

	useEffect(() => {
		fetchHotels(city);
	}, []);

	return (
		<div className="flex flex-col min-h-[calc(100vh-64px)] items-center gap-6 p-4 sm:p-6 bg-gray-50">
			{/* Title */}
			<p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 text-center">
				Hotels
			</p>

			{/* Search Bar Container */}
			<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md">
				<input
					value={city}
					onChange={(e) => setCity(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && city.length !== 0) {
							fetchHotels(city);
							setCity("");
						}
					}}
					className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 
                       focus:border-yellow-400 transition"
					placeholder="Enter City"
				/>

				<button
					onClick={() => {
						if (city.length !== 0) {
							fetchHotels(city);
						} else {
							alert("Input field is empty");
						}
						setCity("");
					}}
					className="w-full sm:w-auto px-5 sm:px-6 py-2 rounded-lg 
                       bg-[rgb(22,158,204)] text-white font-semibold text-sm sm:text-base
                       shadow hover:bg-[rgb(19,139,179)] transition"
				>
					Search
				</button>
			</div>

			{/* All Hotels link */}
			<div>
				<p
					className="text-base sm:text-lg font-medium underline cursor-pointer"
					onClick={() => fetchHotels("")}
				>
					All hotels
				</p>
			</div>

			{/* Hotels List */}
			<div className="w-full max-w-7xl flex flex-col items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 px-2">
				{hotels.map((hotel) => (
					<Hotel hotel={hotel} key={hotel._id} />
				))}
			</div>
		</div>
	);
}

export default Hotels;
