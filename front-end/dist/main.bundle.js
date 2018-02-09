webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Models/Model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);

var Model = /** @class */ (function () {
    function Model(data) {
        if (data === void 0) { data = {}; }
        this.$data = data;
    }
    Model.prototype.hydrate = function (data) {
        for (var field in data) {
            this[field] = data[field];
            if (field in this.form)
                this.form[field] = data[field];
        }
    };
    Model.prototype.reset = function () {
        this.hydrate(this.$data);
    };
    Model.all = function () {
        var _this = this;
        var Collection = [];
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(_this.url)
                .then(function (response) {
                Collection = response.data.map(function (data) { return new _this(data); });
                resolve(Collection);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    Model.find = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(_this.url + "/" + id)
                .then(function (response) {
                resolve(new _this(response.data));
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    Model.store = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(_this.url, data)
                .then(function (response) {
                resolve(new _this(response.data));
            })
                .catch(function (error) {
                reject(error.response.data);
            });
        });
    };
    Model.prototype.update = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(_this.url + "/" + _this.id, _this.form)
                .then(function (response) {
                _this.hydrate(response.data);
                _this.$data = response.data;
                resolve(_this);
            })
                .catch(function (error) {
                reject(error.response.data);
            });
        });
    };
    Model.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(_this.url + "/" + _this.id)
                .then(function (response) {
                resolve(response.data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return Model;
}());
/* harmony default export */ __webpack_exports__["a"] = (Model);


/***/ }),

/***/ "./src/app/Models/Student.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Model__ = __webpack_require__("./src/app/Models/Model.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var url = 'http://localhost:7000/students';
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, data) || this;
        _this.url = url;
        _this.form = {
            action: 'create',
            name: '',
            birthday: '',
            grade: null,
            mother: {
                name: '',
                cpf: null,
                charge_at: ''
            },
            address: {
                postal_code: null,
                street: '',
                number: null,
                complement: '',
                neighborhood: '',
                city: '',
                state: ''
            }
        };
        _this.form['actions'] = 'edit';
        _this.hydrate(data);
        return _this;
    }
    Student.url = url;
    return Student;
}(__WEBPACK_IMPORTED_MODULE_0__Model__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (Student);


/***/ }),

/***/ "./src/app/Validation/ValidateCEP.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);

var ValidateCEP = /** @class */ (function () {
    function ValidateCEP() {
    }
    ValidateCEP.check = function (value) {
        var _this = this;
        value = this.normalize(value);
        return new Promise(function (resolve, reject) {
            if (value === null) {
                reject(_this.fail());
                return;
            }
            var Authorization = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers.common['Authorization'];
            delete __WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers.common['Authorization'];
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get("https://viacep.com.br/ws/" + value + "/json/").then(function (response) {
                resolve(response.data);
            }).catch(function (err) {
                reject(_this.fail());
            });
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers.common['Authorization'] = Authorization;
        });
    };
    ValidateCEP.normalize = function (value) {
        return value !== null ? value.toString().replace(/[^\d]+/g, '') : value;
    };
    ValidateCEP.fail = function () {
        return 'CEP inválido';
    };
    return ValidateCEP;
}());
/* harmony default export */ __webpack_exports__["a"] = (ValidateCEP);


/***/ }),

