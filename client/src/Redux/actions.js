import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BY_NAME = 'GET_BREEDS_BY_NAME';
export const GET_TEMPERS = 'GET_TEMPERS';
export const CREATE_BREED = 'CREATE_BREED';

export const SET_PAGE = 'SET_PAGE';
export const SET_PAGES_CONFIG = 'SET_PAGES_CONFIG';

export const SET_STATUS ='SET_STATUS';

export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTER = 'RESET_FILTER';
export const APPLY_FILTER ='APPLY_FILTER'; 


export function getBreeds() {
    return async function (dispatch) {
        let breed = await axios.get('http://localhost:3001/dogs');
        let payload = breed.data;
        dispatch({ type: GET_BREEDS, payload });
    }
}

export function getBreedsByName(name) {
    return async function (dispatch) {
        let breeds = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        let payload = breeds.data;
        dispatch({ type: GET_BREEDS_BY_NAME, payload })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        let breed = await axios.get('http://localhost:3001/temperaments');
        let payload = breed.data;
        dispatch({ type: GET_TEMPERS, payload });
    }
}

export function createDog(newDog) {
    return async function (dispatch) {
        let breed = await axios.post('http://localhost:3001/dogs', newDog);
        let payload = breed.data;
        dispatch({ type: CREATE_BREED, payload});
    }
}

export function setPageConfig() {
    return {
        type: SET_PAGES_CONFIG
    }
}

export function setPage(payload) {
    return {
        type: SET_PAGE,
        payload
    }
}

export function setStatus(payload) {
    return{
        type: SET_STATUS,
        payload
    }
}

export function resetFilter() {
    return {
        type: RESET_FILTER
    }
}

export function setFilter(payload) {
    return {
        type: SET_FILTER,
        payload
    }
}

export function applyFilter() {
    return {
        type: APPLY_FILTER
    }
}



