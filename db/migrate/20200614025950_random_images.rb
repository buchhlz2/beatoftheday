class RandomImages < ActiveRecord::Migration[6.0]
  def change
    user = User.find_by(id: 5)|| User.first
    Track.all.each do |track|
      if (track.link.include?('BHB')) 
        track.update!(
          photo: 'https://beatoftheday.s3-us-west-1.amazonaws.com/images/IMG_1214.jpg',
          user_id: user.id
        )
      end
    end
  end
end
