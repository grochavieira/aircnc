const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    // Popula o booking com o id do usuario e spot, jogando os dados deles no booking
    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    // Verifica se o dono do spot tem a conexão em tempo real
    const ownerSocket = req.connectedUsers[booking.spot.user];
    console.log(booking);
    // Se existe essa conexão, uma msg é enviada
    if (ownerSocket) {
      // to(quem eu quero enviar a mensagem)
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
