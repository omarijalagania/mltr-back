export const codeConfirmationTemplate = (
  code: string,
  ip?: string,
  device?: string,
) => {
  return `
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Dark Mode meta tags -->
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark only">
    <title>Confirm Code</title>

    <style>
      /* Inline styles for maximum compatibility */
      body {
        
        padding: 15px;
      }

      h1 {
        color: #8be100;
        font-size: 44px;
        line-height: 40px;
        font-weight: 700;
      }

      /* Styles for dark mode */
      [data-ogsc="dark-mode"] body {
        background-color: #000000 !important;
        color: #ffffff !important;
      }
      [data-ogsc="dark-mode"] h1 {
        color: red !important; /* Dark mode green color */
      }

      /* Media query for devices with width less than 350px */
      @media only screen and (max-width: 350px) {
        .remove-padding {
          padding: 0 !important;
          margin: 0 !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        h1 {
          color: #8be100 !important;
        }
        hr {
            background-color: #858A97 !important;
            }
      }
    </style>

    <style>
    .onyx-logo { margin-top: 8px !important; }
    @media screen and (max-width: 450px) 
    { 
    
    .content { width: 100% !important; display: block !important; }
    
    } 
</style>

  </head>
  <body class="body-content" style="max-width: 450px !important; margin: 0 auto !important;" data-ogsc="light-mode">
    <img width="85px" height="85px" src="${
      process.env.BACKEND_URL
    }/images/MLTR_logo_500.png" alt="Biteme" />
    <h1>
      Your Biteme verification code
    </h1>
    <p style="text-align: left; font-size: 14px; line-height: 22px">
      Please do not share this verification code with anyone. It’s our little
      secret.
    </p>

    <p style="font-weight: 400; font-size: 16px; line-height: 22px">
      <span style="font-weight: 700">Country:</span> ${ip ? ip : "-"}
    </p>

    <p style="font-weight: 400; font-size: 16px; line-height: 22px">
      <span style="font-weight: 700">Device:</span> ${device ? device : "-"}
    </p>

    <h1>
      ${code}
    </h1>

    <!-- One -->

    <div style="display: flex; margin-bottom: 20px">
      <p
        style="
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          padding-right: 40px;
        "
      >
        If you did not request this verification code, please disregard this
        email. If you have any questions or concerns, please contact our support
        team at
        <span
          style="
            color: #8be100;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >mltr.support@onyxlabs.tech</span
        >
      </p>
    </div>

    <!-- Explore -->

    <div style="margin-top: 40px">
      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        Warm regards,
      </p>

      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        The Biteme Team
      </p>
    </div>

    <!-- Footer -->
   <hr style="margin-top: 60px; border: none !important; background-color: #858A97 !important; height: 0.5px !important;" />
       <table class="table-width" style="width: 90%; margin-top: 60px; padding: 10px 0; border-collapse: collapse; ">
      <tr>
        <td>
          <img class="onyx-logo" width="25px" height="25px" src="${
            process.env.BACKEND_URL
          }/images/ONYX_logo_100.png" alt="onyx" />
        </td>
        <td>
          <a style="color: #7c7c7c; font-weight: 400; font-size: 14px; line-height: 20px;" href="https://mltr.app/policies/terms.html">
            ONYX Labs
          </a>
        </td>
        <td class="content">
          <a style="color: #8be100; font-weight: 400; font-size: 14px; line-height: 20px;" href="https://mltr.app/policies/terms.html">
            Terms and Conditions
          </a>
        </td>
        <td class="content">
          <a style="color: #8be100; font-weight: 400; font-size: 14px; line-height: 20px;" href="https://mltr.app/policies/privacy.html">
            Privacy Policy
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
}
