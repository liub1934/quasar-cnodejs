<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/sad.svg"
        style="width:30vw;max-width:150px;">
    </p>
    <p class="text-faded">页面丢失了...<strong>(404)</strong></p>
    <q-btn color="primary"
      style="width: 200px; margin-left: 10px"
      @click="$router.push('/')">首页</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
