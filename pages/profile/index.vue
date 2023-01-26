<template>
  <div class="profile bg-whitelike">
    <div class="profile__details py-6 px-5 w-full flex justify-between">
      <div
        class="profile__details--content flex flex-col justify-between text-secondary"
      >
        <span class="profile__details--content__name font-bold"
          >Ismail Nnamdi</span
        >

        <span class="profile__details--content__email"
          >ismailnnamdi@gmail.com</span
        >
      </div>

      <div
        class="profile__details--logo rounded-full font-semibold flex justify-center items-center text-primary bg-secondary w-14 h-14"
      >
        IN
      </div>
    </div>

    <div class="profile__items flex flex-col items-center w-full !text-tumablack">
      <div
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full"

        @click="navigateTo('/edit-profile')"
      >
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center">
          <div
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16"
          >
            <icons-edit-profile class="w-5 h-5" />
          </div>

          <p class="!text-tumablack" >Edit Profile</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>

      <div
        class="profile__items--item text-ash-1 flex px-2 py-2 w-full cursor-pointer"

        
        @click="navigateTo('/upload')"
      >
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center">
          <div
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16"
          >
            <icons-camera class="w-5 h-5" />
          </div>

          <p class="!text-tumablack">Upload ID</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>

      <div
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full"

        
        @click="navigateTo('/change-password')"
      >
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center">
          <div
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16"
          >
            <icons-key class="w-5 h-5" />
          </div>

          <p class="!text-tumablack" >Change Password</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>

      <div
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full"
        @click="navigateTo('/contact-us')"
      >
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center">
          <div
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16"
          >
            <icons-profile class="w-5 h-5" />
          </div>

          <p class="!text-tumablack" >Contact Us</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>

      <div
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full"

        @click="logout"
      >
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center">
          <div
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16"
          >
            <icons-logout class="w-5 h-5 " />
          </div>

          <p class="!text-danger">Logout</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>
    </div>

    
  </div>
</template>

<script setup>

useHead({
  title: "Profile",
});

definePageMeta({
  layout: "default",
});


const logout = () => {
  navigateTo('/login')
}


const key = 'sbx:IxVDi0FRSgbqL2HRMruyEoZ3';



</script>

<style lang="scss" scoped>
.profile {

  background-color: #f4f5f7;


  height: calc(100vh - 3rem);




  &__details {
    border-width: 1px;
    border-style: solid;
    @apply border-b-ash-1;
    // border-bottom: 1px solid;
  }

  &__items {
    &--item {
      border-width: 1px;
      border-style: solid;
      @apply border-b-ash-1;

      .logo {
        @apply bg-ash-1;
      }
    }
  }
}
</style>
