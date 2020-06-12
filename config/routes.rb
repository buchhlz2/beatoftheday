Rails.application.routes.draw do
  resources :likes
  devise_for :users
  devise_scope :user do
    root 'pages#home'
    get '/pages/admin'
  end

  resources :backgrounds
end
