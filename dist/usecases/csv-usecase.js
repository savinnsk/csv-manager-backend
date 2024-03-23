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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCSVFile = exports.csvHandlerUseCase = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
function csvHandlerUseCase(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchResults = [];
        const csvFolder = "./uploads";
        const files = fs_1.default.readdirSync(csvFolder).filter(file => file.endsWith(".csv"));
        for (const file of files) {
            const filePath = `${csvFolder}/${file}`;
            const fileData = yield readCSVFile(filePath);
            fileData.forEach((row) => {
                Object.entries(row).forEach(([columnName, value]) => {
                    if (value.toString().toLowerCase().includes(query)) {
                        searchResults.push({ columnName, value, file: filePath, other: row });
                    }
                });
            });
        }
        return searchResults;
    });
}
exports.csvHandlerUseCase = csvHandlerUseCase;
function readCSVFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const results = [];
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                results.push(row);
            })
                .on("end", () => {
                resolve(results);
            })
                .on("error", (error) => {
                reject(error);
            });
        });
    });
}
exports.readCSVFile = readCSVFile;
