class FriendshipsController < ApplicationController
  skip_before_action :authorize, only: %i[index show update create]
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      sender = user.friendships_as_sender
      receiver = user.friendships_as_receiver
      friendships = sender + receiver
    else
      friendships = Friendship.all
    end
    render json: friendships, status: :ok
  end

  def create
    friend_request = Friendship.create(friendship_params)
    render json: friend_request, status: :created
  end

  def show
    found_friendship = Friendship.find(params[:id])
    render json: found_friendship, status: :ok
  end

  def update
    found_friendship = Friendship.find(params[:id])
    found_friendship.update(update_friendship_params)
    render json: found_friendship, status: :accepted
  end

  private

  def friendship_params
    params.permit(:sender_id, :receiver_id, :accepted)
  end

  def update_friendship_params
    params.permit(:sender_id, :receiver_id, :accepted, :id)
  end
end
