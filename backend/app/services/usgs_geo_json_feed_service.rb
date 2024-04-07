require 'httparty'

class UsgsGeoJsonFeedService
  def self.fetch_and_store(url)
    response = HTTParty.get(url)
    if response.success?
      data = JSON.parse(response.body)
      data['features'].each do |feature_data|
        Feature.validate_and_create(feature_data)
      end
    else
      raise "Error fetching data from #{url}"
    end
  rescue => e
    puts "An error occurred: #{e.message}"
    # Handle error appropriately, maybe retry or log
  end
end