const Location = require('../models/Location');

// @desc    Get locations
// @route   GET /api/locations
// @access  Public
const getLocations = async (req, res) => {
  try {
    // Optional: Filter by vicinity if lat/long provided
    // For now, return all (or limit)
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed locations (for testing)
// @route   POST /api/locations/seed
// @access  Public (should be protected in prod)
const seedLocations = async (req, res) => {
    try {
        const sampleColleges = [
          {
            name: 'Government Degree College, Jammu',
            location: { type: 'Point', coordinates: [74.8570, 32.7266] },
            streams: ['Science', 'Arts']
          },
          {
            name: 'Government Women\'s College, Gandhi Nagar',
            location: { type: 'Point', coordinates: [74.8603, 32.7369] },
            streams: ['Science', 'Commerce']
          },
           // Add more from frontend list if needed
        ];

        await Location.deleteMany({}); // Clear existing
        await Location.insertMany(sampleColleges);

        res.status(201).json({ message: 'Locations seeded' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
  getLocations,
  seedLocations
};
