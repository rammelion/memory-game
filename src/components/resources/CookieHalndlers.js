import { useState } from "react";
import Cookies from "js-cookie";

export const checkCookie = (cookieName) => {
    Cookies.get(cookieName);
}