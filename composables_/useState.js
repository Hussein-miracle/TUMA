export const  useState = (initialState) => {

  const state = ref(initialState);

  const setState = (newState) => {
    state.value = newState;
  };
  
  return [readonly(state), setState];
}