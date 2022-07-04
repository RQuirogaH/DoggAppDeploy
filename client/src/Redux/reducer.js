import {
    GET_BREEDS,
    GET_BREEDS_BY_NAME,
    GET_TEMPERS,
    ORDER_BREEDS,
    FILTER_TEMP,
    FILTER_ORIGIN,
    SET_PAGES_CONFIG,
    SET_PAGE,
    CREATE_BREED
} from './actions';


const initialState = {
    breeds: [],
    breedsFilter: [],
    temperaments: [],
    page: {
        cardsPerPage: 9,
        min: 1,
        max: null,
        current: 1
    },
    status: 'LOADING'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload.data,
                breedsFilter: action.payload.data,
                status: action.payload.status
            }

        case GET_BREEDS_BY_NAME:
            return {
                ...state,
                breeds: action.payload.data,
                breedsFilter: action.payload.data,
                status: action.payload.status
            }

        case GET_TEMPERS:
            return {
                ...state,
                temperaments: action.payload.data,
                status: action.payload.status
            }

        case FILTER_TEMP:
            if (action.payload === 'All') {
                return {
                    ...state,
                    breedsFilter: state.breeds,
                    status: 'OK'
                }
            }
            return {
                ...state,
                status: 'OK',
                breedsFilter: state.breeds.filter(e => e.temperament?.includes(action.payload))
            }

        case FILTER_ORIGIN:
            if (action.payload === 'API') {
                return {
                    ...state,
                    breedsFilter: state.breeds.filter(e => typeof e.id === 'number'),
                    status: 'OK'
                }
            }
            if (action.payload === 'DB') {
                return {
                    ...state,
                    breedsFilter: state.breeds.filter(e => typeof e.id === 'string'),
                    status: 'OK'
                }
            }
            return {
                ...state,
                breedsFilter: state.breeds,
                status: 'OK'
            }

        case ORDER_BREEDS:

            if (action.payload === 'name_asc') {
                let breedsOrdered = [...state.breedsFilter]

                breedsOrdered.sort(function (a, b) {
                    let aLowerCase = a.name.toLowerCase();
                    let bLowerCase = b.name.toLowerCase();
                    if (aLowerCase < bLowerCase) return -1
                    if (aLowerCase > bLowerCase) return 1
                    return 0
                });

                return {
                    ...state,
                    breedsFilter: [...breedsOrdered],
                    status: 'OK'
                }
            }

            if (action.payload === 'name_des') {
                let breedsOrdered = [...state.breedsFilter]
                breedsOrdered.sort(function (a, b) {
                    let aLowerCase = a.name.toLowerCase();
                    let bLowerCase = b.name.toLowerCase();
                    if (aLowerCase < bLowerCase) return 1
                    if (aLowerCase > bLowerCase) return -1
                    return 0
                });
                return {
                    ...state,
                    status: 'OK',
                    breedsFilter: [...breedsOrdered]
                }
            }

            if (action.payload === 'weight_asc') {
                let breedsOrdered = [...state.breedsFilter]
                breedsOrdered.sort(function (a, b) {
                    let aWeight = parseInt(a.weight.split(' ')[0]);
                    let bWeight = parseInt(b.weight.split(' ')[0]);

                    if (isNaN(aWeight)) {
                        aWeight = Infinity;
                    }
                    if (isNaN(bWeight)) {
                        bWeight = Infinity;
                    }

                    if (aWeight < bWeight) return -1
                    if (aWeight > bWeight) return 1
                    return 0
                });
                return {
                    ...state,
                    status: 'OK',
                    breedsFilter: [...breedsOrdered]
                }
            }

            if (action.payload === 'weight_des') {
                let breedsOrdered = [...state.breedsFilter]
                breedsOrdered.sort(function (a, b) {
                    let aWeight = parseInt(a.weight.split(' ')[0]);
                    let bWeight = parseInt(b.weight.split(' ')[0]);

                    if (isNaN(aWeight)) {
                        aWeight = 0;
                    }
                    if (isNaN(bWeight)) {
                        bWeight = 0;
                    }

                    if (aWeight < bWeight) return 1
                    if (aWeight > bWeight) return -1
                    return 0
                });
                return {
                    ...state,
                    status: 'OK',
                    breedsFilter: [...breedsOrdered]
                }
            }

            return state

        case SET_PAGES_CONFIG:
            return {
                ...state,
                page: { ...state.page, max: Math.ceil(state.breedsFilter.length / state.page.cardsPerPage) }
            }

        case SET_PAGE:
            return {
                ...state,
                page: { ...state.page, current: action.payload }
            }

        case CREATE_BREED: {
            console.log(action)
            return {
                ...state,
                breeds: [...state.breeds, action.payload.data[0]],
                status: action.payload.status
            }
        }

        default:
            return state
    }
}

export default reducer;