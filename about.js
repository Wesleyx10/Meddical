let currentReview = 0;
const reviews = document.querySelectorAll(".review");
const totalReviews = reviews.length;
const prevBtn = document.querySelector(".btns button:first-child");
const nextBtn = document.querySelector(".btns button:last-child");

reviews[0].classList.add("active");

function showReview(index) {
  reviews.forEach((review) => review.classList.remove("active"));
  reviews[index].classList.add("active");
  currentReview = index;
}

function nextReview() {
  const nextIndex = (currentReview + 1) % totalReviews;
  showReview(nextIndex);
}

function prevReview() {
  const prevIndex = (currentReview - 1 + totalReviews) % totalReviews;
  showReview(prevIndex);
}

nextBtn.addEventListener("click", nextReview);
prevBtn.addEventListener("click", prevReview);
