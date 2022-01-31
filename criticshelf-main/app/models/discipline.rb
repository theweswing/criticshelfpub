class Discipline < ApplicationRecord
  has_many :artworks
  has_many :reviews, through: :artworks
end
