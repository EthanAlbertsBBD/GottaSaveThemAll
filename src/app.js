const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("config");

const {
  pokemonRouter,
} = require('./modules/routes')
const swaggerRouter = require('./extensions/swagger/router');

const errorHandler = require('./extensions/errors/handler');

const app = express();
const port = config.port;

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join("web")));

app.use('/api/swagger-ui', swaggerRouter);
app.use("/api/pokemons", pokemonRouter);

app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(` 
              ____________________________________________
             |                                            |
             | Is it possible...? Can we save 'em all?    |
             | Wait.. that doesn't sound right?           |
             | Save them?                                 |
             | I thought we need to catch them?           |
             |____________________________________________|
            / 
           /          ◓   '  ◓
          /       '                '
      , ,      '                       ◓
    ( ',') ◓ 
     _ __/                                 '
     \\|
    _/ \\_,                                   ◓ 
  `);

  console.log(`Web url, http://localhost:${port}`);
  console.log(`Swagger url, http://localhost:${port}/api/swagger-ui`);
});