// Calling API with all results
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
}

// Calling API with specific id
const showDetails = prodID =>{
  const url = `https://fakestoreapi.com/products/${prodID}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => clickedProductDetails(data));
}

loadProducts();

// product details shown in modal like tab 
const clickedProductDetails = detailsObject => {
  const divDetails = document.getElementById('productDetails')
  divDetails.style.visibility='visible'
  const proDetails = detailsObject;
  
  divDetails.innerHTML=`
  <div class="bg-success p-1 text-center text-white rounded-top">
    <h5>Product Description </h5>
  </div>

  <div class="d-flex justify-content-center">
  <p class="px-2 py-1 m-0 fst-italic"> <span class="fw-bold">Description:</span> ${proDetails.description}
  </p>
  <img class="img-fluid px-2 py-1 m-0" style="width: 120px; height: 120px" src="${proDetails.image}"></img>
  </div>

  <div class="px-2 py-1">
    <h6 class="fst-italic">Rating:  <i class="fas fa-star text-warning "></i>
    <i class="fas fa-star text-warning"></i>
    <i id="third" class="fas fa-star "></i>
    <i id="fourth"class="fas fa-star "></i>
    <i id="fifth"class="fas fa-star "></i>
    </h6> 
  </div>

  <div class="px-2 py-2 d-flex justify-content-center">
    <button onclick="hideDetails()" class=" btn btn-dark text-end px-3">close</button> 
  </div>
  <div class= "p-2 bg-success"></div>

  `
  // Star Rating Clear function call
  starRatingClear();
  // Star Rating Display function call
  starRatingDisplay(proDetails.rating.rate);
}
// product details hidden upon click on close
const hideDetails = () => {
  document.getElementById('productDetails').style.visibility='hidden'
}
// Star Rating Clear main function
const starRatingClear = () => {
  document.getElementById('third').classList.remove('text-warning')
  document.getElementById('fourth').classList.remove('text-warning')
  document.getElementById('fifth').classList.remove('text-warning')

}
// Designed Only to show full star; Not fractions.
// Star Rating Display main function 
const starRatingDisplay = rating => {
  if(rating <=2.4){
    console.log('ok')    
  }
  else if( rating > 2.4 && rating < 3.5 ){
    document.getElementById('third').classList.add('text-warning')
    
  }
  else if( rating > 3.4 && rating < 4.5 ){
    document.getElementById('third').classList.add('text-warning')
    document.getElementById('fourth').classList.add('text-warning')  
    
  }
  else if( rating > 4.4 && rating < 5.1 ){
    document.getElementById('third').classList.add('text-warning')
    document.getElementById('fourth').classList.add('text-warning')
    document.getElementById('fifth').classList.add('text-warning')
    
  }
  else{
    console.log('down')
  }
}



// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  // console.log(allProducts)

  for (const product of allProducts) {
    // console.log(product)
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
    
      <div class="my-2 p-3 border border-1 bg-light single-product">
        <div class="text-center pb-3">
          <img class="product-image" src=${product.image}></img>
        </div>
        <hr>
        <h5 class="text-center fw-bold">${product.title}</h5>        
        <p class=" mb-0 pb-2 ">Category: ${product.category}</p>
        <h6 class="">Price: $ ${product.price}</h6>
        <p class=" mb-0 pb-2">Rating: <span class="fw-bold"> ${product.rating.rate}</span>  (${product.rating.count} people rated!)</p>
        <div class="d-flex justify-content-start">
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class=" buy-now btn btn-success" ><i class="fas fa-shopping-cart px-1"></i>add to cart</button>
          <button onclick="showDetails(${product.id})" id="details-btn" class="mx-2 btn btn-warning" >Details
          </button>
        </div>
      </div>
    
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  console.log('Iam in')
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
