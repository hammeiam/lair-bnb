class StaticPagesController < ApplicationController
	before_filter :disable_nav, only: [:home]

	def search
	end

	def home
	end
end
