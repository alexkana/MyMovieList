import axios from "axios"
import { AddForm } from "../components/AddForm"
import {useParams} from "react-router-dom"
//Add/Edit page
export function Add(){
    const {id} = useParams();
    return ( 
    <>
     {!id && <h1 className="text-center">Add movie</h1>}
     {id && <h1 className="text-center">Edit movie</h1>}
     <AddForm id={id} />
    </>
    )
}