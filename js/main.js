import {
  getMovie,
  renderDetailMovies
} from './detailPage.js';

;
(async () => {
  const moviesEl = document.querySelector('.movies');
  const moreBtnEl = document.querySelector('.more--btn');

  moreBtnEl.classList.add('remove');

  let page = 1;
  let maxPage = -1;

  const inputValue = document.querySelector('.input__value');
  const searchBtn = document.querySelector('.search--btn');
  const movieOption = document.getElementById('movie__option');
  const countOption = document.getElementById('count__option');
  const yearOption = document.getElementById('year__option');

  for(let y = 2022; y >= 1985; y -= 1) {
    let movieYear = document.createElement('option');
    movieYear.textContent = y;
    movieYear.value = y;
    yearOption.append(movieYear);
  }

  // search btn click remove movie
  function removeMovie() {
    let removeDiv = document.getElementById('remove__id');
    while (removeDiv.hasChildNodes()) {
      removeDiv.removeChild(removeDiv.firstChild);
    }
    page = 1;
  }

  // search btn click
  searchBtn.addEventListener('click', async () => {
    removeMovie();
    let title = inputValue.value;
    let type = movieOption.value;
    let year = yearOption.value;
    for (let i = 0; i <= countOption.value; i++) {
      getMovies(page, title, type, year);
      page += 1;
    }
    moreBtnEl.classList.remove('remove');
    moreBtnEl.addEventListener('click', async () => {
      title = inputValue.value;
      type = movieOption.value;
      year = yearOption.value;
      page += 1;
      getMovies(page, title, type, year);
    })
  })


  // 기본 정보
  async function getMovies(page = 1, title, type, year) {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${year}`);
    const json = await res.json();
    if (json.Response === 'True') {
      const {
        Search: movies,
        totalResults
      } = json;
      maxPage = Math.ceil(Number(totalResults) / 10);
      if (page >= maxPage) {
        moreBtnEl.classList.add('remove');
      }
      return renderMovies(movies);
    } else {
      errorMovie(json.Error);
    }
  }

  // movie not found
  function errorMovie(error) {
    const errorText = document.createElement('h3');
    errorText.classList.add('error__text');
    errorText.textContent = error;
    moviesEl.append(errorText);
  }


  // render movies
  function renderMovies(movies) {
    for (const movie of movies) {
      const el = document.createElement('div');
      el.classList.add('movie');

      const titleEl = document.createElement('h1');
      titleEl.classList.add('title');
      titleEl.textContent = movie.Title;

      const imgEl = document.createElement('img');
      imgEl.src = movie.Poster;
      imgEl.onerror = function (err) {
        err.target.src = "./img-error.png";
      }

      const yearEl = document.createElement('h3');
      const valueEl = document.createElement('h3');
      const detailBtn = document.createElement('a');
      const movieID = movie.imdbID;
      let count = 0;

      const backEl = document.createElement('div');
      el.appendChild(backEl);


      // 영화 클릭 시 간단 정보 보이기 / 없애기
      el.addEventListener('click', async () => {
        if (count === 0) {
          backEl.classList.add('back__movie');
          const dMovie = await getMovie(movieID);

          backEl.appendChild(titleEl);
          titleEl.classList.remove('title');
          titleEl.classList.add('back__title');

          yearEl.textContent = movie.Year;
          yearEl.classList.add('year');

          if (dMovie.imdbRating === "N/A") {
            valueEl.textContent = '0.0 / 10';
          } else {
            valueEl.textContent = dMovie.imdbRating + ' / 10';
          }
          valueEl.classList.add('rating');

          detailBtn.classList.add('detail--btn');
          detailBtn.textContent = 'Detail';
          detailBtn.href = `/#${movieID}`;

          const removeMain = document.querySelector('.searchpage');

          detailBtn.addEventListener('click', () => {
            removeMain.classList.add('search__remove');
            renderDetailMovies(dMovie);
          })

          backEl.append(yearEl, valueEl, detailBtn);
          count = 1;

        } else {
          titleEl.classList.add('title');
          titleEl.classList.remove('back__title');
          el.appendChild(titleEl);

          while (backEl.hasChildNodes()) {
            backEl.removeChild(backEl.firstChild);
          }
          backEl.classList.remove('back__movie');
          count = 0;
        }

      })

      el.append(titleEl, imgEl);

      moviesEl.append(el);
    }
  }
  

})()