const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,
  // Qual usuário solicitour
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // Qual lugar a reserva será feita
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot"
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
