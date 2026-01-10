const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/saved', require('./routes/savedRoutes'));
app.use('/api/fact-check', require('./routes/factCheckRoutes'));
app.use('/api/chat', require('./routes/chatbotRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
