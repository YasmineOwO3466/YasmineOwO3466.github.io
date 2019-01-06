$(window).scroll(function(){
	// All functions triggered by scroll written here:

	var windowTop = $(window).scrollTop();
	//console.log(windowTop)
//var a = 0;
	
var vis11 = d3.select("#backgroundimage1")
function show11(){
	vis11.style("display", "block")
}
function disappear11(){
	vis11.style("display", "none")
}

var vis12 = d3.select("#backgroundimage2")
function show12(){
	vis12.style("display", "block")
}
function disappear12(){
	vis12.style("display", "none")
}
	
var vis13 = d3.select("#backgroundimage3")
function show13(){
	vis13.style("display", "block")
}
function disappear13(){
	vis13.style("display", "none")
}

var vis14 = d3.select("#backgroundimage4")
function show14(){
	vis14.style("display", "block")
}
function disappear14(){
	vis14.style("display", "none")
}

var vis15 = d3.select("#backgroundimage5")
function show15(){
	vis15.style("display", "block")
}
function disappear15(){
	vis15.style("display", "none")
}
	
var vis16 = d3.select("#backgroundimage6")
function show16(){
	vis16.style("display", "block")
}
function disappear16(){
	vis16.style("display", "none")
}

var vis17 = d3.select("#south")
function show17(){
	vis17.style("display", "block")
}
function disappear17(){
	vis17.style("display", "none")
}
	
var vis18 = d3.select("#legend")
function show18(){
	vis18.style("display", "block")
}
function disappear18(){
	vis18.style("display", "none")
}
	
var vis1 = d3.select("#china")
function show1(){
	vis1.style("display", "inline-block")
}
function disappear1(){
	vis1.style("display", "none")
}

var vis2 = d3.select("#multiple")
function show2(){
	vis2.style("display", "inline-block")
}
function disappear2(){
	vis2.style("display", "none")
}

var vis3 = d3.select("#scatter")
function show3(){
	vis3.style("display", "inline-block")
}
function disappear3(){
	vis3.style("display", "none")
}
	
var vis4 = d3.select("#pie1")
function show4(){
	vis4.style("display", "inline-block")
}
function disappear4(){
	vis4.style("display", "none")
}
	
var vis5 = d3.select("#pie2")
function show5(){
	vis5.style("display", "inline-block")
}
function disappear5(){
	vis5.style("display", "none")
}
	
var vis6 = d3.select("#bar1")
function show6(){
	vis6.style("display", "inline-block")
}
function disappear6(){
	vis6.style("display", "none")
}

var vis7 = d3.select("#bar2")
function show7(){
	vis7.style("display", "inline-block")
}
function disappear7(){
	vis7.style("display", "none")
}

var vis8 = d3.select("#area1")
function show8(){
	vis8.style("display", "inline-block")
}
function disappear8(){
	vis8.style("display", "none")
}

var vis9 = d3.select("#scatter2")
function show9(){
	vis9.style("display", "inline-block")
}
function disappear9(){
	vis9.style("display", "none")
}

var vis10 = d3.select("#bar3")
function show10(){
	vis10.style("display", "inline-block")
}
function disappear10(){
	vis10.style("display", "none")
}
	if(windowTop >= (front1+400) && windowTop < front2 && section[0]==0){			
		main0();
		changeSection(0)
//		show11();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}

	if(windowTop >= (front2+400) && windowTop < front3 && section[1]==0){
		main1();
		changeSection(1)

	}

	if(windowTop >= (front3+400) && windowTop < front4 && section[2]==0){
		main2();
		changeSection(2)

	}

	if(windowTop >= (front4+400) && windowTop < front5 && section[3]==0){

	    main3();
		changeSection(3)
		show11();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();

	}
	
    if(windowTop >= (front5+400) && windowTop < front6 && section[4]==0){
		
		main4();
		changeSection(4)
		show3();
		disappear1();
		disappear2();
//		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();

	}
	
	if(windowTop >= (front6+400) && windowTop < front7 && section[5]==0){
		
		main5();
		changeSection(5)
//		show1();
		show14();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
		
	}

	if(windowTop >= (front7+400) && windowTop < front8 && section[6]==0){
		main6();
		changeSection(6)
		
		show1();
		show2();
		show17();
		show18();
//		show3();
//		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
	}
	
	if(windowTop >= (front8+400) && windowTop < front9 && section[7]==0){
		main7();
		changeSection(7)
        show1();
		show2();
		show17();
		show18();
//		show3();
//		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
	}

	if(windowTop >= front9 && windowTop < front10 && section[8]==0){
		main8();
		changeSection(8)
		show11();
		show12();
        disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
//		disappear11();
//		disappear12();
	}
	
	if(windowTop >= (front10+400) && windowTop < front11 && section[9]==0){
		main9();
		changeSection(9)
		show8();
		show6();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
//		disappear6();
		disappear7();
//		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();

	}
	
	if(windowTop >= (front11+400) && windowTop < front12 && section[10]==0){
		main10();
		changeSection(10)
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= (front12+400) && windowTop < front13 && section[11]==0){
		main11();
		changeSection(11)
		show4();
		show5();
//		show6();
		disappear2();
		disappear3();
//		disappear4();
		disappear6();
		disappear7();
		disappear1();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= front13 && windowTop < front14 && section[12]==0){
		main12();
		changeSection(12)
		show4();
		show5();
//		show6();
		disappear2();
		disappear3();
//		disappear4();
		disappear6();
		disappear7();
		disappear1();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= front14 && windowTop < front15 && section[13]==0){
		main13();
		changeSection(13)
//		show11();
		show13();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= front15 && windowTop < front16 && section[14]==0){
		main14();
		changeSection(14)
		show7();
		show9();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear8();
		disappear10();
//		disappear9();
		disappear1();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= (front16+400) && windowTop < front17 && section[15]==0){
		main15();
		changeSection(15)
		show7();
		show9();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear8();
		disappear10();
//		disappear9();
		disappear1();
		disappear11();
		disappear12();	
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= (front17+400) && windowTop < front18 && section[16]==0){
		main16();
		changeSection(16)
		
		show7();
		show9();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
//		disappear7();
		disappear8();
//		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= (front18+400) && windowTop < front19 && section[17]==0){
		main17();
		changeSection(17)
		show7();
		show9();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
//		disappear7();
		disappear8();
//		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
	if(windowTop >= front19 && windowTop < front20 && section[18]==0){
		main18();
		changeSection(18)
		show10();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
//		disappear10();
	}
	
	if(windowTop >= (front20+400) && windowTop < front21 && section[19]==0){
		main19();
		changeSection(19)
		show15();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear16();
		disappear17();
		disappear18();
//		disappear14();
	}
	
	if(windowTop >= front21 && windowTop < front22 && section[20]==0){
		main20();
		changeSection(20)
		show16();
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear17();
		disappear18();
//		disappear16();
//		disappear14();
	}
	if(windowTop >= front22 && section[21]==0){
		main21();
		changeSection(21)
		disappear1();
		disappear2();
		disappear3();
		disappear4();
		disappear5();
		disappear6();
		disappear7();
		disappear8();
		disappear9();
		disappear10();
		disappear11();
		disappear12();
		disappear13();
		disappear14();
		disappear15();
		disappear16();
		disappear17();
		disappear18();
	}
	
})


