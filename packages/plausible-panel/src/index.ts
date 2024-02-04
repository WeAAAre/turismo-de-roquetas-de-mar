import { defineModule } from '@directus/extensions-sdk';

import ModuleComponent from './module.vue';

export default defineModule({
  id: 'plausible-panel',
  name: 'Analíticas',
  icon: 'monitoring',
  routes: [
    {
      path: '',
      component: ModuleComponent,
    },
  ],
});
