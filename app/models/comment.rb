class Comment < ApplicationRecord
  validates :track, presence: true
  validates :user, presence: true
  validates :text, presence: true

  belongs_to :user
  belongs_to :track
end
