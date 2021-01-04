<template>
  <div class="user">
    loaded: {{ loaded }}
    <br>
    {{ user }}
  </div>
</template>

<script>
import { API } from '@/config/routes';

export default {
  name: 'User',
  props: {
    userId: [String, Number],
    ref: Object,
    modelValue: Object,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      // the ref property can be used to specify raw data
      // otherwise, we'll load based on user id
      user: this.ref || false,
      loaded: this.ref ? true : false,
    }
  },
  methods: {
    userChanged() {
      this.$emit('update:modelValue', this.user);
    },
    async fetchData() {
      this.user = await (await fetch(`${API}/user/${this.userId}.json`, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.apiKey}`,
        },
      })).json();
      this.loaded = true;
    },
    async pushData() {
      await (await fetch(`${API}/user/${this.userId || this.user.id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$store.state.apiKey}`,
        },
        body: JSON.stringify(this.user),
      }))
    },
  },
  mounted() {
    if (!this.user && !this.loaded) {
      this.fetchData();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/components/User.scss";

</style>
