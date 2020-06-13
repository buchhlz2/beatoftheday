class AddArtistNameToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :artist_name, :string
  end
end
