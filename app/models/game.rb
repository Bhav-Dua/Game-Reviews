class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :title, presence: true, uniqueness: true
    validates :publisher, presence: true
    validate :valid_release_year

    def valid_release_year
        if release_year && release_year > Date.current.year
            errors.add(:release_year, "Game has not released yet")
        end
    end
end
