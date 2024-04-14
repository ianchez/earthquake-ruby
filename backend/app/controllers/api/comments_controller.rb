module Api
  class CommentsController < ApplicationController
    # Disable CSRF protection
    skip_before_action :verify_authenticity_token

    # Handle missing parameters
    rescue_from ActionController::ParameterMissing do |exception|
      render json: { error: exception.message }, status: :bad_request
    end

    def index
      comments = Comment.all
      render json: comments
    end

    def index_by_feature
      comments = Comment.where(feature_id: params[:feature_id])

      if comments.empty?
        render json: { error: "No comments found for feature #{params[:feature_id]}" }, status: :not_found
        return
      end

      render json: comments
    end

    def create
      feature = Feature.find_by(id: params[:feature_id])
      unless feature
        render json: { error: 'Feature not found' }, status: :not_found
        return
      end
    
      result = Comment.validate_and_create({ body: comment_params[:body], feature_id: feature.id })
      if result[:error]
        render json: { error: result[:error] }, status: :unprocessable_entity
      else
        render json: result[:comment], status: :created
      end
    end

    private

    def comment_params
      params.require(:body)
    end
  end
end