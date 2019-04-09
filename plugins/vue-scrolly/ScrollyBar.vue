<template>
  <div :class="[ 'scrolly-bar', 'axis-' + axis ]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ScrollyBar',
  props: {
    axis: { type: String, default: 'y' }
  }
}
</script>
