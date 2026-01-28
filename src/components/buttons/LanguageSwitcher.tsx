import { useState, useRef, useEffect } from 'react';
import i18n from '../../i18n';
import { JapanFlag, USFlag } from '../../assets/Assets';

const LANGUAGES = [
  { code: 'ja', label: '日本語', flag: <JapanFlag/> },
  { code: 'en', label: 'English', flag: <USFlag/> },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language? i18n.language : 'ja');
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setSelectedLang(code);
    setOpen(false);
    i18n.changeLanguage(code);
};

  const current = LANGUAGES.find(l => l.code === selectedLang);

  return (
    <div ref={ref} className="relative inline-block text-left pr-[10px] justify-items-end">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-neutral-100/5 w-[29px] h-[28px] flex items-center justify-center rounded-[3px] shadow-sm bg-[#F7F7F7] hover:bg-[#E4E4E4] focus:outline-none cursor-pointer"
      >
        <span className="text-xl">{current?.flag}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 fade-in">
          <div className="px-4 py-2 text-sm text-gray-400">Language</div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm ${
                selectedLang === lang.code ? 'font-bold text-black' : 'text-gray-700'
              } hover:bg-neutral-100 hover:rounded-md hover:cursor-pointer`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
