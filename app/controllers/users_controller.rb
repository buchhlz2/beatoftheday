class UsersController < ApplicationController
  def show
    render 'pages/home'
  end
  
  def show_artist
    artist = User.find_by(artist_name: params[:id])
    render json: {
      artist: artist.attributes,
      tracks: artist.tracks.map do |track|
        track.attributes.merge(artist_name: artist.artist_name)
      end
    }
  end
end