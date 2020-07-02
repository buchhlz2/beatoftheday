class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :artist_name, presence: true, uniqueness: true
  
  has_many :tracks
  has_many :likes

  def artist_url
    "/artist/#{ artist_name.gsub(/\./, 'ooo_dot_ooo') }"
  end

  def self.url_to_artist_name(url_name)
    url_name.gsub('ooo_dot_ooo', '.').gsub('%20', ' ')
  end
end
