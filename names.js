function matchNames(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i == 0) {
        dp[i][j] = j;
      } else if (j == 0) {
        dp[i][j] = i;
      } else if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i][j - 1], // Insert
            dp[i - 1][j], // Remove
            dp[i - 1][j - 1] // Replace
          );
      }
    }
  }

  return dp[m][n];
}
