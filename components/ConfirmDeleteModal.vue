<template>
  <TransitionRoot appear :show="showConfirmDelete" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="sm:text-lg font-medium leading-6 text-secondary text-center"
              >
                Are you sure,you want to delete your account?
              </DialogTitle>

              <div class="text-bold text-md">
                This is a destructive action and you won't have access to your
                account again!.
              </div>

              <div
                class="mt-4 w-full mx-auto flex items-center justify-between"
              >
                <button
                  type="button"
                  class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center"
                  @click="initDelete"
                  :disabled="isDeleting"
                  :class="{
                    'opacity-50 cursor-not-allowed': isDeleting === true,
                  }"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center"
                  @click="close"
                  :disabled="isDeleting"
                  :class="{
                    'opacity-50 cursor-not-allowed': isDeleting === true,
                  }"
                >
                  No
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app/index";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import useToggle from "@/composables_/useToggle";
import AuthService from "@/services/auth.service";
import { useUserStore } from "@/store/auth";

const { show, setShowFalse, setShowTrue, toggleShow } = useToggle();

const props = defineProps(["showConfirmDelete", "closeConfirmDelete"]);
const t = useNuxtApp().$toast;
const store = useAppStore();
const isDeleting = ref(!true);

const close = () => {
  props.closeConfirmDelete();
};

const initDelete = async () => {
  const { oldPassword, setOldPassword, setUser, clearUserDetails } =
    useUserStore();
  // console.log(uuid,'user');
  // console.log(oldPassword,'oldP');
  isDeleting.value = true;
  const data = {
    password: oldPassword,
  };

  // console.log(data,'data');
  AuthService.deleteAccount(data)
    .then((res) => {
      // createToast(`Account Deleted`, {
      //   showIcon: true,
      //   type: "info",
      //   transition: "bounce",
      //   position: "top-right",
      // });
      t.success("Account Deleted Successfully");
      isDeleting.value = false;
    })
    .then((r) => {
      close();
      setOldPassword("");
      setUser(null);
      clearUserDetails();
      navigateTo("/register");
    })
    .catch((err) => {
      isDeleting.value = false;
      // createToast(`Error deleting Account`, {
      //   showIcon: true,
      //   type: "warning",
      //   transition: "bounce",
      //   position: "top-right",
      // });
      t.error("Error deleting your account.");
    });
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
$percent: 70%;

.legend {
  @apply px-2 py-1 rounded-sm;
  cursor: pointer;
  &:hover {
    @apply bg-whitelike;
  }
}

label.btn {
  position: relative;

  span {
    display: none;
    // content: "";
    border-radius: 50%;
    top: 50%;
    left: 50%;
    position: absolute;

    transform: translate(-50%, -50%);

    background-color: #fec02f;

    width: $percent;
    height: $percent;
  }
}

input[type="radio"]:focus label.btn {
  &::after {
    display: block;
  }
}

.item {
  input {
    border: none;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;
    @apply border-b-ash-1 p-2;
  }
  input:focus {
    @apply border-b-primary p-2;
    outline: none;
  }
  input:focus + label {
    @apply text-primary;
  }
}
</style>
