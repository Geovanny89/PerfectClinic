import React from "react";
import './paginado.css'

export default function Paginado({productPorPage,allProducts,paginado}){
    const pageNumbers= []

    for(let i= 0; i<=Math.ceil(allProducts/productPorPage)-1;i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className="barra">
            <ul>
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <li className="number" key={number}>
                        <button onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}