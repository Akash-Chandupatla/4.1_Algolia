import algoliasearch from "algoliasearch";

const client = algoliasearch("B20GLPUA1R", "72f0059d3a5b3d803019a7258184c2da");
const index = client.initIndex("search");

let data = [];
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    // console.log(data);
  });

let searchInput = document.querySelector("#searchInput");
let results = document.querySelectorAll(".resultCustom");
let resultsRootElement = document.querySelector("#results");

searchInput.addEventListener("keyup", () => {
  let searchTerm = searchInput.value;

  if (String(searchTerm).trim().length > 0) {
    index
      .search(searchTerm)
      .then(({ hits }) => {
        renderProducts(hits);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (String(searchTerm).trim().length <= 0) {
    removeElements();
  }
});

function removeElements() {
  document.querySelectorAll(".result").forEach((prod) => prod.remove());
}

function renderProducts(products) {
  results.forEach((prod) => {
    prod.remove();
  });
  products.forEach((product) => {
    renderSingleProduct(product);
  });
}

function renderSingleProduct(product) {
  let resultDiv = document.createElement("div");
  let resultImage = document.createElement("img");
  let resultTitle = document.createElement("h4");
  let resultPrice = document.createElement("p");
  let buyButton = document.createElement("button");

  resultImage.src = product.image;
  resultTitle.textContent = product.title;
  resultPrice.textContent = `Price: ${product.price}`;
  buyButton.textContent = "Buy";

  resultDiv.appendChild(resultImage);
  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultPrice);
  resultDiv.appendChild(buyButton);

  resultsRootElement.appendChild(resultDiv);
  resultDiv.classList.add("result");
}
