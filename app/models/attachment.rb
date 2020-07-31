class Attachment < ApplicationRecord
  validates :track, presence: true
  validates :user, presence: true
  validates :url, presence: true
  validates :name, presence: true

  belongs_to :track
  belongs_to :user
end
