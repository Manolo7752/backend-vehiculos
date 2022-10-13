"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculo_model_1 = require("../models/vehiculo.model");
const vehiculoRoutes = (0, express_1.Router)();
vehiculoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehiculos = yield vehiculo_model_1.Vehiculo.find();
    return res.json({
        ok: true,
        vehiculos
    });
}));
vehiculoRoutes.get('/paging', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let perPage = 4;
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * perPage;
    const vehiculos = yield vehiculo_model_1.Vehiculo.find().skip(skip).limit(perPage);
    return res.json({
        ok: true,
        vehiculos
    });
}));
vehiculoRoutes.post('/', (req, res) => {
    const body = req.body;
    const vehiculo = {
        marca: body.marca,
        modelo: body.modelo,
        motor: body.motor,
        imagen: body.imagen
    };
    vehiculo_model_1.Vehiculo.create(vehiculo).then(vehiculoDb => {
        return res.json({
            ok: true,
            vehiculoDb
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
vehiculoRoutes.put('/:id', (req, res) => {
    const vehiculoId = req.params.id;
    const body = req.body;
    const vehiculo = {
        marca: body.marca,
        modelo: body.modelo,
        motor: body.motor,
        imagen: body.imagen
    };
    vehiculo_model_1.Vehiculo.findByIdAndUpdate(vehiculoId, vehiculo).then(vehiculoDb => {
        return res.json({
            ok: true,
            vehiculoDb
        });
    });
});
vehiculoRoutes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehiculoId = req.query.id;
    if (!vehiculoId) {
        return res.json({
            ok: false,
            msj: "El registro solicitado no existe"
        });
    }
    vehiculo_model_1.Vehiculo.findByIdAndDelete(vehiculoId).then(vehiculo => {
        return res.json({
            ok: true,
            msj: "Eliminado correctamente"
        });
    }).catch(err => {
        return res.json({
            ok: false,
            msj: "El registro solicitado no existe"
        });
    });
}));
exports.default = vehiculoRoutes;
