class TripsController < ApplicationController
	def new
		@trip = Trip.new
	end

	def create
		@trip = Trip.new(trip_params)
		@trip.guest_id = current_user.id if current_user
		if @trip.save
			render json: {success: 'Reservation request placed'}
		else
			render json: { errors: @trip.errors.full_messages }
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
		params.require(:trip).permit(:guest_id, :lair_id, :check_in_date, :check_out_date, :num_guests)
	end
end
