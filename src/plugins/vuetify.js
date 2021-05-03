import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#29415d',
                secondary: '#e0bfbf',
                accent: '#ecd660',
                error: '#b71c1c',
            },
        },
    },
});
