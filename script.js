let movieList = document.getElementById("movieList")

let inputMovieTitle = document.getElementById("inputMovieTitle")
let inputCategory = document.getElementById("inputCategory")
let inputPremier = document.getElementById("inputPremier")
let selectMedia = document.getElementById("selectMedia")
let inputMainCha = document.getElementById("inputMainCha")
const saveMovieBtn = document.getElementById("saveMovieBtn")
const listAllBtn = document.getElementById("listAllBtn")
const removeAllBtn = document.getElementById("removeAllBtn")
let movieTitleSearch = document.getElementById("movieTitleSearch")
let categorySearch = document.getElementById("categorySearch")
let premierSearch = document.getElementById("premierSearch")
let searchOption = document.getElementById("searchOption")
let mainChaSearch = document.getElementById("mainChaSearch")

// async function printMovies() {
//     const response = await fetch("http://localhost:3000/moviesSeries")
//     const data = await response.json();
// }

function getAllMovies() {
    fetch("http://localhost:3000/moviesSeries")
        .then(res => res.json())
        .then(data => {
            console.log("data", data)
            data.map(user => {
            })  
    });
}

saveMovieBtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/moviesSeries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            movieTitle: inputMovieTitle.value,
            category: inputCategory.value,
            premier: inputPremier.value,
            movieSerie: selectMedia.value,
            mainCharacter: inputMainCha.value
            
        })
        
    })
        .then(res => res.json())
        .then(data => {
            getAllMovies();
        })
        .catch(err => console.error("Error:", err));
})


function printAllMovies(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const li = document.createElement("li");
        li.classList.add("list")
        li.textContent = `${movie.movieTitle} - ${movie.category} - ${movie.premier} - ${movie.movieSerie} - ${movie.mainCharacter}`;
        movieList.appendChild(li);

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        li.appendChild(deleteBtn)


        deleteBtn.addEventListener("click", () => {
            fetch("http://localhost:3000/moviesSeries/" + movie.id, {
                method: "DELETE"
            }) 
                .then(res => res.json())
                .catch(err => console.log(err));
        });
    })
}


listAllBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/moviesSeries")
        .then(response => response.json())
        .then(data => {
            printAllMovies(data);
        })
        .catch(error => console.error("Error:", error));
});


function removeAllMovies() {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";
}

removeAllBtn.addEventListener("click", () => {
    removeAllMovies();
});



