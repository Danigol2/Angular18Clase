import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"recetario-8078e","appId":"1:364566285691:web:5d5c1dbc5928d300ec01de","storageBucket":"recetario-8078e.appspot.com","apiKey":"AIzaSyBOMjqi9EhuVNdkQdQNE_1V4ShRPF_xpew","authDomain":"recetario-8078e.firebaseapp.com","messagingSenderId":"364566285691","measurementId":"G-6N6DPKEB3G"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
