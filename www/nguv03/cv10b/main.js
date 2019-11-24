//

var form = document.querySelector('form');

var emailInput = form.elements.namedItem('email');

var passwordInput = form.elements.namedItem('password');

var marriedInput = form.elements.namedItem('married');

var formData = {
    email: form.elements.namedItem('email').value,
    password: form.elements.namedItem('password').value,
    married: form.elements.namedItem('married').checked,
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = {
        email: form.elements.namedItem('email').value,
        password: form.elements.namedItem('password').value,
        married: form.elements.namedItem('married').checked,
        gender: form.elements.namedItem('gender').value,
    };
    console.log(formData);

});