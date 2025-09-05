import { useEffect, useState } from "react";

export function useWindowWidth(){
    //get screen width and set it
    const [scWidth, setScWidth] = useState(window.innerWidth);
    useEffect(
        ()=>{
        setScWidth(window.innerWidth); 

        window.addEventListener("resize", ()=>{setScWidth(window.innerWidth)});
        return()=>(
            window.removeEventListener("resize", ()=>{setScWidth(window.innerWidth)})
        )
        }
    , []);
    return {scWidth}
}