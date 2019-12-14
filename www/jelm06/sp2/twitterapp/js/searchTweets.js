var apiKey = 'GIBCDzyXVjo8CoMFaYcY3iZDA';
var accessTokenSecret = 'GvaGvsFX4ARNpiEZr5HUMvCkiilb0Fcc2eaKVLWKyIp1J';
var oauth_token = '2310724616-wlSrE6rWPLpUwqfbogHwHt8mWYeELsTmpUHVdHG';
var consumerSecret = 'U34HFC6U0G4cfTWiYzg463NH6HpOcgC1M5hiab2xqTnz8zKGiD';
var bearer = 'AAAAAAAAAAAAAAAAAAAAAF4NBQEAAAAA7H40DfVVveXPcP7eHMaeWF6xooY%3DaSJliDLXsefCSPlcXS93KjEw6GJ7VVDEUHmdg3lVy7cTy9IyKW';
var baseAPIurl = 'https://api.twitter.com/1.1/search/tweets.json?';
var App = App || {};
App.jTweets = $('#tweets')


function genNounce() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let oauth_nonce = genNounce();
let oauth_timestamp = Date.now();

console.log(oauth_nonce);
console.log(oauth_timestamp);

/**
 * These values need to be encoded into a single string which will be used later on. The process to build the string is very specific:
 *  Percent encode every key and value that will be signed.
 *  Sort the list of parameters alphabetically [1] by encoded key [2].
 *  For each key/value pair:
 *      Append the encoded key to the output string.
 *      Append the ‘=’ character to the output string.
 *      Append the encoded value to the output string.
 *      If there are more key/value pairs remaining, append a ‘&’ character to the output string.
 *
 * @param consumerKey
 * @param nonce
 * @param timestamp
 * @param token
 * @returns {string}
 */
function getParametersString(consumerKey, nonce, timestamp, token) {
    let includeEntitiesKey = 'include_entities';
    let includeEntitiesVal = 'true';
    let oauthConsumerKeyKey = 'oauth_consumer_key';
    let oauthConsumerKeyVal = consumerKey;
    let oauthNonceKey = 'oauth_nonce';
    let oauthNonceVal = nonce;
    let oauthSignatureMethodKey = 'oauth_signature_method';
    let oauthSignatureMethodVal = 'HMAC-SHA1';
    let oauthTimestampKey = 'oauth_timestamp';
    let oauthTimestampVal = timestamp;
    let oauthTokenKey = 'oauth_token';
    let oauthTokenVal = token;
    let oauthVersionKey = 'oauth_version';
    let oauthVersionVal = '1.0';


    return encodeURI(includeEntitiesKey) + '=' + encodeURI(includeEntitiesVal) + '&'
        + encodeURI(oauthConsumerKeyKey) + '=' + encodeURI(oauthConsumerKeyVal) + '&'
        + encodeURI(oauthNonceKey) + '=' + encodeURI(oauthNonceVal) + '&'
        + encodeURI(oauthSignatureMethodKey) + '=' + encodeURI(oauthSignatureMethodVal) + '&'
        + encodeURI(oauthTimestampKey) + '=' + encodeURI(oauthTimestampVal) + '&'
        + encodeURI(oauthTokenKey) + '=' + encodeURI(oauthTokenVal) + '&'
        + encodeURI(oauthVersionKey) + '=' + encodeURI(oauthVersionVal);
}

let oauth_params_string = getParametersString(apiKey, oauth_nonce, oauth_token, oauth_timestamp);

/**
 * The three values collected so far must be joined to make a single string, from which the signature will be generated. This is called the signature base string by the OAuth specification.
 * To encode the HTTP method, base URL, and parameter string into a single string:
 *      Convert the HTTP Method to uppercase and set the output string equal to this value.
 *      Append the ‘&’ character to the output string.
 *      Percent encode the URL and append it to the output string.
 *      Append the ‘&’ character to the output string.
 *      Percent encode the parameter string and append it to the output string.
 *
 * @param httpMethod
 * @param url
 * @param paramString
 * @returns {string}
 */
function getSignatureBaseString(httpMethod, url, paramString) {
    return httpMethod.toUpperCase() + '&' + encodeURI(url) + '&' + encodeURI(oauth_params_string);
}

let oauth_signature_base_string = getSignatureBaseString('GET', baseAPIurl, oauth_params_string);

/**
 * The signing key is simply the percent encoded consumer secret, followed by an ampersand character ‘&’, followed by the percent encoded token secret.
 *
 * @param consumerSecret
 * @param tokenSecret
 */
function getSigningKey(consumerSecret, tokenSecret) {
    let encodedConsumerSecret = encodeURI(consumerSecret);
    let encodedTokenSecret = encodeURI(tokenSecret);
    return encodedConsumerSecret + '&' + encodedTokenSecret;
}

let oauth_signing_key = getSigningKey(consumerSecret, accessTokenSecret);

function getSignature() {
    return Crypto.sha1_hmac(oauth_signature_base_string, oauth_signing_key);
}

let signature = getSignature();

console.log(oauth_params_string);

console.log(oauth_signature_base_string);

console.log(signature);

var search = function () {
    console.log('searching for ' + hashtagValue);

    $.ajax({
            url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23WHUARS',
            dataType: 'JSONP',
            headers: {
                'Authorization': 'Oauth',
                'oauth_consumer_key': '"' + apiKey +'"',
                'oauth_nonce': '"' + oauth_nonce + '"',
                'oauth_signature': '"' + signature + '"',
                'oauth_signature_method': "HMAC-SHA1",
                'oauth_timestamp': oauth_timestamp,
                'oauth_token': oauth_token,
                'oauth_version': "1.0",
            },
        }).done(function (response) {
        console.log(response);
    });
}

