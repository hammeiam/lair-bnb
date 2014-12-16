json.(trip, :id, :approval_status, :num_guests)
json.check_in_date trip.check_in_date.strftime('%m/%d/%Y')
json.check_out_date trip.check_out_date.strftime('%m/%d/%Y')

json.lair do |lair|
	json.(trip.lair, :id, :title, :city, :state)
	json.lair_image_url trip.lair.images.first.filepicker_url
end

json.guest do |guest|
	json.(trip.guest, :first_name, :last_name, :id)
	json.guest_image_url trip.guest.profile_image.filepicker_url
end
