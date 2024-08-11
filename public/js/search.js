document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search-input');
    var suggestionList = document.getElementById('suggestion-list');
    var artistCards = document.querySelectorAll('.profile-card');
    var sortSelect = document.getElementById('sort-select');

    var MIN_SEARCH_LENGTH = 2;

    if (searchInput && suggestionList) {
        searchInput.addEventListener('input', function () {
            var searchTerm = searchInput.value.trim().toLowerCase();

            if (searchTerm.length >= MIN_SEARCH_LENGTH) {
                filterCards(searchTerm);
                showSuggestions(searchTerm);
            } else {
                filterCards('');
                suggestionList.innerHTML = '';
            }
        });

        sortSelect.addEventListener('change', function () {
            var selectedValue = sortSelect.value;
            sortCards(selectedValue);
        });

        function showSuggestions(searchTerm) {
            suggestionList.innerHTML = '';

            var suggestions = Array.from(artistCards).map(function (card) {
                var group = card.querySelector('#Group').textContent.toLowerCase();
                var location = card.querySelector('#Location').textContent.toLowerCase();
                var members = card.querySelector('#Member').textContent.toLowerCase();
                var firstAlbum = card.querySelector('#FirstAlbum').textContent.toLowerCase();
                var creationDate = card.querySelector('#CreationDate').textContent.toLowerCase();

                return { group, location, members, firstAlbum, creationDate };
            }).filter(function (artist) {
                return (
                    artist.group.includes(searchTerm) ||
                    artist.location.includes(searchTerm) ||
                    artist.members.includes(searchTerm) ||
                    artist.firstAlbum.includes(searchTerm) ||
                    artist.creationDate.includes(searchTerm)
                );
            });

            suggestions.forEach(function (artist) {
                var suggestionItem = document.createElement('li');
                suggestionItem.textContent = artist.group + ', ' + artist.location + ', ' + artist.members + ', ' + artist.firstAlbum + ', ' + artist.creationDate;
                suggestionItem.addEventListener('click', function () {
                    searchInput.value = artist.group;
                    filterCards(artist.group.toLowerCase());
                    suggestionList.innerHTML = ''; // Supprime les suggestions après le clic
                });
                suggestionList.appendChild(suggestionItem);
            });
        }
    }

    function filterCards(searchTerm) {
        for (var i = 0; i < artistCards.length; i++) {
            var card = artistCards[i];
            var group = card.querySelector('#Group').textContent.toLowerCase();
            var location = card.querySelector('#Location').textContent.toLowerCase();
            var members = card.querySelector('.member').textContent.toLowerCase();
            var firstAlbum = card.querySelector('#FirstAlbum').textContent.toLowerCase();
            var creationDate = card.querySelector('#CreationDate').textContent.toLowerCase();

            

            if (
                group.includes(searchTerm) ||
                location.includes(searchTerm) ||
                members.includes(searchTerm) ||
                firstAlbum.includes(searchTerm) ||
                creationDate.includes(searchTerm)
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    }

    function sortCards(selectedValue) {
        var sortedCards = Array.from(artistCards);

        sortedCards.sort(function (a, b) {
            var aValue, bValue;

            switch (selectedValue) {
                case 'creation':
                    aValue = convertToDate(a.querySelector('#CreationDate').textContent);
                    bValue = convertToDate(b.querySelector('#CreationDate').textContent);
                    break;
                case 'first-album':
                    aValue = convertToDate(a.querySelector('#FirstAlbum').textContent);
                    bValue = convertToDate(b.querySelector('#FirstAlbum').textContent);
                    break;
                case 'members':
                    aValue = a.querySelector('#Member').textContent.toLowerCase();
                    bValue = b.querySelector('#Member').textContent.toLowerCase();
                    break;
                case 'location':
                    aValue = a.querySelector('#Location').textContent.toLowerCase();
                    bValue = b.querySelector('#Location').textContent.toLowerCase();
                    break;
                default:
                    return 0;
            }

            if (selectedValue === 'first-album' || selectedValue === 'creation') {
                if (aValue < bValue) {
                    return -1;
                } else if (aValue > bValue) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        });

        var parentElement = artistCards[0].parentNode;

        sortedCards.forEach(function (card) {
            parentElement.appendChild(card);
        });
    }

    function convertToDate(dateString) {
        var parts = dateString.split('-');
        var day = parseInt(parts[0]);
        var month = parseInt(parts[1]) - 1;
        var year = parseInt(parts[2]);

        return new Date(year, month, day);
    }
});
