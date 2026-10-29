<script setup>
const projectsService = useProjectsService()

const projects = ref([])
const loading = ref(false)

const search = ref('')
const status = ref('all')

const page = ref(1)
const pages = ref(1)

let timer

async function loadProjects(nextPage = 1) {
  loading.value = true

  try {
    const response = await projectsService.getProjects({
      page: nextPage,
      limit: 6,
      search: search.value,
      status: status.value
    })

    projects.value = response.items
    page.value = response.meta.page
    pages.value = response.meta.pages
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  clearTimeout(timer)

  timer = setTimeout(() => {
    loadProjects(1)
  }, 350)
}

watch(status, () => loadProjects(1))

onMounted(() => loadProjects())
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section>
    <div class="page-head">
      <div>
        <span class="eyebrow">Projects</span>
        <h1>Строительные объекты</h1>
        <p>
          Текущий статус, сроки и финансовые показатели.
        </p>
      </div>
    </div>

    <div class="toolbar">
      <input
        v-model="search"
        class="input"
        type="search"
        placeholder="Название или адрес"
        @input="handleSearch"
      >

      <select v-model="status" class="select">
        <option value="all">Все статусы</option>
        <option value="active">В работе</option>
        <option value="planning">Подготовка</option>
        <option value="paused">Приостановлен</option>
        <option value="completed">Завершен</option>
      </select>
    </div>

    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <div v-else-if="projects.length" class="project-grid">
      <NuxtLink
        v-for="project in projects"
        :key="project.id"
        :to="'/projects/' + project.id"
        class="project-card"
      >
        <div class="project-card__head">
          <div>
            <small>{{ project.type }}</small>
            <h3>{{ project.name }}</h3>
          </div>

          <span class="badge">
            {{ project.statusLabel }}
          </span>
        </div>

        <p>{{ project.address }}</p>

        <div class="progress-head">
          <span>Готовность</span>
          <strong>{{ project.progress }}%</strong>
        </div>

        <div class="progress">
          <span :style="{ width: project.progress + '%' }" />
        </div>
      </NuxtLink>
    </div>

    <div v-else class="empty">
      По заданным параметрам ничего не найдено.
    </div>

    <div v-if="pages > 1" class="pagination">
      <button
        v-for="item in pages"
        :key="item"
        :class="{ active: item === page }"
        @click="loadProjects(item)"
      >
        {{ item }}
      </button>
    </div>
  </section>
</template>
