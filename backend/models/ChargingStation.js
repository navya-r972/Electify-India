const mongoose = require('mongoose');

const chargingStationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String, 
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    pricePerKw: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['AC', 'DC', 'Hybrid'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  },
  {
    timestamps: true,
  }
);

chargingStationSchema.index({ location: '2dsphere' });

const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema);

module.exports = ChargingStation;
