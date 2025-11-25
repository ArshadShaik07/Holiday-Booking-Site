import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Home() {
	const navigate = useNavigate();
	const { loggedIn, setLoggedIn, handleLogout } = useContext(AuthContext);

	return (
		<div className="min-h-[calc(100vh-64px)] bg-gray-200 flex flex-col">
			{/* HEADER */}
			<header className="w-full py-6 px-4 sm:px-6 md:px-16">
				<div className="max-w-6xl mx-auto flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-3">
						<div
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white"
							style={{
								background: `linear-gradient(120deg,rgb(255,209,102) ,rgb(6,214,160))`,
							}}
						>
							TM
						</div>
						<div>
							<div className="font-semibold text-lg sm:text-xl">
								TravelMate
							</div>
							<div className="text-xs sm:text-sm">
								Flights • Hotels
							</div>
						</div>
					</div>

					{/* Desktop Nav */}
					<nav className="hidden sm:flex items-center gap-4 text-sm">
						<Link
							to="/flights"
							className="px-2 sm:px-3 py-2 rounded hover:opacity-90"
						>
							Flights
						</Link>
						<Link
							to="/hotels"
							className="px-2 sm:px-3 py-2 rounded hover:opacity-90"
						>
							Hotels
						</Link>

						<button
							className="px-3 py-2 rounded font-medium cursor-pointer"
							onClick={() => {
								if (loggedIn) {
									navigate("/");
									setLoggedIn(false);
									handleLogout();
								} else {
									navigate("/register");
								}
							}}
						>
							{loggedIn ? "Log-out" : "Sign in"}
						</button>
					</nav>
				</div>
			</header>

			{/* MAIN */}
			<main className="flex-1 w-full px-4 sm:px-6 md:px-16">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
					{/* Left Text Section */}
					<div>
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
							Make your next trip unforgettable
						</h1>

						<p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">
							Search and book flights and hotels quickly. Clean
							interface, fast results — no clutter.
						</p>

						{/* Buttons */}
						<div className="mt-6 flex flex-wrap gap-3">
							<Link
								to="/flights"
								className="inline-block px-4 sm:px-5 py-3 rounded-lg shadow font-medium border-2 hover:bg-[rgb(255,209,102)] transition duration-300 text-center"
							>
								Search Flights
							</Link>

							<Link
								to="/hotels"
								className="inline-block px-4 sm:px-5 py-3 rounded-lg border font-medium hover:bg-[rgb(6,214,160)] transition duration-300 text-center"
							>
								Browse Hotels
							</Link>

							<a
								href="#features"
								className="inline-block px-4 py-3 rounded font-medium text-sm text-center"
							>
								Why TravelMate
							</a>
						</div>

						<div className="mt-4 text-xs sm:text-sm text-gray-500">
							Tip: short names like{" "}
							<span className="font-medium">goa</span> or{" "}
							<span className="font-medium">mumbai</span> work
							well for quick searches.
						</div>
					</div>

					{/* Right Card */}
					<aside className="bg-gray-100 p-5 sm:p-6 rounded-xl shadow-md">
						<div className="flex items-start justify-between gap-4">
							<div>
								<div className="text-sm font-semibold">
									Trusted by travellers
								</div>
								<div className="mt-2 text-xl sm:text-2xl font-bold">
									1M+
								</div>
								<div className="text-xs text-gray-500">
									bookings and counting
								</div>
							</div>

							<div className="text-right">
								<div className="text-sm font-semibold">
									Fast searches
								</div>
								<div className="mt-2 text-lg font-bold">
									~0.5s
								</div>
								<div className="text-xs text-gray-500">
									average response time
								</div>
							</div>
						</div>

						<hr className="my-4" />

						{/* Features */}
						<div
							id="features"
							className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm"
						>
							<div>
								<div className="font-semibold">Flights</div>
								<div className="text-gray-500">
									₹ starting from 999
								</div>
							</div>
							<div>
								<div className="font-semibold">Hotels</div>
								<div className="text-gray-500">
									clean & comfy
								</div>
							</div>
							<div>
								<div className="font-semibold">Support</div>
								<div className="text-gray-500">24/7</div>
							</div>
						</div>
					</aside>
				</div>

				{/* PROMO CARDS */}
				<section className="max-w-6xl mx-auto mt-12 flex flex-col gap-5">
					<div className="bg-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold">
								✈
							</div>
							<div>
								<div className="font-semibold">
									Hot this week
								</div>
								<div className="text-sm text-gray-500">
									Cheap flights to goa & weekend hotel deals
								</div>
							</div>
						</div>

						<Link
							to="/flights"
							className="px-4 py-2 rounded font-medium bg-white border text-center"
						>
							View deals
						</Link>
					</div>

					<div className="bg-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold">
								🏨
							</div>
							<div>
								<div className="font-semibold">
									Hot this week
								</div>
								<div className="text-sm text-gray-500">
									Cheap hotels in dubai & goa
								</div>
							</div>
						</div>

						<Link
							to="/hotels"
							className="px-4 py-2 rounded font-medium bg-white border text-center"
						>
							View deals
						</Link>
					</div>
				</section>
			</main>

			{/* FOOTER */}
			<div className="py-6 px-4 sm:px-6">
				<div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
					<div>© {new Date().getFullYear()} TravelMate</div>
					<div className="flex gap-4">
						<Link to="/flights" className="underline">
							Flights
						</Link>
						<Link to="/hotels" className="underline">
							Hotels
						</Link>
						<a
							href="mailto:help@travelmate.example"
							className="underline"
						>
							Contact
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
