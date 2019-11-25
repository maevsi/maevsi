<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4">
      <g-link to="/"><g-image alt="maevsi logo" src="~/assets/default-monochrome_maevsi.svg" width="135" /></g-link>
      <nav>
        <g-link to="/account/">
          <font-awesome class="mr-2" :icon="['far', 'user']" />Account
        </g-link>
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
body {
  background: linear-gradient(#34A1F0, #695BC0) fixed;
}
</style>
