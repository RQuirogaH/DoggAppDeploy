import { GET_BREEDS, GET_TEMPERS } from './actions';


const initialState = {
    breeds: [],
    breedsFilter: [],
    loading: false
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }

        default:
            return state
    }
}

export default reducer;