'use strict';

(()=>{
let colors = {
	'r':'#dd8888',
	'o':'#ddaa88',
	'y':'#dddd88',
	'g':'#88dd88',
	'b':'#88aadd',
	'i':'#8888dd',
	'v':'#cc88dd',
}

let props_display = "none";
const edit = document.getElementById("edit");
const search = document.getElementById("search");
const props = document.getElementById("props");
const save = document.getElementById("save");
const data = document.getElementById("data");
const marks = document.getElementById("marks");

let is_edit = false;

document.addEventListener("keypress",(event)=>{
	if(event.keyCode === 13 && !is_edit) window.location = "https://duckduckgo.com/?q=" + search.value;
});

edit.addEventListener("click", ()=>{
	if(props_display === "none"){
		is_edit = true;
		data.value = localStorage.getItem("data");
		props_display = "block"
	} else {
		is_edit = false;
		props_display = "none";
	}
	props.style.display = props_display;
});		

save.addEventListener("click",()=>{
	localStorage.setItem("data", data.value);
});

window.addEventListener("load",()=>{
	search.focus();
	let links = localStorage.getItem("data")
  if( links == null ) return;
	links = links.split("\n");
	for(let i = 0;i < links.length;++i){
		let color = '#CACBCC';
		let line = links[i].split(' ');
		let name = '';
		if(line.length > 2 && line[line.length-1] in colors)	color = colors[line.pop()];
		if(line.length > 1) name = line.slice(1).join(' '); 
		else name = line[0].split(".").slice(0,-1).join(".");
		marks.innerHTML +=
		  '<a class="sa '
		+ 'text-white/50 '
		+ 'p-3 '
		+ 'bg-[#1A1D20] '
		+ 'max-h-[5rem] '
		+ 'rounded-xl '
		+ 'flex flex-row '
		+ 'items-center" href="https://' 
		+ line[0]
		+ '">'
		+ '<p class="'
		+ 'bg-[' + color + '] '
		+ 'text-[#1A1D20] '
		+ 'rounded-3xl '
		+ 'size-8 '
		+ 'flex flex-col '
		+ 'items-center '
		+ 'justify-center '
		+ 'font-[Outfit] '
		+ 'mr-3 '
		+ 'font-black '
		+ '">'
		+ name[0].toUpperCase()
		+ '</p>'
		+ name
		+ '</a>';
	}
});
})();
