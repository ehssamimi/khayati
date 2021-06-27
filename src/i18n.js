import i18next from 'i18next';
import translationFa from './locales/fn/translation.json';

i18next
    .init({
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        lng: 'fa',
        resources: {
            en: {
                translation: {
                    age: { label: 'Age', },
                    home: { label: 'Home', },
                    name: { label: 'Name', },
                },
            },
            fa: {
                translation: translationFa
            }
        },
    })

export default i18next