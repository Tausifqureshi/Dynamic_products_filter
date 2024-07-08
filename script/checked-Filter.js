let productsDiv = document.querySelector(".products");
let categoryDivList = document.querySelector(".categoryList");

let allCate = [];
async function getData(allCheckCat=[] ) {
  // console.log(allCheckCat)
  // e.preventDefault()
  productsDiv.innerHTML = "";
  // categoryDivList.innerHTML = "";
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data)
    data.forEach((item) => {
      //dynamic label render
      // catefory ke liye use ye if
      if (!allCate.includes(item.category)) {
        // console.log(item.category)
        categoryDivList.innerHTML +=`
       <label for="">
       <input type="checkbox" onclick="categoryFilter()"value="${item.category}"> ${item.category}
       </label>`;
       allCate.push(item.category)
      }
      
      // filter ke liye use ye if
      if (allCheckCat.length == 0) {
        allCheckCat=allCate
      }
      if (allCheckCat.includes(item.category)) {
              
      //dyanmic products render
      productsDiv.innerHTML += `
     <div class="productsItems">
      <img src=${item.image} alt="" class="image">
      <h4 class="title">${item.title.slice(0, 30)}</h4>
      <p class="price">$${item.price} ${item.rating.rate}</p>
      <h4 class="category">${item.category}</h4>
  
    </div>
  `;
      }
      // <p class="itemcate">${item.description.slice(0, 30)}...</p>
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
getData();

let categoryFilter = ()=>{
//  console.log('Checked')
let checkInput = document.querySelectorAll("input[type='checkbox']");
console.log(checkInput)
let checkData=[];
checkInput.forEach((e)=>{
  console.log(e)
  if (e.checked) {
    checkData.push(e.value)
    console.log(e.value)
  }
})
// console.log(checkData)
getData(checkData)

}

