class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.float :mag
      t.string :place, null: false
      t.timestamp :time
      t.string :url, null: false
      t.integer :tsunami
      t.string :mag_type, null: false
      t.string :title, null: false
      t.integer :longitude
      t.integer :latitude

      t.timestamps
    end
  end
end
