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
#

class Trip < ActiveRecord::Base
	validates :check_in_date, :check_out_date, :num_guests, presence: true

	
end
