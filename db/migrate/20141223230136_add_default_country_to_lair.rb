class AddDefaultCountryToLair < ActiveRecord::Migration
  def change
  	change_column(:lairs, :country, :string, { default: "USA" })
  end
end
