const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pickupRoutes = require('./routes/requestRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const rewardReportRoutes = require('./routes/rewardReportRoutes');


//maleen's routes
const authRoutes = require('./routes/authRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', pickupRoutes);
app.use('/', signupRoutes);
app.use('/', loginRoutes);
app.use('/', profileRoutes);
app.use('/', rewardReportRoutes);

//maleen's routes
app.use('/', authRoutes);
app.use('/', rewardRoutes);
app.use('/', orderRoutes);
app.use('/', productRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});