import type { Pokemon } from './types'

type ApiPokemon = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    other: { 'official-artwork': { front_default: string } }
  }
  types: { type: { name: string } }[]
  abilities: { ability: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}

function toPokemon(d: ApiPokemon): Pokemon {
  return {
    id: d.id,
    name: d.name,
    smallImage: d.sprites.front_default,
    largeImage: d.sprites.other['official-artwork'].front_default,
    types: d.types.map((t) => t.type.name),
    height: d.height / 10, // décimètres -> mètres
    weight: d.weight / 10, // hectogrammes -> kilos
    abilities: d.abilities.map((a) => a.ability.name),
    stats: d.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  }
}

export async function fetchGen1(): Promise<Pokemon[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  if (!res.ok) throw new Error('List error')
  const data: { results: { name: string; url: string }[] } = await res.json()

  return Promise.all(
    data.results.map(async (p) => {
      const r = await fetch(p.url)
      if (!r.ok) throw new Error('Details error ' + p.name)
      const d: ApiPokemon = await r.json()
      return toPokemon(d)
    }),
  )
}