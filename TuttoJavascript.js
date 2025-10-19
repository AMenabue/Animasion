
//Javascript per il popup
$(document).ready(function(){

    // function to close our popups
    function closePopup(){
        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
    }
  
    // hide popup when user clicks anywhere outside the container
    $('.overlay-bg').click(function(){
        closePopup();
    });
    
    // hide the popup when user presses the esc key
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // if user presses esc key
            closePopup();
        }
    });
});



//Javascript per tutto il resto:

var array=[], arrayid=[], arrayagg=[], volte=0, tutti=[];
//array= animali selezionati  /  arrayid= animali con cui ha incroci /  arrayagg= incroci aggiuntivi


//Funzione al click per il cambio dell'icona e la scelta dell'incrocio
function changeImage(idselezione) {

	if(volte == 0){
		volte++;
		array[0] = idselezione;
        document.getElementById(idselezione).src = './icone/selezionato/' +idselezione +'.png';
		selezione(idselezione, true);  
	}
	
	else if(volte == 1 && array[0] == idselezione){
		volte = 0;
		array[0] = null;
        document.getElementById(idselezione).src = './icone/' +idselezione +'.png';
		selezione(idselezione, false);
	}
	
	else if(volte == 1 && array[0] != idselezione){
		array[1] = idselezione;
		
		popup(array); //visualizzazione dell'incrocio

		//reset icone e variabili
		selezione(array[0], false);
		tuttiResetIcons();
		volte = 0;
		array = [];
	}
}


//Funzione per oscurare le icone con cui l'animale non ha incroci e renderle non interagibili
function oscura(n, arrayid, bool){
	var bool2, el;
	
	for(i=0; i<31; i++){
		
		bool2 = false;
		
		for(j=0; j<n; j++){
			
			if(tutti[i] == arrayid[j]){
				bool2 = true;
				break;
			}
		}
		
		if(bool2 == false  && bool == true){

			document.getElementById(tutti[i]).src = './icone/oscurato/' +tutti[i]+ '.png';		//cambia icona
			
			el= document.getElementById(tutti[i])  //rende l'icona non cliccabile
            el._onclick = el.onclick;
            el.onclick = null;
			
			mouse(tutti[i],false); 			//toglie l'onmouseover
		}
		
		else if(bool2 == false  && bool == false){
			
			document.getElementById(tutti[i]).src = './icone/' +tutti[i] +'.png';		//cambia icona
		
			el= document.getElementById(tutti[i])		//rende l'icona cliccabile
			el.onclick = el._onclick;
            el._onclick = null;
			
			mouse(tutti[i],true);			//rimette l'onmouseover
		}		
	}
}

	
//Funzione per aggiungere o eliminare le scelte aggiuntive 
function setImageVisible(n, aggid, visible) {

	var p = document.getElementById("testo");
	p.style.visibility = (visible == true ? 'visible' : 'hidden'); 
	
	if(visible == true){
		
		for(i=0; i<n; i++){			//aggiunge le icone, setta onmouseover e onclick
	
			var elem = document.createElement( "img" );
			elem.src = './icone/' + aggid[i] + '.png';
			elem.setAttribute('id', aggid[i]);
			document.getElementById("agguntivi").appendChild(elem);

			document.getElementById(aggid[i]).onclick = function(){ changeImage(this.id);};

			mouse(aggid[i], true);
		}
	}
	
	else{
		for(i=0; i<n; i++)	{
			document.getElementById("agguntivi").removeChild(document.getElementById(aggid[i]));	//rimuove le icone create
	}	}
}


//Funzione non mia per applicare il filtro scuro e mostrare il popup
	function showPopup(){
        var docHeight = $(document).height(); //grab the height of the page
        var scrollTop = $(window).scrollTop(); //grab the px value from the top of the page to where you're scrolling
        $('.overlay-bg').show().css({'height' : docHeight}); //display your popup background and set height to the page height
        $('.popup1').show().css({'top': scrollTop+15+'%'}); //show the popup and set the content 200px from the window top
    }
	

