/**
 * Validation JavaScript accessible du formulaire de réservation
 */

document.addEventListener("DOMContentLoaded", () => {
  const formulaire = document.getElementById("form-reservation");
  const messageSucces = document.getElementById("message-succes");
  const succesDetails = document.getElementById("succes-details");

  if (!formulaire) {
    return;
  }

  // Éléments du formulaire
  const champNom = document.getElementById("nom");
  const champEmail = document.getElementById("email");
  const champTelephone = document.getElementById("telephone");
  const champDate = document.getElementById("date");
  const champHeure = document.getElementById("heure");
  const champPersonnes = document.getElementById("personnes");
  const champMessage = document.getElementById("message");
  const messageErreurReseau = document.getElementById("message-erreur-reseau");

  /**
   * Retourne la date du jour au format YYYY-MM-DD
   * Permet de vérifier que la date choisie n'est pas passée
   */
  function obtenirDateAujourdhui() {
    const aujourdhui = new Date();
    const annee = aujourdhui.getFullYear();
    const mois = String(aujourdhui.getMonth() + 1).padStart(2, "0");
    const jour = String(aujourdhui.getDate()).padStart(2, "0");
    return `${annee}-${mois}-${jour}`;
  }

  // Fixe la date minimale sélectionnable sur le calendrier HTML
  if (champDate) {
    champDate.min = obtenirDateAujourdhui();
  }

  /**
   * Affiche une erreur sous un champ et met à jour l'accessibilité
   * @param {HTMLElement} champ - Le champ en erreur
   * @param {string} message - Le message d'erreur explicatif
   */
  function afficherErreur(champ, message) {
    const idErreur = `erreur-${champ.id}`;
    const conteneurErreur = document.getElementById(idErreur);

    champ.classList.add("invalide");
    champ.setAttribute("aria-invalid", "true");

    if (conteneurErreur) {
      conteneurErreur.textContent = message;
    }
  }

  /**
   * Efface l'erreur d'un champ
   * @param {HTMLElement} champ - Le champ à réinitialiser
   */
  function effacerErreur(champ) {
    const idErreur = `erreur-${champ.id}`;
    const conteneurErreur = document.getElementById(idErreur);

    champ.classList.remove("invalide");
    champ.setAttribute("aria-invalid", "false");

    if (conteneurErreur) {
      conteneurErreur.textContent = "";
    }
  }

  /**
   * Validation du champ Nom
   */
  function validerNom() {
    const valeur = champNom.value.trim();
    if (valeur === "") {
      afficherErreur(champNom, "Veuillez renseigner votre nom complet.");
      return false;
    }
    if (valeur.length < 2) {
      afficherErreur(champNom, "Le nom doit comporter au moins 2 caractères.");
      return false;
    }
    effacerErreur(champNom);
    return true;
  }

  /**
   * Validation de l'e-mail avec une expression régulière simple
   * Explication de la regex :
   * ^[^\s@]+ : au moins un caractère sans espace ni arobase au début
   * @        : suivi obligatoirement d'un symbole arobase
   * [^\s@]+  : au moins un caractère sans espace ni arobase pour le domaine
   * \.       : un point obligatoire
   * [^\s@]+$ : l'extension finale du domaine (ex. .fr, .com) sans espace
   */
  function validerEmail() {
    const valeur = champEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valeur === "") {
      afficherErreur(champEmail, "Veuillez indiquer une adresse e-mail.");
      return false;
    }
    if (!regexEmail.test(valeur)) {
      afficherErreur(champEmail, "Format d'e-mail invalide (exemple : nom@exemple.com).");
      return false;
    }
    effacerErreur(champEmail);
    return true;
  }

  /**
   * Validation du numéro de téléphone : exactement 8 chiffres
   * Regex ^\d{8}$ : du début à la fin, exactement 8 chiffres consécutifs
   */
  function validerTelephone() {
    const valeur = champTelephone.value.trim();
    const regexTel = /^\d{8}$/;

    if (valeur === "") {
      afficherErreur(champTelephone, "Veuillez renseigner votre numéro de téléphone.");
      return false;
    }
    if (!regexTel.test(valeur)) {
      afficherErreur(champTelephone, "Le numéro de téléphone doit comporter exactement 8 chiffres.");
      return false;
    }
    effacerErreur(champTelephone);
    return true;
  }

  /**
   * Validation de la date : obligatoire et non antérieure à aujourd'hui
   */
  function validerDate() {
    const valeur = champDate.value;
    const dateAujourdhui = obtenirDateAujourdhui();

    if (valeur === "") {
      afficherErreur(champDate, "Veuillez choisir une date de réservation.");
      return false;
    }
    if (valeur < dateAujourdhui) {
      afficherErreur(champDate, "La date choisie ne peut pas être antérieure à aujourd'hui.");
      return false;
    }
    effacerErreur(champDate);
    return true;
  }

  /**
   * Validation du créneau horaire
   */
  function validerHeure() {
    const valeur = champHeure.value;
    if (valeur === "") {
      afficherErreur(champHeure, "Veuillez sélectionner un créneau horaire.");
      return false;
    }
    effacerErreur(champHeure);
    return true;
  }

  /**
   * Validation du nombre de personnes : entre 1 et 12
   */
  function validerPersonnes() {
    const valeur = parseInt(champPersonnes.value, 10);
    if (isNaN(valeur) || valeur < 1 || valeur > 12) {
      afficherErreur(champPersonnes, "Le nombre de convives doit être compris entre 1 et 12.");
      return false;
    }
    effacerErreur(champPersonnes);
    return true;
  }

  /**
   * Fonction générale qui valide un champ individuel
   */
  function validerChamp(champ) {
    if (champ === champNom) return validerNom();
    if (champ === champEmail) return validerEmail();
    if (champ === champTelephone) return validerTelephone();
    if (champ === champDate) return validerDate();
    if (champ === champHeure) return validerHeure();
    if (champ === champPersonnes) return validerPersonnes();
    return true;
  }

  // Validation immédiate à la perte de focus (événement blur)
  const champsObligatoires = [
    champNom,
    champEmail,
    champTelephone,
    champDate,
    champHeure,
    champPersonnes
  ];

  champsObligatoires.forEach((champ) => {
    if (champ) {
      champ.addEventListener("blur", () => {
        validerChamp(champ);
      });

      // Effacer l'erreur pendant la saisie si le champ était en erreur
      champ.addEventListener("input", () => {
        if (champ.classList.contains("invalide")) {
          validerChamp(champ);
        }
      });
    }
  });

  /**
   * Gestion de la soumission du formulaire
   */
  formulaire.addEventListener("submit", async (event) => {
    // Empêche le rechargement de la page et l'envoi vers un serveur classique
    event.preventDefault();

    const estNomValide = validerNom();
    const estEmailValide = validerEmail();
    const estTelValide = validerTelephone();
    const estDateValide = validerDate();
    const estHeureValide = validerHeure();
    const estPersonnesValide = validerPersonnes();

    const formulaireEstValide =
      estNomValide &&
      estEmailValide &&
      estTelValide &&
      estDateValide &&
      estHeureValide &&
      estPersonnesValide;

    if (!formulaireEstValide) {
      // Placer le focus sur le tout premier champ en erreur
      const premierChampInvalide = formulaire.querySelector(".invalide");
      if (premierChampInvalide) {
        premierChampInvalide.focus();
      }
      return;
    }

    // Récupération des données saisies
    const nomClient = champNom.value.trim();
    const dateChoisie = champDate.value;
    const heureChoisie = champHeure.value;
    const nbPersonnes = parseInt(champPersonnes.value, 10);
    const messageClient = champMessage ? champMessage.value.trim() : "";

    // Bouton de soumission pour gérer l'état de chargement
    const boutonSubmit = formulaire.querySelector(".btn-submit");

    // Initialisation du client Supabase si configuré avec des identifiants réels
    const estSupabaseConfigure =
      typeof SUPABASE_CONFIG !== "undefined" &&
      SUPABASE_CONFIG.url &&
      SUPABASE_CONFIG.anonKey &&
      !SUPABASE_CONFIG.url.includes("votre-projet") &&
      !SUPABASE_CONFIG.anonKey.includes("votre-cle");

    let clientSupabase = null;
    if (window.supabase && typeof window.supabase.createClient === "function" && estSupabaseConfigure) {
      const urlPropre = SUPABASE_CONFIG.url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
      clientSupabase = window.supabase.createClient(urlPropre, SUPABASE_CONFIG.anonKey);
    }

    if (clientSupabase) {
      // Désactiver le bouton pendant la requête réseau
      if (boutonSubmit) {
        boutonSubmit.disabled = true;
        boutonSubmit.textContent = "Enregistrement en cours...";
      }

      try {
        // Insertion asynchrone dans la table 'reservations'
        const { error } = await clientSupabase
          .from("reservations")
          .insert([
            {
              nom: nomClient,
              email: champEmail.value.trim(),
              telephone: champTelephone.value.trim(),
              date_reservation: dateChoisie,
              heure: heureChoisie,
              personnes: nbPersonnes,
              message: messageClient
            }
          ]);

        if (error) {
          throw error;
        }

        // Succès : masquer l'erreur réseau et afficher la confirmation
        if (messageErreurReseau) {
          messageErreurReseau.hidden = true;
        }
        if (succesDetails && messageSucces) {
          succesDetails.textContent = `Merci ${nomClient} ! Votre table pour ${nbPersonnes} personne(s) le ${dateChoisie} à ${heureChoisie} a bien été enregistrée.`;
          messageSucces.hidden = false;
          messageSucces.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Réinitialiser le formulaire
        formulaire.reset();
        champsObligatoires.forEach(effacerErreur);

      } catch (erreurReseau) {
        // En cas d'échec réseau : message d'erreur clair en français
        if (messageSucces) {
          messageSucces.hidden = true;
        }
        if (messageErreurReseau) {
          messageErreurReseau.textContent = "⚠️ Une erreur réseau est survenue lors de l'enregistrement de votre réservation. Veuillez vérifier votre connexion ou réessayer ultérieurement.";
          messageErreurReseau.hidden = false;
          messageErreurReseau.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } finally {
        // Réactiver le bouton
        if (boutonSubmit) {
          boutonSubmit.disabled = false;
          boutonSubmit.textContent = "Confirmer la réservation";
        }
      }
    } else {
      // Repli si Supabase n'est pas initialisé
      if (succesDetails && messageSucces) {
        succesDetails.textContent = `Merci ${nomClient} ! Votre table pour ${nbPersonnes} personne(s) le ${dateChoisie} à ${heureChoisie} a bien été enregistrée.`;
        messageSucces.hidden = false;
        messageSucces.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      formulaire.reset();
      champsObligatoires.forEach(effacerErreur);
    }
  });
});
