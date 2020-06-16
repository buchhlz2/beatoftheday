class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_options

  protected

  def set_options
    @options = { current_user: current_user.present? ? current_user.attributes : nil }
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:artist_name, :password, :email])
    devise_parameter_sanitizer.permit(:account_update, keys: [:artist_name, :password, :email])
  end
end
