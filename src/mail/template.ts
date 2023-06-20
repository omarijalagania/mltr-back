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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 16px;
      margin: 0;
      padding: 0;
      font-weight: 400;
    }

    div {
      background-color: #000000;
      background-image: url(${process.env.BACKEND_URL}images/outlines.png);
      padding: 10px 20px;
    }

    table {
      margin: 0 auto;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    p {
      color: white;
      font-size: 14px;
    }

    h1 {
      color: #c4ff46;
      font-size: 34px;
    }

    a {
      color: #c4ff46;
    }

    nav {
      margin-top: 10px;
      display: flex;
      width: 33%;
    }
  </style>
</head>
<body>
  <div>
    <table>
      <tr>
        <td>
          <img src="${process.env.BACKEND_URL}images/mltr-logo.png" alt="MLTR Logo" />
        </td>
      </tr>
    </table>

    <p>
      Hello there, Thank you for registering to MLTR! We're so happy you're here and can't wait for you to start using our app to track your nutrition. To complete the registration process, please enter the following verification code in the app:
    </p>

    <h1>${code}</h1>

    <p>
      This will verify your email and allow you to fully access all the features of the app. If you did not request this verification code, please disregard this email. If you have any questions or concerns, please contact our support team at
      <a href="mltr.support@onyxlabs.tech">mltr.support@onyxlabs.tech</a>.
    </p>

    <p>
      If you have any questions or concerns about the verification process, please don't hesitate to contact our support team at [support email]. We're always here to help. Thanks for choosing our app to help you reach your nutrition goals! Warm regards, The MLTR Team
    </p>

    <table>
      <tr>
        <nav>
          <td>
            <img src="${process.env.BACKEND_URL}images/onyx-logo.png" alt="ONYX Labs Logo" style="width: 36px; height: 36px" />
          </td>
          <td>
            <p style="font-size: 14px; color: white">Product of ONYX Labs</p>
          </td>
          <td>
            <a href="https://mltr.ibotchori.space/terms" style="font-size: 14px; color: #c4ff46">Terms and Conditions</a>
          </td>
          <td>
            <a href="https://mltr.ibotchori.space/privacy" style="font-size: 14px; color: #c4ff46">Privacy Policy</a>
          </td>
        </nav>
      </tr>
    </table>
  </div>
</body>
</html>

    `
}
