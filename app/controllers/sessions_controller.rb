class SessionsController < ApplicationController
	def new
    @user = User.new
  end
  
  def create
    @user = User.find_by_credentials(
      params[:session][:email],
      params[:session][:password]
    )
    
    if @user
      login(@user)  
      redirect_to user_url(@user)
    else
      flash[:errors] = "Invalid Credentials, please try again"
      redirect_to new_session_url
    end
  end
  
  def destroy
    id = current_user.id

    current_user.reset_session_token!
    session[:session_token] = nil
    current_user = nil
    render json: id
  end
end
