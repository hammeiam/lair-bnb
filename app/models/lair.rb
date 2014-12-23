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
			page: 1,
			lair_type: ['underground', 'fortress', 'office'],
			price_min: 10,
			price_max: 9999,
			max_guests: 1
		}
		@@symbolized_input_options = input_options.symbolize_keys
		# search_options = default_options.merge(symbolized_input_options)
		# if search_options[:check_in_date] && search_options[:check_out_date]
		# 	search_options[:check_in_date] = Date.strptime(search_options[:check_in_date], '%m/%d/%Y')
		# 	search_options[:check_out_date] = Date.strptime(search_options[:check_out_date], '%m/%d/%Y')
		# end
		Lair.location_filter
			.price_min_filter
			.price_max_filter
			.max_guests_filter
			.lair_type_filter
			.page_filter
	end

	def self.location_filter
		location = @@symbolized_input_options[:location]
		if !!location
			self.near(location, 50)
		else
			all
		end
	end

	def self.price_min_filter
		price_min = @@symbolized_input_options[:price_min]
		if !!price_min
			self.where('rate >= ?', Integer(price_min))
		else
			all
		end
	end

	def self.price_max_filter
		price_max = @@symbolized_input_options[:price_max]
		if !!price_max && Integer(price_max) < 1000
			self.where('rate <= ?', Integer(price_max))
		else
			all
		end
	end

	def self.lair_type_filter
		lair_types = @@symbolized_input_options[:lair_type]
		if !!lair_types && lair_types.class == Array
			self.where('lair_type IN (?)', lair_types)
		else
			all
		end
	end

	def self.max_guests_filter
		max_guests = @@symbolized_input_options[:max_guests]
		if !!max_guests
			byebug
			self.where('max_guests >= ?', Integer(max_guests))
		else
			all
		end
	end

	def self.page_filter
		# should be the last in sequence
		page = @@symbolized_input_options[:page]
		if !!page
			self.page(page)
		else
			self.page(1)
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
		unavailable_dates.map{ |date| date.to_formatted_s(:month_day_year) }
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
