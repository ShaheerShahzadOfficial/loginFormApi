import express from "express";
import { login, register } from "./controllers.js";

export const authRoute = express.Router();

authRoute.route("/login").post(login);
authRoute.route("/register").post(register);
