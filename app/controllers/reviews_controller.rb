class ReviewsController < ApplicationController
    before_action :authorize

    def create
        review = @current_user.reviews.create!(review_params)
        render json: review, status: :created
    end

    def update
        review = @current_user.reviews.find(params[:id])
        review.update!(review_params)
        render json: review, status: :ok
    end

    def destroy
        review = @current_user.reviews.find(params[:id])
        if review
            review.destroy
            head :no_content
        else
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def authorize
        @current_user = User.find(session[:user_id])
        render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end
end
