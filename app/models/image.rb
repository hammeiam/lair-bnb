# == Schema Information
#
# Table name: images
#
#  id             :integer          not null, primary key
#  filepicker_url :string(255)      not null
#  alt_tag        :string(255)
#  imageable_id   :integer          not null
#  created_at     :datetime
#  updated_at     :datetime
#

class Image < ActiveRecord::Base
	belongs_to :imagable, polymorphic: true
end
