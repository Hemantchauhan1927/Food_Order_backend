import express from "express";
import { AdminRoutes, VendorRoutes } from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URL } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoutes);
app.use("/vendor", VendorRoutes);

mongoose
  .connect(MONGO_URL, {})
  .then((result) => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log("error" + err);
  });

app.listen(8000, () => {
  console.log("App is listening on port: 8080");
});
