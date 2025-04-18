const axios = require("axios");

const TENANT_NAME = "projectshellab2c";
const POLICY = "B2C_1_projectshell";
const CLIENT_ID = "e9460e2d-29d1-4711-be7e-e1e92d1370ef";
const REDIRECT_URI = "http://localhost:3000";

const CODE_VERIFIER =
  "rRZ_3K.uu6B0xB9nbBG1A2mz7uf-sMusiMiPkNlsgvyFi.JSkAztotbIjaHlKggYGV~w-Dq1zu-NKAI05zu7IcYyXnqR.M9mf.7O0DtMTQ_cgYXmjQLNN38kUHaTj6t.";
const AUTH_CODE =
  "eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..90ZlMEfMEDRoNtNX.Ir9xspy5zA8UOC05CTsQ9irLv87E96DodE_7kLrj3MUvMl2-D2RYeKt_wEyUmBtpt52x-ndGh7CBZDafq2dBSDJWcZ8nx67gEJ34aHKWW7CVqUBe-WwSCiTK1RH04LJ-84xqwPVUTznyszqsW6zQ3JfjJzsE8hnutl73Q86KuxKDQMvt17hhUDOM1WY2yAfU81HbrRAv9YxsZ8GKgZKehqFuHa4G7LI1riobgvvy5v3N7i5BKRLBTYJMCqGGQUT3c6ZQmeoIsgZ5m-AaIhYMAlih4b9BCWWB2pEuxIRHRXr-L8nGZpiMftW22mvtO6kaACSIiYRzomYipGDl-B9rZoHgr8h6jsPuyA7zKvAgTKVPiWjwnQeQQPVeGmdY86c60fGLGUoDJwsq4hCJYaNul-rSjKcgGJoVaBuVjiJoPLkvW9nFcV_Om3-eoWzN5krgRHq0KJwG6QLpFId1nUdpH7zUTNo2_nZiMzJR1Z05B1799t8of-73xGxIGv9Dagrp6R0bwMZpcHMLj4jjqJUNvG6QFRQWI-CLjKBouiNIWE8hAI2Y3hBL67TP82MOuPKMNkcjD_jZmBXQnk-J7p9OdSFgZjZy8FbQi6bwBPKAXsH62_0lVcXUOUf6UCgb4OW5Q8-rZN507eJY2dgEQyj-1bpIneYRzRmh3pQo9k8DHlnTu95m49SoN0B_9UJbkIo4DHtNdor4VyHHhZKFB0MTf4OVlS7vEiphf-_m7bOOM3YXF9_dcG4PeOIG_oUR9VIngIuUUxGV.8mckms5-88NNKkOD2QYTsQ";

const TOKEN_ENDPOINT = `https://${TENANT_NAME}.b2clogin.com/${TENANT_NAME}.onmicrosoft.com/${POLICY}/oauth2/v2.0/token`;

const fetchB2CUser = async () => {
  try {
    const data = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      code: AUTH_CODE,
      redirect_uri: REDIRECT_URI,
      code_verifier: CODE_VERIFIER,
      scope: "openid profile",
    });

    const response = await axios.post(TOKEN_ENDPOINT, data.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("Tokens:", response.data);

    const idToken = response.data.id_token;
    const payload = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf8"));
    console.log("👤 User Profile:", payload);
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
};

fetchB2CUser();

// const axios = require("axios");

// const TENANT_NAME = "projectshellab2c";
// const POLICY = "B2C_1_projectshell";
// const CLIENT_ID = "e9460e2d-29d1-4711-be7e-e1e92d1370ef";
// const REDIRECT_URI = "http://localhost:3000";

