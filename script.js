const gallery = document.getElementById("gallery");
const uploadInput = document.getElementById("uploadInput");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");
const slideshowBtn = document.getElementById("slideshowBtn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const downloadBtn = document.getElementById("downloadBtn");

let images = [
  { src: "https://picsum.photos/id/1015/600/400", category: "nature" },
  { src: "https://picsum.photos/id/1024/600/400", category: "animals" },
  { src: "https://picsum.photos/id/1035/600/400", category: "nature" },
  { src: "httpsum.photos/id/1041/600/400", category: "travel" },
  { src: "https://picsum.photos/id/1050/600/400", category: "nature" },
  { src: "https://picsum.photos/id/1060/600/400", category: "animals" },
  { src: "https://picsum.photos/id/1074/600/400", category: "travel" },
  { src: "https://picsum.photos/id/1084/600/400", category: "nature" },
  { src: "https://picsum.photos/id/109/600/400", category: "animals" },
  { src: "https://picsum.photos/id/110/600/400", category: "nature" },
  { src: "https://picsum.photos/id/111/600/400", category: "travel" },
  { src: "https://picsum.photos/id/112/600/400", category: "nature" },
  { src: "https://picsum.photos/id/113/600/400", category: "animals" },
  { src: "https://picsum.photos/id/114/600/400", category: "travel" },
  { src: "https://picsum.photos/id/115/600/400", category: "nature" },
  { src: "https://picsum.photos/id/116/600/400", category: "animals" },
  { src: "https://picsum.photos/id/117/600/400", category: "travel" },
  { src: "https://picsum.photos/id/118/600/400", category: "nature" },
  { src: "https://picsum.photos/id/119/600/400", category: "animals" },
  { src: "https://picsum.photos/id/120/600/400", category: "travel" }
];


let slideshowInterval = null;

// DISPLAY GALLERY
function showGallery() {
  gallery.innerHTML = "";

  const searchTerm = searchInput.value.toLowerCase();
  const selectedCat = categoryFilter.value;

  images
    .filter(img =>
      (selectedCat === "all" || img.category === selectedCat) &&
      img.src.toLowerCase().includes(searchTerm)
    )
    .forEach(img => {
      const imageElement = document.createElement("img");
      imageElement.src = img.src;
      imageElement.onclick = () => openLightbox(img.src);
      gallery.appendChild(imageElement);
    });
}

showGallery();

// UPLOAD IMAGES
uploadInput.addEventListener("change", (e) => {
  [...e.target.files].forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      images.push({ src: reader.result, category: "nature" });
      showGallery();
    };
    reader.readAsDataURL(file);
  });
});

// SEARCH
searchInput.addEventListener("input", showGallery);

// CATEGORY FILTER
categoryFilter.addEventListener("change", showGallery);

// LIGHTBOX
function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
  downloadBtn.href = src;
}

lightbox.onclick = () => lightbox.style.display = "none";

// THEME TOGGLE
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
};

// SLIDESHOW
slideshowBtn.onclick = () => {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    slideshowBtn.textContent = "▶ Start Slideshow";
    return;
  }

  let index = 0;
  slideshowBtn.textContent = "⏹ Stop Slideshow";

  slideshowInterval = setInterval(() => {
    openLightbox(images[index].src);
    index = (index + 1) % images.length;
  }, 2000);
};
