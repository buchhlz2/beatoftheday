class UserMailer < ApplicationMailer
  def send_at_mention_email
    mail(
      to: "team@tunelark.com",
      subject: "Alert: No future lessons scheduled between #{@customer.full_name} and #{@instructor.full_name}",
    )
  end
end
