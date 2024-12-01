"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailController_1 = require("../controllers/emailController");
const router = express_1.default.Router();
router.post('/schedule-email', (req, res, next) => {
    const { to, subject, body, when } = req.body;
    (0, emailController_1.scheduleEmail)(to, subject, body, when)
        .then(result => res.status(200).json(result))
        .catch(next);
}); // Endpoint for scheduling email
exports.default = router;
