class ProfilesController < ApplicationController
  skip_before_action :authorize, only: %i[index create update]

  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      profiles = user.profile
    else
      profiles = Profile.all
    end
    render json: profiles, status: :ok
  end

  def create
    new_profile = Profile.create(create_profile_params)
    render json: new_profile, status: :created
  end

  def update
    profile = Profile.find(params[:id])
    updated_profile = profile.update(update_profile_params)
    render json: updated_profile, status: :accepted
  end

  private

  def update_profile_params
    params.permit(
      :id,
      :user_id,
      :city,
      :state,
      :age,
      :gender,
      :race,
      :ethnicity,
      :country,
    )
  end

  def create_profile_params
    params.permit(
      :user_id,
      :city,
      :state,
      :age,
      :gender,
      :race,
      :ethnicity,
      :country,
    )
  end
end
