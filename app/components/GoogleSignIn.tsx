// app/components/GoogleSignIn.tsx
"use client";
// app/components/GoogleSignIn.tsx
import React, { useEffect } from "react";

interface GoogleCredentialResponse {
  credential: string;
  [key: string]: any; // Esto permite otros campos adicionales en la respuesta
}

const GoogleSignIn = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id:
              "219903509938-h6nvmjjaj4b457o2duau06cicua1slv8.apps.googleusercontent.com",
            callback: handleCredentialResponse,
          });
          window.google.accounts.id.renderButton(
            document.getElementById("g-signin2"),
            { theme: "outline", size: "large" }
          );
          window.google.accounts.id.prompt();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    console.log("Encoded JWT ID token: " + response.credential);
    fetch("/tokensignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: response.credential }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Datos del usuario
      });
  };

  return <div id="g-signin2"></div>;
};

export default GoogleSignIn;
