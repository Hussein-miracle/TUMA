<template>
  <div class="profile bg-whitelike">
    <delete-account-modal
      :showDelete="showDelete"
      :closeDelete="closeDelete"
      :openConfirmDelete="openConfirmDelete"
    />
    <confirm-delete-modal
      :showConfirmDelete="showConfirmDelete"
      :closeConfirmDelete="closeConfirmDelete"
    />

    <div class="profile__details py-6 px-5 w-full flex justify-between">
      <div
        class="profile__details--content flex flex-col justify-between text-secondary"
      >
        <span class="profile__details--content__name font-bold"
          >{{ user.fname }} {{ user.sname }}</span
        >
        <span class="profile__details--content__email">{{
          profileDetails.email
        }}</span>
        <div class="uppercase font-bold text-skeleton">
          <span
            class="text-green-500"
            v-if="profileDetails.verified === VERIFICATION_STATUSES.VERIFIED"
            >{{ profileDetails.verified }}</span
          >
          <span
            class="text-red-500"
            v-if="profileDetails.verified === VERIFICATION_STATUSES.UNVERIFIED"
            >{{ profileDetails.verified }}</span
          >
          <span
            class="text-primary"
            v-if="
              profileDetails.verified === VERIFICATION_STATUSES.UNDER_REVIEW
            "
            >{{ profileDetails.verified }}</span
          >
        </div>
      </div>

      <VeeForm
        class="relative flex flex-col justify-between"
        @submit="handleSubmitImage"
        :initial-values="imageForm"
      >
        <img
          class="profile__details--logo rounded-full font-semibold flex justify-center items-center text-primary w-14 h-14 uppercase object-contain"
          v-if="profileDetails.profile_image"
          :src="profileDetails.profile_image"
          alt="user profile image"
        />
        <img
          class="profile__details--logo rounded-full font-semibold flex justify-center items-center text-primary w-14 h-14 uppercase object-contain"
          v-else-if="imageForm.image"
          :src="imageForm.image"
          alt="user profile image"
        />
        <div
          v-else
          class="profile__details--logo rounded-full font-semibold flex justify-center items-center text-primary bg-secondary w-14 h-14 uppercase"
          title="user profile image"
        >
          {{ user.fname[0] }} {{ user.sname[0] }}
        </div>
        <label
          for="image"
          title="Upload"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4"
        >
          <!-- <icons-camera class="w-5 h-5 !fill-white !stroke-white" /> -->
          <span class=" text-primary text-xs">Upload</span>
        </label>
        <VeeField
          id="image"
          name="image"
          type="file"
          ref="imageRef"
          accept="image/*"
          
          aria-hidden="true"
          hidden="true"
          @change="handleImageUpload"
        />

        <button
          class="outline-none border-none bg-primary w-14 h-8 text-sm p-0.5 rounded-md mt-0.5"
          type="submit"
          :disabled='disableUpload === true'
          :class="{'opacity-75 cursor-not-allowed': disableUpload === true}"
        >
          Submit
        </button>
      </VeeForm>
    </div>

    <div
      class="profile__items flex flex-col items-center w-full !text-tumablack"
    >
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

          <p class="!text-tumablack">Edit Profile</p>
        </div>

        <div class="flex w-[10%] sm:w-[40%] items-center justify-end">
          <icons-arrow-right class="justify-end" />
        </div>
      </div>

      <div
        class="profile__items--item text-ash-1 flex px-2 py-2 w-full cursor-pointer bg-whitelike"
      >
        <div
          class="flex w-[90%] sm:w-[70%] self-start gap-x-4 items-center"
          @click="handleUpload"
        >
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

          <p class="!text-tumablack">Change Password</p>
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
            class="icon flex items-center justify-center bg-ash-1 rounded-full w-16 h-16 !text-tumablack"
          >
            <icons-profile class="w-5 h-5" />
          </div>

          <p class="!text-tumablack">Contact Us</p>
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
            <icons-logout class="w-5 h-5" />
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
            <icons-logout class="w-5 h-5" />
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
import useToggle from "@/composables_/useToggle";
import AuthService from "@/services/auth.service";
import ProfileService from "@/services/profile.service";
import { VERIFICATION_STATUSES } from "@/utils/index";

const {
  show: showDelete,
  setShowFalse: closeDelete,
  setShowTrue: openDelete,
} = useToggle();
const toast = useNuxtApp().$toast;
const {
  show: showConfirmDelete,
  setShowFalse: closeConfirmDelete,
  setShowTrue: openConfirmDelete,
} = useToggle();

const isLoading = ref(false);
const userProfileImage = ref("");
const imageRef = ref(null);
useHead({
  title: "Profile",
});

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const authstore = useUserStore();
// const {user}  = useUserStore();
const { user } = storeToRefs(authstore);

//console.log(user,'user in profile');

const profileDetails = reactive({
  verified: "",
  email: "",
  profile_image:'',
});

const imageForm = reactive({
  image: "",
});
const  disableUpload = ref(true);
const logout = () => {
  const { logout: log } = useUserStore();
  log();
};
const handleUpload = async () => {
  localStorage.setItem("progged", JSON.stringify(true));

  navigateTo("/upload");
};
const handleDeleteAccount = async () => {
  openDelete();
};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  // userProfileImage.value = file;
  // console.log(file, "target file");
  // const std = JSON.stringify(file);
  // console.log(std,'stringFiled')
  imageForm.image = file;

  // const formdata = new FormData();
  // formdata.append("image", file);
};

const handleSubmitImage = async (values) => {
  // console.log(values,'vssss');
  imageForm.image = values.image;
  disableUpload.value = true;
  ProfileService.uploadUserImage(values)
    .then((response) => {
      disableUpload.value = false;
      console.log(response, "response");
    })
    .catch((err) => {
      disableUpload.value = false;
      // console.log(err, "pft image upload err");
      toast.error('Error uploading image..please try again')
    });
};
const handleGetProfile = async () => {
  isLoading.value = true;
  AuthService.getProfile()
    .then((response) => {
      isLoading.value = false;
      const data = response.data;
      // console.log(data,'response data');
      // console.log(data, "response  get profile");
      for (const item in data) {
        if (item in profileDetails) {
          profileDetails[item] = data[item];
        }
      }
      isLoading.value = false;
      // console.log(err,'err');
    })
    .catch((err) => {
      isLoading.value = false;
      // console.log(err, "profile err");
      toast.error('Error fetching profile details.');
    });
};

onMounted(async () => {
  handleGetProfile();
});

watch(imageForm, () => {
  if (!!imageForm.image) {
    disableUpload.value = false;
  }
});


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

.text-skeleton:empty {
  width: 6rem;
  height: 22px;
  display: inline-block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>
