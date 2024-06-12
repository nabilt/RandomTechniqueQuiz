document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
});

function generateTechnique() {
    const scales = [
        { id: 'fourOctaveScale', name: 'Four-Octave Scale' },
        { id: 'thirdScale', name: 'Separated by a 3rd' },
        { id: 'sixthScale', name: 'Separated by a 6th' },
        { id: 'octaveStaccatoScale', name: 'Scale in Octaves: Blocked staccato' },
        { id: 'chromaticOctaves', name: 'Chromatic in Octaves: Blocked staccato' },
        { id: 'formulaPattern', name: 'Formula Pattern' }
    ];

    const chords = [
        { id: 'tonicFourNote', name: 'Tonic Four-Note Chord' },
        { id: 'tonicTriad', name: 'Tonic Triad Chord' },	
        { id: 'dominantSeventh', name: 'Dominant 7th Chord' },
        { id: 'leadingToneDimSeventh', name: 'Leading-Tone Diminished 7th Chord' }
    ];

    const arpeggios = [
        { id: 'tonicArpeggios', name: 'Tonic Arpeggios' },
        { id: 'dominantSeventhArpeggio', name: 'Dominant 7th Arpeggio' },
        { id: 'leadingToneDimSeventhArpeggio', name: 'Leading-Tone Diminished 7th Arpeggio' }
    ];

    const keys = [
        'C', 'CMinor', 'Db', 'DbMinor', 'D', 'DMinor', 'Eb', 'EbMinor', 'E', 'EMinor',
        'F', 'FMinor', 'Gb', 'GbMinor', 'G', 'GMinor', 'Ab', 'AbMinor', 'A', 'AMinor',
        'Bb', 'BbMinor', 'B', 'BMinor'
    ];

    let enabledTechniques = [];

    scales.forEach(scale => {
        if (document.getElementById(scale.id).checked) {
            enabledTechniques.push(scale.name);
        }
    });

    const solidEnabled = document.getElementById('solidEnabled').checked;
    const brokenEnabled = document.getElementById('brokenEnabled').checked;

    chords.forEach(chord => {
        if (document.getElementById(chord.id).checked) {
            if (solidEnabled) enabledTechniques.push(`${chord.name} (Solid)`);
            if (brokenEnabled) enabledTechniques.push(`${chord.name} (Broken)`);
        }
    });

    arpeggios.forEach(arpeggio => {
        if (document.getElementById(arpeggio.id).checked) {
            if (solidEnabled) enabledTechniques.push(`${arpeggio.name} (Solid)`);
            if (brokenEnabled) enabledTechniques.push(`${arpeggio.name} (Broken)`);
        }
    });

    let enabledKeys = keys.filter(key => document.getElementById(key).checked);

    let naturalMinorEnabled = document.getElementById('naturalMinorEnabled').checked;
    let harmonicMinorEnabled = document.getElementById('harmonicMinorEnabled').checked;
    let melodicMinorEnabled = document.getElementById('melodicMinorEnabled').checked;

    if (enabledTechniques.length === 0 || enabledKeys.length === 0) {
        document.getElementById('technique').innerText = 'Please select at least one technique and one key.';
        document.getElementById('key').innerText = '';
    } else {
        let randomTechnique = enabledTechniques[Math.floor(Math.random() * enabledTechniques.length)];
        let randomKey = enabledKeys[Math.floor(Math.random() * enabledKeys.length)];

        if (scales.some(scale => scale.name === randomTechnique)) {
            if (randomKey.includes('Minor')) {
                let scaleType = '';
                if (naturalMinorEnabled) scaleType = 'Natural Minor';
                if (harmonicMinorEnabled) scaleType = 'Harmonic Minor';
                if (melodicMinorEnabled) scaleType = 'Melodic Minor';

                randomKey = `${randomKey.replace('Minor', '')} ${scaleType}`;
            } else {
                randomKey = `${randomKey}`;
            }
        } else {
            randomKey = randomKey.replace('Minor', ' Minor');
        }

        document.getElementById('technique').innerText = randomTechnique;
        document.getElementById('key').innerText = randomKey;
    }

    saveSettings();
}

