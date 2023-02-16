export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("moneyInput", {
    mounted: (el) => {
      const test = el.value;
      if (!test.includes(",")) {
        const target = Number(test).toFixed(2);

        const targetString = target.toString().split(".");
        // console.log(targetString,'targ Str');

        const main = targetString[0];
        const money = addThousandSeparator(main, ",");
        // console.log(money,'money');
        const unit = targetString[1];
        const final = `${money}.${unit}`;
        el.value = final;
      }
    },
  });
});

function addThousandSeparator(integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}
