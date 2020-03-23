// index, show, store, update, destroy
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    // Pega o email que é mandado na pagina
    const { email } = req.body;

    let user = await User.findOne({ email: email });

    if (!user) {
      user = await User.create({ email });
    }
    // Cria um usuário
    //const user = await User.create({ email });

    return res.json(user);
  }
};
