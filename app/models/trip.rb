# == Schema Information
#
# Table name: trips
#
#  id             :integer          not null, primary key
#  host_id        :integer          not null
#  guest_id       :integer          not null
#  lair_id        :integer          not null
#  check_in_date  :date             not null
#  check_out_date :date             not null
#  num_guests     :integer          not null
#  created_at     :datetime
#  updated_at     :datetime
#  accepted       :boolean          default(FALSE)
#

class Trip < ActiveRecord::Base
	validates :check_in_date, :check_out_date, :num_guests, presence: true
	validate :no_overlapping_trips
	before_validation :preprocess_fields

	belongs_to :host,
	class_name: 'User',
	foreign_key: :host_id

	belongs_to :guest,
	class_name: 'User',
	foreign_key: :guest_id

	belongs_to :lair

	def preprocess_fields
		convert_dates
		#self.host_id = Lair.find(self.)
	end

	def convert_dates
		self.check_in_date = Date.strptime(@attributes['check_in_date'], '%m/%d/%Y')
		self.check_out_date = Date.strptime(@attributes['check_out_date'], '%m/%d/%Y')
	end

	def no_overlapping_trips
		Trip.where("
			lair_id = :lair_id 
			AND (trips.check_in_date BETWEEN :new_check_in AND :new_check_out
			OR trips.check_out_date BETWEEN :new_check_in AND :new_check_out)",
			{ lair_id: self.lair_id, new_check_in: self.check_in_date, 
				new_check_out: self.check_out_date }
		)
	end

		# Trip.find_by_sql("
		# 	SELECT COUNT(*)
		# 	FROM trips
		# 	WHERE trips.id = ?
		# 	AND (trips.check_in_date BETWEEN ? AND ?
		# 		OR trips.check_out_date BETWEEN ? AND ?)
		# 	")
	# 	Trip.where(lair_id: self.id)
	# 			.where(check_in_date: (self.check_in_date..self.check_out_date))
	# end

end
