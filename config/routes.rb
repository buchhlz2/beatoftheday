Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    root 'pages#home'
    get '/pages/admin'
  end
  
  get '/add-a-track', to: 'pages#home'

  resources :tracks
  resources :likes
end
