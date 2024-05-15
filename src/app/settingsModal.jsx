"use client";
import React, {useState} from 'react';
import {BgThumbnail} from './bgThumbnail.jsx'
import {FormattedMessage} from "react-intl";
import Modal from 'react-modal';

function SettingsModal({isOpen, onClose, onLanguageChange, onBackgroundChange, currentBackground, currentLocale}) {
    const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
    const [selectedBackground, setSelectedBackground] = useState(currentBackground);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        onLanguageChange(language);
        localStorage.setItem('locale', language);
    };

    const handleBackgroundChange = (background) => {
        setSelectedBackground(background);
        onBackgroundChange(background);
        localStorage.setItem('background', background);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="flex flex-col h-fit w-3/4 lg:w-1/3 py-2 px-5 pb-6 rounded-xl backdrop-blur-md bg-gray-500/40 drop-shadow-2xl shadow-black/30"
            overlayClassName="fixed inset-0 bg-gray-700/10 flex justify-center pt-20 lg:pt-32"
            ariaHideApp={false}
        >
            <div className="flex justify-end">
                <button onClick={onClose}>
                    {/*    X svg*/}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-md text-white hover:bg-white/10"
                         fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>

                </button>
            </div>
            <div className="">
                <h3>
                    <FormattedMessage id="language"/>
                </h3>
                <div className="flex flex-row justify-start space-x-3 my-2">
                    <button
                        className={`py-1 w-[40px] rounded-md text-xs ${selectedLanguage === 'en' ? 'border border-white' : 'hover:bg-white/10'}`}
                        onClick={() => handleLanguageChange('en')}
                    >
                        EN
                    </button>
                    <button
                        className={`py-1 w-[40px] rounded-md text-xs ${selectedLanguage === 'es' ? 'border border-white' : 'hover:bg-white/10'}`}
                        onClick={() => handleLanguageChange('es')}
                    >
                        ESP
                    </button>
                </div>
            </div>
            <div>
                <h3>
                    <FormattedMessage id="background"/>
                </h3>
                <div className="flex flex-wrap justify-start gap-1 my-2">
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/poke_bg_thumb.webp"
                        alt="Pokeball"
                        selected={selectedBackground === 'poke'}
                        onClick={() => handleBackgroundChange('poke')}
                    />
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/hunter_bg_thumb.webp"
                        alt="Hunter"
                        selected={selectedBackground === 'hunter'}
                        onClick={() => handleBackgroundChange('hunter')}
                    />
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/porygon_bg_thumb.webp"
                        alt="Porygon"
                        selected={selectedBackground === 'porygon'}
                        onClick={() => handleBackgroundChange('porygon')}
                    />
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/monster_bg_thumb.webp"
                        alt="Monster"
                        selected={selectedBackground === 'monster'}
                        onClick={() => handleBackgroundChange('monster')}
                    />
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/muk_bg_thumb.webp"
                        alt="Muk"
                        selected={selectedBackground === 'muk'}
                        onClick={() => handleBackgroundChange('muk')}
                    />
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/ghast_bg_thumb.webp"
                        alt="Ghast"
                        selected={selectedBackground === 'ghast'}
                        onClick={() => handleBackgroundChange('ghast')}
                    />
                    <BgThumbnail
                        src="/assets/backgrounds/thumbs/pokeball_bg_thumb.webp"
                        alt="Pokeball"
                        selected={selectedBackground === 'pokeball'}
                        onClick={() => handleBackgroundChange('pokeball')}
                    />

                </div>

            </div>
        </Modal>);
}

export default SettingsModal;