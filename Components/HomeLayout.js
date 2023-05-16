import React,{useEffect, useState, useContext} from "react";
import { MovieContext } from "@/context/context";


export default function HomeLayout(){
 
   const  {fetchMovies, movies, text, language} = useContext(MovieContext);

   
    useEffect(()=>{
        fetchMovies();
    },[])

    
    if(movies.length<1){
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
    return(
        <>
          <h1 className="text-3xl font-extrabold w-full p-1 shadow-blue-50 bg-white/80">{`Top ${movies.length} Movies from ${text}`}</h1>
          <h2 className="text-3xl font-extrabold">{language}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 xSm:grid-cols-2 my-2 w-full border bg-white/30 backdrop-blur">
            
            {movies.map(movie=>{
                return(
                    <div className="flex border flex-col justify-center items-center m-1 p-2" key={movie.id}>
                      <div><em>{movie.rank}</em></div>
                      <div><img src={movie.image.length>4?movie.image:'/favicon_io/android-chrome-512x512.png'} alt={movie.title} height={100} width={200} /></div>
                      <div><strong>{movie.title}</strong></div>
                      <div>{movie?.description}</div>
                      <div>{movie?.imDbRating}</div>
                    </div>
                )
            })}
          </div>
        </>
    )
}