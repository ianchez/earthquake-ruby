class Feature < ApplicationRecord
  # Validations
  validates :id, :place, :url, :mag_type, :title, presence: true
  validates :id, uniqueness: true
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
    feature = Feature.find_or_initialize_by(id: data["id"])

    if feature.new_record?  
      # Convert timestamp to DateTime
      time_converted = Time.at(data["properties"]["time"] / 1000.0)

      # Extract coordinates
      coordinates = data["geometry"]["coordinates"]
      longitude = coordinates[0]
      latitude = coordinates[1]

      attributes = {
        id: data["id"],
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
      puts "Creating feature: #{feature.id}"
  
      if feature.new_record? && feature.valid?
        begin
          feature.save
        rescue ActiveRecord::RecordInvalid => e
          puts "Feature not saved: #{e.message}"
        end
      else
        puts "Error - Feature not valid, id #{feature.id}: #{feature.errors.full_messages}"
      end
    else
      puts "Feature already exists: #{feature.id}"
    end
  end
end