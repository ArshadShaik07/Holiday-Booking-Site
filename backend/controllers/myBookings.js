import { Booking } from "../models/bookings.model.js";

const getMybookings = async (req, res) => {
	const bookings = await Booking.find({ userId: req.user.id })
		.sort({ _id: -1 })
		.populate("itemId");
	if (!bookings) {
		return res.status(200).json({ message: "no bookings found" });
	}
	res.status(200).json(bookings);
};

const postBooking = async (req, res) => {
	const { type, itemId, price, date } = req.body;
	if (!itemId) throw Error("item id invalid");
	if (!["flight", "hotel"].includes(type)) {
		throw Error("type unavailable");
		return;
	}
	console.log(req.user.username);
	await Booking.create({
		userId: req.user.id,
		type,
		itemId,
		date: date,
		price,
	});

	res.status(201).json(`${type} booked successfully!`);
};

const delMybooking = async (req, res) => {
	const itemId = req.params.id;
	console.log(req.params.id);
	if (!itemId) throw Error("invalid item id!");

	const book = await Booking.deleteOne({ itemId: itemId });
	res.status(200).json({ message: "deleted succesfully!" });
};

export { getMybookings, postBooking, delMybooking };
