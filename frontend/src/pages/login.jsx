import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import CircularText from "../assets/circulartext.jsx";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
	const { email, setEmail, password, setPassword, handleLogin, loggedIn } =
		useContext(AuthContext);

	useEffect(() => {
		setEmail("");
		setPassword("");
	}, []);
	return (
		<div className="flex scale-50 md:scale-100 justify-center items-center min-h-screen p-4 min-w-screen bg-gray-300 relative">
			<div className="flex flex-col items-center gap-5 bg-gray-200 p-6 rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm">
				{/* Circular Logo */}
				<CircularText
					text="TRAVEL * MATE * "
					onHover="slowDown"
					spinDuration={30}
					className="scale-75"
				/>

				{/* Email Input */}
				<div className="w-full flex flex-col gap-1">
					<label className="text-sm font-bold text-gray-700 ml-1 w-full p-0 m-0">
						Enter Email id
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email"
						className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(17,138,178)] focus:border-[rgb(17,138,178)] transition"
					/>
				</div>

				{/* Password Input */}
				<div className="w-full flex flex-col">
					<label className="text-sm font-bold text-gray-700 ml-1 w-full p-0 m-0">
						Enter Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter password"
						onKeyDown={(e) => {
							if (
								email.length !== 0 &&
								password.length !== 0 &&
								e.key === "Enter"
							) {
								handleLogin();
							}
						}}
						className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(17,138,178)] focus:border-[rgb(17,138,178)] transition"
					/>
				</div>

				{/* Login Button */}
				<button
					onClick={() => {
						if (email.length !== 0 && password.length !== 0) {
							handleLogin();
						} else {
							alert("Fill details correctly");
						}
					}}
					className="w-full bg-[#FFD166] text-gray-900 py-2 rounded-lg font-semibold hover:bg-[#ffcc5c] transition shadow"
				>
					Log In
				</button>

				{/* Register Link */}
				<NavLink to="/register">
					<p className="text-sm text-gray-600 hover:text-gray-800 hover:-translate-y-0.5 transition mt-2 select-none cursor-pointer">
						Create a new account?
					</p>
				</NavLink>
			</div>
		</div>
	);
}

export default Login;
