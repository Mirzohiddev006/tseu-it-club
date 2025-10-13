"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("./App");
require("./styles/index.css");
require("./sampleClubs");
require("./types");
var root = client_1.createRoot(document.getElementById("root"));
root.render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(App_1["default"], null)));
setTimeout(function () {
    try {
        var vid = document.querySelector(".bg-video");
        if (!vid)
            return;
        var canPlayMp4 = !!vid.canPlayType && vid.canPlayType("video/mp4") !== "";
        var canPlayMov = !!vid.canPlayType && vid.canPlayType("video/quicktime") !== "";
        if (!canPlayMp4 && !canPlayMov) {
            vid.style.display = "none";
            var wrap = document.querySelector(".wrap");
            if (wrap) {
                wrap.style.backgroundImage = "url('/image.png')";
                wrap.style.backgroundSize = "cover";
                wrap.style.backgroundPosition = "center";
            }
        }
    }
    catch (e) {
        // ignore
    }
}, 200);
