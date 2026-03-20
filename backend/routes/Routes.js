const express = require("express");

const router = express.Router();

const controller = require("../controllers/Controller.js");


const jwtAuth = require("../middlewares/jwtAuth.js");




router.get("/allOrders", jwtAuth, controller.allOrders)

router.get("/allPositions", jwtAuth, controller.allPositions)

router.get("/allHoldings", jwtAuth, controller.allHoldings)

router.post("/newOrders", jwtAuth, controller.newOrders)

router.post("/signUp", controller.signUp)

router.post("/signIn", controller.signIn)

router.post("/logout", controller.logout);




module.exports = router;