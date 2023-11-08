class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :username, :user_id

  belongs_to :user
end
