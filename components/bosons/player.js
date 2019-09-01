export default {
  inject: ['provider'],
  data() {
    return {
      keysPressed: [],
      keys: [37, 38, 39, 40]
    };
  },
  props: {
    position: {
      type: Array,
      required: true
    },
    length: {
      type: Array,
      required: true
    },
    color: String
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.keys.includes(e.keyCode)) {
        this.keysPressed.push(e.keyCode);
      }
    });
    document.addEventListener('keyup', (e) => {
      if (this.keysPressed.includes(e.keyCode)) {
        this.keysPressed = this.keysPressed.filter(key => key !== e.keyCode);
      }
    });

    setInterval(this.playerLoop, 100);
  },
  methods: {
    playerLoop () {
      this.handlerPlayerMove(this.keysPressed);
    },

    handlerPlayerMove (keys) {
      const [ x, y ] = this.position;
      keys.forEach(key => {
        if (key === 37) {
          this.$emit('move', [ x - 1, y ]);
        } else if (key === 38) {
          this.$emit('move', [ x, y - 1 ]);
        } else if (key === 39) {
          this.$emit('move', [ x + 1, y ]);
        } else if (key === 40) {
          this.$emit('move', [ x, y + 1 ]);
        }
      });
    }
  },
  render () {
    if(!this.provider.ctx) return;
    const ctx = this.provider.ctx;

    ctx.fillStyle = this.color || '#000000';
	  ctx.fillRect(...this.position, ...this.length);
  }
};
