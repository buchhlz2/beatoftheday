class UserMailer < ApplicationMailer
  default :from => 'Beat of the Day <no-reply@beatoftheday.org>'

  def send_rebound_email(track)
    @track = track
    @old_track = @track.rebound_from
    return if @track.artist.id == @old_track.artist.id

    mail(
      to: @old_track.artist.email,
      subject: "Somebody rebounded your track \"#{@old_track.name}\" on Beat of the Day!",
    )
  end

  def send_at_mention_email
    mail(
      to: "team@tunelark.com",
      subject: "Alert: No future lessons scheduled between #{@customer.full_name} and #{@instructor.full_name}",
    )
  end
end
