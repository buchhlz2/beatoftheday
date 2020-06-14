class LikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /likes
  # POST /likes.json
  def create
    @like = Like.create!(track_id: params["track_id"], user_id: current_user.present? ? current_user.id : nil)

    head(200)
  end

  private
end
