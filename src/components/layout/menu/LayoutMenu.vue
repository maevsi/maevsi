<template>
  <LayoutMenuItem
    title="Home"
    :to="localePath(store.signedInUsername ? '/dashboard' : '/')"
  >
    <IHeroiconsHome />
  </LayoutMenuItem>
  <!-- <ISolarTelescopeBold /> -->
  <LayoutMenuItem title="Search" :to="localePath('/search')">
    <IHeroiconsMagnifyingGlass />
  </LayoutMenuItem>
  <!-- <IHeroiconsBell /> -->
  <LayoutMenuItem title="Notifications" :to="localePath('/notification')">
    <div class="relative">
      <IHeroiconsHeart />
      <div class="absolute right-0 top-0">
        <NotificationIndicator />
      </div>
    </div>
  </LayoutMenuItem>
  <LayoutMenuItem
    title="Account"
    :to="
      localePath(
        store.signedInUsername
          ? `/account/view/${store.signedInUsername}`
          : '/session/create',
      )
    "
  >
    <IHeroiconsUser />
  </LayoutMenuItem>
</template>

<script setup lang="ts">
const store = useMaevsiStore()
const localePath = useLocalePath()
</script>
