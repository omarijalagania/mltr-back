"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeConfirmationTemplate = void 0;
const codeConfirmationTemplate = code => {
  return `
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirm Code</title>
  </head>
  <body style="background-color: black; color: white; padding: 15px">
    <img src="${process.env.BACKEND_URL}/images/mltr.png" alt="mltr" />
    <h1
      style="
        color: #8be100;
        font-size: 44px;
        line-height: 40px;
        font-weight: 700;
      "
    >
      Your MLTR verification code
    </h1>
    <p style="text-align: left; font-size: 14px; line-height: 22px">
      Please do not share this verification code with anyone. It’s our little
      secret.
    </p>

    <p style="font-weight: 400; font-size: 16px; line-height: 22px">
      <span style="font-weight: 700">Country:</span> Ukraine (104.28.131.167)
    </p>

    <p style="font-weight: 400; font-size: 16px; line-height: 22px">
      <span style="font-weight: 700">Device:</span> iPhone 12 Pro
    </p>

    <h2
      style="
        color: #8be100;
        font-size: 44px;
        line-height: 40px;
        font-weight: 700;
      "
    >
      ${code}
    </h2>

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
        The MLTR Team
      </p>
    </div>

    <!-- Footer -->

    <table
      style="
        width: 95%;
        margin-top: 60px;
        padding: 10px 0;
        border-collapse: collapse;
      "
    >
      <tr>
        <td style="padding-right: 20px">
          <img src="${process.env.BACKEND_URL}/images/onyx.png" alt="onyx" />
        </td>
        <td style="padding-right: 20px">
          <a
            style="
              color: #7c7c7c;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              text-decoration: none;
            "
            href="https://mltr.app/policies/terms.html"
          >
            ONYX Labs
          </a>
        </td>
        <td style="padding-right: 20px">
          <a
            style="
              color: #c4ff46;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              text-decoration: none;
            "
            href="https://mltr.app/policies/terms.html"
          >
            Terms and Conditions
          </a>
        </td>
        <td>
          <a
            style="
              color: #c4ff46;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              text-decoration: none;
            "
            href="https://mltr.app/policies/privacy.html"
          >
            Privacy Policy
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>

    `;
};
exports.codeConfirmationTemplate = codeConfirmationTemplate;