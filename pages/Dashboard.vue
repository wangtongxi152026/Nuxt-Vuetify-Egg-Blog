<template>
  <div class="dashboard">
    <h1 class="subheading">dashboard</h1>

    <v-container class="my-5">

      <v-layout row class="mb-5 ml-5">

        <!-- 悬浮提示框 -->
        <v-tooltip bottom>
          <!-- 模版 -->
          <template v-slot:activator="{ on }">
            <v-btn small  color='grey' @click="sortBy('title')" v-on="on">
              <v-icon left>mdi-wrench</v-icon>
              <span class="caption text-lowercase">By project Name</span>
            </v-btn>
          </template>
          <!-- 提示内容 -->
          <span>sort projects by project name</span>
        </v-tooltip>

        <v-tooltip bottom>
          <!-- 模版 -->
          <template v-slot:activator="{ on }">
            <v-btn class="ml-5" small color='grey' @click="sortBy('person')" v-on="on">
              <v-icon left>mdi-account-circle</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <!-- 提示内容 -->
          <span>sort projects by person name</span>
        </v-tooltip>

      </v-layout>

      <v-card flat class="pa-1" v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">

          <v-flex xs12 md6>
            <div class="caption">Project title</div>
            <div>{{project.person}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption">Person</div>
            <div>{{project.due}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text  outlined caption my-2`">
                <v-icon left>mdi-fire</v-icon>{{project.status}}
              </v-chip>
            </div>
          </v-flex>

        </v-layout>
      </v-card>

    </v-container>

    <!-- <v-container fluid class="my-5">
       <v-layout row >
         <v-flex xs12 md6 >
           <v-btn outline block class="primary">1</v-btn>
         </v-flex>
         <v-flex xs4 md2 class="px-5" >
           <v-btn outline block class="primary">2</v-btn>
         </v-flex>
         <v-flex xs4 md2>
           <v-btn outline block class="primary">2</v-btn>
         </v-flex>
         <v-flex xs4 md2>
           <v-btn outline block class="primary">2</v-btn>
         </v-flex>
       </v-layout>
p
       <v-layout row wrap justify-space-around>
         <v-flex xs4 md3>
           <v-btn putline block class="success">1</v-btn>
         </v-flex>
         <v-flex xs4 md3>
           <v-btn putline block class="success">3</v-btn>
         </v-flex>
         
       </v-layout>
    </v-container> -->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      projects: [
        {
          title: 'Design a new website',
          person: 'The Net Ninja',
          due: '1st Jan 2019',
          status: 'ongoing',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima impedit neque rerum quasi maiores labore, laboriosam voluptates nisi similique officiis, perferendis debitis in deleniti? Eaque suscipit voluptates voluptate repellendus facilis?'        },

        {
          title: 'Code up the homepage',
          person: 'Chun Li',
          due: '10st Jan 2019',
          status: 'complete',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima impedit neque rerum quasi maiores labore, laboriosam voluptates nisi similique officiis, perferendis debitis in deleniti? Eaque suscipit voluptates voluptate repellendus facilis?'
        },
        {
          title: 'Design Video thumbnalis',
          person: 'Ryu', due: '20st Jan 2018',
          due: '10st Jan 2019',
          status: 'complete',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima impedit neque rerum quasi maiores labore, laboriosam voluptates nisi similique officiis, perferendis debitis in deleniti? Eaque suscipit voluptates voluptate repellendus facilis?'
        },
        {
          title: 'Design a new website2',
          person: 'Ryu', due: '20st Jan 2018',
          due: '10st Jan 2019',
          status: 'overdue',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima impedit neque rerum quasi maiores labore, laboriosam voluptates nisi similique officiis, perferendis debitis in deleniti? Eaque suscipit voluptates voluptate repellendus facilis?'
        },
      ]
    }
  },
  methods: {
    sortBy (prop) {
      this.prop.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
}
</script>

<style lang="stylus" scoped>
.project.ongoing
  border-left 4px solid orange
.project.complete
  border-left 4px solid #3cd1c2
.project.overdue
  border-left 4px solid tomato
.v-chip.ongoing
  background-color orange
.v-chip.complete
  background-color #3cd1c2
.v-chip.overdue
  background-color tomato
</style>

