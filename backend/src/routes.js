const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

// Pega o roteador do express responsável pelas rotas
const routes = express.Router();

// Para pegar as imagens
const upload = multer(uploadConfig);

// Busca informações do backend e pega a rota
routes.post("/sessions", SessionController.store);

// Busca as techs desejadas
routes.get("/spots", SpotController.index);

// o upload.single serve para pegar uma imagem
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

// Pega os spots criados pelo usuário
routes.get("/dashboard", DashboardController.show);

// Rota encadeada, quando o usuário quiser criar uma reserva dentro de um spot
routes.post("/spots/:spot_id/bookings", BookingController.store);

// Rotas de aprovações e rejeições
routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);
module.exports = routes;
