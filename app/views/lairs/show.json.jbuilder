json.(@lair, :id, :title, :description, :rate, :owner_id, :lair_type, :street_address,
	:city, :state, :country, :latitude, :longitude, :max_guests)
json.images @lair.images do |image|
	json.image_url image.filepicker_url
end
json.owner do |owner|
	json.(@lair.owner, :id, :first_name, :last_name)
	json.profile_image_url @lair.owner.profile_image.filepicker_url if @lair.owner.profile_image
end