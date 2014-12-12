
// // Google autocomplete 
// function initialize() {
// 	var input = /** @type {HTMLInputElement} */(
//       document.getElementById('location-search'));
//   var autocomplete = new google.maps.places.Autocomplete(input);
//   autocomplete.setTypes(['geocode']);
//   var place = autocomplete.getPlace();
//   var address = '';

//   google.maps.event.addListener(autocomplete, 'place_changed', function () {
//         place = autocomplete.getPlace();
//         if (place.address_components) {
// 			    address = [
// 			      (place.address_components[0] && place.address_components[0].short_name || ''),
// 			      (place.address_components[1] && place.address_components[1].short_name || ''),
// 			      (place.address_components[2] && place.address_components[2].short_name || '')
// 			    ].join(' ');
// 			  }
//         console.log(place);
//     });
// };
// window.onload = function(){ initialize() }

// $(function() {
//   $('form').submit(function(event) {
//   	event.preventDefault()
//     console.log('Input 1: ' + $('input[name="location"]').val()); // etc.
//   });
// });

var urlEncodeLocation = function(location){
	return location.replace(/[-]/g, '~').replace(/[ ,\/]/g, '-').replace(/[.]/g, '%252E');
}

var decodeLocationUrl = function(query){
	return query.replace(/--/g, ', ').replace(/-/g, ' ');
}

function prepareSlider (view) {
	view.$("#slider").noUiSlider({
		start: [10, 1000],
		connect: true,
		range: {
			'min': 10,
			'max': 1000
		},
		step: 10,
		format: wNumb({
			decimals: 0
		})
	});

	view.$('#slider').Link('lower').to(view.$('#min-price'));
	view.$('#slider').Link('upper').to(view.$('#max-price'));

}

function initDatePicker(view, dates) {
	function restrictDates(date){
		if(!dates){
			dates = [];
		}
		// var array = ["2014-12-14","2014-12-15","2014-12-16"]; this is the correct format.
		var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
      return [ dates.indexOf(string) == -1 ]
  };

  view.$( "#check-in-date" ).datepicker({
    defaultDate: 0,
    changeMonth: true,
    numberOfMonths: 1,
    minDate: 0,
    beforeShowDay: restrictDates,
    onClose: function( selectedDate ) {
      view.$( "#check-out-date" ).datepicker( "option", "minDate", selectedDate );
    }
  });
  view.$( "#check-out-date" ).datepicker({
    defaultDate: "+1D",
    changeMonth: true,
    numberOfMonths: 1,
    beforeShowDay: restrictDates,
    onClose: function( selectedDate ) {
      view.$( "#check-in-date" ).datepicker( "option", "maxDate", selectedDate );
    }
  });
};

function fillFields(params, view){
	var priceArr = [null, null];
	$.each(params, function(key, val){
		if(key === 'price_min'){
			priceArr[0] = val;
		}
		else if(key === 'price_max'){
			priceArr[1] = val;
		}
		else if(key === 'lair_type[]'){
		view.$("[value=" + val + "]").prop('checked', true);
		}
		else{
			view.$("[name=" + key + "]").val(val);
		}
	});
	view.$('#slider').val(priceArr);
};

function initImageCarousel(view, size){
	view.$('.lazy').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="left-' + size + ' glyphicon glyphicon-chevron-left"></button>',
    nextArrow: '<button type="button" class="right-' + size + ' glyphicon glyphicon-chevron-right"></button>'
  });
};

function showAlert(alertClass, alertMessage){
	var $alertsContainer = $('#alerts-container');
	var $content = $("<div class='alert " + alertClass + "' role='alert' style='display:none;'>" + alertMessage + "</div>");

	$content.hide().appendTo($alertsContainer).slideDown();
	setTimeout(function() {
	  $content.slideUp(1500, function(){
	  	$content.remove();
	  });
	}, 4000);
};