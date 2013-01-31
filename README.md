# jQuery Geolocation

A small jQuery wrapper plugin for the JavaScript Geolocation API

## Use

This plugin allows you to bind geolocation to any selected elements in your application and handle the response from the browser. The plugin provides event callbacks for the start, end, success, and failure of the geolocation process as well as access to all the options provided by the Geolocation API with sensible defaults.

The plugin is utilized in the following manner:

```js
$('.selector').geolocate(options);
```

## Example

```js
jQuery(function($) {

	$('#locate').geolocate({
		onError: function(e) { alert('Error: ' + e.message); },
		onSuccess: function(p) { alert(p.coords.latitude + ', ' + p.coords.longitude); },
		timeout: 5000
	});

});
```

See `demo.html` for a functional demo. __NOTE__: Depending on your browser, the Geolocation API might not be accessible via `file://`.

## Options

The geolocation process via this plugin can be modified with the following options (all of which are optional and have the following defaults):

```js
var defaults = {
	event: 'click',                    //event on the selected elements to trigger geolocation
	preventDefault: true,              //prevent default action of the event
	onSuccess: function(position) { }, //success callback
	onError: function(error) { },      //error callback
	onStart: function() { },           //action to perform prior to attempting geocoding
	onFinish: function() { },          //action to perform after geocoding attempt (success or error)
	timeout: Infinity,                 //timeout of geolocation (in milliseconds)
	highAccuracy: false,               //enable higher accuracy geolocation (slower response)
	maxAge: 0                          //max age of a position to live in cache (in milliseconds)
};
``` 

__NOTE__: All callback functions are provided in the context of the selected element (ie, `this` refers to the selected jQuery element within the callback).
