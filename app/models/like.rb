class Like < ApplicationRecord
  validates :track, presence: true

  belongs_to :track
end
