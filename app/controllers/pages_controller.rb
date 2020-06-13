class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:add_a_track]

  def home
  end

  def add_a_track
    render 'home'
  end
end
