const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate("spot");

    booking.approved = true;

    await booking.save();

    // Busca o usuário que está solicitando o booking
    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      // Emite uma mensagem para esse usuário
      req.io.to(bookingUserSocket).emit("booking_response", booking);
    }

    return res.json(booking);
  }
};
