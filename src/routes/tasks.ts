import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Task } from "../models/Task";

const taskRouter = Router();

let tasks: Task[] = [];

const taskValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

taskRouter.get("/", (req: Request, resp: Response) => {
  const task: Task = {
    id: 1,
    title: "First Task",
    description: "First read task",
    completed: true,
  };
  resp.status(200).json(task);
});

taskRouter.post("/", taskValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

export default taskRouter;
