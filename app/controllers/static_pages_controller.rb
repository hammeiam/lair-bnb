class StaticPagesController < ApplicationController
	def search
		render text: 'search!'
	end

	def home
		render text: 'home!'
	end
end
