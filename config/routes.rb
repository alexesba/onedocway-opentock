Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => "app#index"
  get '/app', to: "app#index"
  get '/app/*', to: 'app#index', as: :react_app
  namespace :api do
    api_version module: 'v1', path: { value: 'v1' } do
      resource :opentok, only: [] do
        get :token
      end
    end
  end
end
