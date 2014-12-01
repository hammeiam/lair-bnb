class ChangeImageColumnNameForFilePicker < ActiveRecord::Migration
  def change
  	rename_column(:images, :url, :filepicker_url )
  end
end
