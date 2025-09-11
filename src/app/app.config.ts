import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideExceptionHandler, provideI18n} from '@parcit/wuf-widgets';
import {provideWufTheme} from '@parcit/wuf-widgets/themes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {Level, provideRootLogger} from '@parcit/wuf-core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideWufTheme(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRootLogger({ level: Level.DEBUG }),
    provideI18n(),
    provideExceptionHandler(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
