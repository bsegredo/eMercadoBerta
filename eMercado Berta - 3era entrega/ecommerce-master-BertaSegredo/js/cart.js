let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
let products = [];
let articlesUnitCost = 0;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){

}

function updateSubtotal(){
  let articlesCount = parseInt(document.getElementById('count').value);

  subtotal = articlesCount * articlesUnitCost;

  document.getElementById('subtotal').innerHTML = subtotal;
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

    document.getElementById("cart_articles").innerHTML = htmlContentToAppend;
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
