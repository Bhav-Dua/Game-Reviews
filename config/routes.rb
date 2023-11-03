Rails.application.routes.draw do
  
  resources :games, only: [:index, :create]

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
