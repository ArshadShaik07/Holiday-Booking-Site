import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useContext, useState } from "react";

function Profile() {
	const {
		loggedIn,
		getMyProfile,
		getMybookings,
		deleteBooking,
		updateProfile,
		updating,
		setUpdating,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const [myProfile, setMyProfile] = useState({});
	const [myBookings, setMyBookings] = useState({});
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	async function abd() {
		setMyProfile(await getMyProfile());
		setMyBookings(await getMybookings());
	}
	useEffect(() => {
		if (!loggedIn) {
			navigate("/");
		} else {
			abd();
		}
	}, [navigate, updating]);

	if (updating) {
		return (
			<div className="min-h-screen w-full flex justify-center items-center bg-gray-50 p-6">
				<div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 flex flex-col gap-5">
					<p className="text-2xl font-bold text-gray-800 text-center">
						Update Profile
					</p>

					{/* Email */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-700 font-medium">
							Email
						</label>
						<input
							type="email"
							val={email.length === 0 ? myProfile.email : email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter new email"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] 
                       focus:border-[rgb(6,214,160)] transition"
						/>
					</div>

					{/* Username */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-700 font-medium">
							Username
						</label>
						<input
							type="text"
							val={
								username.length === 0
									? myProfile.username
									: username
							}
							placeholder="Enter new username"
							onChange={(e) => setUsername(e.target.value)}
							className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] 
                       focus:border-[rgb(6,214,160)] transition"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-700 font-medium">
							Password
						</label>
						<input
							type="password"
							val={password}
							placeholder="Enter new password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] 
                       focus:border-[rgb(6,214,160)] transition"
						/>
					</div>

					{/* Buttons */}
					<div className="flex gap-3 mt-4">
						<button
							className="flex-1 py-2 bg-[rgb(6,214,160)] text-white font-semibold rounded-lg shadow 
                       hover:bg-[rgb(4,180,135)] active:scale-95 transition"
							onClick={() => {
								updateProfile(email, username, password);
								setEmail("");
								setUsername("");
								setPassword("");
							}}
						>
							Save Changes
						</button>

						<button
							className="flex-1 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow 
                       hover:bg-gray-400 active:scale-95 transition"
							onClick={() => setUpdating(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center gap-10">
			{/* Profile Card */}
			<div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
				<p className="text-3xl font-bold text-gray-800">My Profile</p>

				<div className="flex flex-col gap-2">
					<p className="text-lg">
						<span className="font-semibold text-gray-700">
							Username:
						</span>{" "}
						{myProfile.username}
					</p>
					<p className="text-lg">
						<span className="font-semibold text-gray-700">
							Email:
						</span>{" "}
						{myProfile.email}
					</p>
					<p className="text-lg">
						<span className="font-semibold text-gray-700">
							Joined:
						</span>{" "}
						{myProfile.createdAt
							? myProfile.createdAt.substring(0, 10)
							: ""}
					</p>
					<button
						className="px-4 py-2 bg-[#073B4C] text-white font-semibold rounded-lg shadow 
             hover:bg-[#d93c60] active:scale-99 transition"
						onClick={() => {
							setUpdating(true);
						}}
					>
						Update Profile
					</button>
				</div>
			</div>

			{/* Bookings Section */}
			<div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
				<p className="text-3xl font-bold text-gray-800">My Bookings</p>

				{/* Bookings list */}
				<div className="flex flex-col gap-4">
					{myBookings.length > 0 ? (
						myBookings.map((b) => (
							<div
								key={b._id}
								className="w-full bg-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow"
							>
								{/* Left: Type + Name */}
								<div className="flex flex-col">
									<p className="text-lg font-semibold capitalize text-gray-900">
										{b.type === "hotel"
											? b.itemId.name
											: b.itemId.airline}
									</p>
									<p className="text-sm text-gray-600 capitalize">
										{b.type === "hotel"
											? b.itemId.city
											: `${b.itemId.from} → ${b.itemId.to}`}
									</p>
								</div>

								{/* Right: Price + Date */}
								<div className="flex flex-col text-right mt-3 sm:mt-0">
									<p className="text-lg font-bold text-gray-800">
										₹
										{b.type === "flight"
											? b.itemId.price
											: b.itemId.pricePerNight}
									</p>
									<p className="text-sm text-gray-600">
										{b.date ? b.date : "No date"}
									</p>
									<div className="flex gap-2">
										<button
											className="px-4 py-2 bg-[#EF476F] text-white font-semibold rounded-lg shadow 
             hover:bg-[#d93c60] active:scale-95 transition"
											onClick={() => {
												console.log(b.itemId._id);
												deleteBooking(b.itemId._id);
												abd();
											}}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No bookings found!</p>
					)}
				</div>
			</div>
		</div>
	);
}
export default Profile;
