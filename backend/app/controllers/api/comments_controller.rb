module Api
  class CommentsController < ApplicationController

    def index
      comments = Comment.all
      render json: comments
    end

    def create
      feature = Feature.find_by(id: params[:feature_id])
      unless feature
        render json: { error: 'Feature not found' }, status: :not_found
        return
      end
    
      result = Comment.validate_and_create(comment_params)
      if result[:error]
        render json: { error: result[:error] }, status: :unprocessable_entity
      else
        render json: result[:comment], status: :created
      end
    end
  end
end