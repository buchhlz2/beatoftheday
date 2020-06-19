class Poop < ActiveRecord::Migration[6.0]
  def change
    add_reference :tracks, :rebound_track, index: true
  end
end
