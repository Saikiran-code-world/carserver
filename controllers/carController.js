const Car = require("../models/Car");
const mongoose = require("mongoose");

const addCar = async (req, res) => {
  const {
    name,
    segment,
    fuel,
    transmission,
    seaterType,
    price,
    available,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File Not Found" })
  }
  const picture = `/uploads/${req.file.filename}`;

  try {
    if (!name || !segment || !fuel || !transmission || !seaterType || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newCar = new Car({
      carImage: picture,
      name,
      segment,
      fuel,
      transmission,
      seaterType,
      price,
      available,
    });
    await newCar.save();
    return res
      .status(201)
      .json({ success: true, message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error in add car controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    if (!cars || cars.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cars available", cars: [] });
    } else {
      return res.status(200).json({ success: true, cars });
    }
  } catch (error) {
    console.error("Error in get all cars controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//getting a single car

const getSingleCar = async (req, res) => {
  const { id } = req.params; // Get car ID from URL parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid car ID" });
  }

  try {
    const car = await Car.findById(id); // Find the car by ID

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    return res.status(200).json({ success: true, car });
  } catch (error) {
    console.error("Error in get single car controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const updateCar = async (req, res) => {
  const { carId } = req.params; // Get carId from URL parameters
  const {
    carImage,
    name,
    segment,
    fuel,
    transmission,
    seaterType,
    price,
    available,
  } = req.body;

  try {
    const picture = req.file ? req.file.path : carImage; // If no file uploaded, fallback to carImage URL
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      {
        carImage: picture,
        name,
        segment,
        fuel,
        transmission,
        seaterType,
        price,
        available,
      },
      { new: true } // Return the updated car object
    );

    if (!updatedCar) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error in update car controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Delete Car
const deleteCar = async (req, res) => {
  const { carId } = req.params; // Get carId from URL parameters
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Car deleted successfully", deletedCar });
  } catch (error) {
    console.error("Error in delete car controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = { addCar, getAllCars, getSingleCar, updateCar, deleteCar };
