export const codeConfirmationTemplate = (code: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #F7F7F7;
        color: #000000;
      }
      
      .container {
        background-color: #FFFFFF;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
      }
      
      .dark-mode {
        background-color: #000000;
        color: #FFFFFF;
      }
      
      .dark-mode .container {
        background-color: #333333;
        box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.1);
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <h1>Hello there, Thank you for registering with MLTR!</h1>
      <p>We're so happy you're here and can't wait for you to start using our app to track your nutrition.</p>
      <p>To complete the registration process, please enter the following verification code in the app:</p>
      <h1>${code}</h1>
      <p>This will verify your email and allow you to fully access all the features of the app.</p>
      <p>If you have any questions or concerns, please contact our support team at <a href="mailto:mltr.support@onyxlabs.tech">mltr.support@onyxlabs.tech</a>.</p>
      <p>If you have any questions or concerns about the verification process, please don't hesitate to contact our support team.</p>
      <p>Thanks for choosing our app to help you reach your nutrition goals!</p>
      <p>Warm regards,<br>The MLTR Team</p>
    </div>
  </body>
  </html>
  
    `
}
