/**
 * Calculate reading time for mixed CJK and Latin content.
 * CJK reading speed: ~400 chars/min
 * Latin reading speed: ~200 words/min
 */
export function getReadingTime(content: string): string {
  // Strip HTML tags and code blocks
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .trim();

  // CJK character ranges
  const cjkRegex =
    /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u2e80-\u2eff\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef]/g;

  // Count CJK characters
  const cjkMatches = cleanContent.match(cjkRegex);
  const cjkCharCount = cjkMatches ? cjkMatches.length : 0;

  // Remove CJK characters to count Latin words
  const latinContent = cleanContent.replace(cjkRegex, ' ').trim();
  const latinWords = latinContent
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const latinWordCount = latinWords.length;

  // Calculate reading time in minutes
  const cjkTime = cjkCharCount / 400;
  const latinTime = latinWordCount / 200;
  const totalMinutes = Math.max(1, Math.ceil(cjkTime + latinTime));

  return `${totalMinutes} 分钟`;
}
