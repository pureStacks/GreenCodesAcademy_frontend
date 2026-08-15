import fs from 'fs';
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

data.site.logo = "https://i.ibb.co/dsJrwsPC/temp.jpg"; // Placeholder, I'll let user put whatever

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('data.json logo updated');
