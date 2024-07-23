import { defineStore } from 'pinia'

interface textType {
  letter: string,
  status: letterType
}

type statusType = 'not-started' | 'running' | 'pause' | 'end';
type letterType = 'not-typed' | 'typed' | 'skipped' | 'error';

export const useTextStore = defineStore('textStore', {
  state: () => {
    return {
      text: [] as textType[],
      status: 'not-started' as statusType,
      lastIndex: 0 as number,
      speed: {
        startTime: 0 as number,
        time: 0 as number,
      },
    }
  },
  actions: {
    create(text: string) {
      this.text = text.split('').map(char => ({
        letter: char,
        status: 'not-typed'
      }));
    },
    typed(key: string) {
      if (key === this.getText[this.lastIndex]){
        this.text[this.lastIndex]['status'] = 'typed';
        this.lastIndex += 1;
        if (this.status === 'not-started') {
          this.status = 'running';
          this.startTime = performance.now();
        }
      }
      else if (key === ' ' && this.status == 'running') {
        this.skip();
      }

      if (this.isEnd) {
        this.status = 'end';
      }
    },
    skip() {
      while(this.getText.length > this.lastIndex && this.getText[this.lastIndex] !== ' ') {
        this.text[this.lastIndex]['status'] = 'skipped';
        this.lastIndex += 1;
      }
    },
    updateTime() {
      if (this.status == 'running') {
        this.speed.time = (performance.now() - this.startTime) / 1000;
      }
    },
    deleteLast() {
      if (this.lastIndex > 0) {
        this.lastIndex -= 1;
        this.text[this.lastIndex]['status'] = 'not-typed';
        while(this.lastIndex > 0 && this.text[this.lastIndex - 1]['status'] === 'skipped') {
          this.lastIndex -= 1;
          this.text[this.lastIndex]['status'] = 'not-typed';
        }
      }
    }
  },
  getters: {
    getText() {
      return this.text.map((obj: textType) => obj.letter);
    },
    getTextStatus() {
      return this.text.map((obj: textType) => obj.status);
    },
    getTextBefore() {
      return this.text.slice(0, this.lastIndex);
    },
    getTextAfter() {
      return this.text.slice(this.lastIndex, this.text.length);
    },
    isEnd() {
      return this.lastIndex === this.text.length;
    },
    getTypedText() {
      return this.text.filter((obj: textType) => obj.status === 'typed');
    },
    calcWPM() {
      if (this.speed.time == 0)
        return 0;
      return (this.getTypedText.length / 5) / (this.speed.time / 60);
    }
  }
})
