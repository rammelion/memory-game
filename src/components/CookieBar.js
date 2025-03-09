import { useState } from "react";
import Cookies from "js-cookie";

export default function CookieBar(props) {

        const [isCookieSet, setCookie] = useState(Cookies.get("cookieConsent"));

        // Function to handle accepting cookies
        const handleAcceptCookies = () => {
          Cookies.set("cookieConsent", true);
          setCookie(true);
        };

        // Function to handle rejecting cookies
        const handleRejectCookies = () => {
          Cookies.remove("cookieConsent");
          setCookie(false);
        };

    return (
        <div id="cookie-bar">
          <div>
            <p>
              This website uses cookies to improve your experience. Do you accept
              cookies?
            </p>
            <button onClick={handleAcceptCookies}>Accept</button>
            <button onClick={handleRejectCookies}>Reject</button>
          </div>
          <sub>Cookie set: {isCookieSet ? <b>Yes</b> : <b>No</b>}</sub>
        </div>
      );
}