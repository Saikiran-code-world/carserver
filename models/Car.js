const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    carImage: {  
      type: String,
      required: true
    },
    name: {  // The name of the car eg toyoto honda
      type: String,
      required: true,
    },
    segment: {  
      type: String,
      enum: ['SUV', 'XUV','Sedan', 'Hatchback', 'Coupe', 'Convertible'], 
      required: true
    },
     fuel: {  
      type: String,
      enum: ['petrol', 'diesel', 'cng', 'electric'],
      required: true
    },
    transmission: {  
      type: String,
      enum: ['manual', 'automatic'],
      required: true
    },
    seaterType: { 
      type: String,
      required: true
    },
    price: {  
      type: Number,
      required: true
    },
    available: {  
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }  // Adding timestamps for createdAt and updatedAt
);

module.exports = mongoose.model('Car', carSchema);
