"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.welcomeToProTemplate = void 0;
const welcomeToProTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to MLTR Pro</title>
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
          Welcome to Pro!
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
            We are thrilled to have you on board with MLTR Pro! You're all set to enhance your health journey with some top-notch tools that'll make staying on track a breeze. Here are some cool things you can do now!
          </p>
        </td>
      </tr>
      <tr>
        
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
                  >Advanced Analytics:
                </span>
                Dive into your health data like never before. See trends, track progress, and gain the insights you need to make informed decisions.
              </td>
              <td style="text-align: right">
                <img
                  style="width: 131px; height: 169px"
                  src="${process.env.BACKEND_URL}/images/desk.png"
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
                  style="width: 96px; height: 167px"
                  src="${process.env.BACKEND_URL}/images/bite.png"
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
                  >AI Food Search: 
                </span>
                See something tasty? Snap a photo, and our AI will identify the food for you, providing detailed nutritional info. It’s your diet detective, decoding foods with just a click!
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
                  > AI Meal Builder:
                </span>
                AI Meal Builder: Got a photo with multiple foods? No problem. Our AI will identify each item in your picture and combine them into a meal for you. Keeping track of your diet has never been easier!
              </td>
              <td style="text-align: right">
                <img
                  width="172px"
                  height="163px"
                  src="${process.env.BACKEND_URL}/images/fridge.png"
                  alt="apple"
                />
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px"></td>
            </tr>
            
          </table>
        </td>
      </tr>
      <tr>
        <tr>
          <td colspan="2" style="padding-top: 60px"></td>
        </tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          
          These Pro features are designed to simplify and enrich your approach to health and nutrition. And remember, we are always working on even more amazing features for our Pro users.
        </td>
      </tr>
      
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px">
          <p style="padding: 10px 0;">Thanks for choosing MLTR Pro. Here's to a healthier, more informed you!</p>
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
exports.welcomeToProTemplate = welcomeToProTemplate;