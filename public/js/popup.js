const toggleButton = document.getElementById('toggleButton');
const popupContainer = document.getElementById('popupContainer');

// Ajouter un gestionnaire d'événement pour le bouton d'ouverture
toggleButton.addEventListener('click', () => {
  popupContainer.classList.toggle('open');
  toggleButton.classList.toggle('open');
  if (toggleButton.classList.contains('open')) {
    toggleButton.innerHTML = '>';
  } else {
    toggleButton.innerHTML = '<';
  }
});

function openPopup() {
  if (!popupContainer.classList.contains('open')) {
    popupContainer.classList.toggle('open');
    toggleButton.classList.toggle('open')
    toggleButton.innerHTML = '>';
  }
}
document.addEventListener('DOMContentLoaded', function() {

  const AllLocations = document.getElementsByClassName('locations');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('submit');
  console.log(AllLocations, AllLocations.length);

  Array.from(AllLocations).forEach((element, i) => {
    console.log(element);
    element.addEventListener('click', () => { 
      console.log(searchInput.value)
      searchInput.value = element.textContent;
      searchButton.click();
      openPopup();
    });
  });
});