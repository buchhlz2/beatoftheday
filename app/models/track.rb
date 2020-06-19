class Track < ApplicationRecord
  validates :name, presence: true
  validates :photo, presence: true
  validates :user, presence: true

  belongs_to :user
  has_many :likes
  has_many :comments
  has_many :rebounds, class_name: 'Track', foreign_key: 'rebound_track_id'
  belongs_to :rebound_from, class_name: 'Track', foreign_key: 'rebound_track_id', optional: true

  def og_track
    last_track = rebound_from
    last_track.present? ? last_track.og_track : self
  end

  def all_rebounds
    all = []
    all << self
    if rebounds.length > 0
      rebounds.map do |rebound|
        all << rebound.all_rebounds
      end
    end

    all.flatten.uniq
  end

  def all_rebounds_attributes(current_user)
    all_rebounds.map do |rebound|
      rebound.show_attributes(current_user)
    end
  end

  def show_attributes(current_user)
    attributes.merge({
      artist_name: user.artist_name, 
      num_likes: likes.length,
      baked: baked_for_user?(current_user),
    })
  end

  def baked?
    likes.find_by(baked: true).present?
  end

  def baked_for_user?(user)
    return baked? unless user.present?
    @user_likes ||= user.likes
    @user_likes.find_by(baked: true, track_id: id).present?
  end
end
