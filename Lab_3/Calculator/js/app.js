var vue = new Vue
({
    el: '#app',
    data: {
        result: '',
        numbers: [1,2,3,4,5,6,7,8,9,0],
        operations: ['+','-','*','/']
    },
    methods:
    {
        input: function(char)
        {
            this.result = this.result.toString();
            this.result += char;
        },
        reset: function()
        {
            this.result = '';
        },
        calc: function()
        {
            this.result = eval(this.result);
        }
    }
})

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]/;
  if( !regex.test(key) )
  {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
