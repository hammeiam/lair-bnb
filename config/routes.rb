Rails.application.routes.draw do
	root to: 'static_pages#home'
	resources :lairs, :defaults => { :format => :json }
	resources :trips
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show, :edit, :update, :destroy]
end
