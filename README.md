# 08.04.2024 - MVC TASKLIST-SERVER - BACKEND (MIT EXPRESS & MONGODB)

---

## PLAN

### 1. Ordnerstruktur

Eine Projektstruktur könnte etwa so aussehen:

```
projekt-wurzel/
│
├── .env
│
|
|── .gitignore
|
|
|── db/
│   ├── connectDB.js
│
|
├── models/
│   ├── taskModel.js
│
|
├── routes/
│   ├── taskRoutes.js
|
|
|
|── controllers/
│   ├── taskController.js
│
│
└── server.js
```

### 2. Endpunkte

| Endpunkt     | Methode | Beschreibung           | mögliche Funktionsnamen |
| ------------ | ------- | ---------------------- | ----------------------- |
| `/tasks`     | GET     | Alle Aufgaben anzeigen | `getAllTasksController` |
| `/tasks`     | POST    | Neue Aufgabe erstellen | `createTaskController`  |
| `/tasks/:id` | PUT     | Aufgabe aktualisieren  | `updateTaskController`  |
| `/tasks/:id` | DELETE  | Aufgabe löschen        | `deleteTaskController`  |

---

## Set-up

1. Node inizialisieren: Node in dein Projekt Ordner inizialisieren mit:

```js
npm init
```

<br>

2. Packages installieren:

- In unserem Fall haben wir 2 Kategorien Packages zu installieren:

  - 1 x normale Dependency
  - 1 x dev Dependency

```js
// normale Dependency
npm install express
npm install cors
npm install dotenv
npm install mongoose

// ODER IN BEAST MODUS: alle auf einmal installieren 🧑🏿‍💻
// npm install express cors dotenv mongoose

```

```js

// dev Dependency
npm install --save-dev nodemon

```

<br>

1. Scripts in `package.json` bearbeiten:

```json
// in package.json
{
  //...
  "scripts": {
    "dev": "nodemon server.js"
  }
  //...
}
```

<br>

4. Server Datei (`server.js`) erstellen

   - In unserem Ordner erstellen wir eine Datei namens `server.js` (manchmal ist auch `app.js` oder `index.js` verwendet)

<br>

5. "main" in `package.json` Datei umbennen

- Wir müssen auch den Namen in der `package.json` umbennen, damit sie zueinander passen

```json
{
  //...
  "main": "server.js"
  //...
}
```

<br>

6. `"type": "module"` in der package.json einfügen

- um ES6 import statements zu verwenden zu können

```json
{
  //...
  "type": "module"
  //...
}
```

---

## In `server.js` arbeiten

7. Nötigen Packages importieren

```js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
```

<br>

8. `dotenv` configuration durchführen

- um die Unterstützung von .env-Dateien zu ermöglichen

```js
dotenv.config();
```

<br>

9. `app` Variabel mit `express()` declarieren

```js
const app = express();
```

<br>

10. `port` Variabel declarieren

```js
const port = process.env.PORT || 5050; // oder ein beliebiger Port
```

<br>

11. Probe endpunkte erstellen

```js
app.get("/", (req, res) => {
  res.send("Hallo von HOME!");
});
```

<br>

12. Listen Port Funktion am Ende deklarieren

```js
app.listen(port, () => {
  console.log("Server läuft auf: ", port);
});
```

<br>

13. Server starten

```js
npm run dev
```

**MIT THUNDER TESTEN !!!**

---

## MVC Ordnerstruktur

### Erstell die benötigte Ordern

- Ordnern laut unser Plan erstellen

- **models**: Beinhaltet alle Modelle (Schema)
- **controllers**: Beinhaltet alle Controller Funktionen
- **routes**: Beinhaltet alle Router
- **database( oder db)**: Beinhaltet alle Datenbank Verbindung

- **🧑🏿‍💻 BEAST MODUS!** ein Commando in Terminal geht's so:

```js
mkdir models controllers routes database

```

---

### `.env-Datei`, `node_modules` und `.gitignore`

1.  erstell ein `.env` Datei (ODER die `.env.example` Datei umbenennen)

2.  erstell ein `.gitignore Datei`
3.  füge die `.env` und `node_modules` order in `.gitignore` ein.

```js
// .gitignore Datei

/node_modules
.env

```

