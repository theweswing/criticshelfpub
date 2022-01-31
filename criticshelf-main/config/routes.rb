Rails.application.routes.draw do
  resources :users, only: %i[index show create update] do
    resources :friendships, only: %i[index]
    resources :profiles, only: %i[index]
    resources :reviews, only: %i[index]
    resources :artworks, only: [:index]
  end
  resources :profiles, only: %i[index create update]
  resources :friendships, only: %i[show update index create]

  resources :disciplines, only: %i[index show] do
    resources :artworks, only: [:index]
    resources :reviews, only: [:index]
  end

  resources :artworks, only: %i[index create show] do
    resources :reviews, only: [:index]
  end

  resources :reviews, only: %i[index show create update]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # patch '/accept_friends', to: 'friendships#accept'

  # namespace :api do
  #   post '/signup', to: 'users#create'
  #   get '/me', to: 'users#show'
  #   post '/login', to: 'sessions#create'
  #   delete '/logout', to: 'sessions#destroy'
  # end

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
