"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const multer_1 = require("./config/multer");
const csv_usecase_1 = require("./usecases/csv-usecase");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/files", multer_1.upload.single('csvFile'), (req, res) => {
    try {
        return res.status(200).json({ message: "The file was uploaded successfully." });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ message: "An error occurred while uploading the file." });
    }
});
routes.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = (_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
        if (!query) {
            return res.status(400).json({ message: "Search query parameter 'q' is required." });
        }
        const searchResults = yield (0, csv_usecase_1.csvHandlerUseCase)(query);
        return res.status(200).json({ data: searchResults });
    }
    catch (error) {
        console.error("Error searching data:", error);
        return res.status(500).json({ message: "Can't find any data to match search." });
    }
}));
