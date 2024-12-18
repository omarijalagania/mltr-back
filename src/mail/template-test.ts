export const codeConfirmationTemplateTest = (body?: any) => {
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
      }
    </style>


  </head>
  <body data-ogsc="light-mode">
    <img src="${process.env.BACKEND_URL}/images/mltr.png" alt="Biteme" />
   
   ${body}

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
            color: #c4ff46;
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
   <hr style="margin-top: 60px" />
       <table style="width: 95%; margin-top: 60px; padding: 10px 0; border-collapse: collapse;">
      <tr>
        <td style="padding-right: 5px;">
          <img src="${process.env.BACKEND_URL}/images/onyx.png" alt="onyx" />
        </td>
        <td style="padding-right: 5px;">
          <a style="color: #7c7c7c; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/terms.html">
            ONYX Labs
          </a>
        </td>
        <td style="padding-right: 5px;">
          <a style="color: #c4ff46; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/terms.html">
            Terms and Conditions
          </a>
        </td>
        <td>
          <a style="color: #c4ff46; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/privacy.html">
            Privacy Policy
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>

    `
}
