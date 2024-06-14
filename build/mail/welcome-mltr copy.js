"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.welcomeToMLTRTemplate = void 0;
const welcomeToMLTRTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to MLTR</title>
    <style>
      /* Media query for devices with width less than 350px */
      @media only screen and (max-width: 350px) {
        .remove-padding {
          padding: 0 !important; /* !important ensures higher priority */
        }
        .remove-padding {
          margin: 0 !important;
        }
      }
    </style>
  </head>
  <body style="background-color: black; color: white; padding: 15px">
    <table width="100%" cellspacing="0" cellpadding="0" style="color: white">
      <tr>
        <td style="padding-bottom: 60px">
          <img height="85px" width="85px" src="${process.env.BACKEND_URL}/images/mltr.png" alt="mltr" />
        </td>
      </tr>
      <tr>
        <td>
          <h1
            style="
              color: #8be100;
              font-size: 44px;
              line-height: 40px;
              font-weight: 700;
            "
          >
            Welcome to MLTR
          </h1>
        </td>
      </tr>
      <tr>
        <td
          style="
            text-align: left;
            font-size: 14px;
            line-height: 22px;
            padding-bottom: 60px;
            padding-top: 20px;
          "
        >
          <p>
            Welcome aboard! We're thrilled to have you join the MLTR family. Our
            mission is simple: to help you lead a healthier, more balanced life
            with ease and insight.
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <h2
            style="
              color: #8be100;
              font-size: 32px;
              line-height: 22px;
              padding-bottom: 60px;
            "
          >
            Getting Started
          </h2>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0">
            <!-- One -->
            <tr>
              <td
                style="
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 22px;
                  
                "
              >
                <span
                  style="
                    color: #009cb1;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                  "
                  >Setting Your Goals:
                </span>
                Customize your health and nutrition goals and preferences
                through our settings.
              </td>
              <td style="text-align: right">
                <img
                  style="width: 79px; height: 100px"
                  src="${process.env.BACKEND_URL}/images/Personal_Goal.png"
                  alt="apple"
                />
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px"></td>
            </tr>
            <!-- Two -->
            <tr>
              <td style="text-align: left">
                <img
                  style="width: 135px; height: 80px"
                  src="${process.env.BACKEND_URL}/images/cup.png"
                  alt="apple"
                />
              </td>
              <td
                style="
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 22px;
                  
                "
              >
                <span
                  style="
                    color: #009cb1;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                  "
                  >Tracking Your Meals:
                </span>
                Use our extensive food database to build your daily meals and
                have them ready to go.
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px"></td>
            </tr>
            <!-- Three -->
            <tr>
              <td
                style="
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 22px;
                  
                "
              >
                <span
                  style="
                    color: #009cb1;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                  "
                  >Staying Hydrated:
                </span>
                Keep track of your liquids intake with our hydration tracker to
                ensure you’re always at your best.
              </td>
              <td style="text-align: right">
                <img
                  width="50px"
                  height="90px"
                  src="${process.env.BACKEND_URL}/images/glass.png"
                  alt="apple"
                />
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px"></td>
            </tr>
            <!-- Four -->
            <tr>
              <td style="text-align: left">
                <img
                  style="width: 63px; height: 88px"
                  src="${process.env.BACKEND_URL}/images/heart.png"
                  alt="apple"
                />
              </td>
              <td
                style="
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 22px;
                
                "
              >
                <span
                  style="
                    color: #009cb1;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                  "
                  >Tracking Your Meals:
                </span>
                Use our extensive food database to build your daily meals and
                have them ready to go.
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <tr>
          <td colspan="2" style="padding-top: 90px"></td>
        </tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          <span
            style="
              color: #009cb1;
              font-weight: 700;
              font-size: 16px;
              line-height: 22px;
            "
            >Explore More:
          </span>
          Don’t forget to explore the app to discover more features like: weight
          tracker, history, and analytics that can help you refine your health
          and wellness strategy.
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          We're excited to be a part of your health journey and are here to help
          you succeed. If you have any questions or need assistance, our support
          team is just an email away at
          <a
            style="
              color: #c4ff46;
              font-weight: 700;
              font-size: 16px;
              line-height: 22px;
            "
            href="mailto:mltr.support@onyxlabs.tech"
            >mltr.support@onyxlabs.tech</a
          >.
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          Thank you for choosing MLTR. Let’s make your health and wellness
          journey rewarding and enjoyable!
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          Warm regards,
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          The MLTR Team
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <hr style="margin-top: 60px" />
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
exports.welcomeToMLTRTemplate = welcomeToMLTRTemplate;