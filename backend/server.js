const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const router = require('./routes/userRoutes');
const { MongoMemoryServer } = require("mongodb-memory-server");
const multer = require('multer');
const path = require('path');

const USER_ROUTES = require("./routes/userRoutes");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "5mb",
    verify: (req, _, buff, __) => {
      req.bodyPlainText = buff.toString();
      return true;
    },
  })
);

router(app);

let server;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.post('/upload', upload.single('image'), (req, res) => {
  return res.status(200).send('File uploaded successfully.');
});

server = app.listen(process.env.PORT || 5000, (err) => {
  if (err) throw err;

  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});

// CHECK FOR THIS 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = server;