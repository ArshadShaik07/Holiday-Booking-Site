import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
function FlightsDetails() {
	const { id } = useParams();
	const { fetchFlightById, bookFlight } = useContext(AuthContext);
	const [flightData, setFlightData] = useState({});
	const [clicked, setClicked] = useState(false);
	useEffect(() => {
		async function data() {
			setFlightData(await fetchFlightById(id));
		}
		data();
	}, []);

	return (
		<div className="min-h-screen w-full flex justify-center items-center p-6 bg-cover bg-center bg-no-repeat">
			<div
				className="w-full max-w-xl bg-white/70 rounded-xl shadow-xl p-6 flex flex-col gap-6"
				style={{
					backgroundImage:
						"url('https://media.istockphoto.com/id/1224570327/vector/paper-plane-creative-symbol-continuous-one-line-drawing-minimalist-style-vector-illustration.webp?a=1&b=1&s=612x612&w=0&k=20&c=sSHswdBRFqPrglLXTZ4bKDY60ZTfvD0J8Z0AyNcV_xo=')",
				}}
			>
				{/* Airline */}
				<p className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
					{flightData.airline}
				</p>

				{/* Route */}
				<div className="flex justify-between items-center">
					<div className="flex flex-col">
						<p className="text-gray-600 text-xs sm:text-sm">From</p>
						<p className="text-lg sm:text-xl font-semibold capitalize text-gray-900">
							{flightData.from}
						</p>
					</div>

					<p className="text-3xl sm:text-4xl font-light text-gray-500">
						→
					</p>

					<div className="flex flex-col text-right">
						<p className="text-gray-600 text-xs sm:text-sm">To</p>
						<p className="text-lg sm:text-xl font-semibold capitalize text-gray-900">
							{flightData.to}
						</p>
					</div>
				</div>

				{/* Date & Price */}
				<div className="flex justify-between items-center mt-4">
					<div>
						<p className="text-gray-600 text-xs sm:text-sm">Date</p>
						<p className="text-base sm:text-lg font-medium text-gray-900">
							{flightData.date}
						</p>
					</div>

					<div className="text-right">
						<p className="text-gray-600 text-xs sm:text-sm">
							Price
						</p>
						<p className="text-xl sm:text-2xl font-bold text-gray-900">
							₹{flightData.price}
						</p>
					</div>
				</div>

				{/* Button */}
				<button
					className="w-full py-3 bg-[rgb(6,214,160)] text-white rounded-lg font-semibold shadow hover:bg-[rgb(4,180,135)] transition active:scale-95"
					onClick={() => {
						if (!clicked) {
							bookFlight(
								flightData._id,
								flightData.pricePerNight,
								flightData.date
							);
							setClicked(true);
						}
					}}
				>
					{clicked ? "Flight booked" : "Book This Flight"}
				</button>
			</div>
		</div>
	);
}

export default FlightsDetails;
