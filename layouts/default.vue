<script setup>
const route = useRoute()
const auth = useAuthStore()

const links = [
  { path: '/', title: 'Обзор' },
  { path: '/projects', title: 'Объекты' },
  { path: '/requests', title: 'Согласования' }
]

function active(path) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <NuxtLink to="/" class="logo">
        <span class="logo__mark">B</span>

        <div>
          <strong>BuildTrack</strong>
          <small>Construction portal</small>
        </div>
      </NuxtLink>

      <nav>
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: active(link.path) }"
        >
          {{ link.title }}
        </NuxtLink>
      </nav>

      <div class="sidebar-note">
        <span>Public version</span>
        <small>Demo data</small>
      </div>
    </aside>

    <div class="main">
      <header class="header">
        <div>
          <span class="header__label">Кабинет клиента</span>
          <strong>{{ auth.user.role }}</strong>
        </div>

        <div class="header__user">
          <select
            :value="auth.role"
            @change="auth.setRole($event.target.value)"
          >
            <option value="manager">Менеджер</option>
            <option value="client">Заказчик</option>
          </select>

          <span class="avatar">
            {{ auth.user.initials }}
          </span>

          <div>
            <strong>{{ auth.user.name }}</strong>
            <small>{{ auth.user.role }}</small>
          </div>
        </div>
      </header>

      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>
