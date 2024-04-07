module Api
  class FeaturesController < ApplicationController
    def index
    @features = Feature.all
    render json: @features
    end
  end
end