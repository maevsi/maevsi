<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <p>A manager for events supported by invitees.</p>
    <p>This site is currently in alpha: anything can change at any time.
    <br>
    <a class="nav__link" :href="'https://github.com/' + $static.metadata.siteName + '/' + $static.metadata.siteName + '/'" target="_blank" :title="$static.metadata.siteName + ' on GitHub'"><font-awesome :icon="['fab', 'github']" size="2x" /></a>
    </p>
  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return { title: "Welcome!" };
  }
};
</script>
