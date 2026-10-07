import { useEffect, useState } from 'react'
import './App.css'
import type { Pokemon } from './types'
import { fetchGen1 } from './api'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'

function App() {
  // Les "états" : des valeurs qui, quand elles changent, mettent l'écran à jour
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Pokemon | null>(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  // Load only once, when the component is mounted
  useEffect(() => {
    fetchGen1()
      .then((data) => setPokemons(data))
      .catch(() => setError('Impossible to load Pokemon. Check your internet connection.'))
      .finally(() => setLoading(false))
  }, [])

  const allTypes = [...new Set(pokemons.flatMap((p) => p.types))].sort()

  // La liste affichée = liste complète filtrée par la recherche ET le type
  const visible = pokemons.filter((p) => {
    const matchName = p.name.includes(search.toLowerCase().trim())
    const matchType = typeFilter === 'all' || p.types.includes(typeFilter)
    return matchName && matchType
  })

  if (loading) return <p className="message">Loading Pokemon…</p>
  if (error) return <p className="message error">{error}</p>

  return (
    <main className="app">
      <h1>Pokedex Gen 1</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All types</option>
          {allTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="layout">
        <PokemonList
          pokemons={visible}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
        <PokemonDetails pokemon={selected} />
      </div>
    </main>
  )
}

export default App