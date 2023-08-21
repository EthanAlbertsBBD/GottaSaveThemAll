import { Router } from 'express';
import { getS3Object } from '../../extensions/s3'
const pokemonRouter = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *   Pokemon:
 *    type: object
 * 
 * /api/pokemons:
 *  get:
 *   tags:
 *    - Pokemons
 *   summary: Get all of the Pokemons
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Pokemon'       
*/
pokemonRouter.get('/', (req, res, next) => {
  getS3Object('pokemon-gsta', 'pokemon/pokemon.json').then((result) => {
    return res.status(200).json(result)
  })
});

export default pokemonRouter