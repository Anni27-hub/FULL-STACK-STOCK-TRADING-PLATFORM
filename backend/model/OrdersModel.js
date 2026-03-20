const mongoose = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

const OrdersModel = mongoose.model("Order", OrdersSchema);

// ✅ export directly
module.exports = OrdersModel;