class AddNameToAttachment < ActiveRecord::Migration[6.0]
  def change
    add_column :attachments, :name, :string, null: false
  end
end
