class GamesController < ApplicationController

    def index
        render json: Game.all
    end

    def create
        game = Game.create!(game_params)
        render json: game
    end

    private

    def game_params
        params.permit([:title, :publisher, :game_img, :release_year])
    end
end
