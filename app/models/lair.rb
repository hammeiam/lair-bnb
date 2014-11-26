# == Schema Information
#
# Table name: lairs
#
#  id             :integer          not null, primary key
#  title          :string(255)      not null
#  description    :text             not null
#  rate           :integer          not null
#  owner_id       :integer          not null
#  lair_type      :string(255)      not null
#  room_type      :string(255)      not null
#  street_address :string(255)      not null
#  city           :string(255)      not null
#  state          :string(255)      not null
#  country        :string(255)      not null
#  latitude       :float            not null
#  longitude      :float            not null
#  created_at     :datetime
#  updated_at     :datetime
#

class Lair < ActiveRecord::Base
	validates :title, :description, :rate, :owner_id, :lair_type, 
	:room_type, :street_address, :city, :state, :country,
	presence: true
	geocoded_by :full_street_address   # can also be an IP address
	after_validation :geocode          # auto-fetch coordinates

	def full_street_address
		[street_address, city, state, country].compact.join(', ')
	end
end
