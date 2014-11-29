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
#  max_guests     :integer          not null
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

	def self.search(input_options = {})
		# add checkin & checkout search. Also see if near is lazy

		default_options = {
			query: nil,
			page: 1,
			lair_type: ['underground', 'fortress', 'office'],
			price_min: 10,
			price_max: 9999,
			max_guests: 1
		}

		search_options = default_options.merge(input_options.symbolize_keys)

		if search_options[:query]
			Lair.near(search_options[:query]).where(lair_type: search_options[:lair_type],
				rate: search_options[:price_min]..search_options[:price_max])
				.where('max_guests >= ?', search_options[:max_guests])
				.paginate(per_page: 2, page: search_options[:page])
		else
			Lair.where(lair_type: search_options[:lair_type],
				rate: search_options[:price_min]..search_options[:price_max])
				.where('max_guests >= ?', search_options[:max_guests])
				.paginate(per_page: 2, page: search_options[:page])
		end
	end
end
