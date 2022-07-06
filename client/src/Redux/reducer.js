import {
    GET_BREEDS,
    GET_BREEDS_BY_NAME,
    GET_TEMPERS,
    SET_PAGES_CONFIG,
    SET_PAGE,
    CREATE_BREED,
    SET_STATUS,
    RESET_FILTER,
    SET_FILTER,
    APPLY_FILTER
} from './actions';


const initialState = {
    breeds: [],
    breedsFilter: [],
    temperaments: [],
    breedCreated: {},
    page: {
        cardsPerPage: 8,
        min: 1,
        max: null,
        current: 1
    },
    filters: {
        order: 'name_asc',
        temperament: 'All',
        created: 'All'
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
            return {
                ...state,
                breedCreated: action.payload.data[0],
                status: action.payload.status
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.payload
            }
        }

        case SET_FILTER: {
            return {
                ...state,
                filters: { ...state.filters, [action.payload.key]: action.payload.value }
            }
        }

        case APPLY_FILTER: {
            let breedsFiltered = [...state.breeds];

            //Aplicar filtro de temperamento
            if (state.filters.temperament !== 'All') {
                breedsFiltered = breedsFiltered.filter(e => e.temperament?.includes(state.filters.temperament))
            }

            //Aplicar filtro de origen
            if (state.filters.created === 'API') {
                breedsFiltered = breedsFiltered.filter(e => typeof e.id === 'number')
            }
            if (state.filters.created === 'DB') {
                breedsFiltered = breedsFiltered.filter(e => typeof e.id === 'string')
            }

            //Ordenar
            if (state.filters.order === 'name_asc') {
                breedsFiltered.sort(function (a, b) {
                    let aLowerCase = a.name.toLowerCase();
                    let bLowerCase = b.name.toLowerCase();

                    if (aLowerCase < bLowerCase) return -1
                    if (aLowerCase > bLowerCase) return 1
                    return 0
                });
            }

            if (state.filters.order === 'name_des') {
                breedsFiltered.sort(function (a, b) {
                    let aLowerCase = a.name.toLowerCase();
                    let bLowerCase = b.name.toLowerCase();

                    if (aLowerCase < bLowerCase) return 1
                    if (aLowerCase > bLowerCase) return -1
                    return 0
                });
            }

            if (state.filters.order === 'weight_asc') {
                breedsFiltered.sort(function (a, b) {
                    let aWeight = parseInt(a.weight.split(' ')[0]);
                    let bWeight = parseInt(b.weight.split(' ')[0]);

                    if (isNaN(aWeight)) aWeight = Infinity;
                    if (isNaN(bWeight)) bWeight = Infinity;

                    if (aWeight < bWeight) return -1
                    if (aWeight > bWeight) return 1
                    return 0
                });
            }

            if (state.filters.order === 'weight_des') {
                breedsFiltered.sort(function (a, b) {
                    let aWeight = parseInt(a.weight.split(' ')[0]);
                    let bWeight = parseInt(b.weight.split(' ')[0]);

                    if (isNaN(aWeight)) aWeight = 0;
                    if (isNaN(bWeight)) bWeight = 0;

                    if (aWeight < bWeight) return 1
                    if (aWeight > bWeight) return -1
                    return 0
                });
            }

            return {
                ...state,
                breedsFilter: [...breedsFiltered]
            }

        }

        case RESET_FILTER: {
            return {
                ...state,
                filters: {
                    order: 'name_asc',
                    temperament: 'All',
                    created: 'All'
                }
            }
        }

        default:
            return state
    }
}

export default reducer;