pragma circom 2.1.0;

template BooleanArraySummationExample(n) {
  signal input b[n];
  signal output index;
  signal S;

  var sum = 0;
  var idx = 0;

  for (var i = 0; i < n; i++) {
    // Constrain each b_i to be boolean
    b[i] * (b[i] - 1) === 0;

    // Accumulate the sum of all b[i]
    sum = sum + b[i];

    // Accumulate the index of the first true element
    idx = idx + (i * b[i]);
  }

  // Assign accumulated sum to S output signal
  S <== sum;

  // Constrain S to be boolean
  S * (S - 1) === 0;
  
  // Assign accumulated idx to index output signal
  index <== idx;
}

component main = BooleanArraySummationExample(4); // Example usage with n=4
