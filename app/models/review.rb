class Review < ApplicationRecord
    belongs_to :game
    belongs_to :user

    validates :content, presence: true
    validates :rating, presence: true, inclusion: {in: 1..5, message: "must be between 1 and 5"}

    def username
        self.user.username
    end
end
