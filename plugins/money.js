export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("money", {
    mounted: (el) => {
      const test = el.innerText.toString();
      if (!test.includes(",")) {
        const target = Number(test).toFixed(2);

        const targetString = target.toString().split(".");
        // console.log(targetString,'targ Str');

        const main = targetString[0];
        const money = addThousandSeparator(main, ",");
        // console.log(money,'money');
        const unit = targetString[1];
        const final = `${money}.${unit}`;
        el.innerText = final;
      } else if (test.includes(".")) {
        // console.log(test, "ts");
      }
    },
  });
});

function addThousandSeparator(integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}
