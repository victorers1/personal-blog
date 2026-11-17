export const languagePreferenceKey = 'bloggpt-language';

export function preferredLocale(
  supported: readonly string[],
  saved: string | null,
  browserLanguages: readonly string[],
  fallback: string,
): string {
  const match = (language: string) => {
    const normalized = language.toLowerCase();
    return (
      supported.find((locale) => locale.toLowerCase() === normalized) ??
      supported.find(
        (locale) =>
          locale.toLowerCase().split('-')[0] === normalized.split('-')[0],
      )
    );
  };
  for (const language of [...(saved ? [saved] : []), ...browserLanguages]) {
    const locale = match(language);
    if (locale) return locale;
  }
  return fallback;
}

export function saveLanguagePreference(locale: string): void {
  try {
    localStorage.setItem(languagePreferenceKey, locale);
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
}
