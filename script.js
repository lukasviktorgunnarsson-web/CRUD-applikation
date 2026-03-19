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
let searchOption = document.getElementById("searchOption")


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
            movieSerie: selectMedia.value,

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
        li.textContent = `${movie.movieTitle} - ${movie.category} - ${movie.movieSerie}`;
        movieList.appendChild(li);

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        li.appendChild(deleteBtn)
        let editBtn = document.createElement("button")
        editBtn.innerText = "Edit"
        li.appendChild(editBtn)

        deleteBtn.addEventListener("click", () => {
        fetch("http://localhost:3000/moviesSeries/" + movie.id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .catch(err => console.log(err));
    });


        editBtn.addEventListener("click", (movies) => {

            fetch ("http://localhost:3000/moviesSeries/")
            let editMovieInput = document.createElement("input")
            let editCategoryInput = document.createElement("input")
            let editMediaOption = document.createElement("select")
            editMediaOption.innerHTML=`
            <option value = "Movie">Movie</option>
            <option value = "Serie">Serie</option>
            `;
            let editMovieBtn = document.createElement("button")
            editMovieBtn.innerText = "Save"

            
            li.appendChild(editMovieInput);
            li.appendChild(editCategoryInput);
            li.appendChild(editMediaOption);
            li.appendChild(editMovieBtn);

            editMovieInput.value = movie.movieTitle;
            editCategoryInput.value = movie.category;
            editMediaOption.value = movie.movieSerie;

            editMovieBtn.addEventListener("click", () => {
                editMovie()
            })
        })
    })

    
}

async function editMovie(id){
    const response = await fetch (`http://localhost:3000/moviesSeries/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            movieTitle: editMovieInput.value,
            category: editCategoryInput.value,
            movieSerie: editMediaOption.value,
        })
        })
        const data = await reponse.json();
        console.log(data);


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



