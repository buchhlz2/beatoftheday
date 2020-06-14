class AddDUser < ActiveRecord::Migration[6.0]
  def change
    AdminUser.create(email: 'desmond17@protonmail.com', password: 'A1poopsauce', password_confirmation: 'A1poopsauce') if Rails.env.production?
  end
end
