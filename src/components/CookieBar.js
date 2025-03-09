import { useState } from "react";
import Cookies from "js-cookie";

import { checkCookie } from "./resources/CookieHalndlers";

export default function CookieBar(props) {

        const [isCookieSet, setCookie] = useState(Cookies.get("cookieConsent"));

        const initCookieBar = () => {
            if (isCookieSet != null){
                return "hide-cookiebar";
            } else {
                return "show-cookiebar"
            }
        }

        const cookieBarClass = initCookieBar();

        const hideCookieBar = () => {
            const cookieBar = document.getElementById('cookie-bar');
            cookieBar.style.display = 'none';
        }

        const showCookieBar = () => {
            const cookieBar = document.getElementById('cookie-bar');
            cookieBar.style.display = 'flex';
        }

        // Function to handle accepting cookies
        const handleAcceptCookies = () => {
          Cookies.set("cookieConsent", true);
          setCookie(true);
          hideCookieBar();
        };

        // Function to handle rejecting cookies
        const handleRejectCookies = () => {
          Cookies.set("cookieConsent", false);
          setCookie(false);
          hideCookieBar();
        };

    return (
        <div id="cookie-bar" className={cookieBarClass}>
          <div>
            <p>
              This website uses cookies to improve your experience. Do you accept
              cookies?
            </p>
            <button onClick={handleAcceptCookies}>Accept</button>
            <button onClick={handleRejectCookies}>Reject</button>
          </div>
        </div>
      );
}