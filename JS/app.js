const products = [
    { id: 1, name: "Laptop", price: 1000, category: "Electrónica" },
    { id: 2, name: "Camiseta", price: 20, category: "Ropa" },
    { id: 3, name: "Sofá", price: 500, category: "Hogar" },
    { id: 4, name: "Auriculares", price: 150, category: "Electrónica" },
    { id: 5, name: "Pantalón", price: 40, category: "Ropa" },
  ];
  
  let cart = [];
  
  function renderProducts(productList = products) {
    const productContainer = document.getElementById("products");
  
    if (!productContainer) {
      console.error("No se pudo encontrar el contenedor de productos.");
      return;
    }
  
    productContainer.innerHTML = "";
  
    if (productList.length === 0) {
      productContainer.innerHTML = "<p>No hay productos disponibles con esos filtros.</p>";
    }
  
    productList.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <span>${product.name} - $${product.price} (${product.category})</span>
        <button onclick="addToCart(${product.id})">Agregar</button>
      `;
      productContainer.appendChild(productDiv);
    });
  
    console.log("Productos renderizados:", productList.length);
  }
  
  function addToCart(productId) {
    const producto = products.find(product => product.id === productId);
  
    if (!producto) {
      console.error(`El producto con ID ${productId} no existe.`);
      return;
    }
  
    const isProductInCart = cart.some(product => product.id === productId);
    if (isProductInCart) {
      console.log(`El producto ${producto.name} ya está en el carrito.`);
      return;
    }
  
    cart.push(producto);
    console.log(`Producto ${producto.name} agregado al carrito.`);
    renderCart();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    console.log(`Producto con ID ${productId} eliminado del carrito.`);
    renderCart();
  }
  
  function renderCart() {
    const cartContainer = document.getElementById("cart");
  
    if (!cartContainer) {
      console.error("No se pudo encontrar el contenedor del carrito.");
      return;
    }
  
    cartContainer.innerHTML = "";
  
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      return;
    }
  
    cart.forEach(item => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button onclick="removeFromCart(${item.id})">Eliminar</button>
      `;
      cartContainer.appendChild(cartItemDiv);
    });
  
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    cartContainer.appendChild(totalDiv);
  
    console.log(`Total del carrito: $${total}`);
  }
  
  function applyFilters() {
    const categoryFilter = document.getElementById("category-filter").value;
    const priceFilter = Number(document.getElementById("price-filter").value);
  
    let filteredProducts = products;
  
    if (categoryFilter !== "all") {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
      console.log(`Filtrando por categoría: ${categoryFilter}`);
    }
  
    if (priceFilter > 0) {
      filteredProducts = filteredProducts.filter(product => product.price <= priceFilter);
      console.log(`Filtrando por precio menor o igual a: $${priceFilter}`);
    }
  
    renderProducts(filteredProducts);
  }
  
  renderProducts();