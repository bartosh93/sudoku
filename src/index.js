module.exports = function solveSudoku(matrix) {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  function isEmty(x) {
    return x===0?true:false
  }
  function test1(x, i, j) {
    let arr = matrix[i].filter(e => e>0)
    return nums.filter(el => !(arr.includes(el)))
  }

  function test2(x, i, j, restest1) {
    let arr = []
    matrix.forEach(e => arr.push(e[j]))
    arr = arr.filter(e => e>0)
    let subarr = nums.filter(el => arr.includes(el))
    return restest1.filter(el => !(subarr.includes(el)))
  }

  function test3(x, i, j, restest2 ) {
    let arr = [],n,m;
    if ((i+1)%3===0) {
       n = i-2
    } else if ((i%3)===0||i===0) {
        n = i
      } else {
          n = i-1
        } 
    if ((j+1)%3===0) {
      m = j-2
    } else if ((j%3)===0||j===0) {
        m = j
      } else {
          m = j-1
        }
    for(let c=0;c<3;n++,c++) {
      for(let d=0;d<3;m++,d++) {
        if(matrix[n][m]) arr.push(matrix[n][m])
      }
    }
    return restest2.filter(el => !(arr.includes(el)))
  }
  let isChanged = true
  function walk(matrix) {
    
    for ( let i = 0; i< matrix.length; i++) {
      for ( let j = 0; j< matrix[0].length; j++) {
        if(!(matrix[i][j]===0)) {
          continue
        }
        let temp = test1(matrix[i][j], i, j)
        if (temp.length === 1) {
          matrix[i][j] = temp[0]
          isChanged = false
        } else {
          temp = test2(matrix[i][j], i, j, temp)
          if (temp.length === 1) {
            matrix[i][j] = temp[0]
            isChanged = false
          } else {
            temp = test3(matrix[i][j], i, j, temp)
            if (temp.length === 1) {
              matrix[i][j] = temp[0]
              isChanged = false
            } else isChanged = true
          }
        }
      }
    }
    if(!isChanged) walk(matrix)
  }
  walk(matrix)
  return matrix
}
