var SHEET_ID = '1vDXnwdCsEPEE1gHkdIKu0fraelOI61P9Zqj0d5g9PKA';
var CLIENT_ID = '160814994481-lh5f139ou52jmi9791pss4qdsouqbpmu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBCwH9x9MGUBtIVaHYmQAkj-Ceeu_HDi5c';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listMajors();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}


$('#submission').on('click', function (e) {
    $('.loader').show();
    e.preventDefault();
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbyMn3TxeyHaq0TvSHEwfHJR06yHVxJpr1RwyulFumE5vbwevJY/exec',
        method: "GET",
        dataType: "json",
        data: $('#enquiryForm').serializeObject(),
        success: function (rooms) {
            $('#contactModal').modal('hide');
            $('#contactSuccess').show();
            $('.loader').hide();
        },
        error: function (rooms) {
            $('#contactModal').modal('hide');
            $('#contactError').show();
            $('.loader').hide();
        }
    });
});
