// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

// Read the skill.txt file that contains Japanese and Korean translations
const skillTxt = fs.readFileSync('skill.txt', 'utf8');
const lines = skillTxt.split('\n').filter(line => line.trim() !== '');

// Create a mapping from Japanese to Korean
const japaneseToKorean = {};
for (let i = 0; i < lines.length; i += 2) {
    if (i + 1 < lines.length) {
        const japanese = lines[i].trim();
        const korean = lines[i + 1].trim();
        japaneseToKorean[japanese] = korean;
    }
}

// Read the skill.json file
const skillJson = JSON.parse(fs.readFileSync('skill.json', 'utf8'));

// Create a new array with translated titles
const translatedSkills = skillJson.map(skill => {
    const japaneseTitle = skill.title;
    const koreanTitle = japaneseToKorean[japaneseTitle] || skill.title; // Default to original if no translation found
    
    return {
        ...skill,
        title: koreanTitle
    };
});

// Write the updated JSON to a new file
fs.writeFileSync('skill_translated.json', JSON.stringify(translatedSkills, null, 4), 'utf8');

console.log('Translation complete! Check skill_translated.json for the result.');
console.log(`Total skills: ${skillJson.length}, Translated: ${translatedSkills.filter(s => s.title !== skillJson.find(o => o.id === s.id).title).length}`);
