export function countSameNumbers(arr1, arr2) {
  let count = 0;
  const set = new Set(arr1);

  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) {
      count++;
    }
  }

  return count;
}
