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
	belongs_to :owner, class_name: 'User', foreign_key: :owner_id, primary_key: :id
	has_many :trips, dependent: :destroy
	has_many :guests, through: :trips, source: :guest
	has_many :images, as: :imageable, dependent: :destroy
	accepts_nested_attributes_for :images

	validates :title, :description, :rate, :owner_id, :lair_type, 
		:room_type, :street_address, :city, :state, :country, presence: true
	geocoded_by :full_street_address   # can also be an IP address
	after_validation :geocode          # auto-fetch coordinates
	self.per_page = 4

	def full_street_address
		[street_address, city, state, country].compact.join(', ')
	end

	def self.search(input_options = {})
		# add checkin & checkout search. Also see if near is lazy
		default_options = {
			location: nil,
			page: 1,
			lair_type: ['underground', 'fortress', 'office'],
			price_min: 10,
			price_max: 9999,
			max_guests: 1
		}

		search_options = default_options.merge(input_options.symbolize_keys)

		if search_options[:location]
			result = Lair.near(search_options[:location], 100).where(lair_type: search_options[:lair_type],
				rate: search_options[:price_min]..search_options[:price_max])
				.where('max_guests >= ?', search_options[:max_guests])
				.page(search_options[:page])
		else
			result = Lair.where(lair_type: search_options[:lair_type],
				rate: search_options[:price_min]..search_options[:price_max])
				.where('max_guests >= ?', search_options[:max_guests])
				.page(search_options[:page])
		end
		a = search_options[:check_out_date]

		# byebug

		if result.count == 0
			return Lair.all.page(search_options[:page])
		else
			return result
		end
	end

	def unavailable_dates
		result = []
		self.trips.each do |t| 
			if t.approval_status == 'approved'
				 result += (t.check_in_date..t.check_out_date).to_a
			end
		end
		return result
	end

	def unavailable_dates_strings
		unavailable_dates.map{ |date| date.to_s }
	end

	def image_urls=(image_params)
		urls = image_params.split(',')
		self.class.transaction do
			urls.each do |url|
	      self.images.new(filepicker_url: url) 
			end
		end
	end
end
