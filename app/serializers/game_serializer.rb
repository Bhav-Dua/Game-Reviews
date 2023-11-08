class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :publisher, :game_img, :release_year

  has_many :reviews, serializer: ReviewWithUserSerializer
end
