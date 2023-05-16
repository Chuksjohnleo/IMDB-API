import React, {useState, useEffect } from "react";


export default function Footer(){
    const [date, setDate] = useState('')
  useEffect(()=>{
    let theDate = new Date();
    setDate(theDate.getFullYear());
  },[])
    return(
        <footer className="border-t">
          <div>
            <a href="https://twitter.com/Chuksjohnleo">Twitter</a>
          </div>
          <p>
            &copy; Chuksjohnleo,<span>{date}</span>
          </p>
        </footer>
    )
}