/***/ "./src/app/Validation/ValidateCPF.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ValidateCPF = /** @class */ (function () {
    function ValidateCPF() {
    }
    ValidateCPF.check = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            value = _this.normalize(value);
            if (!value // checar se é ''
                || value.length !== 11 // checar números diferentes de 11
                || (/^([0-9])\1+$/).test(value) // checar números 111.111.111-11
                || !_this.validateDigit(value, 10) // checar 10o dígito
                || !_this.validateDigit(value, 11) // checar 11o dígito
            ) {
                reject(_this.fail());
            }
            resolve(true);
        });
    };
    ValidateCPF.normalize = function (value) {
        return value !== null ? value.toString().replace(/[^\d]+/g, '') : value;
    };
    ValidateCPF.validateDigit = function (value, digit) {
        var sum = 0;
        for (var i = 0; i < digit - 1; i++) {
            sum += parseInt(value.charAt(i)) * (digit - i);
        }
        var rev = 11 - (sum % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        return (rev != parseInt(value.charAt(digit - 1))) ? false : true;
    };
    ValidateCPF.fail = function () {
        return 'CPF inválido';
    };
    return ValidateCPF;
}());
/* harmony default export */ __webpack_exports__["a"] = (ValidateCPF);


/***/ }),

/***/ "./src/app/Validation/ValidateRequired.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ValidateRequired = /** @class */ (function () {
    function ValidateRequired() {
    }
    ValidateRequired.check = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!value || value === null) {
                reject(_this.fail());
                return;
            }
            resolve();
        });
    };
    ValidateRequired.fail = function () {
        return 'Campo obrigatório';
    };
    return ValidateRequired;
}());
/* harmony default export */ __webpack_exports__["a"] = (ValidateRequired);


/***/ }),

/***/ "./src/app/Views/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar w-full flex items-center text-white bg-primary border-t-8 border-primary-dark py-4 shadow\">\n  <div class=\"navbar:left w-1/5\">\n    <div *ngIf=\"window['$store'].state.route === 'index'\" class=\"ml-4 text-2xl w-8 h-8\"> </div>\n    <div *ngIf=\"window['$store'].state.route !== 'index'\" (click)=\"window['$store'].return()\" class=\"flex-center text-bold ml-4 text-2xl hover:bg-primary-dark w-8 h-8 rounded-full cursor-pointer\">\n      <i class=\"fa fa-arrow-left\"></i>\n    </div>\n  </div>\n  <div class=\"navbar:center flex-1 text-center text-xl\">iAlunos</div>\n  <div class=\"navbar:right w-1/5\"></div>\n</nav>"

/***/ }),