---

## In Controller Ordner

17. estell ein `taskControllers.js` datei
18. füge ein Funktion ein
19. exportier die Funktion

```js
function getAllTasksController(req, res) {
  res.send("Hallo von GET");
}

export { getAllTasksController };
```

---

## In Routes Ordner

20. estell ein `taskRouter.js` datei
21. importiere express
22. importiere alle controller funktionen
23. deklariere ein `taskRouter` Variabeln aus `express.Router()`
24. erstell die verschiedene Endpunkte mit passenden controller Funktionen
25. exportier die Router als `Default Export`

```js
import express from "express";

import { getAllTasksController } from "../controllers/taskControllers.js";

const taskRouter = express.Router();

// get / read
taskRouter.get("/", getAllTasksController);

export default taskRouter;
```

---

## In `server.js`

26. importiere taskRouter.js

```js
import taskRouter from "./routes/taskRouter.js";
```

27. nutze `app.use()` und gib `dem Pfad`als erster Argument

28. füge `den taskRouter` ein

```js
app.use("/tasks", taskRouter);
```

29. Test nochmal ob alles funktioniert

---

## MongoDB und database Ordner

### in `database` Ordner

30. erstell ein `connectDB.js`-Datei in database Ordner

31. importiere mongoose

32. füge eine `connectDB` Funktion ein

33. exportiere der Funktion als Default

```js
import mongoose from "mongoose";

//
const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
```

### in `.env` datei

34. füge ein PORT variable ein
35. füge dein mongoDB connection URL ein

```js
PORT = 5050 // oder ein beliebiger Port


MONGO_URL = mongodb+srv://DEINUSERNAME:PASSWORT@BLABLABLA.mongodb.net/DATENBANKNAME
```

### in server.js

36. importiere connectDB
37. füge den Port mit `process.env.PORT` in dein port Variabel ein
38. erstell ein async startServer Funktion
39. füge deine MONGO_URL ein
40. rufe die startServer Funktion

```js
import connectDB from "./database/connectDB.js";
//
const port = process.env.PORT || 5060;
//
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Verbindung mit MongoDB hat geklappt");
    app.listen(port, () => {
      console.log("Server läuft auf: ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
```

41. Testen!

- server starten

```bash

npm run dev
```

- wenn alles geklappt hat, sollte die Console folgendes ausgeben:

```bash
verbindung mit MONGODB hat geklaptt!
Port läuft auf Port: 5050
```

---

## Model Ordner

42. Importiere mongoose
43. estell ein Schema
44. deklariere ein Model
45. exportiere den Model

```js
import mongoose from "mongoose";

const TaskItemSchema = new mongoose.Schema({
  task: { type: String, required: true },
});

const taskModel = mongoose.model("taskLists", TaskItemSchema);

export default taskModel;
```

---

## in `taskControllers`-Datei

46. `taskModel` importieren

```js
import taskModel from "../model/taskModel.js";
```

47. `CRUD`-Funktionen bei bedarf erstellen und exportieren

```js
function getAllTasksController(req, res) {
  res.send("Hallo von GET");
}

function createTaskController(req, res) {
  res.send("Hallo von POST");
}

function updateTaskController(req, res) {
  res.send("Hallo von PUT");
}

function deleteTaskController(req, res) {
  res.send("Hallo von DELETE");
}

function deleteAllTasksController(req, res) {
  res.send("Hallo von DELETE ALL");
}

export {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  deleteAllTasksController,
};
```

## in `taskRouter`-Datei

48. restliche `Kontroller-Funktionen` importieren
49. passende Router Endpunkte erstellen

```js
import express from "express";

import {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  deleteAllTasksController,
} from "../controllers/taskControllers.js";

const taskRouter = express.Router();

// get / read
taskRouter.get("/", getAllTasksController);

// create / post
taskRouter.post("/", createTaskController);

//update
taskRouter.put("/:taskId", updateTaskController);

// Delete one
taskRouter.delete("/:taskId", deleteTaskController);

// delete all (OPTIONAL und NICHT WÜNSCHENSWERT)
taskRouter.delete("/", deleteAllTasksController);

export default taskRouter;
```

50. ALLE ENDPUNKTE TESTEN!!!!!!

---
