/* Map definition */
	
// Map reference
var map;

// Geojson of the neighborhoods reference
var geojson;

// ---- Map Creation
// Creates a map inside div id="map"
function createMap()
{				
	// Create Leftlet map and center it in the desired position
	// with the desirable zoom level
	map = L.map('map').setView([40.658528, -73.952551], 10);

	// Load a tile layer  
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
	{ 
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
		maxZoom: 18, 
		minZoom: 10
	}).addTo(map);
	
	return map;
}

//---- Map Interaction

// Loads GeoJSON from an external file
function loadNeighborhoods()
{
	$.getJSON("https://nycdatastables.s3.amazonaws.com/2013-08-19T18:22:23.125Z/community-districts-polygon.geojson", function(data)
	{
		// Add GeoJSON layer to the map once the file is loaded
		geojson = L.geoJson(data,  
		{
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
	});
}

// Defines the existent behaviors that
// each geojson feature will have
function onEachFeature(feature, layer) 
{
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

// Defines the style of the neighborhoods' polygons
function style(feature) 
{
	return {
		fillColor: '#FFEDA0',
		weight: 1,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

// Defines the behavior of a neighborhood when 
// the mouse is over it 			
function highlightFeature(e) 
{
	var layer = e.target;

	layer.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) 
	{
		layer.bringToFront();
	}
}

// Resets the style of a neighborhood previous
// highlighted
function resetHighlight(e) 
{
	var layer = e.target;
	
	geojson.resetStyle(layer);
	if (!L.Browser.ie && !L.Browser.opera) 
	{
		layer.bringToBack();
	}
}

// Defines the behavior when a neighborhood 
// is clicked
function zoomToFeature(e) 
{
	map.fitBounds(e.target.getBounds());
}