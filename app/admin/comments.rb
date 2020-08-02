ActiveAdmin.register ::Comment do
  permit_params :text, :user_id, :track_id

  form do |f|
    f.semantic_errors

    f.inputs '' do
      f.input :user_id
      f.input :track_id
      f.input :text
    end

    f.actions
  end
end
