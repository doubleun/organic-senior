const fs = require("fs");

const data = fs.readFileSync("./originalData/provinces_database.json");
const arrayData = JSON.parse(data);

function groupBy(list) {
  const map = new Map();
  // const Arr = new Array();
  list.forEach((item) => {
    const key = item.province;
    delete item.province;

    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  const obj = Object.fromEntries(map);
  return obj;
}
function groupByAmphoe(list) {
  const map = new Map();
  list.forEach((item) => {
    const key = item.amphoe;
    delete item.amphoe;

    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  const obj = Object.fromEntries(map);
  return obj;
}

const groupedProvinces = groupBy(arrayData);
const arr = new Array();
Object.keys(groupedProvinces).map((key) =>
  arr.push({ name: key, details: groupedProvinces[key] })
);

// Grouping amphoe
// console.log(groupedProvinces["ลำปาง"]);
const groupedAmphoe = arr.map((province) => {
  // console.log(province.details);
  return groupByAmphoe(province.details);
});
// console.log(groupedAmphoe[0]);

const finalArr = new Array();
Object.keys(groupedProvinces).map((key, index) => {
  // const amphoeNames = Object.keys(groupedAmphoe[index]);
  const amphoeArr = new Array();
  for (const [key, value] of Object.entries(groupedAmphoe[index])) {
    amphoeArr.push({
      name: key,
      districts: value,
    });
  }
  finalArr.push({
    name: key,
    amphoe: amphoeArr,
  });
});

console.log(finalArr);
const provincesJSON = JSON.stringify(finalArr);

fs.writeFileSync("./provinces_database_finalized.json", provincesJSON);
