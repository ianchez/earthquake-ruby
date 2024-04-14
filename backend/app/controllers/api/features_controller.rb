module Api
  class FeaturesController < ApplicationController
    DEFAULT_PER_PAGE = 10
    DEFAULT_PAGE = 1
    MAX_PER_PAGE = 1000

    def index
      # Params
      per_page = (params[:per_page] || DEFAULT_PER_PAGE).to_i.clamp(1, MAX_PER_PAGE)
      page = params[:page] || DEFAULT_PAGE
      mag_types = params[:mag_type]&.split(',')

      if mag_types.present?
        invalid_types = mag_types - Feature::VALID_MAG_TYPES
        if invalid_types.empty?
          @features = Feature.where(mag_type: mag_types)
        else
          return render json: { error: "Invalid mag_type values: #{invalid_types.join(', ')}" }, status: 400
        end
      else
        @features = Feature.all
      end

      # Paginate the results
      @features = @features.page(page).per(per_page)

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