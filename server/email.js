Accounts.emailTemplates.siteName = "UHS";
Accounts.emailTemplates.from     = "UHS <uhs.api.ynov@gmail.com>";


// Template du mail de vérification
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Une Histoire Simple] Vérifier votre adresse mail";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        emailBody      = `Pour vérifier votre adresse mail (${emailAddress}) cliquez sur le lien :\n\n${urlWithoutHash}\n\n  `;

    return emailBody;
  }
};