function saveSettings() {
    const settings = {
        techniques: {
            fourOctaveScale: document.getElementById('fourOctaveScale').checked,
            thirdScale: document.getElementById('thirdScale').checked,
            sixthScale: document.getElementById('sixthScale').checked,
            octaveStaccatoScale: document.getElementById('octaveStaccatoScale').checked,
            chromaticOctaves: document.getElementById('chromaticOctaves').checked,
            formulaPattern: document.getElementById('formulaPattern').checked,
            tonicFourNote: document.getElementById('tonicFourNote').checked,
	    tonicTriad: document.getElementById('tonicTriad').checked,
            dominantSeventh: document.getElementById('dominantSeventh').checked,
            leadingToneDimSeventh: document.getElementById('leadingToneDimSeventh').checked,
            tonicArpeggios: document.getElementById('tonicArpeggios').checked,
            dominantSeventhArpeggio: document.getElementById('dominantSeventhArpeggio').checked,
            leadingToneDimSeventhArpeggio: document.getElementById('leadingToneDimSeventhArpeggio').checked
        },
        keys: {
            C: document.getElementById('C').checked,
            CMinor: document.getElementById('CMinor').checked,
            Db: document.getElementById('Db').checked,
            DbMinor: document.getElementById('DbMinor').checked,
            D: document.getElementById('D').checked,
            DMinor: document.getElementById('DMinor').checked,
            Eb: document.getElementById('Eb').checked,
            EbMinor: document.getElementById('EbMinor').checked,
            E: document.getElementById('E').checked,
            EMinor: document.getElementById('EMinor').checked,
            F: document.getElementById('F').checked,
            FMinor: document.getElementById('FMinor').checked,
            Gb: document.getElementById('Gb').checked,
            GbMinor: document.getElementById('GbMinor').checked,
            G: document.getElementById('G').checked,
            GMinor: document.getElementById('GMinor').checked,
            Ab: document.getElementById('Ab').checked,
            AbMinor: document.getElementById('AbMinor').checked,
            A: document.getElementById('A').checked,
            AMinor: document.getElementById('AMinor').checked,
            Bb: document.getElementById('Bb').checked,
            BbMinor: document.getElementById('BbMinor').checked,
            B: document.getElementById('B').checked,
            BMinor: document.getElementById('BMinor').checked
        },
        options: {
            solidEnabled: document.getElementById('solidEnabled').checked,
            brokenEnabled: document.getElementById('brokenEnabled').checked,
            naturalMinorEnabled: document.getElementById('naturalMinorEnabled').checked,
            harmonicMinorEnabled: document.getElementById('harmonicMinorEnabled').checked,
            melodicMinorEnabled: document.getElementById('melodicMinorEnabled').checked
        }
    };

    localStorage.setItem('settings', JSON.stringify(settings));
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    if (settings) {
        document.getElementById('fourOctaveScale').checked = settings.techniques.fourOctaveScale;
        document.getElementById('thirdScale').checked = settings.techniques.thirdScale;
        document.getElementById('sixthScale').checked = settings.techniques.sixthScale;
        document.getElementById('octaveStaccatoScale').checked = settings.techniques.octaveStaccatoScale;
        document.getElementById('chromaticOctaves').checked = settings.techniques.chromaticOctaves;
        document.getElementById('formulaPattern').checked = settings.techniques.formulaPattern;
        document.getElementById('tonicFourNote').checked = settings.techniques.tonicFourNote;
        document.getElementById('tonicTriad').checked = settings.techniques.tonicTriad;	
        document.getElementById('dominantSeventh').checked = settings.techniques.dominantSeventh;
        document.getElementById('leadingToneDimSeventh').checked = settings.techniques.leadingToneDimSeventh;
        document.getElementById('tonicArpeggios').checked = settings.techniques.tonicArpeggios;
        document.getElementById('dominantSeventhArpeggio').checked = settings.techniques.dominantSeventhArpeggio;
        document.getElementById('leadingToneDimSeventhArpeggio').checked = settings.techniques.leadingToneDimSeventhArpeggio;

        document.getElementById('C').checked = settings.keys.C;
        document.getElementById('CMinor').checked = settings.keys.CMinor;
        document.getElementById('Db').checked = settings.keys.Db;
        document.getElementById('DbMinor').checked = settings.keys.DbMinor;
        document.getElementById('D').checked = settings.keys.D;
        document.getElementById('DMinor').checked = settings.keys.DMinor;
        document.getElementById('Eb').checked = settings.keys.Eb;
        document.getElementById('EbMinor').checked = settings.keys.EbMinor;
        document.getElementById('E').checked = settings.keys.E;
        document.getElementById('EMinor').checked = settings.keys.EMinor;
        document.getElementById('F').checked = settings.keys.F;
        document.getElementById('FMinor').checked = settings.keys.FMinor;
        document.getElementById('Gb').checked = settings.keys.Gb;
        document.getElementById('GbMinor').checked = settings.keys.GbMinor;
        document.getElementById('G').checked = settings.keys.G;
        document.getElementById('GMinor').checked = settings.keys.GMinor;
        document.getElementById('Ab').checked = settings.keys.Ab;
        document.getElementById('AbMinor').checked = settings.keys.AbMinor;
        document.getElementById('A').checked = settings.keys.A;
        document.getElementById('AMinor').checked = settings.keys.AMinor;
        document.getElementById('Bb').checked = settings.keys.Bb;
        document.getElementById('BbMinor').checked = settings.keys.BbMinor;
        document.getElementById('B').checked = settings.keys.B;
        document.getElementById('BMinor').checked = settings.keys.BMinor;

        document.getElementById('solidEnabled').checked = settings.options.solidEnabled;
        document.getElementById('brokenEnabled').checked = settings.options.brokenEnabled;
        document.getElementById('naturalMinorEnabled').checked = settings.options.naturalMinorEnabled;
        document.getElementById('harmonicMinorEnabled').checked = settings.options.harmonicMinorEnabled;
        document.getElementById('melodicMinorEnabled').checked = settings.options.melodicMinorEnabled;
    }
}
