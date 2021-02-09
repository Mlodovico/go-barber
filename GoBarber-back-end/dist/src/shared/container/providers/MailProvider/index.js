"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EtherealMailProvider_1 = __importDefault(require("./implementations/EtherealMailProvider"));
//import SESMailProvider from './implementations/SESMailProvider';
exports.default = {
    ethereal: EtherealMailProvider_1.default,
};
