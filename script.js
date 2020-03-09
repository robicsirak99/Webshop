function changePage(page, page_number) {
        /*//betöltjük az oldalnak megfelelő termékeket*/
    if(page=="page0"){
        loadPage0();
    } else if(page=="page1"){
        loadPage1();
    } else if(page=="page2"){
        loadPage2();     
    } else if(page=="page3"){
        loadPage3();
    } else if(page=="page4"){
        loadPage4();
    }
        /*//reszeteljük a filtert*/
    resetFilter(page_number);  
        /*//az előző aktív oldal class nevét módosítjuk page_opened-ről page_closed-ra és a display tulajdonságát none-ra állítjuk*/
    var opened_pages = document.getElementsByClassName("page_opened");
    opened_pages[0].style.display = "none";
    opened_pages[0].className = "page_closed";
        /*//a jelenlegi oldal class nevét állítjuk át page_closed-ról page_opened-re és a display tulajdonságát block-ra állítjuk*/      
    if (document.getElementById(page).className == "page_closed"){
        document.getElementById(page).style.display = "block";
        document.getElementById(page).className = "page_opened";
    }
}

    /*//ebben a változóban tároljuk az aktív kiválasztott filter id-jét, hogy reszetelésnél egyszerűen elérjük, 
    az alapból beállított érték itt csak azért szükséges, hogy a resetFilter függvény ne adjon vissza errort*/
var weightSet = "fb1";

function setFontWeight(id, page_number){
/*    //az előző kiválasztott filtert reszeteljük*/
    document.getElementById(weightSet).style.fontWeight = "normal";    
/*    //az újonnan kiválasztott filternek beállítjuk a betűvastagságot*/
    document.getElementById(id).style.fontWeight = "bold";    
/*    //elmentjük az újonnan kiválasztott filter id-jét*/
    weightSet = id;
}

function resetFilter(page_number){
/*//az előző oldalon utoljára kiválasztott filter reszetelése*/
    document.getElementById(weightSet).style.fontWeight = "normal";
/*//eldöntjük az oldal számának megfelően, hogy melyik filter az aktív(minden oldal esetében alapértelmezett az "Összes" filter)
 és az ennek megfelelő id-t tároljuk el, beállítjuk hozzá a betűvastagságot és a termékeket is megjelenítjük a filterFunction segítségével*/
    if(page_number==1){weightSet="fb1";
        document.getElementById("fb1").style.fontWeight = "bold";
        filterFunction('ALL','phone_hidden','phone_shown','fb1',1);
    }
    else if(page_number==2){weightSet="fb8";
        document.getElementById("fb8").style.fontWeight = "bold";
        filterFunction('ALL','watch_hidden','watch_shown','fb8',2);
    }
    else if(page_number==3){weightSet="fb13";
        document.getElementById("fb13").style.fontWeight = "bold";
        filterFunction('ALL','laptop_hidden','laptop_shown','fb13',3);
    }
    else if(page_number==4){weightSet="fb19";
        document.getElementById("fb19").style.fontWeight = "bold";
        filterFunction('ALL','per_hidden','per_shown','fb19',4);
    }
}

/*//ez a függvény felel a filter működéséért, ha rányomunk egy filterre (pl telefonok esetében a samsung filterre) akkor végnézi a termékeket és a filternek megfelelő
termékeket jeleníti meg, a többi termék class tulajdonságát állítja át hiddenre (pl telefonok esetében phone_hidden-re), a hidden tulajdonságú termékek eltüntetését
a css fálj végzi*/
function filterFunction(phone, product_hidden, product_shown, id, page_number){
    /*//ha rákattintunk egy új filterre, akkor beállítja hozzá a vastag betűméretet,
    és az előzőleg kiválasztott filtergombhoz (weightSet változóban tárolt) beállítja a normál betűvastagságot*/
    setFontWeight(id, page_number);

    var phones_hidden = document.getElementsByClassName(product_hidden);
    var k = phones_hidden.length; 
    var i;
    for(i=0; i < k; i++){
        phones_hidden = document.getElementsByClassName(product_hidden);
        phones_hidden[0].className = product_shown;
    }
    
    if(phone != "ALL"){
        var phones_shown = document.getElementsByClassName(product_shown);
        var l = phones_shown.length;
        var j;
        x=0;
        for(j=0; j<l; j++){
            phones_shown = document.getElementsByClassName(product_shown);
            if(!(phones_shown[x].id.includes(phone))){
                phones_shown[x].className = product_hidden;
            }
            else x++;
        }
    }
}
/*//ebben a változóban tároljuk el, hogy éppel le van-e nyitva a stílus kiválasztó menü, alap értéke 0, azaz nincs lenyitva*/
var droped = 0;
/*//a stílus kiválasztó lenyíló menüt működteti, ha a fogaskerékre nyomunk a menü lenyílik, ha megint rákattintunk bezárul*/
function dropDown(class_name){
    if (droped==0){
        drop_down_elements = document.getElementsByClassName(class_name);
        drop_down_elements[0].style.display = "block";
        drop_down_elements[1].style.display = "block";
        droped=1;
    }
    else {
        drop_down_elements = document.getElementsByClassName(class_name);
        drop_down_elements[0].style.display = "none";
        drop_down_elements[1].style.display = "none";
        droped=0;
    }
}
/*//a két css fájl betöltéséért felelős, és ha kiválasztunk egy stílust akkor bezárja a lenyíló menüt*/
function changeStyle(class_name, style){
    document.getElementById("link").href=style;
    
    drop_down_elements = document.getElementsByClassName(class_name);
    drop_down_elements[0].style.display = "none";
    drop_down_elements[1].style.display = "none";
    droped=0;
    
}
/*//ez a függvény tölti be a termékeket xml fájlból*/
function loadDoc(id, path) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(id).innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
}
/*//a főoldal termékeinek (az akciós termékek) betöltéséért felelős*/
function loadPage0(){
    loadDoc("product00","Products/samsung.xml");
    loadDoc("product01","Products/iphone3.xml");
    loadDoc("product02","Products/nokia1.xml");
    loadDoc("product03","Products/huawei.xml");
}
/*//a telefonok betöltését végzi*/
function loadPage1(){
    loadDoc("samsung","Products/samsung.xml");
    loadDoc("samsung2","Products/samsung2.xml");
    loadDoc("iphone","Products/iphone.xml");
    loadDoc("huawei","Products/huawei.xml");
    loadDoc("iphone1","Products/iphone1.xml");
    loadDoc("xiaomi","Products/xiaomi.xml");
    loadDoc("xiaomi1","Products/xiaomi1.xml");
    loadDoc("lg1","Products/lg1.xml");
    loadDoc("huawei1","Products/huawei1.xml");
    loadDoc("samsung1","Products/samsung1.xml");
    loadDoc("iphone2","Products/iphone2.xml");
    loadDoc("iphone3","Products/iphone3.xml");
    loadDoc("nokia","Products/nokia.xml");
    loadDoc("nokia1","Products/nokia1.xml");
    loadDoc("lg","Products/lg.xml");
    loadDoc("lg2","Products/lg2.xml");
}
/*//az okosórák betöltését végzi*/
function loadPage2(){
    
}
/*//a laptopok betöltését végzi*/
function loadPage3(){
    
}
/*//a perifériák betöltését végzi*/
function loadPage4(){
    
}