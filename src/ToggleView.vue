<template>
  <div class="toggle">
    <!-- eslint-disable-next-line -->
    <div ref="container" class="toggle-container" :style="{'line-clamp':expanded ? 'unset' : maxLine, '-webkit-line-clamp': expanded ? 'unset' : maxLine,'height': computedHeight}" >{{ text }}</div>
    <div :class="{'expanded': expanded}" class="toggle-arrow" @click="expanded = !expanded">
      <svg width="20" viewBox="0 0 2389 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M1758.225 221.552a94.864 94.864 0 01132.748 31.418c13.494 22.252 17.873 49.138 12.12 74.7a98.734 98.734 0 01-42.774 61.613L1192.707 817.52 525.145 389.283a98.734 98.734 0 01-42.824-61.614 101.178 101.178 0 0112.119-74.7 94.864 94.864 0 01132.748-31.417l565.519 362.754 565.518-362.754z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    maxLine: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      expanded: false,
      fullHeight: 0,
      foldHeight: 0
    }
  },
  computed: {
    computedHeight() {
      return this.expanded ? this.fullHeight + 'px' : this.foldHeight ? this.foldHeight + 'px' : '0px'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fullHeight = this.$refs.container.scrollHeight
      this.foldHeight = this.getLineHeight(this.$refs.container) * this.maxLine
    })
  },
  methods: {
    getLineHeight(node) {
      const temp = document.createElement('div')
      temp.setAttribute('style', 'margin:0px;padding:0px;font-family:' + node.style.fontFamily + ';font-size:' + node.style.fontSize + ';position:relative: left: -9999px;')
      temp.innerHTML = 'test'
      node.parentNode.appendChild(temp)
      const ret = temp.clientHeight
      node.parentNode.removeChild(temp)
      return ret
    }
  }
}
</script>

<style>
.toggle-container{
  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  transition: all .3s;
}

.toggle-arrow{
  text-align: center;
  transition: all .3s;
}

.toggle-arrow svg{
    transform: rotate(0deg);
  }
.toggle-arrow.expanded svg{
  transform: rotate(180deg);
}

</style>