/***/ "./src/app/Views/navbar/navbar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/Views/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
        this.window = window;
    }
    NavbarComponent.prototype.goTo = function (route) {
        this.window['$store'].setRoute(route);
    };
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-navbar',
            template: __webpack_require__("./src/app/Views/navbar/navbar.component.html"),
            styles: [__webpack_require__("./src/app/Views/navbar/navbar.component.scss")]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/Views/student-form/student-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"flex flex-wrap flex-col\">\n    <h2>Dados do aluno</h2>\n    <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n      <label class=\"font-bold text-sm\">Nome</label>\n      <input class=\"p-2 h-10 border\" type=\"text\" (blur)=\"validate('name', $event)\" [(ngModel)]=\"form.name\" />\n      <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('name')\">{{ errors.get('name') }}</span>\n    </div>\n\n    <div class=\"form:row w-full flex\">\n      <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n        <label class=\"font-bold text-sm\">Data de nascimento</label>\n        <input class=\"p-2 h-10 border\" type=\"date\" (blur)=\"validate('birthday', $event)\" [(ngModel)]=\"form.birthday\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('birthday')\">{{ errors.get('birthday') }}</span>\n      </div>\n\n      <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n        <label class=\"font-bold text-sm\">Série de Ingresso</label>\n        <input class=\"p-2 h-10 border\" type=\"number\" min=\"1\" max=\"9\" (blur)=\"validate('grade', $event)\" [(ngModel)]=\"form.grade\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('grade')\">{{ errors.get('grade') }}</span>\n      </div>\n    </div>\n    \n    <h2>Dados da mãe</h2>\n    <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n      <label class=\"font-bold text-sm\">Nome da mãe</label>\n      <input class=\"p-2 h-10 border\" type=\"text\" (blur)=\"validate('mother.name', $event)\" [(ngModel)]=\"form.mother.name\" />\n      <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('mother.name')\">{{ errors.get('mother.name') }}</span>\n    </div>\n\n    <div class=\"form:row w-full flex flex-col sm:flex-row\">\n      <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n        <label class=\"font-bold text-sm\">CPF da mãe</label>\n        <input class=\"p-2 h-10 border\" type=\"text\" (blur)=\"validate('mother.cpf', $event)\" [(ngModel)]=\"form.mother.cpf\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('mother.cpf')\">{{ errors.get('mother.cpf') }}</span>\n      </div>\n\n      <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n        <label class=\"font-bold text-sm\">Dia preferencial para pagamento da mensalidade</label>\n        <input class=\"p-2 h-10 border\" type=\"number\" min=\"1\" max=\"31\"  (blur)=\"validate('mother.charge_at', $event)\" [(ngModel)]=\"form.mother.charge_at\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('mother.charge_at')\">{{ errors.get('mother.charge_at') }}</span>\n      </div>\n    </div>\n\n    <h2>Endereço</h2>\n    <div class=\"form:row w-1/2 flex\">\n      <div class=\"form:component flex mb-4 flex-col w-full px-2\">\n        <label class=\"font-bold text-sm\">CEP</label>\n        <input class=\"p-2 h-10 border\" type=\"number\" (blur)=\"validate('address.postal_code', $event)\" [(ngModel)]=\"form.address.postal_code\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.postal_code')\">{{ errors.get('address.postal_code') }}</span>\n      </div>\n    </div>\n\n    <div class=\"form:row w-full flex flex-col sm:flex-row\">\n      <div class=\"form:component flex mb-4 flex-col w-full sm:w-1/2 px-2\">\n        <label class=\"font-bold text-sm\">Rua</label>\n        <input class=\"p-2 h-10 border\" type=\"text\"  (blur)=\"validate('address.street', $event)\" [(ngModel)]=\"form.address.street\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.street')\">{{ errors.get('address.street') }}</span>\n      </div>\n\n      <div class=\"form:component flex mb-4 flex-col w-full sm:w-1/4 px-2\">\n        <label class=\"font-bold text-sm\">Número</label>\n        <input class=\"p-2 h-10 border\" type=\"number\"  (blur)=\"validate('address.number', $event)\" [(ngModel)]=\"form.address.number\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.number')\">{{ errors.get('address.number') }}</span>\n      </div>\n  \n      <div class=\"form:component flex mb-4 flex-col w-full sm:w-1/4 px-2\">\n        <label class=\"font-bold text-sm\">Complemento</label>\n        <input class=\"p-2 h-10 border\" type=\"text\"  (blur)=\"validate('address.complement', $event)\" [(ngModel)]=\"form.address.complement\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.complement')\">{{ errors.get('address.complement') }}</span>\n      </div>\n    </div>\n\n    <div class=\"form:row w-full flex flex-col sm:flex-row\">\n      <div class=\"form:component flex mb-4 flex-col w-full sm:w-2/5 px-2\">\n        <label class=\"font-bold text-sm\">Bairo</label>\n        <input class=\"p-2 h-10 border\" type=\"text\"  (blur)=\"validate('address.neighborhood', $event)\" [(ngModel)]=\"form.address.neighborhood\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.neighborhood')\">{{ errors.get('address.neighborhood') }}</span>\n      </div>\n\n      <div class=\"form:component flex mb-4 flex-col w-full sm:w-2/5 px-2\">\n        <label class=\"font-bold text-sm\">Cidade</label>\n        <input class=\"p-2 h-10 border\" type=\"text\"  (blur)=\"validate('address.city', $event)\" [(ngModel)]=\"form.address.city\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.city')\">{{ errors.get('address.city') }}</span>\n      </div>\n\n      <div class=\"form:component flex mb-4 flex-col w-full sm:w-1/5 px-2\">\n        <label class=\"font-bold text-sm\">Estado</label>\n        <input class=\"p-2 h-10 border\" type=\"text\"  (blur)=\"validate('address.state', $event)\" [(ngModel)]=\"form.address.state\" />\n        <span class=\"text-xs text-red font-bold\" *ngIf=\"errors.has('address.state')\">{{ errors.get('address.state') }}</span>\n      </div>\n    </div>\n  \n    <div class=\"flex justify-end p-2\">\n        <button class=\"px-8 py-4 text-primary hover:bg-primary-lightest hover:text-primary rounded\" (click)=\"window['$store'].return()\">cancelar</button>\n        <button [disabled]=\"!errors.empty()\" class=\"px-8 py-4 text-white bg-primary hover:bg-primary-light rounded\" (click)=\"submit()\">salvar</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/Views/student-form/student-form.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/Views/student-form/student-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Validation_ValidateCPF__ = __webpack_require__("./src/app/Validation/ValidateCPF.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Validation_ValidateCEP__ = __webpack_require__("./src/app/Validation/ValidateCEP.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Validation_ValidateRequired__ = __webpack_require__("./src/app/Validation/ValidateRequired.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var StudentFormComponent = /** @class */ (function () {
    function StudentFormComponent() {
        this.window = window;
        this.form = window['$store'].state.form;
        this.errors = window['$store'].state.errors;
    }
    StudentFormComponent.prototype.rules = function () {
        return {
            'name': ['Required'],
            'birthday': ['Required'],
            'grade': ['Required'],
            'mother.name': ['Required'],
            'mother.cpf': ['Required', 'CPF'],
            'mother.charge_at': ['Required'],
            'address.postal_code': ['Required', 'CEP'],
            'address.street': ['Required'],
            'address.number': ['Required'],
            'address.complement': [],
            'address.neighborhood': ['Required'],
            'address.city': ['Required'],
            'address.state': ['Required'],
        };
    };
    StudentFormComponent.prototype.validate = function (field, e) {
        var _this = this;
        this.rules()[field].forEach(function (rule) {
            _this["check" + rule](field, e.target.value);
        });
    };
    StudentFormComponent.prototype.pushError = function (field, value) {
        window['$store'].state.errors.push(field, value);
    };
    StudentFormComponent.prototype.checkRequired = function (field, value) {
        __WEBPACK_IMPORTED_MODULE_3__Validation_ValidateRequired__["a" /* default */]
            .check(value)
            .then(function (response) {
            window['$store'].state.errors.clear(field);
        })
            .catch(function (err) { return window['$store'].state.errors.push(field, err); });
    };
    StudentFormComponent.prototype.checkCEP = function (field, value) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__Validation_ValidateCEP__["a" /* default */]
            .check(value)
            .then(function (response) {
            window['$store'].state.errors.clear(field);
            _this.assignAddress(response);
        })
            .catch(function (err) { return window['$store'].state.errors.push(field, err); });
    };
    StudentFormComponent.prototype.checkCPF = function (field, value) {
        __WEBPACK_IMPORTED_MODULE_1__Validation_ValidateCPF__["a" /* default */]
            .check(value)
            .then(function (response) {
            window['$store'].state.errors.clear(field);
        })
            .catch(function (err) { return window['$store'].state.errors.push(field, err); });
    };
    StudentFormComponent.prototype.assignAddress = function (data) {
        window['$store'].state.form.address.street = data.logradouro;
        window['$store'].state.form.address.neighborhood = data.bairro;
        window['$store'].state.form.address.city = data.localidade;
        window['$store'].state.form.address.state = data.uf;
    };
    StudentFormComponent.prototype.submit = function () {
        window['$store'].state.form.action === 'create'
            ? window['$store'].storeStudent()
            : window['$store'].updateStudent();
    };
    StudentFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-student-form',
            template: __webpack_require__("./src/app/Views/student-form/student-form.component.html"),
            styles: [__webpack_require__("./src/app/Views/student-form/student-form.component.scss")]
        })
    ], StudentFormComponent);
    return StudentFormComponent;
}());



