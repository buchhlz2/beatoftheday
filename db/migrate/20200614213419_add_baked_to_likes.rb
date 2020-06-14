class AddBakedToLikes < ActiveRecord::Migration[6.0]
  def change
    add_column :likes, :baked, :boolean, default: false, null: false
  end
end
