# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string(255)      not null
#  last_name       :string(255)      not null
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
	has_many :owned_lairs, class_name: 'Lair', foreign_key: :owner_id
	has_many :trips, foreign_key: :guest_id
	has_many :visited_lairs, through: :trips, source: :lair
	#has_many :reservations, class_name: 'Trip', foreign_key: 

	attr_reader :password
	validates :first_name, :last_name, :email, :password_digest, 
		:session_token, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }
	before_validation :ensure_session_token

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		return nil unless user
		user.is_password?(password) ? user : nil
	end

	def is_password?(password)
		BCrypt::Password.new(password_digest).is_password?(password)
	end

	def ensure_session_token
		self.session_token ||= generate_session_token
	end

	def reset_session_token!
		self.session_token = ensure_session_token
		save!
		self.session_token
	end

	def generate_session_token
		SecureRandom.base64(32)
	end
end
