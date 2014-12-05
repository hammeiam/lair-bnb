class ChangeAcceptedColumnInTrips < ActiveRecord::Migration
  def change
  	remove_column :trips, :accepted
  	add_column :trips, :accepted, :string, default: 'pending'
  end
end
