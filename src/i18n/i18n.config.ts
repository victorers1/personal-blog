import en from './en.ts';
import pt from './pt.ts';
import type { LanguagePack } from '../lib/translations.ts';

/** UI translations only. blog.config.ts independently selects the site's content languages. */
const languages: Record<string, LanguagePack> = {
  pt: { label: 'Português (Brasil)', messages: pt },
  en: { label: 'English', messages: en },
};

export default languages;
