<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <p>Maevsi is a manager for events supported by invitees.</p>
    <p>This site is currently in alpha: anything can change at any time.</p>
    <br>
    <div class="flex justify-center">
      <a
        class="items-center flex"
        :href="'https://github.com/' + $static.metadata.siteName + '/' + $static.metadata.siteName + '/'"
        target="_blank"
        :title="$static.metadata.siteName + ' on GitHub'"
      >
        <font-awesome
          class="mr-2"
          :icon="['fab', 'github']"
          size="2x"
        /> github.com/maevsi/maevsi
      </a>
    </div>
    <p>
      <a href="events/"><button class="btn btn-red">Events</button></a>
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
  metaInfo () {
    return { title: 'Welcome!' }
  }
}
</script>
