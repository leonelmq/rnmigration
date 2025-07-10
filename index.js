import * as React from 'react';

import {
  AppRegistry,
  LogBox,
  NativeEventEmitter,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import atob from 'core-js-pure/stable/atob';
import btoa from 'core-js-pure/stable/btoa';
import { URL, URLSearchParams } from 'react-native-url-polyfill';
import DeviceInfo from 'react-native-device-info';

if (__DEV__) {
  console.log('Running in dev mode');
}

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.maxFontSizeMultiplier = 1;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.maxFontSizeMultiplier = 1;

const galicia =
  '\n\n_______________________________________________\n\n' +
  ' ██████╗  █████╗ ██╗     ██╗ ██████╗██╗ █████╗ \n' +
  '██╔════╝ ██╔══██╗██║     ██║██╔════╝██║██╔══██╗\n' +
  '██║  ███╗███████║██║     ██║██║     ██║███████║\n' +
  '██║   ██║██╔══██║██║     ██║██║     ██║██╔══██║\n' +
  '╚██████╔╝██║  ██║███████╗██║╚██████╗██║██║  ██║\n' +
  ' ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝╚═╝╚═╝  ╚═╝\n' +
  'v' +
  (Config.VERSION && Config.VERSION !== '-'
    ? Config.VERSION
    : DeviceInfo.getVersion()) +
  ' | ' +
  'Compiled by Equipo Nueva App Mayo' +
  '\n' +
  'On ' +
  new Date().toString() +
  '\n' +
  'En memoria de Fernando Badell <3' +
  '\n_______________________________________________\n\n';
console.log(galicia + '\n');

// Si el entorno de ejecución NO es 'DEVELOPMENT', se desactivan los logs de la consola.
const noop = () => {};
console.warn = noop;
if (Config.NODE_ENV === 'PRODUCTION') {
  console.log = noop;
  console.info = noop;
  console.error = noop;
}

// Se agregan las funciones atob y btoa al objeto global para su uso en todo el código.
global.atob = atob;
global.btoa = btoa;
global.URLSearchParams = URLSearchParams;
global.URL = URL;

// Se agrega la clase Buffer al objeto global para su uso en todo el código.
global.Buffer = require('buffer').Buffer;

// Importaciones de módulos y librerías necesarios para la aplicación.
import App from './App';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import Config from 'react-native-config';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DISPLAY_NOTIFICATION_DEFAULT_TITLE = 'Local Notification';
const DISPLAY_NOTIFICATION_DEFAULT_BODY =
  'This is the Local Notification message example';

// Función para mostrar notificaciones.
const displayNotification = async data => {
  // Intentamos obtener el ID del canal de notificaciones. Si no existe, creamos uno.

  const {
    _mId,
    title,
    body,
    ['media-attachment-url']: mediaAttachmentUrl,
  } = data || {};
  const defaultChannelName = Config.DEFAULT_PUSH_CHANNEL_NAME;

  try {
    // Se obtiene el ID del canal de notificaciones. Si no existe, se crea uno.

    const channelId = await notifee.createChannel({
      id: defaultChannelName,
      name: defaultChannelName,
      importance: AndroidImportance.HIGH, // Establecemos la importancia del canal a HIGH.
    });
    if (data.aps) {
      await notifee.displayNotification({
        id: data?._mId,
        title: data?.aps.alert.title || '',
        body: data?.aps.alert.body || '',
        data: data || {},
        ios: {
          // Add any iOS-specific notification options here
          critical: true,
          attachments: [{ url: data['media-attachment-url'] }],
          interruptionLevel: 'critical', // Ensure the notification is shown immediately,
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
          communicationInfo: {
            conversationId: data?.aps.conversationId || '',
            sender: data?.aps.sender || '',
          },
        },
      });
    } else {
      // Mostramos la notificación.
      await notifee.displayNotification({
        id: _mId, // Usamos el ID del mensaje como ID de la notificación.
        title: title || DISPLAY_NOTIFICATION_DEFAULT_TITLE, // Usamos el título del mensaje o un valor por defecto.
        body: body || DISPLAY_NOTIFICATION_DEFAULT_BODY, // Usamos el cuerpo del mensaje o un valor por defecto.
        data: data || {}, // Pasamos los datos del mensaje.
        android: {
          channelId: channelId, // Usamos el ID del canal que obtuvimos o creamos antes.
          color: '#929292',
          ...(mediaAttachmentUrl && {
            style: {
              type: AndroidStyle.BIGPICTURE, // Si hay una URL de adjunto de medios, usamos el estilo BIGPICTURE.
              picture: mediaAttachmentUrl, // Pasamos la URL del adjunto de medios.
            },
          }),
          importance: AndroidImportance.HIGH, // Establecemos la importancia de la notificación a HIGH.
          smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  } catch (error) {
    console.error('Failed to display notification:', error); // Si hay un error, lo registramos en la consola.
  }
};

// La función getBackgroundNotifications maneja las notificaciones que se reciben cuando la aplicación está en segundo plano.
// 1. Intenta recuperar un array de notificaciones de segundo plano del almacenamiento local utilizando AsyncStorage.getItem. Si no existe tal array, se inicializa uno vacío.
// 2. Crea un nuevo objeto de notificación que contiene la notificación de segundo plano recibida y un indicador de que fue abierta desde el segundo plano.
// 3. Agrega la nueva notificación al array de notificaciones de segundo plano.
// 4. Almacena el array actualizado de notificaciones de segundo plano en el almacenamiento local utilizando AsyncStorage.setItem.
// Si ocurre algún error durante este proceso, se registra en la consola con console.error.
const getBackgroundNotifications = async remoteMessage => {
  try {
    const storedNotifications = await AsyncStorage.getItem(
      'notificationsBackground',
    );
    const backgroundNotis = storedNotifications
      ? JSON.parse(storedNotifications)
      : [];

    // Se crea un nuevo objeto de notificación que indica que la notificación fue abierta desde el segundo plano y contiene el mensaje remoto.
    const newPush = {
      opened_from_background: true,
      remoteMessage: remoteMessage,
    };

    // Se agrega la nueva notificación al array de notificaciones de segundo plano.
    backgroundNotis.push(newPush);

    await AsyncStorage.setItem(
      'notificationsBackground',
      JSON.stringify(backgroundNotis),
    );
    // Si ocurre algún error durante este proceso, se registra en la consola.
  } catch (error) {
    console.error('Failed to get background notifications:', error);
    throw error; // Lanza el error para que pueda ser capturado y manejado por una función superior.
  }
};

// 🎯 Push Click (app en segundo plano o cerrada)
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    console.log(
      '[Push Click - background] User clicked push',
      detail.notification,
    );
    await getBackgroundNotifications(detail);

    // 👇 Solo clic, no garantiza que se abrió la app
  }
});

if (Platform.OS === 'android') {
  // Se configura el manejo de mensajes de Firebase para manejar los mensajes que se reciben cuando la aplicación está en segundo plano.
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage?.data) {
      // Next, we dispatch the event.

      await getBackgroundNotifications(remoteMessage);
      await displayNotification(remoteMessage?.data);
    }
  });
}

