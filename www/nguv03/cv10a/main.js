
var emailInput = document.querySelector('input[name="email"]');

var termsAgreedInput = document.querySelector('input[name="terms"]');

var form = document.querySelector('form');

console.log('Agreed', form.elements.namedItem('terms').checked);
console.log('email', form.elements.namedItem('terms').value);
console.log('password', form.elements.namedItem('password').value);



form.addEventListener('submit', function (e) {
    e.preventDefault();
    var loginFormData = {
        terms: form.elements.namedItem('terms').checked,
        email: form.elements.namedItem('email').value,
        password: form.elements.namedItem('password').value,
    };
    console.log(loginFormData);
});


