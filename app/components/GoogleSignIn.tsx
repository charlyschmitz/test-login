"use client";
import React, { useEffect, useState } from "react";

interface GoogleCredentialResponse {
  credential: string;
  [key: string]: any;
}

interface User {
  name?: string;
  email?: string;
  picture?: string;
}

const GoogleSignIn = () => {
  const [user, setUser] = useState<User | null>(null);

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
            { theme: "filled_black", size: "large", shape: "circle" }
          );
          window.google.accounts.id.prompt();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    console.log("Encoded JWT ID token: " + response.credential);

    const userPayload = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("Carga de la respuesta ne JSON: " + userPayload);
    setUser({
      name: userPayload.name,
      email: userPayload.email,
      picture: userPayload.picture,
    });

    try {
      const botonG = document.getElementById("g-signin2");
      if (botonG != null) {
        botonG.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="g-signin2"></div>
      {user && (
        <div id="user-info">
          <h3>Bienvenido, {user.name}!</h3>
          <p>Email: {user.email}</p>
          {user.picture && <img src={user.picture} alt="User Profile" />}
        </div>
      )}
    </div>
  );
};

export default GoogleSignIn;
