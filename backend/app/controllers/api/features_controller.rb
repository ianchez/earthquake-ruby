module Api
  class FeaturesController < ApplicationController
    def index
      formatted_features = Feature.all.map do |feature|
        {
          id: feature.id,
          type: "feature",
          attributes: {
            external_id: feature.external_id,
            magnitude: feature.mag,
            place: feature.place,
            time: feature.time,
            # Converting tsunami to boolean: 0 is false, 1 is true
            tsunami: feature.tsunami.to_i == 1,
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
      }
    end
  end
end