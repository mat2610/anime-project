import type { Pokemon } from '../types'

type Props = { pokemon: Pokemon | null }

function PokemonDetails({ pokemon }: Props) {
  if (!pokemon) {
    return <section className="details empty">Choose a Pokemon to see its details.</section>
  }

  return (
    <section className="details">
      <img src={pokemon.largeImage} alt={pokemon.name} className="big" />
      <p className="number">#{String(pokemon.id).padStart(3, '0')}</p>
      <h2 className="name">{pokemon.name}</h2>

      <div className="types">
        {pokemon.types.map((t) => (
          <span key={t} className={'badge ' + t}>{t}</span>
        ))}
      </div>

      <div className="info">
        <p><strong>Height :</strong> {pokemon.height} m</p>
        <p><strong>Weight :</strong> {pokemon.weight} kg</p>
        <p><strong>Abilities :</strong> {pokemon.abilities.join(', ')}</p>
      </div>

      <h3>Base Statistics</h3>
      <ul className="stats">
        {pokemon.stats.map((s) => (
          <li key={s.name}>
            <span className="stat-name">{s.name}</span>
            <span className="stat-value">{s.value}</span>
            <span className="bar">
              <span style={{ width: Math.min(s.value, 150) / 1.5 + '%' }} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PokemonDetails