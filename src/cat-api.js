const url = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_3r0ptvuCwwQyqZJqij63c08L88v7SbeCic2i4cKAfWjOMTjpn0N6vWfaQsV73I20';

function fetchBreeds() {
  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds.');
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        value: breed.id,
        label: breed.name,
      }));
    });
}

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch cat information.');
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
