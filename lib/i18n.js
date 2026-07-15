'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import heDefault from '@/locales/he.json';
import enDefault from '@/locales/en.json';

const defaultDictionaries = { he: heDefault, en: enDefault };
const STORAGE_KEY = 'tomgiat:locale';

// Published Google Sheet CSV for site text ("Translations" tab). Columns:
// key, he, en. Leave a cell blank to keep the built-in text from
// locales/he.json / locales/en.json for that row.
const TRANSLATIONS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSsUd0h5YkG6pV2vzDB41Rd5hCC_45iB9PmNZbDrP0YtBTEWuUKnm0PiUHH06pf7V9W8MAAXaFp-DJU/pub?gid=553722379&single=true&output=csv';

// Rebuilds a nested translations object from flat dot-path keys, e.g.
// "oneEyeOpen.facts.0.1" -> { oneEyeOpen: { facts: [[..., ...]] } }.
function setPath(root, path, value) {
  const parts = path.split('.');
  let node = root;
  parts.forEach((part, i) => {
    if (i === parts.length - 1) {
      node[part] = value;
      return;
    }
    if (typeof node[part] !== 'object' || node[part] === null) {
      node[part] = {};
    }
    node = node[part];
  });
}

function arrayify(node) {
  if (typeof node !== 'object' || node === null) return node;
  const keys = Object.keys(node);
  const entries = keys.map((key) => [key, arrayify(node[key])]);
  const isArray = keys.length > 0 && keys.every((key, i) => key === String(i));
  if (isArray) {
    return entries.sort((a, b) => Number(a[0]) - Number(b[0])).map(([, value]) => value);
  }
  return Object.fromEntries(entries);
}

function unflatten(flatMap) {
  const root = {};
  Object.entries(flatMap).forEach(([path, value]) => setPath(root, path, value));
  return arrayify(root);
}

// Overlays sheet-provided text onto the shipped defaults. Only non-empty
// string leaves override; anything missing or blank in the sheet keeps the
// built-in default, so the site never breaks if a row hasn't been filled in.
function overlay(base, patch) {
  if (Array.isArray(base)) {
    if (!Array.isArray(patch)) return base;
    return base.map((item, i) => overlay(item, patch[i]));
  }
  if (base !== null && typeof base === 'object') {
    if (patch === null || typeof patch !== 'object') return base;
    const result = {};
    Object.keys(base).forEach((key) => {
      result[key] = overlay(base[key], patch[key]);
    });
    return result;
  }
  return typeof patch === 'string' && patch.trim() !== '' ? patch : base;
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('he');
  const [dictionaries, setDictionaries] = useState(defaultDictionaries);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'he' || stored === 'en') {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    if (!TRANSLATIONS_CSV_URL) return;

    let cancelled = false;

    fetch(TRANSLATIONS_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((csvText) => {
        if (cancelled) return;
        const { data } = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });

        const heFlat = {};
        const enFlat = {};
        data.forEach((row) => {
          const key = (row.key || '').trim();
          if (!key) return;
          heFlat[key] = (row.he || '').trim();
          enFlat[key] = (row.en || '').trim();
        });

        setDictionaries({
          he: overlay(heDefault, unflatten(heFlat)),
          en: overlay(enDefault, unflatten(enFlat)),
        });
      })
      .catch(() => {
        // Sheet unreachable: keep the built-in defaults.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = (next) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale, dictionaries]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
