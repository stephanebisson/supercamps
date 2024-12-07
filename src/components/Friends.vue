<template>
  <v-card title="Friends" subtitle="You don't have any friends yet">
    <v-tabs align-tabs="center" v-model="tabsModel">
      <v-tab value="friends"> Friends </v-tab>
      <v-tab value="requests"> Requests </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabsModel">
      <v-tabs-window-item value="friends">
        <v-card>
          <v-list v-if="friends" items="friends" item-title="name" item-value="email"></v-list>
          <v-card-text v-else>You don't have any friends</v-card-text>
          <v-card-actions>
            <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  prepend-icon="mdi-search"
                  size="small"
                  color="primary"
                  text="find friends"
                  v-bind="activatorProps"
                ></v-btn>
              </template>
              <v-card>
                <v-toolbar>
                  <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                  <v-toolbar-title>Search for friends</v-toolbar-title>
                </v-toolbar>
                <v-row>
                  <v-col>
                    <v-text-field v-model="searchString" label="Search by name"></v-text-field>
                    <v-list>
                      <v-list-item
                        lines="two"
                        v-for="person in searchResults"
                        :key="person.email"
                        :subtitle="person.email"
                        :title="person.name"
                      >
                        <template v-slot:append>
                          <v-btn
                            v-if="person.incoming"
                            icon="mdi-account-arrow-left"
                            color="secondary"
                            @click="accept(person.email)"
                          ></v-btn>
                          <v-btn
                            v-else-if="person.outgoing"
                            icon="mdi-account-arrow-right"
                            disabled="true"
                          ></v-btn>
                          <v-btn
                            v-else
                            icon="mdi-account-plus"
                            color="primary"
                            @click="request(person.email)"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item value="requests">
        <v-card>
          <v-card-text>No friends requests at the moment</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script setup>
import { ref, computed } from 'vue'
import useFriends from '@/composables/useFriends'

const tabsModel = ref('friends')
const dialog = ref()
const searchString = ref('')

const { search, request, accept } = await useFriends()

const searchResults = computed(() => search(searchString.value))
</script>
