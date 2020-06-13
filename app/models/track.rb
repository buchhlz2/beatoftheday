class Track < ApplicationRecord
  validates :link, presence: true
  validates :name, presence: true
  validates :type, presence: true
  validates :photo, presence: true
  validates :user, presence: true
  
  belongs_to :user
end
