exports.fibonacci = (req, res) => {
  // generate fibonacci exclude even number
  let n1 = 1;
  let n2 = 1;
  let nextTerm;
  console.log('ke sini');
  const result = [];
  let i = 1;
  while (i <= req.body.count) {
    if (n1 % 2 !== 0) {
      result.push(n1);
      i += 1;
    }
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
  }
  res.send(result.reverse());
};

exports.longestString = (req, res) => {
  const { randomString } = req.body;
  let rules = 'abcdefghijklmnopqrstuvwxyz';
  let result = [];
  for (let i = 0; i < randomString.length; i++) {
    let temp = rules.indexOf(randomString[i]);
    let loop = true;
    let j = 0;
    let foo = [];
    while (loop) {
      if (randomString[i + j] === rules[temp + j] && j < rules.length) {
        foo.push(randomString[i + j]);
        if (randomString[i + j] === 'z') {
          loop = false;
        }
        j++;
      } else {
        loop = false;
      }
    }
    result[i] = foo.length;
  }
  res.send({ data: Math.max(...result) });
};