// const CODE_VERIFIER =
//   "rRZ_3K.uu6B0xB9nbBG1A2mz7uf-sMusiMiPkNlsgvyFi.JSkAztotbIjaHlKggYGV~w-Dq1zu-NKAI05zu7IcYyXnqR.M9mf.7O0DtMTQ_cgYXmjQLNN38kUHaTj6t.";
// const AUTH_CODE =
//   "eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..90ZlMEfMEDRoNtNX.Ir9xspy5zA8UOC05CTsQ9irLv87E96DodE_7kLrj3MUvMl2-D2RYeKt_wEyUmBtpt52x-ndGh7CBZDafq2dBSDJWcZ8nx67gEJ34aHKWW7CVqUBe-WwSCiTK1RH04LJ-84xqwPVUTznyszqsW6zQ3JfjJzsE8hnutl73Q86KuxKDQMvt17hhUDOM1WY2yAfU81HbrRAv9YxsZ8GKgZKehqFuHa4G7LI1riobgvvy5v3N7i5BKRLBTYJMCqGGQUT3c6ZQmeoIsgZ5m-AaIhYMAlih4b9BCWWB2pEuxIRHRXr-L8nGZpiMftW22mvtO6kaACSIiYRzomYipGDl-B9rZoHgr8h6jsPuyA7zKvAgTKVPiWjwnQeQQPVeGmdY86c60fGLGUoDJwsq4hCJYaNul-rSjKcgGJoVaBuVjiJoPLkvW9nFcV_Om3-eoWzN5krgRHq0KJwG6QLpFId1nUdpH7zUTNo2_nZiMzJR1Z05B1799t8of-73xGxIGv9Dagrp6R0bwMZpcHMLj4jjqJUNvG6QFRQWI-CLjKBouiNIWE8hAI2Y3hBL67TP82MOuPKMNkcjD_jZmBXQnk-J7p9OdSFgZjZy8FbQi6bwBPKAXsH62_0lVcXUOUf6UCgb4OW5Q8-rZN507eJY2dgEQyj-1bpIneYRzRmh3pQo9k8DHlnTu95m49SoN0B_9UJbkIo4DHtNdor4VyHHhZKFB0MTf4OVlS7vEiphf-_m7bOOM3YXF9_dcG4PeOIG_oUR9VIngIuUUxGV.8mckms5-88NNKkOD2QYTsQ";

// const TOKEN_ENDPOINT = `https://${TENANT_NAME}.b2clogin.com/${TENANT_NAME}.onmicrosoft.com/${POLICY}/oauth2/v2.0/token`;

// const fetchB2CUser = async () => {
//   try {
//     const data = new URLSearchParams({
//       grant_type: "authorization_code",
//       client_id: CLIENT_ID,
//       code: AUTH_CODE,
//       redirect_uri: REDIRECT_URI,
//       code_verifier: CODE_VERIFIER,
//       scope: "openid profile",
//     });

//     const response = await axios.post(TOKEN_ENDPOINT, data.toString(), {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     console.log("✅ Tokens:", response.data);

//     const idToken = response.data.id_token;
//     const payload = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf8"));

//     // 👇 Call your helper here
//     parseB2CUserProfile(payload);
//   } catch (err) {
//     console.error("❌ Error:", err.response?.data || err.message);
//   }
// };

// function parseB2CUserProfile(payload) {
//   const formatDate = (timestamp) => new Date(timestamp * 1000).toLocaleString("en-US", { timeZone: "UTC" });

//   const septicProfile = {
//     "User ID": payload.sub || payload.user_id,
//     "Object ID (oid)": payload.oid,
//     "First Name": payload.given_name,
//     "Last Name": payload.family_name,
//     Email: payload.emails?.[0] || "N/A",
//     "Mobile Phone": payload.extension_mobilePhone || "N/A",
//     "Member Number": payload.extension_MemberNo || "N/A",
//     "User Flow (tfp)": payload.tfp,
//     "Token Version": payload.ver,
//     "Issued At": formatDate(payload.iat),
//     "Auth Time": formatDate(payload.auth_time),
//     "Valid From (nbf)": formatDate(payload.nbf),
//     "Expires At (exp)": formatDate(payload.exp),
//     Issuer: payload.iss,
//     "Audience (Client ID)": payload.aud,
//     Nonce: payload.nonce,
//   };

//   console.log("🧾 User Profile (Septic Format):");
//   console.table(septicProfile);
// }

// fetchB2CUser();
