/**
 * Gestion du menu de navigation burger (mobile-first)
 */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const menuPrincipal = document.getElementById("menu-principal");
  const navLinks = document.querySelectorAll("#menu-principal a");

  // Sécurité si les éléments ne sont pas trouvés sur la page
  if (!navToggle || !menuPrincipal) {
    return;
  }

  /**
   * Ouvre le menu de navigation
   */
  function ouvrirMenu() {
    menuPrincipal.classList.add("ouvert");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fermer le menu");
  }

  /**
   * Ferme le menu de navigation
   */
  function fermerMenu() {
    menuPrincipal.classList.remove("ouvert");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  /**
   * Bascule entre l'ouverture et la fermeture du menu
   */
  function basculerMenu() {
    const estOuvert = menuPrincipal.classList.contains("ouvert");
    if (estOuvert) {
      fermerMenu();
    } else {
      ouvrirMenu();
    }
  }

  // 1. Clic sur le bouton burger
  navToggle.addEventListener("click", basculerMenu);

  // 2. Fermeture avec la touche Échap pour l'accessibilité
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuPrincipal.classList.contains("ouvert")) {
      fermerMenu();
      navToggle.focus();
    }
  });

  // 3. Fermeture lors du clic sur un lien de navigation
  navLinks.forEach((lien) => {
    lien.addEventListener("click", () => {
      if (menuPrincipal.classList.contains("ouvert")) {
        fermerMenu();
      }
    });
  });
});
