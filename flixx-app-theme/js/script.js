const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "9a19eeeb3acff219ce31e4b1c75aad5e",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      displaySliderMovie();
      break;
    case "/shows.html":
      displayPopularTvShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTvShowDetails();
      break;
    case "/search.html":
      search();
      break;
  }
  highlight();
}

function highlight() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

async function fetchApiData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

// Make a request to search

async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

async function displayPopularMovies() {
  const movieGrid = document.getElementById("popular-movies");
  const { results } = await fetchApiData("movie/popular");

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList = "card";
    div.innerHTML = `
    <a href="movie-details.html?id=${result.id}">
    <img
      src="https://image.tmdb.org/t/p/w500${result.poster_path}"
      class="card-img-top"
      loading="lazy"
      alt="${result.title}"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${result.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${result.release_date}</small>
    </p>
  </div>
    `;
    movieGrid.appendChild(div);
  });
}

async function displayPopularTvShows() {
  const showGrid = document.getElementById("popular-shows");
  const { results } = await fetchApiData("tv/popular");

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList = "card";
    div.innerHTML = `
    <a href="tv-details.html?id=${result.id}">
    <img
      src="https://image.tmdb.org/t/p/w500${result.poster_path}"
      class="card-img-top"
      loading="lazy"
      alt="${result.name}"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${result.name}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${result.first_air_date}</small>
    </p>
  </div>
    `;
    showGrid.appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = location.search.split("=")[1];
  const movie = await fetchApiData(`movie/${movieId}`);
  const movieDeatils = document.querySelector("#movie-details");

  movieDeatils.innerHTML = `
    <div class="details-top">
    <div>
      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) => "<li>" + genre.name + "</li>").join("")}
      </ul>
      <a href="/" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span>$${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span>$${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span>${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span>${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}</div>
  </div>
    `;

  //   for backdrop image
  displayBackgroundImage("movie", movie.backdrop_path);
}

async function displayTvShowDetails() {
  const showId = location.search.split("=")[1];
  const show = await fetchApiData(`tv/${showId}`);

  const showDetails = document.getElementById("show-details");

  showDetails.innerHTML = `
    <div class="details-top">
    <div>
      <img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${show.first_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="shows.html" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li>
        <span class="text-secondary">Last Episode To Air:</span> ${
          show.last_episode_to_air.name
        }
      </li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies
      .map((company) => company.name)
      .join(", ")}</div>
  </div>
    `;

  displayBackgroundImage("shows", show.backdrop_path);
}

function displayBackgroundImage(type, backdropPath) {
  const backdropDiv = document.createElement("div");
  backdropDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
  backdropDiv.style.backgroundSize = "cover";
  backdropDiv.style.backgroundPosition = "center";
  backdropDiv.style.backgroundRepeat = "no-repeat";
  backdropDiv.style.height = "100vh";
  backdropDiv.style.width = "100vw";
  backdropDiv.style.position = "absolute";
  backdropDiv.style.top = "0";
  backdropDiv.style.left = "0";
  backdropDiv.style.zIndex = "-1";
  backdropDiv.style.opacity = "0.3";

  if (type === "movie") {
    document.getElementById("movie-details").appendChild(backdropDiv);
  } else {
    document.getElementById("show-details").appendChild(backdropDiv);
  }
}

async function search() {
  const queryString = location.search;
  const urlParam = new URLSearchParams(queryString);

  global.search.type = urlParam.get("type");
  global.search.term = urlParam.get("search-term");

  if (global.search.term === "" || global.search.term === null) {
    showAlert("field can not be empty", "alert-error");
    return;
  }

  const { results, total_pages, page, total_results } = await searchAPIData();
  global.search.page = page;
  global.search.totalPages = total_pages;
  global.search.totalResults = total_results;

  if (results.length === 0) {
    showAlert("No data found with that keyword", "alert-error");
    return;
  }
  displaySearchResults(results);
}

function displaySearchResults(results) {
  const grid = document.getElementById("search-results");
  grid.innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList = "card";
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
    <img
      src="https://image.tmdb.org/t/p/w500${result.poster_path}"
      class="card-img-top"
      loading="lazy"
      alt="${global.search.type === "movie" ? result.title : result.name}"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${
      global.search.type === "movie" ? result.title : result.name
    }</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${
        global.search.type === "movie"
          ? result.release_date
          : result.first_air_date
      }</small>
    </p>
  </div>
    `;
    document.querySelector("#search-results-heading").innerHTML = `
      <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;
    grid.appendChild(div);
  });

  displayPagination();
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  pagination.appendChild(div);

  if (global.search.page === 1) {
    document.getElementById("prev").disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document.getElementById("next").disabled = true;
  }

  document.getElementById("prev").addEventListener("click", async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
  document.getElementById("next").addEventListener("click", async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
}

function showAlert(message, className) {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", className);
  alertElement.textContent = message;
  document.getElementById("alert").appendChild(alertElement);
  setTimeout(() => alertElement.remove(), 3000);
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

async function displaySliderMovie() {
  const { results: movies } = await fetchApiData("movie/now_playing");
  const swiper = document.querySelector(".swiper");
  const swiper_wrapper = document.createElement("div");
  swiper_wrapper.classList = "swiper-wrapper";
  movies.forEach((movie) => {
    const swiper_slide = document.createElement("div");
    swiper_slide.classList = "swiper-slide";
    swiper_slide.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
          1
        )} / 10
      </h4>
    `;
    swiper_wrapper.appendChild(swiper_slide);
  });
  swiper.appendChild(swiper_wrapper);

  initSwipper();
}

function initSwipper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 50,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
    },
  });
}
