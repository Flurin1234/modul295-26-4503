function double(value, callback) {
result = value * 2;
callback(result);
}




double(5, function(result) {
  console.log('Das Ergebnis ist:', result);
});
