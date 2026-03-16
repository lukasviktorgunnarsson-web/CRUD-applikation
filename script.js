let movieList = document.getElementById("movieList")
let newMovieTitle = document.getElementById("")

console.log("Hello fetch");





function printMovies() {

    fetch("http://localhost:3000/moviesSeries")
        .then(response => response.json())
    
        .then(function (response) {

            console.log("Movies/series " + response);



        })


}

printMovies()