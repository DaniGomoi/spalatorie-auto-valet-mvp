# Spalatorie Auto Valet MVP

Aplicatie web/PWA pentru programarea serviciilor de spalatorie auto cu preluare si returnare in Timisoara.

Proiectul demonstreaza un flux operational complet pentru un serviciu de tip valet auto:

- clientul se autentifica demonstrativ si creeaza o comanda;
- clientul incarca documentele necesare pentru vehicul;
- aplicatia compara spalatorii partenere, preturi si timp estimat;
- plata este simulata printr-un flux de checkout extern;
- operatorul preia vehiculul doar dupa incarcarea dovezii video 360;
- spalatoria confirma primirea si finalizarea lucrarii;
- operatorul returneaza vehiculul doar dupa video 360 la retur;
- administratorul vede comenzile, dovezile media, logul operational si procedura de incident.

## Tehnologii folosite

- HTML
- CSS responsive
- JavaScript
- Leaflet + OpenStreetMap pentru harta
- localStorage pentru persistenta demonstrativa
- Node.js pentru server static local

Aplicatia este un MVP local, fara backend de productie. Datele sunt pastrate doar in browser, iar fisierele incarcate sunt tratate demonstrativ.

## Structura proiectului

```text
.
├── index.html
├── manifest.json
├── package.json
├── server.js
├── INCIDENT_PROCEDURE.md
└── src
    ├── app.js
    └── styles.css
```

## Rulare locala

Instaleaza Node.js, apoi ruleaza:

```bash
npm start
```

Aplicatia va fi disponibila la:

```text
http://localhost:4173
```

## Verificare sintaxa

```bash
npm run check
```

Comanda verifica sintaxa pentru:

- `server.js`
- `src/app.js`

## Fluxuri disponibile in aplicatie

### Client

- autentificare demo cu Gmail, iCloud sau email/parola;
- salvare metadate vehicul;
- incarcare documente: talon fata/verso, permis fata/verso, RCA si imputernicire daca proprietarul difera;
- alegere serviciu si interval;
- comparare spalatorii pe harta;
- plata simulata prin provider extern;
- urmarire status comanda.

### Operator

- vizualizare curse disponibile;
- acceptare cursa;
- incarcare video 360 la preluare;
- avansare statusuri;
- contactare dispecer;
- incarcare video 360 la retur.

### Administrator

- vizualizare comenzi active;
- filtrare comenzi si loguri;
- vizualizare video si cadre extrase;
- anulare operationala cu motiv;
- raport audit pentru comanda;
- procedura de incident.

### Spalatorie partenera

- vizualizare masini programate;
- confirmare primire vehicul;
- confirmare finalizare spalare.

## Limitari MVP

- autentificarea este simulata;
- plata este simulata;
- OCR-ul este demonstrativ;
- datele sunt pastrate in localStorage;
- video-urile nu sunt incarcate intr-un storage real;
- rolurile sunt separate la nivel de interfata, nu prin backend.

## Directii de dezvoltare

- backend API;
- baza de date PostgreSQL;
- autentificare OAuth/OIDC;
- storage privat pentru documente si dovezi video;
- integrare reala NETOPIA Payments;
- OCR server-side;
- notificari email/SMS;
- rutare si ETA real;
- audit log server-side.
