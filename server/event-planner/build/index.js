"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_1 = __importDefault(require("./routes/event"));
const thread_1 = __importDefault(require("./routes/thread"));
const app = (0, express_1.default)();
app.get("/admin/health", (_, res) => {
    res.send(true);
});
app.use("/event", event_1.default);
app.use("/thread", thread_1.default);
console.log(`Server starting at port 8080`);
app.listen(8080);
