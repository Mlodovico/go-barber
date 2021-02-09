"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var celebrate_1 = require("celebrate");
var upload_1 = __importDefault(require("@config/upload"));
var UsersControllers_1 = __importDefault(require("../controllers/UsersControllers"));
var UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middleware/ensureAuthenticated"));
var usersRouter = express_1.Router();
var upload = multer_1.default(upload_1.default);
var usersController = new UsersControllers_1.default();
var usersAvatarController = new UserAvatarController_1.default();
usersRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    },
    _a)), usersController.create);
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), usersAvatarController.update);
exports.default = usersRouter;
