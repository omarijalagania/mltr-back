export const welcomeToMLTRTemplate = () => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to MLTR</title>
  </head>
  <body style="background-color: black; color: white">
    <img style="padding: 10px" src="${process.env.BACKEND_URL}/images/mltr.png" alt="mltr" />
    <h1
      style="
        background-image: linear-gradient(to right, #adff00, #0085ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        font-size: 44px;
        line-height: 40px;
        font-weight: 700;
      "
    >
      Welcome to MLTR
    </h1>
    <p style="text-align: left; font-size: 14px; line-height: 22px">
      Welcome aboard! We're thrilled to have you join the MLTR family. Our
      mission is simple: to help you lead a healthier, more balanced life with
      ease and insight.
    </p>

    <h2
      style="
        background-image: linear-gradient(to right, #adff00, #0085ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        font-size: 32px;
        line-height: 22px;
      "
    >
      Getting Started
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
        <span
          style="
            color: #c4ff46;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >Setting Your Goals: </span
        >Customize your health and nutrition goals and preferences through our
        settings.
      </p>
      <img
        style="width: 141px; height: 95px; padding: 0 5px"
        src="${process.env.BACKEND_URL}/images/apple.png"
        alt="apple"
      />
    </div>

    <!-- Two -->

    <div style="display: flex; justify-content: space-between">
      <img
        style="width: 141px; height: 88px; padding: 0 5px"
        src="${process.env.BACKEND_URL}/images/cup.png"
        alt="apple"
      />
      <p
        style="
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          padding-left: 40px;
        "
      >
        <span
          style="
            color: #c4ff46;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >Tracking Your Meals: </span
        >Use our extensive food database to build your daily meals and have them
        ready to go.
      </p>
    </div>

    <!-- Three -->

    <div style="display: flex; margin-top: 20px">
      <p
        style="
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          padding-right: 40px;
        "
      >
        <span
          style="
            color: #c4ff46;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >Staying Hydrated: </span
        >Keep track of your liquids intake with our hydration tracker to ensure
        you’re always at your best.
      </p>
      <img src="${process.env.BACKEND_URL}/images/glass.png" alt="apple" />
    </div>

    <!-- Four -->

    <div
      style="display: flex; justify-content: space-between; margin-top: 20px"
    >
      <img
        style="width: 141px; height: 88px; padding: 0 5px"
        src="${process.env.BACKEND_URL}/images/heart.png"
        alt="apple"
      />
      <p
        style="
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          padding-left: 40px;
        "
      >
        <span
          style="
            color: #c4ff46;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >Tracking Your Meals: </span
        >Use our extensive food database to build your daily meals and have them
        ready to go.
      </p>
    </div>

    <!-- Explore -->

    <div style="margin-top: 60px">
      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        <span
          style="
            color: #c4ff46;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >Explore More: </span
        >Don’t forget to explore the app to discover more features like: weight
        tracker, history, and analytics that can help you refine your health and
        wellness strategy.
      </p>

      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
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
        >
      </p>

      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        Thank you for choosing MLTR. Let’s make your health and wellness journey
        rewarding and enjoyable!
      </p>

      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        Warm regards,
      </p>

      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        The MLTR Team
      </p>
    </div>

    <!-- Footer -->

    <hr style="margin-top: 60px" />

    <div
      style="
        list-style: none;
        display: flex;
        margin-top: 60px;
        align-items: center;
        justify-content: flex-start;
      "
    >
      <p>
        <img src="${process.env.BACKEND_URL}/images/onyx.png" alt="onyx" />
      </p>
      <p>
        <a
          style="
            color: #c4ff46;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            padding: 0 20px;
          "
          href="https://mltr.app/policies/terms.html"
          >Terms and Conditions</a
        >
      </p>

      <p>
        <a
          style="
            color: #c4ff46;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
          "
          href="https://mltr.app/policies/privacy.html"
          >Privacy Policy
        </a>
      </p>
    </div>
  </body>
</html>

  

    `
}
