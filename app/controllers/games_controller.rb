class GamesController < ApplicationController

    def index
        render json: Game.all, include: ['reviews', 'reviews.user']
    end
end
