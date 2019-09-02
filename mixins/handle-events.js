export default {
  methods: {
    listenEvent (name, callback) {
      document.addEventListener(name, callback);
    },

    stopEvent (name, callback) {
      document.removeEventListener(name, callback);
    }
  },
};
