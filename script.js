let movieList = document.getElementById("movieList")

let inputMovieTitle = document.getElementById("inputMovieTitle")
let inputCategory = document.getElementById("inputCategory")
let inputPremier = document.getElementById("inputPremier")
let selectMedia = document.getElementById("selectMedia")
let inputMainCha = document.getElementById("inputMainCha")
const saveMovieBtn = document.getElementById("saveMovieBtn")
const listAllBtn = document.getElementById("listAllBtn")
const removeAllBtn = document.getElementById("removeAllBtn")
const movieTitleSearch = document.querySelector("[data-search]")
let searchList = document.getElementById("searchList")
const MovieCardTemplate = document.querySelector("[data-movie-template]")
const movieCardsContainer = document.querySelector("[data-movie-cards-container]")

const divHeader = document.querySelector("headerTitle")

let movies = []




function getAllMovies() {
    movieCardsContainer.innerHTML = ""



    fetch(`http://localhost:3000/moviesSeries`)
        .then(res => res.json())
        .then(data => {
            movies = data.map(movie => {
                const card = MovieCardTemplate.content.cloneNode(true).children[0]
                const header = card.querySelector("[data-header")
                const body = card.querySelector("[data-body]")
                const body2 = card.querySelector("[data-body2]")
                const removeBtn = card.querySelector(".removeBtn");
                header.textContent = movie.movieTitle
                body.textContent = movie.category
                body2.textContent = movie.movieSerie

                movieCardsContainer.append(card)
                const editBtn = card.querySelector(".editBtn");


                


                removeBtn.addEventListener("click", async () => {
                    console.log("click")
                    console.log(removeBtn);

                    const response = await fetch(`http://localhost:3000/moviesSeries/${movie.id}`, {
                        method: "DELETE",
                    });
                    getAllMovies()
                })

                if (editBtn) {
                    editBtn.addEventListener("click", () => {

                        console.log("Klick på:", movie.movieTitle);
                        let editMovieInput = document.createElement("input")
                        editMovieInput.classList.add("editModeMovieInput")
                        let editCategoryInput = document.createElement("input")
                        editCategoryInput.classList.add("editModeCategoryInput")
                        let editMediaOption = document.createElement("select")
                        editMediaOption.classList.add("mediaOptionEdit")
                        editMediaOption.innerHTML = `
                        <option value = "Movie">Movie</option>
                        <option value = "Serie">Serie</option>`;
                        let editMovieBtn = document.createElement("button")
                        editMovieBtn.classList.add("SaveButtonEdit")
                        editMovieBtn.innerText = "Save"

                        header.textContent = "";
                        body.textContent = "";
                        body2.textContent = "";

                        header.appendChild(editMovieInput);
                        body.appendChild(editCategoryInput);
                        body2.appendChild(editMediaOption);
                        header.appendChild(editMovieBtn);
                        editBtn.style.display = "none";

                        editMovieBtn.addEventListener("click", async () => {
                            console.log("Försöker spara")
                            const updatedMovie = {
                                movieTitle: editMovieInput.value,
                                category: editCategoryInput.value,
                                movieSerie: editMediaOption.value
                            }


                            try {
                                const response = await fetch(`http://localhost:3000/moviesSeries/${movie.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(updatedMovie)
                                });


                                if (response.ok) {
                                    console.log("Sparat");
                                    getAllMovies()
                                } else {
                                    console.log("Servern svarade med fel:", response.status);
                                }

                            } catch (error) {
                                console.log("Nätverksfel eller krasch:", error);
                            }
                        });





                        editMovieInput.value = movie.movieTitle;
                        editCategoryInput.value = movie.category;
                        editMediaOption.value = movie.movieSerie;
                    });
                }



                return { title: movie.movieTitle, category: movie.category, element: card }
            })

        })
        




}


saveMovieBtn.addEventListener("click", (e) => {
                    e.preventDefault();

                    if (inputMovieTitle.value.trim() === "" || inputCategory.value.trim() === "") {
                        alert("You have to write something")
                        return;
                    }

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







async function movieSearch() {

    movieTitleSearch.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()



        movies.forEach(movie => {
            const isVisable = movie.title.toLowerCase().includes(value) ||
                movie.category.toLowerCase().includes(value)
            movie.element.classList.toggle("hide", !isVisable)

        })

    })


};

movieSearch()
getAllMovies();