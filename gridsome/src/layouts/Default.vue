<template>
  <div class="layout">
    <header class="header">
      <g-link to="/"><g-image alt="Example image" src="~/assets/default-monochrome.svg" width="135" /></g-link>
      <nav class="nav">
        <g-link class="nav__link" to="/account/"><font-awesome :icon="['far', 'user']" />Account</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
a {
  text-decoration: none;
}

a > svg {
  margin-right: 7px;
}

html {
  background: linear-gradient(#34A1F0, #695BC0);
  color: white;
  height: 100%;
  text-align: center;
}

body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
