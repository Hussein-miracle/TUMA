<template>
  <div class="upload">
    <div id="sumsub-websdk-container"></div>
  </div>
</template>

<script setup>
import snsWebSdk from "@sumsub/websdk";


const token = "_act-sbx-d70c58bf-5614-44d1-984e-23926bc870ce";




function launchWebSdk(accessToken = token, applicantEmail, applicantPhone) {
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
    return Promise.resolve(token);
  }
}

onMounted(async () => {
  launchWebSdk(token, "akinyeleolubodun@yahoo.com", "+2348068869417");
});
</script>

<style lang="scss" scoped></style>
