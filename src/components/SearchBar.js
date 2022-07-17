import "../styles/SearchBar.css"
//Search bar of the website
export function SearchBar({setQuery}){
    return (
        <div className="search">
            <input onChange={(e) => setQuery(e.target.value.toLowerCase())} placeholder="Search by title" />
        </div>
    )
}