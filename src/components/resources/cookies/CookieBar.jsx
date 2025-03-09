import { useState } from "react";
import Cookies from "js-cookie";

//import { checkCookie } from "./resources/CookieHalndlers";

export default function CookieBar() {

    const [isCookieSet, setCookie] = useState(Cookies.get("cookieConsent"));

    const initCookieBar = () => {
        if (isCookieSet != null){
            return "hide-cookiebar";
        } else {
            return "show-cookiebar"
        }
    }

    const cookieBarClass = 'container  col-lg-6 mx-lg-auto bg-danger rounded-2 ' + initCookieBar();

    const hideCookieBar = () => {
        const cookieBar = document.getElementById('cookie-bar');
        cookieBar.style.display = 'none';
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
            <div className="pt-2 text-lg-center">
                <p>
                    This website uses cookies to improve your experience. Do you accept
                    cookies?
                </p>
            </div>
            <div className="button-container mx-auto py-2">
                <div className="text-center">
                    <button type="button" className="btn btn-success" onClick={handleAcceptCookies}>Accept</button>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-dark" onClick={handleRejectCookies}>Reject</button>
                </div>
                </div>
            </div>

      );
}