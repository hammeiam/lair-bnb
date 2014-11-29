class AddGuestsColumnToLairsTable < ActiveRecord::Migration
  def change
  	add_column :lairs, :max_guests, :integer, { null: false }
  end
end
