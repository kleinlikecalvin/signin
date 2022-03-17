import express from "express";

const USERS = new Map();
const router = express.Router();

router.use(express.json(), function logger(req, res, next) {
  console.log(req.method, req.path);
  console.log(req.headers);
  console.log(req.body);
  next();
});

router.get("/", function getAllUsers(req, res) {
  const users = Array.from(USERS.entries()).map(([id, value]) => {
    return {
      id,
      ...value,
    };
  });
  res.send(users);
});

router.get("/:id", function getSingleUser(req, res) {
  const id = req.params.id;
  const user = USERS.get(id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send();
  }
});

router.post("/:id", function createNewUser(req, res) {
  const id = req.params.id;
  const user = req.body;
  if (!user) {
    res.status(400).send();
  } else if (USERS.has(id)) {
    res.status(409).send();
  } else {
    USERS.set(id, user);
    res.status(201).send();
  }
});

router.put("/:id", function updateSingleUser(req, res) {
  const id = req.params.id;
  const userUpdates = req.body;
  if (!userUpdates) {
    res.status(400).send();
  } else if (!USERS.has(id)) {
    res.status(404).send();
  } else {
    const user = USERS.get(id);
    USERS.set(id, { ...user, ...userUpdates });
    res.status(204).send();
  }
});

router.delete("/:id", function deleteSingleUser(req, res) {
  const id = req.params.id;
  if (!USERS.has(id)) {
    res.status(404).send();
  } else {
    USERS.delete(id);
    res.status(204).send();
  }
});
export default router;
