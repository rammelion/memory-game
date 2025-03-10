import { useState } from "react";
import Cookies from "js-cookie";

//import { checkCookie } from "./resources/CookieHalndlers";

export default function CookieBar() {

    const [isCookieSet, setCookie] = useState(Cookies.get("cookieConsent"));

    const googleCookie = '_ga_DR8ZC0N9JR';
    const googleTagsArguments='analytics';

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
        window.dataLayer = window.dataLayer || [];
        localStorage.setItem("consentGranted", "true");
        function gtag() { window.dataLayer.push(googleTagsArguments); }
    
        gtag('consent', 'update', {
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });

        dataLayer.push({
            event: "gtm.load",
            pageType: "product", // Type of page (e.g., "home", "product", "checkout")
            productID: "01",  // Product ID (useful for e-commerce tracking)
            productName: "MemoryGame", // Name of the product
            productCategory: "Teaching Game", // Category of the product
            //userID: "user123", // Unique identifier for the user
            userStatus: "guest", // User status (e.g., "guest", "logged_in")
            /*cartValue: 59.99, // Total value of the items in the shopping cart
            currency: "USD", // Currency code (e.g., "USD", "EUR")
            transactionID: "txn98765", // Unique identifier for a transaction
            eventAction: "click", // Action performed by the user (e.g., "click", "view")
            eventCategory: "button", // Category of the event (e.g., "button", "link")
            eventLabel: "signupButton", // Label for the event (e.g., "signupButton", "promoBanner")*/
            timestamp: new Date().toISOString() // Current date and time in ISO format
          });
          
        
        
          // Load gtag.js script.
          var gtagScript = document.createElement('script');
          gtagScript.async = true;
          gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-DR8ZC0N9JR';
        
          var firstScript = document.getElementsByTagName('script')[0];
          firstScript.parentNode.insertBefore(gtagScript,firstScript);
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