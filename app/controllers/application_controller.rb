class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?
  
  def current_user
    User.find_by(session_token: session[:session_token])
  end
  
  def signed_in?
    !!current_user
  end
  
  def login(user)
    session[:session_token] = user.reset_session_token!
  end
end
