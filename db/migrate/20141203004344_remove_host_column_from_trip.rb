class RemoveHostColumnFromTrip < ActiveRecord::Migration
  def change
  	remove_index :trips, :host_id
  	remove_column :trips, :host_id
  end
end
