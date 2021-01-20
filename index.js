const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3003;
app.use(cors());

if (process.env.DEV == "true") {
  console.log("MODO DE TESTE");
  mongoose.connect(
    "mongodb+srv://games:games@omnistack.ekd7k.mongodb.net/busao?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
} else {
  mongoose.connect(
    "mongodb+srv://superadmin:qwe123leo@cluster0.fcq5c.mongodb.net/web?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
}

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
