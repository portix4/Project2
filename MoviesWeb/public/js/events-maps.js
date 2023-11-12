const startPoint = { lat: 40.41685422193087, lng: - 3.7033601243105587 }

let myMap

function initMap() {
    renderMap()
    getPlacesFromAPI()
    autocomplete()
}

function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 12,
            center: startPoint
        }
    )
}

function getPlacesFromAPI() {

    axios
        .get('/api/map')
        .then(response => printPlaceMarkers(response.data))
        .catch(error => console.log(error))
}

function printPlaceMarkers(places) {
    places.forEach(elm => {
        const position = { lat: elm.location.coordinates[1], lng: elm.location.coordinates[0] }

        new google.maps.Marker({
            map: myMap,
            position,
            title: elm.name
        })
    })
}

function autocomplete() {

}