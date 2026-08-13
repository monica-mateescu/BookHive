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
                      class="email-button-bg"
                      style="
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        border-radius: 4px;
                        text-align: center;
                        vertical-align: top;
                        background-color: #1f2937;
                      "
                    >
                      <a
                        href="${buttonUrl}"
                        target="_blank"
                        class="email-button-text"
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
                          border: solid 1px #1f2937;
                          background-color: #1f2937;
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
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
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
          @media (prefers-color-scheme: dark) {
            .email-body-bg {
              background-color: #11151c !important;
            }
            .email-wrapper {
              background-color: #11151c !important;
            }
            .email-header-link {
              color: #e5e7eb !important;
            }
            .email-header-text {
              color: #e5e7eb !important;
            }
            .email-content {
              color: #e5e7eb !important;
              background-color: #1e2632 !important;
            }
            .email-content * {
              color: #e5e7eb !important;
            }
            .email-footer-link {
              color: #e5e7eb !important;
            }
            .email-footer-text {
              color: #e5e7eb !important;
            }
            .email-button-bg {
              border-color: #dca54d !important;
              background-color: #dca54d !important;
            }
            .email-button-text {
              color: #11151c !important;
              border-color: #dca54d !important;
              background-color: #dca54d !important;
            }
          }
          [data-ogsc] .email-body-bg,
          [data-ogsb] .email-body-bg {
            background-color: #11151c !important;
          }
          [data-ogsc] .email-wrapper,
          [data-ogsb] .email-wrapper {
            background-color: #11151c !important;
          }
          [data-ogsc] .email-header-link,
          [data-ogsb] .email-header-link {
            color: #e5e7eb !important;
          }
          [data-ogsc] .email-header-text,
          [data-ogsb] .email-header-text {
            color: #e5e7eb !important;
          }
          [data-ogsc] .email-content,
          [data-ogsb] .email-content {
            color: #e5e7eb !important;
            background-color: #1e2632 !important;
          }
          [data-ogsc] .email-content *,
          [data-ogsb] .email-content * {
            color: #e5e7eb !important;
          }
          [data-ogsc] .email-footer-link,
          [data-ogsb] .email-footer-link {
            color: #e5e7eb !important;
          }
          [data-ogsc] .email-footer-text,
          [data-ogsb] .email-footer-text {
            color: #e5e7eb !important;
          }
          [data-ogsc] .email-button-bg,
          [data-ogsb] .email-button-bg {
            border-color: #dca54d !important;
            background-color: #dca54d !important;
          }
          [data-ogsc] .email-button-text,
          [data-ogsb] .email-button-text {
            color: #11151c !important;
            border-color: #dca54d !important;
            background-color: #dca54d !important;
          }
        </style>
      </head>
      <body
        class="email-body-bg"
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
                  class="email-wrapper"
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
                            class="email-header-text"
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
                              class="email-header-link"
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
                            class="email-content"
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
                              class="email-footer-link"
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
                              class="email-footer-link"
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
                              class="email-footer-link"
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
                            class="email-footer-text"
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
