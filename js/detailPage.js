export {
  getMovie,
  renderDetailMovies
};

async function getMovie(id) {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`)
  const json = await res.json()
  return json;
}

function renderDetailMovies(movie) {
  console.log(movie.Title);

  const el = document.querySelector('.detailpage');
  const detail = document.createElement('div');
  detail.classList.add('detail');
  // const infom = getMovie(movies);

  const poster = document.createElement('img');
  const title = document.createElement('h1');
  const released = document.createElement('span');
  const runtime = document.createElement('span');
  const country = document.createElement('span');
  const plot = document.createElement('div');

  const ratingContent = document.createElement('div');
  const ratingTitle = document.createElement('h3');
  ratingTitle.textContent = 'Ratings';
  ratingContent.append(ratingTitle);

  // actors content
  const actorsContent = document.createElement('div');
  const actorsTitle = document.createElement('h3');
  actorsTitle.textContent = 'Actors';
  const actors = document.createElement('div');
  actorsContent.classList.add('actors__content');
  actorsContent.append(actorsTitle, actors);

  // director content
  const directorContent = document.createElement('div');
  const directorTitle = document.createElement('h3');
  directorTitle.textContent = 'Director';
  const director = document.createElement('div');
  directorContent.classList.add('director__content');
  directorContent.append(directorTitle, director);

  // genre content
  const genreContent = document.createElement('div');
  const genreTitle = document.createElement('h3');
  genreTitle.textContent = 'Genre';
  const genre = document.createElement('div');
  genreContent.classList.add('genre__content');
  genreContent.append(genreTitle, genre);

  for (let i = 0; i < movie.Ratings.length; i++) {
    const ratingImg = document.createElement('img');
    const ratingText = document.createElement('span')
    const rating = document.createElement('div');
    rating.classList.add(`rating${i}`);
    ratingImg.classList.add(`rating--img${i}`);
    ratingImg.src = `../images/Rating${i}.png`;
    ratingText.textContent = movie.Ratings[i].Value;
    rating.append(ratingImg, ratingText);
    ratingContent.appendChild(rating);
  }
  ratingContent.classList.add('rating__content');

  title.textContent = movie.Title;
  title.classList.add('title');
  released.textContent = movie.Released;
  runtime.textContent = movie.Runtime;
  country.textContent = movie.Country;
  plot.textContent = movie.Plot;
  plot.classList.add('plot');
  actors.textContent = movie.Actors;
  director.textContent = movie.Director;
  genre.textContent = movie.Genre;

  poster.classList.add('poster--img');
  poster.src = movie.Poster;

  detail.append(title, released, runtime, country, plot, ratingContent, actorsContent, directorContent, genreContent);
  el.append(poster, detail);
}
