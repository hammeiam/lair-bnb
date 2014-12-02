class AddAcceptedColumnToTrips < ActiveRecord::Migration
  def change
  	add_column :trips, :accepted, :boolean, default: false
  end
end
