console.log("This is js");

async function main() {
  let res = await fetch("songs.json");
  let songs = await res.json();
  
  console.log(songs);
  //   let audio = new Audio(songs[2]);
  //   audio.play();

  let href = songs[0];
  console.log("this is link", href);

  // Step 1: Get file name only
  let fileName = href.split("/").pop(); // "Lukas_Graham_-_7_Years.mp3"
  console.log("1 ", fileName);
  let File = fileName;
  console.log("2 ", File);
  // Step 2: Remove .mp3 extension
  fileName = fileName.replace(".mp3", ""); // "Lukas_Graham_-_7_Years"

  // Step 3: Split artist and song using "-_"
  let [artistRaw, songRaw] = fileName.split("-_"); // ["Lukas_Graham", "7_Years"]

  // Step 4: Replace underscores with spaces
  let artist = artistRaw.replaceAll("_", " "); // "Lukas Graham"
  let song = songRaw.replaceAll("_", " "); // "7 Years"

  console.log("🎤 Artist:", artist);
  console.log("🎶 Song:", song);

  function getCoverForSong(File) {
    // Remove .mp3 and replace with .jpg
    let coverName = File.replace(".mp3", ".jpeg");

    // Assuming covers folder is sibling to songs folder
    let coverUrl = "Cover/" + coverName;

    return coverUrl;
  }

  let cover = getCoverForSong(File);
  let img = document.createElement("img");
  img.src = cover;
  // document.body.append(img);

  function playSong() {
    let audio = new Audio(songs[0]);
    audio.play();
    audio.addEventListener("loadedmetadata", () => {
      console.log("Length:", audio.duration); // in seconds
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

  let SongCard = document.getElementsByClassName("songCard")[0];
  SongCard.addEventListener("click", playSong);
}

main();
