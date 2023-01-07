<template>
  <transition name="fade">
    <div class="onboarding-item relative w-full h-full flex flex-col items-center">
      <div class="onboarding-item__img -z-10 h-full">
        <img
          :src="props.imgUrl"
          :title="title"
          class="object-cover  w-[100vw]  h-full"
        />
      </div>

      <div
        class="z-5 absolute bottom-0 onboarding-item__content pt-[25vh] sm:pt-[30vh] md:pt-[40vh] w-full h-[100vh] flex flex-col items-center text-secondary"
      >
        <h3 class="text-3xl font-bold text-center">{{ title }}</h3>

        <p class="text-center text-base max-w-xs my-2">{{ description }}</p>

        <div class="my-3">
          <div
            class="ball"
            :class="{ '!bg-[#0909091a]': index === 1 }"
            @click="setIndexVal(1)"
          ></div>
          <div
            class="ball"
            :class="{ '!bg-[#0909091a]': index === 2 }"
            @click="setIndexVal(2)"
          ></div>
          <div
            class="ball"
            :class="{ '!bg-[#0909091a]': index === 3 }"
            @click="setIndexVal(3)"
          ></div>
        </div>

        <button-secondary
          :text="'login'"
          :type="'white'"
          @click="handleLogin"
        />
        <button-secondary
          :text="'get started'"
          :type="'blue'"
          @click="handleSignup"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps([
  "imgUrl",
  "title",
  "description",
  "index",
  "setIndexVal",
]);

const handleLogin = () => {
  navigateTo("/login");
};

const handleSignup = () => {
  navigateTo("/signup");
};
</script>

<style lang="scss" scoped>
.onboarding-item {
  // background-color: blueviolet;

  &__img {
    // width: 80%;
    height: 100%;
    // background-color: cadetblue;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    // background-image: var(--img);
  }

  .ball {
    @apply bg-secondary mx-1 cursor-pointer inline-block;
    border-radius: 50%;
    height: 8px;
    width: 8px;
  }

  &__content {
    background: linear-gradient(
      180deg,
      hsla(42, 99%, 59%, 0.102) 5%,
      hsla(42, 99%, 59%, 1) 62%
    );
  }
}
</style>
