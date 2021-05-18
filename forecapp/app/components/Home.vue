<template>
    <Page>
        <ActionBar title="      Персонажи Звёздных войн" text-align="center"/>
          <TabView height="100%" android-tabs-position="bottom" selected-tab-text-color="#53ba82" tab-text-font-size="15">

            <TabViewItem title="Нумерация" text-transform="uppercase">
              <ListView for="item in characters">
                <v-template>
                  <Label class="info" :text="item"/>
                </v-template>
              </ListView>
            </TabViewItem>
            
          <TabViewItem title="Описание" text-transform="uppercase">
            <StackLayout>
              <StackLayout>
                <label> Имя: {{this.name}}</label>
                <label> Рост: {{this.height}}</label>
                <label> Вес: {{this.mass}}</label>
                <label> Цвет волос: {{this.hair_color}}</label>
                <label> Цвет кожи: {{this.skin_color}}</label>
                <label> Цвет глаз: {{this.eye_color}}</label>
                <label> Родился: {{this.birth_year}}</label>
                <label> Пол: {{this.gender}}</label>
                <label> Родина: {{this.homeworld}}</label>          
             </StackLayout>
              <StackLayout>
               <TextField class="input" v-model="char_id" hint="Введите ID персонажа"  @returnPress= "newCharacter()"/>
                <Button text='Найти' class="ButtFind" @tap= "check()"/>
              </StackLayout>
            </StackLayout>
          </TabViewItem>
          </TabView>
    </Page>
</template>

<script >
import { Http } from '@nativescript/core'
import * as ApplicationSettings from "@nativescript/core/application-settings";
  export default {
    data() {
      return {
        char_id: '',
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '', 
        gender: '',
        homeworld: '',
        characters: ["1 - Люк Скайуокер", "2 - C-3PO", "3 - R2-D2", 
                    "4 - Дарт Вейдер", "5 - Лея Органа", "6 - Оуэн Ларс", "7 - Беру Уайтсан Ларс",
                    "8 - R5-D4", "9 - Биггс Дарклайтер", "10 - Оби-Ван Кеноби"]
      }
    
    },
    methods: {
      newCharacter() {
        if(this.char_id != ''){
          this.msg = this.char_id
          console.log(this.char_id)
        }
      },
      check (){
        Http.getString('https://swapi.dev/api/people/' + this.char_id+ '/').then(
          (result) => {
            this.result = JSON.parse(result)
            this.name = this.result.name
            this.height = this.result.height  
            this.mass = this.result.mass
            this.hair_color = this.result.hair_color
            this.skin_color = this.result.skin_color
            this.eye_color = this.result.eye_color
            this.birth_year = this.result.birth_year
            this.gender = this.result.gender
            this.homeworld = this.result.homeworld
 
            console.log(result)
          }
        )
    }
  }
  }
</script>

<style scoped>
ActionBar {
  background-color: black;
  color: yellow;
  }
  .text{
    text-align: center;
  }
  .ButtFind{
    color: yellow;
    background-color: black;
  }
  .ButtFind:active{
    color: black;
    background-color: yellow;
  }
</style>
