<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();

const courseId = computed(() => Number(route.params.id))
console.log("课程id："+courseId)
console.log(courseId)
</script>

<template>

</template>

<style scoped lang="scss">

</style>