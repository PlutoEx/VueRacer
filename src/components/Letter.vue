<script>
export default {
  name: "Letter",
  props: {
    letter: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  methods() {

  }
}
</script>

<template>
  <span :class="'letter'">
    <span v-if="status === 'cursor'" class="cursor"/>
    <span v-else :class="status">
      {{ letter }}
    </span>
  </span>
</template>

<style scoped>
.letter {
  position: relative;
}

.not-typed {
  color: white;
}

.typed {
  color: gray;
}

.skipped {
  color: red;
  text-decoration: underline;
}

.cursor::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.1em;
  background-color: green;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to {
    background-color: transparent;
  }
  50% {
    background-color: green;
  }
}
</style>