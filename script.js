async function handlercheckbutton() {

  const emoji1 = document.getElementById("first");
  const emoji2 = document.getElementById("second");

  // Vérifions que les inputs ne sont pas vide

  // console.log(typeof(emoji1.value), typeof(emoji2.value));

  if (!emoji1.value || !emoji2.value)  {
    alert("Je ne peux pas fusionner sans avoir deux émojis.")
    return;
  }

  if (!getEmojiName(emoji1.value) || !getEmojiName(emoji2.value)) {
    alert("Veuillez mettre des émojis (Win + ; sur Windows) ou un nom d'émoji Discord (ex: heart, smiley)")
    return;
  }


  function isStrictEmoji(value) {
  return /^\p{Extended_Pictographic}+$/u.test(value);
  }

  function getEmojiName(value) {
    // Check if it's a strict emoji
    if (isStrictEmoji(value)) {
      return EmojisName[value];
    }
    // Check if it's a Discord emoji name
    const discordNames = Object.values(EmojisName);
    if (discordNames.includes(value)) {
      return value;
    }
    return null;
  }


  const eName1 = getEmojiName(emoji1.value)
  const eName2 = getEmojiName(emoji2.value)

  const nameImg1 = eName1 + "-" + eName2 + ".png"
  const nameImg2 = eName2 + "-" + eName1 + ".png"

  // console.log(nameImg1);
  // console.log(nameImg2);

  
  const Img1 = await fetch("Images/"+nameImg1)

  let finalImg = null;

  if (Img1.ok === true) {

    let taille = 1000

    while (taille > 534 || taille < 0) {
      let saisie = prompt("Entre une taille (0 = default) inférieur à 534:");
      taille = Number(saisie);
    }

      

    if (taille !== 0) {
      // On resize car l'user veut une taille différente de celle par défaut
      finalImg = await resizeImg("Images/" +nameImg1, taille)
      } else {
        // On resize pas donc envoi l'image tel quel
        finalImg = "Images/"+nameImg1;
      }

      // console.log("Image trouvée 1er IF")

  } else {

    const Img2 = await fetch("Images/"+nameImg2)
    if (Img2.ok === true) {

      let taille = 1000

      while (taille > 534 || taille < 0) {
        let saisie = prompt("Entre une taille (0 = default) inférieur à 534:");
        taille = Number(saisie);
      }
      

      if (taille !== 0) {
        // On resize car l'user veut une taille différente de celle par défaut
        finalImg = await resizeImg("Images/"+nameImg2, taille)
        } else {
          // On resize pas donc envoi l'image tel quel
          finalImg = "Images/"+nameImg2;
        }

      // console.log("Image trouvée 2er IF")
        
    }

    else {
      console.log("No match found")
      alert("Il n'y a pas cette fusion dans la base de données, propose à VaxCyr de la rajouter !")
    }


  }

  if (finalImg !== null) {
  afficherImage(finalImg);
  }


}

function resizeImg(src, size) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);

      resolve(canvas.toDataURL("image/png"));
    };
    img.src = src;
  });
}



function afficherImage(src) {
  const container = document.getElementById("result");

  container.innerHTML = "";

  const img = document.createElement("img");
  img.src = src;
  img.style.width = "300px";

  const btn = document.createElement("a");
  btn.id = "download-btn"; // ID DU BOUTON
  btn.textContent = "Télécharger";
  btn.href = src;
  btn.download = "customoji.png";

  container.appendChild(img);
  container.appendChild(btn);

  document.getElementById("result").style.display = "flex";
  
}

// Populate emoji dropdowns
document.addEventListener("DOMContentLoaded", () => {
  const dropdownFirst = document.getElementById("dropdown-first");
  const dropdownSecond = document.getElementById("dropdown-second");

  for (const emoji in EmojisName) {
    const span1 = document.createElement("span");
    span1.textContent = emoji;
    span1.classList.add("emoji-item");
    span1.dataset.emoji = emoji;
    dropdownFirst.appendChild(span1);

    const span2 = document.createElement("span");
    span2.textContent = emoji;
    span2.classList.add("emoji-item");
    span2.dataset.emoji = emoji;
    dropdownSecond.appendChild(span2);
  }

  const btnFirstEmoji = document.getElementById("btn-first-emoji");
  const btnSecondEmoji = document.getElementById("btn-second-emoji");
  const inputFirst = document.getElementById("first");
  const inputSecond = document.getElementById("second");

  btnFirstEmoji.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownFirst.classList.toggle("show");
    dropdownSecond.classList.remove("show");
  });

  btnSecondEmoji.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownSecond.classList.toggle("show");
    dropdownFirst.classList.remove("show");
  });

  document.addEventListener("click", (event) => {
    if (!dropdownFirst.contains(event.target) && !btnFirstEmoji.contains(event.target)) {
      dropdownFirst.classList.remove("show");
    }
    if (!dropdownSecond.contains(event.target) && !btnSecondEmoji.contains(event.target)) {
      dropdownSecond.classList.remove("show");
    }
  });

  dropdownFirst.addEventListener("click", (event) => {
    if (event.target.classList.contains("emoji-item")) {
      inputFirst.value = event.target.dataset.emoji;
      dropdownFirst.classList.remove("show");
    }
  });

  dropdownSecond.addEventListener("click", (event) => {
    if (event.target.classList.contains("emoji-item")) {
      inputSecond.value = event.target.dataset.emoji;
      dropdownSecond.classList.remove("show");
    }
  });
});
