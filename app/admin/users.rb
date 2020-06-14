ActiveAdmin.register User do
  permit_params :email, :artist_name, :password
end
