const express = require("express");
const carController = require("../controllers/carController");
const router = express.Router();
const upload = require("../multerConfig");
const adminToken = require("../middlewares/adminToken"); // Middleware to verify admin token

router.get("/", carController.getAllCars);

router.get("/:id", carController.getSingleCar);

router.post(
  "/add",
  adminToken,
  upload.single("carImage"),
  carController.addCar
);

router.patch(
  "/update/:carId",
  adminToken,
  upload.single("carImage"),
  carController.updateCar
);

router.delete("/delete/:carId", adminToken, carController.deleteCar);

module.exports = router;
















// const express = require("express");
// const carController=require("../controllers/carController");
// const router = express.Router();
// const upload = require("../multerConfig");
// const adminToken = require("../middlewares/adminToken"); // Middleware to verify admin token

// router.get("/",carController.getAllCars);
// router.get("/:id",carController.getSingleCar)
// router.post("/add", adminToken, upload.single('carImage'), carController.addCar);
// router.patch("/update/:carId", adminToken, upload.single('carImage'), carController.updateCar);
// router.delete("/delete/:carId", adminToken,carController.deleteCar);

// module.exports=router
