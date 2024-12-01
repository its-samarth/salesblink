"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};
