import axios from 'axios'

export function getProducts(){
    return async function(dispatch){
        var json =await axios.get("http://localhost:3001/allproduct")
        console.log(json)
        return dispatch({
            type: 'GET_PRODUCTS',
            payload:json.data
        })
    }
}

export function setSession(session){
    console.log(session)
    return async function(dispatch){
        return dispatch({
            type: 'SET_SESSION',
            payload: session
        })
    }
}
