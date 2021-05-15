<template>
    <Page>
        <ActionBar title="Персонажи Звёздных войн"/>
        <StackLayout>
          <StackLayout>
            <label> Имя: {{this.name}}</label>
            <label> Рост: {{this.height}}</label>
            <label> Вес: {{this.mass}}</label>
            <label> Цвет волос: {{this.hair_color}}</label>
            <label> Цвет кожи: {{this.skin_color}}</label>
            <label> Цвет глаз: {{this.eye_color}}</label>
            <label> ДР: {{this.birth_year}}</label>
            <label> Пол: {{this.gender}}</label>
            <label> Родина: {{this.homeworld}}</label>          
          </StackLayout>
          <StackLayout>
            <TextField class="input" v-model="char_id" hint="Введите ID персонажа"  @returnPress= "newCharacter()"/>
            <Button text='Найти' @tap= "check()"/>
          </StackLayout>
        </StackLayout>
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
</style>