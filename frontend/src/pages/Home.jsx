import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Home() {
	const navigate = useNavigate();
	const { loggedIn, setLoggedIn, handleLogout } = useContext(AuthContext);

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex flex-col pt-28">
			<main className="flex-1 w-full px-6 md:px-16">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					<div className="lg:col-span-7 space-y-8">
						<div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold animate-fade-in">
							<span>✨</span> New: Book International Trains next
							month!
						</div>

						<h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
							Travel smarter, <br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(255,209,102)] to-[rgb(6,214,160)]">
								go further.
							</span>
						</h1>

						<p className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
							The all-in-one platform to book your next escape.
							Quick searches, zero clutter, and the best prices
							guaranteed.
						</p>

						<div className="flex flex-wrap gap-4">
							<Link
								to="/flights"
								className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 hover:-translate-y-1 transition-all shadow-xl shadow-gray-200"
							>
								Find Flights ✈️
							</Link>
							<Link
								to="/hotels"
								className="px-8 py-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-900 font-bold text-lg hover:bg-gray-50 hover:-translate-y-1 transition-all"
							>
								Book Hotels 🏨
							</Link>
						</div>

						<div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
							<span>Popular:</span>
							<span className="text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
								Goa
							</span>
							<span className="text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
								Dubai
							</span>
							<span className="text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
								Paris
							</span>
						</div>
					</div>

					<aside className="lg:col-span-5 grid grid-cols-2 gap-4">
						<div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between h-48 hover:shadow-md transition-shadow">
							<div className="text-4xl">🌎</div>
							<div>
								<div className="text-3xl font-black text-gray-900">
									1M+
								</div>
								<div className="text-sm font-bold text-gray-400 uppercase">
									Users
								</div>
							</div>
						</div>
						<div className="bg-[rgb(6,214,160)] p-8 rounded-[2rem] text-white flex flex-col justify-between h-48 shadow-lg shadow-emerald-100">
							<div className="text-4xl">⚡</div>
							<div>
								<div className="text-3xl font-black">0.5s</div>
								<div className="text-sm  opacity-80 uppercase font-bold">
									Search Speed
								</div>
							</div>
						</div>
						<div className="col-span-2 bg-[rgb(255,209,102)] p-8 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-transform">
							<div>
								<h3 className="text-2xl font-black text-gray-900">
									24/7 Support
								</h3>
								<p className="text-gray-800 font-medium">
									We're here whenever you need us.
								</p>
							</div>
							<div className="bg-white/40 p-4 rounded-2xl text-2xl">
								📞
							</div>
						</div>
					</aside>
				</div>

				<section className="max-w-7xl mx-auto mt-24 mb-12">
					<h2 className="text-2xl font-black text-gray-900 mb-8 px-2">
						Trending Deals
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2.5rem] p-8 text-white">
							<div className="relative z-10 flex flex-col h-full justify-between gap-12">
								<div>
									<span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
										Limited Offer
									</span>
									<h3 className="text-3xl font-black mt-4">
										Blue Sky Weekend
									</h3>
									<p className="opacity-90 font-medium">
										Get 20% off on all coastal flights this
										week.
									</p>
								</div>
								<Link
									to="/flights"
									className="bg-white text-blue-600 w-fit px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
								>
									Claim Deal
								</Link>
							</div>
							<div className="absolute top-[-20%] right-[-10%] text-[15rem] opacity-10 group-hover:rotate-180 transition-transform duration-700">
								✈️
							</div>
						</div>

						<div className="group relative overflow-hidden bg-gradient-to-br from-[rgb(255,209,102)] to-orange-400 rounded-[2.5rem] p-8 text-gray-900">
							<div className="relative z-10 flex flex-col h-full justify-between gap-12">
								<div>
									<span className="bg-black/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
										Luxury Stay
									</span>
									<h3 className="text-3xl font-black mt-4">
										Paradise Found
									</h3>
									<p className="opacity-80 font-medium">
										Handpicked premium hotels with zero
										booking fees.
									</p>
								</div>
								<Link
									to="/hotels"
									className="bg-gray-900 text-white w-fit px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
								>
									Explore Hotels
								</Link>
							</div>
							<div className="absolute top-[-20%] right-[-10%] text-[15rem] opacity-10 group-hover:-rotate-12 transition-transform duration-700">
								🏨
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-gray-100 bg-white py-12 px-6">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex items-center gap-2">
						<img
							src="https://cdn-icons-png.flaticon.com/512/1566/1566062.png"
							className="w-7 h-7 object-contain"
							alt="logo"
						/>
						<span className="font-black text-xl tracking-tight text-gray-900">
							TravelMate
						</span>
					</div>

					<div className="flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
						<Link
							to="/flights"
							className="hover:text-gray-900 transition-colors"
						>
							Flights
						</Link>
						<Link
							to="/hotels"
							className="hover:text-gray-900 transition-colors"
						>
							Hotels
						</Link>
						<a
							href="#"
							className="hover:text-gray-900 transition-colors"
						>
							Support
						</a>
					</div>

					<div className="text-sm font-bold text-gray-400">
						© {new Date().getFullYear()} — Made for explorers.
					</div>
				</div>
			</footer>
		</div>
	);
}
