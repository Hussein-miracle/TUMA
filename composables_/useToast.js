const alertState = {
  show: ref(false),
  message: ref(""),
  type:ref('default')
};
const positions = {
  top:'top',
  top:'top',
  top:'top',
  top:'top',
}
const TOAST_TYPES = {
  success:'success',
  error:'error',
  warning:'warning',
}

const useToast = () => {
  const closeNotification = () => {
    alertState.message.value = "";
    alertState.show.value = false;
  };
  
  const openNotification = (msg , type) => {
    alertState.message.value = msg;
    alertState.type.value = type;
    alertState.show.value = true;
    setTimeout(closeNotification, 5000);
  };


  return { ...alertState, openNotification, closeNotification, TOAST_TYPES };
};

export default useToast;
