class ReviewsController < ApplicationController
  skip_before_action :authorize, only: %i[index show create update]

  def index
    if params[:artwork_id]
      artwork = Artwork.find(params[:artwork_id])
      reviews = artwork.reviews
    elsif params[:user_id]
      user = User.find(params[:user_id])
      reviews = user.reviews
    elsif params[:discipline_id]
      discipline = Discipline.find(params[:discipline_id])
      reviews = discipline.reviews
    else
      reviews = Review.all
    end
    render json: reviews, status: :ok
  end

  def show
    review = Review.find(params[:id])
    render json: review, status: :ok
  end

  def create
    new_review = Review.create(create_review_params)
    render json: new_review, status: :created
  end

  def update
    found_review = Review.find(params[:id])
    updated_review = found_review.update(review_params)
    render json: updated_review, status: :accepted
  end

  private

  def review_params
    params.permit(:rating, :review_text, :user_id, :artwork_id, :id)
  end

  def create_review_params
    params.permit(:rating, :review_text, :user_id, :artwork_id)
  end
end
