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

    <div id="sumsub-websdk-container"></div>
  </div>
</template>

<script setup>
import snsWebSdk from '@sumsub/websdk';
useHead({
  title: "Profile",
});

definePageMeta({
  layout: "default",
});


const logout = () => {
  navigateTo('/login')
}


const key = 'ha4zfb4wxvq8gonbevty9l70i3z';

function launchWebSdk(accessToken = key, applicantEmail, applicantPhone) {
  let snsWebSdkInstance = snsWebSdk
    .init(accessToken, () => getNewAccessToken())
    .withConf({
      lang: "en",
      email: applicantEmail,
      phone: applicantPhone,
      // i18n: {
      //   document: {
      //     subTitles: {
      //       IDENTITY: "Upload a document that proves your identity",
      //     },
      //   },
      // }

      // ,
      onMessage: (type, payload) => {
        console.log("WebSDK onMessage", type, payload);
      },
      uiConf: {
        customCssStr:
          ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}",
      },
      onError: (error) => {
        console.error("WebSDK onError", error);
      },
    })
    .withOptions({ addViewportTag: false, adaptIframeHeight: true })
    .on("stepCompleted", (payload) => {
      console.log("stepCompleted", payload);
    })
    .on("onError", (error) => {
      console.log("onError", payload);
    })
    .onMessage((type, payload) => {
      console.log("onMessage", type, payload);
    })
    .build();
  snsWebSdkInstance.launch("#sumsub-websdk-container");


  function getNewAccessToken() {
    // return Promise.resolve($NEW_ACCESS_TOKEN);
    return Promise.resolve(key);
  }


}

onMounted(() => {
  // const sumSub =
  //   "https://static.sumsub.com/idensic/static/sns-websdk-builder.js";
  // const script = document.createElement("script");
  // script.src = sumSub;
  // // Only run if sumSub script has not been added to the body.
  // if (!document.querySelector(`[src="${sumSub}"]`)) {
  //   document.body.appendChild(script);
  // }

  launchWebSdk(key,'miraacle64@gmail.com','09022803197')

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
</style>
