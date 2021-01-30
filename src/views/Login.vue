<template>
  <div class="login" v-html="message">

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      message: '',
    }
  },
  mounted() {
    //window.location.href = window.location.href + 'yeabruh';
    let { token, failed, redirect } = this.$route.query;
    if (token || failed) {
      if (failed) {
        this.message = `<h1>Authentication Failed</h1>`;
      } else if (token) {
        // SET TOKEN
        localStorage.setItem('token', token);
        this.message = `<h1>Redirecting to ${redirect}</h1>`;
        let this_ = this;
        this.$store.commit('fetchToken')
        console.log('redirecting')
        this_.$router.push({
          name: redirect,
        })

      }
    } else {
      let params = new URLSearchParams();
      params.set('client_id', '633861005885308928');
      // UNCOMMENT FOLLOWING LINE FOR PRODUCTION, AND REMOVE ONE BELOW IT
      params.set('redirect_uri', `${location.protocol}//${location.host}/api/staff/login/discord`);
      //params.set('redirect_uri', `${location.protocol}//localhost:8080/api/staff/login/discord`);
      params.set('response_type', 'code');
      params.set('scope', 'identify');
      params.set('state', this.$route.query.redirect || 'Home')
      window.location.href = `https://discord.com/api/oauth2/authorize?${params.toString()}`
      //window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=633861005885308928&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fstaff%2Flogin%2Fdiscord&response_type=code&scope=identify`)
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/views/Login.scss";


</style>
