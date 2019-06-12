var countmenuicon = 0;
var action_utilisateur_gauche = "";
var taille_menu_gauche = ""
var taille_menu_droit = "";
var action_utilisateur_droit = "";
var lg_petit_menu_left = "40px";
var affichage_menu_gauche = "";
var affichage_menu_droit = "";

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
    /*if (affichage_menu_droit == "afficher") {
        cacher_menu_droit_mobile();
    }
    $("#navbarleft").addClass("mobile");
    $("#navbarleft_menus_peres").addClass("mobile");
    if (taille_menu_gauche == "petit") { menu_icon(); }
    $("#menu_icon_left").css("display", "none"); //supprime la possibilité de réduire le menu gauche sur mobile*/

    $("main").css("left", "0px");
    $("#navbarleft").css("left", "-200px");

    /*$("#navbarleft").show('slide', { direction: "left" }, 1000);*/

    $("#test").show('slide', { direction: "left" }, 1000);


    affichage_menu_gauche = "afficher";
}

function cacher_menu_gauche_mobile() { //fonction qui cache le menu gauche sur les mobiles
   /* if (taille_menu_gauche == "petit") { menu_icon(); }
    $("#menu_icon_left").css("display", "none"); //supprime la possibilité de réduire le menu gauche sur mobile*/

    $("main").css("left", "0px");
    $("#navbarleft").css("left", (taille_menu_gauche == 'petit') ? "-" + lg_petit_menu_left : "-200px"); // condition ? alors : sinon
    

    /*$("#navbarleft").addClass("mobile");
    $("#navbarleft_menus_peres").addClass("mobile");
   $("#navbarleft").hide('slide', { direction: "left" }, 1000);*/

    $("#test").hide('slide', { direction: "left" }, 1000);

    affichage_menu_gauche = "cacher";
}

function afficher_menu_gauche_ordi() { //fonction qui affiche le menu gauche sur ordi
    $("#navbarleft").removeClass("mobile");
    $("#navbarleft_menus_peres").removeClass("mobile");

    $("#menu_icon_left").css("display", "block");
    $("#navbarleft").css("left", "0px");

    //condition ternaire
    $("main").css("left", (taille_menu_gauche == 'petit') ? lg_petit_menu_left : "200px");    
    affichage_menu_gauche = "afficher";
    $("#test").show('slide', { direction: "left" }, 1000);

}

function cacher_menu_gauche_ordi() {
    //fonction qui cache le menu gauche sur ordi

    //condition ternaire
    $("#navbarleft").css("left", (taille_menu_gauche == 'petit') ? "-" + lg_petit_menu_left : "-200px"); 
    $("main").css("left", "0px");

    affichage_menu_gauche = "cacher";
    $("#test").hide('slide', { direction: "left" }, 1000);

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

function afficher_menu_droit_mobile() {
    $("main").css("right", "0px");
    $("#navbarright").css("right", "0px");

    affichage_menu_droit = "afficher";

    if (affichage_menu_gauche == "afficher") {
        cacher_menu_gauche_mobile();
    }
}
function cacher_menu_droit_mobile() {
    $("main").css("right", "0px");
    $("#navbarright").css("right", "-200px");

    affichage_menu_droit = "cacher";
}
function afficher_menu_droit_ordi() {
    $("#navbarright").css("right", "0px");
    $("main").css("right", "200px");

    affichage_menu_droit = "afficher";
}
function cacher_menu_droit_ordi() {
    $("#navbarright").css("right", "-200px");
    $("main").css("right", "0px");

    affichage_menu_droit = "cacher";
}




function animation_menus_principaux() {
    $("#bouton_menu_gauche").click(function (event) {
        if ($(window).width() > 768) {//ecran est grand, on mémorise l'action de l'utilisateur
            action_utilisateur_gauche = (affichage_menu_gauche == "afficher") ? "l'utilisateur a masque le menu" : ""; //si le menu gauche est affiché et qu'il clique, c'est donc qu'il veut le masquer
        } else {//ecran est petit, on mémorise l'action de l'utilisateur
            action_utilisateur_gauche = (affichage_menu_gauche == "afficher") ? "" : "l'utilisateur a affiche le menu"; //si le menu gauche est affiché
        }
        $("#action_gauche").val(action_utilisateur_gauche);


        if ($(window).width() > 768) {//ecran ordinateur
            $("main, #navbarleft").css("transition", "left .4s");   
            affichage_menu_gauche == "afficher" ? cacher_menu_gauche_ordi() : afficher_menu_gauche_ordi(); //si le menu gauche est affiché        
        } else {//ecran mobile
            //$("main, #navbarleft").css("transition", "left .4s");
            affichage_menu_gauche == "afficher" ? cacher_menu_gauche_mobile() : afficher_menu_gauche_mobile(); //si le menu gauche est affiché
        }
    });

    
	$("#bouton_menu_droit").click(function(event){
        if ($(window).width() > 768) {//ecran est grand, on mémorise l'action de l'utilisateur
            (affichage_menu_droit == "afficher") ? action_utilisateur_droit = "l'utilisateur a masque le menu" : action_utilisateur_droit = "";
        } else {//ecran est petit, on mémorise l'action de l'utilisateur
            (affichage_menu_droit == "afficher") ? action_utilisateur_droit = "" : action_utilisateur_droit = "l'utilisateur a affiche le menu";
        }

        if ($(window).width() > 768) {//ecran pour ordinateur
            $("main, #navbarright").css("transition", "right .4s");
            (affichage_menu_droit == "afficher") ? cacher_menu_droit_ordi() : afficher_menu_droit_ordi();//cacher le menu droit ordi
        } else {//ecran mobile
            $("main, #navbarright").css("transition", "right .4s");
            (affichage_menu_droit == "afficher") ? cacher_menu_droit_mobile() : afficher_menu_droit_mobile();
        }

        $("#action_utilisateur_droit").val(action_utilisateur_droit);
        $("#affichage_menu_droit").val(affichage_menu_droit);

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
        cacher_menu_gauche_mobile();
        cacher_menu_droit_mobile();
    } else {
        afficher_menu_gauche_ordi();
        afficher_menu_droit_ordi();
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
            action_utilisateur_droit == "l'utilisateur a affiche le menu" ? afficher_menu_droit_mobile() : cacher_menu_droit_mobile(); 
        }else{// ecran pour ordinateur
            if (action_utilisateur_gauche != "l'utilisateur a masque le menu") { afficher_menu_gauche_ordi(); } //donc j'affiche le menu gauche
            if (action_utilisateur_droit != "l'utilisateur a masque le menu") { afficher_menu_droit_ordi(); }
        }
        $("#action_utilisateur_droit").val(action_utilisateur_droit);
        $("#affichage_menu_droit").val(affichage_menu_droit);
    });
}



$(document).ready(function() {
    animation_menus_principaux();
    taille_fenetre();
    etat_menu();
    affiche_menu_enfant();

});


