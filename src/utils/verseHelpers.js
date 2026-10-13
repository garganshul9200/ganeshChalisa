/**
 * Flatten content verses for the read screen.
 * Supports chalisa (doha/chopai/dohaAtEnd) and aarti (verses).
 */
function getLocalizedLines(section, language) {
  if (!section) {
    return [];
  }
  return section[language] || section.hindi || section.hinglish || [];
}

export function buildReadVerses(content, language) {
  if (!content) {
    return [];
  }

  if (content.verses) {
    return getLocalizedLines(content.verses, language).map((text, index) => ({
      id: `v-${index}`,
      number: index + 1,
      text,
      showDividerAfter: (index + 1) % 4 === 0,
    }));
  }

  const doha = getLocalizedLines(content.doha, language);
  const chopai = getLocalizedLines(content.chopai, language);
  const dohaAtEnd = getLocalizedLines(content.dohaAtEnd, language);
  const all = [...doha, ...chopai, ...dohaAtEnd];

  return all.map((text, index) => ({
    id: `v-${index}`,
    number: index + 1,
    text,
    showDividerAfter:
      index + 1 === doha.length ||
      (index + 1 > doha.length &&
        (index + 1 - doha.length) % 4 === 0 &&
        index + 1 < doha.length + chopai.length) ||
      index + 1 === doha.length + chopai.length,
  }));
}
