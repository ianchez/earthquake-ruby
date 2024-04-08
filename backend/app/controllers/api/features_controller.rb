module Api
  class FeaturesController < ApplicationController
    def index
      per_page = params[:per_page].to_i.clamp(1, 1000) || 10
      page = params[:page] || 1
      @features = Feature.page(page).per(per_page)

      formatted_features = @features.map do |feature|
        {
          id: feature.id,
          type: "feature",
          attributes: {
            external_id: feature.external_id,
            magnitude: feature.mag,
            place: feature.place,
            time: feature.time,
            # Converting tsunami to boolean: 0 is false, 1 is true
            tsunami: feature.tsunami == 1,
            mag_type: feature.mag_type,
            title: feature.title,
            coordinates: {
              longitude: feature.longitude,
              latitude: feature.latitude
            }
          },
          links: {
            external_url: feature.url
          }
        }
      end

      render json: {
        data: formatted_features,
        pagination: {
          current_page: @features.current_page,
          total: @features.total_pages,
          per_page: @features.limit_value
        }
      }
    end
  end
end