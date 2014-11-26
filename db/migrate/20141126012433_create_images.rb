class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url, null: false
      t.string :alt_tag
      t.integer :imageable_id, polymorphic: true, null: false

      t.timestamps
    end
    add_index :images, :imageable_id
  end
end
