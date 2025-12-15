const images = document.querySelectorAll(".card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const carouselImg = document.getElementById("carousel-img");
const nextSlide = document.getElementById("nextSlide");
const prevSlide = document.getElementById("prevSlide");
const carousel = document.getElementById("carousel");

const catButtons = document.querySelectorAll(".category-buttons button");
const catCards = document.querySelectorAll(".cat-card");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    openLightbox(index);
  });
});

closeBtn.onclick = () => (lightbox.style.display = "none");

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});

const carouselImages = [
"images/a-majestic-lion-rests-on-a-rock-under-dramatic-clouds-showcasing-its-powerful-presence-photo.jpg",
"images/images (1).jpeg",
"images/images (2).jpeg",
"images/images.jpeg",
"images/istockphoto-542727462-612x612.jpg",
"images/istockphoto-1403500817-612x612.jpg",
"images/thumb16.jpg"
];

let slideIndex = 0;
let interval;
const slideTime = 4000;


nextSlide.onclick = () => {
  slideIndex = (slideIndex + 1) % carouselImages.length;
  updateCarousel();
};

prevSlide.onclick = () => {
  slideIndex =
    (slideIndex - 1 + carouselImages.length) % carouselImages.length;
  updateCarousel();
};

function updateCarousel() {
  carouselImg.style.opacity = "0";
  carouselImg.style.transform = "scale(0.98)";

  setTimeout(() => {
    carouselImg.src = carouselImages[slideIndex];
    carouselImg.style.opacity = "1";
    carouselImg.style.transform = "scale(1)";
  }, 200);

  const dots = document.querySelectorAll(".dots span");
  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[slideIndex].classList.add("active-dot");
}

function startAutoSlide() {
  clearInterval(interval);

  interval = setInterval(() => {
    slideIndex = (slideIndex + 1) % carouselImages.length;
    updateCarousel();
  }, slideTime);

}


function stopAutoSlide() {
  clearInterval(interval);
}



carousel.addEventListener("mouseenter", () => {
  clearInterval(interval);
});

carousel.addEventListener("mouseleave", startAutoSlide);


let startX = 0;
carousel.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (diff > 50) nextSlide.click();
  else if (diff < 50) prevSlide.click();
});

catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active-cat").classList.remove("active-cat");
        btn.classList.add("active-cat");

        const category = btn.dataset.category;

        catCards.forEach(card => {
            if (category === "all" || card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

updateCarousel();
startAutoSlide();