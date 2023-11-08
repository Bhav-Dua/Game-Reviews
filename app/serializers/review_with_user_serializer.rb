class ReviewWithUserSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating

  belongs_to :user
end
