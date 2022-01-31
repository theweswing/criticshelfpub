class DisciplinesController < ApplicationController
  skip_before_action :authorize, only: %i[index show]
  def index
    render json: Discipline.all, status: :ok
  end

  def show
    discipline = Discipline.find(params[:id])
    render json: discipline, status: :ok
  end
end
