export function generateEmailTemplate({
    title,
    message,
    buttonLabel,
    buttonUrl,
    footer = "Tu n’es pas à l’origine de cette action ? Tu peux ignorer cet email.",
}: {
    title: string;
    message: string;
    buttonLabel?: string;
    buttonUrl?: string;
    footer?: string;
}) {
    return `
  <!DOCTYPE html>
  <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <style>
        body {
          background-color: #f1f1f1;
          font-family: 'Segoe UI', Roboto, sans-serif;
          padding: 2rem 1rem;
        }
        .wrapper {
          max-width: 600px;
          margin: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          border-bottom: 8px solid #ffd400;
        }
        .header {
          text-align: center;
          padding: 2rem 2rem 0;
        }
        .header img {
          max-width: 180px;
          margin: 0 auto 1.25rem;
          display: block;
        }
        .header h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111;
          margin: 0;
        }
        .content {
          padding: 1.5rem 2rem 2rem;
          font-size: 1rem;
          color: #333;
          line-height: 1.6;
          text-align: center;
        }
        .content p {
          margin: 0.75rem 0 1rem;
        }
        .button {
          display: inline-block;
          margin-top: 1.5rem;
          background: #6610f2;
          color: white;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
        }
        .button2 {
          display: inline-block;
          margin-top: 1.5rem;
          background: #ffd400;
          color: black;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
        }
        .footer {
          margin-top: 3rem;
          text-align: center;
          font-size: 0.85rem;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <img src="cid:dailychallenge-logo" alt="DailyChallenge" />
          <h1>${title}</h1>
        </div>
        <div class="content">
          <p>${message}</p>
          ${
              buttonLabel && buttonUrl
                  ? `<a href="${buttonUrl}" class="button">${buttonLabel}</a>`
                  : ""
          }
        </div>
      </div>
      <div class="footer">
       ${footer}
      </div>
    </body>
  </html>
  `;
}
