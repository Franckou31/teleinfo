# Teleinfo version 0.1.0

Ce projet a été largement inspiré par les articles suivants: [Lien1] (http://www.magdiblog.fr/gpio/teleinfo-edf-suivi-conso-de-votre-compteur-electrique/) et [Lien2] (http://hallard.me/teleinfo/)

Il s'agit d'une application permettant de collecter en temps réel les informations de consommation électrique directement à partir de son compteur. 
Le but étant de surveiller sa consommation électrique au jour le jour, d'avoir des statistiques sur la semaine, le mois, l'année écoulée, etc.
Les indices de consommation étant récoltées à intervalles réguliers (toutes les 5 minutes par exemple), puis stockées dans une base MySQL, on peut donc imaginer tout type de rapport ou de statistiques, comme par exemple comparer les consommations entre 2 années.

L'application analyse les indices de consmmation électrique d'un abonnement type tempo (jours bleu/blanc/rouge), mais il pourrait être très facilement adapté à un abonnement type heures pleines / heures creuses.


# Principe

Les informations de consommations électrique sont collectées grâce à un chipset, connecté d'un côté au compteur électrique et de l'autre à une raspberrypi.
Le chipset semble très facile à faire soi-même (cf. liens vers les articles ci-dessus), mais j'ai fait au plus simple et j'ai commandé le [chipset suivant](https://www.tindie.com/products/Hallard/pitinfo/) que j'ai connecté sur une raspberry pi 3.

Une fois, le tout correctement connecté, les informations de consommations sont disponibles sur le port série de la raspberry pi.
Un script python, déclenché par cron toutes les 5 minutes, collecte les données et les stockent dans une base MySQL.

Les statistiques sont alors visualisées via une application Web. L'architecture de l'application est la suivante:

- Côté serveur: Application NodeJS
- Côté client: 
	+ Application type single page
	+ ES6
	+ AngularJS,
	+ jQuery flot pour toutes les fonctions de graphes
	+ bootstrap le design de l'UI.

