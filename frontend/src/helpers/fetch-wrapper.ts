export const fetchWrapper = {
    delEntry,
    get,
    post,
    upload
};

let BASE_URL = process.env.BACKEND_URL ?? 'http://localhost:8088';

function get(url: string) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(BASE_URL + url, requestOptions).then(handleResponse);
}

function post(url: string, body: Object) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };

    return fetch(BASE_URL + url, requestOptions).then(handleResponse);
}

function upload(url: string, body: any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json' },
        body,
    };

    return fetch(BASE_URL + url, requestOptions).then(handleResponse);
}

function delEntry(url: string) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(BASE_URL + url, requestOptions).then(handleResponse);
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        let data = text;

        try {
            data = JSON.parse(text);
        } catch (error) {
            data = text;
        }

        if (!response.ok) {
            if ([401, 403].includes(response.status)) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            }

            const error = data || response.statusText;

            return Promise.reject({ status: response.status, error });
        }

        return data;
    });
}
