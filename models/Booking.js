const mongoose = require('mongoose');

// Booking schema
const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickUpDate: { type: Date, required: true },
  dropOffDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
