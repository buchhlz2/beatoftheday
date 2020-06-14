class Track < ApplicationRecord
  validates :name, presence: true
  validates :photo, presence: true
  validates :user, presence: true

  belongs_to :user
  has_many :likes
end
