class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :phone
  has_many :reviews
  has_many :friendships_as_sender
  has_many :friendships_as_receiver
  has_one :profile
end
