class Feature < ApplicationRecord
  VALID_MAG_TYPES = %w[md ml ms mw me mi mb mlg].freeze

  # Validations
  validates :external_id, :place, :url, :mag_type, :title, presence: true
  validates :external_id, uniqueness: true
  validate :validate_coordinates

  # Validate magnitude
  validates :mag, numericality: {
    greater_than_or_equal_to: -1.0,
    less_than_or_equal_to: 10.0
  }

  # Custom validation for coordinates
  def validate_coordinates
    errors.add(:base, "Invalid coordinates") unless longitude && latitude
    errors.add(:base, "Invalid longitude") unless longitude >= -180 && longitude <= 180
    errors.add(:base, "Invalid latitude") unless latitude >= -90 && latitude <= 90
  end

  def self.validate_and_create(data)
    feature = Feature.find_or_initialize_by(external_id: data["id"])

    if feature.new_record?
      # Convert timestamp to DateTime
      time_converted = Time.at(data["properties"]["time"] / 1000.0)

      # Extract coordinates
      coordinates = data["geometry"]["coordinates"]
      longitude = coordinates[0]
      latitude = coordinates[1]

      attributes = {
        external_id: data["id"],
        mag: data["properties"]["mag"],
        place: data["properties"]["place"],
        time: time_converted,
        url: data["properties"]["url"],
        tsunami: data["properties"]["tsunami"],
        mag_type: data["properties"]["magType"],
        title: data["properties"]["title"],
        longitude: longitude,
        latitude: latitude
      }


      feature.assign_attributes(attributes)
      puts "Creating feature: #{feature.external_id}"
  
      if feature.new_record? && feature.valid?
        begin
          feature.save
          { success: 'Feature created successfully', feature: feature }
        rescue ActiveRecord::RecordInvalid => e
          puts "Feature not saved: #{e.message}"
          { error: feature.errors.full_messages }
        end
      else
        puts "Error - Feature not valid, id #{feature.external_id}: #{feature.errors.full_messages}"
        { error: feature.errors.full_messages }
      end
    else
      error_message = "Feature already exists: #{feature.external_id}"
      puts error_message
      { error: error_message }
    end
  end
end