var countmenuicon = 0;
var action_utilisateur_gauche = "";
var taille_menu_gauche = ""
var taille_menu_droit = "";
var action_utilisateur_droit = "";
var lg_petit_menu_left = "40px";
var affichage_menu_gauche = "";

function affiche_menu_enfant() {
    if ($(window).width() > 768 ) { //tablette et téléphone
        $("#navbarleft_menus_peres button").hover(function(event){
            $("#navbarleft_menus_enfants").html( $(this).next().html() );
        });   
    } else {
        $("#navbarleft_menus_peres button").click(function(event){ //car hover n'est pas possible sur un téléphone ou une tablette
            $("#navbarleft_menus_enfants").html( $(this).next().html() );
        }); 
    }
}
function afficher_menu_gauche_mobile() {
    //fonction qui affiche le menu gauche sur les mobiles
    if (taille_menu_gauche == "petit") { menu_icon(); }
    $("main").css("left", "0px");

    $("#navbarleft").css("z-index", "1");
    $("#navbarleft").css("left", "0px");
    $("#menu_icon_left").css("display", "none"); //supprime la possibilité de réduire le menu gauche sur mobile

    affichage_menu_gauche = "afficher";
}

function cacher_menu_gauche_mobile() {
    //fonction qui cache le menu gauche sur les mobiles
    if (taille_menu_gauche == "petit") { menu_icon(); }

    $("main").css("left", "0px");

    $("#navbarleft").css("z-index", "1");
    $("#navbarleft").css("left", (taille_menu_gauche == 'petit') ? "-" + lg_petit_menu_left : "-200px"); // condition ? alors : sinon

    affichage_menu_gauche = "cacher";
}

function afficher_menu_gauche_ordi() {
    //fonction qui affiche le menu gauche sur ordi
    $("#menu_icon_left").css("display", "block");

    $("#navbarleft").css("z-index", "auto");
    $("#navbarleft").css("left", "0px");

    //condition ternaire
    $("main").css("left", (taille_menu_gauche == 'petit') ? lg_petit_menu_left : "200px");
   /* if (taille_menu_gauche == 'petit') {
        $("main").css("left", lg_petit_menu_left);
    } else {
        $("main").css("left", "200px");
    }*/

    affichage_menu_gauche = "afficher";
}

function cacher_menu_gauche_ordi() {
    //fonction qui cache le menu gauche sur ordi
    $("#navbarleft").css("z-index", "auto");

    //condition ternaire
    $("#navbarleft").css("left", (taille_menu_gauche == 'petit') ? "-" + lg_petit_menu_left : "-200px"); 
    
    $("main").css("left", "0px");

    affichage_menu_gauche = "cacher";
}
function menu_icon() {
    var menu = $("#navbarleft div");

    $("#menu_icon_left i").toggleClass("fa-angle-left").toggleClass("fa-angle-right");
    $("#navbarleft").css("transition", "width .4s");
    $("main").css("transition", "left .4s");
    if (countmenuicon % 2 == 0) {
        $("#navbarleft").css("width", lg_petit_menu_left);
        $("main").css("left", lg_petit_menu_left);
        $("#navbarleft_menus_peres div[aria-labelledby='dropdownMenuButton']").removeClass("menu_cache");
        $("#navbarleft_menus_enfants").css("display", "none");
        taille_menu_gauche = "petit";
    } else {
        $("#navbarleft").css("width", "200px");
        $("main").css("left", "200px");
        $("#navbarleft_menus_enfants").css("display", "block");
        $("#navbarleft_menus_peres div[aria-labelledby='dropdownMenuButton']").addClass("menu_cache");
        taille_menu_gauche = "grand";
        affiche_menu_enfant();
    }
    countmenuicon++;

    menu.toggleClass("dropdown").toggleClass("dropright");
    menu.children("button").toggleClass("btn").toggleClass("btn-default").toggleClass("dropdown");
    $("#navbarleft div[aria-labelledby='dropdownMenuButton']").toggleClass("dropdown-menu");
    
}

