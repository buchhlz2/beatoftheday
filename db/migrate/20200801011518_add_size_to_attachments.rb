class AddSizeToAttachments < ActiveRecord::Migration[6.0]
  def change
    add_column :attachments, :size_mb, :real
  end
end
