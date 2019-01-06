var w,h,ratio,ratio_h,totalFronts,front1,front2,front3,front4,front5,front6,front7,front8,front9,front10,front11,front12,front13,front14,front15,front16,front17,front18,front19,front20,front21,front22;
w = $(window).width();
h = $(window).height();
totalFronts = 22;

//set changing point
front1 = $("#front1").offset().top - h;
front2 = $("#front2").offset().top - h;
front3 = $("#front3").offset().top - h;
front4 = $("#front4").offset().top - h;
front5 = $("#front5").offset().top - h;
front6 = $("#front6").offset().top - h;
front7 = $("#front7").offset().top - h;
front8 = $("#front8").offset().top - h;
front9 = $("#front9").offset().top - h;
front10 = $("#front10").offset().top - h;
front11 = $("#front11").offset().top - h;
front12 = $("#front12").offset().top - h;
front13 = $("#front13").offset().top - h;
front14 = $("#front14").offset().top - h;
front15 = $("#front15").offset().top - h;
front16 = $("#front16").offset().top - h;
front17 = $("#front17").offset().top - h;
front18 = $("#front18").offset().top - h;
front19 = $("#front19").offset().top - h;
front20 = $("#front20").offset().top - h;
front21 = $("#front21").offset().top - h;
front22 = $("#front22").offset().top - h;
//建立一个都是0的array，多少个front多少个0
var section = [];
for(var i=0; i<=totalFronts-1; i++){
	section[i]=0
}
console.log(section)

//保证当前front是1
function changeSection(n){
	for(var i=0; i<=totalFronts-1; i++){
		if(i==n) {
			section[i]=1;
		} else {
			section[i]=0
		}
	}
}

