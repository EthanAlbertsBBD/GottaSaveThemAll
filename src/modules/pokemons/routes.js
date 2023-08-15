const pokemonRouter = require('express').Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Pokemon:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     type1:
 *      type: string
 *     type2:
 *      type: string
 *     total:
 *      type: integer
 *     hp:
 *      type: integer
 *     attack:
 *      type: integer
 *     defense:
 *      type: integer
 *     spAtk:
 *      type: integer
 *     spDef:
 *      type: integer
 *     speed:
 *      type: integer
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
  return res.status(200).json([])
});

module.exports = pokemonRouter;