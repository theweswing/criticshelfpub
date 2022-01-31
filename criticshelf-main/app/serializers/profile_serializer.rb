class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :city, :state, :country, :ethnicity, :race, :age, :gender
  belongs_to :user
end
