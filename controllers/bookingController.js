const Booking = require("../models/Booking");
const User = require("../models/User");
const Car = require("../models/Car");

const newBooking = async (req, res) => {
  const { carId, pickUpDate, dropOffDate } = req.body;
  const userId = req.user._id;

  try {
    const car = await Car.findById(carId);
    console.log(car);
    if (!car || !car.available) {
      return res
        .status(400)
        .json({ message: "car is not available for booking" });
      //validating the dates
    }
    

    // const pickUpDate = new Date(pickUpDate);
    // const dropOffDate = new Date(dropOffDate);

    if (new Date(pickUpDate) >= new Date(dropOffDate)) {
      return res.status(400).json({ message: "Invalid date range" });
    }
    //checking the car is available in the requested period
    const conflictingBooking = await Booking.findOne({
      carId,
      $or: [
        {
          pickUpDate: { $lte: new Date(dropOffDate) },
          dropOffDate: { $gte: new Date(pickUpDate) },
        },
      ],
    });

    if (conflictingBooking) {
      return res
        .status(400)
        .json({ message: "Car is already booked for the selected period" });
    }

    //if above all condtions are not satisfied the we can make a new booking

    const newBooking = new Booking({
        carId,
        userId,
        pickUpDate,
        dropOffDate,
        status: 'pending',
      });
      console.log(newBooking)
  
      await newBooking.save();
  
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }

// Function to get a specific booking
const getBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId).populate('carId').populate('userId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking status to canceled
    booking.status = 'canceled';
    await booking.save();

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { newBooking, getBooking, cancelBooking };


