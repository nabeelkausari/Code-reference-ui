import {clientUrl} from "../../config/constants";

export default link => `
<!DOCTYPE html>
<html>
<head>
    <title></title>
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
    We're thrilled to have you here! Get ready to dive into your new account.
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
                                <td align="center" valign="top" style="padding: 10px;">
                                    <a href="${clientUrl}" target="_blank">
                                        <img alt="Alimbook" src="${clientUrl}/static/alimbook-full.png" style="display: block; width: 300px; max-width: 300px; min-width: 40px; font-family: 'Rubik', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
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
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 500; line-height: 48px; text-transform: capitalize;">
                                    <h1 style="font-size: 28px; font-weight: 500; margin: 0;">Assalaamu Alaikum!</h1>
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
                                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                </td>
                            </tr>
                            <!-- BULLETPROOF BUTTON -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" valign="top">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FECB00"><a href="${link}" target="_blank" style="font-size: 20px; font-family: 'Rubik', Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #fc0; display: inline-block;">Confirm Account</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" valign="top" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" valign="top" style="border-bottom: 5px solid #FECB00; padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                    <p style="margin: 0;">Jazakallahu Khair,<br>The Alimbook Team</p>
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

                <!-- PERMISSION REMINDER -->
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 30px 30px 30px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 18px;" >
                        <p style="margin: 0;">You received this email because you just signed up for a new account.</p>
                    </td>
                </tr>
                <!-- ADDRESS -->
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Rubik', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 18px;" >
                        <p style="margin: 0;"><b>Alimbook</b> - www.alimbook.com</p>
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
