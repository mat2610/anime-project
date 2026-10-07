# PRD: pokemon-project (Pokemon Gen 1 Explorer)

## 1. One-sentence pitch
A simple web app that helps people new to Pokemon get to know the original 151 Pokemon by browsing a list and clicking any Pokemon to see its details.

## 2. Who it is for
Someone new to Pokemon who wants to understand the Pokemon world better. Their main goal is to browse the Pokemon, and sometimes to search for one by name or look at one type.

## 3. Screens
**List (left or top):** All 151 Gen 1 Pokemon. Each row shows a small image, the name, and the type(s). Above the list there is a search box (by name) and a type filter.

**Details panel (right or bottom):** It shows the Pokemon that was clicked: a large image, its number, name, type(s), height, weight, abilities, and base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed). Before anything is clicked, the panel shows a short message such as "Pick a Pokemon to see its details."

## 4. Must-have features
1. Load and show the 151 Gen 1 Pokemon with small image, name, and type(s).
2. Click a Pokemon to see its details in the details panel.
3. Search the list by name.
4. Filter the list by type.
5. Show a loading message while data loads, and an error message if loading fails.

## 5. Acceptance criteria
- When I open the app, I see a loading message, then a list of 151 Pokemon, each with a small image, name, and type(s).
- When I click a Pokemon in the list, I see its large image, number, types, height, weight, abilities, and base stats in the details panel.
- When I type "char" in the search box, I see only Pokemon whose names contain "char" (Charmander, Charmeleon, Charizard).
- When I choose "Fire" in the type filter, I see only Fire-type Pokemon.
- When the API cannot be reached, I see an error message instead of an empty screen.

## 6. Not now (ideas for later)
- Evolution chain in the details panel (top idea for the next version)
- Moves list
- More generations beyond Gen 1
- Favorites, comparing two Pokemon, dark mode, Pokemon cries (sound)

## 7. Data
**API:** PokeAPI. It is free and needs no key.

- **List:** `https://pokeapi.co/api/v2/pokemon?limit=151`
  - Fields used: `name`, `url`. The number can be read from the end of the url.
- **Details (one call per Pokemon):** `https://pokeapi.co/api/v2/pokemon/{name or number}`
  - `id`: number
  - `name`
  - `sprites.front_default`: small image for the list
  - `sprites.other.official-artwork.front_default`: large image for the details panel
  - `types`: type names
  - `height`: given in decimeters, so divide by 10 to show meters
  - `weight`: given in hectograms, so divide by 10 to show kilograms
  - `abilities`: ability names
  - `stats`: each stat's name and base value

**Note:** The list shows types, so the app calls the details endpoint for all 151 Pokemon when it starts. The list may take a few seconds to fill in. The details panel can reuse this data, so clicking a Pokemon does not need another request.