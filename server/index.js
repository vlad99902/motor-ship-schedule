const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.port || 3001;

app.use(express.json());
app.use(cors());

const scheduleRoutes = require('./routes/schedule.routes');

app.use('/api/', scheduleRoutes);

app.get('/', (req, res) => {
  res.send('Route not found');
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
