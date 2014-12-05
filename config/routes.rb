Rails.application.routes.draw do
	root to: 'static_pages#home'
	resources :lairs
	resources :trips, :defaults => { :format => :json }
  resource :session, only: [:new, :create, :destroy]
  resources :users
end
