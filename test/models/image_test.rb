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

require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
