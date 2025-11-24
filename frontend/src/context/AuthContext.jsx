import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [hotels, setHotels] = useState([]);
	const [flights, setFlights] = useState([]);
	const [updating, setUpdating] = useState(false);
	async function handleRegister() {
		try {
			let res = await axios.post("http://localhost:3000/api/register", {
				email,
				username,
				password,
			});
			console.log(res.data.message);
			alert(`${res.data.message} please login now!`);
			navigate("/");
		} catch (e) {
			console.log(e.response.data.error);
			alert(e.response.data.error);
		}
		setEmail("");
		setUsername("");
		setPassword("");
	}

	async function handleLogin() {
		try {
			let res = await axios.post("http://localhost:3000/api/login", {
				email,
				password,
			});
			navigate("/");
			setLoggedIn(true);
			console.log(res.data);
			setAccessToken(res.data.accessToken);
			setRefreshToken(res.data.refreshToken);
		} catch (e) {
			console.error(e.response.data);
			alert(e.response.data.error);
			return;
		}
		setEmail("");
		setPassword("");
		alert("Logged in successfully");
	}

	async function handleLogout() {
		try {
			let res = await axios.post(
				"http://localhost:3000/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${refreshToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log(res.data);
			setLoggedIn(false);
		} catch (e) {
			console.error(e);
		}
	}

	async function updateProfile(email = "", username = "", password = "") {
		try {
			const updates = {};

			if (email.length !== 0) updates.email = email;
			if (username.length !== 0) updates.username = username;
			if (password.length !== 0) updates.password = password;

			let res = await axios.patch(
				"http://localhost:3000/api/me",
				updates,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			alert("updated successfully");
			console.log(res.data);
			setUpdating(false);
		} catch (e) {
			console.log(e.response);
		}
	}

	async function fetchHotels(city) {
		try {
			const res = await axios.get(
				`http://localhost:3000/api/hotels?city=${city}`
			);
			setHotels(res.data);
			console.log(res.data);
		} catch (e) {
			alert(e.response.data.error);
		}
	}

	async function fetchFlights(from = "", to = "", date = "") {
		try {
			const res = await axios.get(
				`http://localhost:3000/api/flights?from=${from}&to=${to}&date=${date}`
			);
			setFlights(res.data);
			console.log(res.data);
		} catch (e) {
			console.log(e.response.data.error);
			alert(e.response.data.error);
		}
	}
	async function fetchFlightById(id) {
		const res = await axios.get(`http://localhost:3000/api/flights/${id}`);
		return res.data;
	}

	async function fetchHotelById(id) {
		const res = await axios.get(`http://localhost:3000/api/hotels/${id}`);
		return res.data;
	}

	async function bookHotel(id, price, date) {
		try {
			const res = await axios.post(
				"http://localhost:3000/api/bookings",
				{
					type: "hotel",
					itemId: id,
					price,
					date,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(res.data);
		} catch (e) {
			console.log(e.response.data.error);
			if (e.response.data.error === "forbidden page!") {
				alert("login first to book hotels!");
			}
		}
	}

	async function bookFlight(id, price, date) {
		try {
			const res = await axios.post(
				"http://localhost:3000/api/bookings",
				{
					type: "flight",
					itemId: id,
					price,
					date,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(res.data);
		} catch (e) {
			console.log(e.response.data.error);
			if (e.response.data.error === "forbidden page!") {
				alert("login first to book flights!");
			}
		}
	}

	async function getMyProfile() {
		const res = await axios.get("http://localhost:3000/api/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return res.data;
	}

	async function getMybookings() {
		const res = await axios.get("http://localhost:3000/api/mybookings", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(res.data);
		return res.data;
	}

	async function deleteBooking(id) {
		const res = await axios.delete(
			`http://localhost:3000/api/bookings/${id}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		alert(res.data.message);
	}

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				email,
				setEmail,
				password,
				setPassword,
				username,
				setUsername,
				handleLogin,
				loggedIn,
				setLoggedIn,
				handleLogout,
				handleRegister,
				fetchHotels,
				hotels,
				setHotels,
				fetchFlights,
				flights,
				fetchFlightById,
				fetchHotelById,
				bookHotel,
				bookFlight,
				getMyProfile,
				getMybookings,
				deleteBooking,
				updateProfile,
				updating,
				setUpdating,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
