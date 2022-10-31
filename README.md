# Test Digeiz


## Sujet :

Bonjour Gaël,

Merci encore pour ton temps pour l'entretien téléphonique.

Comme évoqué, voici le lien pour le test technique : https://drive.google.com/open?id=1i_NNRkE8cXJAqU_UJKC8z0e5hJjHfd9l

Le fichier JSON contient des données de trajectoire. On suit le déplacement de plusieurs personnes sur le plan (X,Y). Chaque personne est identifiée par un ID qui lui est propre. Sa position à l’instant t est indiquée par le triplet (time, x, y) mais les données d’une trajectoire ne sont pas ordonnées.

En utilisant React, ainsi que toutes autres librairies qui te paraissent pertinentes, proposer une visualisation du trajet de ces personnes dans le plan (X, Y) ainsi que des grandeurs caractéristiques (par exemple la durée d’un parcours, la vitesse moyenne, le nombre d’arrêts…).

Le livrable souhaité est un repo avec ton code source, ainsi qu’un moyen simple de visualiser le rendu (par exemple un lien vers une plateforme de static hosting après avoir déployé le code - Github Pages, Netlify, Surge…).

Bonne chance !
Julien


## Notes pour la réalisation : 

- à tester sur chrome, et sur un écran large de préférence
- j'ai passé beaucoup plus de temps qu'initialement prévu... je me suis laissé prendre au jeu :) (environ 1.5j de boulot mis bout-à-bout)
- j'ai choisi une approche plutôt bare-bone, avec très peu de librairies externes (à l'exclusion de D3, que je pourrais facilement suprimer, car je n'utilise qu'un utilitaire qui est loin d'être nécéssaire)
- ça n'est toute-fois pas très représentatif de ma manière de coder
    - pas d'historique Git
    - pas de soin apporté l'accessibilité et à la sémantique
    - pas de tests
    - peu d'égard pour la performance
- j'ai plutôt choisi de me concentrer sur le "produit" / les fonctionalités, et l'architecture du code. 
- tips : ce n'est pas imédiatement visible, mais les IDs sont clickables pour laisser apparaitre des infos sur les trajectoires

url de test : https://gael-boyenval.github.io/test-digeiz/

à bientôt,
Gaël