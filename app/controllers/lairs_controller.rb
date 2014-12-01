class LairsController < ApplicationController
	def new
		@lair = Lair.new()
	end

	def create
		@lair = Lair.new(lair_params)
		if @lair.save
			redirect_to lairs_url(@lair)
		else
			flash.now[:errors] = @user.errors.full_messages
			render :new
		end
	end	

	def show
		@lair = Lair.find(params[:id])
	end

	def edit
	end

	def update
	end

	def index
		if params[:search]
			@lairs = Lair.search(search_params)
		else
			@lairs = Lair.search()
		end
		render json: @lairs
	end

	def lair_params
		params.require(:lair).permit(:title, :description, :rate, :owner_id, 
			:lair_type, :room_type, :street_address, :city, :state, :country, 
			:latitude, :longitude)
	end

	def search_params
		params.require(:search).permit(:title, :description, :rate,  
			:lair_type, :room_type, :location, :price_min, :price_max, :page)
	end
end
