const multer = require("multer");
const path = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      // Retorna o nome da extensão
      const ext = path.extname(file.originalname);

      // Retorna o nome da imagem sem a extensão, e passa a extensão como parâmetro para ser removida
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};
