require 'rufus-scheduler'

unless defined?(Rails::Console) || File.split($0).last == 'rake' || Rails.env.test?
  scheduler = Rufus::Scheduler.new

  scheduler.every '1d', first_in: '1s' do
    # Adjust the frequency as needed. Examples: '30m', '1h', '1d'
    FetchFeaturesJob.perform_later
  end
end