import { Application } from "express";
import bodyParser from "body-parser";
import express from "express";
import { walletRouter } from "./routes/wallet";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setController();
    this.setMongoConfig();
  }

  private setConfig() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI);
  }

  private setController() {
    this.app.use("/api", walletRouter);
    this.app.use("*", (req, res) => {
      res.send("OK").status(200);
    });
  }
}

export default new App().app;
