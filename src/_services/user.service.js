import { authHeader, handleResponse } from '../_helpers';

const config = JSON.stringify({
    apiUrl: 'http://localhost:4000'
})

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}