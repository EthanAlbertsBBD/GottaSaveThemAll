import { Router } from 'express';
import { getS3Object } from '../../extensions/s3'
import {
  generateRadomPokemon, getUserCollection
} from './pokemons.service';
import { Pokemon } from '../../models';

const pokemonRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Pokemon:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     abilities:
 *      type: string
 *     hp:
 *      type: string
 *     attack:
 *      type: string
 *     defense:
 *      type: string
 *     speedAttack:
 *      type: string
 *     speedDefense:
 *      type: string
 *     speed:
 *      type: string
 *     id:
 *      type: integer
 *     types:
 *      type: array
 *      items:
 *        type: string
 *     artImage:
 *      type: string
 *     iconImage:
 *      type: string
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
  console.log(res.locals.username)
  getS3Object('pokemon-gsta', 'pokemon/pokemon.json').then((result) => {
    return res.status(200).json(result)
  })
});

/**
 * @swagger
 * components:
 *  schemas:
 *   Pokemon:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     abilities:
 *      type: string
 *     hp:
 *      type: string
 *     attack:
 *      type: string
 *     defense:
 *      type: string
 *     speedAttack:
 *      type: string
 *     speedDefense:
 *      type: string
 *     speed:
 *      type: string
 *     id:
 *      type: integer
 *     types:
 *      type: array
 *      items:
 *        type: string
 *     artImage:
 *      type: string
 *     iconImage:
 *      type: string
 * 
 * /api/pokemons/random:
 *  get:
 *   tags:
 *    - Pokemons
 *   summary: Get a Random Pokemon
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Pokemon'       
*/
pokemonRouter.get('/random', async (req, res, next) => {
    const randomPokemon: Pokemon = await generateRadomPokemon(res.locals.username);
    return res.status(200).json(randomPokemon)
});


pokemonRouter.get('/collection', async (req, res, next) => {
  const collection: Pokemon[] = await getUserCollection(res.locals.username);
  return res.status(200).json(collection)
});

export default pokemonRouter