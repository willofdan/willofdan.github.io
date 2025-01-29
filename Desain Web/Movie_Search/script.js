const buttSearch = document.querySelector(".button-search");

buttSearch.addEventListener("click", () => {
  document.querySelector(".container-movie").innerHTML = "";
  const searchKey = document.querySelector(".input-key");
  fetch("http://www.omdbapi.com/?apikey=f0e7bcba&s=" + searchKey.value)
    .then((response) => response.json())
    .then((response) => {
      const movie = response.Search;
      movie.forEach((mov) => {
        generateMovie(mov);
      });
    });
});

// IN CONSTRUCTION
// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("button-description")) {
//     const imdbid = e.target.dataset.imdbid;

//     fetch("http://www.omdbapi.com/?apikey=f0e7bcba&i=" + imdbid)
//       .then((response) => response.json())
//       .then((response) => getDescriptionMov(response));
//   }
// });

function generateMovie({ Poster, Year, Title, imdbID }) {
  const containerMov = document.querySelector(".container-movie");
  const cards = document.createElement("div");
  cards.classList.add("cards");
  cards.innerHTML = `<div class="cards">
                      <img src="${Poster}" />
                      <div class="desc">
                      <div>
                        <h4 class="judul">${Title}</h4>
                        <h3 class="tahun">${Year}</h3>
                      </div>
                         <button class="button-description" data-imdbid="${imdbID}">More Info</button>
                      </div>
                    </div>`;
  containerMov.appendChild(cards);
}

// function getDescriptionMov({ Poster, Title, Genre, Released, Director, Plot }) {
//   const container = document.createElement("div");

//   container.classList.add("container-detail");
//   const descriptionTable = ` <div class="detail">
//   <span class="detail-exit">X</span>
//     <div class="detail-poster">
//      <img src="${Poster}"/>
//        <table>
//                                 <tr>
//                                   <th>Judul</th>
//                                   <td>${Title}</td>
//                                 </tr>
//                                 <tr>
//                                   <th>Tanggal</th>
//                                   <td>${Released}</td>
//                                 </tr>
//                                 <tr>
//                                   <th>Director</th>
//                                   <td>${Director}</td>
//                                 </tr>
//                                 <tr>
//                                   <th>Genre</th>
//                                   <td>${Genre}</td>
//                                 </tr>
//                                 <tr>
//                                   <th>Plot</th>
//                                   <td>${Plot}</td>
//                                 </tr>
//                             </table>
//       </div>

//                             </div>
//                             `;
//   container.innerHTML = descriptionTable;
//   document.body.appendChild(container);
// }
