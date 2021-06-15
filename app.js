<script>
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
  
let porta = document.querySelector('#porta');
let presenca = document.querySelector('#presenca');

firebase.database().ref('sala/porta').on('value', snapshot =>{
	
	let l = snapshot.val();
	
	if(l == '1'){
		porta.src = 'Porta fechada.png';
		porta.setAttribute('data-state', '1');
	} else {
		porta.src = 'Porta Aberta.png';
		porta.setAttribute('data-state', '0');
	}
});

firebase.database().ref('sala/presenca').on('value', snapshot =>{

	let l = snapshot.val();

	if(l == '1'){
		presenca.src = 'SensorPIR ligado.png';
		presenca.setAttribute('data-state', '1');
	} else {
		presenca.src = 'SensorPIR desligado.png';
		presenca.setAttribute('data-state', '0');
	}
});
</script>