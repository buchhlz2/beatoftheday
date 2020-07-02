class UsersController < ApplicationController
  def index 
    render json: {
      artists: User.joins(:tracks).group("(users.id) having count(tracks.id) > 0").map do |user|
        user.attributes
      end
    }
  end

  def show
    good_name = User.url_to_artist_name(params[:id])

    artist = User.find_by(artist_name: good_name)
    return head(404) unless artist.present?
    @options.merge!({
      page_title: artist.artist_name,
    })
    render 'pages/home'
  end
  
  def show_artist
    good_name = User.url_to_artist_name(params[:id])

    artist = User.find_by(artist_name: good_name)
    return head(404) unless artist.present?

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