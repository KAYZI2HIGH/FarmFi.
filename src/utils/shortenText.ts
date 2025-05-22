export function shortenText(
  text: string,
  options: {
    maxLength?: number;
    ellipsis?: string; 
    keepFullWords?: boolean;
    suffix?: string;
    separator?: string; 
  } = {}
): string {
  const {
    maxLength = 50,
    ellipsis = "...",
    keepFullWords = false,
    suffix = "",
    separator = " ",
  } = options;

  if (text.length <= maxLength) return text;

  if (keepFullWords) {
    const words = text.split(separator);
    let result = "";
    let currentLength = 0;

    for (const word of words) {
      const newLength =
        currentLength +
        word.length +
        (currentLength > 0 ? separator.length : 0);

      if (newLength + ellipsis.length + suffix.length <= maxLength) {
        result += (currentLength > 0 ? separator : "") + word;
        currentLength = newLength;
      } else {
        break;
      }
    }

    return result + ellipsis + suffix;
  }

  return (
    text.slice(0, maxLength - ellipsis.length - suffix.length) +
    ellipsis +
    suffix
  );
}
