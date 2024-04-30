const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:3000"
}));

const port = process.env.PORT || 4000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server started at http://localhost:%s', port);
});