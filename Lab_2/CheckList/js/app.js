var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++)
{
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++)
{
  close[i].onclick = function()
	{
    var div = this.parentElement;
    div.style.display = "none";
  }
}


var list = document.querySelector('UL');
list.addEventListener('click', function(ev)
{
  if (ev.target.tagName === 'LI')
	{
    ev.target.classList.toggle('checked');
  }
}, false);


function newElement()
{
  var li = document.createElement("li");
  var inputValue = document.getElementById("Input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '')
	{
    alert("Вы ничего не ввели");
  }
	else
	{
    document.getElementById("UL").appendChild(li);
  }
  document.getElementById("Input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++)
	{
    close[i].onclick = function()
		{
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}