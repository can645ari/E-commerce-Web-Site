const starGroups = document.querySelectorAll(".stars .star");
let countStar = 0; // Yıldız sayısını globalde tanımlıyoruz

// Yıldız gruplarına tıklama olayını ekliyoruz
starGroups.forEach((star) => {
  star.addEventListener("click", (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    countStar = 0;

    // Tüm yıldızları temizle
    starGroups.forEach((starItem) => {
      starItem.querySelectorAll("i").forEach((i) => {
        i.style.color = "";
      });
    });

    // Seçilen yıldızlar için rengi altın yap
    star.querySelectorAll("i").forEach((i) => {
      i.style.color = "gold";
      countStar++; // Yıldız sayısını güncelle
    });
  });
});

function addComment() {
  var ad = document.getElementById("name").value.trim();
  var yorum = document.getElementById("comment").value.trim();

  var tarih = new Date();
  var gun = tarih.getDate();
  var ay = tarih.toLocaleString("tr-TR", { month: "long" });
  var yil = tarih.getFullYear();

  if (ad === "" || yorum === "" || countStar === 0) {
    alert("Lütfen tüm alanları doldurun ve yıldız sayısını seçin!");
    return;
  }

  let comment = {
    ad: ad,
    yorum: yorum,
    tarih: `${gun} ${ay} ${yil}`,
    countStar: countStar, // Yıldız sayısını da ekliyoruz
  };

  // Mevcut yorumları localStorage'tan al
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Yeni yorumu diziye ekle
  comments.push(comment);

  // Yorumları tekrar localStorage'a kaydet
  localStorage.setItem("comments", JSON.stringify(comments));

  displayComments();
}

function displayComments() {
  let ol = document.querySelector(".comment-list");
  ol.innerHTML = ""; // Önceden eklenen yorumları temizle

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.forEach((comment) => {
    let newCommentItem = document.createElement("li");
    newCommentItem.classList.add("comment-item");
    ol.appendChild(newCommentItem);

    let divAvatar = document.createElement("div");
    divAvatar.classList.add("comment-avatar");
    newCommentItem.appendChild(divAvatar);

    let avatarImg = document.createElement("img");
    avatarImg.src = "img/avatars/avatar1.jpg";
    divAvatar.appendChild(avatarImg);

    let commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    newCommentItem.appendChild(commentText);

    let commentStar = document.createElement("ul");
    commentStar.classList.add("comment-star");
    commentText.appendChild(commentStar);

    // Yıldız sayısını ekliyoruz
    for (let i = 1; i <= comment.countStar; i++) {
      let commentStarLi = document.createElement("li");
      commentStar.appendChild(commentStarLi);

      let bi_star_i = document.createElement("i");
      bi_star_i.classList.add("bi");
      bi_star_i.classList.add("bi-star-fill");
      commentStarLi.appendChild(bi_star_i);
    }

    let commentMeta = document.createElement("div");
    commentMeta.classList.add("comment-meta");
    commentText.appendChild(commentMeta);

    let strong = document.createElement("strong");
    strong.innerHTML = comment.ad;
    commentMeta.appendChild(strong);

    let span = document.createElement("span");
    span.innerHTML = "-";
    commentMeta.appendChild(span);

    let time = document.createElement("time");
    time.innerHTML = comment.tarih;
    commentMeta.appendChild(time);

    let commentDescription = document.createElement("div");
    commentDescription.classList.add("comment-description");
    commentText.appendChild(commentDescription);

    let p = document.createElement("p");
    p.innerHTML = comment.yorum;
    commentDescription.appendChild(p);
  });
}

window.onload = function () {
  displayComments();
};
