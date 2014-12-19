class TripsController < ApplicationController
	def show
		@trip = Trip.includes({ guest: :profile_image }, { lair: :images }).find(params[:id])
	end

	def create
		@trip = Trip.new(trip_params)
		@trip.guest_id = current_user.id if current_user
		if @trip.save
			render json: { success: 'Reservation request placed' }
		else
			render json: { errors: @trip.errors.full_messages }
		end
	end

	def update
		@trip = Trip.find(params[:id])

		if @trip.update(approval_status: trip_params[:approval_status])
			render json: { success: @trip.id }
		else
			render json: { errors: @trip.errors.full_messages }
		end
	end

	def destroy
		@trip = Trip.find(params[:id])
		@trip.destroy
	end

	def index
		if signed_in? && current_user.id == Integer(params[:user_id])
			user_trips = current_user.trips.includes({ guest: :profile_image }, { lair: :images })
			user_reservations = current_user.reservations.includes({ guest: :profile_image }, { lair: :images })
			@trips = user_trips + user_reservations
		end
	end

	def trip_params
		params.require(:trip).permit(:guest_id, :lair_id, :check_in_date, :check_out_date, :num_guests, :approval_status)
	end
end
