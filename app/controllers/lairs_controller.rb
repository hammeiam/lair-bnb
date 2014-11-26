class LairsController < ApplicationController
	def new
		@lair = Lair.new()
	end

	def create

	end

	def show
	end

	def edit
	end

	def update
	end

	def lair_params
		params.require(:lair).permit(:title, :description, :rate, :owner_id, 
			:lair_type, :room_type, :street_address, :city, :state, :country, 
			:latitude, :longitude)
	end
end
