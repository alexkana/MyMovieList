import {Row,Col} from "react-bootstrap"
import {MovieItem} from "../components/MovieItem"
import { SearchBar } from "../components/SearchBar"
//import {getFilteredMovies} from "../utilities/getFilteredMovies"
import { useEffect, useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify'
import {Select} from '../components/Select'
import {getMoviesBySearch, getSortedMovies} from "../utils/Utils"
//Homepage of the website

//Home component
export function Home(){

    const [query,setQuery] = useState("");
    const [option,setOption] = useState("");
    const [moviesList,setMoviesList] = useState([]);
    const [loading,setLoading] = useState(false);
    const searchedMovies = getMoviesBySearch(moviesList,query);
    const filteredMovies = getSortedMovies(searchedMovies,option);

    //Gets movies from the database (get reqeust)
    //Sets movie list
    const loadMovies = async ()=>{
        try{
         const res = await axios.get("https://movie-list-app-heroku.herokuapp.com/api/movie");
         setMoviesList(res.data);
         setLoading(true);
        }
        catch(err)
        {
           toast.error(err.response.data);
        }
    }

    useEffect(()=>{
        loadMovies();
    },[]);

    //Deletes a movie with a certain id
    const deleteMovie = (movieId) =>{
        if(window.confirm("Are you sure that you want to delete this movie?")) {
         axios.delete(`https://movie-list-app-heroku.herokuapp.com/api/movie/${movieId}`);
         toast.success("Movie deleted!");
         setTimeout(()=> loadMovies() , 1000);
        }
    }

    return (
    <>
    <h1 className="text-center">My Movie List</h1>
    <hr></hr>
    <Row className="g-3 m-2" xs={1} lg={2}>
    <Col lg={8}>
      <SearchBar setQuery={setQuery}/>
    </Col>
    <Col lg={4}> 
      <Select setOption={setOption}/>
    </Col>
    </Row>
    <hr></hr>
    <Row className="g-3" xs={1} md={2} lg={3}>   
    {loading && filteredMovies.map((movie)=>(
        <Col key={movie.id}>
            <MovieItem {...movie} deleteMovie={deleteMovie}/>
        </Col>
    ))}
    {loading && filteredMovies.length===0 && <h2>No results.</h2> }
    {loading && moviesList.length===0 && <h2>Add a movie in your list.</h2> }
    </Row>
    </>
    )
}