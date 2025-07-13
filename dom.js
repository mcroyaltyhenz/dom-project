document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cart
    const cartItems = document.querySelectorAll('.cart-item');
    let likedItems = [];
    
    // Add event listeners to all items
    cartItems.forEach(item => {
        // Quantity adjustment
        const minusBtn = item.querySelector('.minus-btn');
        const plusBtn = item.querySelector('.plus-btn');
        const quantityInput = item.querySelector('.quantity');
        const deleteBtn = item.querySelector('.delete-btn');
        const likeBtn = item.querySelector('.like-btn');
        const priceElement = item.querySelector('.price');
        const totalPriceElement = document.querySelector('.total-price');
        
        // Get initial price
        const unitPrice = parseFloat(priceElement.textContent.replace('$', ''));
        
        // Quantity adjustment
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updatePrice();
                calculateTotal();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            updatePrice();
            calculateTotal();
        });
        
        // Direct input change
        quantityInput.addEventListener('change', function() {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
            updatePrice();
            calculateTotal();
        });
        
        // Delete item
        deleteBtn.addEventListener('click', function() {
            item.remove();
            calculateTotal();
        });
        
        // Like item
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const itemId = item.dataset.id;
            
            if (this.classList.contains('liked')) {
                if (!likedItems.includes(itemId)) {
                    likedItems.push(itemId);
                }
            } else {
                likedItems = likedItems.filter(id => id !== itemId);
            }
        });
        
        // Update individual item price
        function updatePrice() {
            const quantity = parseInt(quantityInput.value);
            const totalPrice = (unitPrice * quantity).toFixed(2);
            priceElement.textContent = `$${totalPrice}`;
        }
    });
    
    // Calculate total price of all items
    function calculateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            total += price;
        });
        document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
    }
    
    // Initial total calculation
    calculateTotal();
});
