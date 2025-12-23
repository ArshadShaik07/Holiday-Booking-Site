import { useNavigate } from "react-router-dom";

function Flight({ flight }) {
	const navigate = useNavigate();

	return (
		<div
			className="w-full max-w-4xl bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
			onClick={() => navigate(`/flights/${flight._id}`)}
		>
			<div className="w-full md:w-48 h-32 md:h-28 overflow-hidden rounded-xl sm:rounded-[1.5rem] bg-gray-50 shrink-0">
				<img
					src="https://images.unsplash.com/vector-1753854003826-005be0c8cfe9?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="flight illustration"
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				/>
			</div>

			<div className="flex-1 w-full space-y-3 sm:space-y-4">
				<div className="flex justify-between items-start">
					<div>
						<p className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-[rgb(6,214,160)] mb-0.5 sm:mb-1">
							Confirmed Flight
						</p>
						<h3 className="text-lg sm:text-2xl font-black text-gray-900 leading-none">
							{flight.airline}
						</h3>
					</div>
					<div className="text-right">
						<p className="text-xl sm:text-3xl font-black text-gray-900">
							₹{flight.price}
						</p>
						<p className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase">
							Per traveler
						</p>
					</div>
				</div>

				<div className="flex justify-between items-center bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100/50">
					<div className="flex flex-col">
						<span className="text-[8px] sm:text-[10px] font-black uppercase text-gray-400 tracking-tighter">
							Departure
						</span>
						<span className="text-sm sm:text-lg font-bold text-gray-800 capitalize leading-tight">
							{flight.from}
						</span>
					</div>

					<div className="flex flex-col items-center flex-1 px-2 relative">
						<div className="w-full border-t border-dashed border-gray-300 absolute top-1/2"></div>
						<span className="relative bg-gray-50 px-2 text-xs sm:text-lg group-hover:translate-x-2 transition-transform">
							✈️
						</span>
					</div>

					<div className="flex flex-col text-right">
						<span className="text-[8px] sm:text-[10px] font-black uppercase text-gray-400 tracking-tighter">
							Arrival
						</span>
						<span className="text-sm sm:text-lg font-bold text-gray-800 capitalize leading-tight">
							{flight.to}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center pt-1 sm:pt-2">
					<div className="flex items-center gap-1.5 sm:gap-2">
						<span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[rgb(6,214,160)] animate-pulse"></span>
						<p className="text-[10px] sm:text-sm font-bold text-gray-500 italic">
							{flight.date}
						</p>
					</div>

					<button className="text-[10px] sm:text-sm font-black text-gray-900 flex items-center gap-1 group-hover:gap-3 transition-all">
						Details <span>→</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Flight;
