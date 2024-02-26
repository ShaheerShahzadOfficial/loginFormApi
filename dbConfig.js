
import mongoose from "mongoose";
import { config } from 'dotenv';

config();

const DBConnection = () => {
  mongoose.connect(process.env.DBURL, { useNewUrlParser: true }).then((result) => {
    console.log(`DATABASE CONNECTED WITH THE HOST `);
  })   .catch((err) => {
      console.error(err)
  });
};

export default DBConnection;