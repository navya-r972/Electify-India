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

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = 5001; // ✅ SAFE PORT

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

