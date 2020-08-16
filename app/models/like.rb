class Like < ApplicationRecord
  validates :track, presence: true

  belongs_to :track

  scope :only_liked, -> { where(baked: false) }
end
