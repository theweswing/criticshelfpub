class User < ApplicationRecord
  has_secure_password
  has_many :friendships_as_sender,
           class_name: 'Friendship',
           foreign_key: 'sender_id'
  has_many :friendships_as_receiver,
           class_name: 'Friendship',
           foreign_key: 'receiver_id'
  validates :username, presence: true, uniqueness: true
  validates :email,
            presence: true,
            uniqueness: true,
            format: {
              with: URI::MailTo::EMAIL_REGEXP,
            }
  validates :phone, presence: true, uniqueness: true
  has_one :profile
  has_many :reviews
  has_many :artworks, through: :reviews
end
