const buttSearch = document.querySelector(".button-search");

buttSearch.addEventListener("click", () => {
  document.querySelector(".container-movie").innerHTML = "";
  const searchKey = document.querySelector(".input-key");
  // Ubah http menjadi https
  fetch("https://www.omdbapi.com/?apikey=f0e7bcba&s=" + searchKey.value)
    .then((response) => response.json())
    .then((response) => {
      if (response.Search) {  // Tambahkan pengecekan
        const movie = response.Search;
        movie.forEach((mov) => {
          generateMovie(mov);
        });
      } else {
        document.querySelector(".container-movie").innerHTML = 
          "<h2>Movie not found!</h2>";
      }
    })
    .catch(error => {  // Tambahkan error handling
      console.error('Error:', error);
      document.querySelector(".container-movie").innerHTML = 
        "<h2>Something went wrong! Please try again.</h2>";
    });
});
