<template>
<div class="counter-component">
  <h1 class="title">Counter!</h1>
  <div class="box content text-centered">
    <h2 class="title is-1">{{ count }}</h2>
    <a class="button is-danger" v-on:click="incrementCount">Count Up</a>
  </div>

  <h1 class="title">Crazy buttons</h1>
  <a class="button is-info is-crazy" :style="buttonOffsets" v-on:mouseenter="changePosition">
    Catch me
  </a>

  <article class="message" v-bind:class="accordionClasses">
    <div class="message-header" v-on:click="toggleAccordion">
      <p>Hello World</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <div class="message-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
      </div>
    </div>
  </article>

</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      isOpen: true,
      buttonOffsets: {
        top: 0,
        left: 0
      },

    }
  },
  methods: {
    incrementCount: function () {
      this.count += 1;
    },
    changePosition: function () {
      this.buttonOffsets = {
        top: `${Math.random() * window.innerHeight / 10}px`,
        left: `${Math.random() * window.innerWidth / 10}px`
      }
    },
    toggleAccordion: function () {
      this.isOpen = !this.isOpen;
    }
  },
  computed: {
    accordionClasses: function () {
      return {
        'is-closed': !this.isOpen,
        'is-dark': !this.isOpen,
        'is-primary': this.isOpen
      }
    }
  }
}
</script>

<style lang="scss">
  .counter-component {
    background: red;
  }
  .is-closed .message-body {
    display: none;
  }
  @import '~styles/main.scss';
</style>