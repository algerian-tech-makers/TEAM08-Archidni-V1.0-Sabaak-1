import { useStoreSelector } from "./store";

export const useAuthSelector = () => useStoreSelector((state) => state.auth);

export const useUserSelector = () => useStoreSelector((state) => state.user);