// Se configura el manejo de eventos de Notifee para manejar cuando el usuario presiona una notificación.
notifee.onBackgroundEvent(async data => {
  if (data.type === EventType.PRESS) {
    console.log('onBackgroundEvent', data);
    const eventEmitter =
      Platform.OS === 'ios' || Platform.OS === 'macos'
        ? new NativeEventEmitter(messaging())
        : new NativeEventEmitter();
    eventEmitter.emit('push-background', {
      data: data.detail.notification?.data,
      type: 'BACKGROUND',
    });
    await AsyncStorage.setItem(
      'pressedNotificationBackground',
      JSON.stringify(data.notification?.data),
    );
  }
});

const USER_PATH = 'user';

async function checkUser() {
  try {
    const value = await AsyncStorage.getItem(USER_PATH);
    const checkRemember = value ? JSON.parse(value) : false;

    // Si checkRemember es null o no tiene la propiedad 'remember', retorna false
    if (checkRemember) {
      return checkRemember.remember;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return false; // Si ocurre un error, también retornamos false.
  }
}

checkUser().then(result => {
  const eventEmitter =
    Platform.OS === 'ios' || Platform.OS === 'macos'
      ? new NativeEventEmitter(messaging())
      : new NativeEventEmitter();
  eventEmitter.emit('rememberUser', {
    result: result,
  });
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  // Render the app component on foreground launch
  return <App />;
}
// Registrar errores no capturados de JavaScript en Crashlytics.
global.ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.debug('Global handler error:', { error, isFatal });
  crashlytics().recordError(error, 'Global handler error');
});

LogBox.ignoreAllLogs(true); // Se ignoran los logs de notificaciones por mensaje.
// Se registra la aplicación con el nombre 'Galicia'.
AppRegistry.registerComponent('Galicia', () => HeadlessCheck);
if (Config.NODE_ENV === 'PRODUCTION') {
  LogBox.ignoreLogs([' ']); // Se ignoran los logs de notificaciones por mensaje.
}
