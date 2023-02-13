<template>
  <TransitionRoot appear :show="showDelete" as="template">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative"
            >
              <button
                  type="button"
                  class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-secondary px-2 py-1 text-sm font-small text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center absolute right-1.5 top-2"
                  @click="closeDelete"
                >
                  Close
                </button>
              <DialogTitle
                as="h3"
                class="sm:text-lg font-medium leading-6 text-secondary text-center"
              >
                Input Account Password
              </DialogTitle>

              <div class=''>
      <div class="item flex flex-col-reverse my-0.5 w-full relative">
        <VeeField
          v-model.lazy="form.password"
          :type="show === true ? 'text' : 'password'"
          placeholder="Password"
          id="password"
          name="password"
        />

        <label for="password" class="mb-2 text-ash-1">Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleShow"
        >
          <icons-view-password v-if="show === true" />
          <icons-close-password v-if="show === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 max-w-md rounded-md bg-red-300 capitalize"
          name="password"
        />
      </div>
              </div>

              <div class="mt-4 w-fit mx-auto">
                <button
                  type="button"
                  class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center"
                  @click="submit"
                  :class="{'cursor-not-allowed opacity-60': disable === true}"
                  :disabled='disable === true'
                >
                  Continue
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
import useToggle from '@/composables_/useToggle';



const {show,setShowFalse,setShowTrue,toggleShow} = useToggle();

const props = defineProps(["showDelete", "closeDelete",'openConfirmDelete']);

const store = useAppStore();
const disable = ref(false)
const form = reactive({
  password: "",
});

const submit = () => {
  disable.value = true;
  if(!form.password){
    createToast("You need to input your password to carry out this action.", {
      showIcon: true,
          type: "warning",
          transition: "bounce",
          // position:'top-center'
        });
       disable.value = !true;
    return;
  }

  props.closeDelete();
  props.openConfirmDelete();
       disable.value = !true;
};


const initDelete = () => {

}

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
