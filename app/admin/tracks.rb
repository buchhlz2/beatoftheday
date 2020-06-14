ActiveAdmin.register Track do
  permit_params :name, :link, :photo, :user

  form do |f|
    f.semantic_errors

    f.inputs '' do
      f.input :user_id, as: :search_select, fields: [:artist_name], display_name: 'artist_name'
      f.input :name
      f.input :link
      f.input :photo
    end

    f.actions
  end
end
