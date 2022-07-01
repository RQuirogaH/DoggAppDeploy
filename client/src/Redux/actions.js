import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BY_NAME = 'GET_BREEDS_BY_NAME';
export const GET_TEMPERS = 'GET_TEMPERS';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const FILTER_TEMP = 'FILTER_TEMP';
export const FILTER_ORIGIN ='FILTER_ORIGIN';
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGES_CONFIG = 'SET_PAGES_CONFIG';


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

export function orderBreeds(payload) {
    return {
        type: ORDER_BREEDS,
        payload
    }
}

export function filterTemp(payload) {
    return {
        type: FILTER_TEMP,
        payload
    }
}

export function filterOrigin(payload){
    return {
        type: FILTER_ORIGIN,
        payload
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


