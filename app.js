let beers = [];
let currentPage = 1;

/* ----------------------------
   TEMPLATE HTML POUR UNE BIÈRE
----------------------------- */
function template(beer) {
    return `
    <div class="col-md-4">
        <div class="beer-card shadow-sm">
            <h4>${beer.name}</h4>
            <img src="${beer.image_url}" class="beer-img d-block mx-auto" alt="beer">
            <p class="beer-desc mt-3">${beer.description.substring(0, 100)}...</p>
        </div>
    </div>`;
}

/* ----------------------------
   AFFICHAGE DES BIÈRES
----------------------------- */
function displayBeers(beers) {
    const beerList = document.getElementById('beerList');
    beerList.innerHTML = '';
    beers.forEach(beer => {
        beerList.innerHTML += template(beer);
    });
}

/* ----------------------------
   RÉCUPÉRATION API AVEC PAGE
----------------------------- */
async function modelFetchBeers(page = 1) {
    const response = await fetch(`https://punkapi.online/v3/beers?page=${page}`);
    beers = await response.json();
    displayBeers(beers);
    updatePaginationButtons();
}

/* ----------------------------
   RECHERCHE EN DIRECT
----------------------------- */
function filterBeers() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filtered = beers.filter(b => b.name.toLowerCase().includes(search));
    displayBeers(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterBeers);

/* ----------------------------
   PAGINATION
----------------------------- */
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageSpan = document.getElementById("pageNumber");

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        pageSpan.textContent = currentPage;
        modelFetchBeers(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    pageSpan.textContent = currentPage;
    modelFetchBeers(currentPage);
});

function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
}

/* ----------------------------
   CHARGEMENT INITIAL
----------------------------- */
modelFetchBeers(1);