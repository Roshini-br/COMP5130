import React from "react";
import { Restaurant } from "../../models/Restaurant";

interface AppContextType {
  restaurants: Restaurant[] | null;
  setRestaurants: (args: any) => void;
  userId?: string | null;
  setUserId: (args: any) => void;
  shouldForceRerouteToHome: boolean;
  toggleShouldForceRerouteToHome: () => void;
  shouldShowDrawer: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
}

const AppContext = React.createContext<AppContextType>({
  restaurants: null,
  setRestaurants: (args: any) => {},
  userId: null,
  setUserId: (args: any) => {},
  shouldForceRerouteToHome: false,
  toggleShouldForceRerouteToHome: () => {},
  shouldShowDrawer: false,
  showDrawer: () => {},
  hideDrawer: () => {},
});

export default AppContext;
