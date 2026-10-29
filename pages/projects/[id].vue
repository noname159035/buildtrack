<script setup>
import { formatDate, formatMoney } from '~/utils/format'

const route = useRoute()
const service = useProjectsService()

const project = ref(null)
const loading = ref(true)
const tab = ref('overview')

const estimatePlanned = computed(() =>
  project.value?.estimate.reduce(
    (total, item) => total + item.planned,
    0
  ) || 0
)

const estimateActual = computed(() =>
  project.value?.estimate.reduce(
    (total, item) => total + item.actual,
    0
  ) || 0
)

async function loadProject() {
  loading.value = true

  try {
    project.value = await service.getProject(route.params.id)
  } finally {
    loading.value = false
  }
}

onMounted(loadProject)
</script>

<template>
  <section>
    <NuxtLink to="/projects" class="back-link">
      ← Назад к объектам
    </NuxtLink>

    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <template v-else-if="project">
      <div class="hero">
        <div>
          <span class="eyebrow">{{ project.type }}</span>
          <h1>{{ project.name }}</h1>
          <p>{{ project.address }}</p>
        </div>

        <div class="hero-progress">
          <strong>{{ project.progress }}%</strong>
          <span>готовность</span>
        </div>
      </div>

      <div class="tabs">
        <button
          :class="{ active: tab === 'overview' }"
          @click="tab = 'overview'"
        >
          Обзор
        </button>

        <button
          :class="{ active: tab === 'stages' }"
          @click="tab = 'stages'"
        >
          Этапы
        </button>

        <button
          :class="{ active: tab === 'estimate' }"
          @click="tab = 'estimate'"
        >
          Смета
        </button>
      </div>

      <div v-if="tab === 'overview'" class="detail-grid">
        <section class="panel">
          <span class="eyebrow">Проект</span>
          <h2>Основная информация</h2>

          <div class="info-grid">
            <div>
              <small>Начало</small>
              <strong>{{ formatDate(project.startDate) }}</strong>
            </div>

            <div>
              <small>Завершение</small>
              <strong>{{ formatDate(project.deadline) }}</strong>
            </div>

            <div>
              <small>Площадь</small>
              <strong>{{ project.area }} м²</strong>
            </div>

            <div>
              <small>Бюджет</small>
              <strong>{{ formatMoney(project.budget) }}</strong>
            </div>
          </div>
        </section>

        <section class="panel">
          <span class="eyebrow">Activity</span>
          <h2>Последние события</h2>

          <div class="activity">
            <article
              v-for="item in project.activity"
              :key="item.id"
            >
              <span class="dot" />

              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.text }}</p>
                <small>{{ formatDate(item.date) }}</small>
              </div>
            </article>
          </div>
        </section>
      </div>

      <section v-else-if="tab === 'stages'" class="panel">
        <span class="eyebrow">Timeline</span>
        <h2>Этапы строительства</h2>

        <div class="stages">
          <article
            v-for="stage in project.stages"
            :key="stage.id"
          >
            <div class="stage-head">
              <div>
                <small>
                  {{ formatDate(stage.startDate) }}
                  —
                  {{ formatDate(stage.endDate) }}
                </small>

                <h3>{{ stage.title }}</h3>
              </div>

              <span class="badge">
                {{ stage.statusLabel }}
              </span>
            </div>

            <p>{{ stage.description }}</p>

            <div class="progress">
              <span :style="{ width: stage.progress + '%' }" />
            </div>
          </article>
        </div>
      </section>

      <section v-else class="panel">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Finance</span>
            <h2>Смета проекта</h2>
          </div>

          <div class="estimate-total">
            <small>
              План: {{ formatMoney(estimatePlanned) }}
            </small>
            <strong>
              Факт: {{ formatMoney(estimateActual) }}
            </strong>
          </div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Раздел</th>
                <th>План</th>
                <th>Факт</th>
                <th>Отклонение</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in project.estimate"
                :key="item.id"
              >
                <td>
                  <strong>{{ item.title }}</strong>
                  <small>{{ item.note }}</small>
                </td>

                <td>{{ formatMoney(item.planned) }}</td>
                <td>{{ formatMoney(item.actual) }}</td>

                <td>
                  {{ formatMoney(item.actual - item.planned) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </section>
</template>
