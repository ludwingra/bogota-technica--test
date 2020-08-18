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
exports.deletePerson = exports.updatePersons = exports.createPersons = exports.getPerson = exports.getPersons = void 0;
const typeorm_1 = require("typeorm");
const person_1 = require("../entity/person");
exports.getPersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield typeorm_1.getRepository(person_1.Person).find();
    return res.json(persons);
});
exports.getPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const person = yield typeorm_1.getRepository(person_1.Person).findOne(req.params.id);
    return res.json(person);
});
exports.createPersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let entrada = req.body;
        let errors = [];
        if (!entrada.name || entrada.name == '')
            errors.push({ key: 'name', error: 'requerido' });
        if (!entrada.birth || entrada.birth == '')
            errors.push({ key: 'birth', error: 'requerido' });
        if (errors.length)
            throw errors;
        const newPerson = typeorm_1.getRepository(person_1.Person).create(entrada);
        const rpt = yield typeorm_1.getRepository(person_1.Person).save(newPerson);
        return res.json(rpt);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updatePersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let person = yield typeorm_1.getRepository(person_1.Person).findOne(req.params.id);
        if (person) {
            let errors = [];
            if (!req.body.name || req.body.name == '')
                errors.push({ key: 'name', error: 'requerido' });
            if (!req.body.birth || req.body.birth == '')
                errors.push({ key: 'birth', error: 'requerido' });
            if (errors.length)
                throw errors;
            typeorm_1.getRepository(person_1.Person).merge(person, req.body);
            const rpt = yield typeorm_1.getRepository(person_1.Person).save(person);
            return res.json(rpt);
        }
        return res.status(404).json({ msg: 'Persona no encontrada' });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const person = yield typeorm_1.getRepository(person_1.Person).delete(req.params.id);
    if (person.raw.affectedRows > 0) {
        return res.json({ msg: `La persona con el id ${req.params.id} eliminada` });
    }
    else {
        return res.status(404).json({ msg: 'Persona no encontrada' });
    }
});
