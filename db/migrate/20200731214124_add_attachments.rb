class AddAttachments < ActiveRecord::Migration[6.0]
  def change
    create_table :attachments do |t|
      t.references :user, null: true, foreign_key: true
      t.references :track, null: false, foreign_key: true
      t.string :url, null: false

      t.timestamps
    end
  end
end
