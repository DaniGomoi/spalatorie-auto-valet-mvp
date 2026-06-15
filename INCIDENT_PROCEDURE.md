# Procedura de incident - MVP Spalatorie Auto Valet Timisoara

Aceasta procedura descrie modul de reactie atunci cand apare un incident in timpul unei comenzi: accident, dauna, intarziere grava, client sau operator in pericol, problema de plata, pierdere chei/documente sau incident de date.

Procedura este inclusa in proiect ca suport operational pentru panoul de administrare.

## Principii

- Siguranta persoanelor are prioritate fata de finalizarea comenzii.
- Operatorul opreste cursa daca exista risc pentru oameni, vehicul sau documente.
- Administratorul salveaza fiecare decizie in logul comenzii.
- Dovezile video si foto se pastreaza conform politicii de retentie.
- Clientul este informat clar si rapid.
- Nicio comanda cu incident nu se sterge fizic din sistem.

## Roluri

- Operator valet: securizeaza situatia, contacteaza dispecerul si colecteaza dovezi.
- Dispecer/Admin: decide urmatorul pas, actualizeaza statusul si comunica intern.
- Client: confirma informatii si primeste statusul incidentului.
- Spalatorie partenera: confirma primirea/finalizarea sau anunta blocaje operationale.

## Niveluri de severitate

### P0 - Siguranta imediata

Exemple: accident rutier, vatamare, pericol pentru persoane, furt vehicul, conflict fizic.

Actiuni:

1. Operatorul opreste in siguranta.
2. Se suna la `112` daca exista risc pentru persoane sau accident relevant.
3. Se contacteaza dispecerul.
4. Comanda se marcheaza ca `issue_reported`.
5. Se pastreaza toate dovezile video/foto.

### P1 - Daune, documente, GDPR

Exemple: dauna descoperita, chei pierdute, documente pierdute, acces neautorizat la poze/video.

Actiuni:

1. Se blocheaza finalizarea comenzii.
2. Administratorul cere dovezi suplimentare.
3. Clientul este informat.
4. Se salveaza eveniment in log.
5. Cazul necesita analiza inainte de inchidere.

### P2 - Blocaj operational

Exemple: intarziere peste 30 minute, spalatorie indisponibila, vehiculul nu porneste, problema de programare.

Actiuni:

1. Operatorul contacteaza dispecerul.
2. Administratorul decide reprogramare, schimbare partener sau retur.
3. Clientul primeste actualizare.
4. Statusul ramane vizibil in log.

### P3 - Clarificare minora

Exemple: intrebare client, status blocat, eroare de afisare, detalii lipsa fara impact operational.

Actiuni:

1. Administratorul rezolva direct daca nu exista risc.
2. Se noteaza in log daca a fost necesara interventie manuala.
3. Comanda continua normal.

## Scenarii uzuale

### Plata nu este confirmata

- Operatorul nu poate prelua vehiculul.
- Administratorul verifica statusul platii.
- Clientul este rugat sa reia checkout-ul daca plata a esuat.

### Lipseste video-ul 360 la preluare

- Vehiculul nu poate fi marcat ca preluat.
- Operatorul incarca video-ul inainte de plecare.
- Administratorul nu poate folosi deblocarea manuala pentru a inlocui dovada video.

### Lipseste video-ul 360 la retur

- Comanda nu poate fi marcata ca livrata.
- Operatorul incarca video-ul de retur.
- Clientul confirma primirea dupa completarea dovezii.

### Dauna observata la retur

- Operatorul face video si poze suplimentare.
- Administratorul compara dovada de preluare cu dovada de retur.
- Se salveaza raportul de audit.
- Comanda ramane in status de incident pana la clarificare.

### Anulare comanda

- Administratorul poate anula doar cu motiv relevant.
- Motivul este salvat in log.
- Comanda ramane vizibila in filtrele de comenzi anulate.

## Informatii care trebuie salvate

- id comanda;
- data si ora incidentului;
- statusul comenzii;
- operatorul implicat;
- spalatoria partenera;
- descrierea incidentului;
- poze/video disponibile;
- actiuni luate;
- comunicare cu clientul;
- decizie finala.

## Observatie

Textul este o procedura operationala pentru MVP. Pentru productie, procedura trebuie revizuita impreuna cu un jurist, un asigurator si partenerii operationali.
