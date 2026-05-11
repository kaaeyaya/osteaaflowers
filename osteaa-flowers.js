const slideData = [
  {
    image: "./big_flower/big_bucket.jpeg",
    alt: "Buket mawar merah",
    titleEm: "Mawar Merah",
    titleRest: "Romantis",
    desc: "Ungkapkan cinta tulus dengan buket mawar segar pilihan."
  },
  {
    image: "./single_flower/gerbera.jpeg",
    alt: "Buket tulip",
    titleEm: "Tulip Pink",
    titleRest: "Aesthetic",
    desc: "Cantik, segar, dan penuh estetika. Tulip pink cocok untuk hadiah ulang tahun, wisuda, atau dekorasi ruangan kamu."
  },
  {
    image: "./single_flower/pink_rose.jpeg",
    alt: "Buket bunga matahari",
    titleEm: "Sunflower",
    titleRest: "Happiness",
    desc: "Bawa keceriaan dan semangat lewat buket bunga matahari segar. Simbol kebahagiaan yang selalu merekah."
  },
  {
    image: "./single_flower/purple_lily.jpeg",
    alt: "Tanaman lavender dan bunga ungu",
    titleEm: "Lavender",
    titleRest: "Dreamy Wrap",
    desc: "Ketenangan dan keindahan dalam satu rangkaian. Lavender hadir dengan aroma menenangkan yang memanjakan indra."
  }
];

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

const products = [
  {
    name: "Mawar Merah",
    alt: "Mawar merah",
    image: "./big_flower/big_bucket.jpeg",
    desc: "Ekspresi cinta tulus",
    price: "Rp 85.000",
    cat: "big flower"
  },
  {
    name: "Tulip Pink",
    alt: "Tulip pink",
    image: "./single_flower/gerbera.jpeg",
    desc: "Aesthetic & elegan",
    price: "Rp 35.000",
    cat: "small flower"
  },
  {
    name: "Lavender",
    alt: "Lavender",
    image: "./single_flower/pink_rose.jpeg",
    desc: "Aroma menenangkan",
    price: "Rp 25.000",
    cat: "small flower"
  },
  {
    name: "Purple Lily",
    alt: "purple lilly",
    image: "./single_flower/purple_lily.jpg",
    desc: "Keceriaan setiap hari",
    price: "Rp 10.000",
    cat: "small flower"
  },
  {
    name: "Tiger Lily",
    alt: "tiger lilly",
    image: "./single_flower/tiger_lily.jpeg",
    desc: "Campuran bunga pilihan",
    price: "Rp 120.000",
    cat: "small flower"
  },
  {
    name: "Daisy Putih",
    alt: "Daisy putih",
    image: "./single_flower/mix_rose.jpeg",
    desc: "Kesan bersih & murni",
    price: "Rp 30.000",
    cat: "small flower"
  },
];

function renderProducts(filter) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  const filtered = filter === "all" ? products : products.filter((p) => p.cat === filter);
  grid.innerHTML = filtered
    .map((p, index) => {
      return `<div class="product-card">
      <div class="product-img">
        <img class="product-img-photo" src="${escapeAttr(p.image)}" alt="${escapeAttr(p.alt)}" loading="${index < 4 ? "eager" : "lazy"}" width="400" height="300" decoding="async">
      </div>
      <div class="product-info">
        <div class="product-name">${escapeHtml(p.name)}</div>
        <div class="product-desc">${escapeHtml(p.desc)}</div>
        <div class="product-footer">
          <span class="product-price">${escapeHtml(p.price)}</span>
          <button 
            type="button" 
            class="product-wa" 
            onclick="window.open('https://wa.me/628989353936?text=' + encodeURIComponent('Halo, saya mau pesan ' + '${p.name}'), '_blank')" 
            title="Pesan via WA">
            <i class="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

function filterProd(cat, el) {
  document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  renderProducts(cat);
}

function goPage(n) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + n).classList.add("active");
  ["page-1", "page-2"].forEach((id) => {
    const root = document.getElementById(id);
    if (!root) return;
    root.querySelectorAll(".nav-btn").forEach((b, i) => b.classList.toggle("active", i === n - 1));
  });
  if (n === 2) renderProducts("all");
}

let cur = 0;

function sliderTotal() {
  return slideData.length;
}

function renderSliderImages() {
  const track = document.getElementById("slides");
  const dots = document.getElementById("dots");
  if (!track || !dots) return;
  track.innerHTML = slideData
    .map(
      (s, i) =>
        `<div class="slide"><img class="slide-img" src="${s.image}" alt="${s.alt}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async"></div>`
    )
    .join("");
  dots.innerHTML = slideData
    .map((_, i) => `<div class="dot${i === 0 ? " active" : ""}" onclick="goSlide(${i})"></div>`)
    .join("");
}

function updateSlider() {
  const n = sliderTotal();
  if (n === 0) return;
  cur = ((cur % n) + n) % n;
  const slidesEl = document.getElementById("slides");
  const belowDesc = document.getElementById("below-desc");
  const belowTitle = document.getElementById("below-title");
  if (slidesEl) slidesEl.style.transform = `translateX(-${cur * 100}%)`;
  document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === cur));
  const d = slideData[cur];
  if (belowTitle) {
    belowTitle.innerHTML = `<em>${escapeHtml(d.titleEm)}</em> ${escapeHtml(d.titleRest)}`;
  }
  if (belowDesc) belowDesc.textContent = d.desc;
}

function changeSlide(dir) {
  const n = sliderTotal();
  if (n === 0) return;
  cur = (cur + dir + n) % n;
  updateSlider();
}

function goSlide(i) {
  cur = i;
  updateSlider();
}

renderSliderImages();
updateSlider();
setInterval(() => changeSlide(1), 4000);
renderProducts("all");

/* autoplay lebih smooth */
let autoSlide = setInterval(() => {
  changeSlide(1);
}, 5000);

/* pause saat hover */
const slider = document.querySelector(".slider-fullscreen");

slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    changeSlide(1);
  }, 5000);
});
