import React,{createContext, useState} from "react";

export const MovieContext = createContext();

export default function Context({children}){
    const [movies, setMovies] = useState([]);
    const [text, setText] = useState('IMDB');
    const [queryType, setQueryType] = useState('fetch250');
    const [language, setLanguage] = useState('en');

    function fetchMovies(){
      setMovies([]);
      setQueryType('fetch250');

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
        
          setMovies(res.items);
          setText('IMDB');
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
          console.log(res.results);
          setMovies(res.results);
          setText(`your search '${query}'`);
        
        })
      }

     function languageSetter(lang){
        setLanguage(lang);
     }

      return(
        <MovieContext.Provider value={{
            setLanguage: setLanguage,
            searchMovies: searchMovies,
            fetchMovies: fetchMovies,
            languageSetter: languageSetter,
            setQueryType: setQueryType,
            movies: movies,
            text: text,
            language: language,
            queryType: queryType,
           }}
         >
         {children}
        </MovieContext.Provider>
      )
}