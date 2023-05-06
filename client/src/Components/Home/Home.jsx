import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/Actions'
import Card from '../Card/Card'
import './home.css'
import Paginado from '../Paginado/Paginado'

export default function Home() {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.products)

  //paginado
  const [order,setOrder]=useState(''); // estado local que inicia vacio
    const [currentPage, setCurrentPage]=useState(1)//pagina actual que arranca en 1
    const [productPorPage, setProductPorPage]= useState(6) // muestro 6 productos
    const indexOfLastProduct= currentPage * productPorPage 
    const indexOfFirstProduct = indexOfLastProduct - productPorPage //
    const currentProduct = allProducts.slice(indexOfFirstProduct,indexOfLastProduct,)
    const paginado = (pageNumber) =>{
      setCurrentPage(pageNumber);
  };

  console.log(allProducts)
  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className='inventario'>
      <h1>Perfect Clinic</h1>
    <div className='vista'>

      <div className='caja1'>
        <h2>Bienvenido</h2>
        
        <div className='buttom1'>

          <button>Productos</button>
        </div>
        <div>
          <button>Nuevo Producto</button>

        </div>
        <div>
          <button>Actualizar</button>

        </div>
        <div>

          <button>Eliminar</button>
        </div>
      </div>
      {/* <div className='caja2'>
       
      {
        allProducts?.map(el=>{
          return(

            <Card key={el.id} nombre={el.nombre} imagen={el.imagen}/>
           
          )
        })
      }
      </div> */}
       
      <div className="caja2">
      
        <div className="fila">
          
          {currentProduct.slice(0, 3).map((el) => (
            <Card key={el.id} nombre={el.nombre} imagen={el.imagen} />
          ))}
        </div>
        <div className="fila">
          {currentProduct.slice(3, 6).map((el) => (
            <Card key={el.id} nombre={el.nombre} imagen={el.imagen} />
          ))}
        </div>
        <Paginado
        productPorPage={productPorPage}
        allProducts={allProducts.length}
        paginado={paginado}
        />
      </div>
      
    </div>
    </div>
  )
}
