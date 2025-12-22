import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
	const { loggedIn, handleLogout } = useContext(AuthContext);
	const [open, setOpen] = useState(false);

	// Active link styling
	const activeStyle = ({ isActive }) =>
		isActive
			? "text-gray-900 border-b-2 border-gray-900 pb-1"
			: "text-gray-700 hover:text-gray-900 transition-all";

	return (
		<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
			<div className="bg-[rgb(255,209,102)] shadow-xl rounded-xl md:rounded-full px-6 py-3 border border-yellow-300/50">
				<div className="flex items-center justify-between">
					<NavLink to="/" className="flex items-center gap-x-2 group">
						<div className=" p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
							<img
								src="https://cdn-icons-png.flaticon.com/512/1566/1566062.png"
								className="w-7 h-7 object-contain"
								alt="logo"
							/>
						</div>
						<span className="text-xl font-black text-gray-800 tracking-tight">
							Travel<span className="text-white">Mate</span>
						</span>
					</NavLink>

					<div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
						<NavLink to="/" className={activeStyle}>
							Home
						</NavLink>
						<NavLink to="/flights" className={activeStyle}>
							Flights
						</NavLink>
						<NavLink to="/hotels" className={activeStyle}>
							Hotels
						</NavLink>

						<div className="h-6 w-[1px] bg-gray-800/20 mx-2"></div>

						{!loggedIn ? (
							<div className="flex items-center gap-4">
								<NavLink
									to="/login"
									className="text-gray-800 hover:opacity-70"
								>
									Login
								</NavLink>
								<NavLink
									to="/register"
									className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition shadow-md"
								>
									Sign In
								</NavLink>
							</div>
						) : (
							<div className="flex items-center gap-6">
								<NavLink to="/me" className={activeStyle}>
									My Profile
								</NavLink>
								<button
									onClick={() => handleLogout()}
									className="bg-red-500/10 text-red-700 border border-red-200 px-4 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition"
								>
									Log out
								</button>
							</div>
						)}
					</div>

					<button
						className="md:hidden p-2 rounded-lg hover:bg-yellow-200 transition"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<span className="text-2xl font-bold">✕</span>
						) : (
							<div className="space-y-1.5 w-6">
								<div className="h-0.5 w-full bg-gray-800"></div>
								<div className="h-0.5 w-full bg-gray-800"></div>
								<div className="h-0.5 w-full bg-gray-800"></div>
							</div>
						)}
					</button>
				</div>

				{open && (
					<div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-gray-800/10 pt-4 font-bold text-gray-800">
						<NavLink onClick={() => setOpen(false)} to="/">
							Home
						</NavLink>
						<NavLink onClick={() => setOpen(false)} to="/flights">
							Flights
						</NavLink>
						<NavLink onClick={() => setOpen(false)} to="/hotels">
							Hotels
						</NavLink>
						<hr className="border-gray-800/10" />
						{!loggedIn ? (
							<>
								<NavLink
									onClick={() => setOpen(false)}
									to="/login"
								>
									Login
								</NavLink>
								<NavLink
									onClick={() => setOpen(false)}
									to="/register"
									className="bg-gray-800 text-white text-center py-3 rounded-xl"
								>
									Sign in
								</NavLink>
							</>
						) : (
							<>
								<NavLink
									onClick={() => setOpen(false)}
									to="/me"
								>
									My Profile
								</NavLink>
								<button
									onClick={() => {
										setOpen(false);
										handleLogout();
									}}
									className="text-left text-red-600"
								>
									Log out
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
