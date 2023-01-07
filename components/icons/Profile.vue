<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16.962"
    height="18.832"
    viewBox="0 0 16.962 18.832"
    class="profile-icon"
    v-if="props.v2 === true"
  >
    <g id="user" transform="translate(-3 -2)">
      <path
        id="Path_1240"
        data-name="Path 1240"
        d="M18.962,20.611V18.74A3.74,3.74,0,0,0,15.221,15H7.74A3.74,3.74,0,0,0,4,18.74v1.87"
        transform="translate(0 -0.779)"
        fill="none"
        stroke="#fec02f "
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <circle
        id="Ellipse_335"
        data-name="Ellipse 335"
        cx="3.74"
        cy="3.74"
        r="3.74"
        transform="translate(7.74 3)"
        fill="none"
        stroke="#fec02f "
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </g>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16.962"
    height="18.832"
    viewBox="0 0 16.962 18.832"
    v-else
  >
    <g id="user" transform="translate(-3 -2)">
      <path
        id="Path_1240"
        data-name="Path 1240"
        d="M18.962,20.611V18.74A3.74,3.74,0,0,0,15.221,15H7.74A3.74,3.74,0,0,0,4,18.74v1.87"
        transform="translate(0 -0.779)"
        fill="none"
        stroke="#1a1616"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <circle
        id="Ellipse_335"
        data-name="Ellipse 335"
        cx="3.74"
        cy="3.74"
        r="3.74"
        transform="translate(7.74 3)"
        fill="none"
        stroke="#1a1616"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </g>
  </svg>
</template>

<script setup>
const props = defineProps(["v1", "v2"]);
</script>

<style lang="scss" scoped>
svg.profile-icon {
  width: 1.25rem;
  height: 1.25rem;

  g path,
  g circle {
    stroke: #fec02f !important;
    // fill: #feffef;
  }
}
</style>
