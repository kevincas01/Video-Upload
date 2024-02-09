import React from 'react'
import { useNavigate } from 'react-router-dom';
const SearchContainer = () => {
    const navigate=useNavigate()
    const [searchInput,setSearchInput]=React.useState<string>("");

    const handleSearch = ()=>{
        if(!searchInput){
          return
        }
  
        //Otherwise fetch the videos with the search bar
        //route you to the appropriate page via url that has the search query of the search input 
  
        console.log("searching")
      }
  return (
    <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>

        <input type="text" placeholder="Search" className="search-input" onChange={(e)=>{setSearchInput(e.target.value)}}/>
        <button type="submit" className="search-button">
          {'->'}
        </button>
        </form>

        <button className="upload-button" onClick={()=>{navigate('/upload')}}>Upload</button>
      </div>
  )
}

export default SearchContainer