"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var class_transformer_1 = require("class-transformer");
var UserEntity = /** @class */ (function () {
    function UserEntity(partial) {
        Object.assign(this, partial);
    }
    Object.defineProperty(UserEntity.prototype, "full_name", {
        get: function () {
            return "".concat(this.first_name, " ").concat(this.last_name);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, class_transformer_1.Exclude)()
    ], UserEntity.prototype, "password");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], UserEntity.prototype, "full_name");
    return UserEntity;
}());
exports.UserEntity = UserEntity;
