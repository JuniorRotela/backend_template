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
exports.StockPurchaseItem = void 0;
const typeorm_1 = require("typeorm");
const StockPurchase_1 = require("./StockPurchase");
const StockProduct_1 = require("./StockProduct");
let StockPurchaseItem = class StockPurchaseItem {
};
exports.StockPurchaseItem = StockPurchaseItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "purchase_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => StockPurchase_1.StockPurchase),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_id' }),
    __metadata("design:type", StockPurchase_1.StockPurchase)
], StockPurchaseItem.prototype, "purchase", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => StockProduct_1.StockProduct),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", StockProduct_1.StockProduct)
], StockPurchaseItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 3, default: 0 }),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "unit_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "total_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "packages_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], StockPurchaseItem.prototype, "units_per_package", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StockPurchaseItem.prototype, "created_at", void 0);
exports.StockPurchaseItem = StockPurchaseItem = __decorate([
    (0, typeorm_1.Entity)('stock_purchase_items')
], StockPurchaseItem);
