Rails.application.routes.draw do
	root to: 'static_pages#home'
	get 's', to: 'static_pages#search'
	resources :lairs, only: [:show, :new, :create, :edit, :update]
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show, :edit, :update, :destroy]
end
