class TracksController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show_track, :show, :baked]
  skip_before_action :verify_authenticity_token

  def index
    render json: {
      tracks: Track.all.order("created_at DESC LIMIT 10").preload(:user, :likes).map do |track|
        track.show_attributes(current_user)
      end
    }
  end

  def show
    @track = Track.find(params[:id])
    return head(404) unless @track.present?

    @options.merge!({
      page_photo: @track.photo,
      page_title: "#{@track.name} - #{@track.user.artist_name}"
    })
    render 'pages/home'
  end

  def baked
    baked_tracks = Track.baked.uniq.sort_by do |track|
      track.check_the_oven
    end.reverse.first(20)

    render json: {
      baked_tracks: baked_tracks.map do |track|
        track.show_attributes(current_user)
      end
    }
  end

  def show_track
    @track = Track.find(params[:id])
    return head(404) unless @track.present?

    render json: @track.all_rebounds_attributes(current_user)
  end

  def s3_direct_post
    s3_bucket = s3_resource.bucket('beatoftheday')
    s3_direct_post = s3_bucket.presigned_post(
      key: "audio/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read',
      content_length_range: 0..20000000, # 20 MB
      content_type: "application/octet-stream",
      content_disposition: "attachment; filename=\"#{params[:newPhotoName].present? ? params[:newPhotoName] : params[:newTrackName]}\""
    )

    url = s3_direct_post.url
    fields = s3_direct_post.fields

    render json: { url: url, fields: fields }
  end

  def s3_blob_location
    aws_url = params[:location]
    aws_photo_url = params[:image_location]

    newTrack = if (params[:reboundTrackId].present?)
      rebound_from_track = Track.find_by(id: params[:reboundTrackId])
      return head(404) unless rebound_from_track.present?

      track = Track.create!(
        user: current_user,
        link: aws_url,
        photo: aws_photo_url,
        name: "#{rebound_from_track.og_track.name} #{rebound_from_track.og_track.all_rebounds.count + 1}",
        audio_type: aws_url.split('.').last,
        rebound_track_id: rebound_from_track.id
      )

      UserMailer.send_rebound_email(track).deliver_now

      track
    else
      Track.create!(
        user: current_user,
        link: aws_url,
        photo: aws_photo_url,
        name: params[:name],
        audio_type: aws_url.split('.').last
      )
    end


    render json: newTrack.attributes
  end

  def s3_resource
    @s3_resource ||= begin
      creds = Aws::Credentials.new("AKIA4NGXA5VZ3EAA26XL", "+Oxg1vVP3TqFG9P+PvC8DNG6JtuqKRsioHAU9Iyp")
      Aws::S3::Resource.new(region: 'us-west-1', credentials: creds)
    end
  end
end
