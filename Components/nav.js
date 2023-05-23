import React, {useState, useContext, useEffect } from "react";
import { MovieContext } from "@/context/context";
import Link from "next/link";

export default function Nav(){
  const {languageSetter, language, fetchMovies, searchMovies, queryType, setQueryType } = useContext(MovieContext);
  const [query, setQuery] = useState('');
  // const [search, setSearch] = useState(false);
 
  

  function fetchAsRequired(){
    // console.log(language, e.target.value)
    if(queryType === 'fetch250'){
      fetchMovies();
    }else{
      searchMovies(query)
    }
 
 }

 useEffect(()=>{
  fetchAsRequired()
 },[language, queryType])

    return(
      <>
        <nav className="flex flex-col justify-around border-b z-50 bg-white/90 sticky top-0">
            <div className="p-2">
              <label className="text-xl" htmlFor="language">Select Language</label>
              <select value={language} onChange={(e)=> languageSetter(e.target.value)} className="border rounded-lg mx-1 focus:outline-black/20" id="language">
                <option value='en'>English</option>
                <option value='ger'>German</option>
              </select>
            </div>
            <div className="flex justify-center">
                <div className="border rounded-lg mb-1">
                  <input onInput={(e)=>setQuery(e.target.value)} className="p-2 focus:outline-black/20 bg-white/30" type="text" placeholder="Search movies" />
                  <button onClick={()=>searchMovies(query)} className="border-l active:text-white active:bg-black p-2 font-bold">Search</button>
                </div>
            </div>
        </nav>
          {queryType==='search'?<div><button className="text-3xl border p-2 bg-white/80 font-bold" onClick={()=>setQueryType('fetch250')}>Fetch Top 250 Movies</button></div>:''}
        </>
    )
}