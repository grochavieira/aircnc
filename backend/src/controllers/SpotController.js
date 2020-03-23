const User = require("../models/User");
const Spot = require("../models/Spot");

module.exports = {
  // É usado para retornar uma listagem
  async index(req, res) {
    const { tech } = req.query;

    // O mongoDB faz a busca e retorna um vetor com as techs que tenham o valor passado
    // mesmo que a busca esteja sendo realizada para um vetor
    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  // É usado para guardar os dados
  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    // Se o usuário não existir, retorna uma mensagem de erro
    if (!user) {
      // Retorna um erro de requisição de usuário
      return res.status(400).json({ error: "User does not exist" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      // Vai separar techs e tranformá-lo em um array
      techs: techs.split(",").map(tech => tech.trim()),
      price
    });
    return res.json(spot);
  }
};
