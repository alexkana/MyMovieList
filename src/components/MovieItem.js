import {Button, Card,ListGroup} from "react-bootstrap"
import {useNavigate } from "react-router-dom"

//Movie card that shows the movie information
export function MovieItem({id, title, year, rating, genre, imgUrl, deleteMovie}){

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <Card border="secondary" className="text-center shadow" >
             <Card.Img variant="top" src={imgUrl} style={{objectFit: "fill", height: "400px"}} />
             <Card.Body>
                <Card.Title>{title}</Card.Title>
                <ListGroup className="list-group-flush">
                 <ListGroup.Item>Year: {year}</ListGroup.Item>
                 <ListGroup.Item>Genre: {genre}</ListGroup.Item>
                 <ListGroup.Item>Rating: {rating} / 10</ListGroup.Item>
                </ListGroup>
             </Card.Body>
            <Card.Footer className="text-muted">
               <Button variant="primary" onClick={()=>handleClick(`/add/${id}`)}>Edit</Button>
                &nbsp;
                <Button variant="danger" onClick={()=>deleteMovie(id)}>Delete</Button>
             </Card.Footer>
        </Card>
    )
}

