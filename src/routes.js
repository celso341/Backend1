const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/muilter");

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
/* Obs: aonde está "single" passa só um arquivo por vez
   mais se colocar "arry" passa mais de um arquivo. */
routes.post(
    "/boxes/:id/files", 
    multer(multerConfig).single("file"), 
    FileController.store
);

module.exports = routes;

/* 
GET  - Quando for buscae
POST - Quando for criar
PUT  - Quando for editar
DELETE - Quando for deletar
*/