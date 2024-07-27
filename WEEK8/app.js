const express = require('express');
const app = express();
const port = 3000;

const apiRoutes = require('./routes/apiRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api', apiRoutes);
app.use('/upload', uploadRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
