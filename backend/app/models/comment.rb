class Comment < ApplicationRecord
  belongs_to :feature

  validates :body, presence: true

  def self.validate_and_create(data)
    comment = self.new(body: data[:body], feature_id: data[:feature_id])
    if comment.valid?
      comment.save
      { success: 'Comment created successfully', comment: comment }
    else
      { error: comment.errors.full_messages }
    end
  end
end