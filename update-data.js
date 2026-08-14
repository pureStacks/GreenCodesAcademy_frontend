import fs from 'fs';
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

data.about = {
  image: "https://i.ibb.co/dsJrwsPC/temp.jpg"
};

data.campus = {
  image1: "https://i.ibb.co/gFvmkzHP/temp.jpg",
  image2: "https://i.ibb.co/nNZ56Bvy/temp.jpg",
  image3: "https://i.ibb.co/nMcY3y7W/temp.jpg"
};

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('data.json updated');
