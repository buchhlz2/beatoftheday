class TracksController < ApplicationController
  before_action :authenticate_user!

  def s3_direct_post
    s3_bucket = s3_resource.bucket('backgroundsland')
    s3_direct_post = s3_bucket.presigned_post(
      key: "uploads/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read',
      content_length_range: 0..100000000, # 100 MB
    )

    url = s3_direct_post.url
    fields = s3_direct_post.fields

    render json: { url: url, fields: fields }
  end

  def s3_blob_location
    location = params[:location]
    is_file = params[:is_file] == 'true'
    assignment = Assignment.find(params[:assignment_id])
    is_video = params[:is_video] == 'true'

    access = assignment.workspace.students.include?(current_user) || assignment.workspace.creator == current_user
    unless access
      return render json: { message: "You don't have access to this assignment" }, status: 404
    end

    assignment_recording = AssignmentRecording.create(
      user_id: current_user.id,
      assignment_id: assignment.id,
      video:  is_video
    )

    if is_file
      recording_url = location
      assignment_recording.update!(recording_url: recording_url)
    else
      Delayed::Job.enqueue Mp4Converter.new(location, assignment_recording.id)
    end

    render json: {}
  end

  def s3_resource
    @s3_resource ||= begin
      creds = Aws::Credentials.new("AKIA4NGXA5VZ3EAA26XL", "+Oxg1vVP3TqFG9P+PvC8DNG6JtuqKRsioHAU9Iyp")
      Aws::S3::Resource.new(region: 'us-west-1', credentials: creds)
    end
  end
end
