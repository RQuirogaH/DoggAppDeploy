import {GET_BREEDS, 
        GET_BREEDS_BY_NAME, 
        GET_TEMPERS, 
        ORDER_BREEDS, 
        FILTER_TEMP, 
        FILTER_ORIGIN, 
        GET_BREED_DETAIL 
    } from './actions';


const initialState = {
    breeds: [],
    breedsFilter: [],
    breedDetail: [],
    temperaments: [],
    loading: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                breedsFilter: action.payload
            }
            
        case GET_BREEDS_BY_NAME:
            return {
                ...state,
                breeds: action.payload,
                breedsFilter: action.payload
            }
        
        case GET_BREED_DETAIL: {
            return {
                ...state,
                breedDetail: action.payload
            }
        }

        case GET_TEMPERS:
            return {
                ...state,
                temperaments: action.payload
            }

        case FILTER_TEMP:
            if(action.payload === 'All') {
                return {
                    ...state,
                    breedsFilter: state.breeds
                }
            }
            return{
                ...state,
                breedsFilter: state.breeds.filter(e => e.temperament?.includes(action.payload))
            }

        case FILTER_ORIGIN:
            if(action.payload === 'API') {
                return {
                    ...state,
                    breedsFilter: state.breeds.filter(e => typeof e.id === 'number')
                }
            }
            if(action.payload === 'DB') {
                return {
                    ...state,
                    breedsFilter: state.breeds.filter(e => typeof e.id === 'string')
                }
            }
            return {
                ...state,
                breedsFilter: state.breeds
            }

        case ORDER_BREEDS: 

            if(action.payload === 'name_asc'){
                let breedsOrdered = [...state.breedsFilter]

                breedsOrdered.sort(function(a,b) {
                    let aLowerCase = a.name.toLowerCase();
                    let bLowerCase = b.name.toLowerCase();
                    if(aLowerCase < bLowerCase) return -1
                    if(aLowerCase > bLowerCase) return 1
                    return 0
                });

                return {
                    ...state,
                    breedsFilter: [...breedsOrdered]
                }
            }

            if(action.payload === 'name_des'){
                let breedsOrdered = [...state.breedsFilter]
                breedsOrdered.sort(function(a,b) {
                    let aLowerCase = a.name.toLowerCase();
                    let bLowerCase = b.name.toLowerCase();
                    if(aLowerCase < bLowerCase) return 1
                    if(aLowerCase > bLowerCase) return -1
                    return 0
                });
                return {
                    ...state,
                    breedsFilter: [...breedsOrdered]
                }
            }

            if(action.payload === 'weight_asc'){
                let breedsOrdered = [...state.breedsFilter]
                breedsOrdered.sort(function(a,b) {
                    let aWeight = parseInt(a.weight.split(' ')[0]);
                    let bWeight = parseInt(b.weight.split(' ')[0]);

                    if(isNaN(aWeight)) {
                        aWeight = Infinity;
                    }
                    if(isNaN(bWeight)) {
                        bWeight = Infinity;
                    }

                    if(aWeight < bWeight) return -1
                    if(aWeight > bWeight) return 1
                    return 0
                });
                return {
                    ...state,
                    breedsFilter: [...breedsOrdered]
                }
            }

            if(action.payload === 'weight_des'){
                let breedsOrdered = [...state.breedsFilter]
                breedsOrdered.sort(function(a,b){
                    let aWeight = parseInt(a.weight.split(' ')[0]);
                    let bWeight = parseInt(b.weight.split(' ')[0]);

                    if(isNaN(aWeight)) {
                        aWeight = 0;
                    }
                    if(isNaN(bWeight)) {
                        bWeight = 0;
                    }

                    if(aWeight < bWeight) return 1
                    if(aWeight > bWeight) return -1
                    return 0
                });
                return {
                    ...state,
                    breedsFilter: [...breedsOrdered]
                }
            }

            return state
        
            default:
            return state
    }
}

export default reducer;