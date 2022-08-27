/**
 * Pagination config
 */
let currentPage = 1;
let currentFilter = 'all';

function resetCurrentPage() {
  currentPage = 1
}


/**
 * Basic
 */
const API = 'https://rickandmortyapi.com/api/character';
const cardContainer = document.querySelector('.section-characters-cards');

/**
 * Get characters from api
 */
const getCharacters = (url, callback) => {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data.results))
    .catch((error) => {
      cardContainer.innerHTML = `<p class="error">Ups, error to load the data: ${error} </p>`
    })
}

/**
 * Create HTML Card to print Character
 */
const createCharacterCard = ({
  name,
  image,
  gender,
  species,
  status,
  origin,
  location: { name: locationName },
  episode,
}) => `
  <div class="character-card">
    <h2>${name}</h2>
    <picture>
      <img src="${image}" alt="${name}">
    </picture>
    <span class="${gender?.toLowerCase()}-background" >${gender}</span>
    <ul>
      <li><strong>Specie:</strong> ${species}</li>
      <li><strong>Status:</strong> ${status}</li>
      <li><strong>Origin:</strong> ${origin.name}</li>
      <li><strong>Location:</strong> ${locationName}</li>
      <li><strong>Number of Episodes:</strong> ${episode?.length}</li>
    <ul>
  </div>
`

/**
 * Print all cards in HTML
 */
const printCharacters =  (keepPrevious) => (characters) => {
  let characterCards = '';
  if (keepPrevious) {
    characterCards = cardContainer.innerHTML;
  }
  characters.map((character) => {
     characterCards += createCharacterCard(character)
  })
  cardContainer.innerHTML = characterCards;
}

function getAll(page = '1', keepPrevious = false) {
  currentFilter = 'all'
  if (!keepPrevious) resetCurrentPage()
  getCharacters(`${API}?page=${page}`, printCharacters(keepPrevious))
}

function getFemales(page = '1', keepPrevious = false) {
  currentFilter = 'females'
  if (!keepPrevious) resetCurrentPage()
  getCharacters(`${API}?page=${page}&gender=female`, printCharacters(keepPrevious))
}

function getMales(page = '1', keepPrevious = false) {
  currentFilter = 'males'
  if (!keepPrevious) resetCurrentPage()
  getCharacters(`${API}?page=${page}&gender=male`, printCharacters(keepPrevious))
}

function getAlives(page = '1', keepPrevious = false) {
  currentFilter = 'alives'
  if (!keepPrevious) resetCurrentPage()
  getCharacters(`${API}?page=${page}&status=alive`, printCharacters(keepPrevious))
}

function getDeads(page = '1', keepPrevious = false) {
  currentFilter = 'deads'
  if (!keepPrevious) resetCurrentPage()
  getCharacters(`${API}?page=${page}&status=dead`, printCharacters(keepPrevious))
}

// to call when the user join the first time
getAll()

/**
 * to add click funcionality to each button
 */
document.getElementById('all').addEventListener('click', getAll)
document.getElementById('females').addEventListener('click', getFemales)
document.getElementById('males').addEventListener('click', getMales)
document.getElementById('alives').addEventListener('click', getAlives)
document.getElementById('deads').addEventListener('click', getDeads)


/**
 * Pagination
 */
const filters = {
  all: getAll,
  females: getFemales,
  males: getMales,
  alives: getAlives,
  deads: getDeads,
}

document.getElementById('more').addEventListener('click', () => {
  // to add 1 to the current page
  currentPage += 1
  // 1. search in the filters object for the function to call the currentFilter
  // 2. call it with the currentPage and keepOld characters to append to the list
  filters?.[currentFilter || 'all']?.(currentPage, true)
})