function animation_menus_principaux() {
	$("#bouton_menu_gauche").click(function(event){
        if ($(window).width() > 768) {//ecran est grand, on mémorise l'action de l'utilisateur
            action_utilisateur_gauche = (affichage_menu_gauche == "afficher") ? "l'utilisateur a masque le menu" : ""; //si le menu gauche est affiché et qu'il clique, c'est donc qu'il veut le masquer
        } else {//ecran est petit, on mémorise l'action de l'utilisateur
            action_utilisateur_gauche = (action_utilisateur_gauche == "afficher") ? "" : "l'utilisateur a affiche le menu"; //si le menu gauche est affiché
        }
        $("#action_gauche").val(action_utilisateur_gauche);


        if ($(window).width() > 768) {//ecran ordinateur
            $("main, #navbarleft").css("transition", "left .4s");   
            affichage_menu_gauche == "afficher" ? cacher_menu_gauche_ordi() : afficher_menu_gauche_ordi(); //si le menu gauche est affiché        
        } else {//ecran mobile
            $("main, #navbarleft").css("transition", "left .4s");
            affichage_menu_gauche == "afficher" ? cacher_menu_gauche_mobile() : afficher_menu_gauche_mobile(); //si le menu gauche est affiché
        }
    });

    
	$("#bouton_menu_droit").click(function(event){
        if ($(window).width() > 768 ) {
            if( $("#navbarright").css("right") == '0px' ) {
                action_utilisateur_droit = "l'utilisateur a masque le menu";
            } else {
                action_utilisateur_droit = "";
            }
        } else {
            if ( $("#navbarright").css("right") == '0px' ) {
                action_utilisateur_droit = "";
            } else {
                action_utilisateur_droit = "l'utilisateur a affiche le menu";     
            }
        }

      $("main, #navbarright").css("transition", "right .4s");
      if ( $("#navbarright").css("right") == '0px' ) {
          $("#navbarright").css("right", "-200px");
          $("main").css("right", "0px");
      } else {
          $("#navbarright").css("right", "0px");
          $("main").css("right", "200px");
      }
    });

	$("#menu_icon_left").click(function(event){
        menu_icon();
    });

 
}


//fonction appliquee une fois au chargement de la page
// pour savoir si les menu doivent être visibles
function etat_menu() {
    $("#navbarleft_menus_peres div[aria-labelledby='dropdownMenuButton']").addClass("menu_cache");
    $("#navbarleft_menus_enfants").html( $("#navbarleft_menus_peres button").first().next().html() );
    if ($(window).width() <= 768) {
        $("#navbarright").css("right", "-200px");
        $("main").css("right", "0px");
        cacher_menu_gauche_mobile();
    } else {
        $("#navbarright").css("right", "0px");
        $("main").css("right", "200px");
        afficher_menu_gauche_ordi();
    }
}


//fonction appliquee a chaque changement de la taille de la fenetre(.resize)
//pour rendre visible ou masque les menu droit et gauche
function taille_fenetre() {
    $( window ).resize( function() {
        $("#test_taille").val( $(window).width() );


        if ($(window).width() <= 768) {//ecan pour mobile
            //utilisateur a affiché le menu gauche
          action_utilisateur_gauche == "l'utilisateur a affiche le menu" ? afficher_menu_gauche_mobile() : cacher_menu_gauche_mobile(); 
           
            if(action_utilisateur_droit == "l'utilisateur a affiche le menu"){
                $("#navbarright").css("right", "0px");
                $("main").css("right", "200px");
                
            } else {
                $("#navbarright").css("right", "-200px");
                $("main").css("right", "0px");
              
            }
            
        }else{// ecran pour ordinateur
            if (action_utilisateur_gauche != "l'utilisateur a masque le menu") { afficher_menu_gauche_ordi(); } //donc j'affiche le menu gauche
            
            if (action_utilisateur_droit != "l'utilisateur a masque le menu") {
                $("#navbarright").css("right", "0px");
                $("main").css("right", "200px");
               
            }
        }
    });
}



$(document).ready(function() {
    animation_menus_principaux();
    taille_fenetre();
    etat_menu();
    affiche_menu_enfant();

});


