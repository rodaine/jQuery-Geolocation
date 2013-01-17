;(function($, window, undefined){ "use strict";

  var emptyFn = function() {};

  var defaults = {
    event: 'click',       //event on the selected elements to trigger geolocation
    preventDefault: true, //prevent default action of the event
    onSuccess: emptyFn,   //success callback (receives error object as argument)
    onError: emptyFn,     //error callback (receives geoposition object as argument)
    onStart: emptyFn,     //action to perform prior to attempting geocoding
    onFinish: emptyFn,    //action to perform after geocoding attempt (success or failure)
    timeout: Infinity,    //timeout of geolocation (in milliseconds)
    highAccuracy: false,  //enable higher accuracy geolocation (slower response)
    maxAge: 0             //max age of a position to live in cache (in milliseconds)
  };

  var noGeo = { code: 0, message: 'Geolocation not supported' };

$.fn.geolocate = function(opts) { 

  var options = $.extend(defaults, opts || {});
  
    
  return this.each(function() {
    var $this = this;
    
    var successCallback = function(p) { 
      options.onSuccess.call($this, p);
      options.onFinish.call($this);
    }

    var errorCallback = function(e) { 
      options.onError.call($this, e);
      options.onFinish.call($this);
    }
    
    if (!navigator.geolocation) { errorCallback(noGeo); return; }
    
    $(this).on(options.event, function(e) {
      options.onStart.call($this);
      if (options.preventDefault) e.preventDefault();
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy: options.highAccuracy,
          timeout: options.timeout,
          maximumAge: options.maxAge
        }
      );
    });
  });
};
})(jQuery, window);
