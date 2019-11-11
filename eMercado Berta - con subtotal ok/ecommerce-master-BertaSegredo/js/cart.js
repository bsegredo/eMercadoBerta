let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let MONEY_SYMBOL = "$";
let PERCENTAGE_SYMBOL = '%';
let paymentTypeSelected = false;
let products = [];
let articlesUnitCost = 0;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
  let unitPriceHTML = document.getElementById("unitPriceText");
  let shippingCostHTML = document.getElementById("shippingCostText");
  let totalPriceHTML = document.getElementById("totalPriceText");

  let unitPriceToShow = MONEY_SYMBOL + subtotal;
  let shippingCostToShow = Math.round((shippingPercentage * 100)) + PERCENTAGE_SYMBOL;
  let totalPriceToShow = MONEY_SYMBOL + (Math.round(subtotal  * (1 + shippingPercentage)));

  unitPriceHTML.innerHTML = unitPriceToShow;
  shippingCostHTML.innerHTML = shippingCostToShow;
  totalPriceHTML.innerHTML = totalPriceToShow;

}

document.getElementById("premiumShipping").addEventListener("change", function(){
  shippingPercentage = 0.15;
  updateTotalCosts();
});

document.getElementById("expressShipping").addEventListener("change", function(){
  shippingPercentage = 0.07;
  updateTotalCosts();
});

document.getElementById("standardShipping").addEventListener("change", function(){
  shippingPercentage = 0.05;
  updateTotalCosts();
});


function updateSubtotal(){
  let articlesCount = parseInt(document.getElementById('count').value);

  subtotal = articlesCount * articlesUnitCost;

  document.getElementById('subtotal').innerHTML = subtotal;

   updateTotalCosts();
}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showProducts(products){
    let htmlContentToAppend = "";
    for(let i = 0; i < products.length; i++){
        let articles = products[i];

        articlesUnitCost = articles.unitCost

        htmlContentToAppend += `
              <tr>
                <td><img src="` + articles.src + `" class="img_cart">` + articles.name + `</td>
                <td id="currency">` + articles.currency + `</td>
                <td id="unitCost">` + articles.unitCost + `</td>
                <td ><input type="number" name="count" value="2" min="1" step="1" id="count" onchange = "updateSubtotal()"
                 class="count"></td>
                <td id="subtotal"></td>
              </tr>
        `

    }

    document.getElementById("cartArticles").innerHTML = htmlContentToAppend;
    updateSubtotal();

    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
      products = resultObj.data.articles;
      showProducts(resultObj.data.articles);
    }
  })
});
