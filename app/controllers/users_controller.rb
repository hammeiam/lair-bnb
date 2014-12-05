class UsersController < ApplicationController
	def new
		@user = User.new
		# temporary hack until I get json forms working
		respond_to do |format|
			format.html { render :show }
			format.json do
				render 'new.html.erb', {
      :content_type => 'text/html',
      :layout       => 'application'
    }
			end
		end
	end

	def create
		@user = User.new(user_params)
		if @user.save
			login(@user)
			redirect_to user_url(@user)
		else
			flash.now[:errors] = @user.errors.full_messages
			render :new
		end
	end

	def show
		# if current_user.id == params[:id]
		@user = User.find(params[:id])
	end

	def user_params
		params.require(:user).permit(:id, :first_name, :last_name, :email, :password, :image_url)
	end
end
