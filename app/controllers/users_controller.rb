class UsersController < ApplicationController
  def index 
    render json: {
      artists: User.joins(:tracks).group("(users.id) having count(tracks.id) > 0").map do |user|
        user.attributes
      end
    }
  end

  def show
    render 'pages/home'
  end
  
  def show_artist
    artist = User.find_by(artist_name: params[:id])
    render json: {
      artist: artist.attributes,
      tracks: artist.tracks.order("created_at DESC").map do |track|
        track.attributes.merge(
          artist_name: artist.artist_name, 
          num_likes: track.likes.length,
          baked: track.baked_for_user?(current_user)
        )
      end
    }
  end
end