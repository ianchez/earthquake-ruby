class ModifyFeatures < ActiveRecord::Migration[7.1]
  def up
    execute "ALTER TABLE features DROP CONSTRAINT features_pkey;"
    rename_column :features, :id, :external_id
    add_column :features, :id, :serial
    execute "ALTER TABLE features ADD PRIMARY KEY (id);"
  end

  def down
    execute "ALTER TABLE features DROP CONSTRAINT features_pkey;"
    rename_column :features, :external_id, :id
    execute "ALTER TABLE features ADD PRIMARY KEY (id);"
  end
end
