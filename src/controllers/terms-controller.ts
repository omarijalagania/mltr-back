import { Request, Response } from "express"

export const termsOfService = (_: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>MLTR Terms and Conditions</title>
    </head>
    <body style="width: 700px; margin: 0 auto;">
      <h1>MLTR Terms and Conditions</h1>
      <p>Welcome to MLTR calorie counting app for iOS! Please read these terms and conditions of use ("Terms") carefully before using our app, as they govern your use of the app. By using our calorie counting app for iOS, you agree to be bound by these Terms and are aware of its possible changes at any time with an updated posting notice on the Services. If you do not agree to these Terms, you should not use our app.</p>
      <h2>1. Who can use the Services</h2>
      <ol type="a">
        <li>The Service is not directed at users under the age of 18. If you are under the age of 18, you are not permitted to register as a User or use the Service. A user must be at least 18 years of age to be able to use the Services or provide any Personal Data to us or in any way (e.g., Sign up for an Account, e-mail).</li>
        <li>The Service is only for registered Users with a self-owned Account. An individual must be a registered user who accomplished the Signup process. Your registered account must only be used by yourself and must not be lent to others. This is to help the app track only one user’s progress, thus, ensuring the most accurate results.</li>
      </ol>
      <h2>2. Your Account</h2>
      <ol type="a">
        <li>By Signing up for MLTR to access its services, you automatically agree and give us permission to use the information you prompted for account creation and registration. This may include your name, email, weight, height, etc.</li>
        <li>When creating an account, you responsibly provide us with accurate, complete, and up-to-date information to the best of your knowledge. Otherwise, some Services may not work correctly. Additionally, we may not be able to contact you with important notifications.</li>
        <li>Your account will be able to access and use all available Services as well as future Services updates our developers might add.</li>
        <li>You are responsible for the safety and maintenance of your account. This includes the confidentiality of the actions that take place while you are using your account. In the event of unauthorized use of your account, loss, or theft, you must notify our Support Team immediately. We are not responsible for any losses that resulted from the events mentioned above.</li>
        <li>You may delete your account by following the Delete Account process located in the app’s settings.</li>
      </ol>
      <h2>3. App Description</h2>
      <p>MLTR is a calorie counting app that is designed to help you track your food intake, exercise, and calories burned. The app is provided "as is" and we do not guarantee that it will meet your requirements or be error-free.</p>

      <h2>4. Use of App</h2>
      <p>You may use our app solely for your personal, non-commercial use. You may not use our app for any illegal or unauthorized purpose.</p>
      <h2>5. User Content</h2>
      <ol type="a" start="2">
        <li>The information and data you submit and make in MLTR is yours, but we reserve the right to use them for the betterment of the app. This includes app activity analytics, etc.</li>
        <li>Our app uses a third-party server to store data ONLY as backups. This ensures that if a user accidentally deletes the app, they can easily retrieve the same content by logging back into their account.</li>
        <li>Your information is safe with us. We do not share or sell any information you enter on our app. However, we do not guarantee its complete security.</li>
      </ol>
      <h2>6. Intellectual Property</h2>
      <p>All intellectual property rights in our app, including but not limited to copyrights, trademarks, and patents, are owned by us or our licensors. You may not use our app or any of its content for any commercial purpose without our prior written consent. This may include (and is not limited to) using the app as a service for a paid workout program.</p>
      <h2>7. Disclaimer of Warranties</h2>
      <p>Our app is provided "as is" and we make no warranties, express or implied, regarding the app or its content. We do not guarantee that our app will be error-free or that it will meet your requirements.</p>
      <ol type="b">
        <li>We do not guarantee any fitness/health claims the app services offer. You acknowledge that a lack of results is not an event MLTR will be liable for.</li>
      </ol>
      <h2>8. Limitation of Liability</h2>
      <p>In no event shall we be liable to you or any third party for any indirect, consequential, incidental, punitive, or special damages arising out of or in connection with the use of our app.</p>
      <ol type="b">
        <li>Indemnification: You agree to indemnify and hold us harmless from any and all claims, damages, and expenses, including attorneys' fees, arising out of or in connection with your use of our app.</li>
        <li>You acknowledge that dieting and exercise activities involve risks, which may result in injury or even death. You acknowledge that MLTR is not responsible for any of these risks, whether connected to using the app or not.</li>
      </ol>
      <h2>9. Termination</h2>
      <p>We reserve the right to terminate your use of our app at any time and for any reason without prior notice. Reasons could include a breach of the Terms and Conditions and Privacy Policy.</p>
      <h2>10. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate.</p>
      <h2>11. Changes to Terms</h2>
      <p>We reserve the right to change these Terms at any time without prior notice. Your continued use of our app after any such changes constitutes your acceptance of the new Terms.</p>
      <h2>12. Miscellaneous</h2>
      <p>Submitted comments and suggestions to MLTR will be deemed as the property of MLTR. We value your ideas to improve our services better. As such, we reserve the right to use them unrestrictedly for the betterment of the app.</p>
      </body>
      </html>
    
      `)
}
