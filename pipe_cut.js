
// function pipe_cut(p) {

//     let size = len(p);
//     let result = [];

//     result[0] = 0; // 0 length is zero cost

//     for (let i = 1; i <= size; i++) {
//         let max_val = Number.NEGATIVE_INFINITY;
//         for (let j = 0; j < i; j++) {
//             // check cost
//             max_val = max(max_val, (p[j] + result[i - j - 1])); //from book
//         }
//         result[i] = max_val;
//     }

//     // WANTS IT WITHOUT result[0] = 0 so just skip over it
//     let without0 = [];
//     for (let i = 1; i < len(result); i++) {
//         without0[i - 1] = result[i];
//     }

//     print(without0)
//     return without0;
// } ‌​‍‍





