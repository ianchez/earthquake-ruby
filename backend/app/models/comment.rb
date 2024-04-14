class Comment < ApplicationRecord
  belongs_to :feature

  validates :body, presence: true

  def self.validate_and_create(data)
    feature = Feature.find_by(id: data[:feature_id])
    return { error: 'Feature not found' } unless feature

    comment = self.new(body: data[:body], feature: feature)
    if comment.valid?
      comment.save
      { success: 'Comment created successfully', comment: comment }
    else
      { error: comment.errors.full_messages }
    end
  end
end