import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
	const { loggedIn, handleLogout } = useContext(AuthContext);

	const [open, setOpen] = useState(false);

	return (
		<div className="sticky top-0 left-0 right-0 z-50 w-full px-4 sm:px-5 py-3 bg-[rgb(255,209,102)] shadow-md">
			{/* TOP BAR */}
			<div className="flex items-center justify-between">
				{/* Logo */}
				<div className="text-xl sm:text-2xl font-bold text-gray-800">
					<NavLink to="/">Travel Mate</NavLink>
				</div>

				{/* Desktop Links */}
				<div className="hidden md:flex gap-10 text-lg font-medium text-gray-800">
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/">Home</NavLink>
					</p>
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/flights">Flights</NavLink>
					</p>
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/hotels">Hotels</NavLink>
					</p>

					{!loggedIn && (
						<p className="hover:text-gray-900 cursor-pointer transition">
							<NavLink to="/login">Login</NavLink>
						</p>
					)}

					{!loggedIn && (
						<p className="hover:text-gray-900 cursor-pointer transition">
							<NavLink to="/register">Sign in</NavLink>
						</p>
					)}

					{loggedIn && (
						<p className="hover:text-gray-900 cursor-pointer transition">
							<NavLink to="/me">My Profile</NavLink>
						</p>
					)}

					{loggedIn && (
						<p className="hover:text-gray-900 cursor-pointer transition">
							<NavLink to="/" onClick={() => handleLogout()}>
								Log out
							</NavLink>
						</p>
					)}
				</div>

				{/* Hamburger for Mobile */}
				<button
					className="md:hidden text-3xl text-gray-800"
					onClick={() => setOpen(!open)}
				>
					☰
				</button>
			</div>

			{/* MOBILE MENU */}
			{open && (
				<div className="md:hidden mt-4 flex flex-col gap-4 text-lg font-medium text-gray-800">
					<NavLink
						className="hover:text-gray-900"
						onClick={() => setOpen(false)}
						to="/"
					>
						Home
					</NavLink>

					<NavLink
						className="hover:text-gray-900"
						onClick={() => setOpen(false)}
						to="/flights"
					>
						Flights
					</NavLink>

					<NavLink
						className="hover:text-gray-900"
						onClick={() => setOpen(false)}
						to="/hotels"
					>
						Hotels
					</NavLink>

					{!loggedIn && (
						<>
							<NavLink
								className="hover:text-gray-900"
								onClick={() => setOpen(false)}
								to="/login"
							>
								Login
							</NavLink>

							<NavLink
								className="hover:text-gray-900"
								onClick={() => setOpen(false)}
								to="/register"
							>
								Sign in
							</NavLink>
						</>
					)}

					{loggedIn && (
						<>
							<NavLink
								className="hover:text-gray-900"
								onClick={() => setOpen(false)}
								to="/me"
							>
								My Profile
							</NavLink>

							<NavLink
								className="hover:text-gray-900"
								onClick={() => {
									setOpen(false);
									handleLogout();
								}}
								to="/"
							>
								Log out
							</NavLink>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Navbar;
