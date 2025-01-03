// app/components/GoogleSignIn.tsx
"use client";
import React, { useEffect } from "react";

const GoogleSignIn = () => {
  useEffect(() => {
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
  }, []);

  const handleCredentialResponse = (response) => {
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
