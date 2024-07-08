// Wrap your code in a function to improve encapsulation and readability
const initProductDisplay = async () => {
const productContainerEl = document.getElementById("productContainer");
const searchInputEl = document.getElementById("searchInput");

const apiUrl = "https://fakestoreapi.com/products";

const fetchProducts = async () => {
try {
  const response = await fetch(apiUrl);
  return await response.json();
} catch (error) {
  console.error("Error fetching products:", error);
  return [];
}
};

let products = await fetchProducts();

const generateProductCard = (product) => {
return `
  <div class="product_card">	
    <div class="image_container">	
      <img src="${product.image}" alt="" />	
    </div>	
    <div class="product_content">	
      <h2>${product.title}</h2>	
      <p>${product.description.split(" ").slice(0, 20).join(" ")}</p>	
      <button>${product.price} $</button>	
    </div>	
  </div>
`;
};


const renderProducts = (productsToRender) => {
productContainerEl.innerHTML = "";
productsToRender.forEach((product) => {
  productContainerEl.innerHTML += generateProductCard(product);
});
};


const filterProducts = (searchText) => {
// console.log(searchText)
searchText = searchText.toLowerCase();
const filteredProducts = products.filter((product) => {

  return (
    product.title.toLowerCase().includes(searchText) ||
    product.description.toLowerCase().includes(searchText) ||
    product.price.toString().includes(searchText)
  );
});
renderProducts(filteredProducts);
};

const filterHandler = (event) => {
// console.log(event)
const searchText = event.target.value;
// console.log(searchText)
filterProducts(searchText);
};

searchInputEl.addEventListener("input", filterHandler);

renderProducts(products);
};

// Call the initialization function to start the product display
initProductDisplay();

