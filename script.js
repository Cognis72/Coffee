
  function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("active");
  }



  const form = document.getElementById('reviewForm');
  const nameInput = document.getElementById('nameInput');
  const reviewInput = document.getElementById('reviewInput');
  const reviewsContainer = document.getElementById('reviewsContainer');
  const stars = document.querySelectorAll('#stars span');

  let selectedRating = 0;
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.value);
      updateStarDisplay();
    });

    star.addEventListener('mouseover', () => {
      const hoverValue = parseInt(star.dataset.value);
      highlightStars(hoverValue);
    });

    star.addEventListener('mouseout', () => {
      updateStarDisplay();
    });
  });

  function updateStarDisplay() {
    stars.forEach(star => {
      const val = parseInt(star.dataset.value);
      star.classList.toggle('active', val <= selectedRating);
    });
  }

  function highlightStars(value) {
    stars.forEach(star => {
      const val = parseInt(star.dataset.value);
      star.style.color = val <= value ? '#f5a623' : '#ccc';
    });
  }

  function renderReviews() {
    reviewsContainer.innerHTML = '';
    reviews.forEach((review) => {
      const li = document.createElement('li');
      const starsHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      li.innerHTML = `<strong>${review.name}</strong> <span style="color: #f5a623;">${starsHTML}</span><br>${review.text}`;
      reviewsContainer.appendChild(li);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const text = reviewInput.value.trim();

    if (!name || !text || selectedRating === 0) {
      alert("กรุณากรอกชื่อ รีวิว และเลือกจำนวนดาวก่อนครับ ⭐");
      return;
    }

    const newReview = { name, text, rating: selectedRating };
    reviews.unshift(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();

    nameInput.value = '';
    reviewInput.value = '';
    selectedRating = 0;
    updateStarDisplay();
  });

  renderReviews();



