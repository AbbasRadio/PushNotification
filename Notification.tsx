/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
        } catch (error) {
        }
    }
};

const Notification = () => {
    useEffect(() => {
        checkApplicationPermission();
        PushNotification.getChannels(function (channel_ids) {
            channel_ids.forEach((id) => {
                PushNotification.deleteChannel(id)
            })
        });
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                const { message, title, id } = notification;
                let strTitle: string = JSON.stringify(title).split('"').join('');
                let strBody: string = JSON.stringify(message).split('"').join('');
                const key: string = JSON.stringify(id).split('"').join('');
                PushNotification.createChannel(
                    {
                        channelId: key, // (required)
                        channelName: "remote messasge", // (required)
                        channelDescription: "Notification for remote message", // (optional) default: undefined.
                        importance: 4, // (optional) default: 4. Int value of the Android notification importance
                        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
                    },
                    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
                );
                PushNotification.localNotification({
                    channelId: key, //his must be same with channelid in createchannel
                    title: strTitle,
                    message: strBody,
                });
                console.log('REMOTE NOTIFICATION ==>', notification);

                // process the notification here
            },
            // Android only: GCM or FCM Sender ID
            senderID: '447756757843',
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }, []);
    return null;
};
export default Notification;