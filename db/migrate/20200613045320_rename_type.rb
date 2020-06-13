class RenameType < ActiveRecord::Migration[6.0]
  def change
    rename_column :tracks, :type, :audio_type
  end
end
