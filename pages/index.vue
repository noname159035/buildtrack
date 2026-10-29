<script setup>
import { formatMoney } from '~/utils/format'

const projectsService = useProjectsService()
const requestsService = useRequestsService()

const projects = ref([])
const requests = ref([])
const activeProjects = ref([])

const averageProgress = ref(0)
const totalBudget = ref(0)
const pendingRequests = ref(0)
const loading = ref(true)

function calculateStats() {
  activeProjects.value = projects.value.filter(
      project => project.status === 'active'
  )

  const progressSum = activeProjects.value.reduce(
      (sum, project) => sum + Number(project.progress || 0),
      0
  )

  averageProgress.value = activeProjects.value.length
      ? Math.round(progressSum / activeProjects.value.length)
      : 0

  totalBudget.value = activeProjects.value.reduce(
      (sum, project) => sum + Number(project.budget || 0),
      0
  )

  pendingRequests.value = requests.value.filter(
      request => request.status === 'pending'
  ).length
}

async function load() {
  loading.value = true

  try {
    const [projectsData, requestsData] = await Promise.all([
      projectsService.getProjects({ limit: 20 }),
      requestsService.getRequests()
    ])

    projects.value = Array.isArray(projectsData?.items)
        ? projectsData.items
        : []

    requests.value = Array.isArray(requestsData?.items)
        ? requestsData.items
        : []

    calculateStats()
  } catch (error) {
    console.error('Dashboard loading failed:', error)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
<template>
  <section>
    <div class="page-head">
      <div>
        <span class="eyebrow">Dashboard</span>
        <h1>Обзор проектов</h1>
        <p>
          Состояние объектов, сроки и текущие согласования.
        </p>
      </div>

      <NuxtLink to="/projects" class="button">
        Все объекты
      </NuxtLink>
    </div>

    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <template v-else>
      <div class="stats">
        <article class="stat">
          <span>Активные объекты</span>
          <strong>{{ activeProjects.length }}</strong>
          <small>в текущей работе</small>
        </article>

        <article class="stat">
          <span>Средняя готовность</span>
          <strong>{{ averageProgress }}%</strong>
          <small>по активным объектам</small>
        </article>

        <article class="stat">
          <span>Бюджет проектов</span>
          <strong>{{ formatMoney(totalBudget) }}</strong>
          <small>согласованный бюджет</small>
        </article>

        <article class="stat">
          <span>На согласовании</span>
          <strong>{{ pendingRequests }}</strong>
          <small>изменений по проектам</small>
        </article>
      </div>

      <section class="panel">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Объекты</span>
            <h2>Текущие проекты</h2>
          </div>
        </div>

        <div class="project-grid">
          <NuxtLink
            v-for="project in activeProjects"
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
                В работе
              </span>
            </div>

            <p>{{ project.address }}</p>

            <div class="progress-head">
              <span>Готовность</span>
              <strong>{{ project.progress }}%</strong>
            </div>

            <div class="progress">
              <span
                :style="{ width: project.progress + '%' }"
              />
            </div>

            <div class="project-meta">
              <div>
                <small>Бюджет</small>
                <strong>{{ formatMoney(project.budget) }}</strong>
              </div>

              <div>
                <small>Площадь</small>
                <strong>{{ project.area }} м²</strong>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </template>
  </section>
</template>
