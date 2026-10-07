// La forme d'un Pokémon dans NOTRE app (simple et propre)
export type Pokemon = {
  id: number
  name: string
  smallImage: string
  largeImage: string
  types: string[]
  height: number // en mètres
  weight: number // en kilos
  abilities: string[]
  stats: { name: string; value: number }[]
}