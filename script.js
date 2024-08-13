// Playlist array
let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

// Load playlist on page load
document.addEventListener('DOMContentLoaded', () => {
    displayPlaylist();
    populateGenreFilter();
});

// Form submission handler
document.getElementById('song-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addSong();
    displayPlaylist();
    populateGenreFilter();
});

// Add song function
function addSong() {
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const duration = document.getElementById('duration').value;
    const genre = document.getElementById('genre').value;

    const song = { title, artist, duration, genre };
    playlist.push(song);

    saveToLocalStorage();
    this.reset();
}

// Display playlist function
function displayPlaylist() {
    const playlistTable = document.querySelector('#playlist tbody');
    playlistTable.innerHTML = '';

    playlist.forEach((song, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
            <td>${song.genre}</td>
            <td class="actions">
                <button class="edit" onclick="editSong(${index})">Edit</button>
                <button class="delete" onclick="deleteSong(${index})">Delete</button>
            </td>
        `;

        playlistTable.appendChild(row);
    });
}

// Edit song function
function editSong(index) {
    const song = playlist[index];

    document.getElementById('title').value = song.title;
    document.getElementById('artist').value = song.artist;
    document.getElementById('duration').value = song.duration;
    document.getElementById('genre').value = song.genre;

    deleteSong(index);
}

// Delete song function
function deleteSong(index) {
    playlist.splice(index, 1);
    saveToLocalStorage();
    displayPlaylist();
}

// Save playlist to LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

// Sort playlist
function sortPlaylist(key) {
    playlist.sort((a, b) => a[key].localeCompare(b[key]));
    saveToLocalStorage();
    displayPlaylist();
}

// Event listeners for sorting
document.getElementById('sort-title').addEventListener('click', () => sortPlaylist('title'));
document.getElementById('sort-artist').addEventListener('click', () => sortPlaylist('artist'));
document.getElementById('sort-duration').addEventListener('click', () => sortPlaylist('duration'));
document.getElementById('sort-genre').addEventListener('click', () => sortPlaylist('genre'));

// Search function
document.getElementById('search').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const filteredPlaylist = playlist.filter(song => 
        song.title.toLowerCase().includes(searchText) || 
        song.artist.toLowerCase().includes(searchText)
    );
    displayFilteredPlaylist(filteredPlaylist);
});

// Filter by genre
document.getElementById('genre-filter').addEventListener('change', function() {
    const genre = this.value;
    const filteredPlaylist = genre ? playlist.filter(song => song.genre === genre) : playlist;
    displayFilteredPlaylist(filteredPlaylist);
});

// Populate genre filter dropdown
function populateGenreFilter() {
    const genreFilter = document.getElementById('genre-filter');
    const genres = [...new Set(playlist.map(song => song.genre))];
    genreFilter.innerHTML = '<option value="">Filter by Genre</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Display filtered playlist function
function displayFilteredPlaylist(filteredPlaylist) {
    const playlistTable = document.querySelector('#playlist tbody');
    playlistTable.innerHTML = '';

    filteredPlaylist.forEach((song, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
            <td>${song.genre}</td>
            <td class="actions">
                <button class="edit" onclick="editSong(${index})">Edit</button>
                <button class="delete" onclick="deleteSong(${index})">Delete</button>
            </td>
        `;

        playlistTable.appendChild(row);
    });
}
