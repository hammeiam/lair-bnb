class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
    	t.integer :host_id, null: false
    	t.integer :guest_id, null: false
    	t.integer :lair_id, null: false
    	t.date :check_in_date, null: false
    	t.date :check_out_date, null: false
    	t.integer :num_guests, null: false

      t.timestamps
    end
    add_index :trips, :host_id
    add_index :trips, :guest_id
    add_index :trips, :lair_id
  end
end
