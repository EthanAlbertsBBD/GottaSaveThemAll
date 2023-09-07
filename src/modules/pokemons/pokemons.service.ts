import { getS3Object, saveS3Object } from '../../extensions/s3'
import {
  Pokemon
} from '../../models';

const getCollectionIds = (collection: Pokemon[] ) => {
  return collection.reduce((acc: number[], pokemon: Pokemon) => {
    acc.push(pokemon.id)
    return acc
  }, [])
}

const getRandomIndex = (max: number) => {
  const min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomPokemonIndex = (collection: Pokemon[], pokemons: Pokemon[]) => {
  const ids: number[] = getCollectionIds(collection);
  const max = pokemons.length;
  const index = getRandomIndex(max);
  if (ids.length === max) {
    return index;
  }
  if (ids.includes(index)) {
    return getRandomPokemonIndex(collection, pokemons)
  }
  return index

}

const getPokemons = async (userName: string) => {
  const pokemons: Pokemon[] = await getS3Object('pokemon-gsta', 'pokemon/pokemon.json');
  const collection: Pokemon[] = await getS3Object('pokemon-gsta', `users/${userName}/collection.json`);
  return {
    pokemons,
    collection,
  }
}

const generateRadomPokemon = async (userName: string) => {
  const { pokemons, collection } = await getPokemons(userName);
  const index = getRandomPokemonIndex(collection, pokemons)
  const pokemon: Pokemon = pokemons.find((pokemon: Pokemon) => pokemon.id === index)!;
  collection.push(pokemon);
  await saveS3Object('pokemon-gsta', `users/${userName}/collection.json`, collection)
  return pokemon;
}

const getUserCollection = async (userName: string) => {
  const { ignored, collection } = await getPokemons(userName);
  return collection;
}

export {
  generateRadomPokemon,
  getUserCollection
}