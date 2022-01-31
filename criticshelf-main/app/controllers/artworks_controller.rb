class ArtworksController < ApplicationController
  skip_before_action :authorize, only: %i[index show create]
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      artworks = user.artworks
    elsif params[:discipline_id]
      discipline = Discipline.find(params[:discipline_id])
      artworks = discipline.artworks
    else
      artworks = Artwork.all
    end
    render json: artworks, status: :ok
  end

  def show
    artwork = Artwork.find(params[:id])
    render json: artwork, status: :ok
  end

  def create
    artworks = Artwork.all
    if artworks.find_by(identifier: params[:identifier]) &&
         artworks.find_by(name: params[:name])
      found_artwork = artworks.find_by(identifier: params[:identifier])
      render json: found_artwork, status: :ok
    else
      new_artwork = Artwork.create(artwork_params)
      render json: new_artwork, status: :created
    end
  end

  private

  def artwork_params
    params.permit(:identifier, :name, :discipline_id)
  end
end
