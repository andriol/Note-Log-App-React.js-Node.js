const express = require('express');
const app = express();
const cors = require('cors');
const noteRoute = require('./routes/Note');
require('dotenv').config();

const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());

app.use('/notes', noteRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
