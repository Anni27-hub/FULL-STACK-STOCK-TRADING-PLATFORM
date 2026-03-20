const OrdersModel = require("../model/OrdersModel.js");
const PositionsModel = require("../model/PositionsModel.js");
const HoldingsModel = require("../model/HoldingsModel.js");
const UserModel = require("../schemas/UserSchema"); // make sure this exports mongoose.model
const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.SECRET_KEY;

class Controller {

    // ✅ Get all orders
    static async allOrders(req, res) {
        try {
            const orders = await OrdersModel.find({});
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // ✅ Get all positions
    static async allPositions(req, res) {
        try {
            const positions = await PositionsModel.find({});
            res.json(positions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // ✅ Get all holdings
    static async allHoldings(req, res) {
        try {
            const holdings = await HoldingsModel.find({});
            res.json(holdings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // ✅ Create new order
    static async newOrders(req, res) {
        try {
            const { name, qty, price, mode } = req.body;

            // Save order
            await OrdersModel.create({ name, qty, price, mode });

            // Add to holdings if BUY
            if (mode === "BUY") {
                await HoldingsModel.create({
                    name,
                    qty,
                    avg: price,
                    price,
                    net: "+0.00%",
                    day: "+0.00%",
                });
            }

            res.status(201).json({ message: "Order Purchased" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // ✅ SIGN UP (REGISTER)
    static async signUp(req, res) {
        try {
            const { name, email, password } = req.body;

            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const newUser = await UserModel.create({ name, email, password });

            res.status(201).json({
                message: "User Registered Successfully!",
                user: newUser
            });

        } catch (error) {
            res.status(500).json({ message: "Error: " + error.message });
        }
    }

    // ✅ SIGN IN (LOGIN)
    static async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const existingUser = await UserModel.findOne({ email });

            if (!existingUser || existingUser.password !== password) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Create JWT
            const token = jwt.sign(
                {
                    userId: existingUser._id,
                    email: existingUser.email,
                },
                key,
                { expiresIn: "4h" }
            );

            // Send cookie (for browser)
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: false,   // ⚠️ keep false for localhost
                sameSite: "Lax"
            });

            res.status(200).json({
                message: "Login Successful!",
                token
            });

        } catch (error) {
            res.status(500).json({ message: "Error: " + error.message });
        }
    }

    // ✅ LOGOUT
    static async logout(req, res) {
        try {
            res.clearCookie("authToken", {
                httpOnly: true,
                secure: false,
                sameSite: "Lax"
            });

            res.json({ message: "Logged out successfully" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = Controller;