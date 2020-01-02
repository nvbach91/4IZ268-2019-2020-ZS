hello.on('auth.login', function(auth) {
	hello(auth.network).api('me').then(function(r) {
		var label = document.getElementById('profile_' + auth.network);
		if (!label) {
			label = document.createElement('div');
			label.id = 'profile_' + auth.network;
			document.getElementById('profile').appendChild(label);
		}
		label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
	});
});

hello.init({
	google: "34883903985-a1c9693qbbf6jnovs5f9edmlhhha75k3.apps.googleusercontent.com"
};
