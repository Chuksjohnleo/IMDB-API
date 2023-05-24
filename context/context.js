import React,{createContext, useState} from "react";

export const MovieContext = createContext();

export default function Context({children}){
    const [movies, setMovies] = useState([]);
    const [text, setText] = useState('IMDB');
    const [infoText, setInfoText] = useState({first: 'Top', second: 'from the'});
    const [queryType, setQueryType] = useState('fetch250');
    const [language, setLanguage] = useState('en');
    const [number, setNumber] = useState('none');//number is movie count

const CACHE_KEY = 'movies';
const CACHE_TIMEOUT = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

function getMovies() {
  setMovies([]);
  setQueryType('fetch250');
  // localStorage.removeItem(CACHE_KEY);
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const age = Date.now() - timestamp;

    if (age <= CACHE_TIMEOUT) {
      // Data is still fresh, return cached data
      console.log(data.items, timestamp, age , Date.now())
      return setMovies(data.items);
    } else {
      // Data is stale, clear the cache
      localStorage.removeItem(CACHE_KEY);
    }
   
  }
  // Data is not in the cache, fetch it from the API
  return fetchMovies();
}

    function fetchMovies(){

        fetch('/api/fetch-movies',{
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              language: language
          })
        })
        .then(res=>{return res.json()})
        .then(res=>{
          if(!res.items){
            setNumber('not counting');
            setInfoText({first:'', second: ''})
            return setText('Unknown Error');//I may still add a proper indication of the error to the user.
          }
          if(res.errorMessage.length > 2){
            setNumber('not counting');
            setInfoText({first:'', second: ''});
            return setText(res.errorMessage);
          } 
          setMovies(res.items);
          setText('IMDB');
          const timestamp = Date.now();
          localStorage.setItem(CACHE_KEY, JSON.stringify({data: res, timestamp: timestamp }));
    
        }).catch(e=>{
          console.error(e)
        })
      }

      function searchMovies(query){
        setMovies([]);
        setQueryType('search');

        fetch('/api/search-movies',{
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              language: language,
              query: query
          })
        })
        .then(res=>{return res.json()})
        .then(res=>{
          // console.log(res.results);
          setMovies(res.results);
          setText(`your search '${query}'`);
        
        }).catch(e=>{
          console.error(e)
        })
      }

     function languageSetter(lang){
        setLanguage(lang);
     }

      return(
        <MovieContext.Provider value={{
            setLanguage: setLanguage,
            searchMovies: searchMovies,
            fetchMovies: getMovies,
            languageSetter: languageSetter,
            setQueryType: setQueryType,
            setMovies: setMovies,
            setText: setText,
            CACHE_TIMEOUT: CACHE_TIMEOUT,
            CACHE_KEY: CACHE_KEY,
            movies: movies,
            text: text,
            language: language,
            queryType: queryType,
            infoText: infoText,
            number: number,
            setNumber: setNumber
           }}
         >
         {children}
        </MovieContext.Provider>
      )
}