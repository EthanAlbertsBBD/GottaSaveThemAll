import express from 'express';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import config from "config";

import {
  pokemonRouter,
} from './modules/routes'
import swaggerRouter from './extensions/swagger/router';

import errorHandler from './extensions/errors/handler';

const app = express();
const port = config.get('port');

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

app.listen(port, () => {

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