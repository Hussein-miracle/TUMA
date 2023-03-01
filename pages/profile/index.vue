<template>
  <div class="profile bg-whitelike">
    <delete-account-modal :showDelete='showDelete' :closeDelete='closeDelete' :openConfirmDelete='openConfirmDelete' />
    <confirm-delete-modal :showConfirmDelete='showConfirmDelete'  :closeConfirmDelete='closeConfirmDelete' />

    <div class="profile__details py-6 px-5 w-full flex justify-between">
      <div
        class="profile__details--content flex flex-col justify-between text-secondary"
      >
        <span class="profile__details--content__name font-bold"
          >{{user.fname}} {{user.sname}}</span
        >

        <span class="profile__details--content__email"
          >{{profileDetails.email}}</span
        >
        <span class="text-primary uppercase font-bold"
          >{{profileDetails.verified}}</span
        >
      </div>

      <div
        class="profile__details--logo rounded-full font-semibold flex justify-center items-center text-primary bg-secondary w-14 h-14 uppercase"
      >
        {{user.fname[0]}} {{user.sname[0]}}
      </div>
    </div>

    <div class="profile__items flex flex-col items-center w-full !text-tumablack">
      <div
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full bg-whitelike"

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
        class="profile__items--item text-ash-1 flex px-2 py-2 w-full cursor-pointer bg-whitelike"

        
      >
        <!-- @click="navigateTo('/upload')" -->
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center" @click="handleUpload">
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
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full bg-whitelike"

        
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
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full bg-whitelike"
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
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full bg-whitelike"

        @click="handleDeleteAccount"
      >
        <div class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center">
          <div
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16"
          >
            <icons-logout class="w-5 h-5 " />
          </div>

          <p class="!text-danger">Delete Account</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>


      <div
        class="profile__items--item cursor-pointer text-ash-1 flex px-2 py-2 w-full bg-whitelike"

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
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app/index";
import { useUserStore } from "@/store/auth/index";
import useToggle from '@/composables_/useToggle';
import AuthService from "@/services/auth.service";


const {show:showDelete,setShowFalse:closeDelete,setShowTrue:openDelete} = useToggle();

const {show:showConfirmDelete,setShowFalse:closeConfirmDelete,setShowTrue:openConfirmDelete} = useToggle();


const isLoading = ref(false);


useHead({
  title: "Profile",
});

definePageMeta({
  layout: "default",
  middleware:['auth']
});

const authstore = useUserStore();
// const {user}  = useUserStore();
const {user} = storeToRefs(authstore);

//console.log(user,'user in profile');

const profileDetails = reactive({
  verified:'',
  email:''
})
const logout = () => {
  const {logout:log} = useUserStore();
  log();
}
const handleUpload = async () => {
  localStorage.setItem("progged", JSON.stringify(true));

  navigateTo("/upload");
};
const handleDeleteAccount = async () => {
  openDelete();
}

const handleGetProfile = async () => {
  isLoading.value = true;
  AuthService.getProfile().then((response) => {
    isLoading.value = false;
    console.log(response,'response');
    const data = response.data;
    console.log(data,'response data');
    for(const item in data){
      if(item in profileDetails){
        profileDetails[item] = data[item];
      }
    }
    isLoading.value = false;
    console.log(err,'err');
  }).catch((err) => {
    console.log(err,'profile err')
  })
}



onMounted( async () => {
  handleGetProfile();
})

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
