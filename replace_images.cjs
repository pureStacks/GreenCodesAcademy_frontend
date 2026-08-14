const fs = require('fs');
const { execSync } = require('child_process');

const files = [
  'src/pages/About.tsx',
  'src/components/sections/PhysicalCampus.tsx',
  'src/components/sections/Hero.tsx'
];

const urlsToReplace = {
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80': '',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80': '',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80': '',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80': '',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80': ''
};

function getAuthToken() {
  const output = execSync(`curl -s 'https://imgbb.com/' | grep -o 'auth_token="[^"]*"'`).toString();
  const match = output.match(/auth_token="([^"]*)"/);
  return match[1];
}

const authToken = getAuthToken();

for (const oldUrl of Object.keys(urlsToReplace)) {
  console.log('Processing', oldUrl);
  execSync(`wget -qO temp.jpg "${oldUrl}"`);
  
  const uploadOutput = execSync(`curl -s -F "source=@temp.jpg" -F "type=file" -F "action=upload" -F "auth_token=${authToken}" "https://imgbb.com/json"`).toString();
  
  const response = JSON.parse(uploadOutput);
  if (response.status_code === 200) {
    const newUrl = response.image.url;
    urlsToReplace[oldUrl] = newUrl;
    console.log('Uploaded to', newUrl);
  } else {
    console.error('Failed to upload', uploadOutput);
  }
}

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [oldUrl, newUrl] of Object.entries(urlsToReplace)) {
    if (newUrl) {
      content = content.split(oldUrl).join(newUrl);
    }
  }
  fs.writeFileSync(file, content);
}
console.log('Done.');
