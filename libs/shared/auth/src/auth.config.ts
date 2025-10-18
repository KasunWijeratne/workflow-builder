import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';

export let app: FirebaseApp;

export const initAuth = (config: FirebaseOptions) => {
  app = initializeApp(config);
};
