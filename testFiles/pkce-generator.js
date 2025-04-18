// const crypto = require("crypto");

// function generatePKCE() {
//   const code_verifier = crypto.randomBytes(32).toString("base64url");
//   const code_challenge = crypto.createHash("sha256").update(code_verifier).digest().toString("base64url");

//   console.log("CODE_VERIFIER=====>", code_verifier);
//   console.log("CODE_CHALLENGE=====>", code_challenge);
// }

// generatePKCE();

// pkce-utils.js
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

async function generateCodeChallenge(codeVerifier) {
  const hashBuffer = await sha256(codeVerifier);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode.apply(null, hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return base64;
}
