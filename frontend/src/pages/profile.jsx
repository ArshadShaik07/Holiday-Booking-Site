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
	const [myBookings, setMyBookings] = useState([]);
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
	}, [navigate, loggedIn]);

	if (updating) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 pt-24 sm:pt-32">
				<div className="w-full max-w-md bg-white shadow-2xl rounded-[2rem] p-6 sm:p-10 border border-slate-100">
					<div className="text-center mb-6">
						<h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
							Settings
						</h2>
						<p className="text-xs sm:text-sm text-slate-500 font-medium">
							Update account details
						</p>
					</div>

					<div className="space-y-4">
						<div className="flex flex-col gap-1.5">
							<label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase ml-1">
								New Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="name@example.com"
								className="w-full bg-slate-50 border-2 border-transparent px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-sm font-bold text-slate-700"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase ml-1">
								New Username
							</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="adventure_seeker"
								className="w-full bg-slate-50 border-2 border-transparent px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-sm font-bold text-slate-700"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase ml-1">
								New Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full bg-slate-50 border-2 border-transparent px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-sm font-bold text-slate-700"
							/>
						</div>

						<div className="flex flex-col gap-2 pt-4">
							<button
								className="w-full py-3.5 bg-slate-900 text-white font-black rounded-xl shadow-lg hover:bg-blue-600 active:scale-95 transition-all text-sm"
								onClick={async () => {
									await updateProfile(
										email,
										username,
										password
									);
									getProfile();
								}}
							>
								Save Changes
							</button>
							<button
								className="w-full py-3 text-slate-400 font-bold text-sm hover:text-slate-600 transition-all"
								onClick={() => setUpdating(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 pt-24 sm:pt-32 flex flex-col items-center gap-8">
			<div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
				<div className="lg:col-span-4 bg-white shadow-xl rounded-[2rem] p-6 sm:p-8 border border-slate-100 flex flex-col items-center text-center">
					<div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-black mb-4">
						{myProfile.username
							? myProfile.username.charAt(0).toUpperCase()
							: "U"}
					</div>
					<h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
						{myProfile.username}
					</h2>
					<p className="text-xs sm:text-sm text-slate-400 font-bold mb-6">
						{myProfile.email}
					</p>

					<div className="w-full pt-4 border-t border-slate-50 space-y-3">
						<div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
							<span>Status</span>
							<span className="text-blue-600">Member</span>
						</div>
						<div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
							<span>Joined</span>
							<span className="text-slate-900">
								{myProfile.createdAt
									? myProfile.createdAt.substring(0, 10)
									: "N/A"}
							</span>
						</div>
					</div>

					<button
						className="mt-6 w-full py-3 bg-slate-50 text-slate-900 font-black rounded-xl hover:bg-slate-900 hover:text-white transition-all text-xs"
						onClick={() => setUpdating(true)}
					>
						Edit Profile
					</button>
				</div>

				<div className="lg:col-span-8 space-y-4">
					<div className="flex items-center justify-between px-2">
						<h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
							My Bookings
						</h2>
						<span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
							{myBookings.length}
						</span>
					</div>

					<div className="space-y-3">
						{myBookings.length > 0 ? (
							myBookings.map((b) => (
								<div
									key={b._id}
									className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
										<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-lg sm:text-xl shrink-0">
											{b.type === "hotel" ? "🏨" : "✈️"}
										</div>
										<div className="truncate">
											<p className="text-sm sm:text-base font-black text-slate-900 capitalize truncate">
												{b.type === "hotel"
													? b.itemId?.name
													: b.itemId?.airline}
											</p>
											<p className="text-[10px] sm:text-xs font-bold text-slate-400 capitalize truncate">
												{b.type === "hotel"
													? b.itemId?.city
													: `${b.itemId?.from} → ${b.itemId?.to}`}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-3 sm:gap-6 ml-2">
										<div className="hidden sm:flex flex-col text-right min-w-[80px]">
											<p className="text-sm font-black text-slate-900">
												₹
												{b.type === "flight"
													? b.itemId?.price
													: b.itemId?.pricePerNight}
											</p>
											<p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
												{b.date || "Reserved"}
											</p>
										</div>
										<button
											className="p-2.5 sm:p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all active:scale-90"
											onClick={() => {
												deleteBooking(b.itemId?._id);
												getProfile();
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
											</svg>
										</button>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-12 sm:py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
								<p className="text-slate-400 font-bold text-sm sm:text-lg">
									No adventures yet!
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
