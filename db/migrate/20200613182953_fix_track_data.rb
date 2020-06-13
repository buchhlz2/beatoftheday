class FixTrackData < ActiveRecord::Migration[6.0]
  def change
    User.first.update!(artist_name: "Desmond")
    Track.all.each do |track|
      track.update!(photo: "https://beatoftheday.s3-us-west-1.amazonaws.com/aBF9zzMQ.jpeg")
    end
  end
end
