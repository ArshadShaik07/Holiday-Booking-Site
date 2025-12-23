import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
	const { loggedIn, handleLogout } = useContext(AuthContext);
	const [open, setOpen] = useState(false);

	const activeStyle = ({ isActive }) =>
		isActive
			? "text-gray-900 border-b-2 border-gray-900 pb-1"
			: "text-gray-700 hover:text-gray-900 transition-all";

	return (
		<nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl">
			<div className="bg-[rgb(255,209,102)] shadow-2xl rounded-2xl md:rounded-full px-4 sm:px-8 py-2.5 sm:py-3.5 border border-yellow-300/50 backdrop-blur-sm">
				<div className="flex items-center justify-between">
					<NavLink
						to="/"
						className="flex items-center gap-x-2 group shrink-0"
					>
						<div className="bg-white/40 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-sm">
							<img
								src="https://cdn-icons-png.flaticon.com/512/1566/1566062.png"
								className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
								alt="logo"
							/>
						</div>
						<span className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">
							Travel<span className="text-white">Mate</span>
						</span>
					</NavLink>

					<div className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] lg:text-xs font-black uppercase tracking-widest">
						<NavLink to="/" className={activeStyle}>
							Home
						</NavLink>
						<NavLink to="/flights" className={activeStyle}>
							Flights
						</NavLink>
						<NavLink to="/hotels" className={activeStyle}>
							Hotels
						</NavLink>

						<div className="h-5 w-[1.5px] bg-gray-800/10 mx-1"></div>

						{!loggedIn ? (
							<div className="flex items-center gap-3 lg:gap-5">
								<NavLink
									to="/login"
									className="text-gray-800 hover:opacity-60 transition-opacity"
								>
									Login
								</NavLink>
								<NavLink
									to="/register"
									className="bg-gray-900 text-white px-5 lg:px-7 py-2 lg:py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-lg active:scale-95"
								>
									Sign In
								</NavLink>
							</div>
						) : (
							<div className="flex items-center gap-5 lg:gap-7">
								<NavLink to="/me" className={activeStyle}>
									Profile
								</NavLink>
								<button
									onClick={() => handleLogout()}
									className="bg-gray-800/10 text-gray-800 border border-gray-800/5 px-4 lg:px-6 py-1.5 lg:py-2 rounded-full hover:bg-red-500 hover:text-white hover:border-transparent transition-all active:scale-95"
								>
									Log out
								</button>
							</div>
						)}
					</div>

					<button
						className="md:hidden p-1.5 rounded-xl hover:bg-yellow-200 transition-colors"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<span className="text-xl font-bold text-gray-800 px-1">
								✕
							</span>
						) : (
							<div className="space-y-1 w-5">
								<div className="h-0.5 w-full bg-gray-800 rounded-full"></div>
								<div className="h-0.5 w-3/4 bg-gray-800 rounded-full"></div>
								<div className="h-0.5 w-full bg-gray-800 rounded-full"></div>
							</div>
						)}
					</button>
				</div>

				{open && (
					<div className="md:hidden mt-3 pb-3 flex flex-col gap-3.5 border-t border-gray-800/10 pt-4 text-xs font-black uppercase tracking-widest text-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
						<NavLink
							onClick={() => setOpen(false)}
							to="/"
							className="px-2"
						>
							Home
						</NavLink>
						<NavLink
							onClick={() => setOpen(false)}
							to="/flights"
							className="px-2"
						>
							Flights
						</NavLink>
						<NavLink
							onClick={() => setOpen(false)}
							to="/hotels"
							className="px-2"
						>
							Hotels
						</NavLink>

						<div className="h-px bg-gray-800/5 w-full my-1"></div>

						{!loggedIn ? (
							<div className="flex flex-col gap-3">
								<NavLink
									onClick={() => setOpen(false)}
									to="/login"
									className="px-2"
								>
									Login
								</NavLink>
								<NavLink
									onClick={() => setOpen(false)}
									to="/register"
									className="bg-gray-900 text-white text-center py-3 rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
								>
									Sign in
								</NavLink>
							</div>
						) : (
							<div className="flex flex-col gap-3.5">
								<NavLink
									onClick={() => setOpen(false)}
									to="/me"
									className="px-2"
								>
									My Profile
								</NavLink>
								<button
									onClick={() => {
										setOpen(false);
										handleLogout();
									}}
									className="text-left px-2 text-red-600"
								>
									Log out
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
