function initialize() {
    let input = document.getElementById('location');
    let autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        let place = autocomplete.getPlace();
        document.getElementById('place').value = place.name;
        document.getElementById('latitude').value = place.geometry.location.lat();
        document.getElementById('longitude').value = place.geometry.location.lng();
    })
}

// google.maps.event.addDomListener(window, 'load', initialize);