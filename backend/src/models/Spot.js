const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      // Grava o id do usuário que criou o spot
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    // Sempre que for convertido pra JSON, os virtuals devem ser mandados juntos
    toJSON: {
      virtuals: true
    }
  }
);

// Mandar imagem pro frontend
SpotSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);