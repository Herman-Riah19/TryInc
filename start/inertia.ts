/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia, { InertiaConfig } from '@ioc:EidelLev/Inertia';

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors');
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'));

export const inertia: InertiaConfig = {
  view: 'app'
}