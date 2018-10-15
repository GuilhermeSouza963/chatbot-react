import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './Reducers'


// usado pra funcionar plugin do chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// utilizar o thunk pra chamadas assicronas
const middlewares = [thunk]
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( ...middlewares)
    )
    )

export default store