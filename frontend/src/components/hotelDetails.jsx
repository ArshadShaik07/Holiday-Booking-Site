import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

function HotelDetails() {
	const { id } = useParams();
	const { fetchHotelById, bookHotel, loggedIn } = useContext(AuthContext);
	const [hotelData, setHotelData] = useState({});
	const [date, setDate] = useState("");
	const [booked, setBooked] = useState(false);

	useEffect(() => {
		async function abc() {
			setHotelData(await fetchHotelById(id));
		}
		abc();
	}, []);
	console.log(hotelData);

	return (
		<div className="min-h-screen w-full flex justify-center items-center p-4 sm:p-6 bg-gray-50">
			<div
				className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden"
				style={
					{
						// keep your background image but let Tailwind handle sizing via inner element
					}
				}
			>
				{/* Background image + overlay */}
				<div
					className="relative w-full bg-cover bg-center"
					style={{
						backgroundImage:
							"url('https://plus.unsplash.com/premium_vector-1724302612226-05cd23f5c8f7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D')",
					}}
				>
					{/* overlay for readability */}
					<div className="absolute inset-0 bg-black/40"></div>

					{/* content placed above overlay */}
					<div className="relative p-6 sm:p-8 flex flex-col gap-4">
						{/* Hotel Name */}
						<p className="text-2xl sm:text-3xl font-bold text-white">
							{hotelData.name}
						</p>

						{/* City */}
						<p className="text-sm sm:text-base text-white/90 capitalize">
							📍 {hotelData.city}
						</p>

						{/* Divider */}
						<div className="border-b border-white/30 mt-1 mb-2"></div>

						{/* Price + Rooms */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div>
								<p className="text-sm text-white/80">
									Price per night
								</p>
								<p className="text-2xl sm:text-3xl font-semibold text-white">
									₹{hotelData.pricePerNight}
								</p>
							</div>

							<div className="text-right">
								<p className="text-sm text-white/80">
									Rooms available
								</p>
								<p className="text-xl sm:text-2xl font-semibold text-white">
									{hotelData.roomsAvailable}
								</p>
							</div>
						</div>

						{/* Date input */}
						<input
							type="date"
							value={date}
							onChange={(e) => {
								setDate(e.target.value);
							}}
							className="w-full sm:w-1/2 px-3 py-2 rounded-md border border-white/40 bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] transition"
						/>

						{/* Book Button */}
						<button
							className="w-full sm:w-auto py-3 px-6 bg-[rgb(6,214,160)] text-white font-semibold rounded-lg shadow hover:bg-[rgb(4,180,135)] transition active:scale-95"
							onClick={() => {
								if (date.length === 0) {
									alert("specify date for booking!");
								} else {
									if (loggedIn) {
										if (!booked) {
											bookHotel(
												hotelData._id,
												hotelData.pricePerNight,
												date
											);
											setBooked(true);
										}
									} else {
										alert("log in to book hotel!");
									}
								}
							}}
						>
							{booked ? "Hotel booked" : "Book This Hotel"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HotelDetails;
