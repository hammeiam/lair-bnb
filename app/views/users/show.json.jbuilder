json.(@user, :id, :first_name, :last_name)
json.profile_image_url @user.profile_image.filepicker_url
json.owned_lairs @user.owned_lairs do |lair|
	json.(lair, :id, :title, :city, :state)
	json.lair_image_url lair.images.first.filepicker_url
end

if @user.id == current_user.id
	json.logged_in true
	json.trips @user.trips do |trip|
		json.(trip, :id, :guest_id, :lair_id, :check_in_date, :check_out_date, :approval_status)
		json.trip_lair do |lair|
			json.(trip.lair, :id, :title, :city, :state)
			json.lair_image_url trip.lair.images.first.filepicker_url
		end
		
	end
	json.reservations @user.reservations
end