let products = [
    { name: "Laptop", price: 50000, rating: 4.5, reviews: [] },
    { name: "Earpods", price: 1250, rating: 4.2, reviews: [] },
    { name: "Earphones Wired", price: 500, rating: 4.0, reviews: [] },
    { name: "Selfie Stick", price: 600, rating: 3.8, reviews: [] },
    { name: "iPhone", price: 120000, rating: 4.8, reviews: [] },
    { name: "Pendrive", price: 1000, rating: 4.1, reviews: [] },
    { name: "Scan Disc", price: 1400, rating: 4.3, reviews: [] },
    { name: "Apple iPad", price: 60000, rating: 4.7, reviews: [] },
    { name: "Realme 12Pro5G", price: 14000, rating: 4.4, reviews: [] },
    { name: "Camera", price: 80000, rating: 4.6, reviews: [] },
    { name: "Earpods Wireless", price: 799, rating: 4.0, reviews: [] },
    { name: "Mobile Holder", price: 300, rating: 3.5, reviews: [] },
    { name: "Laptop Holder", price: 400, rating: 3.9, reviews: [] },
    { name: "Microphone", price: 2500, rating: 4.2, reviews: [] },
    { name: "Realme Neckband", price: 899, rating: 4.1, reviews: [] },
    { name: "Telescope", price: 200000, rating: 4.9, reviews: [] }
  ];
      // Sort Products
      sortProducts(criteria) {
          let products = document.querySelectorAll('.product-item');
          let productArray = Array.from(products);
          productArray.sort((a, b) => {
              let valA = a.getAttribute(`data-${criteria}`);
              let valB = b.getAttribute(`data-${criteria}`);
              if (criteria === 'price' || criteria === 'rating') {
                  return parseFloat(valA) - parseFloat(valB);
              } else {
                  return valA.localeCompare(valB);
              }
          });
          let container = document.querySelector('.product-list');
          container.innerHTML = '';
          productArray.forEach(product => container.appendChild(product));
      },

      // Filter Products
      filterProducts(filterType, filterValue) {
          let products = document.querySelectorAll('.product-item');
          products.forEach(product => {
              let value = product.getAttribute(`data-${filterType}`);
              product.style.display = (filterValue === 'all' || value === filterValue) ? 'block' : 'none';
          });
      },

      // Submit Review
      submitReview() {
          let reviewText = document.getElementById('reviewText').value;
          if (reviewText.trim() === "") {
              alert('Please enter a review.');
              return;
          }
          let reviewContainer = document.createElement('div');
          reviewContainer.className = 'review';
          reviewContainer.textContent = reviewText;
          document.getElementById('reviews').appendChild(reviewContainer);
          document.getElementById('reviewText').value = '';
      },

      // Add to Cart
      addToCart(productId) {
          fetch(`/add-to-cart`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId })
          }).then(response => {
              if (response.ok) {
                  this.updateCartIcon();
                  this.animateAddToCartButton(productId);
              } else {
                  console.error('Failed to add item to cart.');
              }
          });
      },

      // Hover Zoom
      zoomImageOnHover() {
          let images = document.querySelectorAll('.product-image');
          images.forEach(image => {
              image.addEventListener('mouseover', () => {
                  image.style.transform = 'scale(1.2)';
                  image.style.transition = 'transform 0.3s ease';
              });
              image.addEventListener('mouseout', () => {
                  image.style.transform = 'scale(1)';
                  image.style.transition = 'transform 0.3s ease';
              });
          });
      },

      // Animate Add to Cart Button
      animateAddToCartButton(productId) {
          let button = document.querySelector(`#add-to-cart-${productId}`);
          button.classList.add('animate');
          setTimeout(() => button.classList.remove('animate'), 1000);
      },

      // Load Video
      loadVideo(videoUrl, videoContainerId) {
          let container = document.getElementById(videoContainerId);
          container.innerHTML = `
              <iframe width="560" height="315" src="${videoUrl}" 
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen></iframe>`;
      },

      // Proceed to Checkout
      proceedToCheckout() {
          fetch('/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cart: this.getCartData() })
          }).then(response => response.json())
          .then(data => {
              window.location.href = data.paymentUrl; // Redirect to payment gateway
          });
      },

      // Fetch Order History
      fetchOrderHistory() {
          fetch('/order-history')
              .then(response => response.json())
              .then(orders => {
                  let orderList = document.getElementById('orders-list');
                  orderList.innerHTML = '';
                  orders.forEach(order => {
                      let orderDiv = document.createElement('div');
                      orderDiv.className = 'order';
                      orderDiv.innerHTML = `
                          <p>Order ID: ${order.id}</p>
                          <p>Date: ${order.date}</p>
                          <p>Status: ${order.status}</p>
                          <p>Total: $${order.total}</p>`;
                      orderList.appendChild(orderDiv);
                  });
              });
      },

      // Utility: Update Cart Icon (example placeholder function)
      updateCartIcon() {
          // Code to update cart icon goes here
      },

      // Utility: Get Cart Data (example placeholder function)
      getCartData() {
          // Code to get cart data goes here
          return [];
      },

      // Initialization
      init() {
          this.zoomImageOnHover();
          this.fetchOrderHistory();
          // Add more initializations here if needed
      }
  };

  // Initialize the ShopApp
  ShopApp.init();
});
