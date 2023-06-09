const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const router = require('./routes/userRoutes');
const { MongoMemoryServer } = require("mongodb-memory-server");
const multer = require('multer');

const USER_ROUTES = require("./routes/userRoutes");
// const POST_ROUTES = require("./routes/postRoutes");
// const REGISTER_ROUTES = require("./register-routes");
// const userRoutes = require("./routes/userRoutes");

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

// REGISTER_ROUTES(app, [USER_ROUTES, POST_ROUTES], "/api");
// app.use("/api/users", USER_ROUTES);

let server;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// if (NODE_ENV === "test") {
//   const mongoServer = new MongoMemoryServer();
//   console.log("Initializing test environment");

//   mongoServer.start().then(() => {
//     const mongoUri = mongoServer.getUri();

//     mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     mongoose.connection.on("error", (err) => {
//       console.log(err);
//     });

//     mongoose.connection.once("open", () => {
//       console.log(`Test enviroment initialized | Connected @ ${mongoUri}`);
//     });
//   });
// }

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