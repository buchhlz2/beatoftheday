class ApplicationController < ActionController::Base
  def employee_logged_in?
    current_user.present? && ['desmond17@protonmail.com', 'jgsharpless@gmail.com'].include?(current_user.email)
  end
end
