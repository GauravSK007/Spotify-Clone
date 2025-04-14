console.log("This is js");

async function main() {
  let res = await fetch("songs.json");
  let songs = await res.json();
  console.log(songs);

  for (let index = 0; index < songs.length; index++) {
    const element = songs[index];

    let fileName = element.split("/").pop(); // "Lukas_Graham_-_7_Years.mp3"
    let File = fileName;

    fileName = fileName.replace(".mp3", ""); // "Lukas_Graham_-_7_Years"

    let [artistRaw, songRaw] = fileName.split("-_"); // ["Lukas_Graham", "7_Years"]

    let artist = artistRaw.replaceAll("_", " "); // "Lukas Graham"
    let song = songRaw.replaceAll("_", " "); // "7 Years"

    console.log("🎤 Artist:", artist);
    console.log("🎶 Song:", song);

    function getCoverForSong(File) {
      // Remove .mp3 and replace with .jpg
      let coverName = File.replace(".mp3", ".jpeg");
      let coverUrl = "Cover/" + coverName;
      return coverUrl;
    }

    let coverUrl = getCoverForSong(File);
    let ul = document.getElementsByClassName("ul")[0];
    let li = document.createElement("li");
    li.innerHTML = `<div class="songCard">
                  <img
                    src="${coverUrl}"
                    alt="cover1"
                    class="cover"
                    height="40px" />
                  <div class="info">
                    <div class="song">${song}</div>
                    <div class="artist">${artist}</div>
                  </div>
                  <div class="playLogo">
                    <i class="fa-solid fa-circle-play"></i>
                  </div>
                  <div class="songTime">3:45</div>
                </div>`;
    ul.append(li);

    let dummyAudio = new Audio(songs[index]);
    dummyAudio.addEventListener("loadedmetadata", () => {
      let duration = dummyAudio.duration; // In seconds
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let formattedTime = `${minutes}:${seconds}`;
      let songTime = document.getElementsByClassName("songTime")[index];
      console.log(songTime);
      songTime.textContent = formattedTime;

      // li.innerHTML = `<div class="songCard">
      //             <img
      //               src="${coverUrl}"
      //               alt="cover1"
      //               class="cover"
      //               height="40px" />
      //             <div class="info">
      //               <div class="song">${song}</div>
      //               <div class="artist">${artist}</div>
      //             </div>
      //             <div class="playLogo">
      //               <i class="fa-solid fa-circle-play"></i>
      //             </div>
      //             <div class="songTime">3:45</div>
      //           </div>`;
      // ul.append(li);
    });
  }

  setTimeout(() => {
    let songNum = 0;
    let songPlaying = false;
    let audio = new Audio(); // Create only ONE audio object globally
    let songCards = document.getElementsByClassName("songCard");

    for (let i = 0; i < songCards.length; i++) {
      songCards[i].addEventListener("click", function () {
        audio.src = songs[i]; // set song based on index
        audio.play(); // play it
        console.log(songPlaying);
        // audio.play(); // play it
        songPlaying = true;
        console.log(songPlaying);
        console.log(`Now playing: ${songs[i]}`);
        document.querySelector(
          ".play"
        ).innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
        songNum = i;
        console.log("Song Number: ", songNum);
      });

      let progressBar = document.getElementById("progressBar");
      let progressContainer = document.getElementById("progressContainer");

      // update bar as song plays
      audio.addEventListener("timeupdate", () => {
        let percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + "%";
      });

      // seek when user clicks on bar
      progressContainer.addEventListener("click", (e) => {
        let containerWidth = progressContainer.clientWidth;
        let clickX = e.offsetX;
        let duration = audio.duration;

        audio.currentTime = (clickX / containerWidth) * duration;
      });
    }

    let toggleButton = document.querySelector(".play");
    toggleButton.addEventListener("click", function () {
      if (songPlaying) {
        audio.pause();
        songPlaying = false;
        console.log(songPlaying);
        toggleButton.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
      } else {
        audio.play();
        songPlaying = true;
        console.log(songPlaying);
        toggleButton.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
      }
    });

    let prev = document.querySelector(".backward");
    prev.addEventListener("click", function () {
      if (songNum == 0) {
        return;
      }
      audio.src = songs[songNum - 1];
      console.log(songNum);
      audio.play();
      songNum = songNum - 1;
    });
    let next = document.querySelector(".forward");
    next.addEventListener("click", function () {
      if (songNum == songs.length - 1) {
        return;
      }
      audio.src = songs[songNum + 1];
      audio.play();
      songNum = songNum + 1;
    });
    let bigCards = document.getElementsByClassName("card");
    for (let index = 0; index < bigCards.length; index++) {
      const element = bigCards[index];
      element.addEventListener("click", function () {
        let songName = element.querySelector(".songName").innerHTML;
        console.log(songName);
        let songWords = songName.split(" ");
        console.log(songWords);
        for (let index = 0; index < songs.length; index++) {
          const element = songs[index];
          if (
            element.includes(songWords[0]) ||
            element.includes(songWords[1])
          ) {
            console.log(element);
            audio.src = element;
            audio.play();
          }
        }
        songPlaying = true;
        document.querySelector(
          ".play"
        ).innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;

      });
    }
    audio.addEventListener("timeupdate", () => {
      let duration = audio.currentTime;
      let min = Math.floor(duration / 60);
      let sec = Math.floor(duration % 60);
      console.log(`${min}:${sec}`);
      if (sec < 10) {
        sec = "0" + sec;
      }
      document.querySelector(".current-time").innerHTML = `${min}:${sec}`;
    });
    audio.addEventListener("loadedmetadata", () => {
      let duration = audio.duration; // In seconds
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let formattedTime = `${minutes}:${seconds}`;
      document.querySelector(".length").innerHTML = formattedTime;
    });
  }, 1000);

  let popup = document.getElementsByClassName("artistCard");
  console.log(popup);
  for (let index = 0; index < popup.length; index++) {
    const element = popup[index];
    element.addEventListener("click", function () {
      document.getElementsByClassName("popupParent")[0].style.display = "flex";
    });
  }
  let popupClose = document.getElementsByClassName("close")[0];

  popupClose.addEventListener("click", function () {
    document.getElementsByClassName("popupParent")[0].style.display = "none";
  });

  let burger = document
    .querySelector(".burger-box")
    .getElementsByTagName("i")[0];
  console.log(burger);
  burger.addEventListener("click", function () {
    document.querySelector(".side-bar").style.display = "block";
  });

  let close = document.querySelector(".heading").getElementsByTagName("i")[0];
  console.log(close);
  close.addEventListener("click", function () {
    document.querySelector(".side-bar").style.display = "none";
  });
}

main();
