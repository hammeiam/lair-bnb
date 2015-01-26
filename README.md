#lair-bnb
lair-bnb is a web application built with Ruby on Rails, PostgreSQL, Backbone.js, Google Maps API v3, Twitter Bootstrap and jQuery, and is modeled on airbnb.com's feel and functionality.

View it live at http://lair-bnb.com

###Main Functionality: 
* Search for listings within a geographic area
* Filter search results by available dates, price range, or listing type
* Submit reservation requests to listings
* Review and approve/deny reservations made to your listings
* Search/filter parameters are added to the URI so you can easily share your custom search with friends

###Additional Features:
* Google Maps integration
* Google Places integration
* Server-side searching and pagination
* Backbone.js communicating with a RESTful json API
* Image, listing, and reservation carousels
* Hand-rolled authentication via Rails
* Polymorphic 'Imageable' associations 
* Handy alerts throughout the site for errors and events, all created with a single flexible function. Alert calls can be as simple as `showAlert()` or as detailed as:
```
showAlert({
	// uses Bootstrap's alert classes
	alertClass: 'alert-danger',
	// customize the message or pass in a server response
	alertMessage: 'Page not found',
	// maybe you want to show alerts in a modal instead of the whole page
	alertLocation: '#modal-alerts-container'
})
```
* Modular model-level filtering, eg:
```
def self.max_guests_filter
	max_guests = @@symbolized_input_options[:max_guests]
	if !!max_guests
		self.where('max_guests >= ?', Integer(max_guests))
	else
		all
	end
end
```
And thus our search method becomes simply:
```
def self.search(input_options = {})
	@@symbolized_input_options = input_options.symbolize_keys

	Lair.location_filter
		.price_min_filter
		.price_max_filter
		.max_guests_filter
end
```