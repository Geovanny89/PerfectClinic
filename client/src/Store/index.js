import { createStore, applyMiddleware} from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootreducer from '../Redux/Reducer'

export const store = createStore(rootreducer,composeWithDevTools(applyMiddleware(thunk)))
