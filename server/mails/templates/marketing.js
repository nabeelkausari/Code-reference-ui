export default ({ title, hiddenMessage, body, senderName, senderDesignation, senderPhone }) => `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting">
    <style type="text/css">
        /* FONTS */
        @media screen {
            @font-face {
              font-family: 'Rubik';
              font-style: italic;
              font-weight: 400;
              src: local('Rubik Italic'), local('Rubik-Italic'), url(https://fonts.gstatic.com/s/rubik/v7/iJWEBXyIfDnIV7nEnX661E_c5Ig.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 300;
              src: local('Rubik Light'), local('Rubik-Light'), url(https://fonts.gstatic.com/s/rubik/v7/iJWHBXyIfDnIV7Fqj2md8WD07oB-.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v7/iJWKBXyIfDnIV7nBrXyw023e.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 500;
              src: local('Rubik Medium'), local('Rubik-Medium'), url(https://fonts.gstatic.com/s/rubik/v7/iJWHBXyIfDnIV7Eyjmmd8WD07oB-.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        }

        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        /* RESET STYLES */
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px){
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Rubik', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${hiddenMessage}
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#0F214B" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                    <td align="center" valign="top" width="600">
            <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 30px 10px;">
                                    <a href="http://alimbook.com" target="_blank">
                                        <img alt="Alimbook" src="http://alimbook.com/static/img/bidable-email.png" style="display: block; width: 200px; max-width: 200px; min-width: 40px; font-family: 'Rubik', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                                    </a>
                                </td>
                            </tr>
                        </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#0F214B" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                    <td align="center" valign="top" width="600">
            <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; line-height: 48px;">
                                    <p style="margin: 0;">${title}</p>
                                </td>
                            </tr>
                        </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                    <td align="center" valign="top" width="600">
            <![endif]-->
                        <table  border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" valign="top" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                    ${body}
                                </td>
                            </tr>
                            <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" valign="top" style="border-bottom: 5px solid #FECB00; padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                    <p style="margin: 0;">With Best Regards,<br>${senderName},<br>${senderDesignation},<br>alimbook.com, <br>Phone: ${senderPhone}</p>
                                </td>
                            </tr>
                        </table>

            <!--[if (gte mso 9)|(IE)]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                    <td align="center" valign="top" width="600">
            <![endif]-->
            <table style="display: block; max-width: 600px" border="0" cellpadding="0" cellspacing="0" width="100%" >
                <!-- ADDRESS -->
                <tr>
                    <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 18px;" >
                        <p style="margin: 0;"><b>alimbook.com</b> - <b>Zecta Technologies Pvt Ltd</b>, 208-D, 80 feet road, HBR Extension, 1st stage, 2nd Block, Bengaluru 43</p>
                    </td>
                </tr>
            </table>

            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>
`
