const initialState ={
    products:[],
    session: null,
}

function rootreducer (state = initialState,action){
    switch(action.type){
        case 'GET_PRODUCTS':
            
            return{
                ...state,
                products:action.payload
            }

        case "SET_SESSION":
            return{
                ...state,
                session: action.payload
            }
        
            default:
                return state;
    }
}

export default rootreducer