/***/ }),

/***/ "./src/app/Views/student-index/student-index.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"estudantes\">\n  <div class=\"flex justify-end\">\n      <button class=\"px-6 py-2 my-4 text-white bg-primary hover:bg-primary-light rounded\" (click)=\"window['$store'].setRoute('form')\">adicionar estudante</button>\n  </div>\n\n  <app-student\n      [student]=\"Student\"\n      (click)=\"view(Student)\"\n      *ngFor=\"let Student of window['$store'].state.students\"\n  ></app-student>\n\n</div>"

/***/ }),

/***/ "./src/app/Views/student-index/student-index.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/Views/student-index/student-index.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentIndexComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StudentIndexComponent = /** @class */ (function () {
    function StudentIndexComponent() {
        this.window = window;
        this.Students = this.window['$store'].state.students;
    }
    StudentIndexComponent.prototype.ngOnInit = function () {
        window['$store'].getStudents();
    };
    StudentIndexComponent.prototype.view = function (student) {
        window['$store'].showStudent(student);
    };
    StudentIndexComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-student-index',
            template: __webpack_require__("./src/app/Views/student-index/student-index.component.html"),
            styles: [__webpack_require__("./src/app/Views/student-index/student-index.component.scss")]
        })
    ], StudentIndexComponent);
    return StudentIndexComponent;
}());



