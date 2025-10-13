"use strict";
exports.__esModule = true;
var react_1 = require("react");
function ClubCard(_a) {
    var club = _a.club;
    var handleJoin = function () {
        alert("Siz " + club.name + " ga qo'shildingiz (misol)");
    };
    return (react_1["default"].createElement("article", { className: "club-card" },
        react_1["default"].createElement("h3", null, club.name),
        react_1["default"].createElement("p", null, club.description),
        react_1["default"].createElement("button", { onClick: handleJoin }, "Join")));
}
exports["default"] = ClubCard;
