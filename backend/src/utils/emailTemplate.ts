type EmailTemplateProps = {
  contentHtml: string;
  showButton?: boolean;
  buttonUrl?: string;
  buttonText?: string;
  signatureHtml?: string;
};

export const getEmailHtmlTemplate = ({
  contentHtml,
  showButton = false,
  buttonUrl = '',
  buttonText = 'Call To Action',
  signatureHtml = ''
}: EmailTemplateProps): string => {
  const buttonHtml = showButton
    ? `
      <table
        role="presentation"
        style="
          border: 0;
          width: 100%;
          min-width: 100%;
          box-sizing: border-box;
          border-spacing: 0;
          border-collapse: collapse;
        "
      >
        <tbody>
          <tr>
            <td
              style="
                font-family: Arial, sans-serif;
                font-size: 16px;
                text-align: left;
                vertical-align: top;
              "
            >
              <table
                role="presentation"
                style="
                  width: auto;
                  border-spacing: 0;
                  border-collapse: collapse;
                "
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        border-radius: 4px;
                        text-align: center;
                        vertical-align: top;
                        background-color: #111827;
                      "
                    >
                      <a
                        href="${buttonUrl}"
                        target="_blank"
                        style="
                          margin: 0;
                          cursor: pointer;
                          font-size: 14px;
                          color: #ffffff;
                          font-weight: bold;
                          padding: 5px 15px;
                          border-radius: 4px;
                          display: inline-block;
                          text-decoration: none;
                          box-sizing: border-box;
                          border: solid 1px #111827;
                          background-color: #111827;
                        "
                      >
                        ${buttonText}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `
    : '';

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <title>Email</title>
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=yes"
        />
        <meta
          name="format-detection"
          content="telephone=no,date=no,address=no,email=no,url=no"
        />
        <style>
          html,
          body {
            padding: 0;
            width: 100%;
            height: 100%;
            margin: 0 auto;
          }
          * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
          table {
            border: 0;
            border-spacing: 0;
            border-collapse: collapse;
          }
          #MessageViewBody,
          #MessageWebViewDiv {
            width: 100%;
          }
          #MessageViewBody a {
            color: inherit;
            cursor: default;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
            text-decoration: none;
          }
          a[x-apple-data-detectors] {
            color: inherit;
            cursor: default;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
            text-decoration: none;
          }
        </style>
      </head>
      <body
        style="
          margin: 0;
          padding: 0;
          word-spacing: normal;
          background-color: #faf8f5;
        "
      >
        <div
          lang="en"
          role="article"
          aria-roledescription="email"
          style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%"
        >
          <table
            role="presentation"
            style="
              border: 0;
              width: 100%;
              min-width: 100%;
              box-sizing: border-box;
              border-spacing: 0;
              border-collapse: collapse;
            "
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 10px;
                    line-height: 20px;
                    text-align: center;
                    vertical-align: top;
                    background-color: #faf8f5;
                  "
                >
                  <div style="width: 98%; margin: 0 auto; max-width: 600px">
                    <table
                      role="presentation"
                      style="
                        border: 0;
                        width: 100%;
                        box-sizing: border-box;
                        border-spacing: 0;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              font-family: Arial, sans-serif;
                              font-size: 16px;
                              padding-left: 0;
                              padding-right: 0;
                              color: #111827;
                              padding-top: 10px;
                              text-align: center;
                              vertical-align: top;
                              padding-bottom: 10px;
                            "
                          >
                            <a
                              href="https://bookspine.net"
                              style="
                                cursor: pointer;
                                font-size: 16px;
                                color: #111827;
                                font-weight: bold;
                                text-decoration: underline;
                              "
                            >
                              BookSpine
                            </a>
                            — your online book clubs
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="spacer"
                      style="
                        width: 100%;
                        height: 10px;
                        margin: 0 auto;
                        font-size: 10px;
                        max-width: 600px;
                        line-height: 10px;
                      "
                    >
                      &nbsp;
                    </div>
                    <table
                      role="presentation"
                      style="
                        border: 0;
                        width: 100%;
                        box-sizing: border-box;
                        border-spacing: 0;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              font-family: Arial, sans-serif;
                              padding: 20px;
                              font-size: 16px;
                              color: #111827;
                              text-align: left;
                              border-radius: 4px;
                              vertical-align: top;
                              background-color: #e5e7eb;
                            "
                          >
                            ${contentHtml}
                            ${buttonHtml}
                            ${signatureHtml}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="spacer"
                      style="
                        width: 100%;
                        height: 10px;
                        margin: 0 auto;
                        font-size: 10px;
                        max-width: 600px;
                        line-height: 10px;
                      "
                    >
                      &nbsp;
                    </div>
                    <table
                      role="presentation"
                      style="
                        border: 0;
                        width: 100%;
                        box-sizing: border-box;
                        border-spacing: 0;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              font-family: Arial, sans-serif;
                              padding-top: 10px;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <a
                              href="https://bookspine.net/about"
                              style="
                                cursor: pointer;
                                font-size: 16px;
                                color: #111827;
                                text-decoration: underline;
                              "
                              >About</a
                            >
                            -
                            <a
                              href="https://bookspine.net/privacy-policy"
                              style="
                                cursor: pointer;
                                font-size: 16px;
                                color: #111827;
                                text-decoration: underline;
                              "
                              >Privacy Policy</a
                            >
                            -
                            <a
                              href="https://bookspine.net/contact"
                              style="
                                cursor: pointer;
                                font-size: 16px;
                                color: #111827;
                                text-decoration: underline;
                              "
                              >Contact</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-family: Arial, sans-serif;
                              font-size: 16px;
                              color: #111827;
                              padding-top: 10px;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            © 2026 All rights reserved
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;
};
