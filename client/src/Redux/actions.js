import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERS = 'GET_TEMPERS';

export function getBreeds() {
    return async function(dispatch) {
        let breed = await axios.get('http://localhost:3002/dogs');
        let payload = breed.data;
        dispatch({type: GET_BREEDS, payload});
    }
}
