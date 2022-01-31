class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review_text, :rating, :artwork_id, :user_id, :updated_at
  belongs_to :artwork
  belongs_to :user
end
