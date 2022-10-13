"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const mongoose_1 = require("mongoose");
const vehiculoSchema = new mongoose_1.Schema({
    marca: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    modelo: {
        type: String
    },
    motor: {
        type: String
    },
    imagen: {
        type: String,
        require: [true, 'La imagen es requeria']
    }
});
exports.Vehiculo = (0, mongoose_1.model)('Vehiculo', vehiculoSchema);
