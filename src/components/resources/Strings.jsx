class strings {
    constructor (bulbHint, restartHint, praiseText, flagHUHint, flagUSHint, plusHint, minusHint, muliplicationHint, divisionHint, languageModalText) {
        this.bulbHint = bulbHint;
        this.restartHint = restartHint;
        this.flagHUHint = flagHUHint;
        this.flagUSHint = flagUSHint;
        this.plusHint = plusHint;
        this.minusHint = minusHint;
        this.muliplicationHint = muliplicationHint;
        this.divisionHint = divisionHint;
        this.praiseText = praiseText;
        this.languageModalText = languageModalText
    }
}

export const huStrings = new strings('Megoldás megmutatása',
                                    'Újrakezdés', 
                                    'Gratulálunk!',
                                    'Váltás magyar nyelvre',
                                    'Váltás angol nyelvre',
                                    'Váltás összeadásra',
                                    'Váltás kivonásra',
                                    'Váltás szorzásra',
                                    'Váltás osztásra',
                                    'Valóban nyelvet váltasz?');

export const usENStrings = new strings('Show results',
                                    'Start over',
                                    'Excellent!',
                                    'Change to Hungarian',
                                    'Change to English(US)',
                                    'Change to addition',
                                    'Change to subtraction',
                                    'Change to multiplication',
                                    'Change to division',
                                    'Do you really want to change the language?');

export default function getLanguage(language) {
    switch (language) {
        case 'hu':
            return huStrings;
        case 'us':
            return usENStrings;
        default:
            return usENStrings;
    }
}