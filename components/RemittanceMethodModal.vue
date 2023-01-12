<template>
  <TransitionRoot appear :show="opened" as="template">
    <Dialog as="div"  class="relative z-10">
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
                class=" sm:text-lg font-medium leading-6 text-secondary text-center"
              >
                Change Remittance Method
              </DialogTitle>

              <div
                class="fieldset mx-auto mt-8 rounded-md w-[85%] sm:w-96 sm:px-2 ms:py-1 flex items-center justify-between flex-col bg-white"
              >
                <div
                  class="legend flex items-center justify-between w-full"
                  @click="remittanceMethod = 'cash'"
                >
                  <div
                    class="option cursor-pointer flex gap-x-2 flex-row-reverse items-center justify-start text-left"
                  >
                    <label for="cash">Cash</label>

                    <input
                      class="focus:outline-primary"
                      type="radio"
                      name="cash"
                      id="cash"
                      v-model="remittanceMethod"
                      value="cash"
                      hidden
                    />

                    <label
                      for="cash"
                      class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
                    >
                      <span
                        :class="{
                          '!block': remittanceMethod === 'cash',
                          hidden: remittanceMethod !== 'cash',
                        }"
                      >
                      </span>
                    </label>
                  </div>

                  <div class="rate font-bold flex">
                    <span class="unit self-end">$</span>
                    <span class="amount">130</span>
                  </div>
                </div>
                <div
                  class="legend flex items-center justify-between w-full cursor-pointer"
                  @click="remittanceMethod = 'bank'"
                >
                  <div
                    class="option flex flex-row-reverse gap-x-2 items-center justify-start text-left"
                  >
                    <label>Bank</label>
                    <input
                      v-model="remittanceMethod"
                      type="radio"
                      name="bank"
                      id="bank"
                      value="bank"
                      hidden
                    />
                    <label
                      for="bank"
                      class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
                    >
                      <span
                        :class="{
                          '!block': remittanceMethod === 'bank',
                          hidden: remittanceMethod !== 'bank',
                        }"
                      ></span>
                    </label>
                  </div>

                  <div class="rate font-bold flex">
                    <span class="unit self-end">$</span>
                    <span class="amount">110</span>
                  </div>
                </div>
                <div
                  class="legend cursor-pointer flex items-center justify-between w-full"
                  @click="remittanceMethod = 'mobile'"
                >
                  <div
                    class="option flex flex-row-reverse gap-x-2 items-center justify-start text-left"
                  >
                    <label>Mobile</label>
                    <input
                      v-model="remittanceMethod"
                      type="radio"
                      name="mobile"
                      id="mobile"
                      value="mobile"
                      hidden
                    />

                    <label
                      for="mobile"
                      class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
                    >
                      <span
                        :class="{
                          '!block': remittanceMethod === 'mobile',
                          hidden: remittanceMethod !== 'mobile',
                        }"
                      ></span>
                    </label>
                  </div>

                  <div class="rate font-bold flex">
                    <span class="unit self-end">$</span>
                    <span class="amount">100</span>
                  </div>
                </div>
              </div>

              <div class="mt-4 w-fit mx-auto">
                <button
                  type="button"
                  class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center"
                  @click="updateRemittanceMethod"
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
import { useAppStore } from "@/store/app/index";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps(["opened", "closeModal"]);

const remittanceMethod = ref("");

const updateRemittanceMethod = async () => {
  if(remittanceMethod.value.length){
    useAppStore().setRemittanceMethod(remittanceMethod.value);
    props.closeModal();
    // navigateTo('/upload');
  }
};

onMounted(()=>{
  remittanceMethod.value = useAppStore().getMethod;
})
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
</style>
