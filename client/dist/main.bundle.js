webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_helpers/jwt.interceptor.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
__webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(auth) {
        this.auth = auth;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var token = this.auth.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "" + token
                }
            });
        }
        return next.handle(request)
            .catch(function (err) {
            return Rx_1.Observable.throw(err);
        });
    };
    JwtInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService])
    ], JwtInterceptor);
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;


/***/ }),

/***/ "../../../../../src/app/_services/auth-logged-in.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var AuthLoggedInGuard = /** @class */ (function () {
    function AuthLoggedInGuard(authenticateService, router) {
        this.authenticateService = authenticateService;
        this.router = router;
    }
    AuthLoggedInGuard.prototype.canActivate = function (next, state) {
        if (this.authenticateService.isLoggedIn()) {
            this.router.navigateByUrl('/home');
            return false;
        }
        return true;
    };
    AuthLoggedInGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService, router_1.Router])
    ], AuthLoggedInGuard);
    return AuthLoggedInGuard;
}());
exports.AuthLoggedInGuard = AuthLoggedInGuard;


/***/ }),

/***/ "../../../../../src/app/_services/authenticate.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var AuthenticateService = /** @class */ (function () {
    function AuthenticateService(_http) {
        this._http = _http;
    }
    AuthenticateService.prototype.isLoggedIn = function () {
        if (this.getToken()) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthenticateService.prototype.getUserInfo = function () {
        if (this.isLoggedIn()) {
            return this._http.get('/api/me');
        }
    };
    AuthenticateService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthenticateService.prototype.logout = function () {
        // I should also blacklist the token in the backend, but I figue this type of app won't need it as of now.
        localStorage.clear();
    };
    AuthenticateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthenticateService);
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;


/***/ }),

/***/ "../../../../../src/app/_services/friendship.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var FriendshipService = /** @class */ (function () {
    function FriendshipService(_http) {
        this._http = _http;
    }
    FriendshipService.prototype.create = function (like) {
        return this._http.post('/api/friendships/create', like).subscribe();
    };
    FriendshipService.prototype.getFriends = function () {
        return this._http.get('/api/friendships/');
    };
    FriendshipService.prototype.unFriend = function (friend) {
        return this._http.delete('/api/friendships/' + friend + '/delete');
    };
    FriendshipService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FriendshipService);
    return FriendshipService;
}());
exports.FriendshipService = FriendshipService;


/***/ }),

/***/ "../../../../../src/app/_services/guard-authentication.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var GuardAuthenticationService = /** @class */ (function () {
    function GuardAuthenticationService(authenticateService, router) {
        this.authenticateService = authenticateService;
        this.router = router;
    }
    GuardAuthenticationService.prototype.canActivate = function () {
        //Check if user is logged in
        if (!this.authenticateService.isLoggedIn()) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    };
    GuardAuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService, router_1.Router])
    ], GuardAuthenticationService);
    return GuardAuthenticationService;
}());
exports.GuardAuthenticationService = GuardAuthenticationService;


/***/ }),

/***/ "../../../../../src/app/_services/message.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var MessageService = /** @class */ (function () {
    function MessageService(_http) {
        this._http = _http;
    }
    MessageService.prototype.getMessages = function (reciever) {
        return this._http.get('/api/messages/' + reciever);
    };
    MessageService.prototype.sendMessage = function (message) {
        return this._http.post('/api/messages/create', message);
    };
    MessageService.prototype.readMessage = function (messageId) {
        return this._http.put('/api/messages/read', messageId).subscribe();
    };
    MessageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;


/***/ }),

/***/ "../../../../../src/app/_services/user.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.authenticate = function (user) {
        return this._http.post('/api/users/authenticate', user)
            .map(function (data) {
            var token = data['token'];
            localStorage.setItem('token', token);
            return data;
        });
    };
    UserService.prototype.create = function (user) {
        return this._http.post('/api/users/create', user)
            .map(function (data) {
            var token = data['token'];
            localStorage.setItem('token', token);
        });
    };
    UserService.prototype.passwordResetRequest = function (email) {
        return this._http.post('/api/passwordresetrequest', email);
    };
    UserService.prototype.userActivate = function (userActivation) {
        return this._http.put('/api/users/useractivation', userActivation).subscribe();
    };
    UserService.prototype.imageUpload = function (imageFile) {
        return this._http.put('/api/users/images/', imageFile);
    };
    UserService.prototype.imageDelete = function (imageFile) {
        return this._http.delete('/api/users/images/' + imageFile);
    };
    UserService.prototype.getUsers = function (term) {
        return this._http.get('/api/users/' + term + '/activity');
    };
    UserService.prototype.editUser = function (userInfo) {
        return this._http.put('/api/users/edit', userInfo);
    };
    UserService.prototype.getUser = function (id) {
        return this._http.get('/api/users/' + id);
    };
    UserService.prototype.getUserName = function (id) {
        return this._http.get('/api/users/' + id + '/name');
    };
    UserService.prototype.deleteUser = function (id) {
        return this._http.delete('/api/users/delete');
    };
    UserService.prototype.userLocation = function (coordinates) {
        return this._http.put('/api/users/setlocation', coordinates).subscribe();
    };
    UserService.prototype.resetPassword = function (data) {
        return this._http.post('/api/passwordreset', data);
    };
    UserService.prototype.getUserWithToken = function (token) {
        return this._http.get('/api/passwordReset/token/' + token);
    };
    UserService.prototype.hasNotification = function () {
        return this._http.get('/api/users/notification/status');
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;


/***/ }),

/***/ "../../../../../src/app/_shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"waves-effect\">\n  <p [routerLink]=\"['/home']\" class=\"brand-logo left\">Friend<span class=\"zoe\">Zone</span></p>  \n\n  <div class=\"icons\">\n    \n    <img class=\"icon\" [routerLink]=\"['/friends']\" src=\"../../assets/icons/message.svg\" alt=\"Message Icon\">\n    <span *ngIf=\"notificationCss\" class=\"notification\"></span>\n    <img class=\"icon\" [routerLink]=\"['/profile']\" src=\"../../assets/icons/profile.svg\" alt=\"Profile Icon\">\n    \n  </div>\n\n</nav> \n"

/***/ }),

/***/ "../../../../../src/app/_shared/header/header.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nav {\n  background-color: #404040;\n  height: 10%;\n  min-height: 73px; }\n  nav > p {\n    height: 35px;\n    width: 140px; }\n  .brand-logo {\n  color: white;\n  cursor: pointer;\n  font-family: 'Modak', cursive;\n  display: inline-block;\n  position: relative;\n  top: 15px;\n  left: 5px;\n  font-size: 25px;\n  outline: 0px; }\n  .brand-logo:hover {\n    color: #e0e0e0; }\n  .zoe {\n  color: #ffa622; }\n  .icons {\n  float: right;\n  text-align: center;\n  margin: 15px;\n  margin-right: 5px; }\n  .icon {\n  cursor: pointer;\n  height: 35px;\n  outline: 0px; }\n  .notification {\n  height: 8px;\n  width: 8px;\n  position: absolute;\n  background: #ffcc80;\n  border-radius: 4px;\n  right: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authenticateService, userService) {
        this.authenticateService = authenticateService;
        this.userService = userService;
        this.notificationCss = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.loggedIn = this.authenticateService.isLoggedIn();
        this.notification();
    };
    HeaderComponent.prototype.notification = function () {
        var _this = this;
        this.userService.hasNotification().subscribe(function (data) {
            _this.notificationCss = data["notification"];
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/_shared/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/_shared/header/header.component.sass")]
        }),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService, user_service_1.UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;


/***/ }),

/***/ "../../../../../src/app/_shared/landing-header/landing-header.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"waves-effect\">\n  <h1 [routerLink]=\"['/']\" class=\"brand-logo left\">Friend<span class=\"zone-span\">Zone</span></h1>  \n</nav> \n"

/***/ }),

/***/ "../../../../../src/app/_shared/landing-header/landing-header.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nav {\n  min-height: 73px;\n  height: 10%;\n  background-color: #404040;\n  color: #fff;\n  text-align: center; }\n\n.brand-logo {\n  color: white;\n  cursor: pointer;\n  font-family: 'Modak', cursive;\n  display: inline-block;\n  position: relative;\n  top: 15px;\n  left: 5px;\n  font-size: 25px; }\n\n.brand-logo:hover {\n    color: #e0e0e0; }\n\n.zone-span {\n  color: #ffcc80;\n  -webkit-animation-duration: 50s;\n          animation-duration: 50s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-name: title-color-change;\n          animation-name: title-color-change; }\n\n@-webkit-keyframes title-color-change {\n  0% {\n    color: #ffcc80; }\n  15% {\n    color: #ef6464; }\n  30% {\n    color: #f3ef00; }\n  55% {\n    color: #2df300; }\n  75% {\n    color: #994fd8; }\n  85% {\n    color: #fd4df5; }\n  95% {\n    color: #fb5454; }\n  100% {\n    color: #ffcc80; } }\n\n@keyframes title-color-change {\n  0% {\n    color: #ffcc80; }\n  15% {\n    color: #ef6464; }\n  30% {\n    color: #f3ef00; }\n  55% {\n    color: #2df300; }\n  75% {\n    color: #994fd8; }\n  85% {\n    color: #fd4df5; }\n  95% {\n    color: #fb5454; }\n  100% {\n    color: #ffcc80; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_shared/landing-header/landing-header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var LandingHeaderComponent = /** @class */ (function () {
    function LandingHeaderComponent() {
    }
    LandingHeaderComponent.prototype.ngOnInit = function () {
    };
    LandingHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-landing-header',
            template: __webpack_require__("../../../../../src/app/_shared/landing-header/landing-header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/_shared/landing-header/landing-header.component.sass")]
        }),
        __metadata("design:paramtypes", [])
    ], LandingHeaderComponent);
    return LandingHeaderComponent;
}());
exports.LandingHeaderComponent = LandingHeaderComponent;


/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var guard_authentication_service_1 = __webpack_require__("../../../../../src/app/_services/guard-authentication.service.ts");
var auth_logged_in_guard_1 = __webpack_require__("../../../../../src/app/_services/auth-logged-in.guard.ts");
var landing_component_1 = __webpack_require__("../../../../../src/app/landing/landing.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("../../../../../src/app/register/register.component.ts");
var users_component_1 = __webpack_require__("../../../../../src/app/users/users.component.ts");
var message_component_1 = __webpack_require__("../../../../../src/app/message/message.component.ts");
var profile_component_1 = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
var friends_component_1 = __webpack_require__("../../../../../src/app/friends/friends.component.ts");
var profile_preview_component_1 = __webpack_require__("../../../../../src/app/profile-preview/profile-preview.component.ts");
var password_reset_component_1 = __webpack_require__("../../../../../src/app/password-reset/password-reset.component.ts");
var password_reset_confirmation_component_1 = __webpack_require__("../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.ts");
var not_found_component_1 = __webpack_require__("../../../../../src/app/not-found/not-found.component.ts");
var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: landing_component_1.LandingComponent,
        canActivate: [auth_logged_in_guard_1.AuthLoggedInGuard],
    },
    {
        path: 'friends',
        pathMatch: 'full',
        component: friends_component_1.FriendsComponent,
        canActivate: [guard_authentication_service_1.GuardAuthenticationService],
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: home_component_1.HomeComponent,
        canActivate: [guard_authentication_service_1.GuardAuthenticationService],
    },
    {
        path: 'users/:term',
        pathMatch: 'full',
        component: users_component_1.UsersComponent,
        canActivate: [guard_authentication_service_1.GuardAuthenticationService],
    },
    {
        path: 'profile',
        pathMatch: 'full',
        component: profile_component_1.ProfileComponent,
        canActivate: [guard_authentication_service_1.GuardAuthenticationService],
    },
    {
        path: 'preview/:id',
        pathMatch: 'full',
        component: profile_preview_component_1.ProfilePreviewComponent,
        canActivate: [guard_authentication_service_1.GuardAuthenticationService],
    },
    {
        path: 'chat/:id/:term',
        pathMatch: 'full',
        component: message_component_1.MessageComponent,
        canActivate: [guard_authentication_service_1.GuardAuthenticationService],
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: login_component_1.LoginComponent,
        canActivate: [auth_logged_in_guard_1.AuthLoggedInGuard],
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: register_component_1.RegisterComponent,
        canActivate: [auth_logged_in_guard_1.AuthLoggedInGuard],
    },
    {
        path: 'password_reset',
        pathMatch: 'full',
        component: password_reset_component_1.PasswordResetComponent,
        canActivate: [auth_logged_in_guard_1.AuthLoggedInGuard],
    },
    {
        path: 'password_reset/token/:id',
        pathMatch: 'full',
        component: password_reset_confirmation_component_1.PasswordResetConfirmationComponent,
        canActivate: [auth_logged_in_guard_1.AuthLoggedInGuard],
    },
    {
        path: '404',
        pathMatch: 'full',
        component: not_found_component_1.NotFoundComponent,
    },
    { path: '**', redirectTo: '404' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes),
                common_1.CommonModule,
            ],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.sass")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var jwt_interceptor_1 = __webpack_require__("../../../../../src/app/_helpers/jwt.interceptor.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var app_routing_module_1 = __webpack_require__("../../../../../src/app/app-routing.module.ts");
