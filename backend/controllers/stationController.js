const ChargingStation = require('../models/ChargingStation');

// @desc    Get all charging stations
// @route   GET /api/stations
// @access  Public
const getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single charging station
// @route   GET /api/stations/:id
// @access  Public
const getStationById = async (req, res) => {
    try {
        const station = await ChargingStation.findById(req.params.id);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create a charging station
// @route   POST /api/stations
// @access  Private
const createStation = async (req, res) => {
    try {
        const { name, latitude, longitude, address, status, pricePerKw, type } = req.body;

        if (!name || !latitude || !longitude || !address || !pricePerKw || !type) {
             return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const station = await ChargingStation.create({
            name,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude] // GeoJSON format: [long, lat]
            },
            address,
            status,
            pricePerKw,
            type,
            createdBy: req.user.id
        });

        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a charging station
// @route   PUT /api/stations/:id
// @access  Private
const updateStation = async (req, res) => {
    try {
        const station = await ChargingStation.findById(req.params.id);

        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        // Check for user
        if (!req.user) {
             return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the station creator (optional requirement, but good practice)
        // if (station.createdBy.toString() !== req.user.id) {
        //     return res.status(401).json({ message: 'User not authorized' });
        // }
        // Allowing update for now if authenticated

        const { name, latitude, longitude, address, status, pricePerKw, type } = req.body;
        
        // Construct update object
        const updateData = {
            name,
            address,
            status,
            pricePerKw,
            type
        };

        if (latitude && longitude) {
            updateData.location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        }

        const updatedStation = await ChargingStation.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedStation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a charging station
// @route   DELETE /api/stations/:id
// @access  Private
const deleteStation = async (req, res) => {
    try {
        const station = await ChargingStation.findById(req.params.id);

        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the station creator
        // if (station.createdBy.toString() !== req.user.id) {
        //     return res.status(401).json({ message: 'User not authorized' });
        // }

        await station.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
