const Spot = require("../models/Spot");

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    // Busca todos os spots aguais que foram criados por esse usuário
    const spots = await Spot.find({ user: user_id });

    return res.json(spots);
  }
};