var angular2_image_upload_1 = __webpack_require__("../../../../angular2-image-upload/index.js");
var landing_component_1 = __webpack_require__("../../../../../src/app/landing/landing.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("../../../../../src/app/register/register.component.ts");
var users_component_1 = __webpack_require__("../../../../../src/app/users/users.component.ts");
var message_component_1 = __webpack_require__("../../../../../src/app/message/message.component.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var guard_authentication_service_1 = __webpack_require__("../../../../../src/app/_services/guard-authentication.service.ts");
var auth_logged_in_guard_1 = __webpack_require__("../../../../../src/app/_services/auth-logged-in.guard.ts");
var friendship_service_1 = __webpack_require__("../../../../../src/app/_services/friendship.service.ts");
var message_service_1 = __webpack_require__("../../../../../src/app/_services/message.service.ts");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var profile_component_1 = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
var friends_component_1 = __webpack_require__("../../../../../src/app/friends/friends.component.ts");
var ngx_chips_1 = __webpack_require__("../../../../ngx-chips/esm5/ngx-chips.js");
var ngx_loading_1 = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
var angular2_swing_1 = __webpack_require__("../../../../angular2-swing/dist/index.js");
var profile_preview_component_1 = __webpack_require__("../../../../../src/app/profile-preview/profile-preview.component.ts");
var header_component_1 = __webpack_require__("../../../../../src/app/_shared/header/header.component.ts");
var landing_header_component_1 = __webpack_require__("../../../../../src/app/_shared/landing-header/landing-header.component.ts");
var password_reset_component_1 = __webpack_require__("../../../../../src/app/password-reset/password-reset.component.ts");
var password_reset_confirmation_component_1 = __webpack_require__("../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.ts");
var not_found_component_1 = __webpack_require__("../../../../../src/app/not-found/not-found.component.ts");
var ng_simple_slideshow_1 = __webpack_require__("../../../../ng-simple-slideshow/ng-simple-slideshow.es5.js");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                landing_component_1.LandingComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                users_component_1.UsersComponent,
                message_component_1.MessageComponent,
                profile_component_1.ProfileComponent,
                friends_component_1.FriendsComponent,
                profile_preview_component_1.ProfilePreviewComponent,
                header_component_1.HeaderComponent,
                landing_header_component_1.LandingHeaderComponent,
                password_reset_component_1.PasswordResetComponent,
                password_reset_confirmation_component_1.PasswordResetConfirmationComponent,
                not_found_component_1.NotFoundComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                router_1.RouterModule,
                ng_simple_slideshow_1.SlideshowModule,
                ngx_loading_1.NgxLoadingModule.forRoot({
                    animationType: ngx_loading_1.ngxLoadingAnimationTypes.doubleBounce,
                    primaryColour: '#ffcc80',
                    secondaryColour: '#5d4037',
                }),
                animations_1.BrowserAnimationsModule,
                ngx_chips_1.TagInputModule,
                angular2_swing_1.SwingModule,
                common_1.CommonModule,
                angular2_image_upload_1.ImageUploadModule.forRoot(),
            ],
            exports: [
                header_component_1.HeaderComponent
            ],
            providers: [
                user_service_1.UserService,
                message_service_1.MessageService,
                friendship_service_1.FriendshipService,
                guard_authentication_service_1.GuardAuthenticationService,
                authenticate_service_1.AuthenticateService,
                auth_logged_in_guard_1.AuthLoggedInGuard,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: jwt_interceptor_1.JwtInterceptor,
                    multi: true
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/friends/friends.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div class=\"container\">\n\n  <p class=\"head\">The FriendZone</p>\n\n  <div class=\"unmessaged-friends\">\n    <ul class=\"ul-container\" *ngFor=\"let friend of friendsWithOutMessages\">\n      <li class=\"unmessaged-friend\" [routerLink]=\"['/chat',friend.users[0]._id,friend.activity]\" > \n        <img class=\"image\" *ngIf=\"friend.users[0].image.length > 0\" [src]=\"friend.users[0].image[0]\" height=\"55px\" width=\"55px\">\n        <img class=\"image\" *ngIf=\"friend.users[0].image.length == 0\" src=\"http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg\" alt=\"User Image\" height=\"55px\" width=\"55px\">        \n      </li>\n    </ul>\n  </div>\n\n  <div class=\"messages-friends\">\n    <ul class=\"ul-container2\"  *ngFor=\"let friend of friendsWithMessages\">\n      <li class=\"messaged-friend\" [ngClass]=\"{'read': !friend.read}\">\n        <img class=\"image\" *ngIf=\"friend.users[0].image.length > 0\" [src]=\"friend.users[0].image[0]\" alt=\"User Image\" height=\"55px\" width=\"55px\">\n        <img class=\"image\" *ngIf=\"friend.users[0].image.length == 0\" src=\"http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg\" alt=\"User Image\" height=\"55px\" width=\"55px\">        \n        <p class=\"name\" [routerLink]=\"['/preview',friend.users[0]._id]\">{{friend.users[0].first_name}}</p>\n        <p [routerLink]=\"['/chat',friend.users[0]._id,friend.activity]\" class=\"message-preview\">{{friend.message}}</p>\n        <div class=\"unfriend\" (click)=\"unFriend(friend.users[0]._id)\">UnFriend</div>\n      </li>\n    </ul>\n  </div>\n  \n  <p *ngIf=\"friendsWithMessages < 1 && friendsWithOutMessages < 1\" class=\"helper\">\n    Once you friendZone someone you will see them here. Cheers.\n  </p>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/friends/friends.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  max-width: 750px;\n  margin: auto;\n  height: 87%; }\n  @media screen and (min-width: 750px) {\n    .container {\n      -webkit-box-shadow: 0px 7px 40px 1px #888888;\n              box-shadow: 0px 7px 40px 1px #888888;\n      -webkit-transition: 3s;\n      transition: 3s; } }\n  .container::-webkit-scrollbar {\n  display: none !important;\n  -ms-overflow-style: none !important;\n  overflow: -moz-scrollbars-none !important; }\n  .photo {\n  display: inline-block;\n  height: 100%;\n  cursor: pointer; }\n  .head {\n  background: #ffcc80;\n  background: -webkit-gradient(linear, left top, right top, from(#ffcc80), to(#fff3e0));\n  background: linear-gradient(90deg, #ffcc80, #fff3e0);\n  color: #424242;\n  padding: 5px;\n  font-family: 'Modak', cursive;\n  letter-spacing: 5px;\n  font-size: 25px;\n  text-align: center; }\n  .friend {\n  font: 200 20px/1.5 Helvetica, Verdana, sans-serif;\n  -webkit-transition: 500ms;\n  transition: 500ms;\n  padding: 5px;\n  background: #fff;\n  height: 60px;\n  margin: 5px;\n  list-style: none; }\n  @media screen and (min-width: 750px) {\n    .friend:hover {\n      font-size: 22px;\n      -webkit-box-shadow: 0px 7px 50px 1px #888888;\n              box-shadow: 0px 7px 50px 1px #888888;\n      width: 700px;\n      margin: auto;\n      border-radius: 10px;\n      position: relative;\n      -webkit-transition: 2000ms;\n      transition: 2000ms; } }\n  .username {\n  color: #000000;\n  cursor: pointer;\n  margin: 0px 0px 0px 10px;\n  display: inline-block;\n  position: relative;\n  bottom: 22px; }\n  .name {\n  font-family: 'Bree Serif', serif;\n  text-transform: uppercase;\n  display: inline-block;\n  width: 150px;\n  position: relative;\n  cursor: pointer;\n  left: 5px;\n  top: 3px;\n  outline: none; }\n  .preview {\n  font-family: 'Source Sans Pro', sans-serif;\n  overflow-y: hidden;\n  width: 280px;\n  height: 30px; }\n  @media screen and (min-width: 750px) {\n    .preview {\n      width: 590px; } }\n  .image {\n  border-radius: 27px;\n  float: left;\n  cursor: pointer; }\n  .unfriend {\n  float: right;\n  margin-top: 15px;\n  cursor: pointer;\n  height: 20px;\n  position: relative;\n  bottom: 57px;\n  padding: 16px;\n  font-family: 'Bree Serif', serif;\n  font-weight: bold; }\n  .unmessaged-friends {\n  height: 60px;\n  overflow-y: scroll;\n  border-bottom: 1px solid black; }\n  .unmessaged-friends::-webkit-scrollbar {\n  display: none !important;\n  -ms-overflow-style: none !important;\n  overflow: -moz-scrollbars-none !important; }\n  .unmessaged-friend {\n  background-color: cadetblue;\n  height: 55px;\n  width: 55px;\n  margin: 2px;\n  border-radius: 27px;\n  list-style: none;\n  outline: none; }\n  .ul-container {\n  display: inline-block; }\n  .messaged-friend {\n  padding: 5px;\n  list-style: none;\n  height: 55px; }\n  .ul-container2 {\n  height: 65px;\n  margin: 5px; }\n  .message-preview {\n  width: 45%;\n  height: 25px;\n  position: relative;\n  cursor: pointer;\n  left: 5px;\n  font-size: 20px;\n  overflow: hidden;\n  top: 5px;\n  outline: none; }\n  .read {\n  background: lightgrey !important; }\n  .helper {\n  font-family: 'Modak', cursive;\n  width: 60%;\n  padding: 25px;\n  margin: auto;\n  font-size: 25px;\n  text-transform: uppercase;\n  color: darkgray;\n  text-decoration: underline; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/friends/friends.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var friendship_service_1 = __webpack_require__("../../../../../src/app/_services/friendship.service.ts");
var FriendsComponent = /** @class */ (function () {
    function FriendsComponent(friendshipService) {
        this.friendshipService = friendshipService;
        this.friendList = [];
    }
    FriendsComponent.prototype.ngOnInit = function () {
        this.getFriends();
    };
    FriendsComponent.prototype.getFriends = function () {
        var _this = this;
        this.friendshipService.getFriends().subscribe(function (data) {
            _this.friendsWithMessages = data['friendsWithMessages'];
            _this.friendsWithOutMessages = data['friendsWithOutMessages'];
        });
    };
    FriendsComponent.prototype.unFriend = function (friend) {
        var _this = this;
        this.friendshipService.unFriend(friend).subscribe(function (data) {
            _this.getFriends();
        });
    };
    FriendsComponent = __decorate([
        core_1.Component({
            selector: 'app-friends',
            template: __webpack_require__("../../../../../src/app/friends/friends.component.html"),
            styles: [__webpack_require__("../../../../../src/app/friends/friends.component.sass")]
        }),
        __metadata("design:paramtypes", [friendship_service_1.FriendshipService])
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;


/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div class=\"categories\"> \n      \n  <div [routerLink]=\"['/users/food']\" class=\"category\">\n    <img src=\"../../assets/tacos.jpg\" alt=\"Food\">\n    <p class=\"category-title\">FOOD</p> \n  </div>\n\n  <div [routerLink]=\"['/users/exercise']\" class=\"category\">\n    <img src=\"../../assets/running.jpg\" alt=\"Running\"> \n    <p class=\"category-title\">EXERCISE</p> \n  </div>\n\n  <div [routerLink]=\"['/users/cinema']\" class=\"category\">\n    <img src=\"../../assets/movies.jpg\" alt=\"Cinema\"> \n    <p class=\"category-title\">CINEMA</p> \n  </div>\n\n  <div [routerLink]=\"['/users/bar']\" class=\"category\">\n    <img src=\"../../assets/bar.jpg\" alt=\"Bar\">\n    <p class=\"category-title\">BAR</p> \n  </div>\n\n  <div [routerLink]=\"['/users/music']\" class=\"category\">\n    <img src=\"../../assets/music.jpeg\" alt=\"Music\"> \n    <p class=\"category-title\">MUSIC</p> \n  </div>\n\n  <div [routerLink]=\"['/users/dancing']\" class=\"category\"> \n    <img src=\"../../assets/dancing.jpg\" alt=\"Dance\">\n    <p class=\"category-title\">DANCING</p> \n  </div>\n\n  <div [routerLink]=\"['/users/whatever']\" class=\"category\"> \n    <img src=\"../../assets/whatever.jpg\" alt=\"Dance\">\n    <p class=\"category-title\">Whatever</p> \n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".categories {\n  border-radius: 15px;\n  width: 84%;\n  max-width: 336px;\n  margin: 5px auto;\n  background: #e0e0e0;\n  height: 85%;\n  padding: 10px;\n  overflow: scroll;\n  -webkit-box-shadow: 0px 7px 40px 1px #888888;\n  box-shadow: 0px 7px 40px 1px #888888;\n  -ms-overflow-style: none !important;\n  overflow: -moz-scrollbars-none !important; }\n\n.categories::-webkit-scrollbar {\n  display: none !important;\n  -ms-overflow-style: none !important;\n  overflow: -moz-scrollbars-none !important; }\n\nimg {\n  height: 170px;\n  width: 100%;\n  position: absolute;\n  cursor: pointer; }\n\n.category {\n  height: 170px;\n  margin-top: 10px;\n  margin: 15px auto;\n  position: relative;\n  outline: none; }\n\n.category-title {\n  position: relative;\n  top: 60px;\n  border: 5px solid #e0e0e0;\n  text-align: center;\n  font-size: 35px;\n  font-family: 'Modak', cursive;\n  color: #fff;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var timers_1 = __webpack_require__("../../../../timers-browserify/main.js");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_userService, _authenticateService, route) {
        this._userService = _userService;
        this._authenticateService = _authenticateService;
        this.route = route;
        this.coordinates = {};
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.userInfo();
        this.getLocation();
    };
    HomeComponent.prototype.userInfo = function () {
        this._authenticateService.isLoggedIn();
    };
    HomeComponent.prototype.getLocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                timers_1.setTimeout(function () {
                    _this.coordinates.latitude = position.coords.latitude;
                    _this.coordinates.longitude = position.coords.longitude;
                    _this._userService.userLocation(_this.coordinates);
                }, 0);
            });
        }
        else {
            console.log("GeoLocation is not supported on this browser");
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, authenticate_service_1.AuthenticateService, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "../../../../../src/app/landing/landing.component.html":
/***/ (function(module, exports) {

module.exports = "<app-landing-header></app-landing-header>\n\n<div class=\"landing-page\">\n\n  <p class=\"slide slide-1\">Meet intersting people around your area! Can't promise they're hot or single though.</p>\n\n  <p class=\"slide slide-2\">Log in or Sign up and start swiping to meet new friends</p>\n\n  <p class=\"slide slide-3\">You ever wanted to go out, but had nobody to go with? Welp ..</p>\n\n  <div class=\"options\">\n    <button [routerLink]=\"['/register']\" class=\"foward\">Join</button>\n    <button [routerLink]=\"['/login']\" class=\"foward\">Login</button>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".slide {\n  position: absolute;\n  color: #fff;\n  font-size: 2.5em;\n  width: 300px;\n  -webkit-animation-duration: 15s;\n          animation-duration: 15s;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-family: 'Luckiest Guy', cursive;\n  top: 200px;\n  pointer-events: none;\n  margin: auto;\n  left: 0px;\n  right: 0px; }\n\n.landing-page {\n  height: 90%;\n  min-height: 500px;\n  background-color: tomato;\n  text-align: center;\n  -webkit-animation-name: color-change;\n  -webkit-animation-duration: 50s;\n  -webkit-animation-timing-function: ease-in-out;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-play-state: running; }\n\n@keyframes color-change {\n  0% {\n    background-color: #d65b5beb; }\n  15.0% {\n    background-color: #ef5350; }\n  30.0% {\n    background-color: #c62828; }\n  55.0% {\n    background-color: #ff8a80; }\n  75.0% {\n    background-color: #ff9e80; }\n  85.0% {\n    background-color: #ff5722; }\n  100.0% {\n    background-color: #e65100; } }\n\n@-webkit-keyframes color-change {\n  0% {\n    background-color: #d65b5beb; }\n  15.0% {\n    background-color: #ef5350; }\n  30.0% {\n    background-color: #c62828; }\n  55.0% {\n    background-color: #ff8a80; }\n  75.0% {\n    background-color: #ff9e80; }\n  85.0% {\n    background-color: #ff5722; }\n  100.0% {\n    background-color: #e65100; } }\n\n.slide-1 {\n  -webkit-animation-name: slide1;\n          animation-name: slide1; }\n\n.slide-2 {\n  -webkit-animation-name: slide2;\n          animation-name: slide2; }\n\n.slide-3 {\n  -webkit-animation-name: slide3;\n          animation-name: slide3; }\n\n@-webkit-keyframes slide1 {\n  0%, 13% {\n    left: -100%;\n    opacity: 0; }\n  13%, 18% {\n    left: 0%;\n    opacity: 1; }\n  61.33%, 100% {\n    left: -50%;\n    opacity: 0; } }\n\n@keyframes slide1 {\n  0%, 13% {\n    left: -100%;\n    opacity: 0; }\n  13%, 18% {\n    left: 0%;\n    opacity: 1; }\n  61.33%, 100% {\n    left: -50%;\n    opacity: 0; } }\n\n@-webkit-keyframes slide2 {\n  0%, 33.33% {\n    left: -100%;\n    opacity: 0; }\n  41.63%, 60% {\n    left: 0%;\n    opacity: 1; }\n  66.66%, 100% {\n    left: -50%;\n    opacity: 0; } }\n\n@keyframes slide2 {\n  0%, 33.33% {\n    left: -100%;\n    opacity: 0; }\n  41.63%, 60% {\n    left: 0%;\n    opacity: 1; }\n  66.66%, 100% {\n    left: -50%;\n    opacity: 0; } }\n\n@-webkit-keyframes slide3 {\n  0%, 66.66% {\n    left: -100%;\n    opacity: 0; }\n  74.96%, 91.62% {\n    left: 0%;\n    opacity: 1; }\n  100% {\n    left: -50%;\n    opacity: 0; } }\n\n@keyframes slide3 {\n  0%, 66.66% {\n    left: -100%;\n    opacity: 0; }\n  74.96%, 91.62% {\n    left: 0%;\n    opacity: 1; }\n  100% {\n    left: -50%;\n    opacity: 0; } }\n\n.foward {\n  background-color: #404040;\n  color: white;\n  border: none;\n  width: 100%;\n  cursor: pointer;\n  height: 40px;\n  font-size: 13px; }\n\n.foward:hover {\n    background-color: #fff;\n    color: #404040; }\n\n.options {\n  background-color: #ffffff;\n  position: absolute;\n  width: 100%;\n  bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var LandingComponent = /** @class */ (function () {
    function LandingComponent(auth) {
        this.auth = auth;
    }
    LandingComponent.prototype.ngOnInit = function () {
        this.auth.logout();
    };
    LandingComponent = __decorate([
        core_1.Component({
            selector: 'app-landing',
            template: __webpack_require__("../../../../../src/app/landing/landing.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/landing.component.sass")]
        }),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService])
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;


/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<app-landing-header></app-landing-header>\n<div class=\"login\">\n\n  <form (submit)=\"authenticate()\">\n    <input class=\"form-group form-input\" type=\"email\" placeholder=\"Email\" (input)=\"validate()\" name=\"email\" [(ngModel)]=\"user.email\">\n    <input class=\"form-group form-input\" type=\"password\" placeholder=\"Password\" (input)=\"validate()\" name=\"password\" [(ngModel)]=\"user.password\">\n    <input class=\"form-group form-button\" [ngClass]=\"{'form-active': formActive }\" type=\"submit\" value=\"Login\">\n    <button [routerLink]=\"['/register']\"  class=\"form-group button-link\">Register</button>\n    <p class=\"error-message\" *ngIf=\"message\">{{message}}</p>\n    <p class=\"forgot-password\" [routerLink]=\"['/password_reset']\" >Forgot Password?</p>\n  </form>\n  <ngx-loading [show]=\"loading\"></ngx-loading>\n  \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login {\n  height: 25%;\n  text-align: center;\n  margin: auto;\n  margin-top: 160px;\n  width: 340px; }\n  @media screen and (min-width: 600px) {\n    .login {\n      width: 550px; } }\n  .form-group {\n  width: 90%;\n  margin: 5px 0px 0px 0px;\n  height: 40px;\n  border: 0px;\n  outline: none; }\n  .button-link {\n  background-color: #eeeeee;\n  text-transform: uppercase;\n  -webkit-transition-property: background-color color border-width;\n  transition-property: background-color color border-width;\n  -webkit-transition-duration: 1s;\n          transition-duration: 1s;\n  color: black;\n  cursor: pointer; }\n  .button-link:hover {\n    background-color: #404040;\n    color: white;\n    border-width: 1px; }\n  .form-button {\n  background-color: #eeeeee;\n  text-transform: uppercase;\n  -webkit-transition-property: background-color color border-width;\n  transition-property: background-color color border-width;\n  -webkit-transition-duration: 1s;\n          transition-duration: 1s;\n  -webkit-appearance: none;\n  -webkit-border-radius: 0;\n  color: #fff;\n  cursor: not-allowed;\n  pointer-events: none; }\n  .form-button:hover {\n    background-color: #eeeeee;\n    color: black;\n    border-width: 1px; }\n  .form-active {\n  pointer-events: auto;\n  background-color: #404040;\n  color: #fff;\n  cursor: pointer; }\n  .form-input {\n  padding-left: 10px; }\n  .error-message {\n  color: red;\n  width: 200px;\n  margin: 4px auto;\n  padding: 5px; }\n  .forgot-password {\n  cursor: pointer;\n  display: inline-block;\n  margin: 5px auto;\n  outline: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _router, auth) {
        this._userService = _userService;
        this._router = _router;
        this.auth = auth;
        this.user = {};
        this.message = "";
        this.formActive = false;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.auth.logout();
    };
    LoginComponent.prototype.validate = function () {
        if (this.user.email && this.user.password) {
            this.formActive = true;
        }
        else {
            this.formActive = false;
        }
    };
    LoginComponent.prototype.authenticate = function () {
        var _this = this;
        this.loading = true;
        this._userService.authenticate(this.user)
            .subscribe(function (data) {
            _this.loading = true;
            if (data['success'] === false) {
                _this._router.navigateByUrl('/login');
            }
            else {
                _this.loading = true;
                _this._router.navigateByUrl('home');
            }
        }, function (error) {
            _this.loading = false;
            _this.message = error.error.message;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, authenticate_service_1.AuthenticateService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/message/message.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div *ngIf=\"chat\" #scrollMe [scrollTop]=\"scrollMe.scrollHeight\" class=\"container\">\n    <p class=\"activity\" [routerLink]=\"['/users',activity]\">{{activity}}</p>  \n    <ul  class=\"bubble-container\" *ngFor=\"let message of chat\">\n\n        <li class=\"speech-bubble right-bubble\" *ngIf=\"user == message.sender._id\">\n            <p class=\"name\">You</p>\n            <p class=\"message\">{{message.message}}</p>\n            <span class=\"time-right\">{{message.createdAt | date: format : timezone}}</span>\n        </li>\n\n        <li class=\"speech-bubble left-bubble\" *ngIf=\"user != message.sender._id\">\n            <p class=\"name\" [routerLink]=\"['/preview',message.sender._id]\">{{message.sender.first_name}}</p>                    \n            <p class=\"message\">{{message.message}}</p>\n            <span class=\"time-left\">{{message.createdAt | date: format : timezone}}</span>\n        </li>\n\n    </ul>   \n</div>\n\n<div class=\"pending\" *ngIf=\"!chat\">\n    <div class=\"friend-options\">\n        <p class=\"first-name\" [routerLink]=\"['/preview',friendId]\">{{firstName}}</p>\n        <p (click)=\"unFriend()\" class=\"unfriend\">UnFriend</p>\n    </div>\n</div>\n\n<form class=\"message-form\" (submit)=\"sendMessage()\">\n    <textarea class=\"message-input\" placeholder=\"Say something\" [(ngModel)]=\"message.message\" name=\"message\" ></textarea>\n    <input type=\"submit\" class=\"message-button\" value=\"Send\">\n</form>"

/***/ }),

/***/ "../../../../../src/app/message/message.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".bubble-container {\n  display: inline-block;\n  width: 95%;\n  padding: 10px;\n  text-align: left; }\n\n.container::-webkit-scrollbar {\n  width: 0px; }\n\n.message-input::-webkit-scrollbar {\n  width: 0px; }\n\n.speech-bubble {\n  position: relative;\n  list-style: none;\n  text-align: left;\n  padding: 5px;\n  display: inline-block;\n  max-width: 220px;\n  cursor: default;\n  overflow: hidden;\n  font-weight: inherit;\n  font-size: 14px;\n  background: #404040; }\n\n.right-bubble {\n  background: #404040;\n  float: right;\n  color: #fff;\n  padding: 5px;\n  border-radius: 15px 15px 0px 15px; }\n\n.message {\n  position: relative;\n  bottom: 5px; }\n\n.left-bubble {\n  background-color: #ffcc80;\n  left: 5px;\n  padding: 5px;\n  border-radius: 15px 15px 15px 0px; }\n\n.name {\n  width: auto;\n  text-transform: uppercase;\n  position: relative;\n  text-align: left;\n  display: inline-block;\n  max-width: 110px;\n  overflow-y: hidden;\n  cursor: pointer;\n  outline: none; }\n\n.time-right {\n  position: absolute;\n  right: 255px;\n  bottom: 7px;\n  color: #BDBDCF;\n  font-size: 10px;\n  width: 40px;\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n@media screen and (max-width: 500px) {\n    .time-right {\n      right: 250px; } }\n\n.time-left {\n  position: absolute;\n  left: 275px;\n  bottom: 10px;\n  color: #BDBDCF;\n  font-size: 10px;\n  width: 40px; }\n\n@media screen and (max-width: 500px) {\n    .time-left {\n      left: 250px; } }\n\n.pending {\n  background-color: tomato;\n  height: 80%;\n  -webkit-animation-duration: 60s;\n          animation-duration: 60s;\n  text-align: center;\n  -webkit-animation-name: color-change;\n  -webkit-animation-duration: 50s;\n  -webkit-animation-timing-function: ease-in-out;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-play-state: running; }\n\n@keyframes color-change {\n  0% {\n    background-color: #d65b5beb; }\n  15.0% {\n    background-color: #d6d35beb; }\n  30.0% {\n    background-color: #6dd65beb; }\n  55.0% {\n    background-color: #5bb9d6eb; }\n  75.0% {\n    background-color: #755bd6eb; }\n  85.0% {\n    background-color: #d65bcbeb; }\n  100.0% {\n    background-color: #d65ba4eb; } }\n\n@-webkit-keyframes color-change {\n  0.0% {\n    background-color: #d65b5beb; }\n  15.0% {\n    background-color: #d6d35beb; }\n  30.0% {\n    background-color: #6dd65beb; }\n  55.0% {\n    background-color: #5bb9d6eb; }\n  75.0% {\n    background-color: #755bd6eb; }\n  85.0% {\n    background-color: #d65bcbeb; }\n  100.0% {\n    background-color: #d65ba4eb; } }\n\n.friend-options {\n  position: relative;\n  top: 150px;\n  margin: auto;\n  width: 200px;\n  height: 80px;\n  -webkit-box-shadow: 0px 7px 40px 1px #888888;\n          box-shadow: 0px 7px 40px 1px #888888;\n  background-color: #ffcc80;\n  border-radius: 40px;\n  text-align: center;\n  -webkit-transition: 1s;\n  transition: 1s; }\n\n@media screen and (max-height: 450px) {\n    .friend-options {\n      top: 20px; } }\n\n.friend-options::before {\n  content: \"Say Something to\";\n  position: relative;\n  top: 10px;\n  font-family: 'Bree Serif', serif; }\n\n.unfriend {\n  cursor: pointer;\n  background-color: #404040;\n  border-radius: 10px;\n  display: inline;\n  color: #fff;\n  padding: 4px;\n  position: relative;\n  top: 0px;\n  font-family: 'Bree Serif', serif;\n  font-weight: bold; }\n\n.first-name {\n  text-transform: uppercase;\n  font-family: 'Bree Serif', serif;\n  cursor: pointer;\n  font-weight: bold;\n  margin: 12px;\n  min-height: 20px;\n  outline: none; }\n\n.user-activity {\n  text-align: center; }\n\n.activity {\n  text-transform: uppercase;\n  font-size: 23px;\n  background-color: #ffcc80;\n  display: inline-block;\n  padding: 5px;\n  margin: 5px auto;\n  border-radius: 15px;\n  font-family: 'Bree Serif', serif;\n  cursor: pointer;\n  outline: none; }\n\n.container {\n  height: 81%;\n  margin: auto;\n  -webkit-box-shadow: 0px 0px 40px 0px #888888;\n          box-shadow: 0px 0px 40px 0px #888888;\n  background: #e0e0e0;\n  text-align: center;\n  -webkit-transition-duration: 2s;\n          transition-duration: 2s;\n  font-family: 'Bree Serif', serif;\n  overflow: auto; }\n\n@media screen and (min-width: 750px) {\n    .container {\n      -webkit-transition: 1s;\n      transition: 1s;\n      -webkit-transition-timing-function: linear;\n              transition-timing-function: linear;\n      width: 600px;\n      -webkit-box-shadow: 0px 7px 40px 1px #888888;\n              box-shadow: 0px 7px 40px 1px #888888;\n      border-radius: 25px; } }\n\n.message-form {\n  height: 9%;\n  max-width: 515px;\n  margin: auto; }\n\n.message-input {\n  margin: 5px 5px;\n  height: 36px;\n  border: 0px;\n  resize: none;\n  width: 70%;\n  background: none;\n  font-family: 'Bree Serif', serif;\n  font-size: 15px;\n  outline: none;\n  float: left;\n  padding: 8px; }\n\n.message-button {\n  border: none;\n  border-radius: 7px;\n  cursor: pointer;\n  background: #ffcc80;\n  font-size: 15px;\n  padding: 15px;\n  float: left;\n  width: 20%;\n  max-width: 110px;\n  font-family: 'Bree Serif', serif;\n  position: relative;\n  top: 6px;\n  -webkit-appearance: none;\n  -webkit-border-radius: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/message/message.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var message_service_1 = __webpack_require__("../../../../../src/app/_services/message.service.ts");
var friendship_service_1 = __webpack_require__("../../../../../src/app/_services/friendship.service.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var router_2 = __webpack_require__("../../../router/esm5/router.js");
var MessageComponent = /** @class */ (function () {
    function MessageComponent(messageService, userService, _router, _params, friendshipService) {
        this.messageService = messageService;
        this.userService = userService;
        this._router = _router;
        this._params = _params;
        this.friendshipService = friendshipService;
        this.friend = this._params.snapshot.params['id'];
        this.activity = this._params.snapshot.params['term'];
        this.usersId = [this.friend, this.user];
        this.message = {};
        this.chat = [];
        this.messageId = {};
    }
    MessageComponent.prototype.ngOnInit = function () {
        this.getMessages();
    };
    MessageComponent.prototype.getMessages = function () {
        var _this = this;
        this.messageService.getMessages(this.friend).subscribe(function (data) {
            if (data['chat']) {
                _this.user = data['user'];
                _this.reciever = data['chat'][0].users[0].first_name;
                _this.sender = data['chat'][0].users[1].first_name;
                _this.chat = data['chat'];
                if (_this.user != _this.chat[_this.chat.length - 1].sender._id) {
                    _this.readMessage();
                }
            }
            else {
                _this.chat = undefined;
                _this.firstName = data['user'].first_name;
                _this.friendId = data['user']._id;
            }
        });
    };
    MessageComponent.prototype.sendMessage = function () {
        var _this = this;
        this.message.reciever = this.friend;
        this.messageService.sendMessage(this.message)
            .subscribe(function (data) {
            _this.getMessages();
            _this.message.message = '';
        });
    };
    MessageComponent.prototype.readMessage = function () {
        if (!this.chat[this.chat.length - 1].read) {
            this.messageId._id = this.chat[this.chat.length - 1]._id;
            this.messageService.readMessage(this.messageId);
        }
    };
    MessageComponent.prototype.unFriend = function () {
        var _this = this;
        this.friendshipService.unFriend(this.friend).subscribe(function (data) {
            _this._router.navigateByUrl('/friends');
        });
    };
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'app-message',
            template: __webpack_require__("../../../../../src/app/message/message.component.html"),
            styles: [__webpack_require__("../../../../../src/app/message/message.component.sass")]
        }),
        __metadata("design:paramtypes", [message_service_1.MessageService, user_service_1.UserService, router_2.Router, router_1.ActivatedRoute, friendship_service_1.FriendshipService])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;


/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<app-landing-header></app-landing-header>\n\n<div class=\"conatiner\">\n  <h1 class=\"title\">404</h1>\n  <p class=\"message\">Oops... Page Not Found.</p>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".title {\n  font-family: 'Baloo Bhaijaan', cursive;\n  font-size: 100px; }\n\n.message {\n  font-size: 60px;\n  font-family: 'Baloo Bhaijaan', cursive; }\n\n.conatiner {\n  text-align: center;\n  background: tomato;\n  height: 69.7%;\n  padding: 75px;\n  -webkit-animation-name: color-change-404;\n  -webkit-animation-duration: 50s;\n  -webkit-animation-timing-function: ease-in-out;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-play-state: running; }\n\n@keyframes color-change-404 {\n  0% {\n    background-color: #d65b5beb; }\n  15.0% {\n    background-color: #ef5350; }\n  30.0% {\n    background-color: #c62828; }\n  55.0% {\n    background-color: #ff8a80; }\n  75.0% {\n    background-color: #ff9e80; }\n  85.0% {\n    background-color: #ff5722; }\n  100.0% {\n    background-color: #e65100; } }\n\n@-webkit-keyframes color-change-404 {\n  0% {\n    background-color: #d65b5beb; }\n  15.0% {\n    background-color: #ef5350; }\n  30.0% {\n    background-color: #c62828; }\n  55.0% {\n    background-color: #ff8a80; }\n  75.0% {\n    background-color: #ff9e80; }\n  85.0% {\n    background-color: #ff5722; }\n  100.0% {\n    background-color: #e65100; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        core_1.Component({
            selector: 'app-not-found',
            template: __webpack_require__("../../../../../src/app/not-found/not-found.component.html"),
            styles: [__webpack_require__("../../../../../src/app/not-found/not-found.component.sass")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());
exports.NotFoundComponent = NotFoundComponent;


/***/ }),

/***/ "../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.html":
/***/ (function(module, exports) {

module.exports = "<app-landing-header></app-landing-header>\n\n<div class=\"password-reset-container\" *ngIf=\"!success\">\n  <p *ngIf=\"user.first_name\" class=\"name\">{{user.first_name}}</p>\n  <img *ngIf=\"user.image.length > 0\" class=\"image\" [src]=\"user.image[0]\" alt=\"user image\" height=\"70px\" width=\"70px\">\n  <form (submit)=\"resetPassword()\">\n    <input type=\"password\" class=\"input\" (input)=\"passwordMatch()\" [(ngModel)]=\"passwords.password\" name=\"password\" placeholder=\"Password\">\n    <input type=\"password\" class=\"input\" (input)=\"passwordMatch()\" [(ngModel)]=\"passwords.confirm_password\" name=\"confirm_password\" placeholder=\"Confirm Password\">\n    <input type=\"submit\" class=\"submit\" [ngClass]=\"{'confirmed': match }\" value=\"Reset Password\">\n  </form>\n  <p *ngIf=\"message\">{{message}}</p>\n</div>\n<div *ngIf=\"success\" class=\"password-reset\">\n  <p>Your password has been reset! </p>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".password-reset-container {\n  width: 300px;\n  margin: 150px auto;\n  text-align: center;\n  padding: 10px;\n  height: 185px; }\n\n.input {\n  border: 1px;\n  height: 35px;\n  margin: 1px;\n  padding: 5px;\n  width: 92%;\n  border-bottom: 1px solid; }\n\n.submit {\n  border: 0px;\n  width: 75%;\n  height: 30px;\n  margin: 20px;\n  cursor: not-allowed;\n  pointer-events: none; }\n\n.confirmed {\n  -webkit-transition: 400ms;\n  transition: 400ms;\n  background: black;\n  cursor: pointer;\n  pointer-events: auto;\n  color: #fff; }\n\n.password-reset {\n  margin: auto;\n  text-align: center;\n  width: 225px;\n  font-size: 33px;\n  margin-top: 175px; }\n\n.name {\n  font-size: 30px;\n  text-transform: uppercase;\n  font-family: 'Song Myung', serifc;\n  cursor: default; }\n\n.image {\n  border-radius: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var router_2 = __webpack_require__("../../../router/esm5/router.js");
var PasswordResetConfirmationComponent = /** @class */ (function () {
    function PasswordResetConfirmationComponent(userService, params, route) {
        this.userService = userService;
        this.params = params;
        this.route = route;
        this.token = this.params.snapshot.params['id'];
        this.match = false;
        this.passwords = {};
        this.user = {
            first_name: '',
            image: [],
        };
    }
    PasswordResetConfirmationComponent.prototype.ngOnInit = function () {
        this.getUserWithToken();
    };
    PasswordResetConfirmationComponent.prototype.getUserWithToken = function () {
        var _this = this;
        this.userService.getUserWithToken(this.token).subscribe(function (data) {
            _this.user = data["user"];
        });
    };
    PasswordResetConfirmationComponent.prototype.passwordMatch = function () {
        if (this.passwords.password === this.passwords.confirm_password) {
            if (this.passwords.password.length > 5 && this.passwords.password.length > 5) {
                this.match = true;
                this.message = "";
            }
            else {
                this.message = "Password is too short";
            }
        }
        else {
            this.message = "Password do not match";
            this.match = false;
        }
    };
    PasswordResetConfirmationComponent.prototype.resetPassword = function () {
        var _this = this;
        this.passwords._id = this.user._id;
        this.userService.resetPassword(this.passwords).subscribe(function (data) {
            _this.success = true;
            setTimeout(function () {
                _this.route.navigateByUrl('/login');
            }, 3000);
        });
    };
    PasswordResetConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'app-password-reset-confirmation',
            template: __webpack_require__("../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.html"),
            styles: [__webpack_require__("../../../../../src/app/password-reset-confirmation/password-reset-confirmation.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute, router_2.Router])
    ], PasswordResetConfirmationComponent);
    return PasswordResetConfirmationComponent;
}());
exports.PasswordResetConfirmationComponent = PasswordResetConfirmationComponent;


/***/ }),

/***/ "../../../../../src/app/password-reset/password-reset.component.html":
/***/ (function(module, exports) {

module.exports = "<app-landing-header></app-landing-header>\n\n<div *ngIf=\"!status\" class=\"password-reset-container\">\n  <form (submit)=\"passwordResetRequest()\">\n    <input class=\"email\" type=\"email\" name=\"email\" [(ngModel)]=\"user.email\" placeholder=\"Email\">\n    <input class=\"button\" type=\"submit\" value=\"Enter\">\n  </form>\n  <p class=\"title\">Password Reset</p>\n  <p class=\"message\" *ngIf=\"errorMessages\">{{errorMessages}}</p>\n</div>\n<div class=\"email-instructions\" *ngIf=\"status\">\n  <p>Email has been sent to {{ user.email }} please check your inbox or spam folder.</p>\n</div>"

/***/ }),

/***/ "../../../../../src/app/password-reset/password-reset.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".password-reset-container {\n  border-bottom: 1px solid black;\n  margin: 175px auto;\n  padding: 15px;\n  width: 315px; }\n\n.email {\n  border: 0px;\n  font-size: 20px;\n  height: 37px;\n  width: 225px;\n  padding: 7px;\n  border-radius: 20px; }\n\n.button {\n  border: 0px;\n  padding: 15px;\n  width: 67px;\n  float: right;\n  margin: 2px;\n  font-size: 15px;\n  cursor: pointer;\n  -webkit-transition: 1s;\n  transition: 1s; }\n\n.button:hover {\n    background: black;\n    color: #fff; }\n\n.title {\n  position: absolute;\n  display: inline-block;\n  width: 217px;\n  text-align: right;\n  margin: 18px;\n  font-size: 23px; }\n\n.message {\n  position: absolute;\n  display: inline-block;\n  width: 213px;\n  text-align: right;\n  margin: 40px;\n  font-size: 23px;\n  color: #ef5350;\n  font-family: 'Song Myung', serifc; }\n\n.email-instructions {\n  width: 300px;\n  padding: 15px;\n  margin: auto;\n  font-size: 28px;\n  margin-top: 200px;\n  text-align: center;\n  font-family: 'Song Myung', serifc; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/password-reset/password-reset.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var PasswordResetComponent = /** @class */ (function () {
    function PasswordResetComponent(userService) {
        this.userService = userService;
        this.user = {};
        this.status = false;
    }
    PasswordResetComponent.prototype.ngOnInit = function () {
    };
    PasswordResetComponent.prototype.passwordResetRequest = function () {
        var _this = this;
        this.userService.passwordResetRequest(this.user).subscribe(function (data) {
            if (data["message"]) {
                _this.errorMessages = data["message"];
            }
            else {
                _this.status = true;
            }
        });
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            selector: 'app-password-reset',
            template: __webpack_require__("../../../../../src/app/password-reset/password-reset.component.html"),
            styles: [__webpack_require__("../../../../../src/app/password-reset/password-reset.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;


/***/ }),

/***/ "../../../../../src/app/profile-preview/profile-preview.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n  \n<div class=\"card\">\n\n    <div class=\"profile-image\">\n        <slideshow [imageUrls]=\"user.image\"></slideshow>\n    </div>\n    <div class=\"user-name\">\n        <p class=\"name\">{{ user.first_name }}</p>\n        <ngx-loading [show]=\"loadingImages\"></ngx-loading>\n        \n        <div class=\"active-status\">\n            <p class=\"user-is-active activity\" *ngIf=\"user.active == true\">Active for: {{ user.activity }}</p>\n            <p class=\"user-not-activity activity\" *ngIf=\"user.active == false\">Not Active</p>     \n        </div>           \n\n        <P *ngIf=\"user.birthday \" class=\"age\">{{ calculateAge(user.birthday) }}</P>\n    </div>\n\n    <div class=\"user-info blur-focus blur\">\n        <p class=\"blur-para\" *ngIf=\"user.blur\">{{ user.blur }}</p>\n    </div>\n    <div class=\"user-info bio\">\n        <p class=\"bio-para\" *ngIf=\"user.bio\">{{ user.bio }}</p>\n    </div>\n\n    <div *ngIf=\"user.hobbies.length > 0\"  class=\"likes\">\n\n        <p class=\"like-title\">Likes:</p>\n        \n        <div class=\"hobbies\" *ngFor=\"let hobbie of user.hobbies\">\n            <p class=\"hobbie\">{{hobbie}}</p>\n        </div>\n            \n    </div>\n        \n</div>"

/***/ }),

/***/ "../../../../../src/app/profile-preview/profile-preview.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card {\n  height: 87%;\n  width: 95%;\n  max-width: 370px;\n  margin: 10px auto;\n  background-color: #eeeeee;\n  -webkit-box-shadow: 0px 0px 15px 0px #888888;\n          box-shadow: 0px 0px 15px 0px #888888;\n  overflow-y: scroll;\n  position: relative; }\n\n.profile-image {\n  height: 260px;\n  width: 100%; }\n\n.profile-image img {\n    width: 100%;\n    height: 250px; }\n\n.card::-webkit-scrollbar {\n  width: 0 !important; }\n\n.profile-image::-webkit-scrollbar {\n  width: 0 !important; }\n\n.name::-webkit-scrollbar {\n  width: 0 !important; }\n\n.user-name {\n  height: 25px;\n  padding-top: 10px; }\n\n.name {\n  float: left;\n  font-size: 25px;\n  cursor: default;\n  font-family: 'Song Myung', serifc;\n  text-transform: uppercase;\n  position: relative;\n  padding-left: 10px;\n  bottom: 5px;\n  max-width: 150px;\n  overflow: hidden; }\n\n.icon {\n  float: right;\n  padding: 2px; }\n\n.age {\n  margin-right: 5px;\n  font-size: 30px;\n  float: right;\n  margin-top: -8px;\n  cursor: default; }\n\n.hobbies {\n  background-color: lavender;\n  display: inline-block;\n  padding: 10px;\n  border-radius: 20px;\n  margin: 6px;\n  text-transform: capitalize; }\n\n.blur {\n  min-height: 100px;\n  width: 95%;\n  padding: 6px;\n  margin: auto;\n  cursor: default;\n  font-family: 'Song Myung', serifc; }\n\n.bio {\n  min-height: 130px;\n  width: 95%;\n  margin: auto;\n  cursor: default;\n  font-family: 'Song Myung', serifc; }\n\n.blur-para::before {\n  content: \"Blur:\";\n  margin: 5px;\n  font-size: 20px; }\n\n.bio-para::before {\n  content: \"Bio:\";\n  margin: 5px;\n  font-size: 20px; }\n\n.like-title {\n  margin: 5px;\n  font-size: 20px;\n  font-family: 'Song Myung', serifc; }\n\n.likes {\n  width: 95%;\n  margin: 10px auto; }\n\n.active-status {\n  display: inline-block;\n  font-weight: bold;\n  font-size: 13px;\n  text-transform: capitalize; }\n\n.user-not-activity {\n  background-color: #f58381; }\n\n.user-is-active {\n  background-color: #6cdc9f; }\n\n.activity {\n  padding: 5px;\n  margin-left: 5px;\n  border-radius: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile-preview/profile-preview.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var ProfilePreviewComponent = /** @class */ (function () {
    function ProfilePreviewComponent(userService, params) {
        this.userService = userService;
        this.params = params;
        this.userId = this.params.snapshot.params['id'];
        this.loadingImages = false;
        this.user = {
            hobbies: ''
        };
    }
    ProfilePreviewComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    ProfilePreviewComponent.prototype.getUser = function () {
        var _this = this;
        this.loadingImages = true;
        this.userService.getUser(this.userId).subscribe(function (data) {
            _this.user = data['user'];
            _this.loadingImages = false;
        });
    };
    ProfilePreviewComponent.prototype.calculateAge = function (birthday) {
        //check users age
        var ageInSec = Date.now() - new Date(birthday).getTime();
        var age = new Date(ageInSec);
        return Math.abs(age.getUTCFullYear() - 1970);
    };
    ProfilePreviewComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-preview',
            template: __webpack_require__("../../../../../src/app/profile-preview/profile-preview.component.html"),
            styles: [__webpack_require__("../../../../../src/app/profile-preview/profile-preview.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute])
    ], ProfilePreviewComponent);
    return ProfilePreviewComponent;
}());
exports.ProfilePreviewComponent = ProfilePreviewComponent;


/***/ }),

/***/ "../../../../../src/app/profile/Category.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Category = /** @class */ (function () {
    function Category(id, name) {
        this.id = id;
        this.name = name;
    }
    return Category;
}());
exports.Category = Category;


/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div class=\"card-content\" [ngClass]=\"{'card-content-opacity': opacity }\">\n\n  <div class=\"images-container\">\n    <div class=\"image-container disable\" *ngFor=\"let image of images\">\n      <input type=\"file\" (ngModel)=\"userImage\" name=\"userImage\" id=\"file\" class=\"inputImage\" (change)=\"imageUpload($event)\" *ngIf=\"!image\"/>\n      <label for=\"file\" class=\"imageLabel\" *ngIf=\"!image\">Upload an Image</label>\n      <ngx-loading [show]=\"loadingImages\" [config]=\"{ backdropBorderRadius: '25px' }\" [template]=\"customLoadingTemplate\"></ngx-loading>\n      <div class=\"image\" *ngIf=\"image\">\n          <img [src]=\"image\" height=\"200\">\n          <input class=\"delete\" name=\"userImage\" (ngModel)=\"userImage\" (click)=\"deleteImage(image)\">\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"loading\" class=\"loading\">\n      <ngx-loading [show]=\"loading\"></ngx-loading>\n  </div>\n  <div class=\"header disable\">\n      <h1 class=\"left\" id=\"name\" [routerLink]=\"['/preview', userId]\">{{ name }}</h1>\n      <span class=\"tool-tip\">See Profile Preview</span>\n      <img class=\"settings\" (click)=\"setting = true;\" src=\"../../assets/icons/settings.svg\" alt=\"Settings\">\n      <input type=\"checkbox\" [ngModel]=\"userIsActive\" name=\"userIsActive\" (ngModelChange)=\"userActive()\"  id=\"switch\">\n      <label for=\"switch\"></label>\n  </div>\n  \n  <form (submit)=\"editUser()\">\n    \n    <p class=\"left blur-title\">Blur</p>\n\n    <textarea class=\"blur disable\" placeholder=\"Keep it short and simple, what do you want to do?\" [(ngModel)]=\"userInfo.blur\" (ngModelChange)=\"wordCountLogic()\" name=\"blur\">{{ userInfo.blur }}</textarea>\n    \n    <span class=\"word-count\" [ngClass]=\"{'word-count-red': blurWordCountRedText }\">{{blurWordCount}}</span>\n    \n    <p class=\"left\" >What do you want to do?</p>\n    \n    <div class=\"container disable\">\n      \n      <div class=\"dropdown-container\" (click)=\"classVisible = !classVisible; checkActivty(); placeHolder = true;\" *ngIf=\"placeHolder\">Activities</div>\n      <div class=\"dropdown-container\" (click)=\"classVisible = !classVisible; placeHolder = !placeHolder;\" *ngIf=\"!placeHolder\">{{activity}}</div>\n      <div class=\"dropdown-head\" [ngClass]=\"{'options-active': classVisible }\">\n        <button class=\"options\" *ngFor=\"let category of categories\" value=\"{{category.id}}\" (click)=\"classVisible = false; placeHolder = !placeHolder; selectedActivity(category.name)\">{{category.name}}</button>\n      </div>\n    </div>\n    \n    <p class=\"left\">About</p>\n\n    <textarea class=\"bio disable\" [(ngModel)]=\"userInfo.bio\" name=\"bio\" placeholder=\"Tell who you are.\" (ngModelChange)=\"wordCountLogic()\"></textarea>\n\n    <span class=\"bio-word-count\" [ngClass]=\"{'bio-word-count-red': bioWordCountRedText }\">{{bioWordCount}}</span>\n    \n    <p class=\"left\">Hobbies</p>\n    \n    <tag-input [(ngModel)]=\"items\" class=\"disable\" [modelAsStrings]=\"true\"  theme='dark' name=\"item\"></tag-input>\n\n    <input type=\"submit\" [ngClass]=\"{'disable-save': disableSave }\" class=\"saveButton disable\" value=\"Save\">\n  \n  </form>\n\n  <button (click)=\"logout()\" class=\"logoutButton disable\">LogOut</button>\n  \n</div>\n\n<div [ngClass]=\"{'settings-container-view': setting}\" class=\"settings-container\">\n  <div (click)=\"setting = false;\" class=\"logo-title\">\n    <p  class=\"title\">Friend<span class=\"zoe\">Zone</span></p>\n  </div>\n  <div class=\"contact-info\">\n    <h1>CONTACT ME</h1>\n    <p>davidpina14@gmail.com</p>\n    <a class=\"linkedin\" href=\"https://www.linkedin.com/in/david-pina-8a46128a/\">linkedin</a>\n    <p class=\"something-to-say\">\n      FriendZone is a simple idea, getting people together with no motive of a relationship. You can expect an IOS version later this year. Any questions regarding the website direct them to my email. Thank you.\n    </p>\n  </div>\n  <div class=\"version\">\n    <p>Version: 1.0.0</p>\n    <button class=\"delete-account logoutButton disable\" (click)=\"opacity = !opacity; modal = !modal; setting = !setting;\">DELETE ACCOUNT</button>\n  </div>\n</div>\n\n<div class=\"modal\" [ngClass]=\"{'modal-display-block': modal}\">\n    <p>Are you sure you want to delete your account?</p>\n    <button (click)=\"opacity = false; modal = false;\" class=\"cancel\">Cancel</button>\n    <button class=\"yes\" (click)=\"deleteUser()\">Yes</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-content {\n  text-align: center;\n  padding: 3px;\n  border: 0px solid;\n  max-width: 750px;\n  height: 88%;\n  overflow: scroll;\n  position: relative;\n  margin: auto; }\n  @media screen and (min-width: 750px) {\n    .card-content {\n      -webkit-transition: 3s;\n      transition: 3s;\n      -webkit-box-shadow: 0px 7px 40px 1px #888888;\n              box-shadow: 0px 7px 40px 1px #888888; } }\n  .card-content .saveButton {\n    -webkit-appearance: none;\n    -webkit-border-radius: 0;\n    width: 100%;\n    max-width: 350px;\n    height: 40px;\n    margin-top: 10px;\n    font-weight: bold;\n    border: 0px;\n    cursor: pointer;\n    border-radius: 30px;\n    background: #66bb6a;\n    outline: none; }\n  .card-content .saveButton:hover {\n      color: #fff;\n      background-color: #00c853; }\n  .card-content .logoutButton {\n    margin-top: 10px;\n    height: 40px;\n    font-weight: bold;\n    width: 100%;\n    max-width: 350px;\n    border: 0px;\n    border-radius: 30px;\n    background: #ef5350;\n    cursor: pointer; }\n  .card-content .logoutButton:hover {\n      color: #fff;\n      background: #d50000; }\n  .card-content .blur {\n    background: #f5f5f5;\n    padding: 5px;\n    outline: none;\n    font-family: 'Song Myung', serifc; }\n  .card-content .bio {\n    margin-top: 10px;\n    resize: none;\n    border: 0;\n    outline: none;\n    height: 150px;\n    direction: ltr;\n    padding: 5px;\n    background: #f5f5f5;\n    width: 95%;\n    font-family: 'Song Myung', serifc; }\n  .card-content textarea {\n    min-height: 65px;\n    width: 95%;\n    font-size: 15px;\n    resize: none;\n    border: 0;\n    background: transparent; }\n  .card-content::-webkit-scrollbar {\n  display: none !important;\n  -ms-overflow-style: none !important;\n  overflow: -moz-scrollbars-none !important; }\n  .closebtn:hover {\n  cursor: default; }\n  .left {\n  text-align: left;\n  font-weight: bold;\n  cursor: default;\n  margin: 5px;\n  font-family: 'Song Myung', serifc; }\n  .header {\n  height: 46px;\n  margin: auto;\n  margin-top: 10px; }\n  .header #name {\n    color: #333333;\n    font-family: 'Song Myung', serifc;\n    font-size: 25px;\n    font-weight: norma;\n    margin-bottom: 15px;\n    float: left;\n    display: inline-block;\n    text-transform: capitalize;\n    cursor: pointer;\n    min-width: 60px;\n    outline: none; }\n  .header input[type=checkbox] {\n    display: none; }\n  .header label {\n    background: #eb5c55;\n    height: 30px;\n    display: block;\n    width: 70px;\n    display: block;\n    float: right;\n    position: relative;\n    top: 5px;\n    border-radius: 50px;\n    cursor: pointer; }\n  .header label::before {\n    content: \"Active\";\n    font-weight: bold;\n    font-family: 'Song Myung', serifc;\n    font-size: 20px;\n    right: 80px;\n    position: absolute;\n    top: 5px; }\n  @media screen and (max-width: 320px) {\n      .header label::before {\n        font-size: 15px;\n        top: -20px;\n        right: 15px; } }\n  .header label::after {\n    content: \"\";\n    width: 25px;\n    height: 25px;\n    background: #ffffff;\n    position: absolute;\n    border-radius: 100px;\n    top: 2px;\n    left: 2px;\n    -webkit-transition: 0.3s;\n    transition: 0.3s; }\n  .header input:checked + label {\n    background: #bada55; }\n  .header input:checked + label::after {\n    left: calc(100% - 3px);\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%); }\n  .header label:active:after {\n    width: 35px; }\n  .header select {\n    width: 300px;\n    background: transparent;\n    border: 0px;\n    border-radius: 5px; }\n  .container {\n  position: relative;\n  width: 100%;\n  top: 20px;\n  height: 70px; }\n  .options {\n  background: transparent;\n  width: 190px;\n  height: 35px;\n  border: 0px;\n  cursor: pointer; }\n  .options:hover {\n    background: #f5f5f5; }\n  .dropdown-head {\n  width: 190px;\n  background: #e0e0e0;\n  margin: auto;\n  display: none; }\n  .options-active {\n  display: block;\n  -webkit-animation: fadeInUp 800ms;\n          animation: fadeInUp 800ms; }\n  .dropdown-container {\n  background-color: #ffffff;\n  border-bottom: 1px solid;\n  font-size: 25px;\n  font-weight: bold;\n  cursor: pointer;\n  height: 35px;\n  width: 190px;\n  margin: auto;\n  text-transform: capitalize; }\n  .dropdown-container:hover {\n    background: #e0e0e0; }\n  @-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 20px, 0);\n            transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none; } }\n  @keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 20px, 0);\n            transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none; } }\n  .images-container {\n  height: 310px;\n  margin: auto; }\n  @media screen and (max-width: 729px) {\n    .images-container {\n      max-width: 360px;\n      padding: 10px; } }\n  @media screen and (min-width: 730px) {\n    .images-container {\n      width: auto; }\n      .images-container .image-container {\n        margin-top: 60px;\n        width: 165px; } }\n  .image-container {\n  background-color: #404040;\n  height: 145px;\n  position: relative;\n  width: 45%;\n  vertical-align: top;\n  margin: 2px;\n  display: inline-block;\n  -webkit-box-shadow: 0px 2px 13px #888888;\n          box-shadow: 0px 2px 13px #888888;\n  border-radius: 25px; }\n  .inputImage {\n  height: 100%;\n  width: 100%;\n  opacity: 0; }\n  .imageLabel {\n  background-color: #bdbdbd;\n  position: relative;\n  bottom: 85px;\n  padding: 11px;\n  cursor: pointer;\n  border-radius: 15px;\n  -webkit-box-shadow: 0px 2px 13px #888888;\n          box-shadow: 0px 2px 13px #888888;\n  font-size: 15px;\n  font-family: 'Song Myung', serifc; }\n  .inputImage:focus + label,\n.inputImage + label:hover {\n  background-color: #ffcc80; }\n  .image {\n  height: 100%; }\n  .image img {\n    height: 100%;\n    width: 100%;\n    position: relative;\n    border-radius: 25px; }\n  .delete {\n  height: 35px;\n  width: 35px;\n  background: #e57373;\n  background-image: url(\"data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 encoding%3D%22iso-8859-1%22%3F%3E%3C!-- Generator%3A Adobe Illustrator 21.0.0%2C SVG Export Plug-In . SVG Version%3A 6.00 Build 0)  --%3E%3Csvg version%3D%221.1%22 id%3D%22Layer_1%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22 x%3D%220px%22 y%3D%220px%22%09 viewBox%3D%220 0 100.353 100.353%22 style%3D%22enable-background%3Anew 0 0 100.353 100.353%3B%22 xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%09%3Cpath style%3D%22fill%3A%23231F20%3B%22 d%3D%22M50.004%2C0C22.432%2C0%2C0%2C22.434%2C0%2C50.008c0%2C27.568%2C22.432%2C49.996%2C50.004%2C49.996%09%09c27.568%2C0%2C49.996-22.428%2C49.996-49.996C100%2C22.433%2C77.572%2C0%2C50.004%2C0z M50.004%2C97.091c-25.966%2C0-47.091-21.122-47.091-47.083%09%09c0-25.968%2C21.125-47.095%2C47.091-47.095c25.962%2C0%2C47.084%2C21.127%2C47.084%2C47.095C97.088%2C75.97%2C75.966%2C97.091%2C50.004%2C97.091z%22%2F%3E%09%3Cpath style%3D%22fill%3A%23231F20%3B%22 d%3D%22M66.254%2C28.777c-0.569-0.568-1.49-0.568-2.059%2C0L50.013%2C42.951L36.271%2C29.209%09%09c-0.569-0.569-1.49-0.569-2.059%2C0l-6.123%2C6.119c-0.273%2C0.273-0.427%2C0.644-0.427%2C1.03c0%2C0.387%2C0.154%2C0.757%2C0.427%2C1.03l13.745%2C13.746%09%09L27.627%2C65.34c-0.273%2C0.273-0.427%2C0.644-0.427%2C1.03s0.154%2C0.756%2C0.427%2C1.03l6.119%2C6.119c0.273%2C0.273%2C0.643%2C0.426%2C1.03%2C0.426%09%09s0.757-0.153%2C1.03-0.426l14.206-14.207l13.742%2C13.741c0.569%2C0.569%2C1.49%2C0.568%2C2.059%2C0l6.119-6.119%09%09c0.273-0.273%2C0.427-0.644%2C0.427-1.03c0-0.387-0.154-0.757-0.427-1.03L58.191%2C51.133l14.182-14.178%09%09c0.273-0.273%2C0.427-0.644%2C0.427-1.03s-0.154-0.757-0.427-1.03L66.254%2C28.777z M55.102%2C50.104c-0.273%2C0.273-0.427%2C0.644-0.427%2C1.03%09%09s0.154%2C0.757%2C0.427%2C1.03l13.741%2C13.741l-4.059%2C4.059L51.042%2C56.223c-0.546-0.546-1.513-0.546-2.059%2C0L34.777%2C70.43l-4.06-4.06%09%09l14.207-14.206c0.273-0.273%2C0.427-0.644%2C0.427-1.03s-0.154-0.757-0.427-1.03L31.179%2C36.359l4.063-4.061L48.984%2C46.04%09%09c0.569%2C0.569%2C1.49%2C0.568%2C2.059%2C0l14.182-14.174l4.06%2C4.059L55.102%2C50.104z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  position: relative;\n  z-index: 1;\n  bottom: 160px;\n  float: right;\n  cursor: pointer;\n  border: 0px;\n  left: 5px;\n  border-radius: 25px;\n  outline: none; }\n  .card-content-opacity {\n  opacity: 0.1; }\n  .card-content-opacity .disable {\n    pointer-events: none; }\n  .modal {\n  height: 190px;\n  background-color: #404040;\n  color: #fff;\n  width: 300px;\n  position: fixed;\n  bottom: 350px;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  text-align: center;\n  display: none;\n  cursor: default;\n  padding: 5px; }\n  .modal > p {\n    width: 60%;\n    font-size: 20px;\n    margin: auto;\n    margin-top: 30px; }\n  .modal > button {\n    border: 0px;\n    width: 60%;\n    margin-top: 15px;\n    height: 25px; }\n  .modal .yes {\n    background-color: #ef5350;\n    cursor: pointer; }\n  .modal .cancel {\n    background-color: #fff;\n    cursor: pointer; }\n  .modal-display-block {\n  display: block;\n  z-index: 1; }\n  .delete-account {\n  background: #b71c1c !important;\n  outline: none; }\n  .tool-tip {\n  float: left;\n  padding: 4px;\n  background-color: #e0e0e0;\n  border-radius: 0px 13px 13px 15px;\n  margin-top: 5px;\n  width: 70px;\n  cursor: default;\n  font-size: 11px;\n  font-weight: bold; }\n  #name:hover .tool-tip {\n  background-color: red; }\n  .loading {\n  position: absolute;\n  height: 160%;\n  left: 0px;\n  right: 0px;\n  top: 0px; }\n  .settings {\n  height: 30px;\n  cursor: pointer;\n  float: left;\n  margin: 6px 0px 0px 2px; }\n  .settings-container {\n  position: absolute;\n  top: 0px;\n  background-color: #fff;\n  z-index: 1;\n  height: 100%;\n  display: none;\n  width: 100%;\n  cursor: default; }\n  .settings-container-view {\n  display: block; }\n  .logo-title {\n  background-color: #404040;\n  height: 70px;\n  text-align: center; }\n  .title {\n  font-size: 45px;\n  font-family: 'Modak', cursive;\n  color: #fff;\n  cursor: pointer; }\n  .contact-info {\n  margin: 10px;\n  margin-top: 95px;\n  text-align: center; }\n  .linkedin {\n  text-decoration: none;\n  color: #0076b7;\n  cursor: pointer; }\n  .container {\n  font-family: 'Song Myung', serifc; }\n  .version {\n  background-color: #404040;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  color: #fff;\n  text-align: center;\n  font-size: 30px;\n  padding: 15px; }\n  .logoutButton {\n  margin: 5px;\n  height: 40px;\n  font-weight: bold;\n  width: 100%;\n  max-width: 350px;\n  border: 0px;\n  cursor: pointer;\n  outline: none; }\n  .something-to-say {\n  padding: 15px;\n  font-size: 17px;\n  font-weight: bold;\n  margin: auto;\n  max-width: 610px; }\n  .word-count {\n  position: absolute;\n  right: 20px;\n  color: #43a047;\n  top: 477px;\n  border-radius: 13px;\n  font-family: 'Song Myung', serifc; }\n  .bio-word-count {\n  position: absolute;\n  right: 20px;\n  top: 780px;\n  color: #43a047;\n  font-family: 'Song Myung', serifc; }\n  .word-count-red {\n  color: red; }\n  .bio-word-count-red {\n  color: red; }\n  .disable-save {\n  background: #bdbdbd !important;\n  pointer-events: none; }\n  textarea::-webkit-scrollbar {\n  display: none !important;\n  -ms-overflow-style: none !important;\n  overflow: -moz-scrollbars-none !important; }\n  .blur-title {\n  width: 10%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var ngx_chips_1 = __webpack_require__("../../../../ngx-chips/esm5/ngx-chips.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var Category_1 = __webpack_require__("../../../../../src/app/profile/Category.ts");
ngx_chips_1.TagInputModule.withDefaults({
    tagInput: {
        placeholder: 'Add a Hobby',
        secondaryPlaceholder: 'Add a Hobby',
        maxItems: 10,
    }
});
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(authenticateService, userService, router) {
        this.authenticateService = authenticateService;
        this.userService = userService;
        this.router = router;
        this.categories = [
            new Category_1.Category(1, 'Food'),
            new Category_1.Category(2, 'Exercise'),
            new Category_1.Category(3, 'Cinema'),
            new Category_1.Category(4, 'Bar'),
            new Category_1.Category(5, 'Music'),
            new Category_1.Category(5, 'Dancing'),
            new Category_1.Category(5, 'Whatever'),
        ];
        this.placeHolder = true;
        this.items = [];
        this.userInfo = {};
        this.bool = "hello";
        this.userActivation = {};
        this.images = [null, null, null, null];
        this.opacity = false;
        this.modal = false;
        this.loading = false;
        this.loadingImages = false;
        this.setting = false;
        this.blurWordCountRedText = false;
        this.bioWordCountRedText = false;
        this.disableSave = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.setUserId();
    };
    ProfileComponent.prototype.imageUpload = function (event) {
        //Handles all Image upload logic
        var _this = this;
        var image = event.target.files[0];
        this.loadingImages = true;
        if (!this.validateFile(image.name)) {
            this.loadingImages = false;
            return false;
        }
        var fd = new FormData();
        fd.append('userImage', image, image.name);
        this.userService.imageUpload(fd).subscribe(function (res) {
            setTimeout(function () {
                _this.getUser();
            }, 0);
        });
    };
    ProfileComponent.prototype.deleteImage = function (image) {
        var _this = this;
        this.loadingImages = true;
        this.userService.imageDelete(image).subscribe(function (res) {
            setTimeout(function () {
                _this.getUser();
            }, 0);
        });
    };
    ProfileComponent.prototype.validateFile = function (name) {
        //Makes sure the user is not submitting other files like mp3 and such.
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == "jpg" || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg') {
            return true;
        }
        else {
            return false;
        }
    };
    ProfileComponent.prototype.wordCountLogic = function () {
        //Is this shit code? I'll know in a month.
        this.blurWordCount = 150 - this.userInfo.blur.length;
        this.bioWordCount = 300 - this.userInfo.bio.length;
        if (this.blurWordCount < 0) {
            this.blurWordCountRedText = true;
        }
        if (this.blurWordCount > 0) {
            this.blurWordCountRedText = false;
        }
        if (this.bioWordCount < 0) {
            this.bioWordCountRedText = true;
        }
        if (this.bioWordCount > 0) {
            this.bioWordCountRedText = false;
        }
        if (this.bioWordCount < 0 || this.blurWordCount < 0) {
            this.disableSave = true;
        }
        if (this.bioWordCount > 0 && this.blurWordCount > 0) {
            this.disableSave = false;
        }
    };
    ProfileComponent.prototype.userActive = function () {
        this.userIsActive = !this.userIsActive;
        this.userActivation.active = this.userIsActive;
        this.userService.userActivate(this.userActivation);
    };
    ProfileComponent.prototype.selectedActivity = function (activity) {
        this.activity = activity;
    };
    ProfileComponent.prototype.checkActivty = function () {
        if (this.activity) {
            this.placeHolder = false;
        }
    };
    ProfileComponent.prototype.setUserId = function () {
        //Get the user ID first before getting all other data from the JWT
        var _this = this;
        this.authenticateService.getUserInfo().subscribe(function (data) {
            _this.userId = data["id"];
            _this.getUser();
        });
    };
    ProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser(this.userId).subscribe(function (data) {
            _this.name = data['user'].first_name;
            _this.items = data['user'].hobbies;
            _this.userInfo.blur = data['user'].blur;
            _this.userInfo.bio = data['user'].bio;
            _this.userIsActive = data['user'].active;
            _this.loadingImages = false;
            _this.loading = false;
            if (data['user'].image.length > 0) {
                _this.images = data['user'].image;
                if (_this.images.length != 4) {
                    do {
                        _this.images.push(null);
                    } while (_this.images.length <= 3);
                }
            }
            else {
                _this.images = [null, null, null, null];
            }
            if (data['user'].activity) {
                _this.placeHolder = false;
                _this.activity = data['user'].activity;
            }
            _this.wordCountLogic();
        });
    };
    ProfileComponent.prototype.editUser = function () {
        // Tbh I forgot why I set this function to private and now I'm too afraid to change it.
        var _this = this;
        this.loading = true;
        this.userInfo.activity = this.activity;
        this.userInfo.hobbies = this.items;
        this.userService.editUser(this.userInfo).subscribe(function (data) {
            _this.loading = false;
        });
    };
    ProfileComponent.prototype.logout = function () {
        this.authenticateService.logout();
        this.router.navigateByUrl('/login');
    };
    ProfileComponent.prototype.deleteUser = function () {
        //deletes users profile forever.
        var _this = this;
        this.userService.deleteUser(this.userId).subscribe(function (data) {
            if (data['success'] == true) {
                _this.authenticateService.logout();
                _this.router.navigateByUrl('/');
            }
            else {
                _this.message = "User could not be deleted, try again later";
            }
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/profile/profile.component.sass")]
        }),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService, user_service_1.UserService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;


/***/ }),

