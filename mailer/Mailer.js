module.exports = (nodemailer) => {
  class Mailer {

    constructor() {
      this.from = 'organicermailer@gmail.com'
      this.password = 'organicer1234'
      this.test = false
      this.testEmail = 'erickalexander12@gmail.com'
    }

    transport() {
      let transport = {
        service: 'gmail',
        auth: {
          user: this.from,
          pass: this.password
        }
      }
      return nodemailer.createTransport(transport)
    }

    sendMail(to, subject, body) {
      return new Promise((resolve, reject) => {
        try {
          let transport = this.transport()
          transport.sendMail({
            from: this.from, 
            to: this.test ? this.testEmail : to, 
            subject: subject, 
            html: body
          }, (err, info) => {
            if (err) {
              reject(err)
            } else{
              resolve(`Email sent: ${info.response}`)
            }
          })
        } catch(e) {
          reject(e)
        }
      })
    }

  }

  return new Mailer()

}