//Funzione per settare a seconda delle situazioni onmouseover e cambiare il cursore del mouse
function mouse(id,bool) {

	if (bool== true){
	document.getElementById(id).style.cursor = "pointer" ;
	document.getElementById(id).title = id ;
	}
	
	else{
	document.getElementById(id).style.cursor = "default" ;
	document.getElementById(id).title = "" ;
	}
}
	
	
//Funzione per scegliere, se necessario, randomicamente una fra le varie combinazioni dello stesso incrocio
function seleincrocio(n, anim, nome){
	
	document.getElementById("incrocio2").innerHTML = nome ;  	//nome dell'incrocio
	
	if(n > 1){
		
		var ran = Math.floor((Math.random() * n) + 1)
		document.getElementById("incrocio").src = './Incroci/' + anim[0] + "-" + anim[1] + ran +'.jpg';
	}
	
	else	//{
		document.getElementById("incrocio").src = './Incroci/' + anim[0] + "-" + anim[1] +'.jpg';
	//}
}


//Funzione all'apertura della pagina che setta la funzione mouse() per tute icone
function tuttiOnLoad(){
	
	tutti = ["aquila", "ariete", "bradipo", "bufalo", "camaleonte", "cane", "cavallo", "cervo,renna", "coniglio", "criceto", 
				"elefante", "foca", "gallo", "gatto", "gufo", "ippopotamo", "leone", "maiale", "orso", "panda", "papera", 
				"pecora", "pinguino", "rana", "riccio", "scimmia", "scoiattolo", "tigre", "topo", "uccello", "volpe" ] ;

	for(i = 0; i<31; i++) //{
		mouse(tutti[i], true);
		//}
}

