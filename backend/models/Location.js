const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
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
        type: [Number], // [longitude, latitude]
        required: true
      }
    },
    type: {
        type: String,
        default: 'College'
    },
    streams: [{
        type: String
    }],
    distance: {
        type: Number // pre-calculated or virtual field in some contexts, but storing for simplicity if needed, though usually calc'd
    }
  },
  {
    timestamps: true,
  }
);

locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