/***/ }),

/***/ "./src/app/Views/student-index/student/student.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"estudante flex items-center hover:bg-grey-lightest border p-4 rounded shadow cursor-pointer\">\n  <div class=\"estudante:data flex-1\">\n      <h3>{{ student.name }}</h3>\n      <small>{{ student.grade }}o ano | Filho de {{ student.mother.name }}</small>\n  </div>\n  <div class=\"estudante:actions flex border-l\">\n      <div (click)=\"window['$store'].editStudent(student)\" class=\"action flex-center w-8 h-8 ml-2 hover:text-blue hover:bg-blue-lightest rounded-full cursor-pointer\"><i class=\"fa fa-pencil\"></i></div>\n      <div (click)=\"window['$store'].deleteStudent(student)\" class=\"action flex-center w-8 h-8 ml-2 hover:text-red hover:bg-red-lightest rounded-full cursor-pointer\"><i class=\"fa fa-trash\"></i></div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/Views/student-index/student/student.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/Views/student-index/student/student.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__ = __webpack_require__("./src/app/Models/Student.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StudentComponent = /** @class */ (function () {
    function StudentComponent() {
        this.window = window;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__["a" /* default */])
    ], StudentComponent.prototype, "student", void 0);
    StudentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-student',
            template: __webpack_require__("./src/app/Views/student-index/student/student.component.html"),
            styles: [__webpack_require__("./src/app/Views/student-index/student/student.component.scss")]
        })
    ], StudentComponent);
    return StudentComponent;
}());



/***/ }),

