<script>
import Letter from "@/components/Letter.vue";
import {useTextStore} from "@/stores/text.ts";
import {fetchRandomWords} from "@/utils/API.ts";

export default {
  name: "Text",
  data() {
    return {
      timer: null
    }
  },
  components: {
    Letter
  },
  async created() {
    const textStore = useTextStore();
    let words = await fetchRandomWords(2, 6, 10);
    words = words.map((word) => word.toLowerCase())
    textStore.create(words.join(' '))
    this.timer = setInterval(() => {
      if (textStore.isEnd)
        clearInterval(this.timer);
      textStore.updateTime();
    }, 1000);
  },
  computed: {
    textStore() {
      return useTextStore();
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="wpm">{{ Math.floor(textStore.calcWPM) }}</div>
    <div class="text">
<!--      TODO: Group into Words component to avoid perenos-->
      <Letter v-for="(letter, index) of textStore.getTextBefore"
              :letter="letter.letter" :status="letter['status']"/>
      <Letter letter="|" status="cursor"/>
      <Letter v-for="(letter, index) of textStore.getTextAfter"
              :letter="letter.letter" :status="letter['status']"/>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
}

.wpm {
  text-align: center;
  font-size: 1.6rem;
}

.text {
  margin: auto;
  width: 80vw;
  text-align: center;
  font-size: 2rem;
}
</style>