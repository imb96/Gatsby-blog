/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// gatsby-ssr.js

import {GatsbySSR} from "gatsby"
import {gtmNoscript, gtmScript} from "./src/components/gtm/Gtm";


export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([gtmScript])
  setPreBodyComponents([gtmNoscript])
}