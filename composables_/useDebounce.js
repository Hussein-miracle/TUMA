import { useState } from "./useState";

const useDebounce = async (value, time = 300) => {
  const [debounceValue, setDebounceValue] = useState(value);

  // watch(debounceValue, () => {

  //   const timeout = setTimeout(() => {
  //     setDebounceValue(value);
  //   }, time);

  //   return () => {
  //     clearTimeout(timeout);
  //   };


  // });



  // watchEffect( async (onCleanUp) => {

  // })


  return debounceValue;
};
