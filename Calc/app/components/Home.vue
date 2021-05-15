<template>
    <Page  class="Application">
         <GridLayout class= "Symbols" columns= "*, *, *, *" rows= "*, *, *, *, *, *">
            <Label textWrap= "true" class= "Output" v-model="output" row="0" col="0" colSpan="4"/>
            <Button  class="button delete" text="C" @tap="del()" row="1" col="0" colSpan="3"/>
            <Button  class="button ops" text="÷" @tap="input('/')" row="1" col="3"/>
            <Button  class="button" text="7" @tap="input('7')" row="2" col="0"/>
            <Button  class="button" text="8" @tap="input('8')" row="2" col="1"/>
            <Button  class="button" text="9" @tap="input('9')" row="2" col="2"/>
            <Button  class="button ops" text="x" @tap="input('*')" row="2" col="3"/>
            <Button  class="button" text="4" @tap="input('4')" row="3" col="0"/>
            <Button  class="button" text="5" @tap="input('5')" row="3" col="1"/>
            <Button  class="button" text="6" @tap="input('6')" row="3" col="2"/>
            <Button  class="button ops" text="-" @tap="input('-')" row="3" col="3"/>
            <Button  class="button" text="1" @tap="input('1')" row="4" col="0"/>
            <Button  class="button" text="2" @tap="input('2')" row="4" col="1"/>
            <Button  class="button" text="3" @tap="input('3')" row="4" col="2"/>
            <Button  class="button ops" text="+" @tap="input('+')" row="4" col="3"/>
            <Button  class="button" text="0" @tap="input('0')" row="5" col="0" colSpan = "2"/>
            <Button  class="button" text="." @tap="input('.')" row="5" col="2"/>
            <Button  class="button ops" text="=" @tap="calc()" row="5" col="3"/>
         </GridLayout>
    </Page>
</template>

<script >
   export default  {
    data() {
        return {
            output: '',
      }
    },
    methods:{
            input: function(char){                
                this.output = this.output.toString();
                if (this.output === 'Ошибка'){
                    this.output = '';
                }
                this.output += char;
            },
            calc: function(){
                try{
                    this.output = eval(this.output);
                    if (isNaN(this.output)) {
                        throw new Error();
                  }
                }
                catch{
                    this.output = 'Ошибка';
                }
            },
            del: function(){
                this.output = '';
            }
    }
  }
</script>

<style>
    .Application{
        background-color: black;
    }
    .Output{
        text-align: right;
        font-size: 30px;
        color: white;
    }
    .button{
        display: block;
        font-size: 34px;
        background-color: #333333;
        border-radius: 10%;
        color: white;
    }
    .button:active {
         background-color: rgba(255, 255, 255, 0.74);
         color: black;
    }
    .delete{
        background-color: rgb(161, 161, 161) ;
        color: black;
    }
    .ops {
        background-color: orange;
    }
     .ops:active {
        background: linear-gradient(45deg,rgb(171, 252, 177),  rgb(147, 238, 185), rgb(148, 233, 236));
        }
</style>