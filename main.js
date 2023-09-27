import { detectType, setStorage, detectIcon } from "./helpers.js";

//elements from HTML
const form = document.querySelector('form');
const list = document.querySelector('ul');

// event listeners
form.addEventListener("submit", handleSubmit)
list.addEventListener("click", handleClick);

// shared space (declaring global variables)
var map;
var notes = JSON.parse(localStorage.getItem('notes')) || [];
var coords = [];
var layerGroup = [];

// Determining the user's location
navigator.geolocation.getCurrentPosition(
    loadMap,
    () => {
        console.log('user declined');
    }
);
// function triggered on map click
function onMapClick(e) {
    form.style.display = 'flex';
    coords = [e.latlng.lat, e.latlng.lng];
}

// Displaying the map on the screen based on the user's location
function loadMap(e) {
    console.log('location successfully received', e.coords);

    // Displays a marker on the screen
    function renderMarker(item) {
        // Creates the marker
        L.marker(item.coords, { icon: detectIcon(item.status) })
            // Adds it to the layer containing markers
            .addTo(layerGroup)
            // Adding a popup that will open when clicked
            .bindPopup(`${item.desc}`);
    }

    // sets up the map
    map = L.map('map').setView([e.coords.latitude, e.coords.longitude],
        14
    );

    // determines how the map will look
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Layer to hold the markers to be displayed on the map
    layerGroup = L.layerGroup().addTo(map);

    // Listing notes retrieved from local storage
    renderNoteList(notes);

    // A function to run when there's a click on the map
    map.on('click', onMapClick);
}

// works on the form submission event
function handleSubmit(e) {
    e.preventDefault();

    const desc = e.target[0].value;
    const date = e.target[1].value;
    const status = e.target[2].value;

    // adding element to notes array
    notes.push({ id: new Date().getTime(), desc, date, status, coords, });

    // update the local storage

    setStorage(notes);

    // List Notes
    renderNoteList(notes);

    // Close the form
    form.style.display = 'none';

}

// function to print notes on the screen
function renderNoteList(items) {
    // Clearing the notes area
    list.innerHTML = '';
    // Clearing the markers
    layerGroup.clearLayers();

    // executes a function for each note
    items.forEach((item) => {
        // creates a 'li' element
        const listEle = document.createElement('li');

        // Adding its ID to the data
        listEle.dataset.id = item.id;

        // setting the content
        listEle.innerHTML = `
        <div>
        <p>${item.desc}</p>
        <p><span>Date:</span> ${item.date}</p>
        <p><span>Status:</span> ${detectType(item.status)}</p>
      </div>
      <i id= "fly" class="bi bi-airplane-engines-fill"></i>
      <i id="delete" class="bi bi-trash3-fill"></i>
        `;

        // Displays a marker on the screen
        function renderMarker(item) {
            // Creates the marker
            L.marker(item.coords, { icon: detectIcon(item.status) })
                // Adds it to the layer containing markers
                .addTo(layerGroup)
                // Adding a popup that will open when clicked
                .bindPopup(`${item.desc}`);
        }


        // Adding an item to a list in HTML
        list.insertAdjacentElement('afterbegin', listEle);

        // To display on the screen
        renderMarker(item);
    });
}

// Listens for click events in the notes area
function handleClick(e) {
    // Finding out the ID of the element to be updated
    const id = e.target.parentElement.dataset.id;
    if (e.target.id === "delete") {


        // Removing an element from the array with a known 'id
        notes = notes.filter((note) => note.id != id);


        // update the local
        setStorage(notes);

        // update the creen
        renderNoteList(notes);
    }

    if (e.target.id === 'fly') {
        const note = notes.find((note) => note.id == id);

        map.flyTo(note.coords);
    }
}