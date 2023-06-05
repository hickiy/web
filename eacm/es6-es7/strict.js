// "use strict"
function global() {
  console.log(this);
}
 global()

 const global1 = () => {
  console.log(this);
 }

 global1();