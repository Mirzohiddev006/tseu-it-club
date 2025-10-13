"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ClubCard_1 = require("./ClubCard");
function ClubList(_a) {
    var clubs = _a.clubs;
    return (react_1["default"].createElement("section", { className: "club-list" }, clubs.map(function (c) { return (react_1["default"].createElement(ClubCard_1["default"], { key: c.id, club: c })); })));
}
exports["default"] = ClubList;
