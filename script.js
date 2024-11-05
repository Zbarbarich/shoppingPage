document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modalButtons = document.querySelectorAll('.modal-open');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            initializeCarousel(modal);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Carousel functionality
    function initializeCarousel(modal) {
        const carousel = modal.querySelector('.carousel');
        const images = carousel.querySelectorAll('.carousel-images img');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            images[index].classList.add('active');
            dots[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
        });
    }

    const productType = document.getElementById('productType');
    const batSize = document.getElementById('batSize');
    const gloveHand = document.getElementById('gloveHand');

    // Enable/disable relevant filters based on product type selection
    productType.addEventListener('change', function() {
        if (this.value === 'bats') {
            batSize.disabled = false;
            gloveHand.disabled = true;
            gloveHand.value = 'all';
        } else if (this.value === 'gloves') {
            batSize.disabled = true;
            gloveHand.disabled = false;
            batSize.value = 'all';
        } else {
            batSize.disabled = true;
            gloveHand.disabled = true;
            batSize.value = 'all';
            gloveHand.value = 'all';
        }
        filterProducts();
    });

    batSize.addEventListener('change', filterProducts);
    gloveHand.addEventListener('change', filterProducts);

    function filterProducts() {
        const products = document.querySelectorAll('.product-pane');
        const selectedType = productType.value;
        const selectedSize = batSize.value;
        const selectedHand = gloveHand.value;

        products.forEach(product => {
            const details = product.querySelector('.details').textContent;
            const isBat = product.querySelector('h3').textContent.includes('202'); // Assumes all bats have '2025' in name
            const isGlove = !isBat;

            let showProduct = true;

            // Filter by product type
            if (selectedType === 'bats' && !isBat) showProduct = false;
            if (selectedType === 'gloves' && !isGlove) showProduct = false;

            // Filter by bat size
            if (selectedType === 'bats' && selectedSize !== 'all') {
                if (!details.includes(`${selectedSize} inch`)) showProduct = false;
            }

            // Filter by glove hand
            if (selectedType === 'gloves' && selectedHand !== 'all') {
                const handText = selectedHand === 'right' ? 'right hand throw' : 'left hand throw';
                if (!details.toLowerCase().includes(handText)) showProduct = false;
            }

            product.style.display = showProduct ? 'block' : 'none';
        });
    }
});
