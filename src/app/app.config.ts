import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          },
          darkModeSelector: '.dark'
        }
      }
    }),
    provideTranslateService({
      defaultLanguage: 'de',
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'de',
      lang: 'de'
    }),
    ConfirmationService
  ]
};
