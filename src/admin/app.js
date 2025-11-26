import AuthLogo from "./extensions/logo.svg";
import MenuLogo from "./extensions/menu-logo.svg";

const config = {
  locales: [],
  auth: {
    logo: AuthLogo,
  },
  menu: {
    logo: MenuLogo,
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Mumzworld | Telecare",
      "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
      "Auth.form.welcome.title": "Welcome to Telecare Strapi!",
    },
  },
};

export default {
  config,
};
