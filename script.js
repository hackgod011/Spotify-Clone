console.log("Welcome to Spotify!");

let songIndex = 1;
let audioElement = new Audio('Songs/1.mp3');
let Masterplay = document.getElementById('Masterplay');
let MyProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('SongItem'));
let sn = document.getElementById('sn');

let songs = [
    {songName:"Warriyo - Mortals", filepath:"Songs/1.mp3", coverpath:"Covers/1.jpg"},
    {songName:"Cielo", filepath:"Songs/2.mp3", coverpath:"Covers/2.jpg"},
    {songName:"Invincible", filepath:"Songs/3.mp3", coverpath:"Covers/3.jpg"},
    {songName:"My Heart", filepath:"Songs/4.mp3", coverpath:"Covers/4.jpg"},
    {songName:"Heroes-Tonight", filepath:"Songs/5.mp3", coverpath:"Covers/5.jpg"},
    {songName:"Street Legends", filepath:"Songs/6.mp3", coverpath:"Covers/6.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;   // Instead of tagname or classname we can use queryselector
    element.getElementsByClassName("SongName")[0].innerText = songs[i].songName;
});

//Handle play/pause click
Masterplay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        Masterplay.classList.remove('fa-play');
        Masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        Masterplay.classList.remove('fa-pause');
        Masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

//Listen to events
audioElement.addEventListener("timeupdate",()=>{
   //Update seekbar
   progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
   MyProgressBar.value = progress;
});

//Able to skip to certain section of song
MyProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = MyProgressBar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach(element=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

Array.from(document.getElementsByClassName('SongItemPlay')).forEach(element=>{
    element.addEventListener('click', (e)=>{
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `Songs/${songIndex}.mp3`;
        sn.innerHTML = songs[songIndex-1].songName;
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        audioElement.play();
        Masterplay.classList.remove('fa-play');
        Masterplay.classList.add('fa-pause');
    });
});

document.getElementById('forward').addEventListener('click',()=>{
    if(songIndex > 6){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    sn.innerHTML = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    Masterplay.classList.remove('fa-play');
    Masterplay.classList.add('fa-pause');
});

document.getElementById('backward').addEventListener('click',()=>{
    if(songIndex < 1){
        songIndex = 6;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    sn.innerHTML = songs[songIndex-1].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    Masterplay.classList.remove('fa-play');
    Masterplay.classList.add('fa-pause');
});