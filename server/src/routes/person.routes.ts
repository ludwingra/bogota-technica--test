import { Router } from "express";

import { getPersons, createPersons, getPerson, updatePersons, deletePerson } from "../controllers/person.controller";

const personRoutes = Router();


personRoutes.get('/persons', getPersons);
personRoutes.get('/persons/:id', getPerson);
personRoutes.post('/persons', createPersons);
personRoutes.put('/persons/:id', updatePersons);
personRoutes.delete('/persons/:id', deletePerson);

export default personRoutes;