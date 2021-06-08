# Pagina's

## Login gedeelte
Deze pagina's zijn bedoeld voor het inloggen en resetten van wachtwoorden.
### Login
Hier wordt ingelogd. 
Wanneer er naar een beveiligde pagina wordt gegaan maar men niet is ingelogd dan wordt de
gebruiker doorgestuurd naar deze pagina.

### PasswordReset
Op deze pagina kan er een email worden gestuurd om het wachtwoord te resetten.

### PasswordResetConfirm
Met een link in de email komt de gebruiker op deze pagina terecht.
In de url wordt het query parameter token meegegeven. 
Dit is een access token om het wachtwoord mee aan te passen.
`/password-reset-confirm?token=...`

### Home
Dit is de homepagina waar de gebruiker een groet - gekoppeld aan de tijd - ziet.
Hier zijn knoppen om naar 'Rooms' te gaan en om naar 'Availability' te gaan. Ook kan de gebruiker hier uitloggen.


## Aanwezigheid gedeelte
### Availability
Deze pagina is er voor het aangeven van de aanwezigheid. 
Hier wordt gebruik gemaakt van de volgende components:
- PresenceCard
- PresenceToggle
- SmallPresenceToggle

#### PresenceCard
PresenceCard is de kaart met daarop een bedrijf met de werknemers en daarbij de aanwezigheid. Ook is hier de mogelijkheid een werknemer te appen of te bellen.\

#### PresenceToggle
PresenceToggle is de knop waarmee de gebruiker zich aan- en afwezig kan melden. SmallPresenceToggle is de kleine versie hiervan.

## Reserving gedeelte
### Rooms
Hier zijn alle vergaderruimtes te zien, en of deze nu beschikbaar zijn. 
Deze worden getoond door middel van component 'RoomCard'.

### Reserve
Dit is de pagina waar de kalender met of zonder afspraken te zien is. Hier kan de gebruiker door dagen/weken heen om te zien of er afspraken zijn.
Als er op de afspraken geklikt wordt, word er informatie over de afspraak en de ruimte getoond. 
Als er bij 'Rooms' op 'Bekijk' gedrukt was is zijn hier alleen de afspraken te zien van die ruimte.

#### ReserveInformation
Dit is de pagina waar de gebruiker de informatie voor de afspraak in kan voeren. 
Het bedrijf is al ingevuld, maar de afspraak kan wel voor iemand anders uit het bedrijf gemaakt worden

#### ReserveConfirmation
Dit is de pagina met een leuk GIFje en informatie over de reservering. Als de browser het mogelijk maakt is hier ook een 'Delen' knop.
Hiermee kan de gebruiker aan anderen laten weten dat het afspraak maken gelukt is.

## Meer
### More
Hier is text te zien die de product owner in directus zet doormiddel van markdown. 