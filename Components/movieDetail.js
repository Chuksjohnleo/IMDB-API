import React,{useEffect, useState, createContext} from "react";
import { MovieContext } from "@/context/context";



export default function MovieDetail({currentMovie, cancelShowMovieDetails}){

  const {language} = createContext(MovieContext);

  const [movie, setMovie] = useState(currentMovie);

  function fetchMovie(){

    fetch('/api/get-single-movie',{
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          language: language,
          id: movie.id
      })
    })
    .then(res=>{return res.json()})
    .then(res=>{
      console.log(res)
      // setMovie(res);
    }).catch(e=>{
      console.log(e)
    })
  }

  useEffect(()=>{
    fetchMovie();
  },[])

                return(
                <div className="z-50 sticky h-screen inset-0 bg-white/80 backdrop-blur">
                    <button className="text-red-600 border m-1 p-1 text-2xl font-bold" onClick={cancelShowMovieDetails}>Cancel</button>
                    <div className="flex font-semibold text-left mx-auto my-1 max-w-[100vw] h-[90vh]  overflow-y-auto border flex-col sm:flex-row items-center sm:items-stretch sm:justify-around p-2" key={movie.id}>
                 <div className="p-4 max-w-lg"><div className="w-full text-center font-extrabold"><em>Rank: </em><em>{movie.rank}</em></div>
                      <div><img className="w-full h-[80vh] max-w-md object-contain" src={movie.image?.length>4?movie.image:'/favicon_io/android-chrome-512x512.png'} alt={movie.title} height={100} width={200} /></div>
                      </div>  <div className="p-4 max-w-lg">
                        <div className="w-full"><strong>Title: </strong><strong>{movie.title}</strong></div>
                        <div className="w-full"><strong>Full Title: </strong><strong>{movie.fullTitle}</strong></div>
                        <div className="w-full"><span className="font-extrabold">Year: </span><span>{movie.year}</span></div>
                        <div className="w-full"><span className="font-extrabold">Release date: </span><span>{movie.releaseDate}</span></div>
                        {movie.description?<div className="w-full"><span>Description: </span> <span>{movie.description}</span></div>:''}
                        <div className="w-full"><span className="font-extrabold">Rating: </span><span>{movie.imDbRating}</span></div>
                        <div className="w-full"><span className="font-extrabold">Content Rating: </span><span>{movie.contentRating}</span></div>
                        <div className="min-w-full"><span className="font-extrabold">Rating Count: </span><span>{movie.imDbRatingCount}</span></div>
                        <div className="min-w-full"><span className="font-extrabold">Plot: </span><span>{movie.plot}</span></div>
                        <div className="min-w-full"><span className="font-extrabold">Run time: </span><span>{movie.runtimeStr}</span></div>
                        <div className="w-full"><span className="font-extrabold">Awards: </span><span>{movie.awards}</span></div>
                        <div className="w-full"><span className="font-extrabold">Director: </span><span>{movie.directors}</span></div>
                        <div className="w-full"><span className="font-extrabold">Genres: </span><span>{movie.genres}</span></div>
                        <div className="w-full"><span className="font-extrabold">Languages: </span><span>{movie.languages}</span></div>
                      {/* </div> */}
                      {movie.stars?                    
                       <>
                         <h1 className="text-2xl underline">Stars</h1>
                         <ul className="list-outside pl-4 mb-4 list-disc text-xl font-semibold">
                          {
                            movie.stars.split(',').map((star, i)=>{
                              return<li key={star+i}>{star}</li>
                            })
                          }
                        </ul>
                        </>
                      :''}
                      {movie.writers?                    
                       <>
                         <h1 className="text-2xl underline">Writers</h1>
                         <ul className="list-outside pl-4 mb-4 list-disc text-xl font-semibold">
                          {
                            movie.writers.split(',').map((writer, i)=>{
                              return<li key={writer+i}>{writer}</li>
                            })
                          }
                        </ul>
                        </>
                      :''}
                      {movie.crew?                    
                       <>
                         <h1 className="text-2xl underline">Crews</h1>
                         <ul className="list-outside pl-4 mb-4 list-disc text-xl font-semibold">
                          {
                            movie.crew.split(',').map((crew, i)=>{
                              return<li key={crew+i}>{crew}</li>
                            })
                          }
                        </ul>
                        </>
                      :''}</div>
                    </div>
                </div>
                )
        
}