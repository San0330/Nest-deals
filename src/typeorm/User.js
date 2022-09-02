"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: 'bigint'
        })
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        })
    ], User.prototype, "first_name");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        })
    ], User.prototype, "last_name");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            name: 'email'
        })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        })
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        })
    ], User.prototype, "date_of_birth");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