function tuttiResetIcons(){
	for(i = 0; i<31; i++) //{
		document.getElementById(tutti[i]).src = './icone/' +tutti[i] +'.png';
		//}
	
}


	
//Dato id dell'animale, passa ad altre funzioni gli id di animali con cui ha incroci e se necessario gli id delle scelte aggiuntive
function selezione(id, bool) {

	switch(id) {
		case 'aquila':
			arrayid = ["aquila", "cane", "cavallo", "cervo,renna", "coniglio", "criceto", "rana", "riccio"];
			oscura(8, arrayid, bool);
			arrayagg = ["rinoceronte"];
			setImageVisible(1, arrayagg, bool);
			break;
		
		case 'ariete':
			arrayid = ["ariete", "uccello", "volpe"];
			oscura(3, arrayid, bool);
			break;
			
		case 'bradipo':
			arrayid = ["bradipo", "gufo", "topo"];
			oscura(3, arrayid, bool);
			arrayagg = ["koala"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'bufalo':
			arrayid = ["bufalo", "cane", "rana", "tigre"];
			oscura(4, arrayid, bool);
			break;
			
		case 'camaleonte':
			arrayid = ["camaleonte", "cane", "elefante", "gatto"];
			oscura(4, arrayid, bool);
			arrayagg = ["cavalletta"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'cane':
			arrayid = ["aquila", "bufalo", "camaleonte", "cane", "cavallo", "cervo,renna", "coniglio", "criceto", "foca", "gatto", "gufo", "maiale", "orso", "pecora", "pinguino", "scimmia", "topo", "uccello"];
			oscura(18, arrayid, bool);
			arrayagg = ["cammello","castoro", "orca", "pappagallo", "serpente", "squalo", "tartaruga", "tricheco"];
			setImageVisible(8, arrayagg, bool);
			break;
			
		case 'cavallo':
			arrayid = ["aquila", "cane", "cavallo", "conigio", "ippopotamo", "papera"];
			oscura(6, arrayid, bool);
			arrayagg = ["cigno", "serpente", "squalo", "zebra"];
			setImageVisible(4, arrayagg, bool);
			break;
			
		case 'cervo,renna':
			arrayid = ["aquila", "cane", "cervo,renna", "foca", "gufo", "orso", "uccello"];
			oscura(7, arrayid, bool);
			break;
			
		case 'coniglio':
			arrayid = ["aquila", "cane", "cavallo", "coniglio", "maiale", "papera", "topo", "uccello"];
			oscura(8, arrayid, bool);
			break;
			
		case 'criceto':
			arrayid = ["aquila", "cane", "criceto", "leone", "uccello"];
			oscura(5, arrayid, bool);
			break;
			
		case 'elefante':
			arrayid = ["camaleonte", "elefante", "papera", "uccello"];
			oscura(4, arrayid, bool);
			arrayagg = ["farfalla"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'foca':
			arrayid = ["cane", "cervo,renna", "foca", "gatto", "orso", "pinguino", "uccello"];
			oscura(7, arrayid, bool);
			break;
			
		case 'gallo':
			arrayid = ["gallo", "gatto"];
			oscura(2, arrayid, bool);
			arrayagg = ["rinoceronte"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'gatto':
			arrayid = ["camaleonte", "cane", "foca", "gallo", "gatto", "gufo", "pinguino", "riccio", "scimmia"];
			oscura(9, arrayid, bool);
			arrayagg = ["castoro", "lama", "lucertola", "pesce", "struzzo"];
			setImageVisible(5, arrayagg, bool);
			break;
			
		case 'gufo':
			arrayid = ["bradipo", "cane", "cervo,renna", "gatto", "gufo", "leone", "panda", "scimmia", "scoiattolo", "tigre"];
			oscura(10, arrayid, bool);
			arrayagg = ["castoro", "procione"];
			setImageVisible(2, arrayagg, bool);
			break;
			
		case 'ippopotamo':
			arrayid = ["cavallo", "ippopotamo", "rana", "riccio", "topo"];
			oscura(5, arrayid, bool);
			arrayagg = ["granchio"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'leone':
			arrayid = ["criceto", "gufo", "leone"];
			oscura(3, arrayid, bool);
			arrayagg = ["ape"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'maiale':
			arrayid = ["cane", "coniglio", "maiale", "pecora", "pinguino"];
			oscura(5, arrayid, bool);
			break;
			
		case 'orso':
			arrayid = ["cane", "cervo,renna", "foca", "orso", "pinguino", "scimmia"];
			oscura(6, arrayid, bool);
			arrayagg = ["squalo", "struzzo", "tricheco"];
			setImageVisible(3, arrayagg, bool);
			break;
			
		case 'panda':
			arrayid = ["gufo", "panda", "scimmia", "uccello"];
			oscura(4, arrayid, bool);
			break;
			
		case 'papera':
			arrayid = ["cavallo", "coniglio", "elefante", "papera"];
			oscura(4, arrayid, bool);
			arrayagg = ["coccodrillo"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'pecora':
			arrayid = ["cane", "maiale", "pecora"];
			oscura(3, arrayid, bool);
			break;
			
		case 'pinguino':
			arrayid = ["cane", "foca", "gatto", "maiale", "orso", "pinguino"];
			oscura(6, arrayid, bool);
			arrayagg = ["orca"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'rana':
			arrayid = ["aquila", "bufalo", "ippopotamo", "rana", "tigre"];
			oscura(5, arrayid, bool);
			arrayagg = ["mosca", "zebra"];
			setImageVisible(2, arrayagg, bool);
			break;
			
		case 'riccio':
			arrayid = ["aquila", "gatto", "ippopotamo", "riccio"];
			oscura(4, arrayid, bool);
			break;
			
		case 'scimmia':
			arrayid = ["cane", "gatto", "gufo", "orso", "panda", "scimmia", "topo", "uccello"];
			oscura(8, arrayid, bool);
			break;
			
		case 'scoiattolo':
			arrayid = ["gufo", "scoiattolo", "tigre"];
			oscura(3, arrayid, bool);
			arrayagg = ["tucano"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'tigre':
			arrayid = ["bufalo", "gufo", "rana", "scoiattolo", "tigre", "topo", "uccello"];
			oscura(7, arrayid, bool);
			arrayagg = ["lupo"];
			setImageVisible(1, arrayagg, bool);
			break;
			
		case 'topo':
			arrayid = ["bradipo", "cane", "coniglio", "ippopotamo", "scimmia", "tigre", "topo"];
			oscura(7, arrayid, bool);
			break;
			
		case 'uccello':
			arrayid = ["ariete", "cane", "cervo,renna", "coniglio", "criceto", "elefante", "foca", "gatto", "panda", "scimmia", "tigre", "uccello", "volpe"];
			oscura(13, arrayid, bool);
			arrayagg = ["coccodrillo", "giraffa", "orca"];
			setImageVisible(3, arrayagg, bool);
			break;
			
		case 'volpe':
			arrayid = ["ariete", "uccello", "volpe"];
			oscura(3, arrayid, bool);
			break;
			
		default:
			alert("opzione default switch, se appare questo c'è qualcosa di sbagliato");

	} 
}



//Funzione per far comparire il popup con l'immagine dell'incrocio ed il relativo nome
function popup(arr){
	
	var array2 = arr.slice(0);		//copia l'array
	array2.sort();					//ordina alfanumericamente l'array
	
	var bestia = array2[0]+"-"+array2[1];
	
	switch(bestia) {
	
	//Ape
		case 'ape-leone':
			seleincrocio(1, array2, "Apeone")
			break;
			
			
	//Aquila
		case 'aquila-riccio':
			seleincrocio(1, array2, "Riquila")
			break;
			
		case 'aquila-rinoceronte':
			seleincrocio(1, array2, "Aqueronte")
			break;
			
		case 'aquila-cane':
			seleincrocio(1, array2, "Aquilane")
			break;
			
		case 'aquila-cavallo':
			seleincrocio(1, array2, "Aquallo")
			break;
			
		case 'aquila-cervo,renna':
			seleincrocio(1, array2, "Cervila")
			break;
			
		case 'aquila-coniglio':
			seleincrocio(1, array2, "Aquiglio")
			break;
			
		case 'aquila-criceto':
			seleincrocio(1, array2, "Aquileto")
			break;
			
		case 'aquila-rana':
			seleincrocio(1, array2, "Aquilana")
			break;

			
	//Ariete
		case 'ariete-uccello':
			seleincrocio(1, array2, "Ariello")
			break;
			
		case 'ariete-volpe':
			seleincrocio(1, array2, "Alpe")
			break;
			
			
	//Bradipo
		case 'bradipo-topo':
			seleincrocio(1, array2, "Bratopo")
			break;
			
		case 'bradipo-gufo':
			seleincrocio(3, array2, "Bradufo")
			break;
			
		case 'bradipo-koala':
			seleincrocio(1, array2, "Koadipo")
			break;
			
			
	//Bufalo
		case 'bufalo-cane':
			seleincrocio(2, array2, "Bufane")
			break;
			
		case 'bufalo-rana':
			seleincrocio(1, array2, "Rafalo")
			break;
			
		case 'bufalo-tigre':
			seleincrocio(1, array2, "Tigralo")
			break;
			
			
	//Camaleonte
		case 'camaleonte-cane':
			seleincrocio(1, array2, "Caneonte")
			break;
			
		case 'camaleonte-cavalletta':
			seleincrocio(1, array2, "Camalletta")
			break;
			
		case 'camaleonte-elefante':
			seleincrocio(1, array2, "Elefeonte")
			break;
			
		case 'camaleonte-gatto':
			seleincrocio(1, array2, "Gattonte")
			break;
			
			
	//Cammello
		case 'cammello-cane':
			seleincrocio(1, array2, "Camcan")
			break;
			
			
	//Cane				
		case 'cane-gufo':
			seleincrocio(1, array2, "Cangufo")
			break;
			
		case 'cane-scimmia':
			seleincrocio(2, array2, "Scimmiane")
			break;
			
		case 'cane-topo':
			seleincrocio(1, array2, "Canetop")
			break;
			
		case 'cane-castoro':
			seleincrocio(1, array2, "Castane")
			break;
			
		case 'cane-cavallo':
			seleincrocio(1, array2, "Canallo")
			break;
			
		case 'cane-cervo,renna':
			seleincrocio(1, array2, "Carenna")
			break;
			
		case 'cane-coniglio':
			seleincrocio(1, array2, "Caniglio")
			break;
			
		case 'cane-criceto':
			seleincrocio(1, array2, "Cricane")
			break;
			
		case 'cane-foca':
			seleincrocio(4, array2, "Focane")
			break;
			
		case 'cane-gatto':
			seleincrocio(1, array2, "Catto")
			break;
			
		case 'cane-maiale':
			seleincrocio(1, array2, "Maiacane")	
			break;
			
		case 'cane-orca':
			seleincrocio(1, array2, "Orcane")
			break;
			
		case 'cane-orso':
			seleincrocio(2, array2, "Canorso")
			break;
			
		case 'cane-pappagallo':
			seleincrocio(1, array2, "Canagallo")
			break;
			
		case 'cane-pecora':
			seleincrocio(2, array2, "Canecora")
			break;
			
		case 'cane-pinguino':
			seleincrocio(1, array2, "Caninguino")
			break;
			
		case 'cane-scimmia':
			seleincrocio(1, array2, "Canimmia")
			break;
			
		case 'cane-serpente':
			seleincrocio(1, array2, "Canerpente")
			break;
			
		case 'cane-squalo':
			seleincrocio(2, array2, "Squane")
			break;
			
		case 'cane-tartaruga':
			seleincrocio(1, array2, "Cartaruga")
			break;
			
		case 'cane-tricheco':
			seleincrocio(1, array2, "Cantricheco")
			break;
			
		case 'cane-uccello':
			seleincrocio(18, array2, "Uccellane")
			break;
			
			
	//Capra
		case 'capra-orso':
			seleincrocio(1, array2, "Caprorso")
			break;
			
			
	//Castoro
		case 'castoro-gatto':
			seleincrocio(1, array2, "Castoratto")
			break;
			
		case 'castoro-gufo':
			seleincrocio(1, array2, "Gufastoro")
			break;
			
			
	//Cavallo
		case 'cavallo-cigno':
			seleincrocio(1, array2, "Cavalligno")
			break;
			
		case 'cavallo-coniglio':
			seleincrocio(1, array2, "Caviglio")
			break;
			
		case 'cavallo-ippopotamo':
			seleincrocio(1, array2, "Cavallopotamo")
			break;
			
		case 'cavallo-papera':
			seleincrocio(1, array2, "Cavapera")
			break;
			
		case 'cavallo-serpente':
			seleincrocio(1, array2, "Serpallo")
			break;
			
		case 'cavallo-squalo':
			seleincrocio(1, array2, "Squavallo")
			break;
		
		case 'cavallo-zebra':
			seleincrocio(2, array2, "Zebrallo")
			break;
			
			
	//Cervo,renna
		case 'cervo,renna-foca':
			seleincrocio(1, array2, "Forvo")
			break;
			
		case 'cervo,renna-gufo':
			seleincrocio(1, array2, "Gurvo")
			break;
			
		case 'cervo,renna-orso':
			seleincrocio(1, array2, "Cervorso")
			break;
			
		case 'cervo,renna-uccello':
			seleincrocio(1, array2, "Cervello")
			break;
			
			
	//Coccodrillo
		case 'coccodrillo-papera':
			seleincrocio(1, array2, "Coccopera")
			break;
			
		case 'coccodrillo-uccello':
			seleincrocio(1, array2, "Coccodrello")
			break;
			
			
	//Coniglio
		case 'coniglio-maiale':
			seleincrocio(1, array2, "Maniglio")
			break;
			
		case 'coniglio-papera':
			seleincrocio(1, array2, "Papiglio")
			break;
			
		case 'coniglio-topo':
			seleincrocio(1, array2, "Topiglio")
			break;
			
		case 'coniglio-uccello':
			seleincrocio(2, array2, "Conigliello")
			break;
			
			
	//Criceto
		case 'criceto-leone':
			seleincrocio(1, array2, "Criceone")
			break;
			
		case 'criceto-uccello':
			seleincrocio(1, array2, "Uccelleto")
			break;
			
			
	//Elefante
		case 'elefante-farfalla':
			seleincrocio(1, array2, "Farfante")
			break;
			
		case 'elefante-papera':
			seleincrocio(1, array2, "Elefapera")
			break;
			
		case 'elefante-uccello':
			seleincrocio(1, array2, "Elefello")
			break;
			
			
	//Foca			
		case 'foca-gatto':
			seleincrocio(1, array2, "Fotto")
			break;
			
		case 'foca-orso':
			seleincrocio(1, array2, "Foso")
			break;
			
		case 'foca-pinguino':
			seleincrocio(1, array2, "Fonguino")
			break;
			
		case 'foca-uccello':
			seleincrocio(1, array2, "Foello")
			break;
			
			
	//Formica
		case 'cane':
			seleincrocio(1, array2, "Formbra")
			break;
			
			
	//Gallo
		case 'gallo-gatto':
			seleincrocio(1, array2, "Gatallo")
			break;
			
		case 'gallo-rinoceronte':
			seleincrocio(1, array2, "Galloronte")
			break;
			
			
	//Gatto
		case 'gatto-gufo':
			seleincrocio(1, array2, "Gafo")
			break;
			
		case 'gatto-scimmia':
			seleincrocio(10, array2, "Scimmatto")
			break;
			
		case 'gatto-uccello':
			seleincrocio(1, array2, "Gaello")
			break;
			
		case 'gatto-lama':
			seleincrocio(1, array2, "Latto")
			break;
			
		case 'gatto-lucertola':
			seleincrocio(1, array2, "Gaertola")
			break;
			
		case 'gatto-pesce':
			seleincrocio(1, array2, "Gasce")
			break;
			
		case 'gatto-pinguino':
			seleincrocio(1, array2, "Pinguatto")
			break;
			
		case 'gatto-riccio':
			seleincrocio(2, array2, "Gaccio")
			break;
			
		case 'gatto-struzzo':
			seleincrocio(1, array2, "Strutto")
			break;
			
			
	//Giraffa
		case 'giraffa-uccello':
			seleincrocio(1, array2, "Girallo")
			break;
			
			
	//Granchio
		case 'granchio-ippopotamo':
			seleincrocio(1, array2, "Granotamo")
			break;
			
			
	//Gufo
		case 'gufo-scimmia':
			seleincrocio(2, array2, "Gummia")
			break;
			
		case 'gufo-leone':
			seleincrocio(1, array2, "Guone")
			break;
			
		case 'gufo-panda':
			seleincrocio(1, array2, "Gunda")
			break;
			
		case 'gufo-procione':
			seleincrocio(2, array2, "Gucione")
			break;
			
		case 'gufo-scoiattolo':
			seleincrocio(1, array2, "Guiattolo")
			break;
			
		case 'gufo-tigre':
			seleincrocio(1, array2, "Gugre")
			break;
			
			
	//Ippopotamo
		case 'ippopotamo-rana':
			seleincrocio(2, array2, "Ippopona")
			break;
			
		case 'ippopotamo-riccio':
			seleincrocio(1, array2, "Ippoccio")
			break;
			
		case 'ippopotamo-topo':
			seleincrocio(1, array2, "Ippopopo")
			break;
			
			
	//Lupo
		case 'lupo-tigre':
			seleincrocio(1, array2, "Lugre")
			break;
			
			
	//Maiale
		case 'maiale-pecora':
			seleincrocio(1, array2, "Maiara")
			break;
			
		case 'maiale-pinguino':
			seleincrocio(1, array2, "Manguino")
			break;
			
			
	//Mosca
		case 'mosca-rana':
			seleincrocio(1, array2, "Mona")
			break;
			
			
	//Orca
		case 'orca-pinguino':
			seleincrocio(1, array2, "Orcuino")
			break;
			
		case 'orca-uccello':
			seleincrocio(1, array2, "Orcello")
			break;
			
			
	//Orso
		case 'orso-pinguino':
			seleincrocio(1, array2, "Pingorso")
			break;
			
		case 'orso-scimmia':
			seleincrocio(1, array2, "Orimmia")
			break;
								
		case 'orso-squalo':
			seleincrocio(1, array2, "Squarso")
			break;
			
		case 'orso-struzzo':
			seleincrocio(1, array2, "Oruzzo")
			break;
			
		case 'orso-tricheco':
			seleincrocio(1, array2, "Orcheco")
			break;
			
			
	//Panda
		case 'panda-scimmia':
			seleincrocio(1, array2, "Pandimmia")
			break;
			
		case 'panda-uccello':
			seleincrocio(1, array2, "Pandello")
			break;
			
			
	//Rana
		case 'rana-tigre':
			seleincrocio(1, array2, "Ragre")
			break;
			
		case 'rana-zebra':
			seleincrocio(1, array2, "Rabra")
			break;
			
			
	//Scimmia			
		case 'scimmia-uccello':
			seleincrocio(2, array2, "Scimmello")
			break;
			
		case 'scimmia-topo':
			seleincrocio(1, array2, "Tommia")
			break;
			
			
	//Scoiattolo
		case 'scoiattolo-tigre':
			seleincrocio(1, array2, "Scoiagre")
			break;
			
		case 'scoiattolo-tucano':
			seleincrocio(1, array2, "Scoiacano")
			break;
			
			
	//Tigre
		case 'tigre-topo':
			seleincrocio(2, array2, "Togre")
			break;
			
		case 'tigre-uccello':
			seleincrocio(2, array2, "Tiello")
			break;
			
			
	//Uccello
		case 'uccello-volpe':
			seleincrocio(2, array2, "Uccelpe")
			break;
			
	}
	
	showPopup(); 		//dopo aver selezionato l'incrocio, lo visualizza
}
	
