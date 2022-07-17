import {Form,Button} from "react-bootstrap"
import {useEffect, useState} from "react"
import "../styles/Form.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import { Formik } from "formik"
import * as yup from "yup" 

//Form to add/edit a movie

//Validation schema (used yup)
const schema = yup.object().shape({
  title: yup.string().required("Enter the title").min(2,"Too short").max(100,"Too long"),
  year: yup.string().required("Enter the year").matches(/^[0-9]+$/, "Enter a valid year").min(1,"Enter a valid year").max(4,"Enter a valid year").test("Year validation","Type a valid year",value=>{
    return (parseInt(value) >=0 && parseInt(value) <=2022)
  }),
  genre: yup.string().required("Enter the genre"),
  rating: yup.string().required("Enter the rating").matches(/^[0-9]+(?:\.[0-9]+)?$/, "Enter a valid rating (0-10)").test("Rating validation","Enter a valid rating",value=>{
    return (parseFloat(value)>=0 && parseFloat(value) <=10)
  }),
  imgUrl: yup.string().url("Enter a valid URL")
});


export function AddForm({id}){
const [movieInfo,setMovieInfo] = useState({
   title:"",
   year:"",
   genre:"",
   rating:"",
   imgUrl:""
});
const [loading,setLoading] = useState(false);
const navigate = useNavigate();

useEffect(()=>{
  if (id){
    //Gets the movie user wants to edit
    axios.get(`https://movie-list-app-heroku.herokuapp.com/api/movie/${id}`)
    .then((res) =>{
     setMovieInfo(res.data[0]);
    })
    .catch(err => toast.error(err.response.data))
  }
  setLoading(true);
},[])

const submitForm = (movieData) =>{
  // Adds/Updates a movie using post or put request
  if(movieData.imgUrl==="")
  {
    movieData.imgUrl = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-800x800.jpg";
  }

  if(!id){
  axios.post("https://movie-list-app-heroku.herokuapp.com/api/movie",movieData)
  .then(()=>{
    setMovieInfo({title:"",
    year:"",
    genre:"",
    rating:"",
    imgUrl:""});
  })
  .catch(err =>{
    toast.error(err.response.data);
  })
  toast.success("Added a movie!")
}
else{
  axios.put(`https://movie-list-app-heroku.herokuapp.com/api/movie/${id}`,movieData)
  .then(()=>{
    setMovieInfo({title:"",
    year:"",
    genre:"",
    rating:"",
    imgUrl:""});  
  })
  .catch(err =>{
    toast.error(err.response.data);
  })
  toast.success("Movie updated!")
}
}

  return !loading ? (<div>Loading</div> ): (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values,{resetForm,setSubmitting}) => {
        console.log(values);
        setSubmitting(true)
        submitForm(values);
        resetForm();
        setSubmitting(false); 
        setTimeout(()=>navigate("/"),500);
      }}
      initialValues={movieInfo}
      >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        resetForm,
        setSubmitting,
        values,
        touched,
        isValid,
        errors,
      }) =>(
    <div className="d-flex flex justify-content-center align-items-center text-center">
    <Form noValidate className="form rounded" onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Movie poster URL:</Form.Label>
        <Form.Control value ={values.imgUrl} type="text" name="imgUrl" placeholder="Enter poster URL" onChange={handleChange} isValid={touched.imgUrl && !errors.imgUrl} isInvalid={errors.imgUrl}/>
        <Form.Control.Feedback type="invalid">{errors.imgUrl}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control value ={values.title} required type="text" name="title" placeholder="Enter title" onChange={handleChange} isValid={touched.title && !errors.title} isInvalid={errors.title}/>
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formYear">
        <Form.Label>Year:</Form.Label>
        <Form.Control value={values.year} required type="text" name="year" placeholder="Enter year" onChange={handleChange} isValid={touched.year && !errors.year}  isInvalid={errors.year}/>
        <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGenre">
        <Form.Label>Genre:</Form.Label>
        <Form.Control value ={values.genre} required type="text"  name="genre" placeholder="Enter genre" onChange={handleChange} isValid={touched.genre && !errors.genre} isInvalid={errors.genre}/>
        <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formReview">
        <Form.Label>Rating:</Form.Label>
        <Form.Control value ={values.rating} required type="text"  name="rating" placeholder="Enter rating" onChange={handleChange} isValid={touched.rating && !errors.rating} isInvalid={errors.rating}/>
        <Form.Control.Feedback type="invalid">{errors.rating} </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" style={{width: "150px"}}>
      {!id && <span>Add</span>} {id && <span>Update</span>}
      </Button>
    </Form>
    </div>
  )}
  </Formik>
  )
}