Rails.application.routes.draw do
	root to: 'static_pages#home'
	resources :lairs, :defaults => { :format => :json }
	resources :trips, only: [:create, :update, :destroy, :show], :defaults => { :format => :json }
  resource :session, only: [:new, :create, :destroy]
  resources :users, :defaults => { :format => :json } do
  	resources :trips, only: [:index], :defaults => { :format => :json }
  end
end
