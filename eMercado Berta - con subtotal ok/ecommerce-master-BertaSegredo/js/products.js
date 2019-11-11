const ORDER_ASC_BY_COST = "costAsc";
const ORDER_DESC_BY_COST = "costDesc";
var currentProductsArray =[];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a,b){
            if (a.cost < b.cost){ return -1;}
            if (a.cost > b.cost){ return 1;}
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort (function(a,b){
            if (a.cost > b.cost){ return -1;}
            if (a.cost < b.cost){ return 1;}
            return 0;
        });
    }

    return result;
}


function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCost === undefined) || (minCost !=undefined && parseInt(products.cost)>= minCost)) && ((maxCost == undefined) ||
        (maxCost !=undefined && parseInt(products.cost) <= maxCost))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                            <small class="text-muted">` + products.currency + ` ` + products.cost + `</small>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts (currentSortCriteria, currentProductsArray);

    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    })
});

document.getElementById("costAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("costDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
});


document.getElementById("rangeFilterCost").addEventListener("click", function(){
     //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    //de productos por categoría.
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if((minCost != undefined) && (minCost !="") && (parseInt(minCost)) >=0){
        minCost = parseInt(minCost);
    }
    else{
        minCost = undefined;

    }

    if ((maxCost != undefined) && (maxCost !="") && (parseInt(maxCost)) >=0){
        maxCost = parseInt(maxCost);
    }

    else{
        maxCost = undefined;
    }

    showProductsList();
});
