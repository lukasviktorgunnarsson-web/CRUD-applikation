// let searchList = document.getElementById("searchList")
// let movieTitleSearch = document.getElementById("movieTitleSearch")
// let categorySearch = document.getElementById("categorySearch")
// let searchOption = document.getElementById("searchOption")
// const MovieCardTemplate = document.querySelector("[data-movie-template]")
// const movieCardsContainer = document.querySelector("[data-movie-cards-container]")


// const searchBtn = document.getElementById("searchBtn")

// fetch ("http://localhost:3000/moviesSeries/")






















// searchBtn.addEventListener("click" (e => {
//         if(movieTitleSearch === movie.movieTitle){
//         console.log("Du hittade " + data)
//         searchMovies();
//     }
//     else{
//         console.log("Kunde inte hitta någon")
//     }
//     }))
// export default function searchMovies() {
//     fetch("http://localhost:3000/moviesSeries")
    
//     method: "GET"
//     headers: {
//         "Content-Type"; "application/json"
//     };
//     body: JSON.stringify({
//         movieTitle: movieTitleSearch.value,
//         category: categorySearch.value,
//         movieSerie: searchOption.value,
//     })
    
    

// }

// function printAllMovies(movies) {
//     const searchList = document.getElementById("searchList");
//     searchList.innerHTML = "";

//     movies.forEach(movie => {
//         const li = document.createElement("li");
//         li.classList.add("list")
//         li.textContent = `${movie.movieTitle} - ${movie.category} - ${movie.movieSerie}`;
//         searchList.appendChild(li);

//         let deleteBtn = document.createElement("button")
//         deleteBtn.innerText = "Delete"
//         li.appendChild(deleteBtn)

//     })
// }