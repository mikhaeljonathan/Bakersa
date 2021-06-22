// IMAGE SLIDER

// get the images and dots
let slides = document.getElementsByClassName("news-image");
let dots = document.getElementsByClassName("dot");

// if n < 0 then assign n to last image, else mod n width length so it gets back to 0 when the n exceeds the length
let getN = function (n) {
  return (n = n < 0 ? slides.length - 1 : n % slides.length);
};

// hide all the slides and dots
let hideAll = function () {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("image-active");
    slides[i].style.opacity = "0";
    dots[i].classList.remove("dot-active");
  }
};

let showNews = function (n) {
  // animate the current image to appear
  slides[n].classList.add("image-active");
  $(".image-active").animate(
    {
      opacity: "1",
    },
    "slow"
  );
  // make current dot appears
  dots[n].classList.add("dot-active");
};

let showOverflow = function (position, n) {
  let el = $(`#news-overflow-${position}`);
  el.attr("src", `src/news/news${n}.jpg`).css("opacity", "0").animate(
    {
      opacity: "1",
    },
    "slow"
  );
};

let handleNews = function (n, restartInterval = true) {
  currentNews = getN(n);
  hideAll();
  showNews(currentNews);

  showOverflow("left", getN(n - 1));
  showOverflow("right", getN(n + 1));

  if (!restartInterval) return;
  clearInterval(autoDisplay);
  autoDisplay = returnInterval(5);
};

let returnInterval = function(sec) {
  return setInterval(() => {
    handleNews(currentNews + 1, false);
  }, sec * 1000);
};

let autoDisplay = returnInterval(5);

$("#arrow-left").click(function () {
  handleNews(currentNews - 1);
});

$("#arrow-right").click(function () {
  handleNews(currentNews + 1);
});


// BREADS (only showing the new breads)
for (let i = 0; i < breads.length; i++) {
  if (!breads[i].isNew) continue; // only new breads

  let curBread = breads[i];
  let id = curBread.id;
  document.getElementsByClassName("breads")[0].insertAdjacentHTML(
    "afterbegin",
    `<div class="bread" onclick="goDetail(${id})">
        <img src="src/icons/new-icon_rect.png" alt="New Icon" class="new-icon" />
        <img src="src/breads/bread${id}/1.jpg" alt="${curBread.name}" class="bread-image"/>
        <div class="bread-info">
            <h3>${curBread.name}</h3>
            <p>${numberFormat.format(curBread.price)}</p>
        </div>
        <div class="bread-seemore">
            <p class="seemore-text">See<br>more</p>
        </div>
    </div>`
  );
}

$("#bread-more").click(function () {
  window.location.href = `html/classic.html`;
});

function goDetail(idx) {
  window.location.href = `html/detail.html?id=${idx}`;
}

let currentNews = 0; // start from 0 and cycles
handleNews(currentNews);
