import React,{useEffect, useState, useContext} from "react";
import { MovieContext } from "@/context/context";
import MovieDetail from "./movieDetail";


export default function HomeLayout(){
 
   const  {setText, infoText, number, setNumber, setMovies, CACHE_KEY, movies, text} = useContext(MovieContext);
   const [currentMovie, setCurrentMovie] = useState({});
   const [viewDetails, setViewDetails] = useState(false);
   
   
    // useEffect(()=>{
    //     fetchMovies();
    // },[]);

   function showMovieDetails(movie){
    setCurrentMovie(movie);
    setViewDetails(true);
    document.documentElement.style.overflowY = 'hidden';
   }

   function cancelShowMovieDetails(){
    setCurrentMovie({});
    setViewDetails(false);
    document.documentElement.style.overflowY = 'auto';
   }

   function filterMovies(e){
    let { data } = JSON.parse(localStorage.getItem(CACHE_KEY));
    let filtered = data.items.filter(item=>{
       return item.title.toLowerCase().includes(e.toLowerCase())
    });
    setMovies(filtered)
    setNumber(filtered.length)
    setText('filter')
   }

    
    if(movies.length<1 && number === 'none'){
        return(
            <>
             <div className="flex w-[95vw] overflow-x-hidden h-[80vh] justify-center items-center">
              <h1 className="animate-ping font-extrabold">
                Loading The shits .....
              </h1>
             </div>
            </>
        )
    }

    
    if(infoText.first.length<1 && number === 'not counting'){
        return(
            <>
             <div className="flex w-[95vw] overflow-x-hidden h-[80vh] justify-center items-center">
              <h1 className="animate-pulse font-extrabold text-red-800 text-2xl bg-white/20 rounded-lg p-5">
               Shitting the Loads .....Error
              </h1>
             </div>
            </>
        )
    }

    return(
        <>
          {viewDetails?<MovieDetail cancelShowMovieDetails={cancelShowMovieDetails} currentMovie={currentMovie} />:''}
          <main
            className={`flex min-h-screen flex-col items-center`}
            >
          <h1 className="text-3xl font-extrabold w-full p-1 shadow-blue-50 bg-white/80">{`${infoText.first} ${movies.length} ${infoText.second} ${text}`}</h1>
          <div className="flex m-3 justify-center">
                <div className="border rounded-lg mb-1">
                  <input onInput={(e)=>filterMovies(e.target.value)} className="p-2 focus:outline-black/20 bg-white/30" type="text" placeholder="Filter movies" />
                  <button className="border-l active:text-white active:bg-black p-2 font-bold">{number}</button>
                </div>
          </div>
         {movies.length<1? <div className="text-5xl font-bold w-full">Nothing here</div> :<div className="grid grid-cols-1 sm:grid-cols-4 xSm:grid-cols-2 my-2 w-fullbg-white/30 backdrop-blur">
            
            {movies.map(movie=>{
                return(
                    <div onClick={()=>showMovieDetails(movie)} className="border items-center m-1 p-2" key={movie.id}>
                      <div className="p-2 font-bold"><em>Rank: </em><em>{movie.rank}</em></div>
                      {/* <div className="h-[300px]"><img src={movie.image.length>4?movie.image:'/favicon_io/android-chrome-512x512.png'} alt={movie.title} className="h-[300px]"/></div> */}
                      <div><strong>{movie.title}</strong></div>
                      <div>{movie.description}</div>
                      <div>{movie.imDbRating}</div>
                    </div>
                )
            })}
          </div>
          }
          </main>
        </>
    )
}
