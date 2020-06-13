class TracksController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  skip_before_action :verify_authenticity_token

  def index
    render json: {
      tracks: Track.all.order(:created_at).reverse.to_a
    }
  end

  def s3_direct_post
    s3_bucket = s3_resource.bucket('beatoftheday')
    s3_direct_post = s3_bucket.presigned_post(
      key: "audio/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read',
      content_length_range: 0..100000000, # 100 MB
    )

    url = s3_direct_post.url
    fields = s3_direct_post.fields

    render json: { url: url, fields: fields }
  end

  def s3_blob_location
    aws_url = params[:location]

    newTrack =  Track.create!(
      user: current_user,
      link: aws_url,
      name: params[:name],
      audio_type: aws_url.split('.').last
    )

    render json: newTrack.attributes
  end

  def s3_resource
    @s3_resource ||= begin
      creds = Aws::Credentials.new("AKIA4NGXA5VZ3EAA26XL", "+Oxg1vVP3TqFG9P+PvC8DNG6JtuqKRsioHAU9Iyp")
      Aws::S3::Resource.new(region: 'us-west-1', credentials: creds)
    end
  end
end
