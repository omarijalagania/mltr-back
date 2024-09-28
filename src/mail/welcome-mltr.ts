export const welcomeToMLTRTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Dark Mode meta tags -->
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark only">
    <title>Welcome to MLTR</title>
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
  @media screen and (max-width: 600px) {
    .content {
        width: 100% !important;
        display: block !important;
    }
    .onyx-logo {
      margin-top: 9px !important;
    }
  }
</style>
  </head>
  <body data-ogsc="light-mode">
    <table width="100%" cellspacing="0" cellpadding="0" style="color: inherit;">
      <tr>
        <td style="padding-bottom: 60px">
          <img width="85px" height="85px" src="${process.env.BACKEND_URL}/images/MLTR_logo_500.png" alt="mltr" />
        </td>
      </tr>
      <tr>
        <td>
          <h1>
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
          <h1>
            Getting Started
          </h1>
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
              color: #8be100;
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
    <hr style="margin-top: 60px; border: none !important; background-color: #858A97 !important; height: 0.5px !important;" />
      <table style="width: 95%; margin-top: 60px; padding: 10px 0; border-collapse: collapse; ">
      <tr>
        <td>
          <img class="onyx-logo" width="25px" height="25px" src="${process.env.BACKEND_URL}/images/ONYX_logo_100.png" alt="onyx" />
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
