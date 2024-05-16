const BASE_URL = 'https://swapi.dev/api/';

// Function to fetch categories from the Star Wars API
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

// Function to fetch data for a specific category from the Star Wars API
export async function getCategoryData(url) {
  let results = [];
  let nextPage = url;

  // Fetch data from all pages of the category
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

// Function to fetch data from a specific URL
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