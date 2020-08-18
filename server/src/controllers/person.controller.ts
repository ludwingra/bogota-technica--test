import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Person } from "../entity/person";

export const getPersons = async (req: Request, res: Response): Promise<Response> => {
  const persons = await getRepository(Person).find();
  return res.json(persons);
}

export const getPerson = async (req: Request, res: Response): Promise<Response> => {
  const person = await getRepository(Person).findOne(req.params.id);
  return res.json(person);
}

export const createPersons = async (req: Request, res: Response) => {
  try {
    let entrada = req.body;
    let errors = [];

    if (!entrada.name || entrada.name == '') errors.push({ key: 'name', error: 'requerido' });
    if (!entrada.birth || entrada.birth == '') errors.push({ key: 'birth', error: 'requerido' });

    if (errors.length) throw errors;

    const newPerson = getRepository(Person).create(entrada);
    const rpt = await getRepository(Person).save(newPerson);
    return res.json(rpt);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const updatePersons = async (req: Request, res: Response) => {
  try {
    let person = await getRepository(Person).findOne(req.params.id);
    if (person) {

      let errors = [];

      if (!req.body.name || req.body.name == '') errors.push({ key: 'name', error: 'requerido' });
      if (!req.body.birth || req.body.birth == '') errors.push({ key: 'birth', error: 'requerido' });

      if (errors.length) throw errors;

      getRepository(Person).merge(person, req.body);
      const rpt = await getRepository(Person).save(person);
      return res.json(rpt);
    }

    return res.status(404).json({ msg: 'Persona no encontrada' });
  } catch (error) {
    res.status(500).json(error);
  }
}

export const deletePerson = async (req: Request, res: Response): Promise<Response> => {
  const person = await getRepository(Person).delete(req.params.id);
  if (person.raw.affectedRows > 0) {
    return res.json({ msg: `La persona con el id ${req.params.id} eliminada` });
  } else {
    return res.status(404).json({ msg: 'Persona no encontrada' });
  }

}