/***/ "./src/app/Views/student-view/student-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"student-view\">\n  <div class=\"student my-4 flex items-center border p-4 rounded shadow\">\n    <div class=\"estudante:data flex-1\">\n        <h1>{{ student.name }}</h1>\n    </div>\n    <div class=\"student:actions flex border-l\">\n        <div (click)=\"window['$store'].editStudent(student)\" class=\"action flex-center w-8 h-8 ml-2 hover:text-blue hover:bg-blue-lightest rounded-full cursor-pointer\"><i class=\"fa fa-pencil\"></i></div>\n        <div (click)=\"window['$store'].deleteStudent(student)\" class=\"action flex-center w-8 h-8 ml-2 hover:text-red hover:bg-red-lightest rounded-full cursor-pointer\"><i class=\"fa fa-trash\"></i></div>\n    </div>\n  </div>\n  <div class=\"student:data mb-4 flex flex-col border p-4 rounded shadow\">\n    <h2 class=\"mb-4\">Dados pessoais</h2>\n    <div class=\"student:data flex my-2\">\n      <i class=\"fa fa-birthday-cake w-8 mr-4\"></i> <span class=\"tracking-wide\">{{ student.birthday }}</span>\n    </div>\n    <div class=\"student:data flex my-2\">\n      <i class=\"fa fa-graduation-cap w-8 mr-4\"></i> <span>{{ student.grade }}o ano</span>\n    </div>\n  </div>\n\n  <div class=\"student:data mb-4 flex flex-col border p-4 rounded shadow\">\n    <h2 class=\"mb-4\">Dados da mãe</h2>\n    <div class=\"student:data flex my-2\">\n      <i class=\"fa fa-female w-8 mr-4\"></i> <span class=\"tracking-wide\">{{ student.mother.name }}</span>\n    </div>\n    <div class=\"student:data flex my-2\">\n      <i class=\"fa fa-id-card-o w-8 mr-4\"></i> <span>{{ student.mother.cpf }}</span>\n    </div>\n  </div>\n\n  <div class=\"student:data mb-4 flex flex-col border p-4 rounded shadow\">\n      <h2 class=\"mb-4\">Financeiro</h2>\n      <div class=\"student:data flex my-2\">\n        <i class=\"fa fa-credit-card w-8 mr-4\"></i> <span class=\"tracking-wide\">Cobrança todo <strong>dia {{ student.mother.charge_at }}</strong> do mês</span>\n      </div>\n    </div>\n\n  <div class=\"student:data mb-4 flex flex-col border p-4 rounded shadow\">\n    <h2 class=\"mb-4\">Endereço</h2>\n    <div class=\"student:data flex my-2\">\n      <i class=\"fa fa-home w-8 mr-4\"></i>\n      <span class=\"tracking-wide\">\n        {{ student.address.street }}, {{ student.address.number }}\n        {{ (student.address.complement) ? ' - ' + student.address.complement : '' }}\n        <br>\n        {{ student.address.neighborhood }} - {{ student.address.postal_code }} - {{ student.address.city }}-{{ student.address.state }}\n      </span>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/Views/student-view/student-view.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/Views/student-view/student-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StudentViewComponent = /** @class */ (function () {
    function StudentViewComponent() {
        this.window = window;
        this.student = window['$store'].state.student;
    }
    StudentViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-student-view',
            template: __webpack_require__("./src/app/Views/student-view/student-view.component.html"),
            styles: [__webpack_require__("./src/app/Views/student-view/student-view.component.scss")]
        })
    ], StudentViewComponent);
    return StudentViewComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"h-full flex flex-col\">\r\n    <app-navbar></app-navbar>\r\n\r\n    <div class=\"p-4 flex-1 overflow-y-scroll\">\r\n        <app-student-index *ngIf=\"window['$store'].state.route === 'index'\"></app-student-index>\r\n        <app-student-form *ngIf=\"window['$store'].state.route === 'form'\"></app-student-form>\r\n        <app-student-view *ngIf=\"window['$store'].state.route === 'show'\"></app-student-view>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
        this.window = window;
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Views_navbar_navbar_component__ = __webpack_require__("./src/app/Views/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Views_student_form_student_form_component__ = __webpack_require__("./src/app/Views/student-form/student-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Views_student_index_student_index_component__ = __webpack_require__("./src/app/Views/student-index/student-index.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Views_student_index_student_student_component__ = __webpack_require__("./src/app/Views/student-index/student/student.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Views_student_view_student_view_component__ = __webpack_require__("./src/app/Views/student-view/student-view.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__Views_student_form_student_form_component__["a" /* StudentFormComponent */],
                __WEBPACK_IMPORTED_MODULE_4__Views_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_6__Views_student_index_student_index_component__["a" /* StudentIndexComponent */],
                __WEBPACK_IMPORTED_MODULE_7__Views_student_index_student_student_component__["a" /* StudentComponent */],
                __WEBPACK_IMPORTED_MODULE_8__Views_student_view_student_view_component__["a" /* StudentViewComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/plugins/Errors.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Errors = /** @class */ (function () {
    function Errors(errors) {
        if (errors === void 0) { errors = {}; }
        this.errors = errors;
    }
    Errors.prototype.has = function (field) {
        return this.errors.hasOwnProperty(field);
    };
    Errors.prototype.empty = function () {
        return Object.keys(this.errors).length === 0;
    };
    Errors.prototype.get = function (field) {
        return this.has(field) ? this.errors[field]
            : this.errors;
    };
    Errors.prototype.push = function (field, value) {
        (this.has(field)) ? this.errors[field].push(value)
            : this.errors[field] = [value];
    };
    Errors.prototype.clear = function (field) {
        if (field === void 0) { field = null; }
        if (field) {
            delete this.errors[field];
            return;
        }
        this.errors = {};
    };
    return Errors;
}());
/* harmony default export */ __webpack_exports__["a"] = (Errors);


/***/ }),

/***/ "./src/app/plugins/Store.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Errors__ = __webpack_require__("./src/app/plugins/Errors.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__ = __webpack_require__("./src/app/Models/Student.model.ts");


var Store = /** @class */ (function () {
    function Store() {
        this.state = {
            student: null,
            students: null,
            route: 'index',
            errors: new __WEBPACK_IMPORTED_MODULE_0__Errors__["a" /* default */],
            formIsVisible: false,
            form: (new __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__["a" /* default */]).form,
        };
    }
    Store.prototype.setRoute = function (route) {
        this.state.route = route;
    };
    Store.prototype.openForm = function () {
        this.state.formIsVisible = true;
    };
    Store.prototype.closeForm = function () {
        this.state.formIsVisible = false;
    };
    Store.prototype.clearForm = function () {
        this.state.form = (new __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__["a" /* default */]).form;
        this.state.student = null;
    };
    Store.prototype.return = function () {
        this.setRoute('index');
        this.clearForm();
    };
    Store.prototype.getStudents = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__["a" /* default */].all().then(function (students) {
            _this.state.students = students;
        });
    };
    Store.prototype.addStudent = function (student) {
        this.state.students.push(student);
    };
    Store.prototype.storeStudent = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1__Models_Student_model__["a" /* default */].store(this.state.form)
            .then(function (student) { return _this.addStudent(student); })
            .catch(function (err) { return _this.state.errors['errors'] = err; });
        this.setRoute('index');
        this.clearForm();
    };
    Store.prototype.showStudent = function (student) {
        this.state.student = student;
        this.setRoute('show');
    };
    Store.prototype.editStudent = function (student) {
        student.form.action = 'edit';
        this.state.student = student;
        this.state.form = student.form;
        this.setRoute('form');
    };
    Store.prototype.updateStudent = function () {
        var _this = this;
        this.state.student.hydrate(this.state.form);
        this.state.student.update()
            .then(function (student) {
            _this.state.students = _this.state.students.map(function (Student) { return Student['id'] === student['id'] ? student : Student; });
        })
            .catch(function (err) { return _this.state.errors['errors'] = err; });
        this.setRoute('index');
        this.clearForm();
    };
    Store.prototype.deleteStudent = function (student) {
        var _this = this;
        var id = student.id;
        student.delete().then(function (r) {
            _this.state.students = _this.state.students.filter(function (student) { return student.id !== id; });
        });
    };
    return Store;
}());
/* harmony default export */ __webpack_exports__["a"] = (Store);


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: true
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_plugins_Store__ = __webpack_require__("./src/app/plugins/Store.ts");





window['$store'] = new __WEBPACK_IMPORTED_MODULE_4__app_plugins_Store__["a" /* default */];
if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map