var webPush = require('web-push');

const vapidKeys = {
    "publicKey":"BGbBTlL7n9bt2cl3bZKCuBT2vgfAM-KJNTWS6ZAO0MVdNTTQ2LBpKsdazUMME-U-HxShSkewbSz9sYbSlDUzuik",
    "privateKey":"oFKUdKNu8z0vGPZvz68BPEHrhG9e5zS5zPhDAKcilEA"
};

var pushSubscription = {
    "endpoint" : `https://fcm.googleapis.com/fcm/send/d0kAvPB_hiE:APA91bEz8cDNYsNnwJQy75pl9TGIKi7TFEFECzwOt-e6TQBuzUOSzezYoBZ7WRcz-LOyj8lT1_A4iUR2gbelyi9TaPutHFwIh6UgCBdfIvR371HeL95O-xDgh-UzAEBL9gv41TGEmx4H
    `,
    "keys":{
        "p256dh":"BEWI5iyJ3JL/AmBbLexI5oAG4w5FXX6QkK69DYHKIBS4Dqaobio167vZkxIrVgQC+0rz4OSRxJfXvbPB/u3fkBA=",
        "auth":"phyCOP6mhV5ySu9EgZYzcA=="
    }
};

var payload = "Welcome to Once Football";
var options ={
    gcmAPIKey:'185832766372',
    TTL:60
};

webPush.setVapidDetails(
    'mailto:gustiwacik@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
