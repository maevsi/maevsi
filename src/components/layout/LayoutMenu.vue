<template>
  <LayoutMenuItem title="Home" to="/">
    <IHeroiconsHome />
  </LayoutMenuItem>
  <!-- <ISolarTelescopeBold /> -->
  <LayoutMenuItem title="Search" to="/search">
    <IHeroiconsMagnifyingGlass />
  </LayoutMenuItem>
  <!-- <IHeroiconsBell /> -->
  <LayoutMenuItem title="Notifications" to="/notification">
    <IHeroiconsHeart />
  </LayoutMenuItem>
  <LayoutMenuItem
    title="Account"
    :to="
      store.signedInUsername
        ? `/account/view/${store.signedInUsername}`
        : `/session/create`
    "
  >
    <IHeroiconsUser />
  </LayoutMenuItem>
</template>

<script setup lang="ts">
const store = useMaevsiStore()
</script>
