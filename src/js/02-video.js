import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { load } from './storage';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

initPage();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}

function initPage() {
  const saveData = load(LOCAL_STORAGE_KEY);
  if (saveData) {
    player.setCurrentTime(saveData);
  }
}
