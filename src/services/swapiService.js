const BASE_URL = 'https://swapi.dev/api/';

export async function getCategories() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function getCategoryData(url) {
    let results = [];
    let nextPage = url;

    while (nextPage) {
        try {
            const response = await fetch(nextPage);
            const data = await response.json();
            results = results.concat(data.results);
            nextPage = data.next;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return results;
}

export async function fetchDataByUrl(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}
