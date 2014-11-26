class CreateLairs < ActiveRecord::Migration
  def change
    create_table :lairs do |t|
    	t.string :title, null: false
    	t.text :description, null: false
    	t.integer :rate, null: false
    	t.integer :owner_id, null: false
    	t.string :lair_type, null: false
    	t.string :room_type, null: false
    	t.string :street_address, null: false
    	t.string :city, null: false
    	t.string :state, null: false
    	t.string :country, null: false
    	t.float :latitude, null: false
    	t.float :longitude, null: false

      t.timestamps
    end
    add_index :lairs, :rate
    add_index :lairs, :owner_id
    add_index :lairs, :lair_type
    add_index :lairs, :room_type
    add_index :lairs, :latitude
    add_index :lairs, :longitude
  end
end
