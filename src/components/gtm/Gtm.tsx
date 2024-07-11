import React from "react"
import {oneLine} from "common-tags";

const gtm: string = 'GTM-THQ43ZWV'

// Google Tag Manager
export const gtmScript = <script
  key="gtm-js"
  dangerouslySetInnerHTML={{__html: oneLine`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtm}');
`}}/>

// Google Tag Manager - noscript
export const gtmNoscript = <noscript
  key="gtm-noscript"
  dangerouslySetInnerHTML={{__html: oneLine`
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
`}}/>