export const codeConfirmationTemplate = (code: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style="
          background: linear-gradient(
            187.16deg,
            #181623 0.07%,
            #191725 51.65%,
            #0d0b14 98.75%
          );
          height: 100vh;
          padding: 0 100px;
        "
      >
      <div style="text-align: center; padding-top: 20px">
      <img src="https://i.ibb.co/fXPTqGS/quote.png" alt="icon" />
    </div>
        <h3
          style="
            text-align: center;
            color: white;
            text-transform: uppercase;
            padding-top: 50px;
          "
        >
          Movie quotes
        </h3>
        <div style="width: 70%; padding: 0 7px">
          <p style="color: white">Code: ${code}!</p>
      
          <p style="color: white; padding-top: 20px">
            If you have any problems, please contact us: support@moviequotes.ge
          </p>
          <p style="color: white; padding-top: 20px">MovieQuotes Crew</p>
        </div>
      </body>
    </html>
    
    `
}
