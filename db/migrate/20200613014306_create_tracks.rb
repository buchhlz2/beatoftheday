class CreateTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :tracks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :link
      t.string :type
      t.string :name
      t.string :photo
      t.timestamps
    end
  end
end
