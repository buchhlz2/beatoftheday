ActiveAdmin.register Track do
  permit_params :name, :link, :photo, :user_id

  form do |f|
    f.semantic_errors

    f.inputs '' do
      f.input :user_id, as: :search_select, fields: [:artist_name, :email], display_name: 'email'
      f.input :name
      f.input :link
      f.input :photo
    end

    f.actions
  end
end
