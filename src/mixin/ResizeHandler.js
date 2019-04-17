import store from '@/store';

const { body } = document; // eslint-disable-next-line
const TheWidth = 992; // refer to Bootstrap's responsive design

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', { withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile');
      store.dispatch('CloseSideBar', { withoutAnimation: true });
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < TheWidth;
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          store.dispatch('CloseSideBar', { withoutAnimation: true });
        }
      }
    }
  }
};
