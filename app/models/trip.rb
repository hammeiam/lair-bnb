# == Schema Information
#
# Table name: trips
#
#  id             :integer          not null, primary key
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
	validates :check_in_date, :check_out_date, :num_guests, presence: true, allow_blank: false
	validate :no_overlapping_trips
	before_validation :convert_dates

	belongs_to :guest,
	class_name: 'User',
	foreign_key: :guest_id

	belongs_to :lair

	def convert_dates
		check_in, check_out = @attributes['check_in_date'], @attributes['check_out_date']
		if check_in.is_a?(String) && !check_in.empty?
			self.check_in_date = Date.strptime(check_in, '%m/%d/%Y')
		end
		if check_out.is_a?(String) && !check_in.empty?
			self.check_out_date = Date.strptime(check_out, '%m/%d/%Y')
		end
	end

	def no_overlapping_trips
		if !!self.check_in_date && !!self.check_out_date
		  if Trip.where("
				trips.lair_id = :lair_id AND
				trips.accepted = true AND
				(trips.check_in_date BETWEEN :new_check_in AND :new_check_out
				OR trips.check_out_date BETWEEN :new_check_in AND :new_check_out)",
				{ lair_id: self.lair_id, new_check_in: self.check_in_date, 
					new_check_out: self.check_out_date })
			  .count() > 0
				errors[:base] << "This lair is already reserved for some of those dates!"
			end
		end

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
