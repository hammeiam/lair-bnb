class TripsController < ApplicationController
	def new
		@trip = Trip.new
	end

	def create
		@trip = Trip.new(trip_params)
		if @trip.save
			redirect_to lair_url(@trip.lair_id)
		else
			flash.now[:errors] = @trip.errors.full_messages
			render :new
		end
	end

	def edit
	end

	def update
	end

	def destroy
		@trip = Trip.find(params[:id])
		@trip.destroy
	end

	def trip_params
		params.require(:trip).permit(:host_id, :guest_id, :lair_id, :check_in_date, :check_out_date, :num_guests)
	end
end
