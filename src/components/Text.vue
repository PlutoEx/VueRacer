<script>
import Letter from "@/components/Letter.vue";
import {useTextStore} from "@/stores/text.ts";
import {fetchRandomWords} from "@/utils/API.ts";

export default {
  name: "Text",
  data() {
    return {
      timer: null,
      isLoading: true,
    }
  },
  methods: {
    async getWords() {
      const words = await fetchRandomWords(2, 6, 10);
      return words.map(word => word.toLowerCase()).join(' ');

    }
  },
  components: {
    Letter
  },
  created() {
    const textStore = useTextStore();
    this.getWords().then(words => {
      this.isLoading = false
      textStore.create(words)
      this.timer = setInterval(() => {
        if (textStore.isEnd)
          clearInterval(this.timer);
        textStore.updateTime();
      }, 1000);
    });
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
      <div v-if="isLoading" class="loading-text">Loading...</div>
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