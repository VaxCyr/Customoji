async function handlercheckbutton() {

  const emoji1 = document.getElementById("first");
  const emoji2 = document.getElementById("second");

  // Vérifions que les inputs ne sont pas vide

  console.log(emoji1.value, emoji2.value);

  if (!emoji1.value || !emoji2.value)  {
    alert("Je ne peux pas fusionner sans avoir deux émojis.")
    return;
  }

  const eName1 = EmojisName[emoji1.value]
  const eName2 = EmojisName[emoji2.value]

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

      console.log("Image trouvée 1er IF")

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

      console.log("Image trouvée 2er IF")
        
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
