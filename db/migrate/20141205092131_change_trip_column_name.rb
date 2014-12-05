class ChangeTripColumnName < ActiveRecord::Migration
  def change
  	rename_column :trips, :accepted, :approval_status
  end
end
