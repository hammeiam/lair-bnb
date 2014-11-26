# == Schema Information
#
# Table name: images
#
#  id           :integer          not null, primary key
#  url          :string(255)      not null
#  alt_tag      :string(255)
#  imageable_id :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Image < ActiveRecord::Base
end
