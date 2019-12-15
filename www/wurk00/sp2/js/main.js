var feed = new Instafeed({
    get: 'user',
    userId: [user_id],
    accessToken: '[accessToken]',
    resolution: 'low_resolution',
    filter: function(image) {
        return image.tags.indexOf('somehashtag') >= 0;
    }
});
feed.run();

var feed = new Instafeed({
    clientId: '[client_id]',
    get: 'tagged',
    tagName: 'food',
    resolution: 'low_resolution'
});
feed.run();