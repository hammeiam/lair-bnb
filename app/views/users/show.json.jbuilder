json.(@user, :id, :first_name, :last_name)
json.profile_image_url @user.profile_image.filepicker_url
json.owned_lairs @user.owned_lairs do |lair|
	json.(lair, :id, :title, :city, :state)
	if lair.images.first
		json.lair_image_url lair.images.first.filepicker_url
	end
end

if current_user && @user.id == current_user.id
	json.logged_in true
end