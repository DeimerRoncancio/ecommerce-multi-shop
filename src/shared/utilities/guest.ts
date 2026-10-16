import Cookie from "js-cookie";

export const GUEST_COOKIE = "guestEmail";

export const guestEndedScript = `try{var s=sessionStorage.getItem("guestEmail"),m=document.cookie.match(/(?:^|; )${GUEST_COOKIE}=([^;]*)/);if(m&&decodeURIComponent(m[1])!==s){document.cookie="${GUEST_COOKIE}=; path=/; max-age=0";document.documentElement.setAttribute("data-guest-ended","")}}catch(e){}`;

export const rememberGuest = (email: string) => {
  document.documentElement.removeAttribute("data-guest-ended");
  sessionStorage.setItem("guestEmail", email);
  Cookie.set(GUEST_COOKIE, email, { sameSite: "lax", path: "/" });
};

export const syncGuest = () => {
  const stored = sessionStorage.getItem("guestEmail");
  const cookie = Cookie.get(GUEST_COOKIE);
  if (document.documentElement.hasAttribute("data-guest-ended")) return true;
  if (stored === (cookie ?? null)) return false;

  if (stored) rememberGuest(stored);
  else Cookie.remove(GUEST_COOKIE, { path: "/" });
  return true;
};
