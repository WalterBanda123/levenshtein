// const arr = [
//   "GUANGDONG MIDEA KITCHEN APPLIANCES MANUFACTURING CO. LTD.",
//   "Guangdong Midea Kitchen Appliances Manufacturing Co., Ltd",
//   "Guangdong Midea Kitchen Appliances Manufacturing Co. Ltd.",
//   "Guangdong Midea Kitchen Appliances Manufacturing Co., Ltd.",
//   "GUANGDONG MIDEA KITCHEN APPLIANCES MANUFACTURING CO., LTD.",
//   "GUANGDONG MIDEA KITCHEN APPLIANCES MANUFACTURING CO LTD",
//   "GUANGDONG MIDEA KITCHEN APPLIANCES MANUFACTURING CO. LTD",
// ];
// const words = ["guangdong", "kitchen"];

function filter(sentences) {
  const words = [
    "company",
    "technology",
    "pvt",
    "private",
    "electronics",
    "limited",
    "ltd",
    "co",
    "shenzhen",
    "zhongshan",
    "guangdong",
    "dongguan",
  ];
  const result = [];
  for (let sentence of sentences) {
    for (let i = 0; i < words.length; i++) {
      const index = sentence.toLowerCase().includes(words[i]);
      if (index !== -1) {
        sentence = sentence
          .toLowerCase()
          .replace(new RegExp("\\b" + words[i] + "\\b", "gi"), "");
      }
    }
    if (!sentence.includes([...words])) {
      result.push(sentence);
    }
  }
  return result;
}

module.exports = filter;
