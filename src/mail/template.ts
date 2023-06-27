export const codeConfirmationTemplate = (code: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      body {
        background-color: #000000;
        background-image: url('https://mltr.ibotchori.space/images/outline.svg');
        color: #FFFFFF;
        font-size: 16px;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-weight: 400;
      }
  
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
      }
  
      .logo {
        max-width: 100%;
        height: auto;
      }
  
      p {
        font-size: 14px;
        color: white;
        margin: 0;
        padding: 10px 0;
      }
  
      h1 {
        color: #c4ff46;
        font-size: 34px;
        margin: 10px 0;
      }
  
      a {
        color: #c4ff46;
        text-decoration: none;
      }
  
      .footer {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://mltr.ibotchori.space/images/mltr-logo.svg" alt="MLTR Logo" />
  
      <p>Hello there, Thank you for registering with MLTR!</p> 
      <p>We're so happy you're here and can't wait for you to start using our app to track your nutrition. To complete the registration process, please enter the following verification code in the app:</p>
      
  
      <h1>${code}</h1>
  
      <p>
        This will verify your email and allow you to fully access all the features of the app. If you did not request this verification code, please disregard this email. If you have any questions or concerns, please contact our support team at
        <a href="mailto:mltr.support@onyxlabs.tech">mltr.support@onyxlabs.tech</a>.
      </p>
  
      <p>
        If you have any questions or concerns about the verification process, please don't hesitate to contact our support team. We're always here to help. Thanks for choosing our app to help you reach your nutrition goals!<p> Warm regards, The MLTR Team</p>
      </p>
  
      <div class="footer">
        <img src="$https://mltr.ibotchori.space/images/onyx-logo.svg" alt="ONYX Labs Logo" style="width: 36px; height: 36px" />
        <p style="font-size: 14px;">Product of ONYX Labs</p>
        <div>
          <a href="https://onyxlabs.tech/terms.html" style="font-size: 14px; color: #c4ff46">Terms and Conditions</a>
          <a href="https://onyxlabs.tech/privacy.html" style="font-size: 14px; color: #c4ff46">Privacy Policy</a>
        </div>
      </div>
    </div>
  </body>
  </html>


    `
}
