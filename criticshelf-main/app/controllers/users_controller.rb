class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create index update]
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  def index
    render json: User.all, status: :ok
  end

  def create
    new_user = User.create(user_params)
    render json: new_user, status: :created
  end

  def update
    user = @current_user
    if user&.authenticate(params[:password])
      user.update(user_params)
      render json: user, status: :accepted
    end
  end

  private

  def user_params
    params.permit(:username, :password, :email, :phone, :birthday)
  end

  def render_unprocessable_entity(invalid)
    render json: {
             errors: invalid.record.errors.full_messages,
           },
           status: :unprocessable_entity
  end
end
