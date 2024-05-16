"use client";
import React, {useState, useEffect} from 'react';
import {FormattedMessage, IntlProvider} from 'react-intl';
import en from '../locales/en.json';
import es from '../locales/es.json';
import SettingsModal from './settingsModal.jsx';
import TypesArea from './typesArea.jsx'
import ResultsArea from './resultsArea.jsx'
import {getEffectivenessAgainstSelectedTypes} from './utils/data.jsx';

const messages = {
    en,
    es
};

export default function Home() {
    const isClient = typeof window !== 'undefined';
    const [locale, setLocale] = useState('es');
    const [background, setBackground] = useState('poke');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [effectiveness, setEffectiveness] = useState({});

    // Load locale and background from localStorage
    useEffect(() => {
        if (isClient) {
            const savedLocale = localStorage.getItem('locale') || 'en';
            const savedBackground = localStorage.getItem('background') || 'poke';
            setLocale(savedLocale);
            setBackground(savedBackground);
        }
    }, [isClient]);

    // Calculate effectiveness when selected types change
    useEffect(() => {
        if (selectedTypes.length > 0) {
            setEffectiveness(getEffectivenessAgainstSelectedTypes(selectedTypes));
        } else {
            setEffectiveness({}); // Reset effectiveness when no types are selected
        }
    }, [selectedTypes]);


    // Preload images
    useEffect(() => {
        const imageList = [
            "/assets/backgrounds/poke_bg.webp",
            "/assets/backgrounds/hunter_bg.webp",
            "/assets/backgrounds/porygon_bg.webp",
            "/assets/backgrounds/monster_bg.webp",
            "/assets/backgrounds/muk_bg.webp",
            "/assets/backgrounds/ghast_bg.webp",
            "/assets/backgrounds/pokeball_bg.webp",
            "/assets/backgrounds/thumbs/poke_bg_thumb.webp",
            "/assets/backgrounds/thumbs/hunter_bg_thumb.webp",
            "/assets/backgrounds/thumbs/porygon_bg_thumb.webp",
            "/assets/backgrounds/thumbs/monster_bg_thumb.webp",
            "/assets/backgrounds/thumbs/muk_bg_thumb.webp",
            "/assets/backgrounds/thumbs/ghast_bg_thumb.webp",
            "/assets/backgrounds/thumbs/pokeball_bg_thumb.webp"
        ];

        imageList.forEach((image) => {
            const img = new window.Image();
            img.src = image;
            img.loading = 'lazy';
        });
    }, []);

    const handleLocaleChange = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale); // Save new locale to localStorage
    };

    const handleBackgroundChange = (newBackground) => {
        setBackground(newBackground);
        localStorage.setItem('background', newBackground); // Save new background to localStorage
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <main
                className={`${background} flex min-h-screen w-auto flex-col items-center`}>
                <div
                    className="flex flex-col w-[80%] mt-16 mb-16 items-center rounded-xl backdrop-blur-md bg-gray-500/40 drop-shadow-2xl shadow-black/10">

                    <div
                        className="flex flex-col w-full lg:w-fit lg:flex-row-reverse lg:items-center my-2 lg:my-0 lg:mt-8">
                        <div className="flex justify-end w-full lg:w-fit">
                            <button
                                className="w-fit hover:bg-gray-100/15 p-0.5 lg:ms-2 rounded-xl me-2 lg:me-0"
                                onClick={() => setIsSettingsOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                     fill="currentColor">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path
                                        d="M14.647 4.081a.724 .724 0 0 0 1.08 .448c2.439 -1.485 5.23 1.305 3.745 3.744a.724 .724 0 0 0 .447 1.08c2.775 .673 2.775 4.62 0 5.294a.724 .724 0 0 0 -.448 1.08c1.485 2.439 -1.305 5.23 -3.744 3.745a.724 .724 0 0 0 -1.08 .447c-.673 2.775 -4.62 2.775 -5.294 0a.724 .724 0 0 0 -1.08 -.448c-2.439 1.485 -5.23 -1.305 -3.745 -3.744a.724 .724 0 0 0 -.447 -1.08c-2.775 -.673 -2.775 -4.62 0 -5.294a.724 .724 0 0 0 .448 -1.08c-1.485 -2.439 1.305 -5.23 3.744 -3.745a.722 .722 0 0 0 1.08 -.447c.673 -2.775 4.62 -2.775 5.294 0zm-2.647 4.919a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"/>
                                </svg>
                            </button>
                        </div>
                        <h1 className="text-xl font-bold text-center">
                            <FormattedMessage id="pokemonTypeCalculator"/>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row m-8 gap-6">
                        <TypesArea selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}/>
                        <ResultsArea selectedTypes={selectedTypes} effectiveness={effectiveness}/>
                    </div>
                </div>
                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    onLanguageChange={handleLocaleChange}
                    onBackgroundChange={handleBackgroundChange}
                    currentBackground={background}
                    currentLocale={locale}
                />
            </main>
        </IntlProvider>
    );
}