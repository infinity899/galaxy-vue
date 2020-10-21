<template>
  <div class="popup popup-outer planet" @click="handleClickOutside">
    <div class="popup-inner">
      <div class="popup-header">
        <div class="icon" @click="closePopup">
          <Close  />
        </div>
      </div>
      <div class="popup-body">
        <div class="popup-body-item">
          <h3>
            Planet name:
          </h3>
          <div>
            {{ planet.name }}
          </div>
        </div>
        <div class="popup-body-item">
          <h3>
            Planet climate:
          </h3>
          <div>
            {{ planet.climate }}
          </div>
        </div>
        <div class="popup-body-item">
          <h3>
            Planet diameter:
          </h3>
          <div>
            {{ planet.diameter }}
          </div>
        </div>
        <div class="popup-body-item">
          <h3>
            Planet Population:
          </h3>
          <div>
            {{ planet.population }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Close from '@/components/svg/Close.vue';

export default {
  name: 'Planet',
  components: {
    Close,
  },
  props: {
    planet: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    handleClickOutside(e) {
      if (typeof e.target.className === 'string' && e.target.className.split(' ').includes('popup-outer')) {
        this.closePopup();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .popup {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: rgba(255, 255, 255, 0.9);
    transition: opacity 0.3s ease;
    z-index: 99;
  }
  .popup-inner {
    max-width: 640px;
    padding: 0 40px 48px;
    margin: 10vh auto;
    background-color: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }
  .popup-header {
    padding: 12px;
    .icon {
      width: 32px;
      height: 32px;
      margin-left: auto;
      svg {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .popup-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .popup-body-item {
    h3 {
      margin-bottom: 8px;
      margin-top: 4px;
    }
  }
</style>
