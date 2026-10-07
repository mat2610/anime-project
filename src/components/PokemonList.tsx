import type { Pokemon } from '../types'

type Props = {
  pokemons: Pokemon[]
  selectedId: number | null
  onSelect: (p: Pokemon) => void
}

function PokemonList({ pokemons, selectedId, onSelect }: Props) {
  if (pokemons.length === 0) {
    return <p className="list empty">Aucun Pokémon trouvé.</p>
  }

  return (
    <ul className="list">
      {pokemons.map((p) => (
        <li key={p.id}>
          <button
            className={p.id === selectedId ? 'row selected' : 'row'}
            onClick={() => onSelect(p)}
          >
            <img src={p.smallImage} alt={p.name} width={56} height={56} />
            <span className="name">{p.name}</span>
            <span className="types">
              {p.types.map((t) => (
                <span key={t} className={'badge ' + t}>{t}</span>
              ))}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default PokemonList