"use client";
import React, {useState, useEffect} from 'react';
import SettingsModal from './settingsModal.jsx';
import TypesArea from './typesArea.jsx'
import ResultsArea from './resultsArea.jsx'
import {getEffectivenessAgainstSelectedTypes} from './utils/data.jsx';
import {FormattedMessage, IntlProvider} from 'react-intl';
import en from '../locales/en.json';
import es from '../locales/es.json';
import Image from "next/image";

const messages = {
    en,
    es
};

export default function Home() {
    const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') || 'es' : 'es';
    const savedBackground = typeof window !== 'undefined' ? localStorage.getItem('background') || 'poke' : 'poke';
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [locale, setLocale] = useState(savedLocale);
    const [background, setBackground] = useState(savedBackground);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [effectiveness, setEffectiveness] = useState({});


    useEffect(() => {
        if (selectedTypes.length > 0) {
            setEffectiveness(getEffectivenessAgainstSelectedTypes(selectedTypes));
        } else {
            setEffectiveness({}); // Reset effectiveness when no types are selected
        }
    }, [selectedTypes]);

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

                    <div className="flex flex-col w-full lg:w-fit lg:flex-row-reverse lg:items-center my-2 lg:my-0 lg:mt-8">
                        <div className="flex justify-end w-full lg:w-fit">
                            <button className="w-fit hover:bg-gray-100/15 p-1 lg:ms-2 rounded-xl me-2 lg:me-0"
                                    onClick={() => setIsSettingsOpen(true)}>
                                <Image src="/assets/settings.svg" alt="Settings" width={24} height={24}/>
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