/***/ "../../../../../src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<app-landing-header></app-landing-header>\n\n<div class=\"register\">\n  \n    <form (submit)=\"create()\">\n        \n        <input type=\"text\" class=\"form-group validate\" (input)=\"validate()\" placeholder=\"First Name\" name=\"first_name\" [(ngModel)]=\"user.first_name\">\n        <input type=\"email\" required class=\"form-group\" placeholder=\"Email\" (input)=\"validate()\" name=\"email\" [(ngModel)]=\"user.email\">\n        <input type=\"date\"  [ngClass]=\"{'ageValidation': ageValidation,'placeholder': datePicker }\" class=\"form-group date placeholder\" (input)=\"ageValidate();\" placeholder=\"Birthdate\" name=\"birthdate\" (input)=\"validate()\" (focus)=\"datePicker = false;\" [(ngModel)]=\"user.birthday\">\n        <input type=\"password\" [ngClass]=\"{'password-compare': isClassVisible }\" class=\"form-group \" (input)=\"validate(); validation();\" placeholder=\"Password\" name=\"password\" [(ngModel)]=\"user.password\">\n        <input type=\"password\" [ngClass]=\"{'password-compare': isClassVisible }\" class=\"form-group \" (input)=\"validate(); validation();\" placeholder=\"Confirm Password\" name=\"confirm_password\" [(ngModel)]=\"user.confirm_password\">\n        <input type=\"submit\" [ngClass]=\"{'form-active': formActive }\" class=\"form-group form-button\" value=\"Register\">\n    \n    </form>\n      \n    <button [routerLink]=\"['/login']\" class=\"form-group button-link\">Login</button>\n    <p class=\"error-message\" *ngIf=\"message\">{{message}}</p>\n    <ngx-loading [show]=\"loading\"></ngx-loading>\n    \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/register/register.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".register {\n  text-align: center;\n  height: 300px;\n  margin: auto;\n  margin-top: 100px;\n  width: 340px; }\n  @media screen and (min-width: 600px) {\n    .register {\n      width: 550px; } }\n  .form-group {\n  width: 90%;\n  margin: 10px 0px 0px 0px;\n  padding-left: 10px;\n  border: 0px;\n  height: 40px;\n  outline: none; }\n  .form-button {\n  background-color: #eeeeee;\n  text-transform: uppercase;\n  -webkit-transition-property: background-color color border-width;\n  transition-property: background-color color border-width;\n  -webkit-transition-duration: 300ms;\n          transition-duration: 300ms;\n  color: #fff;\n  cursor: not-allowed;\n  pointer-events: none;\n  -webkit-appearance: none;\n  -webkit-border-radius: 0; }\n  .form-button:hover {\n    background-color: #404040;\n    color: black; }\n  .form-active {\n  pointer-events: auto;\n  background-color: #404040;\n  color: #fff;\n  cursor: pointer; }\n  .password-compare {\n  background-color: #c8e6c9;\n  color: black; }\n  .button-link {\n  background-color: #eeeeee;\n  text-transform: uppercase;\n  -webkit-transition-property: background-color color border-width;\n  transition-property: background-color color border-width;\n  -webkit-transition-duration: 1s;\n          transition-duration: 1s;\n  color: black;\n  cursor: pointer; }\n  .button-link:hover {\n    background-color: #404040;\n    color: white;\n    border-width: 1px; }\n  .error-message {\n  color: red;\n  width: 200px;\n  margin: 4px auto;\n  padding: 5px; }\n  .date {\n  font-size: 10px;\n  color: #757575;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  background-color: transparent; }\n  .placeholder::before {\n  content: \"Birthday\";\n  position: absolute;\n  background-color: #fff;\n  width: 100px;\n  padding-top: 0px;\n  font-size: 12px; }\n  .ageValidation {\n  background-color: #EF9A99; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/register/register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var authenticate_service_1 = __webpack_require__("../../../../../src/app/_services/authenticate.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_userService, _router, auth) {
        this._userService = _userService;
        this._router = _router;
        this.auth = auth;
        this.user = {};
        this.message = "";
        this.formActive = false;
        this.datePicker = true;
        this.today = new Date();
        this.minAge = 18;
        this.ageValidation = false;
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.auth.logout();
    };
    RegisterComponent.prototype.validate = function () {
        if (this.user.first_name && this.user.email && this.user.password && this.user.confirm_password && this.user.birthday) {
            this.formActive = true;
            if (this.user.password === this.user.confirm_password) {
                this.isClassVisible = true;
            }
            else {
                this.isClassVisible = false;
            }
        }
        else {
            this.formActive = false;
        }
    };
    RegisterComponent.prototype.ageValidate = function () {
        var ageInSec = Date.now() - new Date(this.user.birthday).getTime();
        var ageDate = new Date(ageInSec);
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age > 17) {
            this.ageValidation = false;
        }
        else {
            this.ageValidation = true;
            this.message = "Must be 18 year's of age.";
        }
    };
    RegisterComponent.prototype.validation = function () {
        if (this.user.password === this.user.confirm_password) {
            if (this.user.password.length > 5 && this.user.password.length > 5) {
                this.isClassVisible = true;
                this.message = "";
            }
            else {
                this.message = "Password is too short";
            }
        }
        else {
            this.isClassVisible = false;
            this.formActive = false;
            this.message = "Password do not match";
        }
    };
    RegisterComponent.prototype.create = function () {
        var _this = this;
        this.loading = true;
        this.formActive = true;
        this._userService.create(this.user)
            .subscribe(function (data) {
            _this._router.navigateByUrl('profile');
        }, function (error) {
            _this.loading = false;
            _this.message = error.error.message;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/app/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/register/register.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, authenticate_service_1.AuthenticateService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ "../../../../../src/app/users/users.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div *ngIf=\"cards.length > 0\" class=\"main\" swing-stack #myswing1  (throwoutleft)=\"voteUp(false)\" (throwoutright)=\"voteUp(true)\" >   \n  \n    <div class=\"card\" #mycards1 swing-card *ngFor=\"let user of cards\" >\n      \n        <div class=\"profile-image\" >\n            <slideshow [imageUrls]=\"user.image\"></slideshow>\n        </div>\n\n        <div class=\"profile-bio\">\n            \n            <div (click)=\"isClassVisible = !isClassVisible\" class=\"user-name\">\n                <p class=\"name\">{{ user.first_name }}</p>\n                <P class=\"distance\" *ngIf=\"user.distance\">{{user.distance}} Mile/s away</P>                \n                <P class=\"age\">{{ user.birthday }}</P>\n            </div>\n\n            <p *ngIf=\"user.blur\" class=\"user-info blur-focus blur\">{{ user.blur }}</p>            \n            <p *ngIf=\"user.bio\" class=\"user-info bio\">{{ user.bio }}</p>\n\n            <div *ngIf=\"user.hobbies.length >= 1\"  class=\"likes\">\n\n                <p class=\"like-title\">Likes</p>\n\n                <div class=\"hobbies\" *ngFor=\"let hobbie of user.hobbies\">\n                    <p class=\"hobbie\">{{hobbie}}</p>\n                </div>\n\n            </div>\n\n        </div>\n       \n    </div>\n\n</div>\n\n<div *ngIf=\"cards.length === 0\" class=\"loading\">\n    <p class=\"message\" *ngIf=\"message\">{{message}}</p>     \n    <ngx-loading  *ngIf=\"cards.length === 0\" [show]=\"loading\" [config]=\"{backdropBackgroundColour:'rgba(0, 0, 0, -0.7)'}\" [template]=\"customLoadingTemplate\"></ngx-loading>\n</div>\n\n<div *ngIf=\"cards.length > 0\" class=\"options\">\n        \n    <button type=\"submit\" class=\"pass option\" (click)=\"voteUp(false)\">Pass</button>\n    <button type=\"submit\" class=\"friendzone option\" (click)=\"voteUp(true)\">FriendZoe</button>\n               \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/users/users.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".main {\n  text-align: center;\n  margin: auto;\n  height: 77%;\n  position: relative; }\n  @media screen and (min-height: 800px) {\n    .main {\n      height: 665px; } }\n  .card {\n  border: 1px solid black;\n  width: 350px;\n  margin: auto;\n  position: absolute;\n  background-color: #fff;\n  right: 0;\n  top: 20px;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  border-radius: 50px;\n  -webkit-box-shadow: 0px 0px 15px 0px #888888;\n          box-shadow: 0px 0px 15px 0px #888888;\n  overflow: scroll;\n  -ms-overflow-style: none; }\n  @media screen and (width: 320px) {\n    .card {\n      width: 300px;\n      bottom: 70px; } }\n  .card::-webkit-scrollbar {\n  width: 0 !important; }\n  .profile-image::-webkit-scrollbar {\n  width: 0 !important; }\n  .profile-image {\n  height: 250px;\n  width: 100%;\n  overflow-x: scroll;\n  white-space: nowrap; }\n  .profile-image img {\n    float: left;\n    width: 350px;\n    height: 250px; }\n  @media screen and (width: 320px) {\n      .profile-image img {\n        width: 300px; } }\n  .user-info {\n  padding: 20px;\n  text-align: left; }\n  .chips {\n  background-color: sandybrown;\n  width: 60px;\n  padding: 5px;\n  display: inline-block;\n  position: relative;\n  margin: 5px;\n  top: 5px;\n  border-radius: 15px; }\n  .user-name {\n  height: 37px; }\n  .user-name .name {\n    float: left;\n    font-size: 25px;\n    cursor: default;\n    font-family: 'Song Myung', serifc;\n    text-transform: uppercase;\n    position: relative;\n    left: 10px;\n    bottom: 5px; }\n  .user-name .icon {\n    float: right;\n    padding: 2px; }\n  .icon {\n  cursor: pointer;\n  float: right;\n  position: relative;\n  top: 5px;\n  font-size: 30px; }\n  .likes {\n  padding: 5px;\n  text-align: left; }\n  .likes > p {\n    text-align: left;\n    width: 90%;\n    margin-left: 15px; }\n  .blur {\n  min-height: 20px;\n  width: 85%;\n  text-align: left; }\n  .card-show {\n  height: 285px; }\n  .options {\n  max-width: 370px;\n  margin: auto;\n  padding: 8px; }\n  @media screen and (width: 320px) {\n    .options {\n      width: 310px; } }\n  .option {\n  -webkit-box-shadow: 0px 5px 15px 2px #888888;\n          box-shadow: 0px 5px 15px 2px #888888;\n  height: 45px;\n  width: 49%;\n  border-radius: 20px;\n  border: 0;\n  text-transform: uppercase;\n  color: #fff;\n  cursor: pointer;\n  outline: none; }\n  .pass {\n  background: #ef5350; }\n  .friendzone {\n  background: #66bb6a; }\n  .hobbies {\n  background-color: lavender;\n  display: inline-block;\n  padding: 10px;\n  border-radius: 20px;\n  margin: 6px;\n  text-transform: capitalize; }\n  .like-title {\n  font-size: 25px;\n  margin-bottom: 10px; }\n  .age {\n  margin-right: 5px;\n  font-size: 30px;\n  float: right;\n  margin-top: -8px; }\n  .bio {\n  width: 85%;\n  min-height: 100px; }\n  .blur::before {\n  content: \"Blur:\";\n  margin: 5px;\n  font-size: 20px; }\n  .bio::before {\n  content: \"Bio:\";\n  margin: 5px;\n  font-size: 20px; }\n  .distance {\n  display: inline-block; }\n  .loading {\n  position: relative;\n  height: 90%; }\n  .message {\n  width: 115px;\n  margin: auto;\n  position: absolute;\n  bottom: 40%;\n  left: 0px;\n  font-weight: bold;\n  font-family: 'Song Myung', serifc;\n  right: 0px;\n  text-align: center;\n  -webkit-transform: rotate(20deg);\n  transform: rotate(20deg);\n  -webkit-animation: text-spin 4s infinite;\n          animation: text-spin 4s infinite; }\n  @-webkit-keyframes text-spin {\n  0% {\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg); }\n  100% {\n    -webkit-transform: rotateY(360deg);\n            transform: rotateY(360deg); } }\n  @keyframes text-spin {\n  0% {\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg); }\n  100% {\n    -webkit-transform: rotateY(360deg);\n            transform: rotateY(360deg); } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/users/users.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var friendship_service_1 = __webpack_require__("../../../../../src/app/_services/friendship.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(_userService, _friendshipService, params) {
        this._userService = _userService;
        this._friendshipService = _friendshipService;
        this.params = params;
        this.cards = [];
        this.recentCard = '';
        this.friend = {};
        this.loading = false;
        this.term = this.params.snapshot.params['term'];
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.calculateAge = function (birthday) {
        var ageInSec = Date.now() - new Date(birthday).getTime();
        var age = new Date(ageInSec);
        return Math.abs(age.getUTCFullYear() - 1970);
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.loading = true;
        this._userService.getUsers(this.term)
            .subscribe(function (result) {
            if (result['users'].length > 0) {
                _this.loading = false;
                _this.cards = result['users'];
                _this.userCord = result['userCordinates'];
                _this.cards.forEach(function (user) {
                    var distance = _this.getDistance(user.latitude, user.longitude);
                    var age = _this.calculateAge(user.birthday);
                    user.birthday = age;
                    user.distance = distance;
                });
            }
            else {
                _this.loading = true;
                _this.message = "Theirs nobody here!!";
            }
        });
    };
    UsersComponent.prototype.voteUp = function (like) {
        var removedCard = this.cards.pop();
        if (like) {
            this.recentCard = removedCard._id;
            this.create(like, this.recentCard);
        }
        else {
            this.recentCard = removedCard._id;
            this.create(like, this.recentCard);
        }
    };
    UsersComponent.prototype.rad = function (x) {
        return x * Math.PI / 180;
    };
    ;
    UsersComponent.prototype.getDistance = function (latitude, longitude) {
        //checks distance between both users if they both have location on.
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(this.userCord.latitude - latitude);
        var dLong = this.rad(this.userCord.longitude - longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(this.userCord.latitude) * Math.cos(this.rad(latitude))) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        var mile = d * 0.00062137;
        return Math.floor(mile);
    };
    ;
    UsersComponent.prototype.create = function (like, id) {
        this.friend.status = like;
        this.friend.userId = this.user;
        this.friend.id = id;
        this.friend.activity = this.term;
        this._friendshipService.create(this.friend);
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/users/users.component.html"),
            styles: [__webpack_require__("../../../../../src/app/users/users.component.sass")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, friendship_service_1.FriendshipService, router_1.ActivatedRoute])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map