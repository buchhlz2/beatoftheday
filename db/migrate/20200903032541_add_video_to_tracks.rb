class AddVideoToTracks < ActiveRecord::Migration[6.0]
  def change
    add_column :tracks, :video, :boolean, default: false
  end
end
