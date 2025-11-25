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
	async function getProfile() {
		setMyProfile(await getMyProfile());
		setMyBookings(await getMybookings());
		setPassword("");
		setEmail("");
		setUsername("");
	}
	useEffect(() => {
		if (!loggedIn) {
			navigate("/");
		} else {
			getProfile();
			setUpdating(false);
		}
	}, [navigate]);

	if (updating) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 sm:p-6">
				<div className="w-full max-w-md bg-white shadow-xl rounded-xl p-5 sm:p-6 flex flex-col gap-4">
					<p className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
						Update Profile
					</p>

					{/* Email */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-700 font-medium">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter new email"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm
                   focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] focus:border-[rgb(6,214,160)]
                   transition"
						/>
					</div>

					{/* Username */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-700 font-medium">
							Username
						</label>
						<input
							type="text"
							value={username}
							placeholder="Enter new username"
							onChange={(e) => setUsername(e.target.value)}
							className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm
                   focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] focus:border-[rgb(6,214,160)]
                   transition"
						/>
					</div>

					{/* Password */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-700 font-medium">
							Password
						</label>
						<input
							type="password"
							value={password}
							placeholder="Enter new password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm
                   focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] focus:border-[rgb(6,214,160)]
                   transition"
						/>
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 mt-2">
						<button
							className="w-full sm:flex-1 py-2 bg-[rgb(6,214,160)] text-white font-semibold rounded-lg shadow
                   hover:bg-[rgb(4,180,135)] active:scale-95 transition"
							onClick={async () => {
								await updateProfile(email, username, password);
								getProfile();
							}}
						>
							Save Changes
						</button>

						<button
							className="w-full sm:flex-1 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow
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
		<div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 flex flex-col items-center gap-8 sm:gap-10">
			{/* Profile Card */}
			<div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-5 sm:p-6 flex flex-col gap-4">
				<p className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
					My Profile
				</p>

				<div className="flex flex-col gap-3 text-sm sm:text-base">
					<p>
						<span className="font-semibold text-gray-700">
							Username:
						</span>{" "}
						{myProfile.username}
					</p>

					<p>
						<span className="font-semibold text-gray-700">
							Email:
						</span>{" "}
						{myProfile.email}
					</p>

					<p>
						<span className="font-semibold text-gray-700">
							Joined:
						</span>{" "}
						{myProfile.createdAt
							? myProfile.createdAt.substring(0, 10)
							: ""}
					</p>

					<button
						className="mt-2 px-4 py-2 bg-[#073B4C] text-white font-semibold rounded-lg shadow 
						hover:bg-[#d93c60] active:scale-95 transition w-full sm:w-auto"
						onClick={() => setUpdating(true)}
					>
						Update Profile
					</button>
				</div>
			</div>

			{/* Bookings Section */}
			<div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
				<p className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
					My Bookings
				</p>

				{/* Bookings list */}
				<div className="flex flex-col gap-4">
					{myBookings.length > 0 ? (
						myBookings.map((b) => (
							<div
								key={b._id}
								className="
		w-full bg-gray-100 rounded-xl p-4 
		flex flex-col sm:flex-row 
		items-center sm:items-center 
		justify-between 
		text-center sm:text-left
		shadow gap-4
	"
							>
								{/* Left Section */}
								<div className="flex flex-col w-full sm:w-auto">
									<p className="text-lg sm:text-xl font-semibold capitalize text-gray-900">
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

								{/* Right Section */}
								<div
									className="
			flex flex-col 
			w-full sm:w-auto 
			text-center sm:text-right
		"
								>
									<p className="text-lg sm:text-xl font-bold text-gray-800">
										₹
										{b.type === "flight"
											? b.itemId.price
											: b.itemId.pricePerNight}
									</p>

									<p className="text-sm text-gray-600">
										{b.date ? b.date : "No date"}
									</p>

									<div className="flex justify-center sm:justify-end mt-3">
										<button
											className="
					px-4 py-2 bg-[#EF476F] text-white font-semibold 
					rounded-lg shadow hover:bg-[#d93c60] 
					active:scale-95 transition
				"
											onClick={() => {
												deleteBooking(b.itemId._id);
												getProfile();
											}}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="text-center text-gray-600">
							No bookings found!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
export default Profile;
