/**
 * Filtrage interactif des plats du menu par catégorie
 */

document.addEventListener("DOMContentLoaded", () => {
  const boutonsFiltres = document.querySelectorAll("[data-filtre]");
  const listePlats = document.querySelectorAll(".plat");

  // Sécurité si la page ne contient pas de filtre ou de plats
  if (boutonsFiltres.length === 0 || listePlats.length === 0) {
    return;
  }

  /**
   * Affiche ou masque les plats selon la catégorie sélectionnée
   * @param {string} categorieCible - Nom de la catégorie ('tout', 'entrees', 'plats', etc.)
   */
  function filtrerPlats(categorieCible) {
    listePlats.forEach((plat) => {
      const categoriePlat = plat.getAttribute("data-categorie");

      if (categorieCible === "tout" || categoriePlat === categorieCible) {
        plat.classList.remove("masque");
      } else {
        plat.classList.add("masque");
      }
    });
  }

  /**
   * Met à jour l'état aria-pressed sur les boutons de filtre
   * @param {HTMLElement} boutonActif - Le bouton actuellement sélectionné
   */
  function majBoutonsFiltres(boutonActif) {
    boutonsFiltres.forEach((bouton) => {
      const estActif = bouton === boutonActif;
      bouton.setAttribute("aria-pressed", estActif ? "true" : "false");
    });
  }

  /**
   * Gestionnaire d'événement au clic sur un filtre
   * @param {Event} event - Événement de clic
   */
  function gererClicFiltre(event) {
    const boutonClique = event.currentTarget;
    const categorie = boutonClique.getAttribute("data-filtre");

    majBoutonsFiltres(boutonClique);
    filtrerPlats(categorie);
  }

  // 1. Écouteurs d'événements sur chaque bouton de filtre
  boutonsFiltres.forEach((bouton) => {
    bouton.addEventListener("click", gererClicFiltre);
  });

  // 2. Initialisation : activer 'Tout' au chargement de la page
  const boutonTout = document.querySelector('[data-filtre="tout"]');
  if (boutonTout) {
    majBoutonsFiltres(boutonTout);
    filtrerPlats("tout");
  }
});
