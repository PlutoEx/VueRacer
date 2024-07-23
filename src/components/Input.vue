<script>
import {useTextStore} from "@/stores/text.ts";

export default {
  name: "Input",
  methods: {
    keyPress(key) {
      const textStore = useTextStore();
      if (textStore.status === 'running' || textStore.status === 'not-started') {
        if (key.key === 'Backspace')
          textStore.deleteLast();
        else
          textStore.typed(key.key);
      }
    }
  }
}
</script>

<template>
  <input
      @keyup="keyPress"
      onblur="this.focus()"
      autofocus
  />
</template>

<style scoped>
  input {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</style>