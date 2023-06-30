export const codeConfirmationTemplate = (code: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
  <title>Email</title>
</head>

<style>
      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
      @media (prefers-color-scheme: dark) {
        body {
          
          color: #FFFFFF;
        }
      }
    </style>

<body style="margin: 0; display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; height: 100%; padding: 0;">
  <div style="background-image: url('https://mltr.ibotchori.space/images/outline-black.gif'); color: #FFFFFF; font-size: 16px; font-weight: 400; text-align: center; height: 100%; display: flex; align-items: center; justify-content: center;">
    <div style="padding: 10px 20px;">
      <img src="https://mltr.ibotchori.space/images/mltr-logo.png" alt="MLTR Logo" style="max-width: 100%; width: 85px; height: 85px;">
      
      <p style="@media (prefers-color-scheme: dark) { color: #FFFFFF !important; }">Hello there, Thank you for registering with MLTR!</p> 
      <p style="@media (prefers-color-scheme: dark) { color: #FFFFFF !important; }">We're so happy you're here and can't wait for you to start using our app to track your nutrition. To complete the registration process, please enter the following verification code in the app:</p>
      
      <h1 style="@media (prefers-color-scheme: dark) { color: #C4FF46 !important; }; font-size: 34px; margin: 10px 0;">${code}</h1>
      
      <p style="@media (prefers-color-scheme: dark) { color: #FFFFFF !important; }">
        This will verify your email and allow you to fully access all the features of the app. If you did not request this verification code, please disregard this email. If you have any questions or concerns, please contact our support team at
        <a href="mailto:mltr.support@onyxlabs.tech" style="color: #c4ff46; text-decoration: none;">mltr.support@onyxlabs.tech</a>.
      </p>
      
      <p style="@media (prefers-color-scheme: dark) { color: #FFFFFF !important; }">
        If you have any questions or concerns about the verification process, please don't hesitate to contact our support team. We're always here to help. Thanks for choosing our app to help you reach your nutrition goals!
        <br><br>
        Warm regards,<br>
        The MLTR Team
      </p>
      
      <hr style="width: 100%; height: 1px; background-color: #797979 !important; margin: 10px 0; border: none;">
      <div style="display: flex; align-items: center; justify-content: center;">
        <img src="https://mltr.ibotchori.space/images/onyx-logo.png" alt="ONYX Labs Logo" style="width: 36px; height: 36px; display: block;">
        <div style="font-size: 14px; text-align: center; margin-left: 5px; @media (prefers-color-scheme: dark) { color: #FFFFFF !important; }">ONYX Labs</div>
        <a href="https://onyxlabs.tech/terms.html" style="font-size: 14px; @media (prefers-color-scheme: dark) { color: #C4FF46 !important; }; margin-left: 5px; text-decoration: none;">Terms and Conditions</a>
        <a href="https://onyxlabs.tech/privacy.html" style="font-size: 14px; @media (prefers-color-scheme: dark) { color: #C4FF46 !important; }; margin-left: 5px; text-decoration: none; margin-left: 10px;">Privacy Policy</a>
      </div>
    </div>
    
  </div>
</body>
</html>

    `
}
