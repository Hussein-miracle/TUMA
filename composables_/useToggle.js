import {ref} from "@vue/reactivity";

const useToggle = () => {
  const show = ref(false);

  const setShowTrue = () => (show.value = true);

  const setShowFalse = () => (show.value = false);

  const toggleShow = () => {
    show.value = !show.value;
  };

  return {
    show,
    setShowFalse,
    setShowTrue,
    toggleShow,
  };
};

export default useToggle;
