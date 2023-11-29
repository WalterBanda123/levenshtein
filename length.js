function lengthPercentage(str) {
  const length = str.length;
  const length_80th = Math.floor(length * 0.5);

  return str.slice(0, length_80th);
}



module.exports = lengthPercentage;
