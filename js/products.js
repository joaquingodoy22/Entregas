
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const SOLD_COUNT = "soldCount.";
const ORDER_BY_HIGH_PRICE = "cost->COST";
const ORDER_BY_LOW_PRICE = "COST->cost";

var productsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_HIGH_PRICE) {
        result = array.sort(function (a, b) {

            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

    } else if (criteria === ORDER_BY_LOW_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList(){
    
    let htmlContentToAppend = "";
    for(let i=0; i<productsArray.length; i++){
        let products = productsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

        if (buscar == undefined || products.name.toLowerCase().indexOf(buscar) != -1) {

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div>
                    <img src=` + products.imgSrc + ` alt=` + products.description + ` class="img-thumbnail" > 
                    
                </div>
                <div class="col">
                
                    <div class="w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>                       
                        
                    </div>
                    <p class="mb-1">` + products.description + `</p>
                        <div class="precio">
                        <p>` + products.cost + ' ' + products.currency + `</p>
                        <button id="buyBtn">Comprar.</button>
                        
                </div>
            </div>
        </div>
        `  
      }}

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        productsArray = categoriesArray;
    }

    productsArray = sortCategories(currentSortCriteria, productsArray);

    //Muestro las categorías ordenadas
    showProductsList();
    }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortVendidos").addEventListener("click", function () {
        sortAndShowProducts(SOLD_COUNT);
    });

    document.getElementById("sortAlto").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_HIGH_PRICE);
    });

    document.getElementById("sortBajo").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_LOW_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById('rangeFilterCount').addEventListener("click", function (e) {
        minCount = document.getElementById('rangeFilterCountMin').value;
        maxCount = document.getElementById('rangeFilterCountMax').value;

        if (((minCount != undefined) && minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if (((maxCount != undefined) && maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }
        showProductsList();
    });
   

    document.getElementById('buscador').addEventListener('input', function (e) {
        buscar = document.getElementById('buscador').value.toLowerCase();

        showProductsList();
    });

    document.getElementById('limpBusc').addEventListener("click", function (e) {
        document.getElementById('buscador').value = '';

        buscar = undefined;

        showProductsList();
    });

});
