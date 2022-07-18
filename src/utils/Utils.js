//Function that filters the movies based on user's input
export const getMoviesBySearch = (movies,query) => {
    if (query===""){
        return movies;
    }
    else{
        return movies.filter(movie => {
            return movie.title.toLowerCase().includes(query)
        })
    }
}

//Function that sorts the movies based on user's selection
export const getSortedMovies = (movies,value) =>{
    console.log(value);
    if (value==="1")
    {
       return movies.sort((a,b)=> parseInt(b.year) - parseInt(a.year));
    }
    else if(value==="2")
    {
       return movies.sort((a,b) => parseInt(a.year) - parseInt(b.year));
    }
    else if (value==="3") {
        return movies.sort((a,b) => a.title.localeCompare(b.title)) ;
    }
    else{
        return movies.sort((a,b) => a.id - b.id);
    }
   
}