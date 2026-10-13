import contentsData from '../../data/contents.json';

const CONTENTS = contentsData;

const MEDIA = {
  images: {
    'shriGanesh.webp': require('../../assets/deities/shriGanesh.webp'),
  },
  audio: {
    'ganesh_chalisa.mp3': require('../../assets/audio/ganesh_chalisa.mp3'),
  },
};

const INDEX_BY_ID = Object.freeze(
  Object.fromEntries(CONTENTS.map((item, index) => [item.id, index])),
);

export function getContentById(id) {
  const index = INDEX_BY_ID[id];
  return typeof index === 'number' ? CONTENTS[index] : null;
}

export function getContentByType(type) {
  return CONTENTS.find(item => item.type === type) ?? null;
}

export function getChalisaTitle(chalisa, language = 'hindi') {
  if (!chalisa?.title) {
    return '';
  }
  if (typeof chalisa.title !== 'object') {
    return String(chalisa.title);
  }
  return (
    chalisa.title[language] ||
    chalisa.title.hindi ||
    chalisa.title.hinglish ||
    ''
  );
}

export function getDeityImageSource(image) {
  return MEDIA.images[image] ?? null;
}

export function getChalisaAudioSource(chalisa) {
  return MEDIA.audio[chalisa?.audioUrl] ?? null;
}

export function hasChalisaAudio(chalisa) {
  return Boolean(getChalisaAudioSource(chalisa));
}

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
