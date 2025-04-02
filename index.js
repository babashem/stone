let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const quickViewBtn = card.querySelector('.quick-view-btn');
        let timeoutId;

        card.addEventListener('mouseenter', () => {
            // Clear any existing timeout
            clearTimeout(timeoutId);

            // Set a timeout to hide the button after 7 seconds
            timeoutId = setTimeout(() => {
                quickViewBtn.style.display = 'none';
            }, 7000);
        });

        card.addEventListener('mouseleave', () => {
            // Clear the timeout if the mouse leaves before 7 seconds
            clearTimeout(timeoutId);

            // Restore the button's display
            quickViewBtn.style.display = 'block';
        });

        quickViewBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = card.dataset.productId;
            window.location.href = `product-details.html?id=${productId}`;
        });
    });
});
