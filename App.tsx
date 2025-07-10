// Importaciones de módulos necesarios
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

// Importaciones de módulos externos
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

// Importaciones de archivos locales
import './src/config'; // Configuración de la aplicación
import store from './src/redux/store'; // Almacenamiento Redux
import App from './src/app'; // Componente principal de la aplicación
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Config from 'react-native-config';
import { setDefaultEventParametersAnalytics } from './src/utils/analyticsUtils';

const ENVIRONMENT = String(Config.ENVIRONMENT);
const IS_ENABLED_APP_DYNAMICS = Boolean(Config.ENABLED_APP_DYNAMICS === 'TRUE');

//Luego activar solo para prod.
analytics().setAnalyticsCollectionEnabled(true);
crashlytics().setCrashlyticsCollectionEnabled(true);
crashlytics().setAttributes({
  module: 'App MAYO',
  version: `${Config.VERSION && Config.VERSION !== '-' ? Config.VERSION : DeviceInfo.getVersion()}`,
  type: 'React Native',
});

// Componente principal de la aplicación
const Index = () => {
  useEffect(() => {
    if (IS_ENABLED_APP_DYNAMICS) {
      (async () => {
        setDefaultEventParametersAnalytics();
      })();
    }
  }, []);

  return (
    // El componente Provider hace que el almacenamiento Redux esté disponible para todos los componentes de la aplicación
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Index;
