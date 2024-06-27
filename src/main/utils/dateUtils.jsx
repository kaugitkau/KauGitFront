import { formatDistanceToNow } from 'date-fns';
import { enUS, ko, zhCN, ja, arSA, es, fr } from 'date-fns/locale';
import i18n from './i18n'; // Import the i18n configuration
import { getLanguageFromUrl } from './urlUtils'; // Import the URL utility

const localeMap = {
  en: enUS,
  ko: ko,
  zh: zhCN,
  ja: ja,
  ar: arSA,
  es: es,
  fr: fr
};

export const getRelativeTime = (date) => {
  const urlLang = getLanguageFromUrl();
  const currentLanguage = urlLang ? urlLang.split('-')[0] : i18n.language.split('-')[0]; // Use URL param if available
  const locale = localeMap[currentLanguage] || enUS;
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale });
};
