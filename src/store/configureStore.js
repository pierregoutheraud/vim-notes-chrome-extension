import { createStore } from "easy-peasy";
import storage from "../lib/storage";
import model from "./model";

export default async function() {
  const persistedState = await storage.loadState();

  const store = createStore(model, {
    initialState: persistedState,
    devTools: true,
  });

  // We load font from store
  store.dispatch.settings.setFont(store.getState().settings.font);

  store.subscribe(async () => {
    await storage.saveState(store.getState());
  });

  return store;
}
