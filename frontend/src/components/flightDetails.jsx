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
	}, [id]);

	return (
		<div className="min-h-screen w-full bg-slate-50 flex justify-center items-center p-3 sm:p-8 pt-24 sm:pt-32">
			<div className="w-full max-w-lg bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-slate-100">
				<div className="h-2 bg-blue-600 w-full"></div>

				<div className="p-5 sm:p-10">
					<div className="flex justify-between items-start mb-6 sm:mb-10">
						<div>
							<span className="text-blue-600 font-black uppercase text-[9px] tracking-[0.2em]">
								Boarding Pass
							</span>
							<h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
								{flightData.airline}
							</h1>
						</div>
						<div className="text-2xl sm:text-4xl opacity-20 rotate-45">
							✈️
						</div>
					</div>

					<div className="flex items-center bg-slate-50 p-4 sm:p-8 rounded-2xl border border-slate-100 relative mb-6 sm:mb-8">
						<div className="flex flex-col items-start min-w-[60px] sm:min-w-[100px]">
							<span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
								From
							</span>
							<span className="text-lg sm:text-2xl font-black text-slate-900 capitalize">
								{flightData.from}
							</span>
						</div>

						<div className="flex-1 flex flex-col items-center px-2">
							<div className="w-full border-t-2 border-dashed border-slate-200 relative">
								<span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-50 px-1 text-sm sm:text-lg">
									🚀
								</span>
							</div>
						</div>

						<div className="flex flex-col items-end min-w-[60px] sm:min-w-[100px]">
							<span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
								To
							</span>
							<span className="text-lg sm:text-2xl font-black text-slate-900 capitalize">
								{flightData.to}
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
						<div className="space-y-0.5">
							<p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
								Departure
							</p>
							<p className="text-sm sm:text-lg font-bold text-slate-800">
								{flightData.date}
							</p>
						</div>
						<div className="text-right space-y-0.5">
							<p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
								Price
							</p>
							<p className="text-2xl sm:text-3xl font-black text-slate-900">
								₹{flightData.price}
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<button
							className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-lg transition-all active:scale-95 ${
								clicked
									? "bg-slate-100 text-slate-400 cursor-default shadow-none"
									: "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-100"
							}`}
							onClick={() => {
								if (!clicked) {
									if (
										bookFlight(
											flightData._id,
											flightData.price,
											flightData.date
										)
									) {
										setClicked(true);
									} else {
										setClicked(false);
									}
								}
							}}
						>
							{clicked ? "Confirmed ✓" : "Book Flight"}
						</button>

						{!clicked && (
							<p className="text-center text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
								One-way trip • TravelMate Protection included
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FlightsDetails;
