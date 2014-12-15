json.(@user, :id, :first_name, :last_name)
json.profile_image_url @user.profile_image.filepicker_url
json.owned_lairs @user.owned_lairs do |lair|
	json.(lair, :id, :title, :city, :state)
	json.lair_image_url lair.images.first.filepicker_url
end

if current_user && @user.id == current_user.id
	json.logged_in true
	json.trips @user.trips do |trip|
		json.(trip, :id, :guest_id, :lair_id, :approval_status)
		json.check_in_date trip.check_in_date.strftime('%m/%d/%Y')
		json.check_out_date trip.check_out_date.strftime('%m/%d/%Y')
		json.trip_lair do |lair|
			json.(trip.lair, :id, :title, :city, :state)
			json.lair_image_url trip.lair.images.first.filepicker_url
		end
		
	end
	json.reservations @user.reservations do |reservation|
		json.(reservation, :id, :approval_status, :num_guests)
		json.check_in_date reservation.check_in_date.strftime('%m/%d/%Y')
		json.check_out_date reservation.check_out_date.strftime('%m/%d/%Y')
		
		json.lair do |lair|
			json.(reservation.lair, :id, :title, :city, :state)
		end
		
		
		json.guest do |guest|
			json.(reservation.guest, :first_name, :last_name, :id)
			json.guest_image_url reservation.guest.profile_image.filepicker_url
		end
			
	end
end