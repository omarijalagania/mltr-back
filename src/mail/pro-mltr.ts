export const welcomeToProTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Dark Mode meta tags -->
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark only">
    <title>Welcome to Biteme Pro</title>
  
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
    <table width="100%" cellspacing="0" cellpadding="0" style="color: inherit;">
      <tr>
        <td style="padding-bottom: 60px;">
          <img height="85px" width="85px" src="${process.env.BACKEND_URL}/images/mltr.png" alt="Biteme" />
        </td>
      </tr>
      <tr>
        <td>
          <h1>
            Welcome to Pro!
          </h1>
        </td>
      </tr>
      <tr>
        <td style="text-align: left; font-size: 14px; line-height: 22px; padding-bottom: 60px; padding-top: 20px;">
          <p style="color: inherit;">
            We are thrilled to have you on board with Biteme Pro! You're all set to enhance your health journey with some top-notch tools that'll make staying on track a breeze. Here are some cool things you can do now!
          </p>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0">
            <!-- One -->
            <tr>
              <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
                <span style="color: #009cb1; font-weight: 700; font-size: 16px; line-height: 22px;">
                  Advanced Analytics:
                </span>
                Dive into your health data like never before. See trends, track progress, and gain the insights you need to make informed decisions.
              </td>
              <td style="text-align: right;">
                <img style="width: 131px; height: 169px;" src="${process.env.BACKEND_URL}/images/desk.png" alt="apple" />
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px;"></td>
            </tr>
            <!-- Two -->
            <tr>
              <td style="text-align: left;">
                <img style="width: 96px; height: 167px;" src="${process.env.BACKEND_URL}/images/bite.png" alt="apple" />
              </td>
              <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
                <span style="color: #009cb1; font-weight: 700; font-size: 16px; line-height: 22px;">
                  AI Food Search:
                </span>
                See something tasty? Snap a photo, and our AI will identify the food for you, providing detailed nutritional info. It’s your diet detective, decoding foods with just a click!
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px;"></td>
            </tr>
            <!-- Three -->
            <tr>
              <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
                <span style="color: #009cb1; font-weight: 700; font-size: 16px; line-height: 22px;">
                  AI Meal Builder:
                </span>
                Got a photo with multiple foods? No problem. Our AI will identify each item in your picture and combine them into a meal for you. Keeping track of your diet has never been easier!
              </td>
              <td style="text-align: right;">
                <img width="172px" height="163px" src="${process.env.BACKEND_URL}/images/fridge.png" alt="apple" />
              </td>
            </tr>
            <!-- Spacer -->
            <tr>
              <td colspan="2" style="padding-top: 60px;"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding-top: 60px;"></td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
          These Pro features are designed to simplify and enrich your approach to health and nutrition. And remember, we are always working on even more amazing features for our Pro users.
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
          <p style="padding: 10px 0;">Thanks for choosing Biteme Pro. Here's to a healthier, more informed you!</p>
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
          Warm regards,
        </td>
      </tr>
      <tr>
        <td style="font-weight: 400; font-size: 16px; line-height: 22px; color: inherit;">
          The Biteme Team
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <hr style="margin-top: 60px; border: none !important; background-color: #858A97 !important; height: 0.5px !important;" />
    <table class="table-width" style="width: 90%; margin-top: 60px; padding: 10px 0; border-collapse: collapse;">
      <tr>
        <td>
          <img class="onyx-logo" width="25px" height="25px" src="${process.env.BACKEND_URL}/images/ONYX_logo_100.png" alt="onyx" />
        </td>
        <td>
          <a style="color: #7c7c7c; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/terms.html">
            ONYX Labs
          </a>
        </td>
        <td class="content">
          <a style="color: #8be100; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/terms.html">
            Terms and Conditions
          </a>
        </td>
        <td class="content">
          <a style="color: #8be100; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/privacy.html">
            Privacy Policy
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
}
