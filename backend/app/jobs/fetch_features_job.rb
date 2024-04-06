class FetchFeaturesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    UsgsGeoJsonFeedService.fetch_and_store('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  end
end