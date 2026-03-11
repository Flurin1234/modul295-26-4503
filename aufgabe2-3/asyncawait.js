function simulateDelay(ms) {
 return new Promise((resolve) => {
    setTimeout(resolve, ms);
 });
 }

 async function addAfterDelay(a, b, ms){
 await simulateDelay(ms);
 return a + b;
 }

 const result = await addAfterDelay(3, 7, 2000);
 console.log(`Das Ergebnis ist ${result}`);

 