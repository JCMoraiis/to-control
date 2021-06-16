// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAVc1hxwY2oJaTNvmbHdqbj-fWuYEwk_ME",
  authDomain: "to-control.firebaseapp.com",
  databaseURL: "https://to-control-default-rtdb.firebaseio.com",
  projectId: "to-control",
  storageBucket: "to-control.appspot.com",
  messagingSenderId: "133108795777",
  appId: "1:133108795777:web:3f86cf961b963cd2108080"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

// Cria os listeners dos dados no firebase
var tempRef = db.ref('sala/temperatura');
var umidRef = db.ref('sala/umidade');
var distRef = db.ref('sala/distancia');
var lumRef = db.ref('sala/luminosidade');

var lampRef = db.ref('sala/set_luminosidade');
var setPortaRef = db.ref('sala/set_porta');
var setArRef = db.ref('sala/set_ar');
var setMultimidiaRef = db.ref('sala/set_multimidia');

/** Recebendo dados do firebase */
firebase.database().ref('sala/distancia').on('value', snapshot => {
var distancia = '';
distancia = snapshot.val();
console.log('distancia >>', distancia)
document.getElementById('currentDist').innerText = distancia;
});

firebase.database().ref('sala/temperatura').on('value', snapshot => {
var temperatura = '';
temperatura = snapshot.val();
console.log('temperatura >>', temperatura)
document.getElementById('currentTemp').innerText = temperatura + ' C°';
});

firebase.database().ref('sala/luminosidade').on('value', snapshot => {
var luminosidade = '';
luminosidade = snapshot.val();
console.log('luminosidade >>', luminosidade)
document.getElementById('currentLum').innerText = luminosidade;
});

firebase.database().ref('sala/umidade').on('value', snapshot => {
var umidade = '';
umidade = snapshot.val();
console.log('umidade >>', umidade)
document.getElementById('currentUmid').innerText = umidade;
});



firebase.database().ref('sala/porta').on('value', snapshot => {
let porta = document.querySelector('#porta');
var portaValue = '';
portaValue = snapshot.val();
console.log('porta >>', portaValue);
if (portaValue == '0') {
    porta.src = 'Porta Fechada.png';
    document.getElementById('porta').innerText = 'Porta Fechada';
} else {
    porta.src = 'Porta Aberta.png';
    document.getElementById('porta').innerText = 'Porta Aberta';
}
});


firebase.database().ref('sala/presenca').on('value', snapshot => {
let presenca = document.querySelector('#presenca');
var presencaValue = '';
presencaValue = snapshot.val();
console.log('presenca >>', presencaValue);
if (presencaValue == '1') {
    presenca.src = 'SensorPir ligado.png';
    document.getElementById('presenca').innerText = 'Presença';
} else {
    presenca.src = 'SensorPIR desligado.png';
    document.getElementById('presenca').innerText = 'Ausência';
}
});



// Registrar função ao alterar valor


var currentAr = false;
setArRef.on('value', function(snapshot) {
var value = snapshot.val();
var el = document.getElementById('currentAr');
if (value) {
    el.classList.add('amber-text');
} else {
    el.classList.remove('amber-text');
}
currentAr = !!value;
});


var currentMultimidia = false;
setMultimidiaRef.on('value', function(snapshot) {
var value = snapshot.val();
var el = document.getElementById('currentMultimidia')
if (value) {
    el.classList.add('amber-text');
} else {
    el.classList.remove('amber-text');
}
currentMultimidia = !!value;
});

var currentLampValue = false;
lampRef.on('value', function(snapshot) {
var value = snapshot.val();
var el = document.getElementById('currentLamp')
if (value) {
    el.classList.add('amber-text');
} else {
    el.classList.remove('amber-text');
}
currentLampValue = !!value;
});

var currentSetPorta = false;
setPortaRef.on('value', function(snapshot) {
var value = snapshot.val();
var el = document.getElementById('currentSetPorta')
if (value) {
    el.classList.add('amber-text');
} else {
    el.classList.remove('amber-text');
}
currentSetPorta = !!value;
});

// Registrar função de click
var btnLamp = document.getElementById('btn-lamp');
btnLamp.addEventListener('click', function(evt) {
currentLampValue == true ? lampRef.set(0) : lampRef.set(1);
});

var btnPorta = document.getElementById('btn-porta');
btnPorta.addEventListener('click', function(evt) {
currentSetPorta == true ? setPortaRef.set(0) : setPortaRef.set(1);
});



var btnMultimiidia = document.getElementById('btn-multimidia');
btnMultimiidia.addEventListener('click', function(evt) {
currentMultimidia == true ? setMultimidiaRef.set(0) : setMultimidiaRef.set(1);
});



var btnAr = document.getElementById('btn-ar');
btnAr.addEventListener('click', function(evt) {
currentAr == true ? setArRef.set(0) : setArRef.set(1);
});