class CommentsController < ApplicationController
  before_action :authenticate_user!, except: [:track_comments]
  skip_before_action :verify_authenticity_token

  def create_track_comment
    track = Track.find_by(id: params[:track_id])
    return head(404) unless track.present?

    text_content = params[:text_content]

    comment = Comment.create!(
      track:  track,
      user: current_user,
      text: text_content
    )

    render json: { comment: comment }
  end

  def track_comments
    track = Track.find_by(id: params[:track_id])
    return head(404) unless track.present?

    comments = track.comments.order("created_at DESC LIMIT 10000")

    render json: { 
      thread: comments.preload(:user).map do |comment| 
        comment.attributes.merge({
          artist_name: comment.user.artist_name
        })
      end
    }
  end

  private
end
