// Textes à l'écran de la vidéo 1 (français). Modifiez ici pour corriger une formulation.
export const video1 = {
  s1: {
    kicker: 'VIDÉO 1',
    title1: 'Commandes internet :',
    title2: 'comprendre le fonctionnement',
    you: 'vous',
  },
  s2: {
    stock: 'Stock web',
    equation: 'Stock du site = *stock du réseau*',
    stores: 'Ce sont les *magasins*\nqui traitent les commandes',
  },
  s3: {
    ranking: 'RANKING',
    centrale: '1. La centrale',
    magasins: '2. Les magasins,\nselon le *classement* établi',
  },
  s4: {
    order: 'Commande',
    majority: 'Un magasin avec tous les produits,\nou la *majorité*',
    rest: 'Le reste est envoyé\nà *un autre magasin*',
    auto: 'automatique',
  },
  s5: {
    title: 'En coulisses',
    subtitle: 'ce qui se passe côté stock',
    flow: 'Validation → Fichier de commande → Odéis',
    check: 'Contrôle de concordance',
    fields: ['N° magasin', 'Réf. fournisseur', 'Réf. Odéis scannée'],
    transfer: 'Transfert automatique vers\nle magasin 101 (*magasin web*)',
    bills: 'Le magasin 101 *intègre* et *facture*',
    multi: 'Multi-produits : tous les produits doivent être\n*scannés* avant l\'envoi à Odéis',
    done: 'Les transferts sont effectués',
  },
  s6: {
    pictos: ['Stock\npartagé', 'Ranking', 'Mise à jour\nautomatique\ndes stocks'],
    next: 'À SUIVRE',
    nextTitle: 'Vidéo 2',
    nextSub: 'Traiter une commande',
  },
};

// Textes à l'écran de la vidéo 2.
export const video2 = {
  s1: {recall: 'Rappel · Vidéo 1', title1: 'Commandes internet :', title2: 'traiter une commande'},
  s2: {
    pc: 'Interface de commande',
    tabs: 'Comporte *3 onglets*',
    aEnvoyer: 'commandes à expédier au client',
    modes: ['Lettre suivie', 'Colissimo domicile\n(signature)', 'Colissimo\npoint relais', 'Chronopost\nExpress'],
    reserve: 'article mis de côté, non réglé',
    client: 'Informations du client',
    valider: 'Valider et imprimer\nle bon de réservation',
    supprimer: 'Supprimer\nla réservation',
    mail: 'e-mail au client',
    cc: 'commande réglée en ligne, retrait en magasin',
    sameAsSend: 'Même traitement que « A envoyer »,\nsans transporteur',
  },
  s3: {
    morning: 'Chaque matin : vérifier\nl\'interface de commande',
    limit: 'Avant *13h* = heure limite\nde demande de ramasse',
    sameDay: 'Demande avant 13h\n→ ramasse l\'après-midi même',
    after: 'Commande après 13h\n→ traitée le lendemain matin',
  },
  s4: {
    causes: ['Produit défectueux', 'Réservé pour\nun autre client', 'Absent du stock\n(étiquetage, inventaire)'],
    cannot: 'Impossible de traiter la commande',
    refuse: 'Refuser puis *Valider*\npour confirmer',
    ranking: 'RANKING',
    nextStore: 'La commande passe au prochain magasin\nqui a le produit, selon le *ranking*',
    onlyBl: 'Click-and-collect :\nbon de livraison uniquement',
  },
  s5: {
    tabs: '3 onglets · 5 étapes',
    steps: ['Ouvrir la\ncommande', 'Retrouver la\nréf. Odéis', 'Chercher le\nproduit', 'Scanner\net valider', 'Imprimer\nles documents'],
    next: 'À SUIVRE',
    nextTitle: 'Vidéo 3',
    nextSub: 'Préparer et expédier un colis',
  },
};
