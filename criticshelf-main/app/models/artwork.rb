class Artwork < ApplicationRecord
  belongs_to :discipline
  has_many :reviews
  has_many :users, through: :reviews
end
