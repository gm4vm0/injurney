"use client";

import { useEffect } from "react";

const useGoogle = () => {
  useEffect(() => {
    const DISCOVERY_DOC =
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    const handleClientLoad = () => window.gapi.load("client", initGapi);

    const initGapi = async () => {
      await window.gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      console.log("Google loaded");

      listUpcomingEvents();
    };

    const initGis = async () => {
      window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        scope: SCOPES,
        callback: () => {},
      });
    };

    const gapiScript = document.createElement("script");
    const gisScript = document.createElement("script");

    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = handleClientLoad;

    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = initGis;

    document.body.appendChild(gapiScript);

    async function listUpcomingEvents() {
      if (auth2.isSignedIn.get()) {
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log("ID: " + profile.getId());
        console.log("Full Name: " + profile.getName());
        console.log("Given Name: " + profile.getGivenName());
        console.log("Family Name: " + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
      }

      let response;
      try {
        const request = {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        };
        response = await window.gapi.client.calendar.events.list(request);
      } catch (err: any) {
        document.getElementById("content").innerText = err.message;
        return;
      }

      console.log(events);

      const events = response.result.items;
      if (!events || events.length == 0) {
        document.getElementById("content").innerText = "No events found.";
        return;
      }
      // Flatten to string to display
      const output = events.reduce(
        (str: string, event: { summary: string; start: any }) =>
          `${str}${event.summary} (${
            event.start.dateTime || event.start.date
          })\n`,
        "Events:\n"
      );
      document.getElementById("content").innerText = output;
    }

    return () => {
      document.body.removeChild(gapiScript);
    };
  }, []);
};

export default useGoogle;
