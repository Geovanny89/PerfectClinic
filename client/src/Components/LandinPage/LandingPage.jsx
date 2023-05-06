import React, { useState } from 'react';
import './landinPage.css'
import Cookies from 'js-cookie';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setSession } from '../../Redux/Actions';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const [datos,setDatos]=useState({
        nombreUsuario:"",
        contraseña:""
    })

    const handleinputChange=(e)=>{
        let {name,value}=e.target;
        let newDatos ={...datos,[name]:value}
        setDatos(newDatos)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!e.target.checkValidity()){
            console.log('No enviar')
        }else{
            setLoading(true)
            let response =await axios.post("http://localhost:3001/login",datos,{
                withCredentials: true
            })
            if(response.status === 200){
                const expiresIn = 2 / 24;
                Cookies.set('session', response.data.token, { expires: expiresIn });
                dispatch(setSession(response.data.user))
                navigate("/home")
            }
            else{
                setLoading(false)
                // aqui se manda el error
            }
           
            
        }
     };
    
    return (
        <div id="contenedor">

            <div id="contenedorcentrado">
                <div id="login">
                    <form onSubmit={handleSubmit} id="loginform">
                        <label htmlFor="usuario">Usuario</label>
                        <input id="usuario" type="text" onChange={handleinputChange} value={datos.nombreUsuario} name="nombreUsuario" placeholder="Usuario" required/>

                            <label htmlFor="password">Contraseña</label>
                            <input id="password" type="password" onChange={handleinputChange} value={datos.contraseña} placeholder="Contraseña" name="contraseña" required/>
                          
                        <button type="submit" title="Ingresar" name="Ingresar" disabled={loading}>Login</button>
                     
                                
                    </form>

                        </div>
                        <div id="derecho">
                            <div className="titulo">
                                Bienvenido
                            </div>
                            <hr />
                            <div className="pie-form">
                                <a href="#">¿Perdiste tu contraseña?</a>
                                <a href="#">¿No tienes Cuenta? Registrate</a>
                                <hr />
                                <a href="#">« Volver</a>
                            </div>
                        </div>
                </div>
            </div>
            
            )
}
