import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./sampleClubs";
import "./types";
import { App } from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

setTimeout(() => {
  try {
    const vid = document.querySelector<HTMLVideoElement>(".bg-video");
    if (!vid) return;
    const canPlayMp4 = !!vid.canPlayType && vid.canPlayType("video/mp4") !== "";
    const canPlayMov =
      !!vid.canPlayType && vid.canPlayType("video/quicktime") !== "";
    if (!canPlayMp4 && !canPlayMov) {
      vid.style.display = "none";
      const wrap = document.querySelector<HTMLElement>(".wrap");
      if (wrap) {
        wrap.style.backgroundImage = "url('/image.png')";
        wrap.style.backgroundSize = "cover";
        wrap.style.backgroundPosition = "center";
      }
    }
  } catch (e) {
    // ignore
  }
}, 200);
