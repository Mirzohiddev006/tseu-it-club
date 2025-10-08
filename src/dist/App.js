"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var sampleClubs_1 = require("./sampleClubs");
var App = function () {
    var _a;
    var _b = react_1.useState({
        clubId: null,
        name: "",
        faculty: "",
        course: "",
        phone: "",
        notes: ""
    }), form = _b[0], setForm = _b[1];
    var _c = react_1.useState(null), status = _c[0], setStatus = _c[1];
    var handleChange = function (k) {
        return function (e) {
            return setForm(function (s) {
                var _a;
                return (__assign(__assign({}, s), (_a = {}, _a[k] = k === "clubId" ? Number(e.target.value) : e.target.value, _a)));
            });
        };
    };
    var submit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!form.clubId || !form.name) {
                        setStatus("Iltimos, klub va ismingizni kiriting.");
                        return [2 /*return*/];
                    }
                    setStatus("Yuborilmoqda...");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(__assign({ club: (_a = sampleClubs_1["default"].find(function (c) { return c.id === form.clubId; })) === null || _a === void 0 ? void 0 : _a.name }, form))
                        })];
                case 2:
                    _b.sent();
                    setStatus("Muvaffaqiyatli yuborildi.");
                    setForm({
                        clubId: null,
                        name: "",
                        faculty: "",
                        course: "",
                        phone: "",
                        notes: ""
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    setStatus("Xato: yuborilmadi.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var staticUi = document.getElementById("static-ui");
        if (staticUi)
            staticUi.style.display = "none";
        return function () {
            if (staticUi)
                staticUi.style.display = "";
        };
    }, []);
    return (react_1["default"].createElement("div", { className: "wrap" },
        react_1["default"].createElement("video", { className: "bg-video", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", poster: "/image.png" },
            react_1["default"].createElement("source", { src: "/movie.MOV", type: "video/quicktime" })),
        react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("header", null,
                react_1["default"].createElement("h1", null, "TSUE Clubs \u2014 Registration"),
                react_1["default"].createElement("p", { className: "lead" }, "Assalomu alaykum! Bu Toshkent davlat iqtisodiyot universitetining klublarini ro'yxatdan o'tkazish uchun sayt. Marhamat klubni tanlang va ro'yxatdan o'ting.")),
            react_1["default"].createElement("section", { id: "react-ui", className: "main-card" },
                react_1["default"].createElement("div", { className: "left", role: "region", "aria-label": "Ro'yxat tafsilotlari" },
                    react_1["default"].createElement("label", { htmlFor: "club" }, "Klub"),
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("select", { id: "club", name: "club", value: (_a = form.clubId) !== null && _a !== void 0 ? _a : "", onChange: handleChange("clubId") },
                            react_1["default"].createElement("option", { value: "" }, "\u2014 Klub tanlang \u2014"),
                            sampleClubs_1["default"].map(function (c) { return (react_1["default"].createElement("option", { key: c.id, value: c.id }, c.name)); }))),
                    react_1["default"].createElement("label", { htmlFor: "name" }, "Ism Familiya"),
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("input", { id: "name", type: "text", placeholder: "Ism Familiya", value: form.name, onChange: handleChange("name") })),
                    react_1["default"].createElement("label", { htmlFor: "fak" }, "Fakultet"),
                    react_1["default"].createElement("div", { className: "field small" },
                        react_1["default"].createElement("input", { id: "fak", type: "text", placeholder: "Fakultet", value: form.faculty, onChange: handleChange("faculty") })),
                    react_1["default"].createElement("label", { htmlFor: "kurs" }, "Kurs"),
                    react_1["default"].createElement("div", { className: "field small" },
                        react_1["default"].createElement("input", { id: "kurs", type: "text", placeholder: "Kurs", value: form.course, onChange: handleChange("course") })),
                    react_1["default"].createElement("label", { htmlFor: "phone" }, "Telefon (+998...)"),
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("input", { id: "phone", type: "number", placeholder: "+99890xxxxxxx", value: form.phone, onChange: handleChange("phone") })),
                    react_1["default"].createElement("label", { htmlFor: "notes" }, "Qiziqishlar (ixtiyoriy)"),
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("input", { id: "notes", type: "text", placeholder: "Qiziqishlaringiz (ixtiyoriy)", value: form.notes, onChange: handleChange("notes") })),
                    react_1["default"].createElement("div", { style: { marginTop: 14 } },
                        react_1["default"].createElement("button", { className: "btn", type: "button", onClick: submit }, "Ro'yxatdan o'tish"),
                        status && (react_1["default"].createElement("div", { style: { marginTop: 8 }, className: "text-sm text-slate-700" }, status)))),
                react_1["default"].createElement("aside", { className: "right", "aria-hidden": "true" },
                    react_1["default"].createElement("img", { src: "/TDIU-logo.png", alt: "TDIU" }))))));
};
exports["default"] = App;
