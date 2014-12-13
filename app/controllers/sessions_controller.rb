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
      # redirect_to user_url(@user)
      render json: { success: @user.id }
    else
      errors = []
      errors << "E-mail can't be blank" if params[:session][:email].empty?
      errors << "Password can't be blank" if params[:session][:password].empty?
      if params[:session][:email].present? && params[:session][:password].present?
        errors << "Invalid Credentials, please try again" 
      end
      render json: { errors: errors }
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
