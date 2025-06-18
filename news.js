const opens = document.querySelectorAll(".open-news");
const closes = document.querySelectorAll(".close-news");

opens.forEach((openBtn, index) => {
  openBtn.addEventListener("click", () => {
    const card = openBtn.closest(".news-cards");
    card.querySelector("#news-msg").style.display = "flex";
    card.querySelector(".close-news").style.display = "block";
    openBtn.style.display = "none";

    card.querySelectorAll("#noMsg").forEach((el) => {
      el.style.display = "none";
    });
  });
});

closes.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    const card = closeBtn.closest(".news-cards");
    card.querySelector("#news-msg").style.display = "none";
    card.querySelector(".open-news").style.display = "block";
    closeBtn.style.display = "none";

    card.querySelectorAll("#noMsg").forEach((el) => {
      el.style.display = "flex";
    });
  });
});
