class ReviewWithUserSerializer < ActiveModel::Serializer
  attributes :content, :rating

  belongs_to :user
end
