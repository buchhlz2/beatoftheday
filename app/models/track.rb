class Track < ApplicationRecord
  validates :name, presence: true
  validates :photo, presence: true
  validates :user, presence: true

  belongs_to :user
  has_many :likes
  has_many :comments

  def baked?
    likes.find_by(baked: true).present?
  end

  def baked_for_user?(user)
    return baked? unless user.present?
    @user_likes ||= user.likes
    @user_likes.find_by(baked: true, track_id: id).present?
  end
end
