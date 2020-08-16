class LikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /likes
  # POST /likes.json
  def create
    track = Track.find_by(id: params[:track_id])
    return head(404) unless track.present? && current_user.present?

    if params[:liked] == "true" || params[:baked] == "true"
      @like = Like.create!(
        track_id: track.id, 
        user_id: current_user.present? ? current_user.id : nil,
        baked: params[:baked] == 'true'
      )
    else
      @like = track.likes.find_by(user_id: current_user.id, baked: params[:baked].present?)
      @like.destroy if @like.present?
    end
    
    head(200)
  end

  private
end
