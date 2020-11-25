const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config();

const start = async () => {
  const PORT = process.env.PORT || 3000;
  const dbURL = process.env.DB_URL;

  if (!PORT || !dbURL) {
    throw new Error("Env variables missing");
  }

  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};

start();
