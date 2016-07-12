jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Львів', 49.8382600, 24.0232400],
        ['Анкара', 39.925533, 32.866287],
        ['Анталія', 36.549362, 31.996994],
        ['Стамбул', 41.015137, 28.979530],
        ['Самсун', 41.287498, 36.333498],
        ['Кемер', 36.60279, 30.55976],
        ['Міра', 36.258332, 29.9696627],
        ['Кападокія', 38.646678, 34.839834],
        ['Аланія', 36.54444, 31.99541],
        ['Сіде', 36.76667, 31.38889],
        ['Белек', 36.85000, 31.05000],
        ['Памукалле', 37.95532, 29.07809],
        ['Родос', 36.43405, 28.21764],
        ['Мілан', 45.45863, 9.18187],
        ['Бергамо', 45.85783, 9.88200],
        ['Верона', 45.44185, 11.07353],
        ['Венеція', 45.49305, 12.41770],
        ['Калабрія', 39.30877, 16.34638],
        ['Серіате', 45.68542, 9.72170],
        ['озеро Комо', 46.01605, 9.25717],
        ['Мінськ', 53.90454, 27.56152],
        ['Софія', 42.69771, 23.32187],
        ['Несебр', 42.66014, 27.72056],
        ['Бургас', 42.50479, 27.46264],
        ['Париж', 48.85661, 2.35222],
        ['Стразбург', 48.57341, 7.75211],
        ['La Roche-sur-Yon', 46.67051, -1.42644],
        ['Disneyland', 48.8678948, 2.77574356],
        ['Нант', 47.21837, -1.55362],
        ['Le Puy Du Fou', 46.89205, -0.93151],
        ['Фрайбург', 47.99901, 7.84210],
        ['Гамбург', 53.55108, 9.99368],
        ['Дрезден', 51.05041, 13.73726],
        ['Зальцбург', 47.80949, 13.05501],
        ['Відень', 48.20817, 16.37382],
        ['Брелла', 43.36857, 16.92990],
        ['Будва', 42.29115, 18.84029],
        ['Будапешт', 47.49791, 19.04023],
        ['Краків', 50.06465, 19.94498],
        ['Соліна', 49.36893, 22.45494],
        ['Перемишль', 49.78386, 22.76779],
        ['озеро Соліна', 49.36893, 22.45494],
        ['Жешув', 50.04119, 21.99912],
        ['Брно', 49.19506, 16.60684],
        ['Прага', 50.07554, 14.43780],
        ['Карлові Вари', 50.23185, 12.87196],
        ['Кіасо', 45.83670, 9.02461],
        ['Амстердам', 52.37022, 4.89517],
        ['Заансе', 52.47504, 4.81851],
        ['Утрехт', 52.09074, 5.12142],
        ['Кокенкоф', 52.04297, 5.63496],
        ['Нордвейк', 52.23999, 4.45001]
        
    ];    
                        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(4);
        google.maps.event.removeListener(boundsListener);
    });
    
}