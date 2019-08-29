const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
// Error com "http"!
const server = require("https").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});
// Conexão do banco de dados.
mongoose.connect(
    "mongodb+srv://OmniStack:omnistack@cluster0-g1mdx.mongodb.net/omnistack?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 3001);
