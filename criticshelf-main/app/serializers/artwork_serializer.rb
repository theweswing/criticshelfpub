class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :name, :identifier, :discipline_id
  belongs_to :discipline
end
