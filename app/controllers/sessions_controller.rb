class SessionsController < ApplicationController
	def new
    @user = User.new
    render :new
  end
  
  def create
    @user = User.find_by_credentials(
      params[:session][:email],
      params[:session][:password]
    )
    
    if @user
      login(@user)  
      redirect_to user_url @user
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end
end
