# Foodle (Rezepte-App)

## Wording 
❤️ Ein Rezept wird Foodle (Plural: Foodles) genannt. Foodle ist Neologismus bestehend aus dem englischem Wort **Food** und **Noodle**.
Eine Sammlung von Foodles wird Spaghetti ___FoodusOpus___ Sammlung oder Feed genannt.

## Installation

1. Vorbereitung
Es wird folgendes benötigt:
* Ein Rechner für den Server. Dazu können alle Rechner verwendet werden, welche mind. 1GB RAM haben, um einen NodeJS-Server hosten zu können. Beispielsweise: Raspberry PI 3 oder 4 oder eine ältere Maschine, welche nicht mehr benötigt wird. Selbstverständlich kann auch der eigene Rechner dafür verwendet werden.
* Server-Umgebung: [NodeJS](https://nodejs.org/) in Kombination mit [NPM](https://www.npmjs.com/package/npm). _Hinweis: NPM wird standardmäßig mit NodeJS automatisch installiert_

2. Github Repositories clonen
Dies kann man mittels [git](https://git-scm.com/) oder über Github per zip-Download durchführen. 
* ```git clone https://github.com/lukasbaumweb/foodle-client.git```
* ```git clone https://github.com/lukasbaumweb/foodle-server-api.git```

3. Foodle Server Umgebungsvariablen setzen
Die Datei ```foodle-node-server/.env.example``` in ```.env``` umbennen und die einzelnen Werte anpassen.
```
# MongoDB Connection-String austauschen
MONGO_URI=mongodb+srv://<username>:<password>@mongoserver.a1a1a1.mongodb.net/<database>?retryWrites=true&w=majority

# foodlicious durch eine willkürlische Zeichenkette ersetzen
JWT_TOKEN=foodlicious
```
4. Foodle Server installieren und starten
Den Ordner foodle-node-server mit angepasster .env-Datei auf dem Wunschrechner platzieren und im Ordner die Befehle nacheinander ausführen:
```npm install``` und ```npm run start```
Anschließend sollte der Server starten und die API ist Abrufbar. Standardmäßig auf: [http://localhost:3100](http://localhost:3100)

Falls der PORT in der .env-Datei angepasst wurde, wird der Server auf [http://localhost:$PORT](http://localhost:$PORT) ($PORT durch den neuen Port austauschen) erreichbar sein. Ansonsten befindet sich immer die Server URL in der ausführenden Befehlszeile (Shell).

5. Foodle Client installieren und konfigurieren
* Im Ordner foodle-client den Befehl: ```npm install``` in der Befehlszeile ausführen.
* Die Datei ```foodle-client/.env.local.example``` in ```foodle-client/.env.local``` umbennen und wie folgt anpassen.

```
REACT_APP_FOODLE_API_URL=<<URL DES SERVERS aus Punkt 4>> + "/api/v1"
```
* Anschließend kann in der Befehlezeile der Build-Befehl ausgeführt werden: ```npm run build```

6. Foodle Client ausliefern

Nach dem Build-Befehl des Foodle Clients sollte, wenn alles richtig verlaufen ist, der Ordner "build" im Ordner foodle-client mit Dateien gefüllt sein. Der Inhalt des Ordners "build" kann nun in den Ordner "public" des Ordners foodle-node-server kopiert werden. Sofern sich alle Dateien einschließlich der index.html im public-Ordner des Servers befinden, kann die Server URL im Browser abgerufen werden. Standardmäßig auf: [http://localhost:3100](http://localhost:3100)

## Ideas

* 🤝 Rezepte mit anderen Benutzern teilen
* 🖼️ Rezpte mit Bilder abspeichern ("Slideshow" mit Nutzerbildern, nicht nur Ersteller)
* 📹 _Ggf. Videos_
* Lokale Speicherung von Rezepten/Einkaufslisten ermöglichen (Momentane Rezepte etc. lokal cachen? / Online-Aktualisierung)
* Mehrere Ansichten (Bücher), nach Kategorien z.B. Nudeln, Kartoffeln oder Italienisch, Türkisch
* Favoriten (Rangliste?)
* Nach Zutaten die man hat suchen oder die man ausschließen will um Rezepte vorgeschlagen zu bekommen
* Einkaufsliste zum abhaken automatisch erstellen nach Rezept
* _Mit vorgeschlagenem Kaufdatum (Zutat mit "frühster Kaufzeitpunkt")_
* Random Wochenplan oder selbst erstellen mit Einkaufsliste logischerweise

* ⭐ Sterne-Bewertung 1-10 (Bzw. Fooooooooodles)
* +Bilder
* _Sortierbarkeit z.B. nach Aufwand (5 Min. = 1 Stern / 2 Std. = 6 Sterne), Schwierigkeit_

## Features

### Features (Must-Have)
* Foodles speichern, bearbeiten, löschen, teilen
  - Name
  - Bilder (Slideshow)
  - Bewertung
  - Zutaten
  - Schwierigkeit
  - Anleitung
- Kategorien
- Favoriten

### Features (Optional)
* Einkaufsliste basiernd auf Gerichten erstellen
* Wochenplan mit Rezepten zu welcher Mahlzeit, welches Gericht erstellt wird
* Rezepte API nutzen, um die eigene Collection zu erweitern 
* Rezept nach Zutaten suchen

## Infrastruktur

### Sprachen
* JavaScript
* Python
* CSS
* HTML
* JSON

### Bibliotheken
* React (Frontend)
* Flask (Backend)

### Datenbank
* MongoDB

### API
* NodeJS (Express) 
* Python (Flask) (Optional)

## ToDos:
Die derzeitig ausstehenden Aufgaben für dieses Projekt wurde in das Repository eigene [Kanban Board](https://github.com/lukasbaumweb/foodle/projects/1) ausgelagert.

# License
MIT License

Copyright (c) 2022 Foodle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
