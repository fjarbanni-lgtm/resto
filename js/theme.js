/**
 * Gestion du mode clair / sombre avec mémorisation et accessibilité
 */

document.addEventListener("DOMContentLoaded", () => {
  const boutonTheme = document.getElementById("theme-toggle");
  const racineHtml = document.documentElement;
  const CLE_STORAGE = "resto_theme";

  /**
   * Lit la préférence enregistrée dans localStorage avec gestion d'erreur
   * @returns {string|null} 'dark', 'light' ou null
   */
  function lireThemeStocke() {
    try {
      return localStorage.getItem(CLE_STORAGE);
    } catch (erreur) {
      // Cas où le stockage local est bloqué par le navigateur
      return null;
    }
  }

  /**
   * Enregistre le choix de thème dans localStorage avec gestion d'erreur
   * @param {string} theme - 'dark' ou 'light'
   */
  function enregistrerTheme(theme) {
    try {
      localStorage.setItem(CLE_STORAGE, theme);
    } catch (erreur) {
      // Ignore silencieusement si inaccessible
    }
  }

  /**
   * Détecte si le système de l'utilisateur préfère le mode sombre
   * @returns {boolean}
   */
  function preferenceSystemeEstSombre() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  /**
   * Applique le thème spécifié sur le document et met à jour le bouton
   * @param {string} theme - 'dark' ou 'light'
   */
  function appliquerTheme(theme) {
    const estSombre = theme === "dark";

    if (estSombre) {
      racineHtml.setAttribute("data-theme", "dark");
    } else {
      racineHtml.removeAttribute("data-theme");
    }

    // Mise à jour de l'apparence et de l'accessibilité du bouton
    if (boutonTheme) {
      boutonTheme.textContent = estSombre ? "☀️" : "🌙";
      boutonTheme.setAttribute(
        "aria-label",
        estSombre ? "Activer le mode clair" : "Activer le mode sombre"
      );
      boutonTheme.setAttribute("aria-pressed", estSombre ? "true" : "false");
    }
  }

  /**
   * Bascule entre le mode sombre et le mode clair
   */
  function basculerTheme() {
    const themeActuel = racineHtml.getAttribute("data-theme");
    const nouveauTheme = themeActuel === "dark" ? "light" : "dark";

    appliquerTheme(nouveauTheme);
    enregistrerTheme(nouveauTheme);
  }

  // 1. Initialisation au chargement de la page :
  // Priorité au choix mémorisé, sinon à la préférence système
  const themeMémorise = lireThemeStocke();

  if (themeMémorise === "dark" || themeMémorise === "light") {
    appliquerTheme(themeMémorise);
  } else if (preferenceSystemeEstSombre()) {
    appliquerTheme("dark");
  } else {
    appliquerTheme("light");
  }

  // 2. Événement au clic sur le bouton de thème
  if (boutonTheme) {
    boutonTheme.addEventListener("click", basculerTheme);
  }

  // 3. Écoute dynamique d'un changement de préférence système
  // Uniquement si l'utilisateur n'a pas encore fait de choix explicite
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!lireThemeStocke()) {
          appliquerTheme(e.matches ? "dark" : "light");
        }
      });
  }
});
