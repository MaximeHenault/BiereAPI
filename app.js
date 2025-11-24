var beers;
/**************************
***         MODEL
***************************/
      // Function to fetch beers from Punk API
      async function modelFetchBeers(id) {
        beers = await fetch(`https://punkapi.online/v3/beers?page=${id}`)
          .then(response => response.json())
          .then(data => displayBeers(data))
          .catch(error => console.error('Error fetching beers:', error));
      }
/**************************
  ***         VIEW
  ***************************/
      // function ECMA 6 represent the view template
      var template = (beer) => `
        <div class="col-md-4 mb-4">
          <div class="beer-card card shadow-lg border-0 p-3">
              <div class="text-center">
                  <img src="https://punkapi.online/v3/images/${beer.image}"
                      class="beer-img mb-3"
                      alt="${beer.name}">
              </div>

              <span class="badge bg-warning text-dark mb-2">${beer.tagline ?? "No tagline"}</span>

              <h5 class="fw-bold">${beer.name}</h5>

              <p class="beer-desc">
                  ${beer.description?.slice(0,120) ?? ""}...
              </p>
          </div>
        </div>
        `;

      /**************************
      ***         CONTROLLER
      ***************************/
      // Function to display beers on the page
      function displayBeers(beers) {
        const beerList = document.getElementById('beerList');
        beerList.innerHTML = '';
        beers.forEach(beer => {
          beerList.innerHTML += template(beer);
        });
        return beers;
      }
      // Function to filter beers based on search input
      function filterBeers() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const filteredBeers = beers.filter(beer => beer.name.toLowerCase().includes(searchInput));
        displayBeers(filteredBeers);
      }
       // Event listener for search input
      document.getElementById('searchInput').addEventListener('input', filterBeers);
   
      