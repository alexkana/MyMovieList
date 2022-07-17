import {Form} from "react-bootstrap"
//Select element of the website
export function Select({setOption}) {
    return (
      <div>
      <Form.Select className="mt-3" onChange={(e) => setOption(e.target.value)} aria-label="Default select example">
        <option>Sort the movies:</option>
        <option value="1">Sort by year (desc)</option>
        <option value="2">Sort by year (asc) </option>
        <option value="3">Sort by title (alphabetically)</option>
      </Form.Select>
      </div>
    );
  }