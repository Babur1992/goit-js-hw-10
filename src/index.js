import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    const selectElement = document.querySelector('.breed-select');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.value;
      option.text = breed.label;
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    breedSelect.innerHTML = '<option>Failed to load breeds</option>';
    breedSelect.disabled = true;
  });

breedSelect.style.display = 'none';
catInfoDiv.style.display = 'none';
loader.style.display = 'block';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.value;
      option.text = breed.label;
      breedSelect.appendChild(option);
    });
    breedSelect.style.display = 'block';
    loader.style.display = 'none';
  })
  .catch(error => {
    console.error('Error:', error);
    breedSelect.innerHTML = '<option>Failed to load breeds</option>';
    breedSelect.disabled = true;
    loader.style.display = 'none';
  });

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  catInfoDiv.style.display = 'none';
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      const catImage = data[0].url;
      const breedName = data[0].breeds[0].name;
      const breedDescription = data[0].breeds[0].description;
      const breedTemperament = data[0].breeds[0].temperament;

      const imageElement = document.createElement('img');
      imageElement.src = catImage;
      imageElement.style.maxWidth = '100%';

      const nameElement = document.createElement('h1');
      nameElement.textContent = `Breed ${breedName}`;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = `${breedDescription}`;

      const temperamentElement = document.createElement('h2');
      temperamentElement.textContent = `Temperament`;

      const temperamentDescription = document.createElement('p');
      temperamentDescription.textContent = `${breedTemperament}`;

      catInfoDiv.innerHTML = '';
      catInfoDiv.appendChild(imageElement);
      catInfoDiv.appendChild(nameElement);
      catInfoDiv.appendChild(descriptionElement);
      catInfoDiv.appendChild(temperamentElement);
      catInfoDiv.appendChild(temperamentDescription);
      catInfoDiv.style.display = 'block';
      loader.style.display = 'none';
    })

    .catch(error => {
      console.error('Error:', error);
      catInfoDiv.innerHTML = '<p>Failed to load cat data</p>';
      catInfoDiv.style.display = 'block';
      loader.style.display = 'none';
    });
});



