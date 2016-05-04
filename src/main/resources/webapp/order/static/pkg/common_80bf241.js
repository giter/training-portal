;/*!/component_modules/date.js*/
define('component_modules/date', function(require, exports, module) {

/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
Date.CultureInfo={name:"zh-CN",englishName:"Chinese (People's Republic of China)",nativeName:"中文(中华人民共和国)",dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],abbreviatedDayNames:["日","一","二","三","四","五","六"],shortestDayNames:["日","一","二","三","四","五","六"],firstLetterDayNames:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],abbreviatedMonthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],amDesignator:"上午",pmDesignator:"下午",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"ymd",formatPatterns:{shortDate:"yyyy/M/d",longDate:"yyyy'年'M'月'd'日'",shortTime:"H:mm",longTime:"H:mm:ss",fullDateTime:"yyyy'年'M'月'd'日' H:mm:ss",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"M'月'd'日'",yearMonth:"yyyy'年'M'月'"},regexPatterns:{jan:/^一月/i,feb:/^二月/i,mar:/^三月/i,apr:/^四月/i,may:/^五月/i,jun:/^六月/i,jul:/^七月/i,aug:/^八月/i,sep:/^九月/i,oct:/^十月/i,nov:/^十一月/i,dec:/^十二月/i,sun:/^星期日/i,mon:/^星期一/i,tue:/^星期二/i,wed:/^星期三/i,thu:/^星期四/i,fri:/^星期五/i,sat:/^星期六/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());


});

;/*!/component_modules/leaflet-src.js*/
define('component_modules/leaflet-src', function(require, exports, module) {

/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade
*/
(function (window, document, undefined) {
var oldL = window.L,
    L = {};

L.version = '0.7.2';


module.exports = L;


// define Leaflet as a global L variable, saving the original L to restore later if needed

L.noConflict = function () {
	window.L = oldL;
	return this;
};

window.L = L;


/*
 * L.Util contains various utility functions used throughout Leaflet code.
 */

L.Util = {
	extend: function (dest) { // (Object[, Object, ...]) ->
		var sources = Array.prototype.slice.call(arguments, 1),
		    i, j, len, src;

		for (j = 0, len = sources.length; j < len; j++) {
			src = sources[j] || {};
			for (i in src) {
				if (src.hasOwnProperty(i)) {
					dest[i] = src[i];
				}
			}
		}
		return dest;
	},

	bind: function (fn, obj) { // (Function, Object) -> Function
		var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
		return function () {
			return fn.apply(obj, args || arguments);
		};
	},

	stamp: (function () {
		var lastId = 0,
		    key = '_leaflet_id';
		return function (obj) {
			obj[key] = obj[key] || ++lastId;
			return obj[key];
		};
	}()),

	invokeEach: function (obj, method, context) {
		var i, args;

		if (typeof obj === 'object') {
			args = Array.prototype.slice.call(arguments, 3);

			for (i in obj) {
				method.apply(context, [i, obj[i]].concat(args));
			}
			return true;
		}

		return false;
	},

	limitExecByInterval: function (fn, time, context) {
		var lock, execOnUnlock;

		return function wrapperFn() {
			var args = arguments;

			if (lock) {
				execOnUnlock = true;
				return;
			}

			lock = true;

			setTimeout(function () {
				lock = false;

				if (execOnUnlock) {
					wrapperFn.apply(context, args);
					execOnUnlock = false;
				}
			}, time);

			fn.apply(context, args);
		};
	},

	falseFn: function () {
		return false;
	},

	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	trim: function (str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},

	splitWords: function (str) {
		return L.Util.trim(str).split(/\s+/);
	},

	setOptions: function (obj, options) {
		obj.options = L.extend({}, obj.options, options);
		return obj.options;
	},

	getParamString: function (obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	},
	template: function (str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			var value = data[key];
			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);
			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	},

	isArray: Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	},

	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};

(function () {

	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		var i, fn,
		    prefixes = ['webkit', 'moz', 'o', 'ms'];

		for (i = 0; i < prefixes.length && !fn; i++) {
			fn = window[prefixes[i] + name];
		}

		return fn;
	}

	var lastTime = 0;

	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame ||
	        getPrefixed('RequestAnimationFrame') || timeoutDefer;

	var cancelFn = window.cancelAnimationFrame ||
	        getPrefixed('CancelAnimationFrame') ||
	        getPrefixed('CancelRequestAnimationFrame') ||
	        function (id) { window.clearTimeout(id); };


	L.Util.requestAnimFrame = function (fn, context, immediate, element) {
		fn = L.bind(fn, context);

		if (immediate && requestFn === timeoutDefer) {
			fn();
		} else {
			return requestFn.call(window, fn, element);
		}
	};

	L.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};

}());

// shortcuts for most used utility functions
L.extend = L.Util.extend;
L.bind = L.Util.bind;
L.stamp = L.Util.stamp;
L.setOptions = L.Util.setOptions;


/*
 * L.Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (props) {

	// extended class with the new prototype
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		if (this._initHooks) {
			this.callInitHooks();
		}
	};

	// instantiate class without calling constructor
	var F = function () {};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (props.options && proto.options) {
		props.options = L.extend({}, proto.options, props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	proto._initHooks = [];

	var parent = this;
	// jshint camelcase: false
	NewClass.__super__ = parent.prototype;

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parent.prototype.callInitHooks) {
			parent.prototype.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// method for adding properties to prototype
L.Class.include = function (props) {
	L.extend(this.prototype, props);
};

// merge new default options to the Class
L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
};

// add a constructor hook
L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
};


/*
 * L.Mixin.Events is used to add custom events functionality to Leaflet classes.
 */

var eventsKey = '_leaflet_events';

L.Mixin = {};

L.Mixin.Events = {

	addEventListener: function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])

		// types can be a map of types/handlers
		if (L.Util.invokeEach(types, this.addEventListener, this, fn, context)) { return this; }

		var events = this[eventsKey] = this[eventsKey] || {},
		    contextId = context && context !== this && L.stamp(context),
		    i, len, event, type, indexKey, indexLenKey, typeIndex;

		// types can be a string of space-separated words
		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			event = {
				action: fn,
				context: context || this
			};
			type = types[i];

			if (contextId) {
				// store listeners of a particular context in a separate hash (if it has an id)
				// gives a major performance boost when removing thousands of map layers

				indexKey = type + '_idx';
				indexLenKey = indexKey + '_len';

				typeIndex = events[indexKey] = events[indexKey] || {};

				if (!typeIndex[contextId]) {
					typeIndex[contextId] = [];

					// keep track of the number of keys in the index to quickly check if it's empty
					events[indexLenKey] = (events[indexLenKey] || 0) + 1;
				}

				typeIndex[contextId].push(event);


			} else {
				events[type] = events[type] || [];
				events[type].push(event);
			}
		}

		return this;
	},

	hasEventListeners: function (type) { // (String) -> Boolean
		var events = this[eventsKey];
		return !!events && ((type in events && events[type].length > 0) ||
		                    (type + '_idx' in events && events[type + '_idx_len'] > 0));
	},

	removeEventListener: function (types, fn, context) { // ([String, Function, Object]) or (Object[, Object])

		if (!this[eventsKey]) {
			return this;
		}

		if (!types) {
			return this.clearAllEventListeners();
		}

		if (L.Util.invokeEach(types, this.removeEventListener, this, fn, context)) { return this; }

		var events = this[eventsKey],
		    contextId = context && context !== this && L.stamp(context),
		    i, len, type, listeners, j, indexKey, indexLenKey, typeIndex, removed;

		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			type = types[i];
			indexKey = type + '_idx';
			indexLenKey = indexKey + '_len';

			typeIndex = events[indexKey];

			if (!fn) {
				// clear all listeners for a type if function isn't specified
				delete events[type];
				delete events[indexKey];
				delete events[indexLenKey];

			} else {
				listeners = contextId && typeIndex ? typeIndex[contextId] : events[type];

				if (listeners) {
					for (j = listeners.length - 1; j >= 0; j--) {
						if ((listeners[j].action === fn) && (!context || (listeners[j].context === context))) {
							removed = listeners.splice(j, 1);
							// set the old action to a no-op, because it is possible
							// that the listener is being iterated over as part of a dispatch
							removed[0].action = L.Util.falseFn;
						}
					}

					if (context && typeIndex && (listeners.length === 0)) {
						delete typeIndex[contextId];
						events[indexLenKey]--;
					}
				}
			}
		}

		return this;
	},

	clearAllEventListeners: function () {
		delete this[eventsKey];
		return this;
	},

	fireEvent: function (type, data) { // (String[, Object])
		if (!this.hasEventListeners(type)) {
			return this;
		}

		var event = L.Util.extend({}, data, { type: type, target: this });

		var events = this[eventsKey],
		    listeners, i, len, typeIndex, contextId;

		if (events[type]) {
			// make sure adding/removing listeners inside other listeners won't cause infinite loop
			listeners = events[type].slice();

			for (i = 0, len = listeners.length; i < len; i++) {
				listeners[i].action.call(listeners[i].context, event);
			}
		}

		// fire event for the context-indexed listeners as well
		typeIndex = events[type + '_idx'];

		for (contextId in typeIndex) {
			listeners = typeIndex[contextId].slice();

			if (listeners) {
				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].action.call(listeners[i].context, event);
				}
			}
		}

		return this;
	},

	addOneTimeEventListener: function (types, fn, context) {

		if (L.Util.invokeEach(types, this.addOneTimeEventListener, this, fn, context)) { return this; }

		var handler = L.bind(function () {
			this
			    .removeEventListener(types, fn, context)
			    .removeEventListener(types, handler, context);
		}, this);

		return this
		    .addEventListener(types, fn, context)
		    .addEventListener(types, handler, context);
	}
};

L.Mixin.Events.on = L.Mixin.Events.addEventListener;
L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
L.Mixin.Events.once = L.Mixin.Events.addOneTimeEventListener;
L.Mixin.Events.fire = L.Mixin.Events.fireEvent;


/*
 * L.Browser handles different browser and feature detections for internal Leaflet use.
 */

(function () {

	var ie = 'ActiveXObject' in window,
		ielt9 = ie && !document.addEventListener,

	    // terrible browser detection to work around Safari / iOS / Android browser bugs
	    ua = navigator.userAgent.toLowerCase(),
	    webkit = ua.indexOf('webkit') !== -1,
	    chrome = ua.indexOf('chrome') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android = ua.indexOf('android') !== -1,
	    android23 = ua.search('android [23]') !== -1,
		gecko = ua.indexOf('gecko') !== -1,

	    mobile = typeof orientation !== undefined + '',
	    msPointer = window.navigator && window.navigator.msPointerEnabled &&
	              window.navigator.msMaxTouchPoints && !window.PointerEvent,
		pointer = (window.PointerEvent && window.navigator.pointerEnabled && window.navigator.maxTouchPoints) ||
				  msPointer,
	    retina = ('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
	             ('matchMedia' in window && window.matchMedia('(min-resolution:144dpi)') &&
	              window.matchMedia('(min-resolution:144dpi)').matches),

	    doc = document.documentElement,
	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera3d = 'OTransition' in doc.style,
	    any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs;


	// PhantomJS has 'ontouchstart' in document.documentElement, but doesn't actually support touch.
	// https://github.com/Leaflet/Leaflet/pull/1434#issuecomment-13843151

	var touch = !window.L_NO_TOUCH && !phantomjs && (function () {

		var startName = 'ontouchstart';

		// IE10+ (We simulate these into touch* events in L.DomEvent and L.DomEvent.Pointer) or WebKit, etc.
		if (pointer || (startName in doc)) {
			return true;
		}

		// Firefox/Gecko
		var div = document.createElement('div'),
		    supported = false;

		if (!div.setAttribute) {
			return false;
		}
		div.setAttribute(startName, 'return;');

		if (typeof div[startName] === 'function') {
			supported = true;
		}

		div.removeAttribute(startName);
		div = null;

		return supported;
	}());


	L.Browser = {
		ie: ie,
		ielt9: ielt9,
		webkit: webkit,
		gecko: gecko && !webkit && !window.opera && !ie,

		android: android,
		android23: android23,

		chrome: chrome,

		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		opera3d: opera3d,
		any3d: any3d,

		mobile: mobile,
		mobileWebkit: mobile && webkit,
		mobileWebkit3d: mobile && webkit3d,
		mobileOpera: mobile && window.opera,

		touch: touch,
		msPointer: msPointer,
		pointer: pointer,

		retina: retina
	};

}());


/*
 * L.Point represents a point with x and y coordinates.
 */

L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {

	clone: function () {
		return new L.Point(this.x, this.y);
	},

	// non-destructive, returns a new point
	add: function (point) {
		return this.clone()._add(L.point(point));
	},

	// destructive, used directly for performance in situations where it's safe to modify existing point
	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(L.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	distanceTo: function (point) {
		point = L.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	equals: function (point) {
		point = L.point(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	contains: function (point) {
		point = L.point(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	toString: function () {
		return 'Point(' +
		        L.Util.formatNum(this.x) + ', ' +
		        L.Util.formatNum(this.y) + ')';
	}
};

L.point = function (x, y, round) {
	if (x instanceof L.Point) {
		return x;
	}
	if (L.Util.isArray(x)) {
		return new L.Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	return new L.Point(x, y, round);
};


/*
 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

L.Bounds = function (a, b) { //(Point, Point) or Point[]
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
};

L.Bounds.prototype = {
	// extend the bounds to contain the given point
	extend: function (point) { // (Point)
		point = L.point(point);

		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	getCenter: function (round) { // (Boolean) -> Point
		return new L.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	getBottomLeft: function () { // -> Point
		return new L.Point(this.min.x, this.max.y);
	},

	getTopRight: function () { // -> Point
		return new L.Point(this.max.x, this.min.y);
	},

	getSize: function () {
		return this.max.subtract(this.min);
	},

	contains: function (obj) { // (Bounds) or (Point) -> Boolean
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof L.Point) {
			obj = L.point(obj);
		} else {
			obj = L.bounds(obj);
		}

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};

L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
	if (!a || a instanceof L.Bounds) {
		return a;
	}
	return new L.Bounds(a, b);
};


/*
 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

L.Transformation = function (a, b, c, d) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
};

L.Transformation.prototype = {
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (point, scale) {
		scale = scale || 1;
		return new L.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};


/*
 * L.DomUtil contains various utility functions for working with DOM.
 */

L.DomUtil = {
	get: function (id) {
		return (typeof id === 'string' ? document.getElementById(id) : id);
	},

	getStyle: function (el, style) {

		var value = el.style[style];

		if (!value && el.currentStyle) {
			value = el.currentStyle[style];
		}

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	getViewportOffset: function (element) {

		var top = 0,
		    left = 0,
		    el = element,
		    docBody = document.body,
		    docEl = document.documentElement,
		    pos;

		do {
			top  += el.offsetTop  || 0;
			left += el.offsetLeft || 0;

			//add borders
			top += parseInt(L.DomUtil.getStyle(el, 'borderTopWidth'), 10) || 0;
			left += parseInt(L.DomUtil.getStyle(el, 'borderLeftWidth'), 10) || 0;

			pos = L.DomUtil.getStyle(el, 'position');

			if (el.offsetParent === docBody && pos === 'absolute') { break; }

			if (pos === 'fixed') {
				top  += docBody.scrollTop  || docEl.scrollTop  || 0;
				left += docBody.scrollLeft || docEl.scrollLeft || 0;
				break;
			}

			if (pos === 'relative' && !el.offsetLeft) {
				var width = L.DomUtil.getStyle(el, 'width'),
				    maxWidth = L.DomUtil.getStyle(el, 'max-width'),
				    r = el.getBoundingClientRect();

				if (width !== 'none' || maxWidth !== 'none') {
					left += r.left + el.clientLeft;
				}

				//calculate full y offset since we're breaking out of the loop
				top += r.top + (docBody.scrollTop  || docEl.scrollTop  || 0);

				break;
			}

			el = el.offsetParent;

		} while (el);

		el = element;

		do {
			if (el === docBody) { break; }

			top  -= el.scrollTop  || 0;
			left -= el.scrollLeft || 0;

			el = el.parentNode;
		} while (el);

		return new L.Point(left, top);
	},

	documentIsLtr: function () {
		if (!L.DomUtil._docIsLtrCached) {
			L.DomUtil._docIsLtrCached = true;
			L.DomUtil._docIsLtr = L.DomUtil.getStyle(document.body, 'direction') === 'ltr';
		}
		return L.DomUtil._docIsLtr;
	},

	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className;

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	hasClass: function (el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = L.DomUtil._getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	},

	addClass: function (el, name) {
		if (el.classList !== undefined) {
			var classes = L.Util.splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!L.DomUtil.hasClass(el, name)) {
			var className = L.DomUtil._getClass(el);
			L.DomUtil._setClass(el, (className ? className + ' ' : '') + name);
		}
	},

	removeClass: function (el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			L.DomUtil._setClass(el, L.Util.trim((' ' + L.DomUtil._getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	},

	_setClass: function (el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	},

	_getClass: function (el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	},

	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {

			var filter = false,
			    filterName = 'DXImageTransform.Microsoft.Alpha';

			// filters collection throws an error if we try to retrieve a filter that doesn't exist
			try {
				filter = el.filters.item(filterName);
			} catch (e) {
				// don't set opacity to 1 if we haven't already set an opacity,
				// it isn't needed and breaks transparent pngs.
				if (value === 1) { return; }
			}

			value = Math.round(value * 100);

			if (filter) {
				filter.Enabled = (value !== 100);
				filter.Opacity = value;
			} else {
				el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
			}
		}
	},

	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	getTranslateString: function (point) {
		// on WebKit browsers (Chrome/Safari/iOS Safari/Android) using translate3d instead of translate
		// makes animation smoother as it ensures HW accel is used. Firefox 13 doesn't care
		// (same speed either way), Opera 12 doesn't support translate3d

		var is3d = L.Browser.webkit3d,
		    open = 'translate' + (is3d ? '3d' : '') + '(',
		    close = (is3d ? ',0' : '') + ')';

		return open + point.x + 'px,' + point.y + 'px' + close;
	},

	getScaleString: function (scale, origin) {

		var preTranslateStr = L.DomUtil.getTranslateString(origin.add(origin.multiplyBy(-1 * scale))),
		    scaleStr = ' scale(' + scale + ') ';

		return preTranslateStr + scaleStr;
	},

	setPosition: function (el, point, disable3D) { // (HTMLElement, Point[, Boolean])

		// jshint camelcase: false
		el._leaflet_pos = point;

		if (!disable3D && L.Browser.any3d) {
			el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance

		// jshint camelcase: false
		return el._leaflet_pos;
	}
};


// prefix style property names

L.DomUtil.TRANSFORM = L.DomUtil.testProp(
        ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

// webkitTransition comes first because some browser versions that drop vendor prefix don't do
// the same for the transitionend event, in particular the Android 4.1 stock browser

L.DomUtil.TRANSITION = L.DomUtil.testProp(
        ['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

L.DomUtil.TRANSITION_END =
        L.DomUtil.TRANSITION === 'webkitTransition' || L.DomUtil.TRANSITION === 'OTransition' ?
        L.DomUtil.TRANSITION + 'End' : 'transitionend';

(function () {
    if ('onselectstart' in document) {
        L.extend(L.DomUtil, {
            disableTextSelection: function () {
                L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
            },

            enableTextSelection: function () {
                L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
            }
        });
    } else {
        var userSelectProperty = L.DomUtil.testProp(
            ['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

        L.extend(L.DomUtil, {
            disableTextSelection: function () {
                if (userSelectProperty) {
                    var style = document.documentElement.style;
                    this._userSelect = style[userSelectProperty];
                    style[userSelectProperty] = 'none';
                }
            },

            enableTextSelection: function () {
                if (userSelectProperty) {
                    document.documentElement.style[userSelectProperty] = this._userSelect;
                    delete this._userSelect;
                }
            }
        });
    }

	L.extend(L.DomUtil, {
		disableImageDrag: function () {
			L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
		},

		enableImageDrag: function () {
			L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
		}
	});
})();


/*
 * L.LatLng represents a geographical point with latitude and longitude coordinates.
 */

L.LatLng = function (lat, lng, alt) { // (Number, Number, Number)
	lat = parseFloat(lat);
	lng = parseFloat(lng);

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	this.lat = lat;
	this.lng = lng;

	if (alt !== undefined) {
		this.alt = parseFloat(alt);
	}
};

L.extend(L.LatLng, {
	DEG_TO_RAD: Math.PI / 180,
	RAD_TO_DEG: 180 / Math.PI,
	MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
});

L.LatLng.prototype = {
	equals: function (obj) { // (LatLng) -> Boolean
		if (!obj) { return false; }

		obj = L.latLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= L.LatLng.MAX_MARGIN;
	},

	toString: function (precision) { // (Number) -> String
		return 'LatLng(' +
		        L.Util.formatNum(this.lat, precision) + ', ' +
		        L.Util.formatNum(this.lng, precision) + ')';
	},

	// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
	// TODO move to projection code, LatLng shouldn't know about Earth
	distanceTo: function (other) { // (LatLng) -> Number
		other = L.latLng(other);

		var R = 6378137, // earth radius in meters
		    d2r = L.LatLng.DEG_TO_RAD,
		    dLat = (other.lat - this.lat) * d2r,
		    dLon = (other.lng - this.lng) * d2r,
		    lat1 = this.lat * d2r,
		    lat2 = other.lat * d2r,
		    sin1 = Math.sin(dLat / 2),
		    sin2 = Math.sin(dLon / 2);

		var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);

		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	},

	wrap: function (a, b) { // (Number, Number) -> LatLng
		var lng = this.lng;

		a = a || -180;
		b = b ||  180;

		lng = (lng + b) % (b - a) + (lng < a || lng === b ? b : a);

		return new L.LatLng(this.lat, lng);
	}
};

L.latLng = function (a, b) { // (LatLng) or ([Number, Number]) or (Number, Number)
	if (a instanceof L.LatLng) {
		return a;
	}
	if (L.Util.isArray(a)) {
		if (typeof a[0] === 'number' || typeof a[0] === 'string') {
			return new L.LatLng(a[0], a[1], a[2]);
		} else {
			return null;
		}
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon);
	}
	if (b === undefined) {
		return null;
	}
	return new L.LatLng(a, b);
};



/*
 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
 */

L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
	if (!southWest) { return; }

	var latlngs = northEast ? [southWest, northEast] : southWest;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
};

L.LatLngBounds.prototype = {
	// extend the bounds to contain the given point or bounds
	extend: function (obj) { // (LatLng) or (LatLngBounds)
		if (!obj) { return this; }

		var latLng = L.latLng(obj);
		if (latLng !== null) {
			obj = latLng;
		} else {
			obj = L.latLngBounds(obj);
		}

		if (obj instanceof L.LatLng) {
			if (!this._southWest && !this._northEast) {
				this._southWest = new L.LatLng(obj.lat, obj.lng);
				this._northEast = new L.LatLng(obj.lat, obj.lng);
			} else {
				this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
				this._southWest.lng = Math.min(obj.lng, this._southWest.lng);

				this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
				this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
			}
		} else if (obj instanceof L.LatLngBounds) {
			this.extend(obj._southWest);
			this.extend(obj._northEast);
		}
		return this;
	},

	// extend the bounds by a percentage
	pad: function (bufferRatio) { // (Number) -> LatLngBounds
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new L.LatLngBounds(
		        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	getCenter: function () { // -> LatLng
		return new L.LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
		return new L.LatLng(this.getNorth(), this.getWest());
	},

	getSouthEast: function () {
		return new L.LatLng(this.getSouth(), this.getEast());
	},

	getWest: function () {
		return this._southWest.lng;
	},

	getSouth: function () {
		return this._southWest.lat;
	},

	getEast: function () {
		return this._northEast.lng;
	},

	getNorth: function () {
		return this._northEast.lat;
	},

	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	intersects: function (bounds) { // (LatLngBounds)
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	equals: function (bounds) { // (LatLngBounds)
		if (!bounds) { return false; }

		bounds = L.latLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
	},

	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

//TODO International date line?

L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
	if (!a || a instanceof L.LatLngBounds) {
		return a;
	}
	return new L.LatLngBounds(a, b);
};


/*
 * L.Projection contains various geographical projections used by CRS classes.
 */

L.Projection = {};


/*
 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
 */

L.Projection.SphericalMercator = {
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    x = latlng.lng * d,
		    y = lat * d;

		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    lng = point.x * d,
		    lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

		return new L.LatLng(lat, lng);
	}
};


/*
 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326 and Simple.
 */

L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point) {
		return new L.LatLng(point.y, point.x);
	}
};


/*
 * L.CRS is a base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
 */

L.CRS = {
	latLngToPoint: function (latlng, zoom) { // (LatLng, Number) -> Point
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	pointToLatLng: function (point, zoom) { // (Point, Number[, Boolean]) -> LatLng
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	project: function (latlng) {
		return this.projection.project(latlng);
	},

	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	getSize: function (zoom) {
		var s = this.scale(zoom);
		return L.point(s, s);
	}
};


/*
 * A simple CRS that can be used for flat non-Earth maps like panoramas or game maps.
 */

L.CRS.Simple = L.extend({}, L.CRS, {
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1, 0, -1, 0),

	scale: function (zoom) {
		return Math.pow(2, zoom);
	}
});


/*
 * L.CRS.EPSG3857 (Spherical Mercator) is the most common CRS for web mapping
 * and is used by Leaflet by default.
 */

L.CRS.EPSG3857 = L.extend({}, L.CRS, {
	code: 'EPSG:3857',

	projection: L.Projection.SphericalMercator,
	transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

	project: function (latlng) { // (LatLng) -> Point
		var projectedPoint = this.projection.project(latlng),
		    earthRadius = 6378137;
		return projectedPoint.multiplyBy(earthRadius);
	}
});

L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});


/*
 * L.CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
 */

L.CRS.EPSG4326 = L.extend({}, L.CRS, {
	code: 'EPSG:4326',

	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
});


/*
 * L.Map is the central class of the API - it is used to create a map.
 */

L.Map = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		crs: L.CRS.EPSG3857,

		/*
		center: LatLng,
		zoom: Number,
		layers: Array,
		*/

		fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android23,
		trackResize: true,
		markerZoomAnimation: L.DomUtil.TRANSITION && L.Browser.any3d
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = L.setOptions(this, options);


		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = L.bind(this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(L.latLng(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];

		this._layers = {};
		this._zoomBoundLayers = {};
		this._tileLayersNum = 0;

		this.callInitHooks();

		this._addLayers(options.layers);
	},


	// public methods that modify map state

	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		zoom = zoom === undefined ? this.getZoom() : zoom;
		this._resetView(L.latLng(center), this._limitZoom(zoom));
		return this;
	},

	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = this._limitZoom(zoom);
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	zoomIn: function (delta, options) {
		return this.setZoom(this._zoom + (delta || 1), options);
	},

	zoomOut: function (delta, options) {
		return this.setZoom(this._zoom - (delta || 1), options);
	},

	setZoomAround: function (latlng, zoom, options) {
		var scale = this.getZoomScale(zoom),
		    viewHalf = this.getSize().divideBy(2),
		    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),

		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	fitBounds: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);

		var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
		    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),

		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR)),
		    paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

		    swPoint = this.project(bounds.getSouthWest(), zoom),
		    nePoint = this.project(bounds.getNorthEast(), zoom),
		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		zoom = options && options.maxZoom ? Math.min(options.maxZoom, zoom) : zoom;

		return this.setView(center, zoom, options);
	},

	fitWorld: function (options) {
		return this.fitBounds([[-90, -180], [90, 180]], options);
	},

	panTo: function (center, options) { // (LatLng)
		return this.setView(center, this._zoom, {pan: options});
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.PanAnimation.js
		this.fire('movestart');

		this._rawPanBy(L.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

	setMaxBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		this.options.maxBounds = bounds;

		if (!bounds) {
			return this.off('moveend', this._panInsideMaxBounds, this);
		}

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds, this);
	},

	panInsideBounds: function (bounds, options) {
		var center = this.getCenter(),
			newCenter = this._limitCenter(center, this._zoom, bounds);

		if (center.equals(newCenter)) { return this; }

		return this.panTo(newCenter, options);
	},

	addLayer: function (layer) {
		// TODO method is too big, refactor

		var id = L.stamp(layer);

		if (this._layers[id]) { return this; }

		this._layers[id] = layer;

		// TODO getMaxZoom, getMinZoom in ILayer (instead of options)
		if (layer.options && (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom))) {
			this._zoomBoundLayers[id] = layer;
			this._updateZoomLevels();
		}

		// TODO looks ugly, refactor!!!
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum++;
			this._tileLayersToLoad++;
			layer.on('load', this._onTileLayerLoad, this);
		}

		if (this._loaded) {
			this._layerAdd(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
		}

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}

		// TODO looks ugly, refactor
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum--;
			this._tileLayersToLoad--;
			layer.off('load', this._onTileLayerLoad, this);
		}

		return this;
	},

	hasLayer: function (layer) {
		if (!layer) { return false; }

		return (L.stamp(layer) in this._layers);
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	invalidateSize: function (options) {
		if (!this._loaded) { return this; }

		options = L.extend({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._initialCenter = null;

		var newSize = this.getSize(),
		    oldCenter = oldSize.divideBy(2).round(),
		    newCenter = newSize.divideBy(2).round(),
		    offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) { return this; }

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	// TODO handler.addTo
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return this; }

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	remove: function () {
		if (this._loaded) {
			this.fire('unload');
		}

		this._initEvents('off');

		try {
			// throws error in IE6-8
			delete this._container._leaflet;
		} catch (e) {
			this._container._leaflet = undefined;
		}

		this._clearPanes();
		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		return this;
	},


	// public methods for getting map state

	getCenter: function () { // (Boolean) -> LatLng
		this._checkIfLoaded();

		if (this._initialCenter && !this._moved()) {
			return this._initialCenter;
		}
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new L.LatLngBounds(sw, ne);
	},

	getMinZoom: function () {
		return this.options.minZoom === undefined ?
			(this._layersMinZoom === undefined ? 0 : this._layersMinZoom) :
			this.options.minZoom;
	},

	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
		bounds = L.latLngBounds(bounds);

		var zoom = this.getMinZoom() - (inside ? 1 : 0),
		    maxZoom = this.getMaxZoom(),
		    size = this.getSize(),

		    nw = bounds.getNorthWest(),
		    se = bounds.getSouthEast(),

		    zoomNotFound = true,
		    boundsSize;

		padding = L.point(padding || [0, 0]);

		do {
			zoom++;
			boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding);
			zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;

		} while (zoomNotFound && zoom <= maxZoom);

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(
				this._container.clientWidth,
				this._container.clientHeight);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	getPixelBounds: function () {
		var topLeftPoint = this._getTopLeftPoint();
		return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._initialTopLeftPoint;
	},

	getPanes: function () {
		return this._panes;
	},

	getContainer: function () {
		return this._container;
	},


	// TODO replace with universal implementation after refactoring projections

	getZoomScale: function (toZoom) {
		var crs = this.options.crs;
		return crs.scale(toZoom) / crs.scale(this._zoom);
	},

	getScaleZoom: function (scale) {
		return this._zoom + (Math.log(scale) / Math.LN2);
	},


	// conversion methods

	project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
	},

	unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(L.point(point), zoom);
	},

	layerPointToLatLng: function (point) { // (Point)
		var projectedPoint = L.point(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	latLngToLayerPoint: function (latlng) { // (LatLng)
		var projectedPoint = this.project(L.latLng(latlng))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return L.point(point).subtract(this._getMapPanePos());
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return L.point(point).add(this._getMapPanePos());
	},

	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(L.point(point));
		return this.layerPointToLatLng(layerPoint);
	},

	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
	},

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return L.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = L.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._leaflet) {
			throw new Error('Map container is already initialized.');
		}

		container._leaflet = true;
	},

	_initLayout: function () {
		var container = this._container;

		L.DomUtil.addClass(container, 'leaflet-container' +
			(L.Browser.touch ? ' leaflet-touch' : '') +
			(L.Browser.retina ? ' leaflet-retina' : '') +
			(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
			(this.options.fadeAnimation ? ' leaflet-fade-anim' : ''));

		var position = L.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};

		this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);

		this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
		panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
		panes.shadowPane = this._createPane('leaflet-shadow-pane');
		panes.overlayPane = this._createPane('leaflet-overlay-pane');
		panes.markerPane = this._createPane('leaflet-marker-pane');
		panes.popupPane = this._createPane('leaflet-popup-pane');

		var zoomHide = ' leaflet-zoom-hide';

		if (!this.options.markerZoomAnimation) {
			L.DomUtil.addClass(panes.markerPane, zoomHide);
			L.DomUtil.addClass(panes.shadowPane, zoomHide);
			L.DomUtil.addClass(panes.popupPane, zoomHide);
		}
	},

	_createPane: function (className, container) {
		return L.DomUtil.create('div', className, container || this._panes.objectsPane);
	},

	_clearPanes: function () {
		this._container.removeChild(this._mapPane);
	},

	_addLayers: function (layers) {
		layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},


	// private methods that modify map state

	_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {

		var zoomChanged = (this._zoom !== zoom);

		if (!afterZoomAnim) {
			this.fire('movestart');

			if (zoomChanged) {
				this.fire('zoomstart');
			}
		}

		this._zoom = zoom;
		this._initialCenter = center;

		this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

		if (!preserveMapOffset) {
			L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
		} else {
			this._initialTopLeftPoint._add(this._getMapPanePos());
		}

		this._tileLayersToLoad = this._tileLayersNum;

		var loading = !this._loaded;
		this._loaded = true;

		if (loading) {
			this.fire('load');
			this.eachLayer(this._layerAdd, this);
		}

		this.fire('viewreset', {hard: !preserveMapOffset});

		this.fire('move');

		if (zoomChanged || afterZoomAnim) {
			this.fire('zoomend');
		}

		this.fire('moveend', {hard: !preserveMapOffset});
	},

	_rawPanBy: function (offset) {
		L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_updateZoomLevels: function () {
		var i,
			minZoom = Infinity,
			maxZoom = -Infinity,
			oldZoomSpan = this._getZoomSpan();

		for (i in this._zoomBoundLayers) {
			var layer = this._zoomBoundLayers[i];
			if (!isNaN(layer.options.minZoom)) {
				minZoom = Math.min(minZoom, layer.options.minZoom);
			}
			if (!isNaN(layer.options.maxZoom)) {
				maxZoom = Math.max(maxZoom, layer.options.maxZoom);
			}
		}

		if (i === undefined) { // we have no tilelayers
			this._layersMaxZoom = this._layersMinZoom = undefined;
		} else {
			this._layersMaxZoom = maxZoom;
			this._layersMinZoom = minZoom;
		}

		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}
	},

	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// map events

	_initEvents: function (onOff) {
		if (!L.DomEvent) { return; }

		onOff = onOff || 'on';

		L.DomEvent[onOff](this._container, 'click', this._onMouseClick, this);

		var events = ['dblclick', 'mousedown', 'mouseup', 'mouseenter',
		              'mouseleave', 'mousemove', 'contextmenu'],
		    i, len;

		for (i = 0, len = events.length; i < len; i++) {
			L.DomEvent[onOff](this._container, events[i], this._fireMouseEvent, this);
		}

		if (this.options.trackResize) {
			L.DomEvent[onOff](window, 'resize', this._onResize, this);
		}
	},

	_onResize: function () {
		L.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = L.Util.requestAnimFrame(
		        function () { this.invalidateSize({debounceMoveend: true}); }, this, false, this._container);
	},

	_onMouseClick: function (e) {
		if (!this._loaded || (!e._simulated &&
		        ((this.dragging && this.dragging.moved()) ||
		         (this.boxZoom  && this.boxZoom.moved()))) ||
		            L.DomEvent._skipped(e)) { return; }

		this.fire('preclick');
		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._loaded || L.DomEvent._skipped(e)) { return; }

		var type = e.type;

		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) { return; }

		if (type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}

		var containerPoint = this.mouseEventToContainerPoint(e),
		    layerPoint = this.containerPointToLayerPoint(containerPoint),
		    latlng = this.layerPointToLatLng(layerPoint);

		this.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});
	},

	_onTileLayerLoad: function () {
		this._tileLayersToLoad--;
		if (this._tileLayersNum && !this._tileLayersToLoad) {
			this.fire('tilelayersload');
		}
	},

	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, this);
		} else {
			this.on('load', callback, context);
		}
		return this;
	},

	_layerAdd: function (layer) {
		layer.onAdd(this);
		this.fire('layeradd', {layer: layer});
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return L.DomUtil.getPosition(this._mapPane);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function () {
		return this.getPixelOrigin().subtract(this._getMapPanePos());
	},

	_getNewTopLeftPoint: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		// TODO round on display, not calculation to increase precision?
		return this.project(center, zoom)._subtract(viewHalf)._round();
	},

	_latLngToNewLayerPoint: function (latlng, newZoom, newCenter) {
		var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
		return this.project(latlng, newZoom)._subtract(topLeft);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (latlng) {
		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) { return center; }

		var centerPoint = this.project(center, zoom),
		    viewHalf = this.getSize().divideBy(2),
		    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	_limitOffset: function (offset, bounds) {
		if (!bounds) { return offset; }

		var viewBounds = this.getPixelBounds(),
		    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
		    seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

		    dx = this._rebound(nwOffset.x, -seOffset.x),
		    dy = this._rebound(nwOffset.y, -seOffset.y);

		return new L.Point(dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom();

		return Math.max(min, Math.min(max, zoom));
	}
});

L.map = function (id, options) {
	return new L.Map(id, options);
};


/*
 * Mercator projection that takes into account that the Earth is not a perfect sphere.
 * Less popular than spherical mercator; used by projections like EPSG:3395.
 */

L.Projection.Mercator = {
	MAX_LATITUDE: 85.0840591556,

	R_MINOR: 6356752.314245179,
	R_MAJOR: 6378137,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    x = latlng.lng * d * r,
		    y = lat * d,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1.0 - tmp * tmp),
		    con = eccent * Math.sin(y);

		con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

		var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
		y = -r * Math.log(ts);

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    lng = point.x * d / r,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1 - (tmp * tmp)),
		    ts = Math.exp(- point.y / r),
		    phi = (Math.PI / 2) - 2 * Math.atan(ts),
		    numIter = 15,
		    tol = 1e-7,
		    i = numIter,
		    dphi = 0.1,
		    con;

		while ((Math.abs(dphi) > tol) && (--i > 0)) {
			con = eccent * Math.sin(phi);
			dphi = (Math.PI / 2) - 2 * Math.atan(ts *
			            Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, lng);
	}
};



L.CRS.EPSG3395 = L.extend({}, L.CRS, {
	code: 'EPSG:3395',

	projection: L.Projection.Mercator,

	transformation: (function () {
		var m = L.Projection.Mercator,
		    r = m.R_MAJOR,
		    scale = 0.5 / (Math.PI * r);

		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});


/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		subdomains: 'abc',
		errorTileUrl: '',
		attribution: '',
		zoomOffset: 0,
		opacity: 1,
		/*
		maxNativeZoom: null,
		zIndex: null,
		tms: false,
		continuousWorld: false,
		noWrap: false,
		zoomReverse: false,
		detectRetina: false,
		reuseTiles: false,
		bounds: false,
		*/
		unloadInvisibleTiles: L.Browser.mobile,
		updateWhenIdle: L.Browser.mobile
	},

	initialize: function (url, options) {
		options = L.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);
			options.zoomOffset++;

			if (options.minZoom > 0) {
				options.minZoom--;
			}
			this.options.maxZoom--;
		}

		if (options.bounds) {
			options.bounds = L.latLngBounds(options.bounds);
		}

		this._url = url;

		var subdomains = this.options.subdomains;

		if (typeof subdomains === 'string') {
			this.options.subdomains = subdomains.split('');
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._animated = map._zoomAnimated;

		// create a container div for tiles
		this._initContainer();

		// set up events
		map.on({
			'viewreset': this._reset,
			'moveend': this._update
		}, this);

		if (this._animated) {
			map.on({
				'zoomanim': this._animateZoom,
				'zoomend': this._endZoomAnim
			}, this);
		}

		if (!this.options.updateWhenIdle) {
			this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
			map.on('move', this._limitedUpdate, this);
		}

		this._reset();
		this._update();
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		this._container.parentNode.removeChild(this._container);

		map.off({
			'viewreset': this._reset,
			'moveend': this._update
		}, this);

		if (this._animated) {
			map.off({
				'zoomanim': this._animateZoom,
				'zoomend': this._endZoomAnim
			}, this);
		}

		if (!this.options.updateWhenIdle) {
			map.off('move', this._limitedUpdate, this);
		}

		this._container = null;
		this._map = null;
	},

	bringToFront: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.appendChild(this._container);
			this._setAutoZIndex(pane, Math.max);
		}

		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.insertBefore(this._container, pane.firstChild);
			this._setAutoZIndex(pane, Math.min);
		}

		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	getContainer: function () {
		return this._container;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}
		return this;
	},

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	_setAutoZIndex: function (pane, compare) {

		var layers = pane.children,
		    edgeZIndex = -compare(Infinity, -Infinity), // -Infinity for max, Infinity for min
		    zIndex, i, len;

		for (i = 0, len = layers.length; i < len; i++) {

			if (layers[i] !== this._container) {
				zIndex = parseInt(layers[i].style.zIndex, 10);

				if (!isNaN(zIndex)) {
					edgeZIndex = compare(edgeZIndex, zIndex);
				}
			}
		}

		this.options.zIndex = this._container.style.zIndex =
		        (isFinite(edgeZIndex) ? edgeZIndex : 0) + compare(1, -1);
	},

	_updateOpacity: function () {
		var i,
		    tiles = this._tiles;

		if (L.Browser.ielt9) {
			for (i in tiles) {
				L.DomUtil.setOpacity(tiles[i], this.options.opacity);
			}
		} else {
			L.DomUtil.setOpacity(this._container, this.options.opacity);
		}
	},

	_initContainer: function () {
		var tilePane = this._map._panes.tilePane;

		if (!this._container) {
			this._container = L.DomUtil.create('div', 'leaflet-layer');

			this._updateZIndex();

			if (this._animated) {
				var className = 'leaflet-tile-container';

				this._bgBuffer = L.DomUtil.create('div', className, this._container);
				this._tileContainer = L.DomUtil.create('div', className, this._container);

			} else {
				this._tileContainer = this._container;
			}

			tilePane.appendChild(this._container);

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
		}
	},

	_reset: function (e) {
		for (var key in this._tiles) {
			this.fire('tileunload', {tile: this._tiles[key]});
		}

		this._tiles = {};
		this._tilesToLoad = 0;

		if (this.options.reuseTiles) {
			this._unusedTiles = [];
		}

		this._tileContainer.innerHTML = '';

		if (this._animated && e && e.hard) {
			this._clearBgBuffer();
		}

		this._initContainer();
	},

	_getTileSize: function () {
		var map = this._map,
		    zoom = map.getZoom() + this.options.zoomOffset,
		    zoomN = this.options.maxNativeZoom,
		    tileSize = this.options.tileSize;

		if (zoomN && zoom > zoomN) {
			tileSize = Math.round(map.getZoomScale(zoom) / map.getZoomScale(zoomN) * tileSize);
		}

		return tileSize;
	},

	_update: function () {

		if (!this._map) { return; }

		var map = this._map,
		    bounds = map.getPixelBounds(),
		    zoom = map.getZoom(),
		    tileSize = this._getTileSize();

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var tileBounds = L.bounds(
		        bounds.min.divideBy(tileSize)._floor(),
		        bounds.max.divideBy(tileSize)._floor());

		this._addTilesFromCenterOut(tileBounds);

		if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
			this._removeOtherTiles(tileBounds);
		}
	},

	_addTilesFromCenterOut: function (bounds) {
		var queue = [],
		    center = bounds.getCenter();

		var j, i, point;

		for (j = bounds.min.y; j <= bounds.max.y; j++) {
			for (i = bounds.min.x; i <= bounds.max.x; i++) {
				point = new L.Point(i, j);

				if (this._tileShouldBeLoaded(point)) {
					queue.push(point);
				}
			}
		}

		var tilesToLoad = queue.length;

		if (tilesToLoad === 0) { return; }

		// load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		var fragment = document.createDocumentFragment();

		// if its the first batch of tiles to load
		if (!this._tilesToLoad) {
			this.fire('loading');
		}

		this._tilesToLoad += tilesToLoad;

		for (i = 0; i < tilesToLoad; i++) {
			this._addTile(queue[i], fragment);
		}

		this._tileContainer.appendChild(fragment);
	},

	_tileShouldBeLoaded: function (tilePoint) {
		if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
			return false; // already loaded
		}

		var options = this.options;

		if (!options.continuousWorld) {
			var limit = this._getWrapTileNum();

			// don't load if exceeds world bounds
			if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit.x)) ||
				tilePoint.y < 0 || tilePoint.y >= limit.y) { return false; }
		}

		if (options.bounds) {
			var tileSize = options.tileSize,
			    nwPoint = tilePoint.multiplyBy(tileSize),
			    sePoint = nwPoint.add([tileSize, tileSize]),
			    nw = this._map.unproject(nwPoint),
			    se = this._map.unproject(sePoint);

			// TODO temporary hack, will be removed after refactoring projections
			// https://github.com/Leaflet/Leaflet/issues/1618
			if (!options.continuousWorld && !options.noWrap) {
				nw = nw.wrap();
				se = se.wrap();
			}

			if (!options.bounds.intersects([nw, se])) { return false; }
		}

		return true;
	},

	_removeOtherTiles: function (bounds) {
		var kArr, x, y, key;

		for (key in this._tiles) {
			kArr = key.split(':');
			x = parseInt(kArr[0], 10);
			y = parseInt(kArr[1], 10);

			// remove tile if it's out of bounds
			if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {
				this._removeTile(key);
			}
		}
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];

		this.fire('tileunload', {tile: tile, url: tile.src});

		if (this.options.reuseTiles) {
			L.DomUtil.removeClass(tile, 'leaflet-tile-loaded');
			this._unusedTiles.push(tile);

		} else if (tile.parentNode === this._tileContainer) {
			this._tileContainer.removeChild(tile);
		}

		// for https://github.com/CloudMade/Leaflet/issues/137
		if (!L.Browser.android) {
			tile.onload = null;
			tile.src = L.Util.emptyImageUrl;
		}

		delete this._tiles[key];
	},

	_addTile: function (tilePoint, container) {
		var tilePos = this._getTilePos(tilePoint);

		// get unused tile - or create a new tile
		var tile = this._getTile();

		/*
		Chrome 20 layouts much faster with top/left (verify with timeline, frames)
		Android 4 browser has display issues with top/left and requires transform instead
		(other browsers don't currently care) - see debug/hacks/jitter.html for an example
		*/
		L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);

		this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;

		this._loadTile(tile, tilePoint);

		if (tile.parentNode !== this._tileContainer) {
			container.appendChild(tile);
		}
	},

	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},

	_getTilePos: function (tilePoint) {
		var origin = this._map.getPixelOrigin(),
		    tileSize = this._getTileSize();

		return tilePoint.multiplyBy(tileSize).subtract(origin);
	},

	// image-specific code (override to implement e.g. Canvas or SVG tile layer)

	getTileUrl: function (tilePoint) {
		return L.Util.template(this._url, L.extend({
			s: this._getSubdomain(tilePoint),
			z: tilePoint.z,
			x: tilePoint.x,
			y: tilePoint.y
		}, this.options));
	},

	_getWrapTileNum: function () {
		var crs = this._map.options.crs,
		    size = crs.getSize(this._map.getZoom());
		return size.divideBy(this._getTileSize())._floor();
	},

	_adjustTilePoint: function (tilePoint) {

		var limit = this._getWrapTileNum();

		// wrap tile coordinates
		if (!this.options.continuousWorld && !this.options.noWrap) {
			tilePoint.x = ((tilePoint.x % limit.x) + limit.x) % limit.x;
		}

		if (this.options.tms) {
			tilePoint.y = limit.y - tilePoint.y - 1;
		}

		tilePoint.z = this._getZoomForUrl();
	},

	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	_getTile: function () {
		if (this.options.reuseTiles && this._unusedTiles.length > 0) {
			var tile = this._unusedTiles.pop();
			this._resetTile(tile);
			return tile;
		}
		return this._createTile();
	},

	// Override if data stored on a tile needs to be cleaned up before reuse
	_resetTile: function (/*tile*/) {},

	_createTile: function () {
		var tile = L.DomUtil.create('img', 'leaflet-tile');
		tile.style.width = tile.style.height = this._getTileSize() + 'px';
		tile.galleryimg = 'no';

		tile.onselectstart = tile.onmousemove = L.Util.falseFn;

		if (L.Browser.ielt9 && this.options.opacity !== undefined) {
			L.DomUtil.setOpacity(tile, this.options.opacity);
		}
		// without this hack, tiles disappear after zoom on Chrome for Android
		// https://github.com/Leaflet/Leaflet/issues/2078
		if (L.Browser.mobileWebkit3d) {
			tile.style.WebkitBackfaceVisibility = 'hidden';
		}
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		this._adjustTilePoint(tilePoint);
		tile.src     = this.getTileUrl(tilePoint);

		this.fire('tileloadstart', {
			tile: tile,
			url: tile.src
		});
	},

	_tileLoaded: function () {
		this._tilesToLoad--;

		if (this._animated) {
			L.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated');
		}

		if (!this._tilesToLoad) {
			this.fire('load');

			if (this._animated) {
				// clear scaled tiles after all new tiles are loaded (for performance)
				clearTimeout(this._clearBgBufferTimer);
				this._clearBgBufferTimer = setTimeout(L.bind(this._clearBgBuffer, this), 500);
			}
		}
	},

	_tileOnLoad: function () {
		var layer = this._layer;

		//Only if we are loading an actual image
		if (this.src !== L.Util.emptyImageUrl) {
			L.DomUtil.addClass(this, 'leaflet-tile-loaded');

			layer.fire('tileload', {
				tile: this,
				url: this.src
			});
		}

		layer._tileLoaded();
	},

	_tileOnError: function () {
		var layer = this._layer;

		layer.fire('tileerror', {
			tile: this,
			url: this.src
		});

		var newUrl = layer.options.errorTileUrl;
		if (newUrl) {
			this.src = newUrl;
		}

		layer._tileLoaded();
	}
});

L.tileLayer = function (url, options) {
	return new L.TileLayer(url, options);
};


/*
 * L.TileLayer.WMS is used for putting WMS tile layers on the map.
 */

L.TileLayer.WMS = L.TileLayer.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	initialize: function (url, options) { // (String, Object)

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams),
		    tileSize = options.tileSize || this.options.tileSize;

		if (options.detectRetina && L.Browser.retina) {
			wmsParams.width = wmsParams.height = tileSize * 2;
		} else {
			wmsParams.width = wmsParams.height = tileSize;
		}

		for (var i in options) {
			// all keys that are not TileLayer options go to WMS params
			if (!this.options.hasOwnProperty(i) && i !== 'crs') {
				wmsParams[i] = options[i];
			}
		}

		this.wmsParams = wmsParams;

		L.setOptions(this, options);
	},

	onAdd: function (map) {

		this._crs = this.options.crs || map.options.crs;

		this._wmsVersion = parseFloat(this.wmsParams.version);

		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
		this.wmsParams[projectionKey] = this._crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (tilePoint) { // (Point, Number) -> String

		var map = this._map,
		    tileSize = this.options.tileSize,

		    nwPoint = tilePoint.multiplyBy(tileSize),
		    sePoint = nwPoint.add([tileSize, tileSize]),

		    nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
		    se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
		    bbox = this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
		        [se.y, nw.x, nw.y, se.x].join(',') :
		        [nw.x, se.y, se.x, nw.y].join(','),

		    url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

		return url + L.Util.getParamString(this.wmsParams, url, true) + '&BBOX=' + bbox;
	},

	setParams: function (params, noRedraw) {

		L.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});

L.tileLayer.wms = function (url, options) {
	return new L.TileLayer.WMS(url, options);
};


/*
 * L.TileLayer.Canvas is a class that you can use as a base for creating
 * dynamically drawn Canvas-based tile layers.
 */

L.TileLayer.Canvas = L.TileLayer.extend({
	options: {
		async: false
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}

		for (var i in this._tiles) {
			this._redrawTile(this._tiles[i]);
		}
		return this;
	},

	_redrawTile: function (tile) {
		this.drawTile(tile, tile._tilePoint, this._map._zoom);
	},

	_createTile: function () {
		var tile = L.DomUtil.create('canvas', 'leaflet-tile');
		tile.width = tile.height = this.options.tileSize;
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer = this;
		tile._tilePoint = tilePoint;

		this._redrawTile(tile);

		if (!this.options.async) {
			this.tileDrawn(tile);
		}
	},

	drawTile: function (/*tile, tilePoint*/) {
		// override with rendering code
	},

	tileDrawn: function (tile) {
		this._tileOnLoad.call(tile);
	}
});


L.tileLayer.canvas = function (options) {
	return new L.TileLayer.Canvas(options);
};


/*
 * L.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
 */

L.ImageOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		opacity: 1
	},

	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
		this._url = url;
		this._bounds = L.latLngBounds(bounds);

		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map._panes.overlayPane.appendChild(this._image);

		map.on('viewreset', this._reset, this);

		if (map.options.zoomAnimation && L.Browser.any3d) {
			map.on('zoomanim', this._animateZoom, this);
		}

		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._image);

		map.off('viewreset', this._reset, this);

		if (map.options.zoomAnimation) {
			map.off('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
		return this;
	},

	// TODO remove bringToFront/bringToBack duplication from TileLayer/Path
	bringToFront: function () {
		if (this._image) {
			this._map._panes.overlayPane.appendChild(this._image);
		}
		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.overlayPane;
		if (this._image) {
			pane.insertBefore(this._image, pane.firstChild);
		}
		return this;
	},

	setUrl: function (url) {
		this._url = url;
		this._image.src = this._url;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	_initImage: function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer');

		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
		} else {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
		}

		this._updateOpacity();

		//TODO createImage util method to remove duplication
		L.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: L.bind(this._onImageLoad, this),
			src: this._url
		});
	},

	_animateZoom: function (e) {
		var map = this._map,
		    image = this._image,
		    scale = map.getZoomScale(e.zoom),
		    nw = this._bounds.getNorthWest(),
		    se = this._bounds.getSouthEast(),

		    topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
		    size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
		    origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));

		image.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
	},

	_reset: function () {
		var image   = this._image,
		    topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		    size = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);

		L.DomUtil.setPosition(image, topLeft);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_onImageLoad: function () {
		this.fire('load');
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

L.imageOverlay = function (url, bounds, options) {
	return new L.ImageOverlay(url, bounds, options);
};


/*
 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
 */

L.Icon = L.Class.extend({
	options: {
		/*
		iconUrl: (String) (required)
		iconRetinaUrl: (String) (optional, used for retina devices if detected)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (String) (no shadow by default)
		shadowRetinaUrl: (String) (optional, used for retina devices if detected)
		shadowSize: (Point)
		shadowAnchor: (Point)
		*/
		className: ''
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	createIcon: function (oldIcon) {
		return this._createIcon('icon', oldIcon);
	},

	createShadow: function (oldIcon) {
		return this._createIcon('shadow', oldIcon);
	},

	_createIcon: function (name, oldIcon) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error('iconUrl not set in Icon options (see the docs).');
			}
			return null;
		}

		var img;
		if (!oldIcon || oldIcon.tagName !== 'IMG') {
			img = this._createImg(src);
		} else {
			img = this._createImg(src, oldIcon);
		}
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options,
		    size = L.point(options[name + 'Size']),
		    anchor;

		if (name === 'shadow') {
			anchor = L.point(options.shadowAnchor || options.iconAnchor);
		} else {
			anchor = L.point(options.iconAnchor);
		}

		if (!anchor && size) {
			anchor = size.divideBy(2, true);
		}

		img.className = 'leaflet-marker-' + name + ' ' + options.className;

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src, el) {
		el = el || document.createElement('img');
		el.src = src;
		return el;
	},

	_getIconUrl: function (name) {
		if (L.Browser.retina && this.options[name + 'RetinaUrl']) {
			return this.options[name + 'RetinaUrl'];
		}
		return this.options[name + 'Url'];
	}
});

L.icon = function (options) {
	return new L.Icon(options);
};


/*
 * L.Icon.Default is the blue marker icon used by default in Leaflet.
 */

L.Icon.Default = L.Icon.extend({

	options: {
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],

		shadowSize: [41, 41]
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		if (L.Browser.retina && name === 'icon') {
			name += '-2x';
		}

		var path = L.Icon.Default.imagePath;

		if (!path) {
			throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
		}

		return path + '/marker-' + name + '.png';
	}
});

L.Icon.Default.imagePath = (function () {
	var scripts = document.getElementsByTagName('script'),
	    leafletRe = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;

	var i, len, src, matches, path;

	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;
		matches = src.match(leafletRe);

		if (matches) {
			path = src.split(leafletRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}
}());


/*
 * L.Marker is used to display clickable/draggable icons on the map.
 */

L.Marker = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		icon: new L.Icon.Default(),
		title: '',
		alt: '',
		clickable: true,
		draggable: false,
		keyboard: true,
		zIndexOffset: 0,
		opacity: 1,
		riseOnHover: false,
		riseOffset: 250
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},

	onAdd: function (map) {
		this._map = map;

		map.on('viewreset', this.update, this);

		this._initIcon();
		this.update();
		this.fire('add');

		if (map.options.zoomAnimation && map.options.markerZoomAnimation) {
			map.on('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		if (this.dragging) {
			this.dragging.disable();
		}

		this._removeIcon();
		this._removeShadow();

		this.fire('remove');

		map.off({
			'viewreset': this.update,
			'zoomanim': this._animateZoom
		}, this);

		this._map = null;
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);

		this.update();

		return this.fire('move', { latlng: this._latlng });
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		this.update();

		return this;
	},

	setIcon: function (icon) {

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}

		if (this._popup) {
			this.bindPopup(this._popup);
		}

		return this;
	},

	update: function () {
		if (this._icon) {
			var pos = this._map.latLngToLayerPoint(this._latlng).round();
			this._setPos(pos);
		}

		return this;
	},

	_initIcon: function () {
		var options = this.options,
		    map = this._map,
		    animation = (map.options.zoomAnimation && map.options.markerZoomAnimation),
		    classToAdd = animation ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide';

		var icon = options.icon.createIcon(this._icon),
			addIcon = false;

		// if we're not reusing the icon, remove the old one and init new one
		if (icon !== this._icon) {
			if (this._icon) {
				this._removeIcon();
			}
			addIcon = true;

			if (options.title) {
				icon.title = options.title;
			}
			
			if (options.alt) {
				icon.alt = options.alt;
			}
		}

		L.DomUtil.addClass(icon, classToAdd);

		if (options.keyboard) {
			icon.tabIndex = '0';
		}

		this._icon = icon;

		this._initInteraction();

		if (options.riseOnHover) {
			L.DomEvent
				.on(icon, 'mouseover', this._bringToFront, this)
				.on(icon, 'mouseout', this._resetZIndex, this);
		}

		var newShadow = options.icon.createShadow(this._shadow),
			addShadow = false;

		if (newShadow !== this._shadow) {
			this._removeShadow();
			addShadow = true;
		}

		if (newShadow) {
			L.DomUtil.addClass(newShadow, classToAdd);
		}
		this._shadow = newShadow;


		if (options.opacity < 1) {
			this._updateOpacity();
		}


		var panes = this._map._panes;

		if (addIcon) {
			panes.markerPane.appendChild(this._icon);
		}

		if (newShadow && addShadow) {
			panes.shadowPane.appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		if (this.options.riseOnHover) {
			L.DomEvent
			    .off(this._icon, 'mouseover', this._bringToFront)
			    .off(this._icon, 'mouseout', this._resetZIndex);
		}

		this._map._panes.markerPane.removeChild(this._icon);

		this._icon = null;
	},

	_removeShadow: function () {
		if (this._shadow) {
			this._map._panes.shadowPane.removeChild(this._shadow);
		}
		this._shadow = null;
	},

	_setPos: function (pos) {
		L.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

		this._setPos(pos);
	},

	_initInteraction: function () {

		if (!this.options.clickable) { return; }

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
		    events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_onMouseClick: function (e) {
		var wasDragged = this.dragging && this.dragging.moved();

		if (this.hasEventListeners(e.type) || wasDragged) {
			L.DomEvent.stopPropagation(e);
		}

		if (wasDragged) { return; }

		if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) { return; }

		this.fire(e.type, {
			originalEvent: e,
			latlng: this._latlng
		});
	},

	_onKeyPress: function (e) {
		if (e.keyCode === 13) {
			this.fire('click', {
				originalEvent: e,
				latlng: this._latlng
			});
		}
	},

	_fireMouseEvent: function (e) {

		this.fire(e.type, {
			originalEvent: e,
			latlng: this._latlng
		});

		// TODO proper custom event propagation
		// this line will always be called if marker is in a FeatureGroup
		if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousedown') {
			L.DomEvent.stopPropagation(e);
		} else {
			L.DomEvent.preventDefault(e);
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._icon, this.options.opacity);
		if (this._shadow) {
			L.DomUtil.setOpacity(this._shadow, this.options.opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	}
});

L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};


/*
 * L.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
 * to use with L.Marker.
 */

L.DivIcon = L.Icon.extend({
	options: {
		iconSize: [12, 12], // also can be set through CSS
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		html: (String)
		bgPos: (Point)
		*/
		className: 'leaflet-div-icon',
		html: false
	},

	createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;

		if (options.html !== false) {
			div.innerHTML = options.html;
		} else {
			div.innerHTML = '';
		}

		if (options.bgPos) {
			div.style.backgroundPosition =
			        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
		}

		this._setIconStyles(div, 'icon');
		return div;
	},

	createShadow: function () {
		return null;
	}
});

L.divIcon = function (options) {
	return new L.DivIcon(options);
};


/*
 * L.Popup is used for displaying popups on the map.
 */

L.Map.mergeOptions({
	closePopupOnClick: true
});

L.Popup = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minWidth: 50,
		maxWidth: 300,
		// maxHeight: null,
		autoPan: true,
		closeButton: true,
		offset: [0, 7],
		autoPanPadding: [5, 5],
		// autoPanPaddingTopLeft: null,
		// autoPanPaddingBottomRight: null,
		keepInView: false,
		className: '',
		zoomAnimation: true
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._source = source;
		this._animated = L.Browser.any3d && this.options.zoomAnimation;
		this._isOpen = false;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initLayout();
		}

		var animFade = map.options.fadeAnimation;

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 0);
		}
		map._panes.popupPane.appendChild(this._container);

		map.on(this._getEvents(), this);

		this.update();

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 1);
		}

		this.fire('open');

		map.fire('popupopen', {popup: this});

		if (this._source) {
			this._source.fire('popupopen', {popup: this});
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	openOn: function (map) {
		map.openPopup(this);
		return this;
	},

	onRemove: function (map) {
		map._panes.popupPane.removeChild(this._container);

		L.Util.falseFn(this._container.offsetWidth); // force reflow

		map.off(this._getEvents(), this);

		if (map.options.fadeAnimation) {
			L.DomUtil.setOpacity(this._container, 0);
		}

		this._map = null;

		this.fire('close');

		map.fire('popupclose', {popup: this});

		if (this._source) {
			this._source.fire('popupclose', {popup: this});
		}
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		if (this._map) {
			this._updatePosition();
			this._adjustPan();
		}
		return this;
	},

	getContent: function () {
		return this._content;
	},

	setContent: function (content) {
		this._content = content;
		this.update();
		return this;
	},

	update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	_getEvents: function () {
		var events = {
			viewreset: this._updatePosition
		};

		if (this._animated) {
			events.zoomanim = this._zoomAnimation;
		}
		if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
			events.preclick = this._close;
		}
		if (this.options.keepInView) {
			events.moveend = this._adjustPan;
		}

		return events;
	},

	_close: function () {
		if (this._map) {
			this._map.closePopup(this);
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-popup',
			containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
			        (this._animated ? 'animated' : 'hide'),
			container = this._container = L.DomUtil.create('div', containerClass),
			closeButton;

		if (this.options.closeButton) {
			closeButton = this._closeButton =
			        L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';
			L.DomEvent.disableClickPropagation(closeButton);

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper =
		        L.DomUtil.create('div', prefix + '-content-wrapper', container);
		L.DomEvent.disableClickPropagation(wrapper);

		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent.disableScrollPropagation(this._contentNode);
		L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_updateContent: function () {
		if (!this._content) { return; }

		if (typeof this._content === 'string') {
			this._contentNode.innerHTML = this._content;
		} else {
			while (this._contentNode.hasChildNodes()) {
				this._contentNode.removeChild(this._contentNode.firstChild);
			}
			this._contentNode.appendChild(this._content);
		}
		this.fire('contentupdate');
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'leaflet-popup-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			L.DomUtil.addClass(container, scrolledClass);
		} else {
			L.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng),
		    animated = this._animated,
		    offset = L.point(this.options.offset);

		if (animated) {
			L.DomUtil.setPosition(this._container, pos);
		}

		this._containerBottom = -offset.y - (animated ? 0 : pos.y);
		this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);

		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = this._containerBottom + 'px';
		this._container.style.left = this._containerLeft + 'px';
	},

	_zoomAnimation: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);

		L.DomUtil.setPosition(this._container, pos);
	},

	_adjustPan: function () {
		if (!this.options.autoPan) { return; }

		var map = this._map,
		    containerHeight = this._container.offsetHeight,
		    containerWidth = this._containerWidth,

		    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

		if (this._animated) {
			layerPos._add(L.DomUtil.getPosition(this._container));
		}

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
		}
		if (containerPos.x - dx - paddingTL.x < 0) { // left
			dx = containerPos.x - paddingTL.x;
		}
		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
		}
		if (containerPos.y - dy - paddingTL.y < 0) { // top
			dy = containerPos.y - paddingTL.y;
		}

		if (dx || dy) {
			map
			    .fire('autopanstart')
			    .panBy([dx, dy]);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	}
});

L.popup = function (options, source) {
	return new L.Popup(options, source);
};


L.Map.include({
	openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
		this.closePopup();

		if (!(popup instanceof L.Popup)) {
			var content = popup;

			popup = new L.Popup(options)
			    .setLatLng(latlng)
			    .setContent(content);
		}
		popup._isOpen = true;

		this._popup = popup;
		return this.addLayer(popup);
	},

	closePopup: function (popup) {
		if (!popup || popup === this._popup) {
			popup = this._popup;
			this._popup = null;
		}
		if (popup) {
			this.removeLayer(popup);
			popup._isOpen = false;
		}
		return this;
	}
});


/*
 * Popup extension to L.Marker, adding popup-related methods.
 */

L.Marker.include({
	openPopup: function () {
		if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
			this._popup.setLatLng(this._latlng);
			this._map.openPopup(this._popup);
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	togglePopup: function () {
		if (this._popup) {
			if (this._popup._isOpen) {
				this.closePopup();
			} else {
				this.openPopup();
			}
		}
		return this;
	},

	bindPopup: function (content, options) {
		var anchor = L.point(this.options.icon.options.popupAnchor || [0, 0]);

		anchor = anchor.add(L.Popup.prototype.options.offset);

		if (options && options.offset) {
			anchor = anchor.add(options.offset);
		}

		options = L.extend({offset: anchor}, options);

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this.togglePopup, this)
			    .on('remove', this.closePopup, this)
			    .on('move', this._movePopup, this);
			this._popupHandlersAdded = true;
		}

		if (content instanceof L.Popup) {
			L.setOptions(content, options);
			this._popup = content;
		} else {
			this._popup = new L.Popup(options, this)
				.setContent(content);
		}

		return this;
	},

	setPopupContent: function (content) {
		if (this._popup) {
			this._popup.setContent(content);
		}
		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this.togglePopup, this)
			    .off('remove', this.closePopup, this)
			    .off('move', this._movePopup, this);
			this._popupHandlersAdded = false;
		}
		return this;
	},

	getPopup: function () {
		return this._popup;
	},

	_movePopup: function (e) {
		this._popup.setLatLng(e.latlng);
	}
});


/*
 * L.LayerGroup is a class to combine several layers into one so that
 * you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.LayerGroup = L.Class.extend({
	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	hasLayer: function (layer) {
		if (!layer) { return false; }

		return (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	clearLayers: function () {
		this.eachLayer(this.removeLayer, this);
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		this._map = map;
		this.eachLayer(map.addLayer, map);
	},

	onRemove: function (map) {
		this.eachLayer(map.removeLayer, map);
		this._map = null;
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	getLayer: function (id) {
		return this._layers[id];
	},

	getLayers: function () {
		var layers = [];

		for (var i in this._layers) {
			layers.push(this._layers[i]);
		}
		return layers;
	},

	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	getLayerId: function (layer) {
		return L.stamp(layer);
	}
});

L.layerGroup = function (layers) {
	return new L.LayerGroup(layers);
};


/*
 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and additional methods
 * shared between a group of interactive layers (like vectors or markers).
 */

L.FeatureGroup = L.LayerGroup.extend({
	includes: L.Mixin.Events,

	statics: {
		EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
	},

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		if ('on' in layer) {
			layer.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
		}

		L.LayerGroup.prototype.addLayer.call(this, layer);

		if (this._popupContent && layer.bindPopup) {
			layer.bindPopup(this._popupContent, this._popupOptions);
		}

		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		layer.off(L.FeatureGroup.EVENTS, this._propagateEvent, this);

		L.LayerGroup.prototype.removeLayer.call(this, layer);

		if (this._popupContent) {
			this.invoke('unbindPopup');
		}

		return this.fire('layerremove', {layer: layer});
	},

	bindPopup: function (content, options) {
		this._popupContent = content;
		this._popupOptions = options;
		return this.invoke('bindPopup', content, options);
	},

	openPopup: function (latlng) {
		// open popup on the first layer
		for (var id in this._layers) {
			this._layers[id].openPopup(latlng);
			break;
		}
		return this;
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();

		this.eachLayer(function (layer) {
			bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
		});

		return bounds;
	},

	_propagateEvent: function (e) {
		e = L.extend({
			layer: e.target,
			target: this
		}, e);
		this.fire(e.type, e);
	}
});

L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};


/*
 * L.Path is a base class for rendering vector paths on a map. Inherited by Polyline, Circle, etc.
 */

L.Path = L.Class.extend({
	includes: [L.Mixin.Events],

	statics: {
		// how much to extend the clip area around the map view
		// (relative to its size, e.g. 0.5 is half the screen in each direction)
		// set it so that SVG element doesn't exceed 1280px (vectors flicker on dragend if it is)
		CLIP_PADDING: (function () {
			var max = L.Browser.mobile ? 1280 : 2000,
			    target = (max / Math.max(window.outerWidth, window.outerHeight) - 1) / 2;
			return Math.max(0, Math.min(0.5, target));
		})()
	},

	options: {
		stroke: true,
		color: '#0033ff',
		dashArray: null,
		lineCap: null,
		lineJoin: null,
		weight: 5,
		opacity: 0.5,

		fill: false,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,

		clickable: true
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initElements();
			this._initEvents();
		}

		this.projectLatlngs();
		this._updatePath();

		if (this._container) {
			this._map._pathRoot.appendChild(this._container);
		}

		this.fire('add');

		map.on({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		map._pathRoot.removeChild(this._container);

		// Need to fire remove event before we set _map to null as the event hooks might need the object
		this.fire('remove');
		this._map = null;

		if (L.Browser.vml) {
			this._container = null;
			this._stroke = null;
			this._fill = null;
		}

		map.off({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	projectLatlngs: function () {
		// do all projection stuff here
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._container) {
			this._updateStyle();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._updatePath();
		}
		return this;
	}
});

L.Map.include({
	_updatePathViewport: function () {
		var p = L.Path.CLIP_PADDING,
		    size = this.getSize(),
		    panePos = L.DomUtil.getPosition(this._mapPane),
		    min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
		    max = min.add(size.multiplyBy(1 + p * 2)._round());

		this._pathViewport = new L.Bounds(min, max);
	}
});


/*
 * Extends L.Path with SVG-specific rendering code.
 */

L.Path.SVG_NS = 'http://www.w3.org/2000/svg';

L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);

L.Path = L.Path.extend({
	statics: {
		SVG: L.Browser.svg
	},

	bringToFront: function () {
		var root = this._map._pathRoot,
		    path = this._container;

		if (path && root.lastChild !== path) {
			root.appendChild(path);
		}
		return this;
	},

	bringToBack: function () {
		var root = this._map._pathRoot,
		    path = this._container,
		    first = root.firstChild;

		if (path && first !== path) {
			root.insertBefore(path, first);
		}
		return this;
	},

	getPathString: function () {
		// form path string here
	},

	_createElement: function (name) {
		return document.createElementNS(L.Path.SVG_NS, name);
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._initPath();
		this._initStyle();
	},

	_initPath: function () {
		this._container = this._createElement('g');

		this._path = this._createElement('path');

		if (this.options.className) {
			L.DomUtil.addClass(this._path, this.options.className);
		}

		this._container.appendChild(this._path);
	},

	_initStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke-linejoin', 'round');
			this._path.setAttribute('stroke-linecap', 'round');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill-rule', 'evenodd');
		}
		if (this.options.pointerEvents) {
			this._path.setAttribute('pointer-events', this.options.pointerEvents);
		}
		if (!this.options.clickable && !this.options.pointerEvents) {
			this._path.setAttribute('pointer-events', 'none');
		}
		this._updateStyle();
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke', this.options.color);
			this._path.setAttribute('stroke-opacity', this.options.opacity);
			this._path.setAttribute('stroke-width', this.options.weight);
			if (this.options.dashArray) {
				this._path.setAttribute('stroke-dasharray', this.options.dashArray);
			} else {
				this._path.removeAttribute('stroke-dasharray');
			}
			if (this.options.lineCap) {
				this._path.setAttribute('stroke-linecap', this.options.lineCap);
			}
			if (this.options.lineJoin) {
				this._path.setAttribute('stroke-linejoin', this.options.lineJoin);
			}
		} else {
			this._path.setAttribute('stroke', 'none');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill', this.options.fillColor || this.options.color);
			this._path.setAttribute('fill-opacity', this.options.fillOpacity);
		} else {
			this._path.setAttribute('fill', 'none');
		}
	},

	_updatePath: function () {
		var str = this.getPathString();
		if (!str) {
			// fix webkit empty string parsing bug
			str = 'M0 0';
		}
		this._path.setAttribute('d', str);
	},

	// TODO remove duplication with L.Map
	_initEvents: function () {
		if (this.options.clickable) {
			if (L.Browser.svg || !L.Browser.vml) {
				L.DomUtil.addClass(this._path, 'leaflet-clickable');
			}

			L.DomEvent.on(this._container, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseover',
			              'mouseout', 'mousemove', 'contextmenu'];
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
			}
		}
	},

	_onMouseClick: function (e) {
		if (this._map.dragging && this._map.dragging.moved()) { return; }

		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this.hasEventListeners(e.type)) { return; }

		var map = this._map,
		    containerPoint = map.mouseEventToContainerPoint(e),
		    layerPoint = map.containerPointToLayerPoint(containerPoint),
		    latlng = map.layerPointToLatLng(layerPoint);

		this.fire(e.type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});

		if (e.type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousemove') {
			L.DomEvent.stopPropagation(e);
		}
	}
});

L.Map.include({
	_initPathRoot: function () {
		if (!this._pathRoot) {
			this._pathRoot = L.Path.prototype._createElement('svg');
			this._panes.overlayPane.appendChild(this._pathRoot);

			if (this.options.zoomAnimation && L.Browser.any3d) {
				L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');

				this.on({
					'zoomanim': this._animatePathZoom,
					'zoomend': this._endPathZoom
				});
			} else {
				L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide');
			}

			this.on('moveend', this._updateSvgViewport);
			this._updateSvgViewport();
		}
	},

	_animatePathZoom: function (e) {
		var scale = this.getZoomScale(e.zoom),
		    offset = this._getCenterOffset(e.center)._multiplyBy(-scale)._add(this._pathViewport.min);

		this._pathRoot.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ') ';

		this._pathZooming = true;
	},

	_endPathZoom: function () {
		this._pathZooming = false;
	},

	_updateSvgViewport: function () {

		if (this._pathZooming) {
			// Do not update SVGs while a zoom animation is going on otherwise the animation will break.
			// When the zoom animation ends we will be updated again anyway
			// This fixes the case where you do a momentum move and zoom while the move is still ongoing.
			return;
		}

		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    max = vp.max,
		    width = max.x - min.x,
		    height = max.y - min.y,
		    root = this._pathRoot,
		    pane = this._panes.overlayPane;

		// Hack to make flicker on drag end on mobile webkit less irritating
		if (L.Browser.mobileWebkit) {
			pane.removeChild(root);
		}

		L.DomUtil.setPosition(root, min);
		root.setAttribute('width', width);
		root.setAttribute('height', height);
		root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

		if (L.Browser.mobileWebkit) {
			pane.appendChild(root);
		}
	}
});


/*
 * Popup extension to L.Path (polylines, polygons, circles), adding popup-related methods.
 */

L.Path.include({

	bindPopup: function (content, options) {

		if (content instanceof L.Popup) {
			this._popup = content;
		} else {
			if (!this._popup || options) {
				this._popup = new L.Popup(options, this);
			}
			this._popup.setContent(content);
		}

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this._openPopup, this)
			    .on('remove', this.closePopup, this);

			this._popupHandlersAdded = true;
		}

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this._openPopup)
			    .off('remove', this.closePopup);

			this._popupHandlersAdded = false;
		}
		return this;
	},

	openPopup: function (latlng) {

		if (this._popup) {
			// open the popup from one of the path's points if not specified
			latlng = latlng || this._latlng ||
			         this._latlngs[Math.floor(this._latlngs.length / 2)];

			this._openPopup({latlng: latlng});
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	_openPopup: function (e) {
		this._popup.setLatLng(e.latlng);
		this._map.openPopup(this._popup);
	}
});


/*
 * Vector rendering for IE6-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

L.Browser.vml = !L.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
	statics: {
		VML: true,
		CLIP_PADDING: 0.02
	},

	_createElement: (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement(
				        '<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	}()),

	_initPath: function () {
		var container = this._container = this._createElement('shape');

		L.DomUtil.addClass(container, 'leaflet-vml-shape' +
			(this.options.className ? ' ' + this.options.className : ''));

		if (this.options.clickable) {
			L.DomUtil.addClass(container, 'leaflet-clickable');
		}

		container.coordsize = '1 1';

		this._path = this._createElement('path');
		container.appendChild(this._path);

		this._map._pathRoot.appendChild(container);
	},

	_initStyle: function () {
		this._updateStyle();
	},

	_updateStyle: function () {
		var stroke = this._stroke,
		    fill = this._fill,
		    options = this.options,
		    container = this._container;

		container.stroked = options.stroke;
		container.filled = options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = this._stroke = this._createElement('stroke');
				stroke.endcap = 'round';
				container.appendChild(stroke);
			}
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;

			if (options.dashArray) {
				stroke.dashStyle = L.Util.isArray(options.dashArray) ?
				    options.dashArray.join(' ') :
				    options.dashArray.replace(/( *, *)/g, ' ');
			} else {
				stroke.dashStyle = '';
			}
			if (options.lineCap) {
				stroke.endcap = options.lineCap.replace('butt', 'flat');
			}
			if (options.lineJoin) {
				stroke.joinstyle = options.lineJoin;
			}

		} else if (stroke) {
			container.removeChild(stroke);
			this._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = this._fill = this._createElement('fill');
				container.appendChild(fill);
			}
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;

		} else if (fill) {
			container.removeChild(fill);
			this._fill = null;
		}
	},

	_updatePath: function () {
		var style = this._container.style;

		style.display = 'none';
		this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
		style.display = '';
	}
});

L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
	_initPathRoot: function () {
		if (this._pathRoot) { return; }

		var root = this._pathRoot = document.createElement('div');
		root.className = 'leaflet-vml-container';
		this._panes.overlayPane.appendChild(root);

		this.on('moveend', this._updatePathViewport);
		this._updatePathViewport();
	}
});


/*
 * Vector rendering for all browsers that support canvas.
 */

L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
	statics: {
		//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
		CANVAS: true,
		SVG: false
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._requestUpdate();
		}
		return this;
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._map) {
			this._updateStyle();
			this._requestUpdate();
		}
		return this;
	},

	onRemove: function (map) {
		map
		    .off('viewreset', this.projectLatlngs, this)
		    .off('moveend', this._updatePath, this);

		if (this.options.clickable) {
			this._map.off('click', this._onClick, this);
			this._map.off('mousemove', this._onMouseMove, this);
		}

		this._requestUpdate();

		this._map = null;
	},

	_requestUpdate: function () {
		if (this._map && !L.Path._updateRequest) {
			L.Path._updateRequest = L.Util.requestAnimFrame(this._fireMapMoveEnd, this._map);
		}
	},

	_fireMapMoveEnd: function () {
		L.Path._updateRequest = null;
		this.fire('moveend');
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._ctx = this._map._canvasCtx;
	},

	_updateStyle: function () {
		var options = this.options;

		if (options.stroke) {
			this._ctx.lineWidth = options.weight;
			this._ctx.strokeStyle = options.color;
		}
		if (options.fill) {
			this._ctx.fillStyle = options.fillColor || options.color;
		}
	},

	_drawPath: function () {
		var i, j, len, len2, point, drawMethod;

		this._ctx.beginPath();

		for (i = 0, len = this._parts.length; i < len; i++) {
			for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
				point = this._parts[i][j];
				drawMethod = (j === 0 ? 'move' : 'line') + 'To';

				this._ctx[drawMethod](point.x, point.y);
			}
			// TODO refactor ugly hack
			if (this instanceof L.Polygon) {
				this._ctx.closePath();
			}
		}
	},

	_checkIfEmpty: function () {
		return !this._parts.length;
	},

	_updatePath: function () {
		if (this._checkIfEmpty()) { return; }

		var ctx = this._ctx,
		    options = this.options;

		this._drawPath();
		ctx.save();
		this._updateStyle();

		if (options.fill) {
			ctx.globalAlpha = options.fillOpacity;
			ctx.fill();
		}

		if (options.stroke) {
			ctx.globalAlpha = options.opacity;
			ctx.stroke();
		}

		ctx.restore();

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_initEvents: function () {
		if (this.options.clickable) {
			// TODO dblclick
			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click', this._onClick, this);
		}
	},

	_onClick: function (e) {
		if (this._containsPoint(e.layerPoint)) {
			this.fire('click', e);
		}
	},

	_onMouseMove: function (e) {
		if (!this._map || this._map._animatingZoom) { return; }

		// TODO don't do on each move
		if (this._containsPoint(e.layerPoint)) {
			this._ctx.canvas.style.cursor = 'pointer';
			this._mouseInside = true;
			this.fire('mouseover', e);

		} else if (this._mouseInside) {
			this._ctx.canvas.style.cursor = '';
			this._mouseInside = false;
			this.fire('mouseout', e);
		}
	}
});

L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
	_initPathRoot: function () {
		var root = this._pathRoot,
		    ctx;

		if (!root) {
			root = this._pathRoot = document.createElement('canvas');
			root.style.position = 'absolute';
			ctx = this._canvasCtx = root.getContext('2d');

			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			this._panes.overlayPane.appendChild(root);

			if (this.options.zoomAnimation) {
				this._pathRoot.className = 'leaflet-zoom-animated';
				this.on('zoomanim', this._animatePathZoom);
				this.on('zoomend', this._endPathZoom);
			}
			this.on('moveend', this._updateCanvasViewport);
			this._updateCanvasViewport();
		}
	},

	_updateCanvasViewport: function () {
		// don't redraw while zooming. See _updateSvgViewport for more details
		if (this._pathZooming) { return; }
		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    size = vp.max.subtract(min),
		    root = this._pathRoot;

		//TODO check if this works properly on mobile webkit
		L.DomUtil.setPosition(root, min);
		root.width = size.x;
		root.height = size.y;
		root.getContext('2d').translate(-min.x, -min.y);
	}
});


/*
 * L.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

/*jshint bitwise:false */ // allow bitwise operations for this file

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode) {
		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			// if a,b is outside the clip window (trivial reject)
			} else if (codeA & codeB) {
				return false;
			// other cases
			} else {
				codeOut = codeA || codeB;
				p = this._getEdgeIntersection(a, b, codeOut, bounds);
				newCode = this._getBitCode(p, bounds);

				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max;

		if (code & 8) { // top
			return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
		} else if (code & 4) { // bottom
			return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
		} else if (code & 2) { // right
			return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
		} else if (code & 1) { // left
			return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
		}
	},

	_getBitCode: function (/*Point*/ p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}
		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};


/*
 * L.Polyline is used to display polylines on a map.
 */

L.Polyline = L.Path.extend({
	initialize: function (latlngs, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlngs = this._convertLatLngs(latlngs);
	},

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0,
		noClip: false
	},

	projectLatlngs: function () {
		this._originalPoints = [];

		for (var i = 0, len = this._latlngs.length; i < len; i++) {
			this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
		}
	},

	getPathString: function () {
		for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
			str += this._getPathPartStr(this._parts[i]);
		}
		return str;
	},

	getLatLngs: function () {
		return this._latlngs;
	},

	setLatLngs: function (latlngs) {
		this._latlngs = this._convertLatLngs(latlngs);
		return this.redraw();
	},

	addLatLng: function (latlng) {
		this._latlngs.push(L.latLng(latlng));
		return this.redraw();
	},

	spliceLatLngs: function () { // (Number index, Number howMany)
		var removed = [].splice.apply(this._latlngs, arguments);
		this._convertLatLngs(this._latlngs, true);
		this.redraw();
		return removed;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;

		for (var j = 0, jLen = parts.length; j < jLen; j++) {
			var points = parts[j];
			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];
				var sqDist = L.LineUtil._sqClosestPointOnSegment(p, p1, p2, true);
				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getBounds: function () {
		return new L.LatLngBounds(this.getLatLngs());
	},

	_convertLatLngs: function (latlngs, overwrite) {
		var i, len, target = overwrite ? latlngs : [];

		for (i = 0, len = latlngs.length; i < len; i++) {
			if (L.Util.isArray(latlngs[i]) && typeof latlngs[i][0] !== 'number') {
				return;
			}
			target[i] = L.latLng(latlngs[i]);
		}
		return target;
	},

	_initEvents: function () {
		L.Path.prototype._initEvents.call(this);
	},

	_getPathPartStr: function (points) {
		var round = L.Path.VML;

		for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
			p = points[j];
			if (round) {
				p._round();
			}
			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
		}
		return str;
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    len = points.length,
		    i, k, segment;

		if (this.options.noClip) {
			this._parts = [points];
			return;
		}

		this._parts = [];

		var parts = this._parts,
		    vp = this._map._pathViewport,
		    lu = L.LineUtil;

		for (i = 0, k = 0; i < len - 1; i++) {
			segment = lu.clipSegment(points[i], points[i + 1], vp, i);
			if (!segment) {
				continue;
			}

			parts[k] = parts[k] || [];
			parts[k].push(segment[0]);

			// if segment goes out of screen, or it's the last one, it's the end of the line part
			if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
				parts[k].push(segment[1]);
				k++;
			}
		}
	},

	// simplify each clipped part of the polyline
	_simplifyPoints: function () {
		var parts = this._parts,
		    lu = L.LineUtil;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
		}
	},

	_updatePath: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();

		L.Path.prototype._updatePath.call(this);
	}
});

L.polyline = function (latlngs, options) {
	return new L.Polyline(latlngs, options);
};


/*
 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
 */

/*jshint bitwise:false */ // allow bitwise operations here

L.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
L.PolyUtil.clipPolygon = function (points, bounds) {
	var clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};


/*
 * L.Polygon is used to display polygons on a map.
 */

L.Polygon = L.Polyline.extend({
	options: {
		fill: true
	},

	initialize: function (latlngs, options) {
		L.Polyline.prototype.initialize.call(this, latlngs, options);
		this._initWithHoles(latlngs);
	},

	_initWithHoles: function (latlngs) {
		var i, len, hole;
		if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
			this._latlngs = this._convertLatLngs(latlngs[0]);
			this._holes = latlngs.slice(1);

			for (i = 0, len = this._holes.length; i < len; i++) {
				hole = this._holes[i] = this._convertLatLngs(this._holes[i]);
				if (hole[0].equals(hole[hole.length - 1])) {
					hole.pop();
				}
			}
		}

		// filter out last point if its equal to the first one
		latlngs = this._latlngs;

		if (latlngs.length >= 2 && latlngs[0].equals(latlngs[latlngs.length - 1])) {
			latlngs.pop();
		}
	},

	projectLatlngs: function () {
		L.Polyline.prototype.projectLatlngs.call(this);

		// project polygon holes points
		// TODO move this logic to Polyline to get rid of duplication
		this._holePoints = [];

		if (!this._holes) { return; }

		var i, j, len, len2;

		for (i = 0, len = this._holes.length; i < len; i++) {
			this._holePoints[i] = [];

			for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
				this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
			}
		}
	},

	setLatLngs: function (latlngs) {
		if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
			this._initWithHoles(latlngs);
			return this.redraw();
		} else {
			return L.Polyline.prototype.setLatLngs.call(this, latlngs);
		}
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    newParts = [];

		this._parts = [points].concat(this._holePoints);

		if (this.options.noClip) { return; }

		for (var i = 0, len = this._parts.length; i < len; i++) {
			var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
			if (clipped.length) {
				newParts.push(clipped);
			}
		}

		this._parts = newParts;
	},

	_getPathPartStr: function (points) {
		var str = L.Polyline.prototype._getPathPartStr.call(this, points);
		return str + (L.Browser.svg ? 'z' : 'x');
	}
});

L.polygon = function (latlngs, options) {
	return new L.Polygon(latlngs, options);
};


/*
 * Contains L.MultiPolyline and L.MultiPolygon layers.
 */

(function () {
	function createMulti(Klass) {

		return L.FeatureGroup.extend({

			initialize: function (latlngs, options) {
				this._layers = {};
				this._options = options;
				this.setLatLngs(latlngs);
			},

			setLatLngs: function (latlngs) {
				var i = 0,
				    len = latlngs.length;

				this.eachLayer(function (layer) {
					if (i < len) {
						layer.setLatLngs(latlngs[i++]);
					} else {
						this.removeLayer(layer);
					}
				}, this);

				while (i < len) {
					this.addLayer(new Klass(latlngs[i++], this._options));
				}

				return this;
			},

			getLatLngs: function () {
				var latlngs = [];

				this.eachLayer(function (layer) {
					latlngs.push(layer.getLatLngs());
				});

				return latlngs;
			}
		});
	}

	L.MultiPolyline = createMulti(L.Polyline);
	L.MultiPolygon = createMulti(L.Polygon);

	L.multiPolyline = function (latlngs, options) {
		return new L.MultiPolyline(latlngs, options);
	};

	L.multiPolygon = function (latlngs, options) {
		return new L.MultiPolygon(latlngs, options);
	};
}());


/*
 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
 */

L.Rectangle = L.Polygon.extend({
	initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	},

	setBounds: function (latLngBounds) {
		this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	},

	_boundsToLatLngs: function (latLngBounds) {
		latLngBounds = L.latLngBounds(latLngBounds);
		return [
			latLngBounds.getSouthWest(),
			latLngBounds.getNorthWest(),
			latLngBounds.getNorthEast(),
			latLngBounds.getSouthEast()
		];
	}
});

L.rectangle = function (latLngBounds, options) {
	return new L.Rectangle(latLngBounds, options);
};


/*
 * L.Circle is a circle overlay (with a certain radius in meters).
 */

L.Circle = L.Path.extend({
	initialize: function (latlng, radius, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = L.latLng(latlng);
		this._mRadius = radius;
	},

	options: {
		fill: true
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		return this.redraw();
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	projectLatlngs: function () {
		var lngRadius = this._getLngRadius(),
		    latlng = this._latlng,
		    pointLeft = this._map.latLngToLayerPoint([latlng.lat, latlng.lng - lngRadius]);
		this._point = this._map.latLngToLayerPoint(latlng);
		this._radius = Math.max(this._point.x - pointLeft.x, 1);
	},

	getBounds: function () {
		var lngRadius = this._getLngRadius(),
		    latRadius = (this._mRadius / 40075017) * 360,
		    latlng = this._latlng;

		return new L.LatLngBounds(
		        [latlng.lat - latRadius, latlng.lng - lngRadius],
		        [latlng.lat + latRadius, latlng.lng + lngRadius]);
	},

	getLatLng: function () {
		return this._latlng;
	},

	getPathString: function () {
		var p = this._point,
		    r = this._radius;

		if (this._checkIfEmpty()) {
			return '';
		}

		if (L.Browser.svg) {
			return 'M' + p.x + ',' + (p.y - r) +
			       'A' + r + ',' + r + ',0,1,1,' +
			       (p.x - 0.1) + ',' + (p.y - r) + ' z';
		} else {
			p._round();
			r = Math.round(r);
			return 'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r + ' 0,' + (65535 * 360);
		}
	},

	getRadius: function () {
		return this._mRadius;
	},

	// TODO Earth hardcoded, move into projection code!

	_getLatRadius: function () {
		return (this._mRadius / 40075017) * 360;
	},

	_getLngRadius: function () {
		return this._getLatRadius() / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
	},

	_checkIfEmpty: function () {
		if (!this._map) {
			return false;
		}
		var vp = this._map._pathViewport,
		    r = this._radius,
		    p = this._point;

		return p.x - r > vp.max.x || p.y - r > vp.max.y ||
		       p.x + r < vp.min.x || p.y + r < vp.min.y;
	}
});

L.circle = function (latlng, radius, options) {
	return new L.Circle(latlng, radius, options);
};


/*
 * L.CircleMarker is a circle overlay with a permanent pixel radius.
 */

L.CircleMarker = L.Circle.extend({
	options: {
		radius: 10,
		weight: 2
	},

	initialize: function (latlng, options) {
		L.Circle.prototype.initialize.call(this, latlng, null, options);
		this._radius = this.options.radius;
	},

	projectLatlngs: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
	},

	_updateStyle : function () {
		L.Circle.prototype._updateStyle.call(this);
		this.setRadius(this.options.radius);
	},

	setLatLng: function (latlng) {
		L.Circle.prototype.setLatLng.call(this, latlng);
		if (this._popup && this._popup._isOpen) {
			this._popup.setLatLng(latlng);
		}
		return this;
	},

	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._radius;
	}
});

L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};


/*
 * Extends L.Polyline to be able to manually detect clicks on Canvas-rendered polylines.
 */

L.Polyline.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p, closed) {
		var i, j, k, len, len2, dist, part,
		    w = this.options.weight / 2;

		if (L.Browser.touch) {
			w += 10; // polyline click tolerance on touch devices
		}

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];
			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				if (!closed && (j === 0)) {
					continue;
				}

				dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

				if (dist <= w) {
					return true;
				}
			}
		}
		return false;
	}
});


/*
 * Extends L.Polygon to be able to manually detect clicks on Canvas-rendered polygons.
 */

L.Polygon.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p) {
		var inside = false,
		    part, p1, p2,
		    i, j, k,
		    len, len2;

		// TODO optimization: check if within bounds first

		if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
			// click on polygon border
			return true;
		}

		// ray casting algorithm for detecting if point is in polygon

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];

			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				p1 = part[j];
				p2 = part[k];

				if (((p1.y > p.y) !== (p2.y > p.y)) &&
						(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
					inside = !inside;
				}
			}
		}

		return inside;
	}
});


/*
 * Extends L.Circle with Canvas-specific code.
 */

L.Circle.include(!L.Path.CANVAS ? {} : {
	_drawPath: function () {
		var p = this._point;
		this._ctx.beginPath();
		this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2, false);
	},

	_containsPoint: function (p) {
		var center = this._point,
		    w2 = this.options.stroke ? this.options.weight / 2 : 0;

		return (p.distanceTo(center) <= this._radius + w2);
	}
});


/*
 * CircleMarker canvas specific drawing parts.
 */

L.CircleMarker.include(!L.Path.CANVAS ? {} : {
	_updateStyle: function () {
		L.Path.prototype._updateStyle.call(this);
	}
});


/*
 * L.GeoJSON turns any GeoJSON data into a Leaflet layer.
 */

L.GeoJSON = L.FeatureGroup.extend({

	initialize: function (geojson, options) {
		L.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	addData: function (geojson) {
		var features = L.Util.isArray(geojson) ? geojson : geojson.features,
		    i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// Only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(features[i]);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return; }

		var layer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer, options.coordsToLatLng, options);
		layer.feature = L.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	resetStyle: function (layer) {
		var style = this.options.style;
		if (style) {
			// reset any custom styles
			L.Util.extend(layer.options, layer.defaultOptions);

			this._setLayerStyle(layer, style);
		}
	},

	setStyle: function (style) {
		this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

L.extend(L.GeoJSON, {
	geometryToLayer: function (geojson, pointToLayer, coordsToLatLng, vectorOptions) {
		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry.coordinates,
		    layers = [],
		    latlng, latlngs, i, len;

		coordsToLatLng = coordsToLatLng || this.coordsToLatLng;

		switch (geometry.type) {
		case 'Point':
			latlng = coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = coordsToLatLng(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
			latlngs = this.coordsToLatLngs(coords, 0, coordsToLatLng);
			return new L.Polyline(latlngs, vectorOptions);

		case 'Polygon':
			if (coords.length === 2 && !coords[1].length) {
				throw new Error('Invalid GeoJSON object.');
			}
			latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
			return new L.Polygon(latlngs, vectorOptions);

		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
			return new L.MultiPolyline(latlngs, vectorOptions);

		case 'MultiPolygon':
			latlngs = this.coordsToLatLngs(coords, 2, coordsToLatLng);
			return new L.MultiPolygon(latlngs, vectorOptions);

		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {

				layers.push(this.geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, pointToLayer, coordsToLatLng, vectorOptions));
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToLatLng: function (coords) { // (Array[, Boolean]) -> LatLng
		return new L.LatLng(coords[1], coords[0], coords[2]);
	},

	coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) { // (Array[, Number, Function]) -> Array
		var latlng, i, len,
		    latlngs = [];

		for (i = 0, len = coords.length; i < len; i++) {
			latlng = levelsDeep ?
			        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
			        (coordsToLatLng || this.coordsToLatLng)(coords[i]);

			latlngs.push(latlng);
		}

		return latlngs;
	},

	latLngToCoords: function (latlng) {
		var coords = [latlng.lng, latlng.lat];

		if (latlng.alt !== undefined) {
			coords.push(latlng.alt);
		}
		return coords;
	},

	latLngsToCoords: function (latLngs) {
		var coords = [];

		for (var i = 0, len = latLngs.length; i < len; i++) {
			coords.push(L.GeoJSON.latLngToCoords(latLngs[i]));
		}

		return coords;
	},

	getFeature: function (layer, newGeometry) {
		return layer.feature ? L.extend({}, layer.feature, {geometry: newGeometry}) : L.GeoJSON.asFeature(newGeometry);
	},

	asFeature: function (geoJSON) {
		if (geoJSON.type === 'Feature') {
			return geoJSON;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: geoJSON
		};
	}
});

var PointToGeoJSON = {
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	}
};

L.Marker.include(PointToGeoJSON);
L.Circle.include(PointToGeoJSON);
L.CircleMarker.include(PointToGeoJSON);

L.Polyline.include({
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'LineString',
			coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs())
		});
	}
});

L.Polygon.include({
	toGeoJSON: function () {
		var coords = [L.GeoJSON.latLngsToCoords(this.getLatLngs())],
		    i, len, hole;

		coords[0].push(coords[0][0]);

		if (this._holes) {
			for (i = 0, len = this._holes.length; i < len; i++) {
				hole = L.GeoJSON.latLngsToCoords(this._holes[i]);
				hole.push(hole[0]);
				coords.push(hole);
			}
		}

		return L.GeoJSON.getFeature(this, {
			type: 'Polygon',
			coordinates: coords
		});
	}
});

(function () {
	function multiToGeoJSON(type) {
		return function () {
			var coords = [];

			this.eachLayer(function (layer) {
				coords.push(layer.toGeoJSON().geometry.coordinates);
			});

			return L.GeoJSON.getFeature(this, {
				type: type,
				coordinates: coords
			});
		};
	}

	L.MultiPolyline.include({toGeoJSON: multiToGeoJSON('MultiLineString')});
	L.MultiPolygon.include({toGeoJSON: multiToGeoJSON('MultiPolygon')});

	L.LayerGroup.include({
		toGeoJSON: function () {

			var geometry = this.feature && this.feature.geometry,
				jsons = [],
				json;

			if (geometry && geometry.type === 'MultiPoint') {
				return multiToGeoJSON('MultiPoint').call(this);
			}

			var isGeometryCollection = geometry && geometry.type === 'GeometryCollection';

			this.eachLayer(function (layer) {
				if (layer.toGeoJSON) {
					json = layer.toGeoJSON();
					jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
				}
			});

			if (isGeometryCollection) {
				return L.GeoJSON.getFeature(this, {
					geometries: jsons,
					type: 'GeometryCollection'
				});
			}

			return {
				type: 'FeatureCollection',
				features: jsons
			};
		}
	});
}());

L.geoJson = function (geojson, options) {
	return new L.GeoJSON(geojson, options);
};


/*
 * L.DomEvent contains functions for working with DOM events.
 */

L.DomEvent = {
	/* inspired by John Resig, Dean Edwards and YUI addEvent implementations */
	addListener: function (obj, type, fn, context) { // (HTMLElement, String, Function[, Object])

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler, originalHandler, newType;

		if (obj[key]) { return this; }

		handler = function (e) {
			return fn.call(context || obj, e || L.DomEvent._getEvent());
		};

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			return this.addPointerListener(obj, type, handler, id);
		}
		if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);
		}

		if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {

				originalHandler = handler;
				newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');

				handler = function (e) {
					if (!L.DomEvent._checkMouse(obj, e)) { return; }
					return originalHandler(e);
				};

				obj.addEventListener(newType, handler, false);

			} else if (type === 'click' && L.Browser.android) {
				originalHandler = handler;
				handler = function (e) {
					return L.DomEvent._filterClick(e, originalHandler);
				};

				obj.addEventListener(type, handler, false);
			} else {
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}

		obj[key] = handler;

		return this;
	},

	removeListener: function (obj, type, fn) {  // (HTMLElement, String, Function)

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler = obj[key];

		if (!handler) { return this; }

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.removePointerListener(obj, type, id);
		} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
			} else {
				obj.removeEventListener(type, handler, false);
			}
		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}

		obj[key] = null;

		return this;
	},

	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		L.DomEvent._skipped(e);

		return this;
	},

	disableScrollPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		return L.DomEvent
			.on(el, 'mousewheel', stop)
			.on(el, 'MozMousePixelScroll', stop);
	},

	disableClickPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.on(el, L.Draggable.START[i], stop);
		}

		return L.DomEvent
			.on(el, 'click', L.DomEvent._fakeStop)
			.on(el, 'dblclick', stop);
	},

	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	stop: function (e) {
		return L.DomEvent
			.preventDefault(e)
			.stopPropagation(e);
	},

	getMousePosition: function (e, container) {
		if (!container) {
			return new L.Point(e.clientX, e.clientY);
		}

		var rect = container.getBoundingClientRect();

		return new L.Point(
			e.clientX - rect.left - container.clientLeft,
			e.clientY - rect.top - container.clientTop);
	},

	getWheelDelta: function (e) {

		var delta = 0;

		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	},

	_skipEvents: {},

	_fakeStop: function (e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
		L.DomEvent._skipEvents[e.type] = true;
	},

	_skipped: function (e) {
		var skipped = this._skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		this._skipEvents[e.type] = false;
		return skipped;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_checkMouse: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	_getEvent: function () { // evil magic for IE
		/*jshint noarg:false */
		var e = window.event;
		if (!e) {
			var caller = arguments.callee.caller;
			while (caller) {
				e = caller['arguments'][0];
				if (e && window.Event === e.constructor) {
					break;
				}
				caller = caller.caller;
			}
		}
		return e;
	},

	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	_filterClick: function (e, handler) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 1000ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events

		if ((elapsed && elapsed > 100 && elapsed < 1000) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return;
		}
		L.DomEvent._lastClick = timeStamp;

		return handler(e);
	}
};

L.DomEvent.on = L.DomEvent.addListener;
L.DomEvent.off = L.DomEvent.removeListener;


/*
 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

L.Draggable = L.Class.extend({
	includes: L.Mixin.Events,

	statics: {
		START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
		END: {
			mousedown: 'mouseup',
			touchstart: 'touchend',
			pointerdown: 'touchend',
			MSPointerDown: 'touchend'
		},
		MOVE: {
			mousedown: 'mousemove',
			touchstart: 'touchmove',
			pointerdown: 'touchmove',
			MSPointerDown: 'touchmove'
		}
	},

	initialize: function (element, dragStartTarget) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
	},

	enable: function () {
		if (this._enabled) { return; }

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.on(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
		}

		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) { return; }

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.off(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
		}

		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		this._moved = false;

		if (e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }

		L.DomEvent.stopPropagation(e);

		if (L.Draggable._disabled) { return; }

		L.DomUtil.disableImageDrag();
		L.DomUtil.disableTextSelection();

		if (this._moving) { return; }

		var first = e.touches ? e.touches[0] : e;

		this._startPoint = new L.Point(first.clientX, first.clientY);
		this._startPos = this._newPos = L.DomUtil.getPosition(this._element);

		L.DomEvent
		    .on(document, L.Draggable.MOVE[e.type], this._onMove, this)
		    .on(document, L.Draggable.END[e.type], this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    newPoint = new L.Point(first.clientX, first.clientY),
		    offset = newPoint.subtract(this._startPoint);

		if (!offset.x && !offset.y) { return; }

		L.DomEvent.preventDefault(e);

		if (!this._moved) {
			this.fire('dragstart');

			this._moved = true;
			this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

			L.DomUtil.addClass(document.body, 'leaflet-dragging');
			L.DomUtil.addClass((e.target || e.srcElement), 'leaflet-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
	},

	_updatePosition: function () {
		this.fire('predrag');
		L.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag');
	},

	_onUp: function (e) {
		L.DomUtil.removeClass(document.body, 'leaflet-dragging');
		L.DomUtil.removeClass((e.target || e.srcElement), 'leaflet-drag-target');

		for (var i in L.Draggable.MOVE) {
			L.DomEvent
			    .off(document, L.Draggable.MOVE[i], this._onMove)
			    .off(document, L.Draggable.END[i], this._onUp);
		}

		L.DomUtil.enableImageDrag();
		L.DomUtil.enableTextSelection();

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			L.Util.cancelAnimFrame(this._animRequest);

			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}

		this._moving = false;
	}
});


/*
	L.Handler is a base class for handler classes that are used internally to inject
	interaction features like dragging to classes like Map and Marker.
*/

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

	enabled: function () {
		return !!this._enabled;
	}
});


/*
 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
 */

L.Map.mergeOptions({
	dragging: true,

	inertia: !L.Browser.android23,
	inertiaDeceleration: 3400, // px/s^2
	inertiaMaxSpeed: Infinity, // px/s
	inertiaThreshold: L.Browser.touch ? 32 : 18, // ms
	easeLinearity: 0.25,

	// TODO refactor, move to CRS
	worldCopyJump: false
});

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new L.Draggable(map._mapPane, map._container);

			this._draggable.on({
				'dragstart': this._onDragStart,
				'drag': this._onDrag,
				'dragend': this._onDragEnd
			}, this);

			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDrag, this);
				map.on('viewreset', this._onViewReset, this);

				map.whenReady(this._onViewReset, this);
			}
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		var map = this._map;

		if (map._panAnim) {
			map._panAnim.stop();
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function () {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 200) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move')
		    .fire('drag');
	},

	_onViewReset: function () {
		// TODO fix hardcoded Earth values
		var pxCenter = this._map.getSize()._divideBy(2),
		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.project([0, 180]).x;
	},

	_onPreDrag: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function (e) {
		var map = this._map,
		    options = map.options,
		    delay = +new Date() - this._lastTime,

		    noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime + delay - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo([0, 0]),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			if (!offset.x || !offset.y) {
				map.fire('moveend');

			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				L.Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true
					});
				});
			}
		}
	}
});

L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);


/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

L.Map.mergeOptions({
	doubleClickZoom: true
});

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick, this);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick, this);
	},

	_onDoubleClick: function (e) {
		var map = this._map,
		    zoom = map.getZoom() + (e.originalEvent.shiftKey ? -1 : 1);

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPoint, zoom);
		}
	}
});

L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);


/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

L.Map.mergeOptions({
	scrollWheelZoom: true
});

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
		L.DomEvent.on(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
		L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(40 - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.bind(this._performZoom, this), left);

		L.DomEvent.preventDefault(e);
		L.DomEvent.stopPropagation(e);
	},

	_performZoom: function () {
		var map = this._map,
		    delta = this._delta,
		    zoom = map.getZoom();

		delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;
		this._startTime = null;

		if (!delta) { return; }

		if (map.options.scrollWheelZoom === 'center') {
			map.setZoom(zoom + delta);
		} else {
			map.setZoomAround(this._lastMousePos, zoom + delta);
		}
	}
});

L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);


/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

L.extend(L.DomEvent, {

	_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
	_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last,
		    doubleTap = false,
		    delay = 250,
		    touch,
		    pre = '_leaflet_',
		    touchstart = this._touchstart,
		    touchend = this._touchend,
		    trackedTouches = [];

		function onTouchStart(e) {
			var count;

			if (L.Browser.pointer) {
				trackedTouches.push(e.pointerId);
				count = trackedTouches.length;
			} else {
				count = e.touches.length;
			}
			if (count > 1) {
				return;
			}

			var now = Date.now(),
				delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd(e) {
			if (L.Browser.pointer) {
				var idx = trackedTouches.indexOf(e.pointerId);
				if (idx === -1) {
					return;
				}
				trackedTouches.splice(idx, 1);
			}

			if (doubleTap) {
				if (L.Browser.pointer) {
					// work around .type being readonly with MSPointer* events
					var newTouch = { },
						prop;

					// jshint forin:false
					for (var i in touch) {
						prop = touch[i];
						if (typeof prop === 'function') {
							newTouch[i] = prop.bind(touch);
						} else {
							newTouch[i] = prop;
						}
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}
		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		// on pointer we need to listen on the document, otherwise a drag starting on the map and moving off screen
		// will not come through to us, so we will lose track of how many touches are ongoing
		var endElement = L.Browser.pointer ? document.documentElement : obj;

		obj.addEventListener(touchstart, onTouchStart, false);
		endElement.addEventListener(touchend, onTouchEnd, false);

		if (L.Browser.pointer) {
			endElement.addEventListener(L.DomEvent.POINTER_CANCEL, onTouchEnd, false);
		}

		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_';

		obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
		(L.Browser.pointer ? document.documentElement : obj).removeEventListener(
		        this._touchend, obj[pre + this._touchend + id], false);

		if (L.Browser.pointer) {
			document.documentElement.removeEventListener(L.DomEvent.POINTER_CANCEL, obj[pre + this._touchend + id],
				false);
		}

		return this;
	}
});


/*
 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */

L.extend(L.DomEvent, {

	//static
	POINTER_DOWN: L.Browser.msPointer ? 'MSPointerDown' : 'pointerdown',
	POINTER_MOVE: L.Browser.msPointer ? 'MSPointerMove' : 'pointermove',
	POINTER_UP: L.Browser.msPointer ? 'MSPointerUp' : 'pointerup',
	POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',

	_pointers: [],
	_pointerDocumentListener: false,

	// Provides a touch events wrapper for (ms)pointer events.
	// Based on changes by veproza https://github.com/CloudMade/Leaflet/pull/1019
	//ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	addPointerListener: function (obj, type, handler, id) {

		switch (type) {
		case 'touchstart':
			return this.addPointerListenerStart(obj, type, handler, id);
		case 'touchend':
			return this.addPointerListenerEnd(obj, type, handler, id);
		case 'touchmove':
			return this.addPointerListenerMove(obj, type, handler, id);
		default:
			throw 'Unknown touch event type';
		}
	},

	addPointerListenerStart: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    pointers = this._pointers;

		var cb = function (e) {

			L.DomEvent.preventDefault(e);

			var alreadyInArray = false;
			for (var i = 0; i < pointers.length; i++) {
				if (pointers[i].pointerId === e.pointerId) {
					alreadyInArray = true;
					break;
				}
			}
			if (!alreadyInArray) {
				pointers.push(e);
			}

			e.touches = pointers.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchstart' + id] = cb;
		obj.addEventListener(this.POINTER_DOWN, cb, false);

		// need to also listen for end events to keep the _pointers list accurate
		// this needs to be on the body and never go away
		if (!this._pointerDocumentListener) {
			var internalCb = function (e) {
				for (var i = 0; i < pointers.length; i++) {
					if (pointers[i].pointerId === e.pointerId) {
						pointers.splice(i, 1);
						break;
					}
				}
			};
			//We listen on the documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(this.POINTER_UP, internalCb, false);
			document.documentElement.addEventListener(this.POINTER_CANCEL, internalCb, false);

			this._pointerDocumentListener = true;
		}

		return this;
	},

	addPointerListenerMove: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._pointers;

		function cb(e) {

			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches[i] = e;
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		}

		obj[pre + 'touchmove' + id] = cb;
		obj.addEventListener(this.POINTER_MOVE, cb, false);

		return this;
	},

	addPointerListenerEnd: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._pointers;

		var cb = function (e) {
			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches.splice(i, 1);
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchend' + id] = cb;
		obj.addEventListener(this.POINTER_UP, cb, false);
		obj.addEventListener(this.POINTER_CANCEL, cb, false);

		return this;
	},

	removePointerListener: function (obj, type, id) {
		var pre = '_leaflet_',
		    cb = obj[pre + type + id];

		switch (type) {
		case 'touchstart':
			obj.removeEventListener(this.POINTER_DOWN, cb, false);
			break;
		case 'touchmove':
			obj.removeEventListener(this.POINTER_MOVE, cb, false);
			break;
		case 'touchend':
			obj.removeEventListener(this.POINTER_UP, cb, false);
			obj.removeEventListener(this.POINTER_CANCEL, cb, false);
			break;
		}

		return this;
	}
});


/*
 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
 */

L.Map.mergeOptions({
	touchZoom: L.Browser.touch && !L.Browser.android23,
	bounceAtZoomLimits: true
});

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]),
		    viewCenter = map._getCenterLayerPoint();

		this._startCenter = p1.add(p2)._divideBy(2);
		this._startDist = p1.distanceTo(p2);

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		if (map._panAnim) {
			map._panAnim.stop();
		}

		L.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

		if (this._scale === 1) { return; }

		if (!map.options.bounceAtZoomLimits) {
			if ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
			    (map.getZoom() === map.getMaxZoom() && this._scale > 1)) { return; }
		}

		if (!this._moved) {
			L.DomUtil.addClass(map._mapPane, 'leaflet-touching');

			map
			    .fire('movestart')
			    .fire('zoomstart');

			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(
		        this._updateOnMove, this, true, this._map._container);

		L.DomEvent.preventDefault(e);
	},

	_updateOnMove: function () {
		var map = this._map,
		    origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),
		    zoom = map.getScaleZoom(this._scale);

		map._animateZoom(center, zoom, this._startCenter, this._scale, this._delta);
	},

	_onTouchEnd: function () {
		if (!this._moved || !this._zooming) {
			this._zooming = false;
			return;
		}

		var map = this._map;

		this._zooming = false;
		L.DomUtil.removeClass(map._mapPane, 'leaflet-touching');
		L.Util.cancelAnimFrame(this._animRequest);

		L.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		var origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),

		    oldZoom = map.getZoom(),
		    floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
		    roundZoomDelta = (floatZoomDelta > 0 ?
		            Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),

		    zoom = map._limitZoom(oldZoom + roundZoomDelta),
		    scale = map.getZoomScale(zoom) / this._scale;

		map._animateZoom(center, zoom, origin, scale);
	},

	_getScaleOrigin: function () {
		var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
		return this._startCenter.add(centerOffset);
	}
});

L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);


/*
 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
 */

L.Map.mergeOptions({
	tap: true,
	tapTolerance: 15
});

L.Map.Tap = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
	},

	_onDown: function (e) {
		if (!e.touches) { return; }

		L.DomEvent.preventDefault(e);

		this._fireClick = true;

		// don't simulate click or track longpress if more than 1 touch
		if (e.touches.length > 1) {
			this._fireClick = false;
			clearTimeout(this._holdTimeout);
			return;
		}

		var first = e.touches[0],
		    el = first.target;

		this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);

		// if touching a link, highlight it
		if (el.tagName && el.tagName.toLowerCase() === 'a') {
			L.DomUtil.addClass(el, 'leaflet-active');
		}

		// simulate long hold but setting a timeout
		this._holdTimeout = setTimeout(L.bind(function () {
			if (this._isTapValid()) {
				this._fireClick = false;
				this._onUp();
				this._simulateEvent('contextmenu', first);
			}
		}, this), 1000);

		L.DomEvent
			.on(document, 'touchmove', this._onMove, this)
			.on(document, 'touchend', this._onUp, this);
	},

	_onUp: function (e) {
		clearTimeout(this._holdTimeout);

		L.DomEvent
			.off(document, 'touchmove', this._onMove, this)
			.off(document, 'touchend', this._onUp, this);

		if (this._fireClick && e && e.changedTouches) {

			var first = e.changedTouches[0],
			    el = first.target;

			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.removeClass(el, 'leaflet-active');
			}

			// simulate click if the touch didn't move too much
			if (this._isTapValid()) {
				this._simulateEvent('click', first);
			}
		}
	},

	_isTapValid: function () {
		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	},

	_onMove: function (e) {
		var first = e.touches[0];
		this._newPos = new L.Point(first.clientX, first.clientY);
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent._simulated = true;
		e.target._simulatedClick = true;

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});

if (L.Browser.touch && !L.Browser.pointer) {
	L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
}


/*
 * L.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
  * (zoom to a selected bounding box), enabled by default.
 */

L.Map.mergeOptions({
	boxZoom: true
});

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
		this._moved = false;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
		this._moved = false;
	},

	moved: function () {
		return this._moved;
	},

	_onMouseDown: function (e) {
		this._moved = false;

		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		L.DomUtil.disableTextSelection();
		L.DomUtil.disableImageDrag();

		this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

		L.DomEvent
		    .on(document, 'mousemove', this._onMouseMove, this)
		    .on(document, 'mouseup', this._onMouseUp, this)
		    .on(document, 'keydown', this._onKeyDown, this);
	},

	_onMouseMove: function (e) {
		if (!this._moved) {
			this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
			L.DomUtil.setPosition(this._box, this._startLayerPoint);

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';
			this._map.fire('boxzoomstart');
		}

		var startPoint = this._startLayerPoint,
		    box = this._box,

		    layerPoint = this._map.mouseEventToLayerPoint(e),
		    offset = layerPoint.subtract(startPoint),

		    newPos = new L.Point(
		        Math.min(layerPoint.x, startPoint.x),
		        Math.min(layerPoint.y, startPoint.y));

		L.DomUtil.setPosition(box, newPos);

		this._moved = true;

		// TODO refactor: remove hardcoded 4 pixels
		box.style.width  = (Math.max(0, Math.abs(offset.x) - 4)) + 'px';
		box.style.height = (Math.max(0, Math.abs(offset.y) - 4)) + 'px';
	},

	_finish: function () {
		if (this._moved) {
			this._pane.removeChild(this._box);
			this._container.style.cursor = '';
		}

		L.DomUtil.enableTextSelection();
		L.DomUtil.enableImageDrag();

		L.DomEvent
		    .off(document, 'mousemove', this._onMouseMove)
		    .off(document, 'mouseup', this._onMouseUp)
		    .off(document, 'keydown', this._onKeyDown);
	},

	_onMouseUp: function (e) {

		this._finish();

		var map = this._map,
		    layerPoint = map.mouseEventToLayerPoint(e);

		if (this._startLayerPoint.equals(layerPoint)) { return; }

		var bounds = new L.LatLngBounds(
		        map.layerPointToLatLng(this._startLayerPoint),
		        map.layerPointToLatLng(layerPoint));

		map.fitBounds(bounds);

		map.fire('boxzoomend', {
			boxZoomBounds: bounds
		});
	},

	_onKeyDown: function (e) {
		if (e.keyCode === 27) {
			this._finish();
		}
	}
});

L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);


/*
 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
 */

L.Map.mergeOptions({
	keyboard: true,
	keyboardPanOffset: 80,
	keyboardZoomOffset: 1
});

L.Map.Keyboard = L.Handler.extend({

	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61, 171],
		zoomOut: [189, 109, 173]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanOffset(map.options.keyboardPanOffset);
		this._setZoomOffset(map.options.keyboardZoomOffset);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex === -1) {
			container.tabIndex = '0';
		}

		L.DomEvent
		    .on(container, 'focus', this._onFocus, this)
		    .on(container, 'blur', this._onBlur, this)
		    .on(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .on('focus', this._addHooks, this)
		    .on('blur', this._removeHooks, this);
	},

	removeHooks: function () {
		this._removeHooks();

		var container = this._map._container;

		L.DomEvent
		    .off(container, 'focus', this._onFocus, this)
		    .off(container, 'blur', this._onBlur, this)
		    .off(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .off('focus', this._addHooks, this)
		    .off('blur', this._removeHooks, this);
	},

	_onMouseDown: function () {
		if (this._focused) { return; }

		var body = document.body,
		    docEl = document.documentElement,
		    top = body.scrollTop || docEl.scrollTop,
		    left = body.scrollLeft || docEl.scrollLeft;

		this._map._container.focus();

		window.scrollTo(left, top);
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanOffset: function (pan) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * pan, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [pan, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, pan];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * pan];
		}
	},

	_setZoomOffset: function (zoom) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoom;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoom;
		}
	},

	_addHooks: function () {
		L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		var key = e.keyCode,
		    map = this._map;

		if (key in this._panKeys) {

			if (map._panAnim && map._panAnim._inProgress) { return; }

			map.panBy(this._panKeys[key]);

			if (map.options.maxBounds) {
				map.panInsideBounds(map.options.maxBounds);
			}

		} else if (key in this._zoomKeys) {
			map.setZoom(map.getZoom() + this._zoomKeys[key]);

		} else {
			return;
		}

		L.DomEvent.stop(e);
	}
});

L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);


/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;
		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon);
		}

		this._draggable
			.on('dragstart', this._onDragStart, this)
			.on('drag', this._onDrag, this)
			.on('dragend', this._onDragEnd, this);
		this._draggable.enable();
		L.DomUtil.addClass(this._marker._icon, 'leaflet-marker-draggable');
	},

	removeHooks: function () {
		this._draggable
			.off('dragstart', this._onDragStart, this)
			.off('drag', this._onDrag, this)
			.off('dragend', this._onDragEnd, this);

		this._draggable.disable();
		L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		this._marker
		    .closePopup()
		    .fire('movestart')
		    .fire('dragstart');
	},

	_onDrag: function () {
		var marker = this._marker,
		    shadow = marker._shadow,
		    iconPos = L.DomUtil.getPosition(marker._icon),
		    latlng = marker._map.layerPointToLatLng(iconPos);

		// update shadow position
		if (shadow) {
			L.DomUtil.setPosition(shadow, iconPos);
		}

		marker._latlng = latlng;

		marker
		    .fire('move', {latlng: latlng})
		    .fire('drag');
	},

	_onDragEnd: function (e) {
		this._marker
		    .fire('moveend')
		    .fire('dragend', e);
	}
});


/*
 * L.Control is a base class for implementing map controls. Handles positioning.
 * All other controls extend from this class.
 */

L.Control = L.Class.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	getPosition: function () {
		return this.options.position;
	},

	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	getContainer: function () {
		return this._container;
	},

	addTo: function (map) {
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	removeFrom: function (map) {
		var pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		corner.removeChild(this._container);
		this._map = null;

		if (this.onRemove) {
			this.onRemove(map);
		}

		return this;
	},

	_refocusOnMap: function () {
		if (this._map) {
			this._map.getContainer().focus();
		}
	}
});

L.control = function (options) {
	return new L.Control(options);
};


// adds control-related methods to L.Map

L.Map.include({
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	removeControl: function (control) {
		control.removeFrom(this);
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'leaflet-',
		    container = this._controlContainer =
		            L.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = L.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	},

	_clearControlPos: function () {
		this._container.removeChild(this._controlContainer);
	}
});


/*
 * L.Control.Zoom is used for the default zoom buttons on the map.
 */

L.Control.Zoom = L.Control.extend({
	options: {
		position: 'topleft',
		zoomInText: '+',
		zoomInTitle: 'Zoom in',
		zoomOutText: '-',
		zoomOutTitle: 'Zoom out'
	},

	onAdd: function (map) {
		var zoomName = 'leaflet-control-zoom',
		    container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

		this._map = map;

		this._zoomInButton  = this._createButton(
		        this.options.zoomInText, this.options.zoomInTitle,
		        zoomName + '-in',  container, this._zoomIn,  this);
		this._zoomOutButton = this._createButton(
		        this.options.zoomOutText, this.options.zoomOutTitle,
		        zoomName + '-out', container, this._zoomOut, this);

		this._updateDisabled();
		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

		return container;
	},

	onRemove: function (map) {
		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	},

	_zoomIn: function (e) {
		this._map.zoomIn(e.shiftKey ? 3 : 1);
	},

	_zoomOut: function (e) {
		this._map.zoomOut(e.shiftKey ? 3 : 1);
	},

	_createButton: function (html, title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		var stop = L.DomEvent.stopPropagation;

		L.DomEvent
		    .on(link, 'click', stop)
		    .on(link, 'mousedown', stop)
		    .on(link, 'dblclick', stop)
		    .on(link, 'click', L.DomEvent.preventDefault)
		    .on(link, 'click', fn, context)
		    .on(link, 'click', this._refocusOnMap, context);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
			className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});

L.Map.mergeOptions({
	zoomControl: true
});

L.Map.addInitHook(function () {
	if (this.options.zoomControl) {
		this.zoomControl = new L.Control.Zoom();
		this.addControl(this.zoomControl);
	}
});

L.control.zoom = function (options) {
	return new L.Control.Zoom(options);
};



/*
 * L.Control.Attribution is used for displaying attribution on the map (added by default).
 */

L.Control.Attribution = L.Control.extend({
	options: {
		position: 'bottomright',
		prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
	},

	initialize: function (options) {
		L.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		L.DomEvent.disableClickPropagation(this._container);

		for (var i in map._layers) {
			if (map._layers[i].getAttribution) {
				this.addAttribution(map._layers[i].getAttribution());
			}
		}
		
		map
		    .on('layeradd', this._onLayerAdd, this)
		    .on('layerremove', this._onLayerRemove, this);

		this._update();

		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerAdd)
		    .off('layerremove', this._onLayerRemove);

	},

	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	addAttribution: function (text) {
		if (!text) { return; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	removeAttribution: function (text) {
		if (!text) { return; }

		if (this._attributions[text]) {
			this._attributions[text]--;
			this._update();
		}

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' | ');
	},

	_onLayerAdd: function (e) {
		if (e.layer.getAttribution) {
			this.addAttribution(e.layer.getAttribution());
		}
	},

	_onLayerRemove: function (e) {
		if (e.layer.getAttribution) {
			this.removeAttribution(e.layer.getAttribution());
		}
	}
});

L.Map.mergeOptions({
	attributionControl: true
});

L.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		this.attributionControl = (new L.Control.Attribution()).addTo(this);
	}
});

L.control.attribution = function (options) {
	return new L.Control.Attribution(options);
};


/*
 * L.Control.Scale is used for displaying metric/imperial scale on the map.
 */

L.Control.Scale = L.Control.extend({
	options: {
		position: 'bottomleft',
		maxWidth: 100,
		metric: true,
		imperial: true,
		updateWhenIdle: false
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-scale',
		    container = L.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className, container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		if (options.metric) {
			this._mScale = L.DomUtil.create('div', className + '-line', container);
		}
		if (options.imperial) {
			this._iScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_update: function () {
		var bounds = this._map.getBounds(),
		    centerLat = bounds.getCenter().lat,
		    halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
		    dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

		    size = this._map.getSize(),
		    options = this.options,
		    maxMeters = 0;

		if (size.x > 0) {
			maxMeters = dist * (options.maxWidth / size.x);
		}

		this._updateScales(options, maxMeters);
	},

	_updateScales: function (options, maxMeters) {
		if (options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}

		if (options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var meters = this._getRoundNum(maxMeters);

		this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
		this._mScale.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
	},

	_updateImperial: function (maxMeters) {
		var maxFeet = maxMeters * 3.2808399,
		    scale = this._iScale,
		    maxMiles, miles, feet;

		if (maxFeet > 5280) {
			maxMiles = maxFeet / 5280;
			miles = this._getRoundNum(maxMiles);

			scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
			scale.innerHTML = miles + ' mi';

		} else {
			feet = this._getRoundNum(maxFeet);

			scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
			scale.innerHTML = feet + ' ft';
		}
	},

	_getScaleWidth: function (ratio) {
		return Math.round(this.options.maxWidth * ratio) - 10;
	},

	_getRoundNum: function (num) {
		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
		    d = num / pow10;

		d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

		return pow10 * d;
	}
});

L.control.scale = function (options) {
	return new L.Control.Scale(options);
};


/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 */

L.Control.Layers = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		autoZIndex: true
	},

	initialize: function (baseLayers, overlays, options) {
		L.setOptions(this, options);

		this._layers = {};
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (var i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (i in overlays) {
			this._addLayer(overlays[i], i, true);
		}
	},

	onAdd: function (map) {
		this._initLayout();
		this._update();

		map
		    .on('layeradd', this._onLayerChange, this)
		    .on('layerremove', this._onLayerChange, this);

		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerChange)
		    .off('layerremove', this._onLayerChange);
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		this._update();
		return this;
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		this._update();
		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);
		delete this._layers[id];
		this._update();
		return this;
	},

	_initLayout: function () {
		var className = 'leaflet-control-layers',
		    container = this._container = L.DomUtil.create('div', className);

		//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		if (!L.Browser.touch) {
			L.DomEvent
				.disableClickPropagation(container)
				.disableScrollPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			if (!L.Browser.android) {
				L.DomEvent
				    .on(container, 'mouseover', this._expand, this)
				    .on(container, 'mouseout', this._collapse, this);
			}
			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent
				    .on(link, 'click', L.DomEvent.stop)
				    .on(link, 'click', this._expand, this);
			}
			else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}
			//Work around for Firefox android issue https://github.com/Leaflet/Leaflet/issues/2033
			L.DomEvent.on(form, 'click', function () {
				setTimeout(L.bind(this._onInputClick, this), 0);
			}, this);

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_addLayer: function (layer, name, overlay) {
		var id = L.stamp(layer);

		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) {
			return;
		}

		this._baseLayersList.innerHTML = '';
		this._overlaysList.innerHTML = '';

		var baseLayersPresent = false,
		    overlaysPresent = false,
		    i, obj;

		for (i in this._layers) {
			obj = this._layers[i];
			this._addItem(obj);
			overlaysPresent = overlaysPresent || obj.overlay;
			baseLayersPresent = baseLayersPresent || !obj.overlay;
		}

		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
	},

	_onLayerChange: function (e) {
		var obj = this._layers[L.stamp(e.layer)];

		if (!obj) { return; }

		if (!this._handlingClick) {
			this._update();
		}

		var type = obj.overlay ?
			(e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :
			(e.type === 'layeradd' ? 'baselayerchange' : null);

		if (type) {
			this._map.fire(type, obj);
		}
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
		if (checked) {
			radioHtml += ' checked="checked"';
		}
		radioHtml += '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    input,
		    checked = this._map.hasLayer(obj.layer);

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}

		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		label.appendChild(input);
		label.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		return label;
	},

	_onInputClick: function () {
		var i, input, obj,
		    inputs = this._form.getElementsByTagName('input'),
		    inputsLen = inputs.length;

		this._handlingClick = true;

		for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			obj = this._layers[input.layerId];

			if (input.checked && !this._map.hasLayer(obj.layer)) {
				this._map.addLayer(obj.layer);

			} else if (!input.checked && this._map.hasLayer(obj.layer)) {
				this._map.removeLayer(obj.layer);
			}
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
	}
});

L.control.layers = function (baseLayers, overlays, options) {
	return new L.Control.Layers(baseLayers, overlays, options);
};


/*
 * L.PosAnimation is used by Leaflet internally for pan animations.
 */

L.PosAnimation = L.Class.extend({
	includes: L.Mixin.Events,

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._newPos = newPos;

		this.fire('start');

		el.style[L.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
		        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';

		L.DomEvent.on(el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
		L.DomUtil.setPosition(el, newPos);

		// toggle reflow, Chrome flickers for some reason if you don't do this
		L.Util.falseFn(el.offsetWidth);

		// there's no native way to track value updates of transitioned properties, so we imitate this
		this._stepTimer = setInterval(L.bind(this._onStep, this), 50);
	},

	stop: function () {
		if (!this._inProgress) { return; }

		// if we just removed the transition property, the element would jump to its final position,
		// so we need to make it stay at the current position

		L.DomUtil.setPosition(this._el, this._getPos());
		this._onTransitionEnd();
		L.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
	},

	_onStep: function () {
		var stepPos = this._getPos();
		if (!stepPos) {
			this._onTransitionEnd();
			return;
		}
		// jshint camelcase: false
		// make L.DomUtil.getPosition return intermediate position value during animation
		this._el._leaflet_pos = stepPos;

		this.fire('step');
	},

	// you can't easily get intermediate values of properties animated with CSS3 Transitions,
	// we need to parse computed style (in case of transform it returns matrix string)

	_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,

	_getPos: function () {
		var left, top, matches,
		    el = this._el,
		    style = window.getComputedStyle(el);

		if (L.Browser.any3d) {
			matches = style[L.DomUtil.TRANSFORM].match(this._transformRe);
			if (!matches) { return; }
			left = parseFloat(matches[1]);
			top  = parseFloat(matches[2]);
		} else {
			left = parseFloat(style.left);
			top  = parseFloat(style.top);
		}

		return new L.Point(left, top, true);
	},

	_onTransitionEnd: function () {
		L.DomEvent.off(this._el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);

		if (!this._inProgress) { return; }
		this._inProgress = false;

		this._el.style[L.DomUtil.TRANSITION] = '';

		// jshint camelcase: false
		// make sure L.DomUtil.getPosition returns the final position value after animation
		this._el._leaflet_pos = this._newPos;

		clearInterval(this._stepTimer);

		this.fire('step').fire('end');
	}

});


/*
 * Extends L.Map to handle panning animations.
 */

L.Map.include({

	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
		options = options || {};

		if (this._panAnim) {
			this._panAnim.stop();
		}

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = L.extend({animate: options.animate}, options.zoom);
				options.pan = L.extend({animate: options.animate}, options.pan);
			}

			// try animating pan or zoom
			var animated = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (animated) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, options) {
		offset = L.point(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset);
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	}
});


/*
 * L.PosAnimation fallback implementation that powers Leaflet pan animations
 * in browsers that don't support CSS3 Transitions.
 */

L.PosAnimation = L.DomUtil.TRANSITION ? L.PosAnimation : L.PosAnimation.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = L.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		this.fire('start');

		this._animate();
	},

	stop: function () {
		if (!this._inProgress) { return; }

		this._step();
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = L.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function () {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		L.DomUtil.setPosition(this._el, pos);

		this.fire('step');
	},

	_complete: function () {
		L.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});


/*
 * Extends L.Map to handle zoom animations.
 */

L.Map.mergeOptions({
	zoomAnimation: true,
	zoomAnimationThreshold: 4
});

if (L.DomUtil.TRANSITION) {

	L.Map.addInitHook(function () {
		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = this.options.zoomAnimation && L.DomUtil.TRANSITION &&
				L.Browser.any3d && !L.Browser.android23 && !L.Browser.mobileOpera;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {
			L.DomEvent.on(this._mapPane, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
		}
	});
}

L.Map.include(!L.DomUtil.TRANSITION ? {} : {

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale),
			origin = this._getCenterLayerPoint()._add(offset);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		this
		    .fire('movestart')
		    .fire('zoomstart');

		this._animateZoom(center, zoom, origin, scale, null, true);

		return true;
	},

	_animateZoom: function (center, zoom, origin, scale, delta, backwards) {

		this._animatingZoom = true;

		// put transform transition on all layers with leaflet-zoom-animated class
		L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');

		// remember what center/zoom to set after animation
		this._animateToCenter = center;
		this._animateToZoom = zoom;

		// disable any dragging during animation
		if (L.Draggable) {
			L.Draggable._disabled = true;
		}

		this.fire('zoomanim', {
			center: center,
			zoom: zoom,
			origin: origin,
			scale: scale,
			delta: delta,
			backwards: backwards
		});
	},

	_onZoomTransitionEnd: function () {

		this._animatingZoom = false;

		L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');

		this._resetView(this._animateToCenter, this._animateToZoom, true, true);

		if (L.Draggable) {
			L.Draggable._disabled = false;
		}
	}
});


/*
	Zoom animation logic for L.TileLayer.
*/

L.TileLayer.include({
	_animateZoom: function (e) {
		if (!this._animating) {
			this._animating = true;
			this._prepareBgBuffer();
		}

		var bg = this._bgBuffer,
		    transform = L.DomUtil.TRANSFORM,
		    initialTransform = e.delta ? L.DomUtil.getTranslateString(e.delta) : bg.style[transform],
		    scaleStr = L.DomUtil.getScaleString(e.scale, e.origin);

		bg.style[transform] = e.backwards ?
				scaleStr + ' ' + initialTransform :
				initialTransform + ' ' + scaleStr;
	},

	_endZoomAnim: function () {
		var front = this._tileContainer,
		    bg = this._bgBuffer;

		front.style.visibility = '';
		front.parentNode.appendChild(front); // Bring to fore

		// force reflow
		L.Util.falseFn(bg.offsetWidth);

		this._animating = false;
	},

	_clearBgBuffer: function () {
		var map = this._map;

		if (map && !map._animatingZoom && !map.touchZoom._zooming) {
			this._bgBuffer.innerHTML = '';
			this._bgBuffer.style[L.DomUtil.TRANSFORM] = '';
		}
	},

	_prepareBgBuffer: function () {

		var front = this._tileContainer,
		    bg = this._bgBuffer;

		// if foreground layer doesn't have many tiles but bg layer does,
		// keep the existing bg layer and just zoom it some more

		var bgLoaded = this._getLoadedTilesPercentage(bg),
		    frontLoaded = this._getLoadedTilesPercentage(front);

		if (bg && bgLoaded > 0.5 && frontLoaded < 0.5) {

			front.style.visibility = 'hidden';
			this._stopLoadingImages(front);
			return;
		}

		// prepare the buffer to become the front tile pane
		bg.style.visibility = 'hidden';
		bg.style[L.DomUtil.TRANSFORM] = '';

		// switch out the current layer to be the new bg layer (and vice-versa)
		this._tileContainer = bg;
		bg = this._bgBuffer = front;

		this._stopLoadingImages(bg);

		//prevent bg buffer from clearing right after zoom
		clearTimeout(this._clearBgBufferTimer);
	},

	_getLoadedTilesPercentage: function (container) {
		var tiles = container.getElementsByTagName('img'),
		    i, len, count = 0;

		for (i = 0, len = tiles.length; i < len; i++) {
			if (tiles[i].complete) {
				count++;
			}
		}
		return count / len;
	},

	// stops loading all tiles in the background layer
	_stopLoadingImages: function (container) {
		var tiles = Array.prototype.slice.call(container.getElementsByTagName('img')),
		    i, len, tile;

		for (i = 0, len = tiles.length; i < len; i++) {
			tile = tiles[i];

			if (!tile.complete) {
				tile.onload = L.Util.falseFn;
				tile.onerror = L.Util.falseFn;
				tile.src = L.Util.emptyImageUrl;

				tile.parentNode.removeChild(tile);
			}
		}
	}
});


/*
 * Provides L.Map with convenient shortcuts for using browser geolocation features.
 */

L.Map.include({
	_defaultLocateOptions: {
		watch: false,
		setView: false,
		maxZoom: Infinity,
		timeout: 10000,
		maximumAge: 0,
		enableHighAccuracy: false
	},

	locate: function (/*Object*/ options) {

		options = this._locateOptions = L.extend(this._defaultLocateOptions, options);

		if (!navigator.geolocation) {
			this._handleGeolocationError({
				code: 0,
				message: 'Geolocation not supported.'
			});
			return this;
		}

		var onResponse = L.bind(this._handleGeolocationResponse, this),
			onError = L.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	stopLocate: function () {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		if (this._locateOptions) {
			this._locateOptions.setView = false;
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? 'permission denied' :
		            (c === 2 ? 'position unavailable' : 'timeout'));

		if (this._locateOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		this.fire('locationerror', {
			code: c,
			message: 'Geolocation error: ' + message + '.'
		});
	},

	_handleGeolocationResponse: function (pos) {
		var lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new L.LatLng(lat, lng),

		    latAccuracy = 180 * pos.coords.accuracy / 40075017,
		    lngAccuracy = latAccuracy / Math.cos(L.LatLng.DEG_TO_RAD * lat),

		    bounds = L.latLngBounds(
		            [lat - latAccuracy, lng - lngAccuracy],
		            [lat + latAccuracy, lng + lngAccuracy]),

		    options = this._locateOptions;

		if (options.setView) {
			var zoom = Math.min(this.getBoundsZoom(bounds), options.maxZoom);
			this.setView(latlng, zoom);
		}

		var data = {
			latlng: latlng,
			bounds: bounds,
			timestamp: pos.timestamp
		};

		for (var i in pos.coords) {
			if (typeof pos.coords[i] === 'number') {
				data[i] = pos.coords[i];
			}
		}

		this.fire('locationfound', data);
	}
});


}(window, document));

});

;/*!/component_modules/leaflet.draw-src.js*/
define('component_modules/leaflet.draw-src', function(require, exports, module) {

/*
	Leaflet.draw, a plugin that adds drawing and editing tools to Leaflet powered maps.
	(c) 2012-2016, Jacob Toye, Smartrak, Leaflet

	https://github.com/Leaflet/Leaflet.draw
	http://leafletjs.com
*/
(function (window, document, undefined) {/*
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */
var L = require("component_modules/leaflet-src.js");

L.drawVersion = '0.3.0-dev';

L.drawLocal = {
	draw: {
		toolbar: {
			// #TODO: this should be reorganized where actions are nested in actions
			// ex: actions.undo  or actions.cancel
			actions: {
				title: 'Cancel drawing',
				text: 'Cancel'
			},
			finish: {
				title: 'Finish drawing',
				text: 'Finish'
			},
			undo: {
				title: 'Delete last point drawn',
				text: 'Delete last point'
			},
			buttons: {
				polyline: 'Draw a polyline',
				polygon: 'Draw a polygon',
				rectangle: 'Draw a rectangle',
				circle: 'Draw a circle',
				marker: 'Draw a marker'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: 'Click and drag to draw circle.'
				},
				radius: 'Radius'
			},
			marker: {
				tooltip: {
					start: 'Click map to place marker.'
				}
			},
			polygon: {
				tooltip: {
					start: 'Click to start drawing shape.',
					cont: 'Click to continue drawing shape.',
					end: 'Click first point to close this shape.'
				}
			},
			polyline: {
				error: '<strong>Error:</strong> shape edges cannot cross!',
				tooltip: {
					start: 'Click to start drawing line.',
					cont: 'Click to continue drawing line.',
					end: 'Click last point to finish line.'
				}
			},
			rectangle: {
				tooltip: {
					start: 'Click and drag to draw rectangle.'
				}
			},
			simpleshape: {
				tooltip: {
					end: 'Release mouse to finish drawing.'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: 'Save changes.',
					text: 'Save'
				},
				cancel: {
					title: 'Cancel editing, discards all changes.',
					text: 'Cancel'
				}
			},
			buttons: {
				edit: 'Edit layers.',
				editDisabled: 'No layers to edit.',
				remove: 'Delete layers.',
				removeDisabled: 'No layers to delete.'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: 'Drag handles, or marker to edit feature.',
					subtext: 'Click cancel to undo changes.'
				}
			},
			remove: {
				tooltip: {
					text: 'Click on a feature to remove'
				}
			}
		}
	}
};


L.Draw = {};

L.Draw.Feature = L.Handler.extend({
	includes: L.Mixin.Events,

	initialize: function (map, options) {
		this._map = map;
		this._container = map._container;
		this._overlayPane = map._panes.overlayPane;
		this._popupPane = map._panes.popupPane;

		// Merge default shapeOptions options with custom shapeOptions
		if (options && options.shapeOptions) {
			options.shapeOptions = L.Util.extend({}, this.options.shapeOptions, options.shapeOptions);
		}
		L.setOptions(this, options);
	},

	enable: function () {
		if (this._enabled) { return; }

		L.Handler.prototype.enable.call(this);

		this.fire('enabled', { handler: this.type });

		this._map.fire('draw:drawstart', { layerType: this.type });
	},

	disable: function () {
		if (!this._enabled) { return; }

		L.Handler.prototype.disable.call(this);

		this._map.fire('draw:drawstop', { layerType: this.type });

		this.fire('disabled', { handler: this.type });
	},

	addHooks: function () {
		var map = this._map;

		if (map) {
			L.DomUtil.disableTextSelection();

			map.getContainer().focus();

			this._tooltip = new L.Tooltip(this._map);

			L.DomEvent.on(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	removeHooks: function () {
		if (this._map) {
			L.DomUtil.enableTextSelection();

			this._tooltip.dispose();
			this._tooltip = null;

			L.DomEvent.off(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	setOptions: function (options) {
		L.setOptions(this, options);
	},

	_fireCreatedEvent: function (layer) {
		this._map.fire('draw:created', { layer: layer, layerType: this.type });
	},

	// Cancel drawing when the escape key is pressed
	_cancelDrawing: function (e) {
		if (e.keyCode === 27) {
			this.disable();
		}
	}
});

L.Draw.Polyline = L.Draw.Feature.extend({
	statics: {
		TYPE: 'polyline'
	},

	Poly: L.Polyline,

	options: {
		allowIntersection: true,
		repeatMode: false,
		drawError: {
			color: '#b00b00',
			timeout: 2500
		},
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		guidelineDistance: 20,
		maxGuideLineLength: 4000,
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: false,
			clickable: true
		},
		metric: true, // Whether to use the metric meaurement system or imperial
		feet: true, // When not metric, to use feet instead of yards for display.
		showLength: true, // Whether to display distance in the tooltip
		zIndexOffset: 2000 // This should be > than the highest z-index any map layers
	},

	initialize: function (map, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}

		// Need to set this here to ensure the correct message is used.
		this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error;

		// Merge default drawError options with custom options
		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polyline.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._markers = [];

			this._markerGroup = new L.LayerGroup();
			this._map.addLayer(this._markerGroup);

			this._poly = new L.Polyline([], this.options.shapeOptions);

			this._tooltip.updateContent(this._getTooltipText());

			// Make a transparent marker that will used to catch click events. These click
			// events will create the vertices. We need to do this so we can ensure that
			// we can create vertices over other map layers (markers, vector layers). We
			// also do not want to trigger any click handlers of objects we are clicking on
			// while drawing.
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('mousedown', this._onMouseDown, this)
				.on('mouseout', this._onMouseOut, this)
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.8 compatibility
				.on('mousemove', this._onMouseMove, this) // Necessary to prevent 0.8 stutter
				.addTo(this._map);

			this._map
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.7 compatibility
				.on('mousemove', this._onMouseMove, this)
				.on('zoomlevelschange', this._onZoomEnd, this)
				.on('click', this._onTouch, this)
				.on('zoomend', this._onZoomEnd, this);
		}
	},

	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		this._clearHideErrorTimeout();

		this._cleanUpShape();

		// remove markers from map
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;

		this._map.removeLayer(this._poly);
		delete this._poly;

		this._mouseMarker
			.off('mousedown', this._onMouseDown, this)
			.off('mouseout', this._onMouseOut, this)
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this);
		this._map.removeLayer(this._mouseMarker);
		delete this._mouseMarker;

		// clean up DOM
		this._clearGuides();

		this._map
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this)
			.off('mouseup', this._onMouseUp, this)
			.off('zoomend', this._onZoomEnd, this)
			.off('click', this._onTouch, this);
	},

	deleteLastVertex: function () {
		if (this._markers.length <= 1) {
			return;
		}

		var lastMarker = this._markers.pop(),
			poly = this._poly,
			latlng = this._poly.spliceLatLngs(poly.getLatLngs().length - 1, 1)[0];

		this._markerGroup.removeLayer(lastMarker);

		if (poly.getLatLngs().length < 2) {
			this._map.removeLayer(poly);
		}

		this._vertexChanged(latlng, false);
	},

	addVertex: function (latlng) {
		var markersLength = this._markers.length;

		if (markersLength > 0 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) {
			this._showErrorTooltip();
			return;
		}
		else if (this._errorShown) {
			this._hideErrorTooltip();
		}

		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._vertexChanged(latlng, true);
	},

	completeShape: function () {
		if (this._markers.length <= 1) {
			return;
		}

		this._fireCreatedEvent();
		this.disable();

		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_finishShape: function () {
		var intersects = this._poly.newLatLngIntersects(this._poly.getLatLngs()[this._poly.getLatLngs().length - 1]);

		if ((!this.options.allowIntersection && intersects) || !this._shapeIsValid()) {
			this._showErrorTooltip();
			return;
		}

		this._fireCreatedEvent();
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	//Called to verify the shape is valid when the user tries to finish it
	//Return false if the shape is not valid
	_shapeIsValid: function () {
		return true;
	},

	_onZoomEnd: function () {
		this._updateGuide();
	},

	_onMouseMove: function (e) {
		var newPos = this._map.mouseEventToLayerPoint(e.originalEvent);
		var latlng = this._map.layerPointToLatLng(newPos);

		// Save latlng
		// should this be moved to _updateGuide() ?
		this._currentLatLng = latlng;

		this._updateTooltip(latlng);

		// Update the guide line
		this._updateGuide(newPos);

		// Update the mouse marker position
		this._mouseMarker.setLatLng(latlng);

		L.DomEvent.preventDefault(e.originalEvent);
	},

	_vertexChanged: function (latlng, added) {
		this._map.fire('draw:drawvertex', { layers: this._markerGroup });
		this._updateFinishHandler();

		this._updateRunningMeasure(latlng, added);

		this._clearGuides();

		this._updateTooltip();
	},

	_onMouseDown: function (e) {
		var originalEvent = e.originalEvent;
		this._mouseDownOrigin = L.point(originalEvent.clientX, originalEvent.clientY);
	},

	_onMouseUp: function (e) {
		if (this._mouseDownOrigin) {
			// We detect clicks within a certain tolerance, otherwise let it
			// be interpreted as a drag by the map
			var distance = L.point(e.originalEvent.clientX, e.originalEvent.clientY)
				.distanceTo(this._mouseDownOrigin);
			if (Math.abs(distance) < 9 * (window.devicePixelRatio || 1)) {
				this.addVertex(e.latlng);
			}
		}
		this._mouseDownOrigin = null;
	},

	_onTouch: function (e) {
		// #TODO: use touchstart and touchend vs using click(touch start & end).
		if (L.Browser.touch) { // #TODO: get rid of this once leaflet fixes their click/touch.
			this._onMouseDown(e);
			this._onMouseUp(e);
		}
	},

	_onMouseOut: function () {
		if (this._tooltip) {
			this._tooltip._onMouseOut.call(this._tooltip);
		}
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;
		// The last marker should have a click handler to close the polyline
		if (markerCount > 1) {
			this._markers[markerCount - 1].on('click', this._finishShape, this);
		}

		// Remove the old marker click handler (as only the last point should close the polyline)
		if (markerCount > 2) {
			this._markers[markerCount - 2].off('click', this._finishShape, this);
		}
	},

	_createMarker: function (latlng) {
		var marker = new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset * 2
		});

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_updateGuide: function (newPos) {
		var markerCount = this._markers.length;

		if (markerCount > 0) {
			newPos = newPos || this._map.latLngToLayerPoint(this._currentLatLng);

			// draw the guide line
			this._clearGuides();
			this._drawGuide(
				this._map.latLngToLayerPoint(this._markers[markerCount - 1].getLatLng()),
				newPos
			);
		}
	},

	_updateTooltip: function (latLng) {
		var text = this._getTooltipText();

		if (latLng) {
			this._tooltip.updatePosition(latLng);
		}

		if (!this._errorShown) {
			this._tooltip.updateContent(text);
		}
	},

	_drawGuide: function (pointA, pointB) {
		var length = Math.floor(Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2))),
			guidelineDistance = this.options.guidelineDistance,
			maxGuideLineLength = this.options.maxGuideLineLength,
			// Only draw a guideline with a max length
			i = length > maxGuideLineLength ? length - maxGuideLineLength : guidelineDistance,
			fraction,
			dashPoint,
			dash;

		//create the guides container if we haven't yet
		if (!this._guidesContainer) {
			this._guidesContainer = L.DomUtil.create('div', 'leaflet-draw-guides', this._overlayPane);
		}

		//draw a dash every GuildeLineDistance
		for (; i < length; i += this.options.guidelineDistance) {
			//work out fraction along line we are
			fraction = i / length;

			//calculate new x,y point
			dashPoint = {
				x: Math.floor((pointA.x * (1 - fraction)) + (fraction * pointB.x)),
				y: Math.floor((pointA.y * (1 - fraction)) + (fraction * pointB.y))
			};

			//add guide dash to guide container
			dash = L.DomUtil.create('div', 'leaflet-draw-guide-dash', this._guidesContainer);
			dash.style.backgroundColor =
				!this._errorShown ? this.options.shapeOptions.color : this.options.drawError.color;

			L.DomUtil.setPosition(dash, dashPoint);
		}
	},

	_updateGuideColor: function (color) {
		if (this._guidesContainer) {
			for (var i = 0, l = this._guidesContainer.childNodes.length; i < l; i++) {
				this._guidesContainer.childNodes[i].style.backgroundColor = color;
			}
		}
	},

	// removes all child elements (guide dashes) from the guides container
	_clearGuides: function () {
		if (this._guidesContainer) {
			while (this._guidesContainer.firstChild) {
				this._guidesContainer.removeChild(this._guidesContainer.firstChild);
			}
		}
	},

	_getTooltipText: function () {
		var showLength = this.options.showLength,
			labelText, distanceStr;

		if (this._markers.length === 0) {
			labelText = {
				text: L.drawLocal.draw.handlers.polyline.tooltip.start
			};
		} else {
			distanceStr = showLength ? this._getMeasurementString() : '';

			if (this._markers.length === 1) {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.cont,
					subtext: distanceStr
				};
			} else {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.end,
					subtext: distanceStr
				};
			}
		}
		return labelText;
	},

	_updateRunningMeasure: function (latlng, added) {
		var markersLength = this._markers.length,
			previousMarkerIndex, distance;

		if (this._markers.length === 1) {
			this._measurementRunningTotal = 0;
		} else {
			previousMarkerIndex = markersLength - (added ? 2 : 1);
			distance = latlng.distanceTo(this._markers[previousMarkerIndex].getLatLng());

			this._measurementRunningTotal += distance * (added ? 1 : -1);
		}
	},

	_getMeasurementString: function () {
		var currentLatLng = this._currentLatLng,
			previousLatLng = this._markers[this._markers.length - 1].getLatLng(),
			distance;

		// calculate the distance from the last fixed point to the mouse position
		distance = this._measurementRunningTotal + currentLatLng.distanceTo(previousLatLng);

		return L.GeometryUtil.readableDistance(distance, this.options.metric, this.options.feet);
	},

	_showErrorTooltip: function () {
		this._errorShown = true;

		// Update tooltip
		this._tooltip
			.showAsError()
			.updateContent({ text: this.options.drawError.message });

		// Update shape
		this._updateGuideColor(this.options.drawError.color);
		this._poly.setStyle({ color: this.options.drawError.color });

		// Hide the error after 2 seconds
		this._clearHideErrorTimeout();
		this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout);
	},

	_hideErrorTooltip: function () {
		this._errorShown = false;

		this._clearHideErrorTimeout();

		// Revert tooltip
		this._tooltip
			.removeError()
			.updateContent(this._getTooltipText());

		// Revert shape
		this._updateGuideColor(this.options.shapeOptions.color);
		this._poly.setStyle({ color: this.options.shapeOptions.color });
	},

	_clearHideErrorTimeout: function () {
		if (this._hideErrorTimeout) {
			clearTimeout(this._hideErrorTimeout);
			this._hideErrorTimeout = null;
		}
	},

	_cleanUpShape: function () {
		if (this._markers.length > 1) {
			this._markers[this._markers.length - 1].off('click', this._finishShape, this);
		}
	},

	_fireCreatedEvent: function () {
		var poly = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);
	}
});


L.Draw.Polygon = L.Draw.Polyline.extend({
	statics: {
		TYPE: 'polygon'
	},

	Poly: L.Polygon,

	options: {
		showArea: false,
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		}
	},

	initialize: function (map, options) {
		L.Draw.Polyline.prototype.initialize.call(this, map, options);

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polygon.TYPE;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;

		// The first marker should have a click handler to close the polygon
		if (markerCount === 1) {
			this._markers[0].on('click', this._finishShape, this);
		}

		// Add and update the double click handler
		if (markerCount > 2) {
			this._markers[markerCount - 1].on('dblclick', this._finishShape, this);
			// Only need to remove handler if has been added before
			if (markerCount > 3) {
				this._markers[markerCount - 2].off('dblclick', this._finishShape, this);
			}
		}
	},

	_getTooltipText: function () {
		var text, subtext;

		if (this._markers.length === 0) {
			text = L.drawLocal.draw.handlers.polygon.tooltip.start;
		} else if (this._markers.length < 3) {
			text = L.drawLocal.draw.handlers.polygon.tooltip.cont;
		} else {
			text = L.drawLocal.draw.handlers.polygon.tooltip.end;
			subtext = this._getMeasurementString();
		}

		return {
			text: text,
			subtext: subtext
		};
	},

	_getMeasurementString: function () {
		var area = this._area;

		if (!area) {
			return null;
		}

		return L.GeometryUtil.readableArea(area, this.options.metric);
	},

	_shapeIsValid: function () {
		return this._markers.length >= 3;
	},

	_vertexChanged: function (latlng, added) {
		var latLngs;

		// Check to see if we should show the area
		if (!this.options.allowIntersection && this.options.showArea) {
			latLngs = this._poly.getLatLngs();

			this._area = L.GeometryUtil.geodesicArea(latLngs);
		}

		L.Draw.Polyline.prototype._vertexChanged.call(this, latlng, added);
	},

	_cleanUpShape: function () {
		var markerCount = this._markers.length;

		if (markerCount > 0) {
			this._markers[0].off('click', this._finishShape, this);

			if (markerCount > 2) {
				this._markers[markerCount - 1].off('dblclick', this._finishShape, this);
			}
		}
	}
});


L.SimpleShape = {};

L.Draw.SimpleShape = L.Draw.Feature.extend({
	options: {
		repeatMode: false
	},

	initialize: function (map, options) {
		this._endLabelText = L.drawLocal.draw.handlers.simpleshape.tooltip.end;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._mapDraggable = this._map.dragging.enabled();

			if (this._mapDraggable) {
				this._map.dragging.disable();
			}

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';

			this._tooltip.updateContent({ text: this._initialLabelText });

			this._map
				.on('mousedown', this._onMouseDown, this)
				.on('mousemove', this._onMouseMove, this)
				.on('touchstart', this._onMouseDown, this)
				.on('touchmove', this._onMouseMove, this);
		}
	},

	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);
		if (this._map) {
			if (this._mapDraggable) {
				this._map.dragging.enable();
			}

			//TODO refactor: move cursor to styles
			this._container.style.cursor = '';

			this._map
				.off('mousedown', this._onMouseDown, this)
				.off('mousemove', this._onMouseMove, this)
				.off('touchstart', this._onMouseDown, this)
				.off('touchmove', this._onMouseMove, this);

			L.DomEvent.off(document, 'mouseup', this._onMouseUp, this);
			L.DomEvent.off(document, 'touchend', this._onMouseUp, this);

			// If the box element doesn't exist they must not have moved the mouse, so don't need to destroy/return
			if (this._shape) {
				this._map.removeLayer(this._shape);
				delete this._shape;
			}
		}
		this._isDrawing = false;
	},

	_getTooltipText: function () {
		return {
			text: this._endLabelText
		};
	},

	_onMouseDown: function (e) {
		this._isDrawing = true;
		this._startLatLng = e.latlng;

		L.DomEvent
			.on(document, 'mouseup', this._onMouseUp, this)
			.on(document, 'touchend', this._onMouseUp, this)
			.preventDefault(e.originalEvent);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._tooltip.updateContent(this._getTooltipText());
			this._drawShape(latlng);
		}
	},

	_onMouseUp: function () {
		if (this._shape) {
			this._fireCreatedEvent();
		}

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	}
});

L.Draw.Rectangle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'rectangle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		metric: true // Whether to use the metric measurement system or imperial
	},

	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Rectangle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
		}
	},

	_fireCreatedEvent: function () {
		var rectangle = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, rectangle);
	},

	_getTooltipText: function () {
		var tooltipText = L.Draw.SimpleShape.prototype._getTooltipText.call(this),
			shape = this._shape,
			latLngs, area, subtext;

		if (shape) {
			latLngs = this._shape.getLatLngs();
			area = L.GeometryUtil.geodesicArea(latLngs);
			subtext = L.GeometryUtil.readableArea(area, this.options.metric);
		}

		return {
			text: tooltipText.text,
			subtext: subtext
		};
	}
});


L.Draw.Circle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'circle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		showRadius: true,
		metric: true, // Whether to use the metric meaurement system or imperial
		feet: true // When not metric, use feet instead of yards for display
	},

	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Circle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Circle(this._startLatLng, this._startLatLng.distanceTo(latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setRadius(this._startLatLng.distanceTo(latlng));
		}
	},

	_fireCreatedEvent: function () {
		var circle = new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, circle);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng,
			showRadius = this.options.showRadius,
			useMetric = this.options.metric,
			radius;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._drawShape(latlng);

			// Get the new radius (rounded to 1 dp)
			radius = this._shape.getRadius().toFixed(1);

			this._tooltip.updateContent({
				text: this._endLabelText,
				subtext: showRadius ? L.drawLocal.draw.handlers.circle.radius + ': ' +
					L.GeometryUtil.readableDistance(radius, useMetric, this.options.feet) : ''
			});
		}
	}
});


L.Draw.Marker = L.Draw.Feature.extend({
	statics: {
		TYPE: 'marker'
	},

	options: {
		icon: new L.Icon.Default(),
		repeatMode: false,
		zIndexOffset: 2000 // This should be > than the highest z-index any markers
	},

	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Marker.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);

		if (this._map) {
			this._tooltip.updateContent({ text: L.drawLocal.draw.handlers.marker.tooltip.start });

			// Same mouseMarker as in Draw.Polyline
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('click', this._onClick, this)
				.addTo(this._map);

			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click', this._onTouch, this);
		}
	},

	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		if (this._map) {
			if (this._marker) {
				this._marker.off('click', this._onClick, this);
				this._map
					.off('click', this._onClick, this)
					.off('click', this._onTouch, this)
					.removeLayer(this._marker);
				delete this._marker;
			}

			this._mouseMarker.off('click', this._onClick, this);
			this._map.removeLayer(this._mouseMarker);
			delete this._mouseMarker;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		this._mouseMarker.setLatLng(latlng);

		if (!this._marker) {
			this._marker = new L.Marker(latlng, {
				icon: this.options.icon,
				zIndexOffset: this.options.zIndexOffset
			});
			// Bind to both marker and map to make sure we get the click event.
			this._marker.on('click', this._onClick, this);
			this._map
				.on('click', this._onClick, this)
				.addLayer(this._marker);
		}
		else {
			latlng = this._mouseMarker.getLatLng();
			this._marker.setLatLng(latlng);
		}
	},

	_onClick: function () {
		this._fireCreatedEvent();

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_onTouch: function (e) {
		// called on click & tap, only really does any thing on tap
		this._onMouseMove(e); // creates & places marker
		this._onClick(); // permanently places marker & ends interaction
	},

	_fireCreatedEvent: function () {
		var marker = new L.Marker.Touch(this._marker.getLatLng(), { icon: this.options.icon });
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
	}
});


L.Edit = L.Edit || {};

L.Edit.Marker = L.Handler.extend({
	initialize: function (marker, options) {
		this._marker = marker;
		L.setOptions(this, options);
	},

	addHooks: function () {
		var marker = this._marker;

		marker.dragging.enable();
		marker.on('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	removeHooks: function () {
		var marker = this._marker;

		marker.dragging.disable();
		marker.off('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	_onDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
	},

	_toggleMarkerHighlight: function () {
		var icon = this._marker._icon;


		// Don't do anything if this layer is a marker but doesn't have an icon. Markers
		// should usually have icons. If using Leaflet.draw with Leaflet.markercluster there
		// is a chance that a marker doesn't.
		if (!icon) {
			return;
		}
		
		// This is quite naughty, but I don't see another way of doing it. (short of setting a new icon)
		icon.style.display = 'none';

		if (L.DomUtil.hasClass(icon, 'leaflet-edit-marker-selected')) {
			L.DomUtil.removeClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, -4);

		} else {
			L.DomUtil.addClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, 4);
		}

		icon.style.display = '';
	},

	_offsetMarker: function (icon, offset) {
		var iconMarginTop = parseInt(icon.style.marginTop, 10) - offset,
			iconMarginLeft = parseInt(icon.style.marginLeft, 10) - offset;

		icon.style.marginTop = iconMarginTop + 'px';
		icon.style.marginLeft = iconMarginLeft + 'px';
	}
});

L.Marker.addInitHook(function () {
	if (L.Edit.Marker) {
		this.editing = new L.Edit.Marker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});


L.Edit = L.Edit || {};

/*
 * L.Edit.Poly is an editing handler for polylines and polygons.
 */
L.Edit.Poly = L.Handler.extend({
	options: {},

	initialize: function (poly, options) {

		this.latlngs = [poly._latlngs];
		if (poly._holes) {
			this.latlngs = this.latlngs.concat(poly._holes);
		}

		this._verticesHandlers = [];
		for (var i = 0; i < this.latlngs.length; i++) {
			this._verticesHandlers.push(new L.Edit.PolyVerticesEdit(poly, this.latlngs[i], options));
		}

		this._poly = poly;
		L.setOptions(this, options);
	},

	_eachVertexHandler: function (callback) {
		for (var i = 0; i < this._verticesHandlers.length; i++) {
			callback(this._verticesHandlers[i]);
		}
	},

	addHooks: function () {
		this._eachVertexHandler(function (handler) {
			handler.addHooks();
		});
	},

	removeHooks: function () {
		this._eachVertexHandler(function (handler) {
			handler.removeHooks();
		});
	},

	updateMarkers: function () {
		this._eachVertexHandler(function (handler) {
			handler.updateMarkers();
		});
	}

});

L.Edit.PolyVerticesEdit = L.Handler.extend({
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		drawError: {
			color: '#b00b00',
			timeout: 1000
		}


	},

	initialize: function (poly, latlngs, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}
		this._poly = poly;

		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		this._latlngs = latlngs;
		
		L.setOptions(this, options);
	},

	addHooks: function () {
		var poly = this._poly;

		if (!(poly instanceof L.Polygon)) {
			poly.options.editing.fill = false;
		}

		poly.setStyle(poly.options.editing);

		if (this._poly._map) {

			this._map = this._poly._map; // Set map

			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._poly._map.addLayer(this._markerGroup);
		}
	},

	removeHooks: function () {
		var poly = this._poly;

		poly.setStyle(poly.options.original);

		if (poly._map) {
			poly._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
			delete this._markers;
		}
	},

	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		this._markers = [];

		var latlngs = this._latlngs,
			i, j, len, marker;

		for (i = 0, len = latlngs.length; i < len; i++) {

			marker = this._createMarker(latlngs[i], i);
			marker.on('click', this._onMarkerClick, this);
			this._markers.push(marker);
		}

		var markerLeft, markerRight;

		for (i = 0, j = len - 1; i < len; j = i++) {
			if (i === 0 && !(L.Polygon && (this._poly instanceof L.Polygon))) {
				continue;
			}

			markerLeft = this._markers[j];
			markerRight = this._markers[i];

			this._createMiddleMarker(markerLeft, markerRight);
			this._updatePrevNext(markerLeft, markerRight);
		}
	},

	_createMarker: function (latlng, index) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: this.options.icon,
		});

		marker._origLatLng = latlng;
		marker._index = index;

		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._fireEdit, this)
			.on('touchmove', this._onTouchMove, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('touchend', this._fireEdit, this)
			.on('MSPointerUp', this._fireEdit, this);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_onMarkerDragStart: function () {
		this._poly.fire('editstart');
	},

	_spliceLatLngs: function () {
		var removed = [].splice.apply(this._latlngs, arguments);
		this._poly._convertLatLngs(this._latlngs, true);
		this._poly.redraw();
		return removed;
	},

	_removeMarker: function (marker) {
		var i = marker._index;

		this._markerGroup.removeLayer(marker);
		this._markers.splice(i, 1);
		this._spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);

		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._fireEdit, this)
			.off('touchmove', this._onMarkerDrag, this)
			.off('touchend', this._fireEdit, this)
			.off('click', this._onMarkerClick, this);
	},

	_fireEdit: function () {
		this._poly.edited = true;
		this._poly.fire('edit');
		this._poly._map.fire('draw:editvertex', { layers: this._markerGroup });
	},

	_onMarkerDrag: function (e) {
		var marker = e.target;
		var poly = this._poly;

		L.extend(marker._origLatLng, marker._latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		if (poly.options.poly) {
			var tooltip = poly._map._editTooltip; // Access the tooltip

			// If we don't allow intersections and the polygon intersects
			if (!poly.options.poly.allowIntersection && poly.intersects()) {

				var originalColor = poly.options.color;
				poly.setStyle({ color: this.options.drawError.color });

				if (tooltip) {
					tooltip.updateContent({
						text: L.drawLocal.draw.handlers.polyline.error
					});
				}

				// Reset everything back to normal after a second
				setTimeout(function () {
					poly.setStyle({ color: originalColor });
					if (tooltip) {
						tooltip.updateContent({
							text:  L.drawLocal.edit.handlers.edit.tooltip.text,
							subtext:  L.drawLocal.edit.handlers.edit.tooltip.subtext
						});
					}
				}, 1000);
				this._onMarkerClick(e); // Reset the marker to it's original position
			}
		}

		this._poly.redraw();
		this._poly.fire('editdrag');
	},

	_onMarkerClick: function (e) {

		var minPoints = L.Polygon && (this._poly instanceof L.Polygon) ? 4 : 3,
			marker = e.target;

		// If removing this point would create an invalid polyline/polygon don't remove
		if (this._latlngs.length < minPoints) {
			return;
		}

		// remove the marker
		this._removeMarker(marker);

		// update prev/next links of adjacent markers
		this._updatePrevNext(marker._prev, marker._next);

		// remove ghost markers near the removed marker
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}

		// create a ghost marker in place of the removed one
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);

		} else if (!marker._prev) {
			marker._next._middleLeft = null;

		} else if (!marker._next) {
			marker._prev._middleRight = null;
		}

		this._fireEdit();
	},

	_onTouchMove: function (e) {

		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		L.extend(marker._origLatLng, latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		this._poly.redraw();
		this.updateMarkers();
	},

	_updateIndexes: function (index, delta) {
		this._markerGroup.eachLayer(function (marker) {
			if (marker._index > index) {
				marker._index += delta;
			}
		});
	},

	_createMiddleMarker: function (marker1, marker2) {
		var latlng = this._getMiddleLatLng(marker1, marker2),
			marker = this._createMarker(latlng),
			onClick,
			onDragStart,
			onDragEnd;

		marker.setOpacity(0.6);

		marker1._middleRight = marker2._middleLeft = marker;

		onDragStart = function () {
			var i = marker2._index;

			marker._index = i;

			marker
				.off('click', onClick, this)
				.on('click', this._onMarkerClick, this);

			latlng.lat = marker.getLatLng().lat;
			latlng.lng = marker.getLatLng().lng;
			this._spliceLatLngs(i, 0, latlng);
			this._markers.splice(i, 0, marker);

			marker.setOpacity(1);

			this._updateIndexes(i, 1);
			marker2._index++;
			this._updatePrevNext(marker1, marker);
			this._updatePrevNext(marker, marker2);

			this._poly.fire('editstart');
		};

		onDragEnd = function () {

			marker.off('dragstart', onDragStart, this);
			marker.off('dragend', onDragEnd, this);
			marker.off('touchmove', onDragStart, this);

			this._createMiddleMarker(marker1, marker);
			this._createMiddleMarker(marker, marker2);

		};

		onClick = function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._fireEdit();
		};

		marker
			.on('click', onClick, this)
			.on('dragstart', onDragStart, this)
			.on('dragend', onDragEnd, this)
			.on('touchmove', onDragStart, this);

		this._markerGroup.addLayer(marker);
	},

	_updatePrevNext: function (marker1, marker2) {
		if (marker1) {
			marker1._next = marker2;
		}
		if (marker2) {
			marker2._prev = marker1;
		}
	},

	_getMiddleLatLng: function (marker1, marker2) {
		var map = this._poly._map,
			p1 = map.project(marker1.getLatLng()),
			p2 = map.project(marker2.getLatLng());

		return map.unproject(p1._add(p2)._divideBy(2));
	}
});

L.Polyline.addInitHook(function () {

	// Check to see if handler has already been initialized. This is to support versions of Leaflet that still have L.Handler.PolyEdit
	if (this.editing) {
		return;
	}

	if (L.Edit.Poly) {

		this.editing = new L.Edit.Poly(this, this.options.poly);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});


L.Edit = L.Edit || {};

L.Edit.SimpleShape = L.Handler.extend({
	options: {
		moveIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
		}),
		resizeIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize'
		}),
		touchMoveIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon'
		}),
		touchResizeIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize leaflet-touch-icon'
		}),
	},

	initialize: function (shape, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.moveIcon = this.options.touchMoveIcon;
			this.options.resizeIcon = this.options.touchResizeIcon;
		}

		this._shape = shape;
		L.Util.setOptions(this, options);
	},

	addHooks: function () {
		var shape = this._shape;
		if (this._shape._map) {
			this._map = this._shape._map;
			shape.setStyle(shape.options.editing);

			if (shape._map) {
				this._map = shape._map;
				if (!this._markerGroup) {
					this._initMarkers();
				}
				this._map.addLayer(this._markerGroup);
			}
		}
	},

	removeHooks: function () {
		var shape = this._shape;

		shape.setStyle(shape.options.original);

		if (shape._map) {
			this._unbindMarker(this._moveMarker);

			for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
				this._unbindMarker(this._resizeMarkers[i]);
			}
			this._resizeMarkers = null;

			this._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
		}

		this._map = null;
	},

	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}

		// Create center marker
		this._createMoveMarker();

		// Create edge marker
		this._createResizeMarker();
	},

	_createMoveMarker: function () {
		// Children override
	},

	_createResizeMarker: function () {
		// Children override
	},

	_createMarker: function (latlng, icon) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: icon,
			zIndexOffset: 10
		});

		this._bindMarker(marker);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_bindMarker: function (marker) {
		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._onMarkerDragEnd, this)
			.on('touchstart', this._onTouchStart, this)
			.on('touchmove', this._onTouchMove, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('touchend', this._onTouchEnd, this)
			.on('MSPointerUp', this._onTouchEnd, this);
	},

	_unbindMarker: function (marker) {
		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._onMarkerDragEnd, this)
			.off('touchstart', this._onTouchStart, this)
			.off('touchmove', this._onTouchMove, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('touchend', this._onTouchEnd, this)
			.off('MSPointerUp', this._onTouchEnd, this);
	},

	_onMarkerDragStart: function (e) {
		var marker = e.target;
		marker.setOpacity(0);

		this._shape.fire('editstart');
	},

	_fireEdit: function () {
		this._shape.edited = true;
		this._shape.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target,
			latlng = marker.getLatLng();

		if (marker === this._moveMarker) {
			this._move(latlng);
			console.log("move")
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();
		this._shape.fire('editdrag');
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);

		this._fireEdit();
	},

	_onTouchStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		if (typeof(this._getCorners) === 'function') {
			// Save a reference to the opposite point
			var corners = this._getCorners(),
				marker = e.target,
				currentCornerIndex = marker._cornerIndex;
			
			marker.setOpacity(0);

			// Copyed from Edit.Rectangle.js line 23 _onMarkerDragStart()
			// Latlng is null otherwise.
			this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];
			this._toggleCornerMarkers(0, currentCornerIndex);
		}
	
		this._shape.fire('editstart');
	},

	_onTouchMove: function (e) {
		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();
		
		// prevent touchcancel in IOS
		// e.preventDefault();
		return false;
	},

	_onTouchEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);
		this.updateMarkers();
		this._fireEdit();
	},

	_move: function () {
		// Children override
	},

	_resize: function () {
		// Children override
	}
});


L.Edit = L.Edit || {};

L.Edit.Rectangle = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var bounds = this._shape.getBounds(),
			center = bounds.getCenter();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		var corners = this._getCorners();

		this._resizeMarkers = [];

		for (var i = 0, l = corners.length; i < l; i++) {
			this._resizeMarkers.push(this._createMarker(corners[i], this.options.resizeIcon));
			// Monkey in the corner index as we will need to know this for dragging
			this._resizeMarkers[i]._cornerIndex = i;
		}
	},

	_onMarkerDragStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		// Save a reference to the opposite point
		var corners = this._getCorners(),
			marker = e.target,
			currentCornerIndex = marker._cornerIndex;

		this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];

		this._toggleCornerMarkers(0, currentCornerIndex);
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target,
			bounds, center;

		// Reset move marker position to the center
		if (marker === this._moveMarker) {
			bounds = this._shape.getBounds();
			center = bounds.getCenter();

			marker.setLatLng(center);
		}

		this._toggleCornerMarkers(1);

		this._repositionCornerMarkers();

		L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, e);
	},

	_move: function (newCenter) {
		var latlngs = this._shape.getLatLngs(),
			bounds = this._shape.getBounds(),
			center = bounds.getCenter(),
			offset, newLatLngs = [];

		// Offset the latlngs to the new center
		for (var i = 0, l = latlngs.length; i < l; i++) {
			offset = [latlngs[i].lat - center.lat, latlngs[i].lng - center.lng];
			newLatLngs.push([newCenter.lat + offset[0], newCenter.lng + offset[1]]);
		}

		this._shape.setLatLngs(newLatLngs);

		// Reposition the resize markers
		this._repositionCornerMarkers();
	},

	_resize: function (latlng) {
		var bounds;

		// Update the shape based on the current position of this corner and the opposite point
		this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));

		// Reposition the move marker
		bounds = this._shape.getBounds();
		this._moveMarker.setLatLng(bounds.getCenter());
	},

	_getCorners: function () {
		var bounds = this._shape.getBounds(),
			nw = bounds.getNorthWest(),
			ne = bounds.getNorthEast(),
			se = bounds.getSouthEast(),
			sw = bounds.getSouthWest();

		return [nw, ne, se, sw];
	},

	_toggleCornerMarkers: function (opacity) {
		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setOpacity(opacity);
		}
	},

	_repositionCornerMarkers: function () {
		var corners = this._getCorners();

		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setLatLng(corners[i]);
		}
	}
});

L.Rectangle.addInitHook(function () {
	if (L.Edit.Rectangle) {
		this.editing = new L.Edit.Rectangle(this);
		if (this.options.editable) {
			this.editing.enable();
		}
	}
});


L.Edit = L.Edit || {};

L.Edit.Circle = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var center = this._shape.getLatLng();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		var center = this._shape.getLatLng(),
			resizemarkerPoint = this._getResizeMarkerPoint(center);

		this._resizeMarkers = [];
		this._resizeMarkers.push(this._createMarker(resizemarkerPoint, this.options.resizeIcon));
	},

	_getResizeMarkerPoint: function (latlng) {
		// From L.shape.getBounds()
		var delta = this._shape._radius * Math.cos(Math.PI / 4),
			point = this._map.project(latlng);
		return this._map.unproject([point.x + delta, point.y - delta]);
	},

	_move: function (latlng) {
		var resizemarkerPoint = this._getResizeMarkerPoint(latlng);
		// Move the resize marker
		this._resizeMarkers[0].setLatLng(resizemarkerPoint);

		// Move the circle
		this._shape.setLatLng(latlng);
	},
	_resize: function (latlng) {
		var moveLatLng = this._moveMarker.getLatLng(),
			radius = moveLatLng.distanceTo(latlng);
		this._shape.setRadius(radius);
	}
});

L.Circle.addInitHook(function () {
	if (L.Edit.Circle) {
		this.editing = new L.Edit.Circle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});

L.Map.mergeOptions({
	touchExtend: true
});

L.Map.TouchExtend = L.Handler.extend({

	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.on(this._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.on(this._container, 'touchmove', this._onTouchMove, this);
		if (this._detectIE()) {
			L.DomEvent.on(this._container, 'MSPointerDown', this._onTouchStart, this);
			L.DomEvent.on(this._container, 'MSPointerUp', this._onTouchEnd, this);
			L.DomEvent.on(this._container, 'MSPointerMove', this._onTouchMove, this);
			L.DomEvent.on(this._container, 'MSPointerCancel', this._onTouchCancel, this);

		} else {
			L.DomEvent.on(this._container, 'touchcancel', this._onTouchCancel, this);
			L.DomEvent.on(this._container, 'touchleave', this._onTouchLeave, this);
		}
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'touchstart', this._onTouchStart);
		L.DomEvent.off(this._container, 'touchend', this._onTouchEnd);
		L.DomEvent.off(this._container, 'touchmove', this._onTouchMove);
		if (this._detectIE()) {
			L.DomEvent.off(this._container, 'MSPointerDowm', this._onTouchStart);
			L.DomEvent.off(this._container, 'MSPointerUp', this._onTouchEnd);
			L.DomEvent.off(this._container, 'MSPointerMove', this._onTouchMove);
			L.DomEvent.off(this._container, 'MSPointerCancel', this._onTouchCancel);
		} else {
			L.DomEvent.off(this._container, 'touchcancel', this._onTouchCancel);
			L.DomEvent.off(this._container, 'touchleave', this._onTouchLeave);
		}
	},

	_touchEvent: function (e, type) {
		// #TODO: fix the pageX error that is do a bug in Android where a single touch triggers two click events
		// _filterClick is what leaflet uses as a workaround.
		// This is a problem with more things than just android. Another problem is touchEnd has no touches in
		// its touch list.
		var touchEvent = {};
		if (typeof e.touches !== 'undefined') {
			if (!e.touches.length) {
				return;
			}
			touchEvent = e.touches[0];
		} else if (e.pointerType === 'touch') {
			touchEvent = e;
            if (!this._filterClick(e)) {
                return;
            }
		} else {
			return;
		}

		var containerPoint = this._map.mouseEventToContainerPoint(touchEvent),
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);

		this._map.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			pageX: touchEvent.pageX,
			pageY: touchEvent.pageY,
			originalEvent: e
		});
	},

    /** Borrowed from Leaflet and modified for bool ops **/
    _filterClick: function (e) {
        var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
            elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

        // are they closer together than 500ms yet more than 100ms?
        // Android typically triggers them ~300ms apart while multiple listeners
        // on the same event should be triggered far faster;
        // or check if click is simulated on the element, and if it is, reject any non-simulated events
        if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
            L.DomEvent.stop(e);
            return false;
        }
        L.DomEvent._lastClick = timeStamp;
        return true;
    },

	_onTouchStart: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchstart';
		this._touchEvent(e, type);

	},

	_onTouchEnd: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchend';
		this._touchEvent(e, type);
	},

	_onTouchCancel: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchcancel';
		if (this._detectIE()) {
			type = 'pointercancel';
		}
		this._touchEvent(e, type);
	},

	_onTouchLeave: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchleave';
		this._touchEvent(e, type);
	},

	_onTouchMove: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchmove';
		this._touchEvent(e, type);
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});

L.Map.addInitHook('addHandler', 'touchExtend', L.Map.TouchExtend);

// This isn't full Touch support. This is just to get makers to also support dom touch events after creation
// #TODO: find a better way of getting markers to support touch.
L.Marker.Touch = L.Marker.extend({

	// This is an exact copy of https://github.com/Leaflet/Leaflet/blob/v0.7/src/layer/marker/Marker.js
	// with the addition of the touch event son line 15.
	_initInteraction: function () {

		if (!this.options.clickable) {
			return;
		}

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
			events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'touchstart', 'touchend', 'touchmove'];
		if (this._detectIE) {
			events.concat(['MSPointerDown', 'MSPointerUp', 'MSPointerMove', 'MSPointerCancel']);
		} else {
			events.concat(['touchcancel']);
		}

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},
	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});


/*
 * L.LatLngUtil contains different utility functions for LatLngs.
 */

L.LatLngUtil = {
	// Clones a LatLngs[], returns [][]
	cloneLatLngs: function (latlngs) {
		var clone = [];
		for (var i = 0, l = latlngs.length; i < l; i++) {
			clone.push(this.cloneLatLng(latlngs[i]));
		}
		return clone;
	},

	cloneLatLng: function (latlng) {
		return L.latLng(latlng.lat, latlng.lng);
	}
};

L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
	// Ported from the OpenLayers implementation. See https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Geometry/LinearRing.js#L270
	geodesicArea: function (latLngs) {
		var pointsCount = latLngs.length,
			area = 0.0,
			d2r = L.LatLng.DEG_TO_RAD,
			p1, p2;

		if (pointsCount > 2) {
			for (var i = 0; i < pointsCount; i++) {
				p1 = latLngs[i];
				p2 = latLngs[(i + 1) % pointsCount];
				area += ((p2.lng - p1.lng) * d2r) *
						(2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
			}
			area = area * 6378137.0 * 6378137.0 / 2.0;
		}

		return Math.abs(area);
	},

	readableArea: function (area, isMetric) {
		var areaStr;

		if (isMetric) {
			if (area >= 10000) {
				areaStr = (area * 0.0001).toFixed(2) + ' ha';
			} else {
				areaStr = area.toFixed(2) + ' m&sup2;';
			}
		} else {
			area /= 0.836127; // Square yards in 1 meter

			if (area >= 3097600) { //3097600 square yards in 1 square mile
				areaStr = (area / 3097600).toFixed(2) + ' mi&sup2;';
			} else if (area >= 4840) {//48040 square yards in 1 acre
				areaStr = (area / 4840).toFixed(2) + ' acres';
			} else {
				areaStr = Math.ceil(area) + ' yd&sup2;';
			}
		}

		return areaStr;
	},

	readableDistance: function (distance, isMetric, useFeet) {
		var distanceStr;

		if (isMetric) {
			// show metres when distance is < 1km, then show km
			if (distance > 1000) {
				distanceStr = (distance  / 1000).toFixed(2) + ' km';
			} else {
				distanceStr = Math.ceil(distance) + ' m';
			}
		} else {
			distance *= 1.09361;

			if (distance > 1760) {
				distanceStr = (distance / 1760).toFixed(2) + ' miles';
			} else {
				var suffix = ' yd';
				if (useFeet) {
					distance = distance * 3;
					suffix = ' ft';
				}
				distanceStr = Math.ceil(distance) + suffix;
			}
		}

		return distanceStr;
	}
});


L.Util.extend(L.LineUtil, {
	// Checks to see if two line segments intersect. Does not handle degenerate cases.
	// http://compgeom.cs.uiuc.edu/~jeffe/teaching/373/notes/x06-sweepline.pdf
	segmentsIntersect: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2, /*Point*/ p3) {
		return	this._checkCounterclockwise(p, p2, p3) !==
				this._checkCounterclockwise(p1, p2, p3) &&
				this._checkCounterclockwise(p, p1, p2) !==
				this._checkCounterclockwise(p, p1, p3);
	},

	// check to see if points are in counterclockwise order
	_checkCounterclockwise: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return (p2.y - p.y) * (p1.x - p.x) > (p1.y - p.y) * (p2.x - p.x);
	}
});

L.Polyline.include({
	// Check to see if this polyline has any linesegments that intersect.
	// NOTE: does not support detecting intersection for degenerate cases.
	intersects: function () {
		var points = this._originalPoints,
			len = points ? points.length : 0,
			i, p, p1;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		for (i = len - 1; i >= 3; i--) {
			p = points[i - 1];
			p1 = points[i];


			if (this._lineSegmentsIntersectsRange(p, p1, i - 2)) {
				return true;
			}
		}

		return false;
	},

	// Check for intersection if new latlng was added to this polyline.
	// NOTE: does not support detecting intersection for degenerate cases.
	newLatLngIntersects: function (latlng, skipFirst) {
		// Cannot check a polyline for intersecting lats/lngs when not added to the map
		if (!this._map) {
			return false;
		}

		return this.newPointIntersects(this._map.latLngToLayerPoint(latlng), skipFirst);
	},

	// Check for intersection if new point was added to this polyline.
	// newPoint must be a layer point.
	// NOTE: does not support detecting intersection for degenerate cases.
	newPointIntersects: function (newPoint, skipFirst) {
		var points = this._originalPoints,
			len = points ? points.length : 0,
			lastPoint = points ? points[len - 1] : null,
			// The previous previous line segment. Previous line segment doesn't need testing.
			maxIndex = len - 2;

		if (this._tooFewPointsForIntersection(1)) {
			return false;
		}

		return this._lineSegmentsIntersectsRange(lastPoint, newPoint, maxIndex, skipFirst ? 1 : 0);
	},

	// Polylines with 2 sides can only intersect in cases where points are collinear (we don't support detecting these).
	// Cannot have intersection when < 3 line segments (< 4 points)
	_tooFewPointsForIntersection: function (extraPoints) {
		var points = this._originalPoints,
			len = points ? points.length : 0;
		// Increment length by extraPoints if present
		len += extraPoints || 0;

		return !this._originalPoints || len <= 3;
	},

	// Checks a line segment intersections with any line segments before its predecessor.
	// Don't need to check the predecessor as will never intersect.
	_lineSegmentsIntersectsRange: function (p, p1, maxIndex, minIndex) {
		var points = this._originalPoints,
			p2, p3;

		minIndex = minIndex || 0;

		// Check all previous line segments (beside the immediately previous) for intersections
		for (var j = maxIndex; j > minIndex; j--) {
			p2 = points[j - 1];
			p3 = points[j];

			if (L.LineUtil.segmentsIntersect(p, p1, p2, p3)) {
				return true;
			}
		}

		return false;
	}
});


L.Polygon.include({
	// Checks a polygon for any intersecting line segments. Ignores holes.
	intersects: function () {
		var polylineIntersects,
			points = this._originalPoints,
			len, firstPoint, lastPoint, maxIndex;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		polylineIntersects = L.Polyline.prototype.intersects.call(this);

		// If already found an intersection don't need to check for any more.
		if (polylineIntersects) {
			return true;
		}

		len = points.length;
		firstPoint = points[0];
		lastPoint = points[len - 1];
		maxIndex = len - 2;

		// Check the line segment between last and first point. Don't need to check the first line segment (minIndex = 1)
		return this._lineSegmentsIntersectsRange(lastPoint, firstPoint, maxIndex, 1);
	}
});

L.Control.Draw = L.Control.extend({

	options: {
		position: 'topleft',
		draw: {},
		edit: false
	},

	initialize: function (options) {
		if (L.version < '0.7') {
			throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}

		L.Control.prototype.initialize.call(this, options);

		var toolbar;

		this._toolbars = {};

		// Initialize toolbars
		if (L.DrawToolbar && this.options.draw) {
			toolbar = new L.DrawToolbar(this.options.draw);

			this._toolbars[L.DrawToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}

		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);

			this._toolbars[L.EditToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.EditToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}
		L.toolbar = this; //set global var for editing the toolbar
	},

	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw'),
			addedTopClass = false,
			topClassName = 'leaflet-draw-toolbar-top',
			toolbarContainer;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				toolbarContainer = this._toolbars[toolbarId].addToolbar(map);

				if (toolbarContainer) {
					// Add class to the first toolbar to remove the margin
					if (!addedTopClass) {
						if (!L.DomUtil.hasClass(toolbarContainer, topClassName)) {
							L.DomUtil.addClass(toolbarContainer.childNodes[0], topClassName);
						}
						addedTopClass = true;
					}

					container.appendChild(toolbarContainer);
				}
			}
		}

		return container;
	},

	onRemove: function () {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				this._toolbars[toolbarId].removeToolbar();
			}
		}
	},

	setDrawingOptions: function (options) {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] instanceof L.DrawToolbar) {
				this._toolbars[toolbarId].setOptions(options);
			}
		}
	},

	_toolbarEnabled: function (e) {
		var enabledToolbar = e.target;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] !== enabledToolbar) {
				this._toolbars[toolbarId].disable();
			}
		}
	}
});

L.Map.mergeOptions({
	drawControlTooltips: true,
	drawControl: false
});

L.Map.addInitHook(function () {
	if (this.options.drawControl) {
		this.drawControl = new L.Control.Draw();
		this.addControl(this.drawControl);
	}
});


L.Toolbar = L.Class.extend({
	includes: [L.Mixin.Events],

	initialize: function (options) {
		L.setOptions(this, options);

		this._modes = {};
		this._actionButtons = [];
		this._activeMode = null;
	},

	enabled: function () {
		return this._activeMode !== null;
	},

	disable: function () {
		if (!this.enabled()) { return; }

		this._activeMode.handler.disable();
	},

	addToolbar: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw-section'),
			buttonIndex = 0,
			buttonClassPrefix = this._toolbarClass || '',
			modeHandlers = this.getModeHandlers(map),
			i;

		this._toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
		this._map = map;

		for (i = 0; i < modeHandlers.length; i++) {
			if (modeHandlers[i].enabled) {
				this._initModeHandler(
					modeHandlers[i].handler,
					this._toolbarContainer,
					buttonIndex++,
					buttonClassPrefix,
					modeHandlers[i].title
				);
			}
		}

		// if no buttons were added, do not add the toolbar
		if (!buttonIndex) {
			return;
		}

		// Save button index of the last button, -1 as we would have ++ after the last button
		this._lastButtonIndex = --buttonIndex;

		// Create empty actions part of the toolbar
		this._actionsContainer = L.DomUtil.create('ul', 'leaflet-draw-actions');

		// Add draw and cancel containers to the control container
		container.appendChild(this._toolbarContainer);
		container.appendChild(this._actionsContainer);

		return container;
	},

	removeToolbar: function () {
		// Dispose each handler
		for (var handlerId in this._modes) {
			if (this._modes.hasOwnProperty(handlerId)) {
				// Unbind handler button
				this._disposeButton(
					this._modes[handlerId].button,
					this._modes[handlerId].handler.enable,
					this._modes[handlerId].handler
				);

				// Make sure is disabled
				this._modes[handlerId].handler.disable();

				// Unbind handler
				this._modes[handlerId].handler
					.off('enabled', this._handlerActivated, this)
					.off('disabled', this._handlerDeactivated, this);
			}
		}
		this._modes = {};

		// Dispose the actions toolbar
		for (var i = 0, l = this._actionButtons.length; i < l; i++) {
			this._disposeButton(
				this._actionButtons[i].button,
				this._actionButtons[i].callback,
				this
			);
		}
		this._actionButtons = [];
		this._actionsContainer = null;
	},

	_initModeHandler: function (handler, container, buttonIndex, classNamePredix, buttonTitle) {
		var type = handler.type;

		this._modes[type] = {};

		this._modes[type].handler = handler;

		this._modes[type].button = this._createButton({
			type: type,
			title: buttonTitle,
			className: classNamePredix + '-' + type,
			container: container,
			callback: this._modes[type].handler.enable,
			context: this._modes[type].handler
		});

		this._modes[type].buttonIndex = buttonIndex;

		this._modes[type].handler
			.on('enabled', this._handlerActivated, this)
			.on('disabled', this._handlerDeactivated, this);
	},

	_createButton: function (options) {

		var link = L.DomUtil.create('a', options.className || '', options.container);
		link.href = '#';

		if (options.text) {
			link.innerHTML = options.text;
		}

		if (options.title) {
			link.title = options.title;
		}

		L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'mousedown', L.DomEvent.stopPropagation)
			.on(link, 'dblclick', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, 'click', options.callback, options.context);

		return link;
	},

	_disposeButton: function (button, callback) {
		L.DomEvent
			.off(button, 'click', L.DomEvent.stopPropagation)
			.off(button, 'mousedown', L.DomEvent.stopPropagation)
			.off(button, 'dblclick', L.DomEvent.stopPropagation)
			.off(button, 'click', L.DomEvent.preventDefault)
			.off(button, 'click', callback);
	},

	_handlerActivated: function (e) {
		// Disable active mode (if present)
		this.disable();

		// Cache new active feature
		this._activeMode = this._modes[e.handler];

		L.DomUtil.addClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

		this._showActionsToolbar();

		this.fire('enable');
	},

	_handlerDeactivated: function () {
		this._hideActionsToolbar();

		L.DomUtil.removeClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

		this._activeMode = null;

		this.fire('disable');
	},

	_createActions: function (handler) {
		var container = this._actionsContainer,
			buttons = this.getActions(handler),
			l = buttons.length,
			li, di, dl, button;

		// Dispose the actions toolbar (todo: dispose only not used buttons)
		for (di = 0, dl = this._actionButtons.length; di < dl; di++) {
			this._disposeButton(this._actionButtons[di].button, this._actionButtons[di].callback);
		}
		this._actionButtons = [];

		// Remove all old buttons
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		for (var i = 0; i < l; i++) {
			if ('enabled' in buttons[i] && !buttons[i].enabled) {
				continue;
			}

			li = L.DomUtil.create('li', '', container);

			button = this._createButton({
				title: buttons[i].title,
				text: buttons[i].text,
				container: li,
				callback: buttons[i].callback,
				context: buttons[i].context
			});

			this._actionButtons.push({
				button: button,
				callback: buttons[i].callback
			});
		}
	},

	_showActionsToolbar: function () {
		var buttonIndex = this._activeMode.buttonIndex,
			lastButtonIndex = this._lastButtonIndex,
			toolbarPosition = this._activeMode.button.offsetTop - 1;

		// Recreate action buttons on every click
		this._createActions(this._activeMode.handler);

		// Correctly position the cancel button
		this._actionsContainer.style.top = toolbarPosition + 'px';

		if (buttonIndex === 0) {
			L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop');
			L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-top');
		}

		if (buttonIndex === lastButtonIndex) {
			L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom');
			L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
		}

		this._actionsContainer.style.display = 'block';
	},

	_hideActionsToolbar: function () {
		this._actionsContainer.style.display = 'none';

		L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop');
		L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom');
		L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-top');
		L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
	}
});


L.Tooltip = L.Class.extend({
	initialize: function (map) {
		this._map = map;
		this._popupPane = map._panes.popupPane;

		this._container = map.options.drawControlTooltips ? L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null;
		this._singleLineLabel = false;

		this._map.on('mouseout', this._onMouseOut, this);
	},

	dispose: function () {
		this._map.off('mouseout', this._onMouseOut, this);

		if (this._container) {
			this._popupPane.removeChild(this._container);
			this._container = null;
		}
	},

	updateContent: function (labelText) {
		if (!this._container) {
			return this;
		}
		labelText.subtext = labelText.subtext || '';

		// update the vertical position (only if changed)
		if (labelText.subtext.length === 0 && !this._singleLineLabel) {
			L.DomUtil.addClass(this._container, 'leaflet-draw-tooltip-single');
			this._singleLineLabel = true;
		}
		else if (labelText.subtext.length > 0 && this._singleLineLabel) {
			L.DomUtil.removeClass(this._container, 'leaflet-draw-tooltip-single');
			this._singleLineLabel = false;
		}

		this._container.innerHTML =
			(labelText.subtext.length > 0 ? '<span class="leaflet-draw-tooltip-subtext">' + labelText.subtext + '</span>' + '<br />' : '') +
			'<span>' + labelText.text + '</span>';

		return this;
	},

	updatePosition: function (latlng) {
		var pos = this._map.latLngToLayerPoint(latlng),
			tooltipContainer = this._container;

		if (this._container) {
			tooltipContainer.style.visibility = 'inherit';
			L.DomUtil.setPosition(tooltipContainer, pos);
		}

		return this;
	},

	showAsError: function () {
		if (this._container) {
			L.DomUtil.addClass(this._container, 'leaflet-error-draw-tooltip');
		}
		return this;
	},

	removeError: function () {
		if (this._container) {
			L.DomUtil.removeClass(this._container, 'leaflet-error-draw-tooltip');
		}
		return this;
	},

	_onMouseOut: function () {
		if (this._container) {
			this._container.style.visibility = 'hidden';
		}
	}
});


L.DrawToolbar = L.Toolbar.extend({

	statics: {
		TYPE: 'draw'
	},

	options: {
		polyline: {},
		polygon: {},
		rectangle: {},
		circle: {},
		marker: {}
	},

	initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-draw-draw';
		L.Toolbar.prototype.initialize.call(this, options);
	},

	getModeHandlers: function (map) {
		return [
			{
				enabled: this.options.polyline,
				handler: new L.Draw.Polyline(map, this.options.polyline),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.polygon,
				handler: new L.Draw.Polygon(map, this.options.polygon),
				title: L.drawLocal.draw.toolbar.buttons.polygon
			},
			{
				enabled: this.options.rectangle,
				handler: new L.Draw.Rectangle(map, this.options.rectangle),
				title: L.drawLocal.draw.toolbar.buttons.rectangle
			},
			{
				enabled: this.options.circle,
				handler: new L.Draw.Circle(map, this.options.circle),
				title: L.drawLocal.draw.toolbar.buttons.circle
			},
			{
				enabled: this.options.marker,
				handler: new L.Draw.Marker(map, this.options.marker),
				title: L.drawLocal.draw.toolbar.buttons.marker
			}
		];
	},

	// Get the actions part of the toolbar
	getActions: function (handler) {
		return [
			{
				enabled: handler.completeShape,
				title: L.drawLocal.draw.toolbar.finish.title,
				text: L.drawLocal.draw.toolbar.finish.text,
				callback: handler.completeShape,
				context: handler
			},
			{
				enabled: handler.deleteLastVertex,
				title: L.drawLocal.draw.toolbar.undo.title,
				text: L.drawLocal.draw.toolbar.undo.text,
				callback: handler.deleteLastVertex,
				context: handler
			},
			{
				title: L.drawLocal.draw.toolbar.actions.title,
				text: L.drawLocal.draw.toolbar.actions.text,
				callback: this.disable,
				context: this
			}
		];
	},

	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options[type]);
			}
		}
	}
});


/*L.Map.mergeOptions({
	editControl: true
});*/

L.EditToolbar = L.Toolbar.extend({
	statics: {
		TYPE: 'edit'
	},

	options: {
		edit: {
			selectedPathOptions: {
				dashArray: '10, 10',

				fill: true,
				fillColor: '#fe57a1',
				fillOpacity: 0.1,

				// Whether to user the existing layers color
				maintainColor: false
			}
		},
		remove: {},
		poly: null,
		featureGroup: null /* REQUIRED! TODO: perhaps if not set then all layers on the map are selectable? */
	},

	initialize: function (options) {
		// Need to set this manually since null is an acceptable value here
		if (options.edit) {
			if (typeof options.edit.selectedPathOptions === 'undefined') {
				options.edit.selectedPathOptions = this.options.edit.selectedPathOptions;
			}
			options.edit.selectedPathOptions = L.extend({}, this.options.edit.selectedPathOptions, options.edit.selectedPathOptions);
		}

		if (options.remove) {
			options.remove = L.extend({}, this.options.remove, options.remove);
		}

		if (options.poly) {
			options.poly = L.extend({}, this.options.poly, options.poly);
		}

		this._toolbarClass = 'leaflet-draw-edit';
		L.Toolbar.prototype.initialize.call(this, options);

		this._selectedFeatureCount = 0;
	},

	getModeHandlers: function (map) {
		var featureGroup = this.options.featureGroup;
		return [
			{
				enabled: this.options.edit,
				handler: new L.EditToolbar.Edit(map, {
					featureGroup: featureGroup,
					selectedPathOptions: this.options.edit.selectedPathOptions,
					poly : this.options.poly
				}),
				title: L.drawLocal.edit.toolbar.buttons.edit
			},
			{
				enabled: this.options.remove,
				handler: new L.EditToolbar.Delete(map, {
					featureGroup: featureGroup
				}),
				title: L.drawLocal.edit.toolbar.buttons.remove
			}
		];
	},

	getActions: function () {
		return [
			{
				title: L.drawLocal.edit.toolbar.actions.save.title,
				text: L.drawLocal.edit.toolbar.actions.save.text,
				callback: this._save,
				context: this
			},
			{
				title: L.drawLocal.edit.toolbar.actions.cancel.title,
				text: L.drawLocal.edit.toolbar.actions.cancel.text,
				callback: this.disable,
				context: this
			}
		];
	},

	addToolbar: function (map) {
		var container = L.Toolbar.prototype.addToolbar.call(this, map);

		this._checkDisabled();

		this.options.featureGroup.on('layeradd layerremove', this._checkDisabled, this);

		return container;
	},

	removeToolbar: function () {
		this.options.featureGroup.off('layeradd layerremove', this._checkDisabled, this);

		L.Toolbar.prototype.removeToolbar.call(this);
	},

	disable: function () {
		if (!this.enabled()) { return; }

		this._activeMode.handler.revertLayers();

		L.Toolbar.prototype.disable.call(this);
	},

	_save: function () {
		this._activeMode.handler.save();
		this._activeMode.handler.disable();
	},

	_checkDisabled: function () {
		var featureGroup = this.options.featureGroup,
			hasLayers = featureGroup.getLayers().length !== 0,
			button;

		if (this.options.edit) {
			button = this._modes[L.EditToolbar.Edit.TYPE].button;

			if (hasLayers) {
				L.DomUtil.removeClass(button, 'leaflet-disabled');
			} else {
				L.DomUtil.addClass(button, 'leaflet-disabled');
			}

			button.setAttribute(
				'title',
				hasLayers ?
				L.drawLocal.edit.toolbar.buttons.edit
				: L.drawLocal.edit.toolbar.buttons.editDisabled
			);
		}

		if (this.options.remove) {
			button = this._modes[L.EditToolbar.Delete.TYPE].button;

			if (hasLayers) {
				L.DomUtil.removeClass(button, 'leaflet-disabled');
			} else {
				L.DomUtil.addClass(button, 'leaflet-disabled');
			}

			button.setAttribute(
				'title',
				hasLayers ?
				L.drawLocal.edit.toolbar.buttons.remove
				: L.drawLocal.edit.toolbar.buttons.removeDisabled
			);
		}
	}
});


L.EditToolbar.Edit = L.Handler.extend({
	statics: {
		TYPE: 'edit'
	},

	includes: L.Mixin.Events,

	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._featureGroup = options.featureGroup;

		if (!(this._featureGroup instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		this._uneditedLayerProps = {};

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Edit.TYPE;
	},

	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', {handler: this.type});
			//this disable other handlers

		this._map.fire('draw:editstart', { handler: this.type });
			//allow drawLayer to be updated before beginning edition.

		L.Handler.prototype.enable.call(this);
		this._featureGroup
			.on('layeradd', this._enableLayerEdit, this)
			.on('layerremove', this._disableLayerEdit, this);
	},

	disable: function () {
		if (!this._enabled) { return; }
		this._featureGroup
			.off('layeradd', this._enableLayerEdit, this)
			.off('layerremove', this._disableLayerEdit, this);
		L.Handler.prototype.disable.call(this);
		this._map.fire('draw:editstop', { handler: this.type });
		this.fire('disabled', {handler: this.type});
	},

	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._featureGroup.eachLayer(this._enableLayerEdit, this);

			this._tooltip = new L.Tooltip(this._map);
			this._tooltip.updateContent({
				text: L.drawLocal.edit.handlers.edit.tooltip.text,
				subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
			});

			// Quickly access the tooltip to update for intersection checking
			map._editTooltip = this._tooltip;

			this._updateTooltip();

			this._map
				.on('mousemove', this._onMouseMove, this)
				.on('touchmove', this._onMouseMove, this)
				.on('MSPointerMove', this._onMouseMove, this)
				.on('click', this._editStyle, this)
				.on('draw:editvertex', this._updateTooltip, this);
		}
	},

	removeHooks: function () {
		if (this._map) {
			// Clean up selected layers.
			this._featureGroup.eachLayer(this._disableLayerEdit, this);

			// Clear the backups of the original layers
			this._uneditedLayerProps = {};

			this._tooltip.dispose();
			this._tooltip = null;

			this._map
				.off('mousemove', this._onMouseMove, this)
				.off('touchmove', this._onMouseMove, this)
				.off('MSPointerMove', this._onMouseMove, this)
				.off('click', this._editStyle, this)
				.off('draw:editvertex', this._updateTooltip, this);
		}
	},

	revertLayers: function () {
		this._featureGroup.eachLayer(function (layer) {
			this._revertLayer(layer);
		}, this);
	},

	save: function () {
		var editedLayers = new L.LayerGroup();
		this._featureGroup.eachLayer(function (layer) {
			if (layer.edited) {
				editedLayers.addLayer(layer);
				layer.edited = false;
			}
		});
		this._map.fire('draw:edited', {layers: editedLayers});
	},

	_backupLayer: function (layer) {
		var id = L.Util.stamp(layer);

		if (!this._uneditedLayerProps[id]) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				this._uneditedLayerProps[id] = {
					latlngs: L.LatLngUtil.cloneLatLngs(layer.getLatLngs())
				};
			} else if (layer instanceof L.Circle) {
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng()),
					radius: layer.getRadius()
				};
			} else if (layer instanceof L.Marker) { // Marker
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng())
				};
			}
		}
	},

	_getTooltipText: function () {
		return ({
			text: L.drawLocal.edit.handlers.edit.tooltip.text,
			subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
		});
	},

	_updateTooltip: function () {
		this._tooltip.updateContent(this._getTooltipText());
	},

	_revertLayer: function (layer) {
		var id = L.Util.stamp(layer);
		layer.edited = false;
		if (this._uneditedLayerProps.hasOwnProperty(id)) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				layer.setLatLngs(this._uneditedLayerProps[id].latlngs);
			} else if (layer instanceof L.Circle) {
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
				layer.setRadius(this._uneditedLayerProps[id].radius);
			} else if (layer instanceof L.Marker) { // Marker
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
			}

			layer.fire('revert-edited', { layer: layer });
		}
	},

	_enableLayerEdit: function (e) {
		var layer = e.layer || e.target || e,
			pathOptions, poly;

		// Back up this layer (if haven't before)
		this._backupLayer(layer);

		if (this.options.poly) {
			poly = L.Util.extend({}, this.options.poly);
			layer.options.poly = poly;
		}

		// Set different style for editing mode
		if (this.options.selectedPathOptions) {
			pathOptions = L.Util.extend({}, this.options.selectedPathOptions);

			// Use the existing color of the layer
			if (pathOptions.maintainColor) {
				pathOptions.color = layer.options.color;
				pathOptions.fillColor = layer.options.fillColor;
			}

			layer.options.original = L.extend({}, layer.options);
			layer.options.editing = pathOptions;

		}

		if (this.isMarker) {
			layer.dragging.enable();
			layer
				.on('dragend', this._onMarkerDragEnd)
				// #TODO: remove when leaflet finally fixes their draggable so it's touch friendly again.
				.on('touchmove', this._onTouchMove, this)
				.on('MSPointerMove', this._onTouchMove, this)
				.on('touchend', this._onMarkerDragEnd, this)
				.on('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.enable();
		}
	},

	_disableLayerEdit: function (e) {
		var layer = e.layer || e.target || e;

		layer.edited = false;
		layer.editing.disable();

		delete layer.options.editing;
		delete layer.options.original;
		// Reset layer styles to that of before select
		if (this._selectedPathOptions) {
			if (layer instanceof L.Marker) {
				this._toggleMarkerHighlight(layer);
			} else {
				// reset the layer style to what is was before being selected
				layer.setStyle(layer.options.previousOptions);
				// remove the cached options for the layer object
				delete layer.options.previousOptions;
			}
		}

		if (layer instanceof L.Marker) {
			layer.dragging.disable();
			layer
				.off('dragend', this._onMarkerDragEnd, this)
				.off('touchmove', this._onTouchMove, this)
				.off('MSPointerMove', this._onTouchMove, this)
				.off('touchend', this._onMarkerDragEnd, this)
				.off('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.disable();
		}
	},

	_onMouseMove: function (e) {
		this._tooltip.updatePosition(e.latlng);
	},

	_onTouchMove: function (e) {
		var touchEvent = e.originalEvent.changedTouches[0],
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);
		e.target.setLatLng(latlng);
	},

	_hasAvailableLayers: function () {
		return this._featureGroup.getLayers().length !== 0;
	}
});


L.EditToolbar.Delete = L.Handler.extend({
	statics: {
		TYPE: 'remove' // not delete as delete is reserved in js
	},

	includes: L.Mixin.Events,

	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.Util.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._deletableLayers = this.options.featureGroup;

		if (!(this._deletableLayers instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Delete.TYPE;
	},

	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', { handler: this.type});

		this._map.fire('draw:deletestart', { handler: this.type });

		L.Handler.prototype.enable.call(this);

		this._deletableLayers
			.on('layeradd', this._enableLayerDelete, this)
			.on('layerremove', this._disableLayerDelete, this);
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._deletableLayers
			.off('layeradd', this._enableLayerDelete, this)
			.off('layerremove', this._disableLayerDelete, this);

		L.Handler.prototype.disable.call(this);

		this._map.fire('draw:deletestop', { handler: this.type });

		this.fire('disabled', { handler: this.type});
	},

	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._deletableLayers.eachLayer(this._enableLayerDelete, this);
			this._deletedLayers = new L.LayerGroup();

			this._tooltip = new L.Tooltip(this._map);
			this._tooltip.updateContent({ text: L.drawLocal.edit.handlers.remove.tooltip.text });

			this._map.on('mousemove', this._onMouseMove, this);
		}
	},

	removeHooks: function () {
		if (this._map) {
			this._deletableLayers.eachLayer(this._disableLayerDelete, this);
			this._deletedLayers = null;

			this._tooltip.dispose();
			this._tooltip = null;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	revertLayers: function () {
		// Iterate of the deleted layers and add them back into the featureGroup
		this._deletedLayers.eachLayer(function (layer) {
			this._deletableLayers.addLayer(layer);
			layer.fire('revert-deleted', { layer: layer });
		}, this);
	},

	save: function () {
		this._map.fire('draw:deleted', { layers: this._deletedLayers });
	},

	_enableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.on('click', this._removeLayer, this);
	},

	_disableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.off('click', this._removeLayer, this);

		// Remove from the deleted layers so we can't accidentally revert if the user presses cancel
		this._deletedLayers.removeLayer(layer);
	},

	_removeLayer: function (e) {
		var layer = e.layer || e.target || e;

		this._deletableLayers.removeLayer(layer);

		this._deletedLayers.addLayer(layer);

		layer.fire('deleted');
	},

	_onMouseMove: function (e) {
		this._tooltip.updatePosition(e.latlng);
	},

	_hasAvailableLayers: function () {
		return this._deletableLayers.getLayers().length !== 0;
	}
});


}(window, document));

});

;/*!/component_modules/leaflet.zoomify.js*/
define('component_modules/leaflet.zoomify', function(require, exports, module) {

/*
 * L.TileLayer.Zoomify display Zoomify tiles with Leaflet
 */

var L = require("component_modules/leaflet-src.js");

L.TileLayer.Zoomify = L.TileLayer.extend({
    options: {
        continuousWorld: true,
        tolerance: 0.8
    },

    initialize: function (url, options) {
        options = L.setOptions(this, options);
        this._url = url;

        var imageSize = L.point(options.width, options.height),
            tileSize = options.tileSize;

        this._imageSize = [imageSize];
        this._gridSize = [this._getGridSize(imageSize)];

        while (parseInt(imageSize.x) > tileSize || parseInt(imageSize.y) > tileSize) {
            imageSize = imageSize.divideBy(2).floor();
            this._imageSize.push(imageSize);
            this._gridSize.push(this._getGridSize(imageSize));
        }

        this._imageSize.reverse();
        this._gridSize.reverse();

        this.options.maxZoom = this._gridSize.length - 1;
    },

    onAdd: function (map) {
        L.TileLayer.prototype.onAdd.call(this, map);

        var mapSize = map.getSize(),
            zoom = this._getBestFitZoom(mapSize),
            imageSize = this._imageSize[zoom],
            center = map.options.crs.pointToLatLng(L.point(imageSize.x / 2, imageSize.y / 2), zoom);

        map.setView(center, zoom, true);
    },

    _getGridSize: function (imageSize) {
        var tileSize = this.options.tileSize;
        return L.point(Math.ceil(imageSize.x / tileSize), Math.ceil(imageSize.y / tileSize));
    },

    _getBestFitZoom: function (mapSize) {
        var tolerance = this.options.tolerance,
            zoom = this._imageSize.length - 1,
            imageSize, zoom;

        while (zoom) {
            imageSize = this._imageSize[zoom];
            if (imageSize.x * tolerance < mapSize.x && imageSize.y * tolerance < mapSize.y) {
                return zoom;
            }
            zoom--;
        }

        return zoom;
    },

    _tileShouldBeLoaded: function (tilePoint) {
        var gridSize = this._gridSize[this._map.getZoom()];
        return (tilePoint.x >= 0 && tilePoint.x < gridSize.x && tilePoint.y >= 0 && tilePoint.y < gridSize.y);
    },

    _addTile: function (tilePoint, container) {
        var tilePos = this._getTilePos(tilePoint),
            tile = this._getTile(),
            zoom = this._map.getZoom(),
            imageSize = this._imageSize[zoom],
            gridSize = this._gridSize[zoom],
            tileSize = this.options.tileSize;

        if (tilePoint.x === gridSize.x - 1) {
            tile.style.width = imageSize.x - (tileSize * (gridSize.x - 1)) + 'px';
        }

        if (tilePoint.y === gridSize.y - 1) {
            tile.style.height = imageSize.y - (tileSize * (gridSize.y - 1)) + 'px';
        }

        L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome || L.Browser.android23);

        this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;
        this._loadTile(tile, tilePoint);

        if (tile.parentNode !== this._tileContainer) {
            container.appendChild(tile);
        }
    },

    getTileUrl: function (tilePoint) {
        return this._url + 'TileGroup' + this._getTileGroup(tilePoint) + '/' + this._map.getZoom() + '-' + tilePoint.x + '-' + tilePoint.y + '.jpg';
    },

    _getTileGroup: function (tilePoint) {
        var zoom = this._map.getZoom(),
            num = 0,
            gridSize;

        for (z = 0; z < zoom; z++) {
            gridSize = this._gridSize[z];
            num += gridSize.x * gridSize.y;
        }

        num += tilePoint.y * this._gridSize[zoom].x + tilePoint.x;
        return Math.floor(num / 256);;
    }

});

L.tileLayer.zoomify = function (url, options) {
    return new L.TileLayer.Zoomify(url, options);
};

});

;/*!/component_modules/mui.dtpicker.js*/
/**
 * 日期时间插件
 * varstion 1.0.5
 * by Houfeng
 * Houfeng@DCloud.io
 */

define('component_modules/dt', function(require, exports, module) {

 require("component_modules/mui");

	/**
	 * 选择列表插件
	 * varstion 2.0.0
	 * by Houfeng
	 * Houfeng@DCloud.io
	 */

	(function($, window, document, undefined) {

		var MAX_EXCEED = 30;
		var VISIBLE_RANGE = 90;
		var DEFAULT_ITEM_HEIGHT = 40;
		var BLUR_WIDTH = 10;

		var rad2deg = $.rad2deg = function(rad) {
			return rad / (Math.PI / 180);
		};

		var deg2rad = $.deg2rad = function(deg) {
			return deg * (Math.PI / 180);
		};

		var platform = navigator.platform.toLowerCase();
		var userAgent = navigator.userAgent.toLowerCase();
		var isIos = (userAgent.indexOf('iphone') > -1 ||
			userAgent.indexOf('ipad') > -1 ||
			userAgent.indexOf('ipod') > -1) &&
			(platform.indexOf('iphone') > -1 ||
			platform.indexOf('ipad') > -1 ||
			platform.indexOf('ipod') > -1);
		//alert(isIos);

		var Picker = $.Picker = function(holder, options) {
			var self = this;
			self.holder = holder;
			self.options = options || {};
			self.init();
			self.initInertiaParams();
			self.calcElementItemPostion(true);
			self.bindEvent();
		};

		Picker.prototype.findElementItems = function() {
			var self = this;
			self.elementItems = [].slice.call(self.holder.querySelectorAll('li'));
			return self.elementItems;
		};

		Picker.prototype.init = function() {
			var self = this;
			self.list = self.holder.querySelector('ul');
			self.findElementItems();
			self.height = self.holder.offsetHeight;
			self.r = self.height / 2 - BLUR_WIDTH;
			self.d = self.r * 2;
			self.itemHeight = self.elementItems.length > 0 ? self.elementItems[0].offsetHeight : DEFAULT_ITEM_HEIGHT;
			self.itemAngle = parseInt(self.calcAngle(self.itemHeight * 0.8));
			self.hightlightRange = self.itemAngle / 2;
			self.visibleRange = VISIBLE_RANGE;
			self.beginAngle = 0;
			self.beginExceed = self.beginAngle - MAX_EXCEED;
			self.list.angle = self.beginAngle;
			if (isIos) {
				self.list.style.webkitTransformOrigin = "center center " + self.r + "px";
			}
		};

		Picker.prototype.calcElementItemPostion = function(andGenerateItms) {
			var self = this;
			if (andGenerateItms) {
				self.items = [];
			}
			self.elementItems.forEach(function(item) {
				var index = self.elementItems.indexOf(item);
				self.endAngle = self.itemAngle * index;
				item.angle = self.endAngle;
				item.style.webkitTransformOrigin = "center center -" + self.r + "px";
				item.style.webkitTransform = "translateZ(" + self.r + "px) rotateX(" + (-self.endAngle) + "deg)";
				if (andGenerateItms) {
					var dataItem = {};
					dataItem.text = item.innerHTML || '';
					dataItem.value = item.getAttribute('data-value') || dataItem.text;
					self.items.push(dataItem);
				}
			});
			self.endExceed = self.endAngle + MAX_EXCEED;
			self.calcElementItemVisibility(self.beginAngle);
		};

		Picker.prototype.calcAngle = function(c) {
			var self = this;
			var a = b = parseFloat(self.r);
			//直径的整倍数部分直接乘以 180
			c = Math.abs(c); //只算角度不关心正否值
			var intDeg = parseInt(c / self.d) * 180;
			c = c % self.d;
			//余弦
			var cosC = (a * a + b * b - c * c) / (2 * a * b);
			var angleC = intDeg + rad2deg(Math.acos(cosC));
			return angleC;
		};

		Picker.prototype.calcElementItemVisibility = function(angle) {
			var self = this;
			self.elementItems.forEach(function(item) {
				var difference = Math.abs(item.angle - angle);
				if (difference < self.hightlightRange) {
					item.classList.add('highlight');
				} else if (difference < self.visibleRange) {
					item.classList.add('visible');
					item.classList.remove('highlight');
				} else {
					item.classList.remove('highlight');
					item.classList.remove('visible');
				}
			});
		};

		Picker.prototype.setAngle = function(angle) {
			var self = this;
			self.list.angle = angle;
			self.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + angle + "deg)";
			self.calcElementItemVisibility(angle);
		};

		Picker.prototype.bindEvent = function() {
			var self = this;
			var lastAngle = 0;
			var startY = null;
			self.holder.addEventListener('touchstart', function(event) {
				event.preventDefault();
				self.list.style.webkitTransition = '';
				startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
				lastAngle = self.list.angle;
				self.updateInertiaParams(event, true);
			}, false);
			self.holder.addEventListener('touchend', function(event) {
				event.preventDefault();
				self.startInertiaScroll(event);
			}, false);
			self.holder.addEventListener('touchcancel', function(event) {
				event.preventDefault();
				self.startInertiaScroll(event);
			}, false);
			self.holder.addEventListener('touchmove', function(event) {
				event.preventDefault();
				var endY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
				var dragRange = endY - startY;
				var dragAngle = self.calcAngle(dragRange);
				var newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle;
				if (newAngle > self.endExceed) {
					newAngle = self.endExceed
				}
				if (newAngle < self.beginExceed) {
					newAngle = self.beginExceed
				}
				self.setAngle(newAngle);
				self.updateInertiaParams(event);
			}, false);
			//--
			self.list.addEventListener('tap', function(event) {
				elementItem = event.target;
				if (elementItem.tagName == 'LI') {
					self.setSelectedIndex(self.elementItems.indexOf(elementItem), 200);
				}
			}, false);
		};

		Picker.prototype.initInertiaParams = function() {
			var self = this;
			self.lastMoveTime = 0;
			self.lastMoveStart = 0;
			self.stopInertiaMove = false;
		};

		Picker.prototype.updateInertiaParams = function(event, isStart) {
			var self = this;
			var point = event.changedTouches ? event.changedTouches[0] : event;
			if (isStart) {
				self.lastMoveStart = point.pageY;
				self.lastMoveTime = event.timeStamp || Date.now();
				self.startAngle = self.list.angle;
			} else {
				var nowTime = event.timeStamp || Date.now();
				if (nowTime - self.lastMoveTime > 300) {
					self.lastMoveTime = nowTime;
					self.lastMoveStart = point.pageY;
				}
			}
			self.stopInertiaMove = true;
		};

		Picker.prototype.startInertiaScroll = function(event) {
			var self = this;
			var point = event.changedTouches ? event.changedTouches[0] : event;
			/**
			 * 缓动代码
			 */
			var nowTime = event.timeStamp || Date.now();
			var v = (point.pageY - self.lastMoveStart) / (nowTime - self.lastMoveTime); //最后一段时间手指划动速度
			var dir = v > 0 ? -1 : 1; //加速度方向
			var deceleration = dir * 0.0006 * -1;
			var duration = Math.abs(v / deceleration); // 速度消减至0所需时间
			var dist = v * duration / 2; //最终移动多少
			var startAngle = self.list.angle;
			var distAngle = self.calcAngle(dist) * dir;
			//----
			var srcDistAngle = distAngle;
			if (startAngle + distAngle < self.beginExceed) {
				distAngle = self.beginExceed - startAngle;
				duration = duration * (distAngle / srcDistAngle) * 0.6;
			}
			if (startAngle + distAngle > self.endExceed) {
				distAngle = self.endExceed - startAngle;
				duration = duration * (distAngle / srcDistAngle) * 0.6;
			}
			//----
			if (distAngle == 0) {
				self.endScroll();
				return;
			}
			self.scrollDistAngle(nowTime, startAngle, distAngle, duration);
		};

		Picker.prototype.scrollDistAngle = function(nowTime, startAngle, distAngle, duration) {
			var self = this;
			self.stopInertiaMove = false;
			(function(nowTime, startAngle, distAngle, duration) {
				var frameInterval = 13;
				var stepCount = duration / frameInterval;
				var stepIndex = 0;
				(function inertiaMove() {
					if (self.stopInertiaMove) return;
					var newAngle = self.quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
					self.setAngle(newAngle);
					stepIndex++;
					if (stepIndex > stepCount - 1 || newAngle < self.beginExceed || newAngle > self.endExceed) {
						self.endScroll();
						return;
					}
					setTimeout(inertiaMove, frameInterval);
				})();
			})(nowTime, startAngle, distAngle, duration);
		};

		Picker.prototype.quartEaseOut = function(t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		};

		Picker.prototype.endScroll = function() {
			var self = this;
			if (self.list.angle < self.beginAngle) {
				self.list.style.webkitTransition = "150ms ease-out";
				self.setAngle(self.beginAngle);
			} else if (self.list.angle > self.endAngle) {
				self.list.style.webkitTransition = "150ms ease-out";
				self.setAngle(self.endAngle);
			} else {
				var index = parseInt((self.list.angle / self.itemAngle).toFixed(0));
				self.list.style.webkitTransition = "100ms ease-out";
				self.setAngle(self.itemAngle * index);
			}
			self.triggerChange();
		};

		Picker.prototype.triggerChange = function(force) {
			var self = this;
			setTimeout(function() {
				var index = self.getSelectedIndex();
				var item = self.items[index];
				if ($.trigger && (index != self.lastIndex || force)) {
					$.trigger(self.holder, 'change', {
						"index": index,
						"item": item
					});
					//console.log('change:' + index);
				}
				self.lastIndex = index;
			}, 0);
		};

		Picker.prototype.correctAngle = function(angle) {
			var self = this;
			if (angle < self.beginAngle) {
				return self.beginAngle;
			} else if (angle > self.endAngle) {
				return self.endAngle;
			} else {
				return angle;
			}
		};

		Picker.prototype.setItems = function(items) {
			var self = this;
			self.items = items || [];
			var buffer = [];
			self.items.forEach(function(item) {
				if (item !== null && item !== undefined) {
					buffer.push('<li>' + (item.text || item) + '</li>');
				}
			});
			self.list.innerHTML = buffer.join('');
			self.findElementItems();
			self.calcElementItemPostion();
			self.setAngle(self.correctAngle(self.list.angle));
			self.triggerChange(true);
		};

		Picker.prototype.getItems = function() {
			var self = this;
			return self.items;
		};

		Picker.prototype.getSelectedIndex = function() {
			var self = this;
			return parseInt((self.list.angle / self.itemAngle).toFixed(0));
		};

		Picker.prototype.setSelectedIndex = function(index, duration) {
			var self = this;
			self.list.style.webkitTransition = '';
			var angle = self.correctAngle(self.itemAngle * index);
			if (duration && duration > 0) {
				var distAngle = angle - self.list.angle;
				self.scrollDistAngle(Date.now(), self.list.angle, distAngle, duration);
			} else {
				self.setAngle(angle);
			}
			self.triggerChange();
		};

		Picker.prototype.getSelectedItem = function() {
			var self = this;
			return self.items[self.getSelectedIndex()];
		};

		Picker.prototype.getSelectedValue = function() {
			var self = this;
			return (self.items[self.getSelectedIndex()] || {}).value;
		};

		Picker.prototype.getSelectedText = function() {
			var self = this;
			return (self.items[self.getSelectedIndex()] || {}).text;
		};

		Picker.prototype.setSelectedValue = function(value, duration) {
			var self = this;
			for (var index in self.items) {
				var item = self.items[index];
				if (item.value == value) {
					self.setSelectedIndex(index, duration);
					return;
				}
			}
		};

		if ($.fn) {
			$.fn.picker = function(options) {
				//遍历选择的元素
				this.each(function(i, element) {
					if (element.picker) return;
					if (options) {
						element.picker = new Picker(element, options);
					} else {
						var optionsText = element.getAttribute('data-picker-options');
						var _options = optionsText ? JSON.parse(optionsText) : {};
						element.picker = new Picker(element, _options);
					}
				});
				return this[0] ? this[0].picker : null;
			};

			//自动初始化
			$.ready(function() {
				$('.mui-picker').picker();
			});
		}

	})(window.mui || window, window, document, undefined);
//end
	/**
	 * 弹出选择列表插件
	 * 此组件依赖 listpcker ，请在页面中先引入 mui.picker.css + mui.picker.js
	 * varstion 1.0.1
	 * by Houfeng
	 * Houfeng@DCloud.io
	 */

	(function($, document) {

		//创建 DOM
		$.dom = function(str) {
			if (typeof(str) !== 'string') {
				if ((str instanceof Array) || (str[0] && str.length)) {
					return [].slice.call(str);
				} else {
					return [str];
				}
			}
			if (!$.__create_dom_div__) {
				$.__create_dom_div__ = document.createElement('div');
			}
			$.__create_dom_div__.innerHTML = str;
			return [].slice.call($.__create_dom_div__.childNodes);
		};

		var panelBuffer = '<div class="mui-poppicker">\
		<div class="mui-poppicker-header">\
			<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\
			<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>\
			<div class="mui-poppicker-clear"></div>\
		</div>\
		<div class="mui-poppicker-body">\
		</div>\
	</div>';

		var pickerBuffer = '<div class="mui-picker">\
		<div class="mui-picker-inner">\
			<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
			<ul class="mui-pciker-list">\
			</ul>\
			<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
		</div>\
	</div>';

		//定义弹出选择器类
		var PopPicker = $.PopPicker = $.Class.extend({
			//构造函数
			init: function(options) {
				var self = this;
				self.options = options || {};
				self.options.buttons = self.options.buttons || ['取消', '确定'];
				self.panel = $.dom(panelBuffer)[0];
				document.body.appendChild(self.panel);
				self.ok = self.panel.querySelector('.mui-poppicker-btn-ok');
				self.cancel = self.panel.querySelector('.mui-poppicker-btn-cancel');
				self.body = self.panel.querySelector('.mui-poppicker-body');
				self.mask = $.createMask();
				self.cancel.innerText = self.options.buttons[0];
				self.ok.innerText = self.options.buttons[1];
				self.cancel.addEventListener('tap', function(event) {
					self.hide();
				}, false);
				self.ok.addEventListener('tap', function(event) {
					if (self.callback) {
						var rs = self.callback(self.getSelectedItems());
						if (rs !== false) {
							self.hide();
						}
					}
				}, false);
				self.mask[0].addEventListener('tap', function() {
					self.hide();
				}, false);
				self._createPicker();
				//防止滚动穿透
				self.panel.addEventListener('touchstart', function(event) {
					event.preventDefault();
				}, false);
				self.panel.addEventListener('touchmove', function(event) {
					event.preventDefault();
				}, false);
			},
			_createPicker: function() {
				var self = this;
				var layer = self.options.layer || 1;
				var width = (100 / layer) + '%';
				self.pickers = [];
				for (var i = 1; i <= layer; i++) {
					var pickerElement = $.dom(pickerBuffer)[0];
					pickerElement.style.width = width;
					self.body.appendChild(pickerElement);
					var picker = $(pickerElement).picker();
					self.pickers.push(picker);
					pickerElement.addEventListener('change', function(event) {
						var nextPickerElement = this.nextSibling;
						if (nextPickerElement && nextPickerElement.picker) {
							var eventData = event.detail || {};
							var preItem = eventData.item || {};
							nextPickerElement.picker.setItems(preItem.children);
						}
					}, false);
				}
			},
			//填充数据
			setData: function(data) {
				var self = this;
				data = data || [];
				self.pickers[0].setItems(data);
			},
			//获取选中的项（数组）
			getSelectedItems: function() {
				var self = this;
				var items = [];
				for (var i in self.pickers) {
					var picker = self.pickers[i];
					items.push(picker.getSelectedItem() || {});
				}
				return items;
			},
			//显示
			show: function(callback) {
				var self = this;
				self.callback = callback;
				self.mask.show();
				document.body.classList.add($.className('poppicker-active-for-page'));
				self.panel.classList.add($.className('active'));
				//处理物理返回键
				self.__back = $.back;
				$.back = function() {
					self.hide();
				};
			},
			//隐藏
			hide: function() {
				var self = this;
				if (self.disposed) return;
				self.panel.classList.remove($.className('active'));
				self.mask.close();
				document.body.classList.remove($.className('poppicker-active-for-page'));
				//处理物理返回键
				$.back=self.__back;
			},
			dispose: function() {
				var self = this;
				self.hide();
				setTimeout(function() {
					self.panel.parentNode.removeChild(self.panel);
					for (var name in self) {
						self[name] = null;
						delete self[name];
					};
					self.disposed = true;
				}, 300);
			}
		});

	})(mui, document);
	/**
	 * 日期时间插件
	 * varstion 1.0.5
	 * by Houfeng
	 * Houfeng@DCloud.io
	 */

	(function($, document) {

		//创建 DOM
		$.dom = function(str) {
			if (typeof(str) !== 'string') {
				if ((str instanceof Array) || (str[0] && str.length)) {
					return [].slice.call(str);
				} else {
					return [str];
				}
			}
			if (!$.__create_dom_div__) {
				$.__create_dom_div__ = document.createElement('div');
			}
			$.__create_dom_div__.innerHTML = str;
			return [].slice.call($.__create_dom_div__.childNodes);
		};

		var domBuffer = '<div class="mui-dtpicker" data-type="datetime">\
		<div class="mui-dtpicker-header">\
			<button data-id="btn-cancel" class="mui-btn">取消</button>\
			<button data-id="btn-ok" class="mui-btn mui-btn-blue">确定</button>\
		</div>\
		<div class="mui-dtpicker-title"><h5 data-id="title-y">年</h5><h5 data-id="title-m">月</h5><h5 data-id="title-d">日</h5><h5 data-id="title-h">时</h5><h5 data-id="title-i">分</h5></div>\
		<div class="mui-dtpicker-body">\
			<div data-id="picker-y" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-m" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-d" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-h" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-i" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
		</div>\
	</div>';

		//plugin
		var DtPicker = $.DtPicker = $.Class.extend({
			init: function(options) {
				var self = this;
				var _picker = $.dom(domBuffer)[0];
				document.body.appendChild(_picker);
				$('[data-id*="picker"]', _picker).picker();
				var ui = self.ui = {
					picker: _picker,
					mask: $.createMask(),
					ok: $('[data-id="btn-ok"]', _picker)[0],
					cancel: $('[data-id="btn-cancel"]', _picker)[0],
					y: $('[data-id="picker-y"]', _picker)[0],
					m: $('[data-id="picker-m"]', _picker)[0],
					d: $('[data-id="picker-d"]', _picker)[0],
					h: $('[data-id="picker-h"]', _picker)[0],
					i: $('[data-id="picker-i"]', _picker)[0],
					labels: $('[data-id*="title-"]', _picker),
				};
				ui.cancel.addEventListener('tap', function() {
					self.hide();
				}, false);
				ui.ok.addEventListener('tap', function() {
					var rs = self.callback(self.getSelected());
					if (rs !== false) {
						self.hide();
					}
				}, false);
				ui.y.addEventListener('change', function() {
					self._createDay();
				}, false);
				ui.m.addEventListener('change', function() {
					self._createDay();
				}, false);
				ui.mask[0].addEventListener('tap', function() {
					self.hide();
				}, false);
				self._create(options);
				//防止滚动穿透
				self.ui.picker.addEventListener('touchstart',function(event){
					event.preventDefault();
				},false);
				self.ui.picker.addEventListener('touchmove',function(event){
					event.preventDefault();
				},false);
			},
			getSelected: function() {
				var self = this;
				var ui = self.ui;
				var type = self.options.type;
				var selected = {
					type: type,
					y: ui.y.picker.getSelectedItem(),
					m: ui.m.picker.getSelectedItem(),
					d: ui.d.picker.getSelectedItem(),
					h: ui.h.picker.getSelectedItem(),
					i: ui.i.picker.getSelectedItem(),
					toString: function() {
						return this.value;
					}
				};
				switch (type) {
					case 'datetime':
						selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value + ' ' + selected.h.value + ':' + selected.i.value;
						selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text + ' ' + selected.h.text + ':' + selected.i.text;
						break;
					case 'date':
						selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value;
						selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text;
						break;
					case 'time':
						selected.value = selected.h.value + ':' + selected.i.value;
						selected.text = selected.h.text + ':' + selected.i.text;
						break;
					case 'month':
						selected.value = selected.y.value + '-' + selected.m.value;
						selected.text = selected.y.text + '-' + selected.m.text;
						break;
					case 'hour':
						selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value + ' ' + selected.h.value;
						selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text + ' ' + selected.h.text;
						break;
				}
				return selected;
			},
			setSelectedValue: function(value) {
				var self = this;
				var ui = self.ui;
				var parsedValue = self._parseValue(value);
				ui.y.picker.setSelectedValue(parsedValue.y, 0);
				ui.m.picker.setSelectedValue(parsedValue.m, 0);
				ui.d.picker.setSelectedValue(parsedValue.d, 0);
				ui.h.picker.setSelectedValue(parsedValue.h, 0);
				ui.i.picker.setSelectedValue(parsedValue.i, 0);
			},
			isLeapYear: function(year) {
				return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
			},
			_inArray: function(array, item) {
				for (var index in array) {
					var _item = array[index];
					if (_item === item) return true;
				}
				return false;
			},
			getDayNum: function(year, month) {
				var self = this;
				if (self._inArray([1, 3, 5, 7, 8, 10, 12], month)) {
					return 31;
				} else if (self._inArray([4, 6, 9, 11], month)) {
					return 30;
				} else if (self.isLeapYear(year)) {
					return 29;
				} else {
					return 28;
				}
			},
			_fill: function(num) {
				num = num.toString();
				if (num.length < 2) {
					num = 0 + num;
				}
				return num;
			},
			_createYear: function(current) {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				//生成年列表
				var yArray = [];
				if (options.customData.y) {
					yArray = options.customData.y;
				} else {
					var yBegin = options.beginYear;
					var yEnd = options.endYear;
					for (var y = yBegin; y <= yEnd; y++) {
						yArray.push({
							text: y + '',
							value: y
						});
					}
				}
				ui.y.picker.setItems(yArray);
				//ui.y.picker.setSelectedValue(current);
			},
			_createMonth: function(current) {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				//生成月列表
				var mArray = [];
				if (options.customData.m) {
					mArray = options.customData.m;
				} else {
					for (var m = 1; m <= 12; m++) {
						var val = self._fill(m);
						mArray.push({
							text: val,
							value: val
						});
					}
				}
				ui.m.picker.setItems(mArray);
				//ui.m.picker.setSelectedValue(current);
			},
			_createDay: function(current) {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				//生成日列表
				var dArray = [];
				if (options.customData.d) {
					dArray = options.customData.d;
				} else {
					var maxDay = self.getDayNum(parseInt(ui.y.picker.getSelectedValue()), parseInt(ui.m.picker.getSelectedValue()));
					for (var d = 1; d <= maxDay; d++) {
						var val = self._fill(d);
						dArray.push({
							text: val,
							value: val
						});
					}
				}
				ui.d.picker.setItems(dArray);
				current = current || ui.d.picker.getSelectedValue();
				//ui.d.picker.setSelectedValue(current);
			},
			_createHours: function(current) {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				//生成时列表
				var hArray = [];
				if (options.customData.h) {
					hArray = options.customData.h;
				} else {
					for (var h = 0; h <= 23; h++) {
						var val = self._fill(h);
						hArray.push({
							text: val,
							value: val
						});
					}
				}
				ui.h.picker.setItems(hArray);
				//ui.h.picker.setSelectedValue(current);
			},
			_createMinutes: function(current) {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				//生成分列表
				var iArray = [];
				if (options.customData.i) {
					iArray = options.customData.i;
				} else {
					for (var i = 0; i <= 59; i++) {
						var val = self._fill(i);
						iArray.push({
							text: val,
							value: val
						});
					}
				}
				ui.i.picker.setItems(iArray);
				//ui.i.picker.setSelectedValue(current);
			},
			_setLabels: function() {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				ui.labels.each(function(i, label) {
					label.innerText = options.labels[i];
				});
			},
			_setButtons: function() {
				var self = this;
				var options = self.options;
				var ui = self.ui;
				ui.cancel.innerText = options.buttons[0];
				ui.ok.innerText = options.buttons[1];
			},
			_parseValue: function(value) {
				var self = this;
				var rs = {};
				if (value) {
					var parts = value.replace(":", "-").replace(" ", "-").split("-");
					rs.y = parts[0];
					rs.m = parts[1];
					rs.d = parts[2];
					rs.h = parts[3];
					rs.i = parts[4];
				} else {
					var now = new Date();
					rs.y = now.getFullYear();
					rs.m = now.getMonth() + 1;
					rs.d = now.getDate();
					rs.h = now.getHours();
					rs.i = now.getMinutes();
				}
				return rs;
			},
			_create: function(options) {
				var self = this;
				options = options || {};
				options.labels = options.labels || ['年', '月', '日', '时', '分'];
				options.buttons = options.buttons || ['取消', '确定'];
				options.type = options.type || 'datetime';
				options.customData = options.customData || {};
				self.options = options;
				var now = new Date();
				options.beginYear = options.beginYear || (now.getFullYear() - 5);
				options.endYear = options.endYear || (now.getFullYear() + 5);
				var ui = self.ui;
				//设定label
				self._setLabels();
				self._setButtons();
				//设定类型
				ui.picker.setAttribute('data-type', options.type);
				//生成
				self._createYear();
				self._createMonth();
				self._createDay();
				self._createHours();
				self._createMinutes();
				//设定默认值
				self.setSelectedValue(options.value);
			},
			//显示
			show: function(callback) {
				var self = this;
				var ui = self.ui;
				self.callback = callback || $.noop;
				ui.mask.show();
				document.body.classList.add($.className('dtpicker-active-for-page'));
				ui.picker.classList.add($.className('active'));
				//处理物理返回键
				self.__back = $.back;
				$.back = function() {
					self.hide();
				};
			},
			hide: function() {
				var self = this;
				if (self.disposed) return;
				var ui = self.ui;
				ui.picker.classList.remove($.className('active'));
				ui.mask.close();
				document.body.classList.remove($.className('dtpicker-active-for-page'));
				//处理物理返回键
				$.back=self.__back;
			},
			dispose: function() {
				var self = this;
				self.hide();
				setTimeout(function() {
					self.ui.picker.parentNode.removeChild(self.ui.picker);
					for (var name in self) {
						self[name] = null;
						delete self[name];
					};
					self.disposed = true;
				}, 300);
			}
		});

	})(window.mui, document);

});
;/*!/component_modules/mui.js*/
/*!
 * =====================================================
 * Mui v2.8.0 (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */
/**
 * MUI核心JS
 * @type _L4.$|Function
 */
define('component_modules/mui', function(require, exports, module) {



window.mui = (function(document, undefined) {
	var readyRE = /complete|loaded|interactive/;
	var idSelectorRE = /^#([\w-]+)$/;
	var classSelectorRE = /^\.([\w-]+)$/;
	var tagSelectorRE = /^[\w-]+$/;
	var translateRE = /translate(?:3d)?\((.+?)\)/;
	var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

	var $ = function(selector, context) {
		context = context || document;
		if (!selector)
			return wrap();
		if (typeof selector === 'object')
			return wrap([selector], null);
		if (typeof selector === 'function')
			return $.ready(selector);
		if (typeof selector === 'string') {
			try {
				selector = selector.trim();
				if (idSelectorRE.test(selector)) {
					var found = document.getElementById(RegExp.$1);
					return wrap(found ? [found] : []);
				}
				return wrap($.qsa(selector, context), selector);
			} catch (e) {}
		}
		return wrap();
	};

	var wrap = function(dom, selector) {
		dom = dom || [];
		Object.setPrototypeOf(dom, $.fn);
		dom.selector = selector || '';
		return dom;
	};

	$.uuid = 0;

	$.data = {};
	/**
	 * extend(simple)
	 * @param {type} target
	 * @param {type} source
	 * @param {type} deep
	 * @returns {unresolved}
	 */
	$.extend = function() { //from jquery2
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !$.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && $.isArray(src) ? src : [];

						} else {
							clone = src && $.isPlainObject(src) ? src : {};
						}

						target[name] = $.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};
	/**
	 * mui noop(function)
	 */
	$.noop = function() {};
	/**
	 * mui slice(array)
	 */
	$.slice = [].slice;
	/**
	 * mui filter(array)
	 */
	$.filter = [].filter;

	$.type = function(obj) {
		return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
	};
	/**
	 * mui isArray
	 */
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array;
		};
	/**
	 * mui isWindow(需考虑obj为undefined的情况)
	 */
	$.isWindow = function(obj) {
		return obj != null && obj === obj.window;
	};
	/**
	 * mui isObject
	 */
	$.isObject = function(obj) {
		return $.type(obj) === "object";
	};
	/**
	 * mui isPlainObject
	 */
	$.isPlainObject = function(obj) {
		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	/**
	 * mui isEmptyObject
	 * @param {Object} o
	 */
	$.isEmptyObject = function(o) {
		for (var p in o) {
			if (p !== undefined) {
				return false;
			}
		}
		return true;
	};
	/**
	 * mui isFunction
	 */
	$.isFunction = function(value) {
		return $.type(value) === "function";
	};
	/**
	 * mui querySelectorAll
	 * @param {type} selector
	 * @param {type} context
	 * @returns {Array}
	 */
	$.qsa = function(selector, context) {
		context = context || document;
		return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
	};
	/**
	 * ready(DOMContentLoaded)
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.ready = function(callback) {
		if (readyRE.test(document.readyState)) {
			callback($);
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				callback($);
			}, false);
		}
		return this;
	};
	/**
	 * each
	 * @param {type} elements
	 * @param {type} callback
	 * @returns {_L8.$}
	 */
	$.each = function(elements, callback, hasOwnProperty) {
		if (!elements) {
			return this;
		}
		if (typeof elements.length === 'number') {
			[].every.call(elements, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
		} else {
			for (var key in elements) {
				if (hasOwnProperty) {
					if (elements.hasOwnProperty(key)) {
						if (callback.call(elements[key], key, elements[key]) === false) return elements;
					}
				} else {
					if (callback.call(elements[key], key, elements[key]) === false) return elements;
				}
			}
		}
		return this;
	};
	$.focus = function(element) {
		if ($.os.ios) {
			setTimeout(function() {
				element.focus();
			}, 10);
		} else {
			element.focus();
		}
	};
	/**
	 * trigger event
	 * @param {type} element
	 * @param {type} eventType
	 * @param {type} eventData
	 * @returns {_L8.$}
	 */
	$.trigger = function(element, eventType, eventData) {
		element.dispatchEvent(new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		}));
		return this;
	};
	/**
	 * getStyles
	 * @param {type} element
	 * @param {type} property
	 * @returns {styles}
	 */
	$.getStyles = function(element, property) {
		var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
		if (property) {
			return styles.getPropertyValue(property) || styles[property];
		}
		return styles;
	};
	/**
	 * parseTranslate
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslate = function(translateString, position) {
		var result = translateString.match(translateRE || '');
		if (!result || !result[1]) {
			result = ['', '0,0,0'];
		}
		result = result[1].split(",");
		result = {
			x: parseFloat(result[0]),
			y: parseFloat(result[1]),
			z: parseFloat(result[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	/**
	 * parseTranslateMatrix
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslateMatrix = function(translateString, position) {
		var matrix = translateString.match(translateMatrixRE);
		var is3D = matrix && matrix[1];
		if (matrix) {
			matrix = matrix[2].split(",");
			if (is3D === "3d")
				matrix = matrix.slice(12, 15);
			else {
				matrix.push(0);
				matrix = matrix.slice(4, 7);
			}
		} else {
			matrix = [0, 0, 0];
		}
		var result = {
			x: parseFloat(matrix[0]),
			y: parseFloat(matrix[1]),
			z: parseFloat(matrix[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	$.hooks = {};
	$.addAction = function(type, hook) {
		var hooks = $.hooks[type];
		if (!hooks) {
			hooks = [];
		}
		hook.index = hook.index || 1000;
		hooks.push(hook);
		hooks.sort(function(a, b) {
			return a.index - b.index;
		});
		$.hooks[type] = hooks;
		return $.hooks[type];
	};
	$.doAction = function(type, callback) {
		if ($.isFunction(callback)) { //指定了callback
			$.each($.hooks[type], callback);
		} else { //未指定callback，直接执行
			$.each($.hooks[type], function(index, hook) {
				return !hook.handle();
			});
		}
	};
	/**
	 * setTimeout封装
	 * @param {Object} fn
	 * @param {Object} when
	 * @param {Object} context
	 * @param {Object} data
	 */
	$.later = function(fn, when, context, data) {
		when = when || 0;
		var m = fn;
		var d = data;
		var f;
		var r;

		if (typeof fn === 'string') {
			m = context[fn];
		}

		f = function() {
			m.apply(context, $.isArray(d) ? d : [d]);
		};

		r = setTimeout(f, when);

		return {
			id: r,
			cancel: function() {
				clearTimeout(r);
			}
		};
	};
	$.now = Date.now || function() {
		return +new Date();
	};
	var class2type = {};
	$.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	if (window.JSON) {
		$.parseJSON = JSON.parse;
	}
	/**
	 * $.fn
	 */
	$.fn = {
		each: function(callback) {
			[].every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
			return this;
		}
	};

	/**
	 * 兼容 AMD 模块
	 **/
	if (typeof define === 'function' && define.amd) {
		define('mui', [], function() {
			return $;
		});
	}

	return $;
})(document);
//window.mui = mui;
//'$' in window || (window.$ = mui);
/**
 * $.os
 * @param {type} $
 * @returns {undefined}
 */
(function($, window) {
	function detect(ua) {
		this.os = {};
		var funcs = [

			function() { //wechat
				var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
				if (wechat) { //wechat
					this.os.wechat = {
						version: wechat[2].replace(/_/g, '.')
					};
				}
				return false;
			},
			function() { //android
				var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
				if (android) {
					this.os.android = true;
					this.os.version = android[2];

					this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
				}
				return this.os.android === true;
			},
			function() { //ios
				var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
				if (iphone) { //iphone
					this.os.ios = this.os.iphone = true;
					this.os.version = iphone[2].replace(/_/g, '.');
				} else {
					var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
					if (ipad) { //ipad
						this.os.ios = this.os.ipad = true;
						this.os.version = ipad[2].replace(/_/g, '.');
					}
				}
				return this.os.ios === true;
			}
		];
		[].every.call(funcs, function(func) {
			return !func.call($);
		});
	}
	detect.call($, navigator.userAgent);
})(mui, window);
/**
 * $.os.plus
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
	function detect(ua) {
		this.os = this.os || {};
		var plus = ua.match(/Html5Plus/i); //TODO 5\+Browser?
		if (plus) {
			this.os.plus = true;
			$(function() {
				document.body.classList.add('mui-plus');
			});
			if (ua.match(/StreamApp/i)) { //TODO 最好有流应用自己的标识
				this.os.stream = true;
				$(function() {
					document.body.classList.add('mui-plus-stream');
				});
			}
		}
	}
	detect.call($, navigator.userAgent);
})(mui, document);
/**
 * 仅提供简单的on，off(仅支持事件委托，不支持当前元素绑定，当前元素绑定请直接使用addEventListener,removeEventListener)
 * @param {Object} $
 */
(function($) {
	if ('ontouchstart' in window) {
		$.isTouchable = true;
		$.EVENT_START = 'touchstart';
		$.EVENT_MOVE = 'touchmove';
		$.EVENT_END = 'touchend';
	} else {
		$.isTouchable = false;
		$.EVENT_START = 'mousedown';
		$.EVENT_MOVE = 'mousemove';
		$.EVENT_END = 'mouseup';
	}
	$.EVENT_CANCEL = 'touchcancel';
	$.EVENT_CLICK = 'click';

	var _mid = 1;
	var delegates = {};
	//需要wrap的函数
	var eventMethods = {
		preventDefault: 'isDefaultPrevented',
		stopImmediatePropagation: 'isImmediatePropagationStopped',
		stopPropagation: 'isPropagationStopped'
	};
	//默认true返回函数
	var returnTrue = function() {
		return true
	};
	//默认false返回函数
	var returnFalse = function() {
		return false
	};
	//wrap浏览器事件
	var compatible = function(event, target) {
		if (!event.detail) {
			event.detail = {
				currentTarget: target
			};
		} else {
			event.detail.currentTarget = target;
		}
		$.each(eventMethods, function(name, predicate) {
			var sourceMethod = event[name];
			event[name] = function() {
				this[predicate] = returnTrue;
				return sourceMethod && sourceMethod.apply(event, arguments)
			}
			event[predicate] = returnFalse;
		}, true);
		return event;
	};
	//简单的wrap对象_mid
	var mid = function(obj) {
		return obj && (obj._mid || (obj._mid = _mid++));
	};
	//事件委托对象绑定的事件回调列表
	var delegateFns = {};
	//返回事件委托的wrap事件回调
	var delegateFn = function(element, event, selector, callback) {
		return function(e) {
			//same event
			var callbackObjs = delegates[element._mid][event];
			var handlerQueue = [];
			var target = e.target;
			var selectorAlls = {};
			for (; target && target !== document; target = target.parentNode) {
				if (target === element) {
					break;
				}
				if (~['click', 'tap', 'doubletap', 'longtap', 'hold'].indexOf(event) && (target.disabled || target.classList.contains('mui-disabled'))) {
					break;
				}
				var matches = {};
				$.each(callbackObjs, function(selector, callbacks) { //same selector
					selectorAlls[selector] || (selectorAlls[selector] = $.qsa(selector, element));
					if (selectorAlls[selector] && ~(selectorAlls[selector]).indexOf(target)) {
						if (!matches[selector]) {
							matches[selector] = callbacks;
						}
					}
				}, true);
				if (!$.isEmptyObject(matches)) {
					handlerQueue.push({
						element: target,
						handlers: matches
					});
				}
			}
			selectorAlls = null;
			e = compatible(e); //compatible event
			$.each(handlerQueue, function(index, handler) {
				target = handler.element;
				var tagName = target.tagName;
				if (event === 'tap' && (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'SELECT')) {
					e.preventDefault();
					e.detail && e.detail.gesture && e.detail.gesture.preventDefault();
				}
				$.each(handler.handlers, function(index, handler) {
					$.each(handler, function(index, callback) {
						if (callback.call(target, e) === false) {
							e.preventDefault();
							e.stopPropagation();
						}
					}, true);
				}, true)
				if (e.isPropagationStopped()) {
					return false;
				}
			}, true);
		};
	};
	var findDelegateFn = function(element, event) {
		var delegateCallbacks = delegateFns[mid(element)];
		var result = [];
		if (delegateCallbacks) {
			result = [];
			if (event) {
				var filterFn = function(fn) {
					return fn.type === event;
				}
				return delegateCallbacks.filter(filterFn);
			} else {
				result = delegateCallbacks;
			}
		}
		return result;
	};
	var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	/**
	 * mui delegate events
	 * @param {type} event
	 * @param {type} selector
	 * @param {type} callback
	 * @returns {undefined}
	 */
	$.fn.on = function(event, selector, callback) { //仅支持简单的事件委托,主要是tap事件使用，类似mouse,focus之类暂不封装支持
		return this.each(function() {
			var element = this;
			mid(element);
			mid(callback);
			var isAddEventListener = false;
			var delegateEvents = delegates[element._mid] || (delegates[element._mid] = {});
			var delegateCallbackObjs = delegateEvents[event] || ((delegateEvents[event] = {}));
			if ($.isEmptyObject(delegateCallbackObjs)) {
				isAddEventListener = true;
			}
			var delegateCallbacks = delegateCallbackObjs[selector] || (delegateCallbackObjs[selector] = []);
			delegateCallbacks.push(callback);
			if (isAddEventListener) {
				var delegateFnArray = delegateFns[mid(element)];
				if (!delegateFnArray) {
					delegateFnArray = [];
				}
				var delegateCallback = delegateFn(element, event, selector, callback);
				delegateFnArray.push(delegateCallback);
				delegateCallback.i = delegateFnArray.length - 1;
				delegateCallback.type = event;
				delegateFns[mid(element)] = delegateFnArray;
				element.addEventListener(event, delegateCallback);
				if (event === 'tap') { //TODO 需要找个更好的解决方案
					element.addEventListener('click', function(e) {
						if (e.target) {
							var tagName = e.target.tagName;
							if (!preventDefaultException.test(tagName)) {
								if (tagName === 'A') {
									var href = e.target.href;
									if (!(href && ~href.indexOf('tel:'))) {
										e.preventDefault();
									}
								} else {
									e.preventDefault();
								}
							}
						}
					});
				}
			}
		});
	};
	$.fn.off = function(event, selector, callback) {
		return this.each(function() {
			var _mid = mid(this);
			if (!event) { //mui(selector).off();
				delegates[_mid] && delete delegates[_mid];
			} else if (!selector) { //mui(selector).off(event);
				delegates[_mid] && delete delegates[_mid][event];
			} else if (!callback) { //mui(selector).off(event,selector);
				delegates[_mid] && delegates[_mid][event] && delete delegates[_mid][event][selector];
			} else { //mui(selector).off(event,selector,callback);
				var delegateCallbacks = delegates[_mid] && delegates[_mid][event] && delegates[_mid][event][selector];
				$.each(delegateCallbacks, function(index, delegateCallback) {
					if (mid(delegateCallback) === mid(callback)) {
						delegateCallbacks.splice(index, 1);
						return false;
					}
				}, true);
			}
			if (delegates[_mid]) {
				//如果off掉了所有当前element的指定的event事件，则remove掉当前element的delegate回调
				if ((!delegates[_mid][event] || $.isEmptyObject(delegates[_mid][event]))) {
					findDelegateFn(this, event).forEach(function(fn) {
						this.removeEventListener(fn.type, fn);
						delete delegateFns[_mid][fn.i];
					}.bind(this));
				}
			} else {
				//如果delegates[_mid]已不存在，删除所有
				findDelegateFn(this).forEach(function(fn) {
					this.removeEventListener(fn.type, fn);
					delete delegateFns[_mid][fn.i];
				}.bind(this));
			}
		});

	};
})(mui);
/**
 * mui target(action>popover>modal>tab>toggle)
 */
(function($, window, document) {
	/**
	 * targets
	 */
	$.targets = {};
	/**
	 * target handles
	 */
	$.targetHandles = [];
	/**
	 * register target
	 * @param {type} target
	 * @returns {$.targets}
	 */
	$.registerTarget = function(target) {

		target.index = target.index || 1000;

		$.targetHandles.push(target);

		$.targetHandles.sort(function(a, b) {
			return a.index - b.index;
		});

		return $.targetHandles;
	};
	window.addEventListener($.EVENT_START, function(event) {
		var target = event.target;
		var founds = {};
		for (; target && target !== document; target = target.parentNode) {
			var isFound = false;
			$.each($.targetHandles, function(index, targetHandle) {
				var name = targetHandle.name;
				if (!isFound && !founds[name] && targetHandle.hasOwnProperty('handle')) {
					$.targets[name] = targetHandle.handle(event, target);
					if ($.targets[name]) {
						founds[name] = true;
						if (targetHandle.isContinue !== true) {
							isFound = true;
						}
					}
				} else {
					if (!founds[name]) {
						if (targetHandle.isReset !== false)
							$.targets[name] = false;
					}
				}
			});
			if (isFound) {
				break;
			}
		}
	});
	window.addEventListener('click', function(event) { //解决touch与click的target不一致的问题(比如链接边缘点击时，touch的target为html，而click的target为A)
		var target = event.target;
		var isFound = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.tagName === 'A') {
				$.each($.targetHandles, function(index, targetHandle) {
					var name = targetHandle.name;
					if (targetHandle.hasOwnProperty('handle')) {
						if (targetHandle.handle(event, target)) {
							isFound = true;
							event.preventDefault();
							return false;
						}
					}
				});
				if (isFound) {
					break;
				}
			}
		}
	});
})(mui, window, document);
/**
 * fixed trim
 * @param {type} undefined
 * @returns {undefined}
 */
(function(undefined) {
	if (String.prototype.trim === undefined) { // fix for iOS 3.2
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
		obj['__proto__'] = proto;
		return obj;
	};

})();
/**
 * fixed CustomEvent
 */
(function() {
	if (typeof window.CustomEvent === 'undefined') {
		function CustomEvent(event, params) {
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var evt = document.createEvent('Events');
			var bubbles = true;
			for (var name in params) {
				(name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name]);
			}
			evt.initEvent(event, bubbles, true);
			return evt;
		};
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	}
})();
/*
	A shim for non ES5 supporting browsers.
	Adds function bind to Function prototype, so that you can do partial application.
	Works even with the nasty thing, where the first word is the opposite of extranet, the second one is the profession of Columbus, and the version number is 9, flipped 180 degrees.
*/

Function.prototype.bind = Function.prototype.bind || function(to) {
	// Make an array of our arguments, starting from second argument
	var partial = Array.prototype.splice.call(arguments, 1),
		// We'll need the original function.
		fn = this;
	var bound = function() {
			// Join the already applied arguments to the now called ones (after converting to an array again).
			var args = partial.concat(Array.prototype.splice.call(arguments, 0));
			// If not being called as a constructor
			if (!(this instanceof bound)) {
				// return the result of the function called bound to target and partially applied.
				return fn.apply(to, args);
			}
			// If being called as a constructor, apply the function bound to self.
			fn.apply(this, args);
		}
		// Attach the prototype of the function to our newly created function.
	bound.prototype = fn.prototype;
	return bound;
};
/**
 * mui fixed classList
 * @param {type} document
 * @returns {undefined}
 */
(function(document) {
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {

        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/),
                                index = classes.indexOf(value);

                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    };
                }

                var ret = {
                    add: update(function(classes, index, value) {
                        ~index || classes.push(value);
                    }),
                    remove: update(function(classes, index) {
                        ~index && classes.splice(index, 1);
                    }),
                    toggle: update(function(classes, index, value) {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),
                    contains: function(value) {
                        return !!~self.className.split(/\s+/).indexOf(value);
                    },
                    item: function(i) {
                        return self.className.split(/\s+/)[i] || null;
                    }
                };

                Object.defineProperty(ret, 'length', {
                    get: function() {
                        return self.className.split(/\s+/).length;
                    }
                });

                return ret;
            }
        });
    }
})(document);

/**
 * mui fixed requestAnimationFrame
 * @param {type} window
 * @returns {undefined}
 */
(function(window) {
	if (!window.requestAnimationFrame) {
		var lastTime = 0;
		window.requestAnimationFrame = window.webkitRequestAnimationFrame || function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function(id) {
			clearTimeout(id);
		};
	};
}(window));
/**
 * fastclick(only for radio,checkbox)
 */
(function($, window, name) {
	if (!$.os.android && !$.os.ios) { //目前仅识别android和ios
		return;
	}
	if (window.FastClick) {
		return;
	}

	var handle = function(event, target) {
		if (target.tagName === 'LABEL') {
			if (target.parentNode) {
				target = target.parentNode.querySelector('input');
			}
		}
		if (target && (target.type === 'radio' || target.type === 'checkbox')) {
			if (!target.disabled) { //disabled
				return target;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 40,
		handle: handle,
		target: false
	});
	var dispatchEvent = function(event) {
		var targetElement = $.targets.click;
		if (targetElement) {
			var clickEvent, touch;
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
			touch = event.detail.gesture.changedTouches[0];
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
			event.detail && event.detail.gesture.preventDefault();
		}
	};
	window.addEventListener('tap', dispatchEvent);
	window.addEventListener('doubletap', dispatchEvent);
	//捕获
	window.addEventListener('click', function(event) {
		if ($.targets.click) {
			if (!event.forwardedTouchEvent) { //stop click
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation
					event.propagationStopped = true;
				}
				event.stopPropagation();
				event.preventDefault();
				return false;
			}
		}
	}, true);

})(mui, window, 'click');
(function($, document) {
	$(function() {
		if (!$.os.ios) {
			return;
		}
		var CLASS_FOCUSIN = 'mui-focusin';
		var CLASS_BAR_TAB = 'mui-bar-tab';
		var CLASS_BAR_FOOTER = 'mui-bar-footer';
		var CLASS_BAR_FOOTER_SECONDARY = 'mui-bar-footer-secondary';
		var CLASS_BAR_FOOTER_SECONDARY_TAB = 'mui-bar-footer-secondary-tab';
		// var content = document.querySelector('.' + CLASS_CONTENT);
		// if (content) {
		// 	document.body.insertBefore(content, document.body.firstElementChild);
		// }
		document.addEventListener('focusin', function(e) {
			if ($.os.plus) { //在父webview里边不fix
				if (window.plus) {
					if (plus.webview.currentWebview().children().length > 0) {
						return;
					}
				}
			}
			var target = e.target;
			//TODO 需考虑所有键盘弹起的情况
			if (target.tagName && (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && (target.type === 'text' || target.type === 'search' || target.type === 'number')))) {
				if (target.disabled || target.readOnly) {
					return;
				}
				document.body.classList.add(CLASS_FOCUSIN);
				var isFooter = false;
				for (; target && target !== document; target = target.parentNode) {
					var classList = target.classList;
					if (classList && classList.contains(CLASS_BAR_TAB) || classList.contains(CLASS_BAR_FOOTER) || classList.contains(CLASS_BAR_FOOTER_SECONDARY) || classList.contains(CLASS_BAR_FOOTER_SECONDARY_TAB)) {
						isFooter = true;
						break;
					}
				}
				if (isFooter) {
					var scrollTop = document.body.scrollHeight;
					var scrollLeft = document.body.scrollLeft;
					setTimeout(function() {
						window.scrollTo(scrollLeft, scrollTop);
					}, 20);
				}
			}
		});
		document.addEventListener('focusout', function(e) {
			var classList = document.body.classList;
			if (classList.contains(CLASS_FOCUSIN)) {
				classList.remove(CLASS_FOCUSIN);
				setTimeout(function() {
					window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
				}, 20);
			}
		});
	});
})(mui, document);
/**
 * mui namespace(optimization)
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.namespace = 'mui';
	$.classNamePrefix = $.namespace + '-';
	$.classSelectorPrefix = '.' + $.classNamePrefix;
	/**
	 * 返回正确的className
	 * @param {type} className
	 * @returns {String}
	 */
	$.className = function(className) {
		return $.classNamePrefix + className;
	};
	/**
	 * 返回正确的classSelector
	 * @param {type} classSelector
	 * @returns {String}
	 */
	$.classSelector = function(classSelector) {
		return classSelector.replace(/\./g, $.classSelectorPrefix);
	};
	/**
         * 返回正确的eventName
         * @param {type} event
         * @param {type} module
         * @returns {String}
         */
	$.eventName = function(event, module) {
		return event + ($.namespace ? ('.' + $.namespace) : '') + ( module ? ('.' + module) : '');
	};
})(mui);

/**
 * mui gestures
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	$.gestures = {
		session: {}
	};
	/**
	 * Gesture preventDefault
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.preventDefault = function(e) {
		e.preventDefault();
	};
	/**
	 * Gesture stopPropagation
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.stopPropagation = function(e) {
		e.stopPropagation();
	};

	/**
	 * register gesture
	 * @param {type} gesture
	 * @returns {$.gestures}
	 */
	$.addGesture = function(gesture) {
		return $.addAction('gestures', gesture);

	};

	var round = Math.round;
	var abs = Math.abs;
	var sqrt = Math.sqrt;
	var atan = Math.atan;
	var atan2 = Math.atan2;
	/**
	 * distance
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getDistance = function(p1, p2, props) {
		if (!props) {
			props = ['x', 'y'];
		}
		var x = p2[props[0]] - p1[props[0]];
		var y = p2[props[1]] - p1[props[1]];
		return sqrt((x * x) + (y * y));
	};
	/**
	 * scale
	 * @param {Object} starts
	 * @param {Object} moves
	 */
	var getScale = function(starts, moves) {
		if (starts.length >= 2 && moves.length >= 2) {
			var props = ['pageX', 'pageY'];
			return getDistance(moves[1], moves[0], props) / getDistance(starts[1], starts[0], props);
		}
		return 1;
	};
	/**
	 * angle
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getAngle = function(p1, p2, props) {
		if (!props) {
			props = ['x', 'y'];
		}
		var x = p2[props[0]] - p1[props[0]];
		var y = p2[props[1]] - p1[props[1]];
		return atan2(y, x) * 180 / Math.PI;
	};
	/**
	 * direction
	 * @param {Object} x
	 * @param {Object} y
	 */
	var getDirection = function(x, y) {
		if (x === y) {
			return '';
		}
		if (abs(x) >= abs(y)) {
			return x > 0 ? 'left' : 'right';
		}
		return y > 0 ? 'up' : 'down';
	};
	/**
	 * rotation
	 * @param {Object} start
	 * @param {Object} end
	 */
	var getRotation = function(start, end) {
		var props = ['pageX', 'pageY'];
		return getAngle(end[1], end[0], props) - getAngle(start[1], start[0], props);
	};
	/**
	 * px per ms
	 * @param {Object} deltaTime
	 * @param {Object} x
	 * @param {Object} y
	 */
	var getVelocity = function(deltaTime, x, y) {
		return {
			x: x / deltaTime || 0,
			y: y / deltaTime || 0
		};
	};
	/**
	 * detect gestures
	 * @param {type} event
	 * @param {type} touch
	 * @returns {undefined}
	 */
	var detect = function(event, touch) {
		if ($.gestures.stoped) {
			return;
		}
		$.doAction('gestures', function(index, gesture) {
			if (!$.gestures.stoped) {
				if ($.options.gestureConfig[gesture.name] !== false) {
					gesture.handle(event, touch);
				}
			}
		});
	};
	/**
	 * 暂时无用
	 * @param {Object} node
	 * @param {Object} parent
	 */
	var hasParent = function(node, parent) {
		while (node) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	};

	var uniqueArray = function(src, key, sort) {
		var results = [];
		var values = [];
		var i = 0;

		while (i < src.length) {
			var val = key ? src[i][key] : src[i];
			if (values.indexOf(val) < 0) {
				results.push(src[i]);
			}
			values[i] = val;
			i++;
		}

		if (sort) {
			if (!key) {
				results = results.sort();
			} else {
				results = results.sort(function sortUniqueArray(a, b) {
					return a[key] > b[key];
				});
			}
		}

		return results;
	};
	var getMultiCenter = function(touches) {
		var touchesLength = touches.length;
		if (touchesLength === 1) {
			return {
				x: round(touches[0].pageX),
				y: round(touches[0].pageY)
			};
		}

		var x = 0;
		var y = 0;
		var i = 0;
		while (i < touchesLength) {
			x += touches[i].pageX;
			y += touches[i].pageY;
			i++;
		}

		return {
			x: round(x / touchesLength),
			y: round(y / touchesLength)
		};
	};
	var multiTouch = function() {
		return $.options.gestureConfig.pinch;
	};
	var copySimpleTouchData = function(touch) {
		var touches = [];
		var i = 0;
		while (i < touch.touches.length) {
			touches[i] = {
				pageX: round(touch.touches[i].pageX),
				pageY: round(touch.touches[i].pageY)
			};
			i++;
		}
		return {
			timestamp: $.now(),
			gesture: touch.gesture,
			touches: touches,
			center: getMultiCenter(touch.touches),
			deltaX: touch.deltaX,
			deltaY: touch.deltaY
		};
	};

	var calDelta = function(touch) {
		var session = $.gestures.session;
		var center = touch.center;
		var offset = session.offsetDelta || {};
		var prevDelta = session.prevDelta || {};
		var prevTouch = session.prevTouch || {};

		if (touch.gesture.type === $.EVENT_START || touch.gesture.type === $.EVENT_END) {
			prevDelta = session.prevDelta = {
				x: prevTouch.deltaX || 0,
				y: prevTouch.deltaY || 0
			};

			offset = session.offsetDelta = {
				x: center.x,
				y: center.y
			};
		}
		touch.deltaX = prevDelta.x + (center.x - offset.x);
		touch.deltaY = prevDelta.y + (center.y - offset.y);
	};
	var calTouchData = function(touch) {
		var session = $.gestures.session;
		var touches = touch.touches;
		var touchesLength = touches.length;

		if (!session.firstTouch) {
			session.firstTouch = copySimpleTouchData(touch);
		}

		if (multiTouch() && touchesLength > 1 && !session.firstMultiTouch) {
			session.firstMultiTouch = copySimpleTouchData(touch);
		} else if (touchesLength === 1) {
			session.firstMultiTouch = false;
		}

		var firstTouch = session.firstTouch;
		var firstMultiTouch = session.firstMultiTouch;
		var offsetCenter = firstMultiTouch ? firstMultiTouch.center : firstTouch.center;

		var center = touch.center = getMultiCenter(touches);
		touch.timestamp = $.now();
		touch.deltaTime = touch.timestamp - firstTouch.timestamp;

		touch.angle = getAngle(offsetCenter, center);
		touch.distance = getDistance(offsetCenter, center);

		calDelta(touch);

		touch.offsetDirection = getDirection(touch.deltaX, touch.deltaY);

		touch.scale = firstMultiTouch ? getScale(firstMultiTouch.touches, touches) : 1;
		touch.rotation = firstMultiTouch ? getRotation(firstMultiTouch.touches, touches) : 0;

		calIntervalTouchData(touch);

	};
	var CAL_INTERVAL = 25;
	var calIntervalTouchData = function(touch) {
		var session = $.gestures.session;
		var last = session.lastInterval || touch;
		var deltaTime = touch.timestamp - last.timestamp;
		var velocity;
		var velocityX;
		var velocityY;
		var direction;

		if (touch.gesture.type != $.EVENT_CANCEL && (deltaTime > CAL_INTERVAL || last.velocity === undefined)) {
			var deltaX = last.deltaX - touch.deltaX;
			var deltaY = last.deltaY - touch.deltaY;

			var v = getVelocity(deltaTime, deltaX, deltaY);
			velocityX = v.x;
			velocityY = v.y;
			velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
			direction = getDirection(deltaX, deltaY) || last.direction;

			session.lastInterval = touch;
		} else {
			velocity = last.velocity;
			velocityX = last.velocityX;
			velocityY = last.velocityY;
			direction = last.direction;
		}

		touch.velocity = velocity;
		touch.velocityX = velocityX;
		touch.velocityY = velocityY;
		touch.direction = direction;
	};
	var targetIds = {};
	var convertTouches = function(touches) {
		for (var i = 0; i < touches.length; i++) {
			!touches['identifier'] && (touches['identifier'] = 0);
		}
		return touches;
	};
	var getTouches = function(event, touch) {
		var allTouches = convertTouches($.slice.call(event.touches || [event]));

		var type = event.type;

		var targetTouches = [];
		var changedTargetTouches = [];

		//当touchstart或touchmove且touches长度为1，直接获得all和changed
		if ((type === $.EVENT_START || type === $.EVENT_MOVE) && allTouches.length === 1) {
			targetIds[allTouches[0].identifier] = true;
			targetTouches = allTouches;
			changedTargetTouches = allTouches;
			touch.target = event.target;
		} else {
			var i = 0;
			var targetTouches = [];
			var changedTargetTouches = [];
			var changedTouches = convertTouches($.slice.call(event.changedTouches || [event]));

			touch.target = event.target;
			var sessionTarget = $.gestures.session.target || event.target;
			targetTouches = allTouches.filter(function(touch) {
				return hasParent(touch.target, sessionTarget);
			});

			if (type === $.EVENT_START) {
				i = 0;
				while (i < targetTouches.length) {
					targetIds[targetTouches[i].identifier] = true;
					i++;
				}
			}

			i = 0;
			while (i < changedTouches.length) {
				if (targetIds[changedTouches[i].identifier]) {
					changedTargetTouches.push(changedTouches[i]);
				}
				if (type === $.EVENT_END || type === $.EVENT_CANCEL) {
					delete targetIds[changedTouches[i].identifier];
				}
				i++;
			}

			if (!changedTargetTouches.length) {
				return false;
			}
		}
		targetTouches = uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true);
		var touchesLength = targetTouches.length;
		var changedTouchesLength = changedTargetTouches.length;
		if (type === $.EVENT_START && touchesLength - changedTouchesLength === 0) { //first
			touch.isFirst = true;
			$.gestures.touch = $.gestures.session = {
				target: event.target
			};
		}
		touch.isFinal = ((type === $.EVENT_END || type === $.EVENT_CANCEL) && (touchesLength - changedTouchesLength === 0));

		touch.touches = targetTouches;
		touch.changedTouches = changedTargetTouches;
		return true;

	};
	var handleTouchEvent = function(event) {
		var touch = {
			gesture: event
		};
		var touches = getTouches(event, touch);
		if (!touches) {
			return;
		}
		calTouchData(touch);
		detect(event, touch);
		$.gestures.session.prevTouch = touch;
		if (event.type === $.EVENT_END && !$.isTouchable) {
			$.gestures.touch = $.gestures.session = {};
		}
	};
	window.addEventListener($.EVENT_START, handleTouchEvent);
	window.addEventListener($.EVENT_MOVE, handleTouchEvent);
	window.addEventListener($.EVENT_END, handleTouchEvent);
	window.addEventListener($.EVENT_CANCEL, handleTouchEvent);
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		//TODO 应该判断当前target是不是在targets.popover内部，而不是非要相等
		if (($.os.android || $.os.ios) && (($.targets.popover && e.target === $.targets.popover) || ($.targets.tab) || $.targets.offcanvas || $.targets.modal)) {
			e.preventDefault();
		}
	}, true);


	//增加原生滚动识别
	$.isScrolling = false;
	var scrollingTimeout = null;
	window.addEventListener('scroll', function() {
		$.isScrolling = true;
		scrollingTimeout && clearTimeout(scrollingTimeout);
		scrollingTimeout = setTimeout(function() {
			$.isScrolling = false;
		}, 250);
	});
})(mui, window);
/**
 * mui gesture flick[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var flickStartTime = 0;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		var now = $.now();
		switch (event.type) {
			case $.EVENT_MOVE:
				if (now - flickStartTime > 300) {
					flickStartTime = now;
					session.flickStart = touch.center;
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				touch.flick = false;
				if (session.flickStart && options.flickMaxTime > (now - flickStartTime) && touch.distance > options.flickMinDistince) {
					touch.flick = true;
					touch.flickTime = now - flickStartTime;
					touch.flickDistanceX = touch.center.x - session.flickStart.x;
					touch.flickDistanceY = touch.center.y - session.flickStart.y;
					$.trigger(session.target, name, touch);
					$.trigger(session.target, name + touch.direction, touch);
				}
				break;
		}

	};
	/**
	 * mui gesture flick
	 */
	$.addGesture({
		name: name,
		index: 5,
		handle: handle,
		options: {
			flickMaxTime: 200,
			flickMinDistince: 10
		}
	});
})(mui, 'flick');
/**
 * mui gesture swipe[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var session = $.gestures.session;
		if (event.type === $.EVENT_END || event.type === $.EVENT_CANCEL) {
			var options = this.options;
			touch.swipe = false;
			//TODO 后续根据velocity计算
			if (touch.direction && options.swipeMaxTime > touch.deltaTime && touch.distance > options.swipeMinDistince) {
				touch.swipe = true;
				$.trigger(session.target, name, touch);
				$.trigger(session.target, name + touch.direction, touch);
			}
		}
	};
	/**
	 * mui gesture swipe
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			swipeMaxTime: 300,
			swipeMinDistince: 18
		}
	});
})(mui, 'swipe');
/**
 * mui gesture drag[start|left|right|up|down|end]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var session = $.gestures.session;
		switch (event.type) {
			case $.EVENT_START:
				break;
			case $.EVENT_MOVE:
				if (!touch.direction || !session.target) {
					return;
				}
				//修正direction,可在session期间自行锁定拖拽方向，方便开发scroll类不同方向拖拽插件嵌套
				if (session.lockDirection && session.startDirection) {
					if (session.startDirection && session.startDirection !== touch.direction) {
						if (session.startDirection === 'up' || session.startDirection === 'down') {
							touch.direction = touch.deltaY < 0 ? 'up' : 'down';
						} else {
							touch.direction = touch.deltaX < 0 ? 'left' : 'right';
						}
					}
				}

				if (!session.drag) {
					session.drag = true;
					$.trigger(session.target, name + 'start', touch);
				}
				$.trigger(session.target, name, touch);
				$.trigger(session.target, name + touch.direction, touch);
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if (session.drag && touch.isFinal) {
					$.trigger(session.target, name + 'end', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture drag
	 */
	$.addGesture({
		name: name,
		index: 20,
		handle: handle,
		options: {
			fingers: 1
		}
	});
})(mui, 'drag');
/**
 * mui gesture tap and doubleTap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var lastTarget;
	var lastTapTime;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_END:
				if (!touch.isFinal) {
					return;
				}
				var target = session.target;
				if (!target || (target.disabled || (target.classList && target.classList.contains('mui-disabled')))) {
					return;
				}
				if (touch.distance < options.tapMaxDistance && touch.deltaTime < options.tapMaxTime) {
					if ($.options.gestureConfig.doubletap && lastTarget && (lastTarget === target)) { //same target
						if (lastTapTime && (touch.timestamp - lastTapTime) < options.tapMaxInterval) {
							$.trigger(target, 'doubletap', touch);
							lastTapTime = $.now();
							lastTarget = target;
							return;
						}
					}
					$.trigger(target, name, touch);
					lastTapTime = $.now();
					lastTarget = target;
				}
				break;
		}
	};
	/**
	 * mui gesture tap
	 */
	$.addGesture({
		name: name,
		index: 30,
		handle: handle,
		options: {
			fingers: 1,
			tapMaxInterval: 300,
			tapMaxDistance: 5,
			tapMaxTime: 250
		}
	});
})(mui, 'tap');
/**
 * mui gesture longtap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				clearTimeout(timer);
				timer = setTimeout(function() {
					$.trigger(session.target, name, touch);
				}, options.holdTimeout);
				break;
			case $.EVENT_MOVE:
				if (touch.distance > options.holdThreshold) {
					clearTimeout(timer);
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				clearTimeout(timer);
				break;
		}
	};
	/**
	 * mui gesture longtap
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			fingers: 1,
			holdTimeout: 500,
			holdThreshold: 2
		}
	});
})(mui, 'longtap');
/**
 * mui gesture hold
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				if ($.options.gestureConfig.hold) {
					timer && clearTimeout(timer);
					timer = setTimeout(function() {
						touch.hold = true;
						$.trigger(session.target, name, touch);
					}, options.holdTimeout);
				}
				break;
			case $.EVENT_MOVE:
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if (timer) {
					clearTimeout(timer) && (timer = null);
					$.trigger(session.target, 'release', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture hold
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			fingers: 1,
			holdTimeout: 0
		}
	});
})(mui, 'hold');
/**
 * mui gesture pinch
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var options = this.options;
		var session = $.gestures.session;
		switch (event.type) {
			case $.EVENT_START:
				break;
			case $.EVENT_MOVE:
				if ($.options.gestureConfig.pinch) {
					if (touch.touches.length < 2) {
						return;
					}
					if (!session.pinch) { //start
						session.pinch = true;
						$.trigger(session.target, name + 'start', touch);
					}
					$.trigger(session.target, name, touch);
					var scale = touch.scale;
					var rotation = touch.rotation;
					var lastScale = typeof touch.lastScale === 'undefined' ? 1 : touch.lastScale;
					var scaleDiff = 0.000000000001; //防止scale与lastScale相等，不触发事件的情况。
					if (scale > lastScale) { //out
						lastScale = scale - scaleDiff;
						$.trigger(session.target, name + 'out', touch);
					} //in
					else if (scale < lastScale) {
						lastScale = scale + scaleDiff;
						$.trigger(session.target, name + 'in', touch);
					}
					if (Math.abs(rotation) > options.minRotationAngle) {
						$.trigger(session.target, 'rotate', touch);
					}
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if ($.options.gestureConfig.pinch && session.pinch && touch.touches.length === 2) {
					session.pinch = false;
					$.trigger(session.target, name + 'end', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture pinch
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			minRotationAngle: 0
		}
	});
})(mui, 'pinch');
/**
 * mui.init
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.global = $.options = {
		gestureConfig: {
			tap: true,
			doubletap: false,
			longtap: false,
			hold: false,
			flick: true,
			swipe: true,
			drag: true,
			pinch: false
		}
	};
	/**
	 *
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.initGlobal = function(options) {
		$.options = $.extend(true, $.global, options);
		return this;
	};
	var inits = {};

	var isInitialized = false;
	//TODO 自动调用init?因为用户自己调用init的时机可能不确定，如果晚于自动init，则会有潜在问题
	//	$.ready(function() {
	//		setTimeout(function() {
	//			if (!isInitialized) {
	//				$.init();
	//			}
	//		}, 300);
	//	});
	/**
	 * 单页配置 初始化
	 * @param {object} options
	 */
	$.init = function(options) {
		isInitialized = true;
		$.options = $.extend(true, $.global, options || {});
		$.ready(function() {
			$.doAction('inits', function(index, init) {
				var isInit = !!(!inits[init.name] || init.repeat);
				if (isInit) {
					init.handle.call($);
					inits[init.name] = true;
				}
			});
		});
		return this;
	};

	/**
	 * 增加初始化执行流程
	 * @param {function} init
	 */
	$.addInit = function(init) {
		return $.addAction('inits', init);
	};
	/**
	 * 处理html5版本subpages 
	 */
	$.addInit({
		name: 'iframe',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if (!$.os.plus && subpages.length) {
				//暂时只处理单个subpage。后续可以考虑支持多个subpage
				createIframe(subpages[0]);
			}
		}
	});
	var createIframe = function(options) {
		var wrapper = document.createElement('div');
		wrapper.className = 'mui-iframe-wrapper';
		var styles = options.styles || {};
		if (typeof styles.top !== 'string') {
			styles.top = '0px';
		}
		if (typeof styles.bottom !== 'string') {
			styles.bottom = '0px';
		}
		wrapper.style.top = styles.top;
		wrapper.style.bottom = styles.bottom;
		var iframe = document.createElement('iframe');
		iframe.src = options.url;
		iframe.id = options.id || options.url;
		iframe.name = iframe.id;
		wrapper.appendChild(iframe);
		document.body.appendChild(wrapper);
		//目前仅处理微信
		$.os.wechat && handleScroll(wrapper, iframe);
	};

	function handleScroll(wrapper, iframe) {
		var key = 'MUI_SCROLL_POSITION_' + document.location.href + '_' + iframe.src;
		var scrollTop = (parseFloat(localStorage.getItem(key)) || 0);
		if (scrollTop) {
			(function(y) {
				iframe.onload = function() {
					window.scrollTo(0, y);
				};
			})(scrollTop);
		}
		setInterval(function() {
			var _scrollTop = window.scrollY;
			if (scrollTop !== _scrollTop) {
				localStorage.setItem(key, _scrollTop + '');
				scrollTop = _scrollTop;
			}
		}, 100);
	};
	$(function() {
		var classList = document.body.classList;
		var os = [];
		if ($.os.ios) {
			os.push({
				os: 'ios',
				version: $.os.version
			});
			classList.add('mui-ios');
		} else if ($.os.android) {
			os.push({
				os: 'android',
				version: $.os.version
			});
			classList.add('mui-android');
		}
		if ($.os.wechat) {
			os.push({
				os: 'wechat',
				version: $.os.wechat.version
			});
			classList.add('mui-wechat');
		}
		if (os.length) {
			$.each(os, function(index, osObj) {
				var version = '';
				var classArray = [];
				if (osObj.version) {
					$.each(osObj.version.split('.'), function(i, v) {
						version = version + (version ? '-' : '') + v;
						classList.add($.className(osObj.os + '-' + version));
					});
				}
			});
		}
	});
})(mui);
/**
 * mui.init 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	var defaultOptions = {
		swipeBack: false,
		preloadPages: [], //5+ lazyLoad webview
		preloadLimit: 10, //预加载窗口的数量限制(一旦超出，先进先出)
		keyEventBind: {
			backbutton: true,
			menubutton: true
		}
	};

	//默认页面动画
	var defaultShow = {
		autoShow: true,
		duration: $.os.ios ? 200 : 100,
		aniShow: 'slide-in-right'
	};
	//若执行了显示动画初始化操作，则要覆盖默认配置
	if ($.options.show) {
		defaultShow = $.extend(true, defaultShow, $.options.show);
	}

	$.currentWebview = null;
	$.isHomePage = false;

	$.extend(true, $.global, defaultOptions);
	$.extend(true, $.options, defaultOptions);
	/**
	 * 等待动画配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.waitingOptions = function(options) {
		return $.extend(true, {}, {
			autoShow: true,
			title: ''
		}, options);
	};
	/**
	 * 窗口显示配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.showOptions = function(options) {
		return $.extend(true, {}, defaultShow, options);
	};
	/**
	 * 窗口默认配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.windowOptions = function(options) {
		return $.extend({
			scalable: false,
			bounce: "" //vertical
		}, options);
	};
	/**
	 * plusReady
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.plusReady = function(callback) {
		if (window.plus) {
			setTimeout(function() { //解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
				callback();
			}, 0);
		} else {
			document.addEventListener("plusready", function() {
				callback();
			}, false);
		}
		return this;
	};
	/**
	 * 5+ event(5+没提供之前我自己实现)
	 * @param {type} webview
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.fire = function(webview, eventType, data) {
		if (webview) {
			if (data !== '') {
				data = data || {};
				if ($.isPlainObject(data)) {
					data = JSON.stringify(data || {}).replace(/\'/g, "\\u0027").replace(/\\/g, "\\u005c");
				}
			}
			webview.evalJS("typeof mui!=='undefined'&&mui.receive('" + eventType + "','" + data + "')");
		}
	};
	/**
	 * 5+ event(5+没提供之前我自己实现)
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.receive = function(eventType, data) {
		if (eventType) {
			try {
				if (data) {
					data = JSON.parse(data);
				}
			} catch (e) {}
			$.trigger(document, eventType, data);
		}
	};
	var triggerPreload = function(webview) {
		if (!webview.preloaded) {
			$.fire(webview, 'preload');
			var list = webview.children();
			for (var i = 0; i < list.length; i++) {
				$.fire(list[i], 'preload');
			}
			webview.preloaded = true;
		}
	};
	var trigger = function(webview, eventType, timeChecked) {
		if (timeChecked) {
			if (!webview[eventType + 'ed']) {
				$.fire(webview, eventType);
				var list = webview.children();
				for (var i = 0; i < list.length; i++) {
					$.fire(list[i], eventType);
				}
				webview[eventType + 'ed'] = true;
			}
		} else {
			$.fire(webview, eventType);
			var list = webview.children();
			for (var i = 0; i < list.length; i++) {
				$.fire(list[i], eventType);
			}
		}

	};
	/**
	 * 打开新窗口
	 * @param {string} url 要打开的页面地址
	 * @param {string} id 指定页面ID
	 * @param {object} options 可选:参数,等待,窗口,显示配置{params:{},waiting:{},styles:{},show:{}}
	 */
	$.openWindow = function(url, id, options) {
		if (typeof url === 'object') {
			options = url;
			url = options.url;
			id = options.id || url;
		} else {
			if (typeof id === 'object') {
				options = id;
				id = url;
			} else {
				id = id || url;
			}
		}
		if (!$.os.plus) {
			//TODO 先临时这么处理：手机上顶层跳，PC上parent跳
			if ($.os.ios || $.os.android) {
				window.top.location.href = url;
			} else {
				window.parent.location.href = url;
			}
			return;
		}
		if (!window.plus) {
			return;
		}

		options = options || {};
		var params = options.params || {};
		var webview = null,
			webviewCache = null,
			nShow, nWaiting;

		if ($.webviews[id]) {
			webviewCache = $.webviews[id];
			//webview真实存在，才能获取
			if (plus.webview.getWebviewById(id)) {
				webview = webviewCache.webview;
			}
		}

		if (webviewCache && webview) { //已缓存
			//每次show都需要传递动画参数；
			//预加载的动画参数优先级：openWindow配置>preloadPages配置>mui默认配置；
			nShow = webviewCache.show;
			nShow = options.show ? $.extend(nShow, options.show) : nShow;
			webview.show(nShow.aniShow, nShow.duration, function() {
				triggerPreload(webview);
				trigger(webview, 'pagebeforeshow', false);
			});

			webviewCache.afterShowMethodName && webview.evalJS(webviewCache.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
			return webview;
		} else { //新窗口
			if (options.createNew !== true) {
				webview = plus.webview.getWebviewById(id);
				if (webview) { //如果已存在
					nShow = $.showOptions(options.show);
					nShow.autoShow && webview.show(nShow.aniShow, nShow.duration, function() {
						triggerPreload(webview);
						trigger(webview, 'pagebeforeshow', false);
					});
					return webview;
				}
			}
			//显示waiting
			var waitingConfig = $.waitingOptions(options.waiting);
			if (waitingConfig.autoShow) {
				nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options);
			}
			//创建页面
			options = $.extend(options, {
				id: id,
				url: url
			});

			webview = $.createWindow(options);
			//显示
			nShow = $.showOptions(options.show);
			if (nShow.autoShow) {
				webview.addEventListener("loaded", function() {
					//关闭等待框
					if (nWaiting) {
						nWaiting.close();
					}
					//显示页面
					webview.show(nShow.aniShow, nShow.duration, function() {
						triggerPreload(webview);
						trigger(webview, 'pagebeforeshow', false);
					});
					webview.showed = true;
					options.afterShowMethodName && webview.evalJS(options.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
				}, false);
			}
		}
		return webview;
	};
	/**
	 * 根据配置信息创建一个webview
	 * @param {type} options
	 * @param {type} isCreate
	 * @returns {webview}
	 */
	$.createWindow = function(options, isCreate) {
		if (!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if (options.preload) {
			if ($.webviews[id] && $.webviews[id].webview.getURL()) { //已经cache
				webview = $.webviews[id].webview;
			} else { //新增预加载窗口
				//preload
				//判断是否携带createNew参数，默认为false
				if (options.createNew !== true) {
					webview = plus.webview.getWebviewById(id);
				}

				//之前没有，那就新创建	
				if (!webview) {
					webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), $.extend({
						preload: true
					}, options.extras));
					if (options.subpages) {
						$.each(options.subpages, function(index, subpage) {
							//TODO 子窗口也可能已经创建，比如公用模板的情况；
							var subWebview = plus.webview.create(subpage.url, subpage.id || subpage.url, $.windowOptions(subpage.styles), $.extend({
								preload: true
							}, subpage.extras));
							webview.append(subWebview);
						});
					}
				}
			}

			//TODO 理论上，子webview也应该计算到预加载队列中，但这样就麻烦了，要退必须退整体，否则可能出现问题；
			$.webviews[id] = {
				webview: webview, //目前仅preload的缓存webview
				preload: true,
				show: $.showOptions(options.show),
				afterShowMethodName: options.afterShowMethodName //就不应该用evalJS。应该是通过事件消息通讯
			};
			//索引该预加载窗口
			var preloads = $.data.preloads;
			var index = preloads.indexOf(id);
			if (~index) { //删除已存在的(变相调整插入位置)
				preloads.splice(index, 1);
			}
			preloads.push(id);
			if (preloads.length > $.options.preloadLimit) {
				//先进先出
				var first = $.data.preloads.shift();
				var webviewCache = $.webviews[first];
				if (webviewCache && webviewCache.webview) {
					//需要将自己打开的所有页面，全部close；
					//关闭该预加载webview	
					$.closeAll(webviewCache.webview);
				}
				//删除缓存
				delete $.webviews[first];
			}
		} else {
			if (isCreate !== false) { //直接创建非预加载窗口
				webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), options.extras);
				if (options.subpages) {
					$.each(options.subpages, function(index, subpage) {
						var subWebview = plus.webview.create(subpage.url, subpage.id || subpage.url, $.windowOptions(subpage.styles), subpage.extras);
						webview.append(subWebview);
					});
				}
			}
		}
		return webview;
	};

	/**
	 * 预加载
	 */
	$.preload = function(options) {
		//调用预加载函数，不管是否传递preload参数，强制变为true
		if (!options.preload) {
			options.preload = true;
		}
		return $.createWindow(options);
	};

	/**
	 *关闭当前webview打开的所有webview；
	 */
	$.closeOpened = function(webview) {
		var opened = webview.opened();
		if (opened) {
			for (var i = 0, len = opened.length; i < len; i++) {
				var openedWebview = opened[i];
				var open_open = openedWebview.opened();
				if (open_open && open_open.length > 0) {
					$.closeOpened(openedWebview);
				} else {
					//如果直接孩子节点，就不用关闭了，因为父关闭的时候，会自动关闭子；
					if (openedWebview.parent() !== webview) {
						openedWebview.close('none');
					}
				}
			}
		}
	};
	$.closeAll = function(webview, aniShow) {
		$.closeOpened(webview);
		if (aniShow) {
			webview.close(aniShow);
		} else {
			webview.close();
		}
	};

	/**
	 * 批量创建webview
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.createWindows = function(options) {
		$.each(options, function(index, option) {
			//初始化预加载窗口(创建)和非预加载窗口(仅配置，不创建)
			$.createWindow(option, false);
		});
	};
	/**
	 * 创建当前页面的子webview
	 * @param {type} options
	 * @returns {webview}
	 */
	$.appendWebview = function(options) {
		if (!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if (!$.webviews[id]) { //保证执行一遍
			//TODO 这里也有隐患，比如某个webview不是作为subpage创建的，而是作为target webview的话；
			webview = plus.webview.create(options.url, id, options.styles, options.extras);
			//之前的实现方案：子窗口loaded之后再append到父窗口中；
			//问题：部分子窗口loaded事件发生较晚，此时执行父窗口的children方法会返回空，导致父子通讯失败；
			//     比如父页面执行完preload事件后，需触发子页面的preload事件，此时未append的话，就无法触发；
			//修改方式：不再监控loaded事件，直接append
			//by chb@20150521
			// webview.addEventListener('loaded', function() {
			plus.webview.currentWebview().append(webview);
			// });
			$.webviews[id] = options;
		}
		return webview;
	};

	//全局webviews
	$.webviews = {};
	//预加载窗口索引
	$.data.preloads = [];
	//$.currentWebview
	$.plusReady(function() {
		$.currentWebview = plus.webview.currentWebview();
	});
	$.addInit({
		name: '5+',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if ($.os.plus) {
				$.plusReady(function() {
					//TODO  这里需要判断一下，最好等子窗口加载完毕后，再调用主窗口的show方法；
					//或者：在openwindow方法中，监听实现；
					$.each(subpages, function(index, subpage) {
						$.appendWebview(subpage);
					});
					//判断是否首页
					if (plus.webview.currentWebview() === plus.webview.getWebviewById(plus.runtime.appid)) {
						$.isHomePage = true;
						//首页需要自己激活预加载；
						//timeout因为子页面loaded之后才append的，防止子页面尚未append、从而导致其preload未触发的问题；
						setTimeout(function() {
							triggerPreload(plus.webview.currentWebview());
						}, 300);
					}
					//设置ios顶部状态栏颜色；
					if ($.os.ios && $.options.statusBarBackground) {
						plus.navigator.setStatusBarBackground($.options.statusBarBackground);
					}
					if ($.os.android && parseFloat($.os.version) < 4.4) {
						//解决Android平台4.4版本以下，resume后，父窗体标题延迟渲染的问题；
						if (plus.webview.currentWebview().parent() == null) {
							document.addEventListener("resume", function() {
								var body = document.body;
								body.style.display = 'none';
								setTimeout(function() {
									body.style.display = '';
								}, 10);
							});
						}
					}
				});
			} else {
				//已支持iframe嵌入
				//				if (subpages.length > 0) {
				//					var err = document.createElement('div');
				//					err.className = 'mui-error';
				//					//文字描述
				//					var span = document.createElement('span');
				//					span.innerHTML = '在该浏览器下，不支持创建子页面，具体参考';
				//					err.appendChild(span);
				//					var a = document.createElement('a');
				//					a.innerHTML = '"mui框架适用场景"';
				//					a.href = 'http://ask.dcloud.net.cn/article/113';
				//					err.appendChild(a);
				//					document.body.appendChild(err);
				//					console.log('在该浏览器下，不支持创建子页面');
				//				}

			}

		}
	});
	window.addEventListener('preload', function() {
		//处理预加载部分
		var webviews = $.options.preloadPages || [];
		$.plusReady(function() {
			$.each(webviews, function(index, webview) {
				$.createWindow($.extend(webview, {
					preload: true
				}));
			});

		});
	});
	$.supportStatusbarOffset = function() {
		return $.os.plus && $.os.ios && parseFloat($.os.version) >= 7;
	};
	$.ready(function() {
		//标识当前环境支持statusbar
		if ($.supportStatusbarOffset()) {
			document.body.classList.add('mui-statusbar');
		}
	});
})(mui);
/**
 * mui back
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	/**
	 * register back
	 * @param {type} back
	 * @returns {$.gestures}
	 */
	$.addBack = function(back) {
		return $.addAction('backs', back);
	};
	/**
	 * default
	 */
	$.addBack({
		name: 'browser',
		index: 100,
		handle: function() {
			if (window.history.length > 1) {
				window.history.back();
				return true;
			}
			return false;
		}
	});
	/**
	 * 后退
	 */
	$.back = function() {
		if (typeof $.options.beforeback === 'function') {
			if ($.options.beforeback() === false) {
				return;
			}
		}
		$.doAction('backs');
	};
	window.addEventListener('tap', function(e) {
		var action = $.targets.action;
		if (action && action.classList.contains('mui-action-back')) {
			$.back();
			$.targets.action = false;
		}
	});
	window.addEventListener('swiperight', function(e) {
		var detail = e.detail;
		if ($.options.swipeBack === true && Math.abs(detail.angle) < 3) {
			$.back();
		}
	});

})(mui, window);
/**
 * mui back 5+
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	if ($.os.plus && $.os.android) {
		$.addBack({
			name: 'mui',
			index: 5,
			handle: function() {
				//后续重新设计此处，将back放到各个空间内部实现
				//popover
				if ($.targets._popover && $.targets._popover.classList.contains('mui-active')) {
					$($.targets._popover).popover('hide');
					return true;
				}
				//offcanvas
				var offCanvas = document.querySelector('.mui-off-canvas-wrap.mui-active');
				if (offCanvas) {
					$(offCanvas).offCanvas('close');
					return true;
				}
				var previewImage = $.isFunction($.getPreviewImage) && $.getPreviewImage();
				if (previewImage && previewImage.isShown()) {
					previewImage.close();
					return true;
				}
				//popup
				return $.closePopup();
			}
		});
	}
	/**
	 * 5+ back
	 */
	$.addBack({
		name: '5+',
		index: 10,
		handle: function() {
			if (!window.plus) {
				return false;
			}
			var wobj = plus.webview.currentWebview();
			var parent = wobj.parent();
			if (parent) {
				parent.evalJS('mui&&mui.back();');
			} else {
				wobj.canBack(function(e) {
					//by chb 暂时注释，在碰到类似popover之类的锚点的时候，需多次点击才能返回；
					if (e.canBack) { //webview history back
						window.history.back();
					} else { //webview close or hide
						//fixed by fxy 此处不应该用opener判断，因为用户有可能自己close掉当前窗口的opener。这样的话。opener就为空了，导致不能执行close
						if (wobj.id === plus.runtime.appid) { //首页
							//首页不存在opener的情况下，后退实际上应该是退出应用；
							//这个交给项目具体实现，框架暂不处理；
							//plus.runtime.quit();	
						} else { //其他页面，
							if (wobj.preload) {
								wobj.hide("auto");
							} else {
								//关闭页面时，需要将其打开的所有子页面全部关闭；
								$.closeAll(wobj);
							}
						}
					}
				});
			}
			return true;
		}
	});


	$.menu = function() {
		var menu = document.querySelector('.mui-action-menu');
		if (menu) {
			$.trigger(menu, $.EVENT_START); //临时处理menu无touchstart的话，找不到当前targets的问题
			$.trigger(menu, 'tap');
		} else { //执行父窗口的menu
			if (window.plus) {
				var wobj = $.currentWebview;
				var parent = wobj.parent();
				if (parent) { //又得evalJS
					parent.evalJS('mui&&mui.menu();');
				}
			}
		}
	};
	var __back = function() {
		$.back();
	};
	var __menu = function() {
		$.menu();
	};
	//默认监听
	$.plusReady(function() {
		if ($.options.keyEventBind.backbutton) {
			plus.key.addEventListener('backbutton', __back, false);
		}
		if ($.options.keyEventBind.menubutton) {
			plus.key.addEventListener('menubutton', __menu, false);
		}
	});
	//处理按键监听事件
	$.addInit({
		name: 'keyEventBind',
		index: 1000,
		handle: function() {
			$.plusReady(function() {
				//如果不为true，则移除默认监听
				if (!$.options.keyEventBind.backbutton) {
					plus.key.removeEventListener('backbutton', __back);
				}
				if (!$.options.keyEventBind.menubutton) {
					plus.key.removeEventListener('menubutton', __menu);
				}
			});
		}
	});
})(mui, window);
/**
 * mui.init pulldownRefresh
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.addInit({
		name: 'pullrefresh',
		index: 1000,
		handle: function() {
			var options = $.options;
			var pullRefreshOptions = options.pullRefresh || {};
			var hasPulldown = pullRefreshOptions.down && pullRefreshOptions.down.hasOwnProperty('callback');
			var hasPullup = pullRefreshOptions.up && pullRefreshOptions.up.hasOwnProperty('callback');
			if (hasPulldown || hasPullup) {
				var container = pullRefreshOptions.container;
				if (container) {
					var $container = $(container);
					if ($container.length === 1) {
						if ($.os.plus && $.os.android) { //android 5+
							$.plusReady(function() {
								var webview = plus.webview.currentWebview();
								if (hasPullup) {
									//当前页面初始化pullup
									var upOptions = {};
									upOptions.up = pullRefreshOptions.up;
									upOptions.webviewId = webview.id || webview.getURL();
									$container.pullRefresh(upOptions);
								}
								if (hasPulldown) {
									var parent = webview.parent();
									var id = webview.id || webview.getURL();
									if (parent) {
										if (!hasPullup) { //如果没有上拉加载，需要手动初始化一个默认的pullRefresh，以便当前页面容器可以调用endPulldownToRefresh等方法
											$container.pullRefresh({
												webviewId: id
											});
										}
										var downOptions = {
											webviewId: id
										};
										downOptions.down = $.extend({}, pullRefreshOptions.down);
										downOptions.down.callback = '_CALLBACK';
										//父页面初始化pulldown
										parent.evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(downOptions) + "')");
									}
								}
							});
						} else {
							$container.pullRefresh(pullRefreshOptions);
						}
					}
				}
			}
		}
	});
})(mui);
/**
 * mui ajax
 * @param {type} $
 * @returns {undefined}
 */
(function($, window, undefined) {

	var jsonType = 'application/json';
	var htmlType = 'text/html';
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var scriptTypeRE = /^(?:text|application)\/javascript/i;
	var xmlTypeRE = /^(?:text|application)\/xml/i;
	var blankRE = /^\s*$/;

	$.ajaxSettings = {
		type: 'GET',
		beforeSend: $.noop,
		success: $.noop,
		error: $.noop,
		complete: $.noop,
		context: null,
		xhr: function(protocol) {
			return new window.XMLHttpRequest();
		},
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: jsonType,
			xml: 'application/xml, text/xml',
			html: htmlType,
			text: 'text/plain'
		},
		timeout: 0,
		processData: true,
		cache: true
	};
	var ajaxBeforeSend = function(xhr, settings) {
		var context = settings.context
		if (settings.beforeSend.call(context, xhr, settings) === false) {
			return false;
		}
	};
	var ajaxSuccess = function(data, xhr, settings) {
		settings.success.call(settings.context, data, 'success', xhr);
		ajaxComplete('success', xhr, settings);
	};
	// type: "timeout", "error", "abort", "parsererror"
	var ajaxError = function(error, type, xhr, settings) {
		settings.error.call(settings.context, xhr, type, error);
		ajaxComplete(type, xhr, settings);
	};
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	var ajaxComplete = function(status, xhr, settings) {
		settings.complete.call(settings.context, xhr, status);
	};

	var serialize = function(params, obj, traditional, scope) {
		var type, array = $.isArray(obj),
			hash = $.isPlainObject(obj);
		$.each(obj, function(key, value) {
			type = $.type(value);
			if (scope) {
				key = traditional ? scope :
					scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
			}
			// handle data in serializeArray() format
			if (!scope && array) {
				params.add(value.name, value.value);
			}
			// recurse into nested objects
			else if (type === "array" || (!traditional && type === "object")) {
				serialize(params, value, traditional, key);
			} else {
				params.add(key, value);
			}
		});
	};
	var serializeData = function(options) {
		if (options.processData && options.data && typeof options.data !== "string") {
			options.data = $.param(options.data, options.traditional);
		}
		if (options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
			options.url = appendQuery(options.url, options.data);
			options.data = undefined;
		}
	};
	var appendQuery = function(url, query) {
		if (query === '') {
			return url;
		}
		return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	};
	var mimeToDataType = function(mime) {
		if (mime) {
			mime = mime.split(';', 2)[0];
		}
		return mime && (mime === htmlType ? 'html' :
			mime === jsonType ? 'json' :
			scriptTypeRE.test(mime) ? 'script' :
			xmlTypeRE.test(mime) && 'xml') || 'text';
	};
	var parseArguments = function(url, data, success, dataType) {
		if ($.isFunction(data)) {
			dataType = success, success = data, data = undefined;
		}
		if (!$.isFunction(success)) {
			dataType = success, success = undefined;
		}
		return {
			url: url,
			data: data,
			success: success,
			dataType: dataType
		};
	};
	$.ajax = function(url, options) {
		if (typeof url === "object") {
			options = url;
			url = undefined;
		}
		var settings = options || {};
		settings.url = url || settings.url;
		for (var key in $.ajaxSettings) {
			if (settings[key] === undefined) {
				settings[key] = $.ajaxSettings[key];
			}
		}
		serializeData(settings);
		var dataType = settings.dataType;

		if (settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
			settings.url = appendQuery(settings.url, '_=' + $.now());
		}
		var mime = settings.accepts[dataType && dataType.toLowerCase()];
		var headers = {};
		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		};
		var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
		var xhr = settings.xhr(settings);
		var nativeSetHeader = xhr.setRequestHeader;
		var abortTimeout;

		setHeader('X-Requested-With', 'XMLHttpRequest');
		setHeader('Accept', mime || '*/*');
		if (!!(mime = settings.mimeType || mime)) {
			if (mime.indexOf(',') > -1) {
				mime = mime.split(',', 2)[0];
			}
			xhr.overrideMimeType && xhr.overrideMimeType(mime);
		}
		if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
			setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
		}
		if (settings.headers) {
			for (var name in settings.headers)
				setHeader(name, settings.headers[name]);
		}
		xhr.setRequestHeader = setHeader;

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				xhr.onreadystatechange = $.noop;
				clearTimeout(abortTimeout);
				var result, error = false;
				var isLocal = protocol === 'file:';
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
					result = xhr.responseText;
					try {
						// http://perfectionkills.com/global-eval-what-are-the-options/
						if (dataType === 'script') {
							(1, eval)(result);
						} else if (dataType === 'xml') {
							result = xhr.responseXML;
						} else if (dataType === 'json') {
							result = blankRE.test(result) ? null : $.parseJSON(result);
						}
					} catch (e) {
						error = e;
					}

					if (error) {
						ajaxError(error, 'parsererror', xhr, settings);
					} else {
						ajaxSuccess(result, xhr, settings);
					}
				} else {
					var status = xhr.status ? 'error' : 'abort';
					var statusText = xhr.statusText || null;
					if (isLocal) {
						status = 'error';
						statusText = '404';
					}
					ajaxError(statusText, status, xhr, settings);
				}
			}
		};
		if (ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			ajaxError(null, 'abort', xhr, settings);
			return xhr;
		}

		if (settings.xhrFields) {
			for (var name in settings.xhrFields) {
				xhr[name] = settings.xhrFields[name];
			}
		}

		var async = 'async' in settings ? settings.async : true;

		xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

		for (var name in headers) {
			nativeSetHeader.apply(xhr, headers[name]);
		}
		if (settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = $.noop;
				xhr.abort();
				ajaxError(null, 'timeout', xhr, settings);
			}, settings.timeout);
		}
		xhr.send(settings.data ? settings.data : null);
		return xhr;
	};


	$.param = function(obj, traditional) {
		var params = [];
		params.add = function(k, v) {
			this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
		};
		serialize(params, obj, traditional);
		return params.join('&').replace(/%20/g, '+');
	};
	$.get = function( /* url, data, success, dataType */ ) {
		return $.ajax(parseArguments.apply(null, arguments));
	};

	$.post = function( /* url, data, success, dataType */ ) {
		var options = parseArguments.apply(null, arguments);
		options.type = 'POST';
		return $.ajax(options);
	};

	$.getJSON = function( /* url, data, success */ ) {
		var options = parseArguments.apply(null, arguments);
		options.dataType = 'json';
		return $.ajax(options);
	};

	$.fn.load = function(url, data, success) {
		if (!this.length)
			return this;
		var self = this,
			parts = url.split(/\s/),
			selector,
			options = parseArguments(url, data, success),
			callback = options.success;
		if (parts.length > 1)
			options.url = parts[0], selector = parts[1];
		options.success = function(response) {
			if (selector) {
				var div = document.createElement('div');
				div.innerHTML = response.replace(rscript, "");
				var selectorDiv = document.createElement('div');
				var childs = div.querySelectorAll(selector);
				if (childs && childs.length > 0) {
					for (var i = 0, len = childs.length; i < len; i++) {
						selectorDiv.appendChild(childs[i]);
					}
				}
				self[0].innerHTML = selectorDiv.innerHTML;
			} else {
				self[0].innerHTML = response;
			}
			callback && callback.apply(self, arguments);
		};
		$.ajax(options);
		return this;
	};

})(mui, window);
/**
 * 5+ ajax
 */
(function($) {
	var originAnchor = document.createElement('a');
	originAnchor.href = window.location.href;
	$.plusReady(function() {
		$.ajaxSettings = $.extend($.ajaxSettings, {
			xhr: function(settings) {
				if (settings.crossDomain) { //强制使用plus跨域
					return new plus.net.XMLHttpRequest();
				}
				//仅在webview的url为远程文件，且ajax请求的资源不同源下使用plus.net.XMLHttpRequest
				if (originAnchor.protocol !== 'file:') {
					var urlAnchor = document.createElement('a');
					urlAnchor.href = settings.url;
					urlAnchor.href = urlAnchor.href;
					settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
					if (settings.crossDomain) {
						return new plus.net.XMLHttpRequest();
					}
				}
				return new window.XMLHttpRequest();
			}
		});
	});
})(mui);
/**
 * mui layout(offset[,position,width,height...])
 * @param {type} $
 * @param {type} window
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, undefined) {
	$.offset = function(element) {
		var box = {
			top : 0,
			left : 0
		};
		if ( typeof element.getBoundingClientRect !== undefined) {
			box = element.getBoundingClientRect();
		}
		return {
			top : box.top + window.pageYOffset - element.clientTop,
			left : box.left + window.pageXOffset - element.clientLeft
		};
	};
})(mui, window); 
/**
 * mui animation
 */
(function($, window) {
	/**
	 * scrollTo
	 */
	$.scrollTo = function(scrollTop, duration, callback) {
		duration = duration || 1000;
		var scroll = function(duration) {
			if (duration <= 0) {
				window.scrollTo(0, scrollTop);
				callback && callback();
				return;
			}
			var distaince = scrollTop - window.scrollY;
			setTimeout(function() {
				window.scrollTo(0, window.scrollY + distaince / duration * 10);
				scroll(duration - 10);
			}, 16.7);
		};
		scroll(duration);
	};
	$.animationFrame = function(cb) {
		var args, isQueued, context;
		return function() {
			args = arguments;
			context = this;
			if (!isQueued) {
				isQueued = true;
				requestAnimationFrame(function() {
					cb.apply(context, args);
					isQueued = false;
				});
			}
		};
	};

})(mui, window);
(function($) {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	var Class = function() {};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
	$.Class = Class;
})(mui);
(function($, document, undefined) {
	var CLASS_PULL_TOP_POCKET = 'mui-pull-top-pocket';
	var CLASS_PULL_BOTTOM_POCKET = 'mui-pull-bottom-pocket';
	var CLASS_PULL = 'mui-pull';
	var CLASS_PULL_LOADING = 'mui-pull-loading';
	var CLASS_PULL_CAPTION = 'mui-pull-caption';
	var CLASS_PULL_CAPTION_DOWN = 'mui-pull-caption-down';
	var CLASS_PULL_CAPTION_REFRESH = 'mui-pull-caption-refresh';
	var CLASS_PULL_CAPTION_NOMORE = 'mui-pull-caption-nomore';

	var CLASS_ICON = 'mui-icon';
	var CLASS_SPINNER = 'mui-spinner';
	var CLASS_ICON_PULLDOWN = 'mui-icon-pulldown';

	var CLASS_BLOCK = 'mui-block';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_VISIBILITY = 'mui-visibility';

	var CLASS_LOADING_UP = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
	var CLASS_LOADING_DOWN = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
	var CLASS_LOADING = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_SPINNER;

	var pocketHtml = ['<div class="' + CLASS_PULL + '">', '<div class="{icon}"></div>', '<div class="' + CLASS_PULL_CAPTION + '">{contentrefresh}</div>', '</div>'].join('');

	var PullRefresh = {
		init: function(element, options) {
			this._super(element, $.extend(true, {
				scrollY: true,
				scrollX: false,
				indicators: true,
				deceleration: 0.003,
				down: {
					height: 50,
					contentinit: '下拉可以刷新',
					contentdown: '下拉可以刷新',
					contentover: '释放立即刷新',
					contentrefresh: '正在刷新...'
				},
				up: {
					height: 50,
					auto: false,
					contentinit: '上拉显示更多',
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了',
					duration: 300
				}
			}, options));
		},
		_init: function() {
			this._super();
			this._initPocket();
		},
		_initPulldownRefresh: function() {
			this.pulldown = true;
			this.pullPocket = this.topPocket;
			this.pullPocket.classList.add(CLASS_BLOCK);
			this.pullPocket.classList.add(CLASS_VISIBILITY);
			this.pullCaption = this.topCaption;
			this.pullLoading = this.topLoading;
		},
		_initPullupRefresh: function() {
			this.pulldown = false;
			this.pullPocket = this.bottomPocket;
			this.pullPocket.classList.add(CLASS_BLOCK);
			this.pullPocket.classList.add(CLASS_VISIBILITY);
			this.pullCaption = this.bottomCaption;
			this.pullLoading = this.bottomLoading;
		},
		_initPocket: function() {
			var options = this.options;
			if (options.down && options.down.hasOwnProperty('callback')) {
				this.topPocket = this.scroller.querySelector('.' + CLASS_PULL_TOP_POCKET);
				if (!this.topPocket) {
					this.topPocket = this._createPocket(CLASS_PULL_TOP_POCKET, options.down, CLASS_LOADING_DOWN);
					this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild);
				}
				this.topLoading = this.topPocket.querySelector('.' + CLASS_PULL_LOADING);
				this.topCaption = this.topPocket.querySelector('.' + CLASS_PULL_CAPTION);
			}
			if (options.up && options.up.hasOwnProperty('callback')) {
				this.bottomPocket = this.scroller.querySelector('.' + CLASS_PULL_BOTTOM_POCKET);
				if (!this.bottomPocket) {
					this.bottomPocket = this._createPocket(CLASS_PULL_BOTTOM_POCKET, options.up, CLASS_LOADING);
					this.scroller.appendChild(this.bottomPocket);
				}
				this.bottomLoading = this.bottomPocket.querySelector('.' + CLASS_PULL_LOADING);
				this.bottomCaption = this.bottomPocket.querySelector('.' + CLASS_PULL_CAPTION);
				//TODO only for h5
				this.wrapper.addEventListener('scrollbottom', this);
			}
		},
		_createPocket: function(clazz, options, iconClass) {
			var pocket = document.createElement('div');
			pocket.className = clazz;
			pocket.innerHTML = pocketHtml.replace('{contentrefresh}', options.contentinit).replace('{icon}', iconClass);
			return pocket;
		},
		_resetPullDownLoading: function() {
			var loading = this.pullLoading;
			if (loading) {
				this.pullCaption.innerHTML = this.options.down.contentdown;
				loading.style.webkitTransition = "";
				loading.style.webkitTransform = "";
				loading.style.webkitAnimation = "";
				loading.className = CLASS_LOADING_DOWN;
			}
		},
		_setCaptionClass: function(isPulldown, caption, title) {
			if (!isPulldown) {
				switch (title) {
					case this.options.up.contentdown:
						caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
						break;
					case this.options.up.contentrefresh:
						caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_REFRESH
						break;
					case this.options.up.contentnomore:
						caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_NOMORE;
						break;
				}
			}
		},
		_setCaption: function(title, reset) {
			if (this.loading) {
				return;
			}
			var options = this.options;
			var pocket = this.pullPocket;
			var caption = this.pullCaption;
			var loading = this.pullLoading;
			var isPulldown = this.pulldown;
			var self = this;
			if (pocket) {
				if (reset) {
					setTimeout(function() {
						caption.innerHTML = self.lastTitle = title;
						if (isPulldown) {
							loading.className = CLASS_LOADING_DOWN;
						} else {
							self._setCaptionClass(false, caption, title);
							loading.className = CLASS_LOADING;
						}
						loading.style.webkitAnimation = "";
						loading.style.webkitTransition = "";
						loading.style.webkitTransform = "";
					}, 100);
				} else {
					if (title !== this.lastTitle) {
						caption.innerHTML = title;
						if (isPulldown) {
							if (title === options.down.contentrefresh) {
								loading.className = CLASS_LOADING;
								loading.style.webkitAnimation = "spinner-spin 1s step-end infinite";
							} else if (title === options.down.contentover) {
								loading.className = CLASS_LOADING_UP;
								loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
								loading.style.webkitTransform = "rotate(180deg)";
							} else if (title === options.down.contentdown) {
								loading.className = CLASS_LOADING_DOWN;
								loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
								loading.style.webkitTransform = "rotate(0deg)";
							}
						} else {
							if (title === options.up.contentrefresh) {
								loading.className = CLASS_LOADING + ' ' + CLASS_VISIBILITY;
							} else {
								loading.className = CLASS_LOADING + ' ' + CLASS_HIDDEN;
							}
							self._setCaptionClass(false, caption, title);
						}
						this.lastTitle = title;
					}
				}

			}
		}
	};
	$.PullRefresh = PullRefresh;
})(mui, document);
(function($, window, document, undefined) {
	var CLASS_SCROLLBAR = 'mui-scrollbar';
	var CLASS_INDICATOR = 'mui-scrollbar-indicator';
	var CLASS_SCROLLBAR_VERTICAL = CLASS_SCROLLBAR + '-vertical';
	var CLASS_SCROLLBAR_HORIZONTAL = CLASS_SCROLLBAR + '-horizontal';

	var CLASS_ACTIVE = 'mui-active';

	var ease = {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function(k) {
				return k * (2 - k);
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
			fn: function(k) {
				return Math.sqrt(1 - (--k * k));
			}
		},
		outCirc: {
			style: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
		},
		outCubic: {
			style: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
		}
	}
	var Scroll = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.children[0];
			this.scrollerStyle = this.scroller && this.scroller.style;
			this.stopped = false;

			this.options = $.extend(true, {
				scrollY: true, //是否竖向滚动
				scrollX: false, //是否横向滚动
				startX: 0, //初始化时滚动至x
				startY: 0, //初始化时滚动至y

				indicators: true, //是否显示滚动条
				stopPropagation: false,
				hardwareAccelerated: true,
				fixedBadAndorid: false,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
				},
				momentum: true,

				snapX: 0.5, //横向切换距离(以当前容器宽度为基准)
				snap: false, //图片轮播，拖拽式选项卡

				bounce: true, //是否启用回弹
				bounceTime: 500, //回弹动画时间
				bounceEasing: ease.outCirc, //回弹动画曲线

				scrollTime: 500,
				scrollEasing: ease.outCubic, //轮播动画曲线


				directionLockThreshold: 5,

				parallaxElement: false, //视差元素
				parallaxRatio: 0.5
			}, options);

			this.x = 0;
			this.y = 0;
			this.translateZ = this.options.hardwareAccelerated ? ' translateZ(0)' : '';

			this._init();
			if (this.scroller) {
				this.refresh();
				//				if (this.options.startX !== 0 || this.options.startY !== 0) { //需要判断吗？后续根据实际情况再看看
				this.scrollTo(this.options.startX, this.options.startY);
				//				}
			}
		},
		_init: function() {
			this._initParallax();
			this._initIndicators();
			this._initEvent();
		},
		_initParallax: function() {
			if (this.options.parallaxElement) {
				this.parallaxElement = document.querySelector(this.options.parallaxElement);
				this.parallaxStyle = this.parallaxElement.style;
				this.parallaxHeight = this.parallaxElement.offsetHeight;
				this.parallaxImgStyle = this.parallaxElement.querySelector('img').style;
			}
		},
		_initIndicators: function() {
			var self = this;
			self.indicators = [];
			if (!this.options.indicators) {
				return;
			}
			var indicators = [],
				indicator;

			// Vertical scrollbar
			if (self.options.scrollY) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_VERTICAL),
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if (this.options.scrollX) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_HORIZONTAL),
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]));
			}

		},
		_initSnap: function() {
			this.currentPage = {};
			this.pages = [];
			var snaps = this.snaps;
			var length = snaps.length;
			var m = 0;
			var n = -1;
			var x = 0;
			var leftX = 0;
			var rightX = 0;
			var snapX = 0;
			for (var i = 0; i < length; i++) {
				var snap = snaps[i];
				var offsetLeft = snap.offsetLeft;
				var offsetWidth = snap.offsetWidth;
				if (i === 0 || offsetLeft <= snaps[i - 1].offsetLeft) {
					m = 0;
					n++;
				}
				if (!this.pages[m]) {
					this.pages[m] = [];
				}
				x = this._getSnapX(offsetLeft);
				snapX = Math.round((offsetWidth) * this.options.snapX);
				leftX = x - snapX;
				rightX = x - offsetWidth + snapX;
				this.pages[m][n] = {
					x: x,
					leftX: leftX,
					rightX: rightX,
					pageX: m,
					element: snap
				}
				if (snap.classList.contains(CLASS_ACTIVE)) {
					this.currentPage = this.pages[m][0];
				}
				if (x >= this.maxScrollX) {
					m++;
				}
			}
			this.options.startX = this.currentPage.x || 0;
		},
		_getSnapX: function(offsetLeft) {
			return Math.max(Math.min(0, -offsetLeft + (this.wrapperWidth / 2)), this.maxScrollX);
		},
		_gotoPage: function(index) {
			this.currentPage = this.pages[Math.min(index, this.pages.length - 1)][0];
			for (var i = 0, len = this.snaps.length; i < len; i++) {
				if (i === index) {
					this.snaps[i].classList.add(CLASS_ACTIVE);
				} else {
					this.snaps[i].classList.remove(CLASS_ACTIVE);
				}
			}
			this.scrollTo(this.currentPage.x, 0, this.options.scrollTime);
		},
		_nearestSnap: function(x) {
			if (!this.pages.length) {
				return {
					x: 0,
					pageX: 0
				};
			}
			var i = 0;
			var length = this.pages.length;
			if (x > 0) {
				x = 0;
			} else if (x < this.maxScrollX) {
				x = this.maxScrollX;
			}
			for (; i < length; i++) {
				var nearestX = this.direction === 'left' ? this.pages[i][0].leftX : this.pages[i][0].rightX;
				if (x >= nearestX) {
					return this.pages[i][0];
				}
			}
			return {
				x: 0,
				pageX: 0
			};
		},
		_initEvent: function(detach) {
			var action = detach ? 'removeEventListener' : 'addEventListener';
			window[action]('orientationchange', this);
			window[action]('resize', this);

			this.scroller[action]('webkitTransitionEnd', this);

			this.wrapper[action]($.EVENT_START, this);
			this.wrapper[action]($.EVENT_CANCEL, this);
			this.wrapper[action]($.EVENT_END, this);
			this.wrapper[action]('drag', this);
			this.wrapper[action]('dragend', this);
			this.wrapper[action]('flick', this);
			this.wrapper[action]('scrollend', this);
			if (this.options.scrollX) {
				this.wrapper[action]('swiperight', this);
			}
			var segmentedControl = this.wrapper.querySelector('.mui-segmented-control');
			if (segmentedControl) { //靠，这个bug排查了一下午，阻止hash跳转，一旦hash跳转会导致可拖拽选项卡的tab不见
				mui(segmentedControl)[detach ? 'off' : 'on']('click', 'a', $.preventDefault);
			}

			this.wrapper[action]('scrollstart', this);
			this.wrapper[action]('refresh', this);
		},
		_handleIndicatorScrollend: function() {
			this.indicators.map(function(indicator) {
				indicator.fade();
			});
		},
		_handleIndicatorScrollstart: function() {
			this.indicators.map(function(indicator) {
				indicator.fade(1);
			});
		},
		_handleIndicatorRefresh: function() {
			this.indicators.map(function(indicator) {
				indicator.refresh();
			});
		},
		handleEvent: function(e) {
			if (this.stopped) {
				this.resetPosition();
				return;
			}

			switch (e.type) {
				case $.EVENT_START:
					this._start(e);
					break;
				case 'drag':
					this.options.stopPropagation && e.stopPropagation();
					this._drag(e);
					break;
				case 'dragend':
				case 'flick':
					this.options.stopPropagation && e.stopPropagation();
					this._flick(e);
					break;
				case $.EVENT_CANCEL:
				case $.EVENT_END:
					this._end(e);
					break;
				case 'webkitTransitionEnd':
					this.transitionTimer && this.transitionTimer.cancel();
					this._transitionEnd(e);
					break;
				case 'scrollstart':
					this._handleIndicatorScrollstart(e);
					break;
				case 'scrollend':
					this._handleIndicatorScrollend(e);
					this._scrollend(e);
					e.stopPropagation();
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'swiperight':
					e.stopPropagation();
					break;
				case 'refresh':
					this._handleIndicatorRefresh(e);
					break;

			}
		},
		_start: function(e) {
			this.moved = this.needReset = false;
			this._transitionTime();
			if (this.isInTransition) {
				this.needReset = true;
				this.isInTransition = false;
				var pos = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
				this.setTranslate(Math.round(pos.x), Math.round(pos.y));
				//				this.resetPosition(); //reset
				$.trigger(this.scroller, 'scrollend', this);
				//				e.stopPropagation();
				e.preventDefault();
			}
			this.reLayout();
			$.trigger(this.scroller, 'beforescrollstart', this);
		},
		_getDirectionByAngle: function(angle) {
			if (angle < -80 && angle > -100) {
				return 'up';
			} else if (angle >= 80 && angle < 100) {
				return 'down';
			} else if (angle >= 170 || angle <= -170) {
				return 'left';
			} else if (angle >= -35 && angle <= 10) {
				return 'right';
			}
			return null;
		},
		_drag: function(e) {
			//			if (this.needReset) {
			//				e.stopPropagation(); //disable parent drag(nested scroller)
			//				return;
			//			}
			var detail = e.detail;
			if (this.options.scrollY || detail.direction === 'up' || detail.direction === 'down') { //如果是竖向滚动或手势方向是上或下
				//ios8 hack
				if ($.os.ios && parseFloat($.os.version) >= 8) { //多webview时，离开当前webview会导致后续touch事件不触发
					var clientY = detail.gesture.touches[0].clientY;
					//下拉刷新 or 上拉加载
					if ((clientY + 10) > window.innerHeight || clientY < 10) {
						this.resetPosition(this.options.bounceTime);
						return;
					}
				}
			}
			var isPreventDefault = isReturn = false;
			var direction = this._getDirectionByAngle(detail.angle);
			if (detail.direction === 'left' || detail.direction === 'right') {
				if (this.options.scrollX) {
					isPreventDefault = true;
					if (!this.moved) { //识别角度(该角度导致轮播不灵敏)
						//						if (direction !== 'left' && direction !== 'right') {
						//							isReturn = true;
						//						} else {
						$.gestures.session.lockDirection = true; //锁定方向
						$.gestures.session.startDirection = detail.direction;
						//						}
					}
				} else if (this.options.scrollY && !this.moved) {
					isReturn = true;
				}
			} else if (detail.direction === 'up' || detail.direction === 'down') {
				if (this.options.scrollY) {
					isPreventDefault = true;
					//					if (!this.moved) { //识别角度,竖向滚动似乎没必要进行小角度验证
					//						if (direction !== 'up' && direction !== 'down') {
					//							isReturn = true;
					//						}
					//					}
					if (!this.moved) {
						$.gestures.session.lockDirection = true; //锁定方向
						$.gestures.session.startDirection = detail.direction;
					}
				} else if (this.options.scrollX && !this.moved) {
					isReturn = true;
				}
			} else {
				isReturn = true;
			}
			if (this.moved || isPreventDefault) {
				e.stopPropagation(); //阻止冒泡(scroll类嵌套)
				detail.gesture && detail.gesture.preventDefault();
			}
			if (isReturn) { //禁止非法方向滚动
				return;
			}
			if (!this.moved) {
				$.trigger(this.scroller, 'scrollstart', this);
			} else {
				e.stopPropagation(); //move期间阻止冒泡(scroll嵌套)
			}
			var deltaX = 0;
			var deltaY = 0;
			if (!this.moved) { //start
				deltaX = detail.deltaX;
				deltaY = detail.deltaY;
			} else { //move
				deltaX = detail.deltaX - $.gestures.session.prevTouch.deltaX;
				deltaY = detail.deltaY - $.gestures.session.prevTouch.deltaY;
			}
			var absDeltaX = Math.abs(detail.deltaX);
			var absDeltaY = Math.abs(detail.deltaY);
			if (absDeltaX > absDeltaY + this.options.directionLockThreshold) {
				deltaY = 0;
			} else if (absDeltaY >= absDeltaX + this.options.directionLockThreshold) {
				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
			var newX = this.x + deltaX;
			var newY = this.y + deltaY;
			// Slow down if outside of the boundaries
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			if (!this.requestAnimationFrame) {
				this._updateTranslate();
			}
			this.direction = detail.deltaX > 0 ? 'right' : 'left';
			this.moved = true;
			this.x = newX;
			this.y = newY;
			$.trigger(this.scroller, 'scroll', this);
		},
		_flick: function(e) {
			//			if (!this.moved || this.needReset) {
			//				return;
			//			}
			if (!this.moved) {
				return;
			}
			e.stopPropagation();
			var detail = e.detail;
			this._clearRequestAnimationFrame();
			if (e.type === 'dragend' && detail.flick) { //dragend
				return;
			}

			var newX = Math.round(this.x);
			var newY = Math.round(this.y);

			this.isInTransition = false;
			// reset if we are outside of the boundaries
			if (this.resetPosition(this.options.bounceTime)) {
				return;
			}

			this.scrollTo(newX, newY); // ensures that the last position is rounded

			if (e.type === 'dragend') { //dragend
				$.trigger(this.scroller, 'scrollend', this);
				return;
			}
			var time = 0;
			var easing = '';
			// start momentum animation if needed
			if (this.options.momentum && detail.flickTime < 300) {
				momentumX = this.hasHorizontalScroll ? this._momentum(this.x, detail.flickDistanceX, detail.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: newX,
					duration: 0
				};
				momentumY = this.hasVerticalScroll ? this._momentum(this.y, detail.flickDistanceY, detail.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: newY,
					duration: 0
				};
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = true;
			}

			if (newX != this.x || newY != this.y) {
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = ease.quadratic;
				}
				this.scrollTo(newX, newY, time, easing);
				return;
			}

			$.trigger(this.scroller, 'scrollend', this);
			//			e.stopPropagation();
		},
		_end: function(e) {
			this.needReset = false;
			if ((!this.moved && this.needReset) || e.type === $.EVENT_CANCEL) {
				this.resetPosition();
			}
		},
		_transitionEnd: function(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				$.trigger(this.scroller, 'scrollend', this);
			}
		},
		_scrollend: function(e) {
			if (Math.abs(this.y) > 0 && this.y <= this.maxScrollY) {
				$.trigger(this.scroller, 'scrollbottom', this);
			}
		},
		_resize: function() {
			var that = this;
			clearTimeout(that.resizeTimeout);
			that.resizeTimeout = setTimeout(function() {
				that.refresh();
			}, that.options.resizePolling);
		},
		_transitionTime: function(time) {
			time = time || 0;
			this.scrollerStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
				this.parallaxStyle['webkitTransitionDuration'] = time + 'ms';
			}
			if (this.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.scrollerStyle['webkitTransitionDuration'] = '0.001s';
				if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
					this.parallaxStyle['webkitTransitionDuration'] = '0.001s';
				}
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time);
				}
			}
			if (time) { //自定义timer，保证webkitTransitionEnd始终触发
				this.transitionTimer && this.transitionTimer.cancel();
				this.transitionTimer = $.later(function() {
					$.trigger(this.scroller, 'webkitTransitionEnd');
				}, time + 100, this);
			}
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle['webkitTransitionTimingFunction'] = easing;
			if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
				this.parallaxStyle['webkitTransitionDuration'] = easing;
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}
		},
		_translate: function(x, y) {
			this.x = x;
			this.y = y;
		},
		_clearRequestAnimationFrame: function() {
			if (this.requestAnimationFrame) {
				cancelAnimationFrame(this.requestAnimationFrame);
				this.requestAnimationFrame = null;
			}
		},
		_updateTranslate: function() {
			var self = this;
			if (self.x !== self.lastX || self.y !== self.lastY) {
				self.setTranslate(self.x, self.y);
			}
			self.requestAnimationFrame = requestAnimationFrame(function() {
				self._updateTranslate();
			});
		},
		_createScrollBar: function(clazz) {
			var scrollbar = document.createElement('div');
			var indicator = document.createElement('div');
			scrollbar.className = CLASS_SCROLLBAR + ' ' + clazz;
			indicator.className = CLASS_INDICATOR;
			scrollbar.appendChild(indicator);
			if (clazz === CLASS_SCROLLBAR_VERTICAL) {
				this.scrollbarY = scrollbar;
				this.scrollbarIndicatorY = indicator;
			} else if (clazz === CLASS_SCROLLBAR_HORIZONTAL) {
				this.scrollbarX = scrollbar;
				this.scrollbarIndicatorX = indicator;
			}
			this.wrapper.appendChild(scrollbar);
			return scrollbar;
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		_reLayout: function() {
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.indicators.map(function(indicator) {
				indicator.refresh();
			});

			//以防slider类嵌套使用
			if (this.options.snap && typeof this.options.snap === 'string') {
				var items = this.scroller.querySelectorAll(this.options.snap);
				this.itemLength = 0;
				this.snaps = [];
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (item.parentNode === this.scroller) {
						this.itemLength++;
						this.snaps.push(item);
					}
				}
				this._initSnap(); //需要每次都_initSnap么。其实init的时候执行一次，后续resize的时候执行一次就行了吧.先这么做吧，如果影响性能，再调整
			}
		},
		_momentum: function(current, distance, time, lowerMargin, wrapperSize, deceleration) {
			var speed = parseFloat(Math.abs(distance) / time),
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;
			destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;
			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		},
		_getTranslateStr: function(x, y) {
			if (this.options.hardwareAccelerated) {
				return 'translate3d(' + x + 'px,' + y + 'px,0px) ' + this.translateZ;
			}
			return 'translate(' + x + 'px,' + y + 'px) ';
		},
		//API
		setStopped: function(stopped) {
			this.stopped = !!stopped;
		},
		setTranslate: function(x, y) {
			this.x = x;
			this.y = y;
			this.scrollerStyle['webkitTransform'] = this._getTranslateStr(x, y);
			if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
				var parallaxY = y * this.options.parallaxRatio;
				var scale = 1 + parallaxY / ((this.parallaxHeight - parallaxY) / 2);
				if (scale > 1) {
					this.parallaxImgStyle['opacity'] = 1 - parallaxY / 100 * this.options.parallaxRatio;
					this.parallaxStyle['webkitTransform'] = this._getTranslateStr(0, -parallaxY) + ' scale(' + scale + ',' + scale + ')';
				} else {
					this.parallaxImgStyle['opacity'] = 1;
					this.parallaxStyle['webkitTransform'] = this._getTranslateStr(0, -1) + ' scale(1,1)';
				}
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition();
				}
			}
			this.lastX = this.x;
			this.lastY = this.y;
			$.trigger(this.scroller, 'scroll', this);
		},
		reLayout: function() {
			this.wrapper.offsetHeight;

			var paddingLeft = parseFloat($.getStyles(this.wrapper, 'padding-left')) || 0;
			var paddingRight = parseFloat($.getStyles(this.wrapper, 'padding-right')) || 0;
			var paddingTop = parseFloat($.getStyles(this.wrapper, 'padding-top')) || 0;
			var paddingBottom = parseFloat($.getStyles(this.wrapper, 'padding-bottom')) || 0;

			var clientWidth = this.wrapper.clientWidth;
			var clientHeight = this.wrapper.clientHeight;

			this.scrollerWidth = this.scroller.offsetWidth;
			this.scrollerHeight = this.scroller.offsetHeight;

			this.wrapperWidth = clientWidth - paddingLeft - paddingRight;
			this.wrapperHeight = clientHeight - paddingTop - paddingBottom;

			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0);
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			this._reLayout();
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;

			time = time || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0;
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX;
			}

			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0;
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY;
			}

			if (x == this.x && y == this.y) {
				return false;
			}
			this.scrollTo(x, y, time, this.options.scrollEasing);

			return true;
		},
		refresh: function() {
			this.reLayout();
			$.trigger(this.scroller, 'refresh', this);
			this.resetPosition();
		},
		scrollTo: function(x, y, time, easing) {
			var easing = easing || ease.circular;
			//			this.isInTransition = time > 0 && (this.lastX != x || this.lastY != y);
			//暂不严格判断x,y，否则会导致部分版本上不正常触发轮播
			this.isInTransition = time > 0;
			if (this.isInTransition) {
				this._clearRequestAnimationFrame();
				this._transitionTimingFunction(easing.style);
				this._transitionTime(time);
				this.setTranslate(x, y);
			} else {
				this.setTranslate(x, y);
			}

		},
		scrollToBottom: function(time, easing) {
			time = time || this.options.scrollTime;
			this.scrollTo(0, this.maxScrollY, time, easing);
		},
		gotoPage: function(index) {
			this._gotoPage(index);
		},
		destroy: function() {
			this._initEvent(true); //detach
			delete $.data[this.wrapper.getAttribute('data-scroll')];
			this.wrapper.setAttribute('data-scroll', '');
		}
	});
	//Indicator
	var Indicator = function(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = $.extend({
			listenX: true,
			listenY: true,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		}, options);


		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if (this.options.fade) {
			this.wrapperStyle['webkitTransform'] = this.scroller.translateZ;
			this.wrapperStyle['webkitTransitionDuration'] = this.options.fixedBadAndorid && $.os.isBadAndroid ? '0.001s' : '0ms';
			this.wrapperStyle.opacity = '0';
		}
	}
	Indicator.prototype = {
		handleEvent: function(e) {

		},
		transitionTime: function(time) {
			time = time || 0;
			this.indicatorStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.scroller.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.indicatorStyle['webkitTransitionDuration'] = '0.001s';
			}
		},
		transitionTimingFunction: function(easing) {
			this.indicatorStyle['webkitTransitionTimingFunction'] = easing;
		},
		refresh: function() {
			this.transitionTime();

			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			this.wrapper.offsetHeight; // force refresh

			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;

				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}

			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;

				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}

			this.updatePosition();
		},

		updatePosition: function() {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if (x < this.minBoundaryX) {
				this.width = Math.max(this.indicatorWidth + x, 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.minBoundaryX;
			} else if (x > this.maxBoundaryX) {
				this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.maxPosX + this.indicatorWidth - this.width;
			} else if (this.width != this.indicatorWidth) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if (y < this.minBoundaryY) {
				this.height = Math.max(this.indicatorHeight + y * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.minBoundaryY;
			} else if (y > this.maxBoundaryY) {
				this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.maxPosY + this.indicatorHeight - this.height;
			} else if (this.height != this.indicatorHeight) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}

			this.x = x;
			this.y = y;

			this.indicatorStyle['webkitTransform'] = this.scroller._getTranslateStr(x, y);

		},
		fade: function(val, hold) {
			if (hold && !this.visible) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
				delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle['webkitTransitionDuration'] = time + 'ms';

			this.fadeTimeout = setTimeout((function(val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};

	$.Scroll = Scroll;

	$.fn.scroll = function(options) {
		var scrollApis = [];
		this.each(function() {
			var scrollApi = null;
			var self = this;
			var id = self.getAttribute('data-scroll');
			if (!id) {
				id = ++$.uuid;
				var _options = $.extend({}, options);
				if (self.classList.contains('mui-segmented-control')) {
					_options = $.extend(_options, {
						scrollY: false,
						scrollX: true,
						indicators: false,
						snap: '.mui-control-item'
					});
				}
				$.data[id] = scrollApi = new Scroll(self, _options);
				self.setAttribute('data-scroll', id);
			} else {
				scrollApi = $.data[id];
			}
			scrollApis.push(scrollApi);
		});
		return scrollApis.length === 1 ? scrollApis[0] : scrollApis;
	};
})(mui, window, document);
(function($, window, document, undefined) {

	var CLASS_VISIBILITY = 'mui-visibility';
	var CLASS_HIDDEN = 'mui-hidden';

	var PullRefresh = $.Scroll.extend($.extend({
		handleEvent: function(e) {
			this._super(e);
			if (e.type === 'scrollbottom') {
				if (e.target === this.scroller) {
					this._scrollbottom();
				}
			}
		},
		_scrollbottom: function() {
			if (!this.pulldown && !this.loading) {
				this.pulldown = false;
				this._initPullupRefresh();
				this.pullupLoading();
			}
		},
		_start: function(e) {
			//仅下拉刷新在start阻止默认事件
			if (e.touches && e.touches.length && e.touches[0].clientX > 30) {
				e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
			}
			if (!this.loading) {
				this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = false
			}
			this._super(e);
		},
		_drag: function(e) {
			this._super(e);
			if (!this.pulldown && !this.loading && this.topPocket && e.detail.direction === 'down' && this.y >= 0) {
				this._initPulldownRefresh();
			}
			if (this.pulldown) {
				this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown);
			}
		},

		_reLayout: function() {
			this.hasVerticalScroll = true;
			this._super();
		},
		//API
		resetPosition: function(time) {
			if (this.pulldown) {
				if (this.y >= this.options.down.height) {
					this.pulldownLoading(undefined, time || 0);
					return true;
				} else {
					!this.loading && this.topPocket.classList.remove(CLASS_VISIBILITY);
				}
			}
			return this._super(time);
		},
		pulldownLoading: function(y, time) {
			typeof y === 'undefined' && (y = this.options.down.height); //默认高度
			this.scrollTo(0, y, time, this.options.bounceEasing);
			if (this.loading) {
				return;
			}
			//			if (!this.pulldown) {
			this._initPulldownRefresh();
			//			}
			this._setCaption(this.options.down.contentrefresh);
			this.loading = true;
			this.indicators.map(function(indicator) {
				indicator.fade(0);
			});
			var callback = this.options.down.callback;
			callback && callback.call(this);
		},
		endPulldownToRefresh: function() {
			var self = this;
			if (self.topPocket && self.loading && this.pulldown) {
				self.scrollTo(0, 0, self.options.bounceTime, self.options.bounceEasing);
				self.loading = false;
				self._setCaption(self.options.down.contentdown, true);
				setTimeout(function() {
					self.loading || self.topPocket.classList.remove(CLASS_VISIBILITY);
				}, 350);
			}
		},
		pullupLoading: function(callback, x, time) {
			x = x || 0;
			this.scrollTo(x, this.maxScrollY, time, this.options.bounceEasing);
			if (this.loading) {
				return;
			}
			this._initPullupRefresh();
			this._setCaption(this.options.up.contentrefresh);
			this.indicators.map(function(indicator) {
				indicator.fade(0);
			});
			this.loading = true;
			callback = callback || this.options.up.callback;
			callback && callback.call(this);
		},
		endPullupToRefresh: function(finished) {
			var self = this;
			if (self.bottomPocket) { // && self.loading && !this.pulldown
				self.loading = false;
				if (finished) {
					this.finished = true;
					self._setCaption(self.options.up.contentnomore);
					//					self.bottomPocket.classList.remove(CLASS_VISIBILITY);
					//					self.bottomPocket.classList.add(CLASS_HIDDEN);
					self.wrapper.removeEventListener('scrollbottom', self);
				} else {
					self._setCaption(self.options.up.contentdown);
					//					setTimeout(function() {
					self.loading || self.bottomPocket.classList.remove(CLASS_VISIBILITY);
					//					}, 300);
				}
			}
		},
		disablePullupToRefresh: function() {
			this._initPullupRefresh();
			this.bottomPocket.className = 'mui-pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
			this.wrapper.removeEventListener('scrollbottom', this);
		},
		enablePullupToRefresh: function() {
			this._initPullupRefresh();
			this.bottomPocket.classList.remove(CLASS_HIDDEN);
			this._setCaption(this.options.up.contentdown);
			this.wrapper.addEventListener('scrollbottom', this);
		},
		refresh: function(isReset) {
			if (isReset && this.finished) {
				this.enablePullupToRefresh();
				this.finished = false;
			}
			this._super();
		},
	}, $.PullRefresh));
	$.fn.pullRefresh = function(options) {
		if (this.length === 1) {
			var self = this[0];
			var pullRefreshApi = null;
			options = options || {};
			var id = self.getAttribute('data-pullrefresh');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = pullRefreshApi = new PullRefresh(self, options);
				self.setAttribute('data-pullrefresh', id);
			} else {
				pullRefreshApi = $.data[id];
			}
			if (options.down && options.down.auto) { //如果设置了auto，则自动下拉一次
				pullRefreshApi.pulldownLoading(options.down.autoY);
			} else if (options.up && options.up.auto) { //如果设置了auto，则自动上拉一次
				pullRefreshApi.pullupLoading();
			}
			//暂不提供这种调用方式吧			
			//			if (typeof options === 'string') {
			//				var methodValue = pullRefreshApi[options].apply(pullRefreshApi, $.slice.call(arguments, 1));
			//				if (methodValue !== undefined) {
			//					return methodValue;
			//				}
			//			}
			return pullRefreshApi;
		}
	};
})(mui, window, document);
/**
 * snap 重构
 * @param {Object} $
 * @param {Object} window
 */
(function($, window) {
	var CLASS_SLIDER = 'mui-slider';
	var CLASS_SLIDER_GROUP = 'mui-slider-group';
	var CLASS_SLIDER_LOOP = 'mui-slider-loop';
	var CLASS_SLIDER_INDICATOR = 'mui-slider-indicator';
	var CLASS_ACTION_PREVIOUS = 'mui-action-previous';
	var CLASS_ACTION_NEXT = 'mui-action-next';
	var CLASS_SLIDER_ITEM = 'mui-slider-item';

	var CLASS_ACTIVE = 'mui-active';

	var SELECTOR_SLIDER_ITEM = '.' + CLASS_SLIDER_ITEM;
	var SELECTOR_SLIDER_INDICATOR = '.' + CLASS_SLIDER_INDICATOR;
	var SELECTOR_SLIDER_PROGRESS_BAR = '.mui-slider-progress-bar';

	var Slider = $.Slider = $.Scroll.extend({
		init: function(element, options) {
			this._super(element, $.extend(true, {
				fingers: 1,
				interval: 0, //设置为0，则不定时轮播
				scrollY: false,
				scrollX: true,
				indicators: false,
				scrollTime: 1000,
				startX: false,
				slideTime: 0, //滑动动画时间
				snap: SELECTOR_SLIDER_ITEM
			}, options));
			if (this.options.startX) {
				//				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		_init: function() {
			var groups = this.wrapper.querySelectorAll('.' + CLASS_SLIDER_GROUP);
			for (var i = 0, len = groups.length; i < len; i++) {
				if (groups[i].parentNode === this.wrapper) {
					this.scroller = groups[i];
					break;
				}
			}
			if (this.scroller) {
				this.scrollerStyle = this.scroller.style;
				this.progressBar = this.wrapper.querySelector(SELECTOR_SLIDER_PROGRESS_BAR);
				if (this.progressBar) {
					this.progressBarWidth = this.progressBar.offsetWidth;
					this.progressBarStyle = this.progressBar.style;
				}
				//忘记这个代码是干什么的了？
				//				this.x = this._getScroll();
				//				if (this.options.startX === false) {
				//					this.options.startX = this.x;
				//				}
				//根据active修正startX

				this._super();
				this._initTimer();
			}
		},
		_triggerSlide: function() {
			var self = this;
			self.isInTransition = false;
			var page = self.currentPage;
			self.slideNumber = self._fixedSlideNumber();
			if (self.loop) {
				if (self.slideNumber === 0) {
					self.setTranslate(self.pages[1][0].x, 0);
				} else if (self.slideNumber === self.itemLength - 3) {
					self.setTranslate(self.pages[self.itemLength - 2][0].x, 0);
				}
			}
			if (self.lastSlideNumber != self.slideNumber) {
				self.lastSlideNumber = self.slideNumber;
				self.lastPage = self.currentPage;
				$.trigger(self.wrapper, 'slide', {
					slideNumber: self.slideNumber
				});
			}
			self._initTimer();
		},
		_handleSlide: function(e) {
			var self = this;
			if (e.target !== self.wrapper) {
				return;
			}
			var detail = e.detail;
			detail.slideNumber = detail.slideNumber || 0;
			var temps = self.scroller.querySelectorAll(SELECTOR_SLIDER_ITEM);
			var items = [];
			for (var i = 0, len = temps.length; i < len; i++) {
				var item = temps[i];
				if (item.parentNode === self.scroller) {
					items.push(item);
				}
			}
			var _slideNumber = detail.slideNumber;
			if (self.loop) {
				_slideNumber += 1;
			}
			if (!self.wrapper.classList.contains('mui-segmented-control')) {
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (item.parentNode === self.scroller) {
						if (i === _slideNumber) {
							item.classList.add(CLASS_ACTIVE);
						} else {
							item.classList.remove(CLASS_ACTIVE);
						}
					}
				}
			}
			var indicatorWrap = self.wrapper.querySelector('.mui-slider-indicator');
			if (indicatorWrap) {
				if (indicatorWrap.getAttribute('data-scroll')) { //scroll
					$(indicatorWrap).scroll().gotoPage(detail.slideNumber);
				}
				var indicators = indicatorWrap.querySelectorAll('.mui-indicator');
				if (indicators.length > 0) { //图片轮播
					for (var i = 0, len = indicators.length; i < len; i++) {
						indicators[i].classList[i === detail.slideNumber ? 'add' : 'remove'](CLASS_ACTIVE);
					}
				} else {
					var number = indicatorWrap.querySelector('.mui-number span');
					if (number) { //图文表格
						number.innerText = (detail.slideNumber + 1);
					} else { //segmented controls
						var controlItems = self.wrapper.querySelectorAll('.mui-control-item');
						for (var i = 0, len = controlItems.length; i < len; i++) {
							controlItems[i].classList[i === detail.slideNumber ? 'add' : 'remove'](CLASS_ACTIVE);
						}
					}
				}
			}
			e.stopPropagation();
		},
		_handleTabShow: function(e) {
			var self = this;
			self.gotoItem((e.detail.tabNumber || 0), self.options.slideTime);
		},
		_handleIndicatorTap: function(event) {
			var self = this;
			var target = event.target;
			if (target.classList.contains(CLASS_ACTION_PREVIOUS) || target.classList.contains(CLASS_ACTION_NEXT)) {
				self[target.classList.contains(CLASS_ACTION_PREVIOUS) ? 'prevItem' : 'nextItem']();
				event.stopPropagation();
			}
		},
		_initEvent: function(detach) {
			var self = this;
			self._super(detach);
			var action = detach ? 'removeEventListener' : 'addEventListener';
			self.wrapper[action]('slide', this);
			self.wrapper[action]($.eventName('shown', 'tab'), this);
		},
		handleEvent: function(e) {
			this._super(e);
			switch (e.type) {
				case 'slide':
					this._handleSlide(e);
					break;
				case $.eventName('shown', 'tab'):
					this._handleTabShow(e);
					break;
			}
		},
		_scrollend: function(e) {
			this._super(e);
			this._triggerSlide(e);
		},
		_drag: function(e) {
			this._super(e);
			var direction = e.detail.direction;
			if (direction === 'left' || direction === 'right') {
				//拖拽期间取消定时
				var slidershowTimer = this.wrapper.getAttribute('data-slidershowTimer');
				slidershowTimer && window.clearTimeout(slidershowTimer);

				e.stopPropagation();
			}
		},
		_initTimer: function() {
			var self = this;
			var slider = self.wrapper;
			var interval = self.options.interval;
			var slidershowTimer = slider.getAttribute('data-slidershowTimer');
			slidershowTimer && window.clearTimeout(slidershowTimer);
			if (interval) {
				slidershowTimer = window.setTimeout(function() {
					if (!slider) {
						return;
					}
					//仅slider显示状态进行自动轮播
					if (!!(slider.offsetWidth || slider.offsetHeight)) {
						self.nextItem(true);
						//下一个
					}
					self._initTimer();
				}, interval);
				slider.setAttribute('data-slidershowTimer', slidershowTimer);
			}
		},

		_fixedSlideNumber: function(page) {
			page = page || this.currentPage;
			var slideNumber = page.pageX;
			if (this.loop) {
				if (page.pageX === 0) {
					slideNumber = this.itemLength - 3;
				} else if (page.pageX === (this.itemLength - 1)) {
					slideNumber = 0;
				} else {
					slideNumber = page.pageX - 1;
				}
			}
			return slideNumber;
		},
		_reLayout: function() {
			this.hasHorizontalScroll = true;
			this.loop = this.scroller.classList.contains(CLASS_SLIDER_LOOP);
			this._super();
		},
		_getScroll: function() {
			var result = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
			return result ? result.x : 0;
		},
		_transitionEnd: function(e) {
			if (e.target !== this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			this.isInTransition = false;
			$.trigger(this.wrapper, 'scrollend', this);
		},
		_flick: function(e) {
			if (!this.moved) { //无moved
				return;
			}
			var detail = e.detail;
			var direction = detail.direction;
			this._clearRequestAnimationFrame();
			this.isInTransition = true;
			//			if (direction === 'up' || direction === 'down') {
			//				this.resetPosition(this.options.bounceTime);
			//				return;
			//			}
			if (e.type === 'flick') {
				if (detail.deltaTime < 200) { //flick，太容易触发，额外校验一下deltaTime
					this.x = this._getPage((this.slideNumber + (direction === 'right' ? -1 : 1)), true).x;
				}
				this.resetPosition(this.options.bounceTime);
			} else if (e.type === 'dragend' && !detail.flick) {
				this.resetPosition(this.options.bounceTime);
			}
			e.stopPropagation();
		},
		_initSnap: function() {
			this.scrollerWidth = this.itemLength * this.scrollerWidth;
			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this._super();
			if (!this.currentPage.x) {
				//当slider处于隐藏状态时，导致snap计算是错误的，临时先这么判断一下，后续要考虑解决所有scroll在隐藏状态下初始化属性不正确的问题
				var currentPage = this.pages[this.loop ? 1 : 0];
				currentPage = currentPage || this.pages[0];
				if (!currentPage) {
					return;
				}
				this.currentPage = currentPage[0];
				this.slideNumber = 0;
				this.lastSlideNumber = typeof this.lastSlideNumber === 'undefined' ? 0 : this.lastSlideNumber;
			} else {
				this.slideNumber = this._fixedSlideNumber();
				this.lastSlideNumber = typeof this.lastSlideNumber === 'undefined' ? this.slideNumber : this.lastSlideNumber;
			}
			this.options.startX = this.currentPage.x || 0;
		},
		_getSnapX: function(offsetLeft) {
			return Math.max(-offsetLeft, this.maxScrollX);
		},
		_getPage: function(slideNumber, isFlick) {
			if (this.loop) {
				if (slideNumber > (this.itemLength - (isFlick ? 2 : 3))) {
					slideNumber = 1;
					time = 0;
				} else if (slideNumber < (isFlick ? -1 : 0)) {
					slideNumber = this.itemLength - 2;
					time = 0;
				} else {
					slideNumber += 1;
				}
			} else {
				if (!isFlick) {
					if (slideNumber > (this.itemLength - 1)) {
						slideNumber = 0;
						time = 0;
					} else if (slideNumber < 0) {
						slideNumber = this.itemLength - 1;
						time = 0;
					}
				}
				slideNumber = Math.min(Math.max(0, slideNumber), this.itemLength - 1);
			}
			return this.pages[slideNumber][0];
		},
		_gotoItem: function(slideNumber, time) {
			this.currentPage = this._getPage(slideNumber, true); //此处传true。可保证程序切换时，动画与人手操作一致(第一张，最后一张的切换动画)
			this.scrollTo(this.currentPage.x, 0, time, this.options.scrollEasing);
			if (time === 0) {
				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		//API
		setTranslate: function(x, y) {
			this._super(x, y);
			var progressBar = this.progressBar;
			if (progressBar) {
				this.progressBarStyle.webkitTransform = this._getTranslateStr((-x * (this.progressBarWidth / this.wrapperWidth)), 0);
			}
		},
		resetPosition: function(time) {
			time = time || 0;
			if (this.x > 0) {
				this.x = 0;
			} else if (this.x < this.maxScrollX) {
				this.x = this.maxScrollX;
			}
			this.currentPage = this._nearestSnap(this.x);
			this.scrollTo(this.currentPage.x, 0, time, this.options.scrollEasing);
			return true;
		},
		gotoItem: function(slideNumber, time) {
			this._gotoItem(slideNumber, typeof time === 'undefined' ? this.options.scrollTime : time);
		},
		nextItem: function() {
			this._gotoItem(this.slideNumber + 1, this.options.scrollTime);
		},
		prevItem: function() {
			this._gotoItem(this.slideNumber - 1, this.options.scrollTime);
		},
		getSlideNumber: function() {
			return this.slideNumber || 0;
		},
		refresh: function(options) {
			if (options) {
				$.extend(this.options, options);
				this._super();
				this._initTimer();
			} else {
				this._super();
			}
		},
		destroy: function() {
			this._initEvent(true); //detach
			delete $.data[this.wrapper.getAttribute('data-slider')];
			this.wrapper.setAttribute('data-slider', '');
		}
	});
	$.fn.slider = function(options) {
		var slider = null;
		this.each(function() {
			var sliderElement = this;
			if (!this.classList.contains(CLASS_SLIDER)) {
				sliderElement = this.querySelector('.' + CLASS_SLIDER);
			}
			if (sliderElement && sliderElement.querySelector(SELECTOR_SLIDER_ITEM)) {
				var id = sliderElement.getAttribute('data-slider');
				if (!id) {
					id = ++$.uuid;
					$.data[id] = slider = new Slider(sliderElement, options);
					sliderElement.setAttribute('data-slider', id);
				} else {
					slider = $.data[id];
					if (slider && options) {
						slider.refresh(options);
					}
				}
			}
		});
		return slider;
	};
	$.ready(function() {
		//		setTimeout(function() {
		$('.mui-slider').slider();
		$('.mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control').scroll({
			scrollY: false,
			scrollX: true,
			indicators: false,
			snap: '.mui-control-item'
		});
		//		}, 500); //临时处理slider宽度计算不正确的问题(初步确认是scrollbar导致的)

	});
})(mui, window);
/**
 * pullRefresh 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
	if (!($.os.plus && $.os.android)) { //仅在android的5+版本使用
		return;
	}
	var CLASS_PLUS_PULLREFRESH = 'mui-plus-pullrefresh';
	var CLASS_VISIBILITY = 'mui-visibility';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_BLOCK = 'mui-block';

	var CLASS_PULL_CAPTION = 'mui-pull-caption';
	var CLASS_PULL_CAPTION_DOWN = 'mui-pull-caption-down';
	var CLASS_PULL_CAPTION_REFRESH = 'mui-pull-caption-refresh';
	var CLASS_PULL_CAPTION_NOMORE = 'mui-pull-caption-nomore';

	var PlusPullRefresh = $.Class.extend({
		init: function(element, options) {
			this.element = element;
			this.options = options;
			this.wrapper = this.scroller = element;
			this._init();
			this._initPulldownRefreshEvent();
		},
		_init: function() {
			var self = this;
			//			document.addEventListener('plusscrollbottom', this);
			window.addEventListener('dragup', self);
			document.addEventListener("plusscrollbottom", self);
			self.scrollInterval = window.setInterval(function() {
				if (self.isScroll && !self.loading) {
					if (window.pageYOffset + window.innerHeight + 10 >= document.documentElement.scrollHeight) {
						self.isScroll = false; //放在这里是因为快速滚动的话，有可能检测时，还没到底，所以只要有滚动，没到底之前一直检测高度变化
						if (self.bottomPocket) {
							self.pullupLoading();
						}
					}
				}
			}, 100);
		},
		_initPulldownRefreshEvent: function() {
			var self = this;
			if (self.topPocket && self.options.webviewId) {
				$.plusReady(function() {
					var webview = plus.webview.getWebviewById(self.options.webviewId);
					if (!webview) {
						return;
					}
					self.options.webview = webview;
					var downOptions = self.options.down;
					var height = downOptions.height;
					webview.addEventListener("dragBounce", function(e) {
						if (!self.pulldown) {
							self._initPulldownRefresh();
						} else {
							self.pullPocket.classList.add(CLASS_BLOCK);
						}
						switch (e.status) {
							case "beforeChangeOffset": //下拉可刷新状态
								self._setCaption(downOptions.contentdown);
								break;
							case "afterChangeOffset": //松开可刷新状态
								self._setCaption(downOptions.contentover);
								break;
							case "dragEndAfterChangeOffset": //正在刷新状态
								//执行下拉刷新所在webview的回调函数
								webview.evalJS("mui&&mui.options.pullRefresh.down.callback()");
								self._setCaption(downOptions.contentrefresh);
								break;
							default:
								break;
						}
					}, false);
					webview.setBounce({
						position: {
							top: height * 2 + 'px'
						},
						changeoffset: {
							top: height + 'px'
						}
					});
				});
			}
		},
		handleEvent: function(e) {
			var self = this;
			if (self.stopped) {
				return;
			}
			//5+的plusscrollbottom当页面内容较少时，不触发
			//			if (e.type === 'plusscrollbottom') {
			//				if (this.bottomPocket) {
			//					this.pullupLoading();
			//				}
			//			}
			self.isScroll = false;
			if (e.type === 'dragup' || e.type === 'plusscrollbottom') {
				self.isScroll = true;
				setTimeout(function() {
					self.isScroll = false;
				}, 1000);
			}
		}
	}).extend($.extend({
		setStopped: function(stopped) { //该方法是子页面调用的
			this.stopped = !!stopped;
			//TODO 此处需要设置当前webview的bounce为none,目前5+有BUG
			var webview = plus.webview.currentWebview();
			if (this.stopped) {
				webview.setStyle({
					bounce: 'none'
				});
				webview.setBounce({
					position: {
						top: 'none'
					}
				});
			} else {
				var height = this.options.down.height;
				webview.setStyle({
					bounce: 'vertical'
				});
				webview.setBounce({
					position: {
						top: height * 2 + 'px'
					},
					changeoffset: {
						top: height + 'px'
					}
				});
			}
		},
		pulldownLoading: function() { //该方法是子页面调用的
			$.plusReady(function() {
				plus.webview.currentWebview().setBounce({
					offset: {
						top: this.options.down.height + "px"
					}
				});
			}.bind(this));
			var callback = $.options.pullRefresh.down.callback;
			callback && callback.call(this);
		},
		//		_pulldownLoading: function() { //该方法是子页面调用的
		//			var self = this;
		//			$.plusReady(function() {
		//				plus.webview.getWebviewById(self.options.webviewId).evalJS("mui&&mui.options.pullRefresh.down&&mui.options.pullRefresh.down.callback()");
		//			});
		//		},
		endPulldownToRefresh: function() { //该方法是子页面调用的
			var webview = plus.webview.currentWebview();
			webview.parent().evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify({
				webviewId: webview.id
			}) + "')._endPulldownToRefresh()");
		},
		_endPulldownToRefresh: function() { //该方法是父页面调用的
			var self = this;
			if (self.topPocket && self.options.webview) {
				self.options.webview.endPullToRefresh(); //下拉刷新所在webview回弹
				self.loading = false;
				self._setCaption(self.options.down.contentdown, true);
				setTimeout(function() {
					self.loading || self.topPocket.classList.remove(CLASS_BLOCK);
				}, 350);
			}
		},
		pullupLoading: function(callback) {
			var self = this;
			if (self.isLoading) return;
			self.isLoading = true;
			if (self.pulldown !== false) {
				self._initPullupRefresh();
			} else {
				this.pullPocket.classList.add(CLASS_BLOCK);
			}
			setTimeout(function() {
				self.pullLoading.classList.add(CLASS_VISIBILITY);
				self.pullLoading.classList.remove(CLASS_HIDDEN);
				self.pullCaption.innerHTML = ''; //修正5+里边第一次加载时，文字显示的bug(还会显示出来个“多”,猜测应该是渲染问题导致的)
				self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_REFRESH;
				self.pullCaption.innerHTML = self.options.up.contentrefresh;
				callback = callback || self.options.up.callback;
				callback && callback.call(self);
			}, 300);
		},
		endPullupToRefresh: function(finished) {
			var self = this;
			if (self.pullLoading) {
				self.pullLoading.classList.remove(CLASS_VISIBILITY);
				self.pullLoading.classList.add(CLASS_HIDDEN);
				self.isLoading = false;
				if (finished) {
					self.finished = true;
					self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_NOMORE;
					self.pullCaption.innerHTML = self.options.up.contentnomore;
					//					self.bottomPocket.classList.remove(CLASS_BLOCK);
					//					self.bottomPocket.classList.add(CLASS_HIDDEN);
					//取消5+的plusscrollbottom事件
					document.removeEventListener('plusscrollbottom', self);
					window.removeEventListener('dragup', self);
				} else { //初始化时隐藏，后续不再隐藏
					self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
					self.pullCaption.innerHTML = self.options.up.contentdown;
					//					setTimeout(function() {
					//						self.loading || self.bottomPocket.classList.remove(CLASS_BLOCK);
					//					}, 350);
				}
			}
		},
		disablePullupToRefresh: function() {
			this._initPullupRefresh();
			this.bottomPocket.className = 'mui-pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
			window.removeEventListener('dragup', this);
		},
		enablePullupToRefresh: function() {
			this._initPullupRefresh();
			this.bottomPocket.classList.remove(CLASS_HIDDEN);
			this.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
			this.pullCaption.innerHTML = this.options.up.contentdown;
			document.addEventListener("plusscrollbottom", this);
			window.addEventListener('dragup', this);
		},
		scrollTo: function(x, y, time) {
			$.scrollTo(y, time);
		},
		refresh: function(isReset) {
			if (isReset && this.finished) {
				this.enablePullupToRefresh();
				this.finished = false;
			}
		}
	}, $.PullRefresh));

	//override h5 pullRefresh
	$.fn.pullRefresh = function(options) {
		var self;
		if (this.length === 0) {
			self = document.createElement('div');
			self.className = 'mui-content';
			document.body.appendChild(self);
		} else {
			self = this[0];
		}
		//一个父需要支持多个子下拉刷新
		options = options || {}
		if (typeof options === 'string') {
			options = $.parseJSON(options);
		};
		!options.webviewId && (options.webviewId = (plus.webview.currentWebview().id || plus.webview.currentWebview().getURL()));
		var pullRefreshApi = null;
		var attrWebviewId = options.webviewId && options.webviewId.replace(/\//g, "_"); //替换所有"/"
		var id = self.getAttribute('data-pullrefresh-plus-' + attrWebviewId);
		if (!id) { //避免重复初始化5+ pullrefresh
			id = ++$.uuid;
			self.setAttribute('data-pullrefresh-plus-' + attrWebviewId, id);
			document.body.classList.add(CLASS_PLUS_PULLREFRESH);
			$.data[id] = pullRefreshApi = new PlusPullRefresh(self, options);
		} else {
			pullRefreshApi = $.data[id];
		}
		if (options.down && options.down.auto) { //如果设置了auto，则自动下拉一次
			pullRefreshApi.pulldownLoading(); //parent webview
		} else if (options.up && options.up.auto) { //如果设置了auto，则自动上拉一次
			pullRefreshApi.pullupLoading();
		}
		return pullRefreshApi;
	};
})(mui, document);
/**
 * off-canvas
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} action
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_OFF_CANVAS_LEFT = 'mui-off-canvas-left';
	var CLASS_OFF_CANVAS_RIGHT = 'mui-off-canvas-right';
	var CLASS_ACTION_BACKDROP = 'mui-off-canvas-backdrop';
	var CLASS_OFF_CANVAS_WRAP = 'mui-off-canvas-wrap';

	var CLASS_SLIDE_IN = 'mui-slide-in';
	var CLASS_ACTIVE = 'mui-active';


	var CLASS_TRANSITIONING = 'mui-transitioning';

	var SELECTOR_INNER_WRAP = '.mui-inner-wrap';


	var OffCanvas = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
			this.classList = this.wrapper.classList;
			if (this.scroller) {
				this.options = $.extend(true, {
					dragThresholdX: 10,
					scale: 0.8,
					opacity: 0.1,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
					},
				}, options);
				document.body.classList.add('mui-fullscreen'); //fullscreen
				this.refresh();
				this.initEvent();
			}
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		refresh: function(offCanvas) {
			//			offCanvas && !offCanvas.classList.contains(CLASS_ACTIVE) && this.classList.remove(CLASS_ACTIVE);
			this.slideIn = this.classList.contains(CLASS_SLIDE_IN);
			this.scalable = this.classList.contains('mui-scalable') && !this.slideIn;
			this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
			//			!offCanvas && this.scroller.classList.remove(CLASS_TRANSITIONING);
			//			!offCanvas && this.scroller.setAttribute('style', '');
			this.offCanvasLefts = this.wrapper.querySelectorAll('.' + CLASS_OFF_CANVAS_LEFT);
			this.offCanvasRights = this.wrapper.querySelectorAll('.' + CLASS_OFF_CANVAS_RIGHT);
			if (offCanvas) {
				if (offCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT)) {
					this.offCanvasLeft = offCanvas;
				} else if (offCanvas.classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
					this.offCanvasRight = offCanvas;
				}
			} else {
				this.offCanvasRight = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT);
				this.offCanvasLeft = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT);
			}
			this.offCanvasRightWidth = this.offCanvasLeftWidth = 0;
			this.offCanvasLeftSlideIn = this.offCanvasRightSlideIn = false;
			if (this.offCanvasRight) {
				this.offCanvasRightWidth = this.offCanvasRight.offsetWidth;
				this.offCanvasRightSlideIn = this.slideIn && (this.offCanvasRight.parentNode === this.wrapper);
				//				this.offCanvasRight.classList.remove(CLASS_TRANSITIONING);
				//				this.offCanvasRight.classList.remove(CLASS_ACTIVE);
				//				this.offCanvasRight.setAttribute('style', '');
			}
			if (this.offCanvasLeft) {
				this.offCanvasLeftWidth = this.offCanvasLeft.offsetWidth;
				this.offCanvasLeftSlideIn = this.slideIn && (this.offCanvasLeft.parentNode === this.wrapper);
				//				this.offCanvasLeft.classList.remove(CLASS_TRANSITIONING);
				//				this.offCanvasLeft.classList.remove(CLASS_ACTIVE);
				//				this.offCanvasLeft.setAttribute('style', '');
			}
			this.backdrop = this.scroller.querySelector('.' + CLASS_ACTION_BACKDROP);

			this.options.dragThresholdX = this.options.dragThresholdX || 10;

			this.visible = false;
			this.startX = null;
			this.lastX = null;
			this.offsetX = null;
			this.lastTranslateX = null;
		},
		handleEvent: function(e) {
			switch (e.type) {
				case $.EVENT_START:
					e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
					break;
				case 'webkitTransitionEnd': //有个bug需要处理，需要考虑假设没有触发webkitTransitionEnd的情况
					if (e.target === this.scroller) {
						this._dispatchEvent();
					}
					break;
				case 'drag':
					var detail = e.detail;
					if (!this.startX) {
						this.startX = detail.center.x;
						this.lastX = this.startX;
					} else {
						this.lastX = detail.center.x;
					}
					if (!this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && (detail.direction === 'left' || (detail.direction === 'right'))) {
						if (this.slideIn) {
							this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
							if (this.classList.contains(CLASS_ACTIVE)) {
								if (this.offCanvasRight && this.offCanvasRight.classList.contains(CLASS_ACTIVE)) {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								} else {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								}
							} else {
								if (detail.direction === 'left' && this.offCanvasRight) {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								} else if (detail.direction === 'right' && this.offCanvasLeft) {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.scroller = null;
								}
							}
						} else {
							if (this.classList.contains(CLASS_ACTIVE)) {
								if (detail.direction === 'left') {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								}
							} else {
								if (detail.direction === 'right') {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								}
							}
						}
						if (this.offCanvas && this.scroller) {
							this.startX = this.lastX;
							this.isDragging = true;

							$.gestures.session.lockDirection = true; //锁定方向
							$.gestures.session.startDirection = detail.direction;

							this.offCanvas.classList.remove(CLASS_TRANSITIONING);
							this.scroller.classList.remove(CLASS_TRANSITIONING);
							this.offsetX = this.getTranslateX();
							this._initOffCanvasVisible();
						}
					}
					if (this.isDragging) {
						this.updateTranslate(this.offsetX + (this.lastX - this.startX));
						detail.gesture.preventDefault();
						e.stopPropagation();
					}
					break;
				case 'dragend':
					if (this.isDragging) {
						var detail = e.detail;
						var direction = detail.direction;
						this.isDragging = false;
						this.offCanvas.classList.add(CLASS_TRANSITIONING);
						this.scroller.classList.add(CLASS_TRANSITIONING);
						var ratio = 0;
						var x = this.getTranslateX();
						if (!this.slideIn) {
							if (x >= 0) {
								ratio = (this.offCanvasLeftWidth && (x / this.offCanvasLeftWidth)) || 0;
							} else {
								ratio = (this.offCanvasRightWidth && (x / this.offCanvasRightWidth)) || 0;
							}
							if (ratio === 0) {
								this.openPercentage(0);
								this._dispatchEvent(); //此处不触发webkitTransitionEnd,所以手动dispatch
								return;
							}
							if (direction === 'right' && ratio >= 0 && (ratio >= 0.5 || detail.swipe)) { //右滑打开
								this.openPercentage(100);
							} else if (direction === 'right' && ratio < 0 && (ratio > -0.5 || detail.swipe)) { //右滑关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio > 0 && ratio < 0.5) { //右滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio < 0.5) { //右滑还原打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio <= 0 && (ratio <= -0.5 || detail.swipe)) { //左滑打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio > 0 && (ratio <= 0.5 || detail.swipe)) { //左滑关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio < 0 && ratio >= -0.5) { //左滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio > 0.5) { //左滑还原打开
								this.openPercentage(100);
							} else { //默认关闭
								this.openPercentage(0);
							}
							if (ratio === 1 || ratio === -1) { //此处不触发webkitTransitionEnd,所以手动dispatch
								this._dispatchEvent();
							}
						} else {
							if (x >= 0) {
								ratio = (this.offCanvasRightWidth && (x / this.offCanvasRightWidth)) || 0;
							} else {
								ratio = (this.offCanvasLeftWidth && (x / this.offCanvasLeftWidth)) || 0;
							}
							if (direction === 'right' && ratio <= 0 && (ratio >= -0.5 || detail.swipe)) { //右滑打开
								this.openPercentage(100);
							} else if (direction === 'right' && ratio > 0 && (ratio >= 0.5 || detail.swipe)) { //右滑关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio <= -0.5) { //右滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio > 0 && ratio <= 0.5) { //右滑还原打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio >= 0 && (ratio <= 0.5 || detail.swipe)) { //左滑打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio < 0 && (ratio <= -0.5 || detail.swipe)) { //左滑关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio >= 0.5) { //左滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio >= -0.5 && ratio < 0) { //左滑还原打开
								this.openPercentage(100);
							} else {
								this.openPercentage(0);
							}
							if (ratio === 1 || ratio === -1 || ratio === 0) {
								this._dispatchEvent();
								return;
							}

						}
					}
					break;
			}
		},
		_dispatchEvent: function() {
			if (this.classList.contains(CLASS_ACTIVE)) {
				$.trigger(this.wrapper, 'shown', this);
			} else {
				$.trigger(this.wrapper, 'hidden', this);
			}
		},
		_initOffCanvasVisible: function() {
			if (!this.visible) {
				this.visible = true;
				if (this.offCanvasLeft) {
					this.offCanvasLeft.style.visibility = 'visible';
				}
				if (this.offCanvasRight) {
					this.offCanvasRight.style.visibility = 'visible';
				}
			}
		},
		initEvent: function() {
			var self = this;
			if (self.backdrop) {
				self.backdrop.addEventListener('tap', function(e) {
					self.close();
					e.detail.gesture.preventDefault();
				});
			}
			if (this.classList.contains('mui-draggable')) {
				this.wrapper.addEventListener($.EVENT_START, this); //临时处理
				this.wrapper.addEventListener('drag', this);
				this.wrapper.addEventListener('dragend', this);
			}
			this.wrapper.addEventListener('webkitTransitionEnd', this);
		},
		openPercentage: function(percentage) {
			var p = percentage / 100;
			if (!this.slideIn) {
				if (this.offCanvasLeft && percentage >= 0) {
					this.updateTranslate(this.offCanvasLeftWidth * p);
					this.offCanvasLeft.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				} else if (this.offCanvasRight && percentage <= 0) {
					this.updateTranslate(this.offCanvasRightWidth * p);
					this.offCanvasRight.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				}
				this.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
			} else {
				if (this.offCanvasLeft && percentage >= 0) {
					p = p === 0 ? -1 : 0;
					this.updateTranslate(this.offCanvasLeftWidth * p);
					this.offCanvasLeft.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				} else if (this.offCanvasRight && percentage <= 0) {
					p = p === 0 ? 1 : 0;
					this.updateTranslate(this.offCanvasRightWidth * p);
					this.offCanvasRight.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				}
				this.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
			}
		},
		updateTranslate: function(x) {
			if (x !== this.lastTranslateX) {
				if (!this.slideIn) {
					if ((!this.offCanvasLeft && x > 0) || (!this.offCanvasRight && x < 0)) {
						this.setTranslateX(0);
						return;
					}
					if (this.leftShowing && x > this.offCanvasLeftWidth) {
						this.setTranslateX(this.offCanvasLeftWidth);
						return;
					}
					if (this.rightShowing && x < -this.offCanvasRightWidth) {
						this.setTranslateX(-this.offCanvasRightWidth);
						return;
					}
					this.setTranslateX(x);
					if (x >= 0) {
						this.leftShowing = true;
						this.rightShowing = false;
						if (x > 0) {
							if (this.offCanvasLeft) {
								$.each(this.offCanvasLefts, function(index, offCanvas) {
									if (offCanvas === this.offCanvasLeft) {
										this.offCanvasLeft.style.zIndex = 0;
									} else {
										offCanvas.style.zIndex = -1;
									}
								}.bind(this));
							}
							if (this.offCanvasRight) {
								this.offCanvasRight.style.zIndex = -1;
							}
						}
					} else {
						this.rightShowing = true;
						this.leftShowing = false;
						if (this.offCanvasRight) {
							$.each(this.offCanvasRights, function(index, offCanvas) {
								if (offCanvas === this.offCanvasRight) {
									offCanvas.style.zIndex = 0;
								} else {
									offCanvas.style.zIndex = -1;
								}
							}.bind(this));
						}
						if (this.offCanvasLeft) {
							this.offCanvasLeft.style.zIndex = -1;
						}
					}
				} else {
					if (this.offCanvas.classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
						if (x < 0) {
							this.setTranslateX(0);
							return;
						}
						if (x > this.offCanvasRightWidth) {
							this.setTranslateX(this.offCanvasRightWidth);
							return;
						}
					} else {
						if (x > 0) {
							this.setTranslateX(0);
							return;
						}
						if (x < -this.offCanvasLeftWidth) {
							this.setTranslateX(-this.offCanvasLeftWidth);
							return;
						}
					}
					this.setTranslateX(x);
				}
				this.lastTranslateX = x;
			}
		},
		setTranslateX: $.animationFrame(function(x) {
			if (this.scroller) {
				if (this.scalable && this.offCanvas.parentNode === this.wrapper) {
					var percent = Math.abs(x) / this.offCanvasWidth;
					var zoomOutScale = 1 - (1 - this.options.scale) * percent;
					var zoomInScale = this.options.scale + (1 - this.options.scale) * percent;
					var zoomOutOpacity = 1 - (1 - this.options.opacity) * percent;
					var zoomInOpacity = this.options.opacity + (1 - this.options.opacity) * percent;
					if (this.offCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT)) {
						this.offCanvas.style.webkitTransformOrigin = '-100%';
						this.scroller.style.webkitTransformOrigin = 'left';
					} else {
						this.offCanvas.style.webkitTransformOrigin = '200%';
						this.scroller.style.webkitTransformOrigin = 'right';
					}
					this.offCanvas.style.opacity = zoomInOpacity;
					this.offCanvas.style.webkitTransform = 'translate3d(0,0,0) scale(' + zoomInScale + ')';
					this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0) scale(' + zoomOutScale + ')';
				} else {
					if (this.slideIn) {
						this.offCanvas.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
					} else {
						this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
					}
				}
			}
		}),
		getTranslateX: function() {
			if (this.offCanvas) {
				var scroller = this.slideIn ? this.offCanvas : this.scroller;
				var result = $.parseTranslateMatrix($.getStyles(scroller, 'webkitTransform'));
				return (result && result.x) || 0;
			}
			return 0;
		},
		isShown: function(direction) {
			var shown = false;
			if (!this.slideIn) {
				var x = this.getTranslateX();
				if (direction === 'right') {
					shown = this.classList.contains(CLASS_ACTIVE) && x < 0;
				} else if (direction === 'left') {
					shown = this.classList.contains(CLASS_ACTIVE) && x > 0;
				} else {
					shown = this.classList.contains(CLASS_ACTIVE) && x !== 0;
				}
			} else {
				if (direction === 'left') {
					shown = this.classList.contains(CLASS_ACTIVE) && this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE);
				} else if (direction === 'right') {
					shown = this.classList.contains(CLASS_ACTIVE) && this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE);
				} else {
					shown = this.classList.contains(CLASS_ACTIVE) && (this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE) || this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE));
				}
			}
			return shown;
		},
		close: function() {
			this._initOffCanvasVisible();
			this.offCanvas = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE) || this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE);
			this.offCanvasWidth = this.offCanvas.offsetWidth;
			if (this.scroller) {
				this.offCanvas.offsetHeight;
				this.offCanvas.classList.add(CLASS_TRANSITIONING);
				this.scroller.classList.add(CLASS_TRANSITIONING);
				this.openPercentage(0);
			}
		},
		show: function(direction) {
			this._initOffCanvasVisible();
			if (this.isShown(direction)) {
				return false;
			}
			if (!direction) {
				direction = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT) ? 'right' : 'left';
			}
			if (direction === 'right') {
				this.offCanvas = this.offCanvasRight;
				this.offCanvasWidth = this.offCanvasRightWidth;
			} else {
				this.offCanvas = this.offCanvasLeft;
				this.offCanvasWidth = this.offCanvasLeftWidth;
			}
			if (this.scroller) {
				this.offCanvas.offsetHeight;
				this.offCanvas.classList.add(CLASS_TRANSITIONING);
				this.scroller.classList.add(CLASS_TRANSITIONING);
				this.openPercentage(direction === 'left' ? 100 : -100);
			}
			return true;
		},
		toggle: function(directionOrOffCanvas) {
			var direction = directionOrOffCanvas;
			if (directionOrOffCanvas && directionOrOffCanvas.classList) {
				direction = directionOrOffCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT) ? 'left' : 'right';
				this.refresh(directionOrOffCanvas);
			}
			if (!this.show(direction)) {
				this.close();
			}
		}
	});

	//hash to offcanvas
	var findOffCanvasContainer = function(target) {
		parentNode = target.parentNode;
		if (parentNode) {
			if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				return parentNode;
			} else {
				parentNode = parentNode.parentNode;
				if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
					return parentNode;
				}
			}
		}
	};
	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var offcanvas = document.getElementById(target.hash.replace('#', ''));
			if (offcanvas) {
				var container = findOffCanvasContainer(offcanvas);
				if (container) {
					$.targets._container = container;
					return offcanvas;
				}
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(e) {
		if (!$.targets.offcanvas) {
			return;
		}
		//TODO 此处类型的代码后续考虑统一优化(target机制)，现在的实现费力不讨好
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target.tagName === 'A' && target.hash && target.hash === ('#' + $.targets.offcanvas.id)) {
				e.detail && e.detail.gesture && e.detail.gesture.preventDefault(); //fixed hashchange
				$($.targets._container).offCanvas().toggle($.targets.offcanvas);
				$.targets.offcanvas = $.targets._container = null;
				break;
			}
		}
	});

	$.fn.offCanvas = function(options) {
		var offCanvasApis = [];
		this.each(function() {
			var offCanvasApi = null;
			var self = this;
			//hack old version
			if (!self.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				self = findOffCanvasContainer(self);
			}
			var id = self.getAttribute('data-offCanvas');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = offCanvasApi = new OffCanvas(self, options);
				self.setAttribute('data-offCanvas', id);
			} else {
				offCanvasApi = $.data[id];
			}
			if (options === 'show' || options === 'close' || options === 'toggle') {
				offCanvasApi.toggle();
			}
			offCanvasApis.push(offCanvasApi);
		});
		return offCanvasApis.length === 1 ? offCanvasApis[0] : offCanvasApis;
	};
	$.ready(function() {
		$('.mui-off-canvas-wrap').offCanvas();
	});
})(mui, window, document, 'offcanvas');
/**
 * actions
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var CLASS_ACTION = 'mui-action';

	var handle = function(event, target) {
		var className = target.className || '';
		if (typeof className !== 'string') { //svg className(SVGAnimatedString)
			className = '';
		}
		if (className && ~className.indexOf(CLASS_ACTION)) {
			if (target.classList.contains('mui-action-back')) {
				event.preventDefault();
			}
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isContinue: true
	});

})(mui, 'action');
/**
 * Modals
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_MODAL = 'mui-modal';

	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var modal = document.getElementById(target.hash.replace('#', ''));
			if (modal && modal.classList.contains(CLASS_MODAL)) {
				return modal;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(event) {
		if ($.targets.modal) {
			event.detail.gesture.preventDefault(); //fixed hashchange
			$.targets.modal.classList.toggle('mui-active');
		}
	});
})(mui, window, document, 'modal');
/**
 * Popovers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name) {

	var CLASS_POPOVER = 'mui-popover';
	var CLASS_POPOVER_ARROW = 'mui-popover-arrow';
	var CLASS_ACTION_POPOVER = 'mui-popover-action';
	var CLASS_BACKDROP = 'mui-backdrop';
	var CLASS_BAR_POPOVER = 'mui-bar-popover';
	var CLASS_BAR_BACKDROP = 'mui-bar-backdrop';
	var CLASS_ACTION_BACKDROP = 'mui-backdrop-action';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_BOTTOM = 'mui-bottom';



	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			$.targets._popover = document.getElementById(target.hash.replace('#', ''));
			if ($.targets._popover && $.targets._popover.classList.contains(CLASS_POPOVER)) {
				return target;
			} else {
				$.targets._popover = null;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	var fixedPopoverScroll = function(isPopoverScroll) {
		//		if (isPopoverScroll) {
		//			document.body.setAttribute('style', 'overflow:hidden;');
		//		} else {
		//			document.body.setAttribute('style', '');
		//		}
	};
	var onPopoverShown = function(e) {
		this.removeEventListener('webkitTransitionEnd', onPopoverShown);
		this.addEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'shown', this);
	}
	var onPopoverHidden = function(e) {
		setStyle(this, 'none');
		this.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		this.removeEventListener($.EVENT_MOVE, $.preventDefault);
		fixedPopoverScroll(false);
		$.trigger(this, 'hidden', this);
	};

	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function(e) {
			var popover = $.targets._popover;
			if (popover) {
				popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
				popover.classList.remove(CLASS_ACTIVE);
				removeBackdrop(popover);
				document.body.setAttribute('style', ''); //webkitTransitionEnd有时候不触发？
			}
		});

		return element;
	}());
	var removeBackdropTimer;
	var removeBackdrop = function(popover) {
		backdrop.setAttribute('style', 'opacity:0');
		$.targets.popover = $.targets._popover = null; //reset
		removeBackdropTimer = $.later(function() {
			if (!popover.classList.contains(CLASS_ACTIVE) && backdrop.parentNode && backdrop.parentNode === document.body) {
				document.body.removeChild(backdrop);
			}
		}, 350);
	};
	window.addEventListener('tap', function(e) {
		if (!$.targets.popover) {
			return;
		}
		var toggle = false;
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target === $.targets.popover) {
				toggle = true;
			}
		}
		if (toggle) {
			e.detail.gesture.preventDefault(); //fixed hashchange
			togglePopover($.targets._popover, $.targets.popover);
		}

	});

	var togglePopover = function(popover, anchor, state) {
		if ((state === 'show' && popover.classList.contains(CLASS_ACTIVE)) || (state === 'hide' && !popover.classList.contains(CLASS_ACTIVE))) {
			return;
		}
		removeBackdropTimer && removeBackdropTimer.cancel(); //取消remove的timer
		//remove一遍，以免来回快速切换，导致webkitTransitionEnd不触发，无法remove
		popover.removeEventListener('webkitTransitionEnd', onPopoverShown);
		popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		backdrop.classList.remove(CLASS_BAR_BACKDROP);
		backdrop.classList.remove(CLASS_ACTION_BACKDROP);
		var _popover = document.querySelector('.mui-popover.mui-active');
		if (_popover) {
			//			_popover.setAttribute('style', '');
			_popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
			_popover.classList.remove(CLASS_ACTIVE);
			//			_popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
			//			fixedPopoverScroll(false);
			//同一个弹出则直接返回，解决同一个popover的toggle
			if (popover === _popover) {
				removeBackdrop(_popover);
				return;
			}
		}
		var isActionSheet = false;
		if (popover.classList.contains(CLASS_BAR_POPOVER) || popover.classList.contains(CLASS_ACTION_POPOVER)) { //navBar
			if (popover.classList.contains(CLASS_ACTION_POPOVER)) { //action sheet popover
				isActionSheet = true;
				backdrop.classList.add(CLASS_ACTION_BACKDROP);
			} else { //bar popover
				backdrop.classList.add(CLASS_BAR_BACKDROP);
				//				if (anchor) {
				//					if (anchor.parentNode) {
				//						var offsetWidth = anchor.offsetWidth;
				//						var offsetLeft = anchor.offsetLeft;
				//						var innerWidth = window.innerWidth;
				//						popover.style.left = (Math.min(Math.max(offsetLeft, defaultPadding), innerWidth - offsetWidth - defaultPadding)) + "px";
				//					} else {
				//						//TODO anchor is position:{left,top,bottom,right}
				//					}
				//				}
			}
		}
		setStyle(popover, 'block'); //actionsheet transform
		popover.offsetHeight;
		popover.classList.add(CLASS_ACTIVE);
		backdrop.setAttribute('style', '');
		document.body.appendChild(backdrop);
		fixedPopoverScroll(true);
		calPosition(popover, anchor, isActionSheet); //position
		backdrop.classList.add(CLASS_ACTIVE);
		popover.addEventListener('webkitTransitionEnd', onPopoverShown);
	};
	var setStyle = function(popover, display, top, left) {
		var style = popover.style;
		if (typeof display !== 'undefined')
			style.display = display;
		if (typeof top !== 'undefined')
			style.top = top + 'px';
		if (typeof left !== 'undefined')
			style.left = left + 'px';
	};
	var calPosition = function(popover, anchor, isActionSheet) {
		if (!popover || !anchor) {
			return;
		}

		if (isActionSheet) { //actionsheet
			setStyle(popover, 'block')
			return;
		}

		var wWidth = window.innerWidth;
		var wHeight = window.innerHeight;

		var pWidth = popover.offsetWidth;
		var pHeight = popover.offsetHeight;

		var aWidth = anchor.offsetWidth;
		var aHeight = anchor.offsetHeight;
		var offset = $.offset(anchor);

		var arrow = popover.querySelector('.' + CLASS_POPOVER_ARROW);
		if (!arrow) {
			arrow = document.createElement('div');
			arrow.className = CLASS_POPOVER_ARROW;
			popover.appendChild(arrow);
		}
		var arrowSize = arrow && arrow.offsetWidth / 2 || 0;



		var pTop = 0;
		var pLeft = 0;
		var diff = 0;
		var arrowLeft = 0;
		var defaultPadding = popover.classList.contains(CLASS_ACTION_POPOVER) ? 0 : 5;

		var position = 'top';
		if ((pHeight + arrowSize) < (offset.top - window.pageYOffset)) { //top
			pTop = offset.top - pHeight - arrowSize;
		} else if ((pHeight + arrowSize) < (wHeight - (offset.top - window.pageYOffset) - aHeight)) { //bottom
			position = 'bottom';
			pTop = offset.top + aHeight + arrowSize;
		} else { //middle
			position = 'middle';
			pTop = Math.max((wHeight - pHeight) / 2 + window.pageYOffset, 0);
			pLeft = Math.max((wWidth - pWidth) / 2 + window.pageXOffset, 0);
		}
		if (position === 'top' || position === 'bottom') {
			pLeft = aWidth / 2 + offset.left - pWidth / 2;
			diff = pLeft;
			if (pLeft < defaultPadding) pLeft = defaultPadding;
			if (pLeft + pWidth > wWidth) pLeft = wWidth - pWidth - defaultPadding;

			if (arrow) {
				if (position === 'top') {
					arrow.classList.add(CLASS_BOTTOM);
				} else {
					arrow.classList.remove(CLASS_BOTTOM);
				}
				diff = diff - pLeft;
				arrowLeft = (pWidth / 2 - arrowSize / 2 + diff);
				arrowLeft = Math.max(Math.min(arrowLeft, pWidth - arrowSize * 2 - 6), 6);
				arrow.setAttribute('style', 'left:' + arrowLeft + 'px');
			}
		} else if (position === 'middle') {
			arrow.setAttribute('style', 'display:none');
		}
		setStyle(popover, 'block', pTop, pLeft);
	};

	$.createMask = function(callback) {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function() {
			mask.close();
		});
		var mask = [element];
		mask._show = false;
		mask.show = function() {
			mask._show = true;
			element.setAttribute('style', 'opacity:1');
			document.body.appendChild(element);
			return mask;
		};
		mask._remove = function() {
			if (mask._show) {
				mask._show = false;
				element.setAttribute('style', 'opacity:0');
				$.later(function() {
					var body = document.body;
					element.parentNode === body && body.removeChild(element);
				}, 350);
			}
			return mask;
		};
		mask.close = function() {
			if (callback) {
				if (callback() !== false) {
					mask._remove();
				}
			} else {
				mask._remove();
			}
		};
		return mask;
	};
	$.fn.popover = function() {
		var args = arguments;
		this.each(function() {
			$.targets._popover = this;
			if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
				togglePopover(this, args[1], args[0]);
			}
		});
	};

})(mui, window, document, 'popover');

/**
 * Toggles switch
 * @param {type} $
 * @param {type} window
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, name) {

	var CLASS_SWITCH = 'mui-switch';
	var CLASS_SWITCH_HANDLE = 'mui-switch-handle';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_DRAGGING = 'mui-dragging';

	var CLASS_DISABLED = 'mui-disabled';

	var SELECTOR_SWITCH_HANDLE = '.' + CLASS_SWITCH_HANDLE;

	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_SWITCH)) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 100,
		handle: handle,
		target: false
	});


	var Toggle = function(element) {
		this.element = element;
		this.classList = this.element.classList;
		this.handle = this.element.querySelector(SELECTOR_SWITCH_HANDLE);
		this.init();
		this.initEvent();
	};
	Toggle.prototype.init = function() {
		this.toggleWidth = this.element.offsetWidth;
		this.handleWidth = this.handle.offsetWidth;
		this.handleX = this.toggleWidth - this.handleWidth - 3;
	};
	Toggle.prototype.initEvent = function() {
		this.element.addEventListener($.EVENT_START, this);
		this.element.addEventListener('drag', this);
		this.element.addEventListener('swiperight', this);
		this.element.addEventListener($.EVENT_END, this);
		this.element.addEventListener($.EVENT_CANCEL, this);

	};
	Toggle.prototype.handleEvent = function(e) {
		if (this.classList.contains(CLASS_DISABLED)) {
			return;
		}
		switch (e.type) {
			case $.EVENT_START:
				this.start(e);
				break;
			case 'drag':
				this.drag(e);
				break;
			case 'swiperight':
				this.swiperight();
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				this.end(e);
				break;
		}
	};
	Toggle.prototype.start = function(e) {
		this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '.2s';
		this.classList.add(CLASS_DRAGGING);
		if (this.toggleWidth === 0 || this.handleWidth === 0) { //当switch处于隐藏状态时，width为0，需要重新初始化
			this.init();
		}
	};
	Toggle.prototype.drag = function(e) {
		var detail = e.detail;
		if (!this.isDragging) {
			if (detail.direction === 'left' || detail.direction === 'right') {
				this.isDragging = true;
				this.lastChanged = undefined;
				this.initialState = this.classList.contains(CLASS_ACTIVE);
			}
		}
		if (this.isDragging) {
			this.setTranslateX(detail.deltaX);
			e.stopPropagation();
			detail.gesture.preventDefault();
		}
	};
	Toggle.prototype.swiperight = function(e) {
		if (this.isDragging) {
			e.stopPropagation();
		}
	};
	Toggle.prototype.end = function(e) {
		this.classList.remove(CLASS_DRAGGING);
		if (this.isDragging) {
			this.isDragging = false;
			e.stopPropagation();
			$.trigger(this.element, 'toggle', {
				isActive: this.classList.contains(CLASS_ACTIVE)
			});
		} else {
			this.toggle();
		}
	};
	Toggle.prototype.toggle = function(animate) {
		var classList = this.classList;
		if (animate === false) {
			this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '0s';
		} else {
			this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '.2s';
		}
		if (classList.contains(CLASS_ACTIVE)) {
			classList.remove(CLASS_ACTIVE);
			this.handle.style.webkitTransform = 'translate(0,0)';
		} else {
			classList.add(CLASS_ACTIVE);
			this.handle.style.webkitTransform = 'translate(' + this.handleX + 'px,0)';
		}
		$.trigger(this.element, 'toggle', {
			isActive: this.classList.contains(CLASS_ACTIVE)
		});
	};
	Toggle.prototype.setTranslateX = $.animationFrame(function(x) {
		if (!this.isDragging) {
			return;
		}
		var isChanged = false;
		if ((this.initialState && -x > (this.handleX / 2)) || (!this.initialState && x > (this.handleX / 2))) {
			isChanged = true;
		}
		if (this.lastChanged !== isChanged) {
			if (isChanged) {
				this.handle.style.webkitTransform = 'translate(' + (this.initialState ? 0 : this.handleX) + 'px,0)';
				this.classList[this.initialState ? 'remove' : 'add'](CLASS_ACTIVE);
			} else {
				this.handle.style.webkitTransform = 'translate(' + (this.initialState ? this.handleX : 0) + 'px,0)';
				this.classList[this.initialState ? 'add' : 'remove'](CLASS_ACTIVE);
			}
			this.lastChanged = isChanged;
		}

	});

	$.fn['switch'] = function(options) {
		var switchApis = [];
		this.each(function() {
			var switchApi = null;
			var id = this.getAttribute('data-switch');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = new Toggle(this);
				this.setAttribute('data-switch', id);
			} else {
				switchApi = $.data[id];
			}
			switchApis.push(switchApi);
		});
		return switchApis.length > 1 ? switchApis : switchApis[0];
	};
	$.ready(function() {
		$('.' + CLASS_SWITCH)['switch']();
	});
})(mui, window, 'toggle');
/**
 * Tableviews
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {

	var CLASS_ACTIVE = 'mui-active';
	var CLASS_SELECTED = 'mui-selected';
	var CLASS_GRID_VIEW = 'mui-grid-view';
	var CLASS_RADIO_VIEW = 'mui-table-view-radio';
	var CLASS_TABLE_VIEW_CELL = 'mui-table-view-cell';
	var CLASS_COLLAPSE_CONTENT = 'mui-collapse-content';
	var CLASS_DISABLED = 'mui-disabled';
	var CLASS_TOGGLE = 'mui-switch';
	var CLASS_BTN = 'mui-btn';

	var CLASS_SLIDER_HANDLE = 'mui-slider-handle';
	var CLASS_SLIDER_LEFT = 'mui-slider-left';
	var CLASS_SLIDER_RIGHT = 'mui-slider-right';
	var CLASS_TRANSITIONING = 'mui-transitioning';


	var SELECTOR_SLIDER_HANDLE = '.' + CLASS_SLIDER_HANDLE;
	var SELECTOR_SLIDER_LEFT = '.' + CLASS_SLIDER_LEFT;
	var SELECTOR_SLIDER_RIGHT = '.' + CLASS_SLIDER_RIGHT;
	var SELECTOR_SELECTED = '.' + CLASS_SELECTED;
	var SELECTOR_BUTTON = '.' + CLASS_BTN;
	var overFactor = 0.8;
	var cell, a;

	var isMoved = isOpened = openedActions = progress = false;
	var sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
	var timer = translateX = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0;



	var toggleActive = function(isActive) {
		if (isActive) {
			if (a) {
				a.classList.add(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.add(CLASS_ACTIVE);
			}
		} else {
			timer && timer.cancel();
			if (a) {
				a.classList.remove(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.remove(CLASS_ACTIVE);
			}
		}
	};

	var updateTranslate = function() {
		if (translateX !== lastTranslateX) {
			if (buttonsRight && buttonsRight.length > 0) {
				progress = translateX / sliderActionRightWidth;
				if (translateX < -sliderActionRightWidth) {
					translateX = -sliderActionRightWidth - Math.pow(-translateX - sliderActionRightWidth, overFactor);
				}
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					if (typeof buttonRight._buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					buttonOffset = buttonRight._buttonOffset;
					setTranslate(buttonRight, (translateX - buttonOffset * (1 + Math.max(progress, -1))));
				}
			}
			if (buttonsLeft && buttonsLeft.length > 0) {
				progress = translateX / sliderActionLeftWidth;
				if (translateX > sliderActionLeftWidth) {
					translateX = sliderActionLeftWidth + Math.pow(translateX - sliderActionLeftWidth, overFactor);
				}
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					if (typeof buttonLeft._buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					buttonOffset = buttonLeft._buttonOffset;
					if (buttonsLeft.length > 1) {
						buttonLeft.style.zIndex = buttonsLeft.length - i;
					}
					setTranslate(buttonLeft, (translateX + buttonOffset * (1 - Math.min(progress, 1))));
				}
			}
			setTranslate(sliderHandle, translateX);
			lastTranslateX = translateX;
		}
		sliderRequestAnimationFrame = requestAnimationFrame(function() {
			updateTranslate();
		});
	};
	var setTranslate = function(element, x) {
		if (element) {
			element.style.webkitTransform = 'translate(' + x + 'px,0)';
		}
	};

	window.addEventListener($.EVENT_START, function(event) {
		if (cell) {
			toggleActive(false);
		}
		cell = a = false;
		isMoved = isOpened = openedActions = false;
		var target = event.target;
		var isDisabled = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList) {
				var classList = target.classList;
				if ((target.tagName === 'INPUT' && target.type !== 'radio' && target.type !== 'checkbox') || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN) || classList.contains(CLASS_DISABLED)) {
					isDisabled = true;
				}
				if (classList.contains(CLASS_COLLAPSE_CONTENT)) { //collapse content
					break;
				}
				if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
					cell = target;
					//TODO swipe to delete close
					var selected = cell.parentNode.querySelector(SELECTOR_SELECTED);
					if (!cell.parentNode.classList.contains(CLASS_RADIO_VIEW) && selected && selected !== cell) {
						$.swipeoutClose(selected);
						cell = isDisabled = false;
						return;
					}
					if (!cell.parentNode.classList.contains(CLASS_GRID_VIEW)) {
						var link = cell.querySelector('a');
						if (link && link.parentNode === cell) { //li>a
							a = link;
						}
					}
					var handle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
					if (handle) {
						toggleEvents(cell);
						event.stopPropagation();
					}
					if (!isDisabled) {
						if (handle) {
							if (timer) {
								timer.cancel();
							}
							timer = $.later(function() {
								toggleActive(true);
							}, 100);
						} else {
							toggleActive(true);
						}
					}
					break;
				}
			}
		}
	});
	window.addEventListener($.EVENT_MOVE, function(event) {
		toggleActive(false);
	});

	var handleEvent = {
		handleEvent: function(event) {
			switch (event.type) {
				case 'drag':
					this.drag(event);
					break;
				case 'dragend':
					this.dragend(event);
					break;
				case 'flick':
					this.flick(event);
					break;
				case 'swiperight':
					this.swiperight(event);
					break;
				case 'swipeleft':
					this.swipeleft(event);
					break;
			}
		},
		drag: function(event) {
			if (!cell) {
				return;
			}
			if (!isMoved) { //init
				sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
				sliderHandle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
				if (sliderHandle) {
					sliderActionLeft = cell.querySelector(SELECTOR_SLIDER_LEFT);
					sliderActionRight = cell.querySelector(SELECTOR_SLIDER_RIGHT);
					if (sliderActionLeft) {
						sliderActionLeftWidth = sliderActionLeft.offsetWidth;
						buttonsLeft = sliderActionLeft.querySelectorAll(SELECTOR_BUTTON);
					}
					if (sliderActionRight) {
						sliderActionRightWidth = sliderActionRight.offsetWidth;
						buttonsRight = sliderActionRight.querySelectorAll(SELECTOR_BUTTON);
					}
					cell.classList.remove(CLASS_TRANSITIONING);
					isOpened = cell.classList.contains(CLASS_SELECTED);
					if (isOpened) {
						openedActions = cell.querySelector(SELECTOR_SLIDER_LEFT + SELECTOR_SELECTED) ? 'left' : 'right';
					}
				}
			}
			var detail = event.detail;
			var direction = detail.direction;
			var angle = detail.angle;
			if (direction === 'left' && (angle > 150 || angle < -150)) {
				if (buttonsRight || (buttonsLeft && isOpened)) { //存在右侧按钮或存在左侧按钮且是已打开状态
					isMoved = true;
				}
			} else if (direction === 'right' && (angle > -30 && angle < 30)) {
				if (buttonsLeft || (buttonsRight && isOpened)) { //存在左侧按钮或存在右侧按钮且是已打开状态
					isMoved = true;
				}
			}
			if (isMoved) {
				event.stopPropagation();
				event.detail.gesture.preventDefault();
				var translate = event.detail.deltaX;
				if (isOpened) {
					if (openedActions === 'right') {
						translate = translate - sliderActionRightWidth;
					} else {
						translate = translate + sliderActionLeftWidth;
					}
				}
				if ((translate > 0 && !buttonsLeft) || (translate < 0 && !buttonsRight)) {
					if (!isOpened) {
						return;
					}
					translate = 0;
				}
				if (translate < 0) {
					sliderDirection = 'toLeft';
				} else if (translate > 0) {
					sliderDirection = 'toRight';
				} else {
					if (!sliderDirection) {
						sliderDirection = 'toLeft';
					}
				}
				if (!sliderRequestAnimationFrame) {
					updateTranslate();
				}
				translateX = translate;
			}
		},
		flick: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swipeleft: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swiperight: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		dragend: function(event) {
			if (!isMoved) {
				return;
			}
			event.stopPropagation();
			if (sliderRequestAnimationFrame) {
				cancelAnimationFrame(sliderRequestAnimationFrame);
				sliderRequestAnimationFrame = null;
			}
			var detail = event.detail;
			isMoved = false;
			var action = 'close';
			var actionsWidth = sliderDirection === 'toLeft' ? sliderActionRightWidth : sliderActionLeftWidth;
			var isToggle = detail.swipe || (Math.abs(translateX) > actionsWidth / 2);
			if (isToggle) {
				if (!isOpened) {
					action = 'open';
				} else if (detail.direction === 'left' && openedActions === 'right') {
					action = 'open';
				} else if (detail.direction === 'right' && openedActions === 'left') {
					action = 'open';
				}

			}
			cell.classList.add(CLASS_TRANSITIONING);
			var buttons;
			if (action === 'open') {
				var newTranslate = sliderDirection === 'toLeft' ? -actionsWidth : actionsWidth;
				setTranslate(sliderHandle, newTranslate);
				buttons = sliderDirection === 'toLeft' ? buttonsRight : buttonsLeft;
				if (typeof buttons !== 'undefined') {
					var button = null;
					for (var i = 0; i < buttons.length; i++) {
						button = buttons[i];
						setTranslate(button, newTranslate);
					}
					button.parentNode.classList.add(CLASS_SELECTED);
					cell.classList.add(CLASS_SELECTED);
					if (!isOpened) {
						$.trigger(cell, sliderDirection === 'toLeft' ? 'slideleft' : 'slideright');
					}
				}
			} else {
				setTranslate(sliderHandle, 0);
				sliderActionLeft && sliderActionLeft.classList.remove(CLASS_SELECTED);
				sliderActionRight && sliderActionRight.classList.remove(CLASS_SELECTED);
				cell.classList.remove(CLASS_SELECTED);
			}
			var buttonOffset;
			if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== buttons) {
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					buttonOffset = buttonLeft._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					setTranslate(buttonLeft, buttonOffset);
				}
			}
			if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== buttons) {
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					buttonOffset = buttonRight._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					setTranslate(buttonRight, -buttonOffset);
				}
			}
		}
	};

	function toggleEvents(element, isRemove) {
		var method = !!isRemove ? 'removeEventListener' : 'addEventListener';
		element[method]('drag', handleEvent);
		element[method]('dragend', handleEvent);
		element[method]('swiperight', handleEvent);
		element[method]('swipeleft', handleEvent);
		element[method]('flick', handleEvent);
	};
	/**
	 * 打开滑动菜单
	 * @param {Object} el
	 * @param {Object} direction
	 */
	$.swipeoutOpen = function(el, direction) {
		if (!el) return;
		var classList = el.classList;
		if (classList.contains(CLASS_SELECTED)) return;
		if (!direction) {
			if (el.querySelector(SELECTOR_SLIDER_RIGHT)) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		}
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.add(CLASS_SELECTED);
		classList.add(CLASS_SELECTED);
		classList.remove(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var translate = (direction === 'right') ? -swipeoutWidth : swipeoutWidth;
		var length = buttons.length;
		var button;
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, -button.offsetLeft);
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
		classList.add(CLASS_TRANSITIONING);
		for (var i = 0; i < length; i++) {
			setTranslate(buttons[i], translate);
		}
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), translate);
	};
	/**
	 * 关闭滑动菜单
	 * @param {Object} el
	 */
	$.swipeoutClose = function(el) {
		if (!el) return;
		var classList = el.classList;
		if (!classList.contains(CLASS_SELECTED)) return;
		var direction = el.querySelector(SELECTOR_SLIDER_RIGHT + SELECTOR_SELECTED) ? 'right' : 'left';
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.remove(CLASS_SELECTED);
		classList.remove(CLASS_SELECTED);
		classList.add(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var length = buttons.length;
		var button;
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), 0);
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, (-button.offsetLeft));
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
	};

	window.addEventListener($.EVENT_END, function(event) { //使用touchend来取消高亮，避免一次点击既不触发tap，doubletap，longtap的事件
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	window.addEventListener($.EVENT_CANCEL, function(event) { //使用touchcancel来取消高亮，避免一次点击既不触发tap，doubletap，longtap的事件
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	var radioOrCheckboxClick = function(event) {
		var type = event.target && event.target.type || '';
		if (type === 'radio' || type === 'checkbox') {
			return;
		}
		var classList = cell.classList;
		if (classList.contains('mui-radio')) {
			var input = cell.querySelector('input[type=radio]');
			if (input) {
				//				input.click();
				if (!input.disabled && !input.readOnly) {
					input.checked = !input.checked;
					$.trigger(input, 'change');
				}
			}
		} else if (classList.contains('mui-checkbox')) {
			var input = cell.querySelector('input[type=checkbox]');
			if (input) {
				//				input.click();
				if (!input.disabled && !input.readOnly) {
					input.checked = !input.checked;
					$.trigger(input, 'change');
				}
			}
		}
	};
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		if (cell && cell.classList.contains('mui-collapse')) {
			e.preventDefault();
		}
	});
	window.addEventListener('doubletap', function(event) {
		if (cell) {
			radioOrCheckboxClick(event);
		}
	});
	var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	window.addEventListener('tap', function(event) {
		if (!cell) {
			return;
		}
		var isExpand = false;
		var classList = cell.classList;
		var ul = cell.parentNode;
		if (ul && ul.classList.contains(CLASS_RADIO_VIEW)) {
			if (classList.contains(CLASS_SELECTED)) {
				return;
			}
			var selected = ul.querySelector('li' + SELECTOR_SELECTED);
			if (selected) {
				selected.classList.remove(CLASS_SELECTED);
			}
			classList.add(CLASS_SELECTED);
			$.trigger(cell, 'selected', {
				el: cell
			});
			return;
		}
		if (classList.contains('mui-collapse') && !cell.parentNode.classList.contains('mui-unfold')) {
			if (!preventDefaultException.test(event.target.tagName)) {
				event.detail.gesture.preventDefault();
			}

			if (!classList.contains(CLASS_ACTIVE)) { //展开时,需要收缩其他同类
				var collapse = cell.parentNode.querySelector('.mui-collapse.mui-active');
				if (collapse) {
					collapse.classList.remove(CLASS_ACTIVE);
				}
				isExpand = true;
			}
			classList.toggle(CLASS_ACTIVE);
			if (isExpand) {
				//触发展开事件
				$.trigger(cell, 'expand');

				//scroll
				//暂不滚动
				// var offsetTop = $.offset(cell).top;
				// var scrollTop = document.body.scrollTop;
				// var height = window.innerHeight;
				// var offsetHeight = cell.offsetHeight;
				// var cellHeight = (offsetTop - scrollTop + offsetHeight);
				// if (offsetHeight > height) {
				// 	$.scrollTo(offsetTop, 300);
				// } else if (cellHeight > height) {
				// 	$.scrollTo(cellHeight - height + scrollTop, 300);
				// }
			}
		} else {
			radioOrCheckboxClick(event);
		}
	});
})(mui, window, document);
(function($, window) {
	/**
	 * 警告消息框
	 */
	$.alert = function(message, title, btnValue, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {
				if (typeof title === 'function') {
					callback = title;
					title = null;
					btnValue = '确定';
				} else if (typeof btnValue === 'function') {
					callback = btnValue;
					btnValue = null;
				}
				$.plusReady(function() {
					plus.nativeUI.alert(message, callback, title, btnValue);
				});
			}

		} else {
			//TODO H5版本
			window.alert(message);
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 确认消息框
	 */
	$.confirm = function(message, title, btnArray, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {
				if (typeof title === 'function') {
					callback = title;
					title = null;
					btnArray = null;
				} else if (typeof btnArray === 'function') {
					callback = btnArray;
					btnArray = null;
				}
				$.plusReady(function() {
					plus.nativeUI.confirm(message, callback, title, btnArray);
				});
			}

		} else {
			//H5版本，0为确认，1为取消
			if (window.confirm(message)) {
				callback({
					index: 0
				});
			} else {
				callback({
					index: 1
				});
			}
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 输入对话框
	 */
	$.prompt = function(text, defaultText, title, btnArray, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {

				if (typeof defaultText === 'function') {
					callback = defaultText;
					defaultText = null;
					title = null;
					btnArray = null;
				} else if (typeof title === 'function') {
					callback = title;
					title = null;
					btnArray = null;
				} else if (typeof btnArray === 'function') {
					callback = btnArray;
					btnArray = null;
				}
				$.plusReady(function() {
					plus.nativeUI.prompt(text, callback, title, defaultText, btnArray);
				});
			}

		} else {
			//H5版本(确认index为0，取消index为1)
			var result = window.prompt(text);
			if (result) {
				callback({
					index: 0,
					value: result
				});
			} else {
				callback({
					index: 1,
					value: ''
				});
			}
		}
	};

})(mui, window);
(function($, window) {
	var CLASS_ACTIVE = 'mui-active';
	/**
	 * 自动消失提示框
	 */
	$.toast = function(message) {
		if ($.os.plus) {
			//默认显示在底部；
			$.plusReady(function() {
				plus.nativeUI.toast(message, {
					verticalAlign: 'bottom'
				});
			});
		} else {
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="' + 'mui-toast-message' + '">' + message + '</div>';
			toast.addEventListener('webkitTransitionEnd', function() {
				if (!toast.classList.contains(CLASS_ACTIVE)) {
					toast.parentNode.removeChild(toast);
				}
			});
			document.body.appendChild(toast);
			toast.offsetHeight;
			toast.classList.add(CLASS_ACTIVE);
			setTimeout(function() {
				toast.classList.remove(CLASS_ACTIVE);
			}, 2000);
		}
	};

})(mui, window);
/**
 * Popup(alert,confirm,prompt)  
 * @param {Object} $
 * @param {Object} window
 * @param {Object} document
 */
(function($, window, document) {
	var CLASS_POPUP = 'mui-popup';
	var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
	var CLASS_POPUP_IN = 'mui-popup-in';
	var CLASS_POPUP_OUT = 'mui-popup-out';
	var CLASS_POPUP_INNER = 'mui-popup-inner';
	var CLASS_POPUP_TITLE = 'mui-popup-title';
	var CLASS_POPUP_TEXT = 'mui-popup-text';
	var CLASS_POPUP_INPUT = 'mui-popup-input';
	var CLASS_POPUP_BUTTONS = 'mui-popup-buttons';
	var CLASS_POPUP_BUTTON = 'mui-popup-button';
	var CLASS_POPUP_BUTTON_BOLD = 'mui-popup-button-bold';
	var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
	var CLASS_ACTIVE = 'mui-active';

	var popupStack = [];
	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(CLASS_POPUP_BACKDROP);
		element.addEventListener('webkitTransitionEnd', function() {
			if (!this.classList.contains(CLASS_ACTIVE)) {
				element.parentNode && element.parentNode.removeChild(element);
			}
		});
		return element;
	}());

	var createInput = function(placeholder) {
		return '<div class="' + CLASS_POPUP_INPUT + '"><input type="text" autofocus placeholder="' + (placeholder || '') + '"/></div>';
	};
	var createInner = function(message, title, extra) {
		return '<div class="' + CLASS_POPUP_INNER + '"><div class="' + CLASS_POPUP_TITLE + '">' + title + '</div><div class="' + CLASS_POPUP_TEXT + '">' + message + '</div>' + (extra || '') + '</div>';
	};
	var createButtons = function(btnArray) {
		var length = btnArray.length;
		var btns = [];
		for (var i = 0; i < length; i++) {
			btns.push('<span class="' + CLASS_POPUP_BUTTON + (i === length - 1 ? (' ' + CLASS_POPUP_BUTTON_BOLD) : '') + '">' + btnArray[i] + '</span>');
		}
		return '<div class="' + CLASS_POPUP_BUTTONS + '">' + btns.join('') + '</div>';
	};

	var createPopup = function(html, callback) {
		var popupElement = document.createElement('div');
		popupElement.className = CLASS_POPUP;
		popupElement.innerHTML = html;
		var removePopupElement = function() {
			popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
			popupElement = null;
		};

		popupElement.addEventListener('webkitTransitionEnd', function(e) {
			if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
				removePopupElement();
			}
		});
		popupElement.style.display = 'block';
		document.body.appendChild(popupElement);
		popupElement.offsetHeight;
		popupElement.classList.add(CLASS_POPUP_IN);

		if (!backdrop.classList.contains(CLASS_ACTIVE)) {
			backdrop.style.display = 'block';
			document.body.appendChild(backdrop);
			backdrop.offsetHeight;
			backdrop.classList.add(CLASS_ACTIVE);
		}
		var btns = $.qsa('.' + CLASS_POPUP_BUTTON, popupElement);
		var input = popupElement.querySelector('.' + CLASS_POPUP_INPUT + ' input');
		var popup = {
			element: popupElement,
			close: function(index, animate) {
				if (popupElement) {
					callback && callback({
						index: index || 0,
						value: input && input.value || ''
					});
					if (animate !== false) {
						popupElement.classList.remove(CLASS_POPUP_IN);
						popupElement.classList.add(CLASS_POPUP_OUT);
					} else {
						removePopupElement();
					}
					popupStack.pop();
					//如果还有其他popup，则不remove backdrop
					if (popupStack.length) {
						popupStack[popupStack.length - 1]['show'](animate);
					} else {
						backdrop.classList.remove(CLASS_ACTIVE);
					}
				}
			}
		};
		var handleEvent = function(e) {
			popup.close(btns.indexOf(e.target));
		};
		$(popupElement).on('tap', '.' + CLASS_POPUP_BUTTON, handleEvent);
		if (popupStack.length) {
			popupStack[popupStack.length - 1]['hide']();
		}
		popupStack.push({
			close: popup.close,
			show: function(animate) {
				popupElement.style.display = 'block';
				popupElement.offsetHeight;
				popupElement.classList.add(CLASS_POPUP_IN);
			},
			hide: function() {
				popupElement.style.display = 'none';
				popupElement.classList.remove(CLASS_POPUP_IN);
			}
		});
		return popup;
	};
	var createAlert = function(message, title, btnValue, callback, type) {
		if (typeof message === 'undefined') {
			return;
		} else {
			if (typeof title === 'function') {
				callback = title;
				title = null;
				btnValue = null;
			} else if (typeof btnValue === 'function') {
				callback = btnValue;
				btnValue = null;
			}
		}
		if (!$.os.plus || type === 'div') {
			return createPopup(createInner(message, title || '提示') + createButtons([btnValue || '确定']), callback);
		}
		return plus.nativeUI.alert(message, callback, title || '提示', btnValue || '确定');
	};
	var createConfirm = function(message, title, btnArray, callback, type) {
		if (typeof message === 'undefined') {
			return;
		} else {
			if (typeof title === 'function') {
				callback = title;
				title = null;
				btnArray = null;
			} else if (typeof btnArray === 'function') {
				callback = btnArray;
				btnArray = null;
			}
		}
		if (!$.os.plus || type === 'div') {
			return createPopup(createInner(message, title || '提示') + createButtons(btnArray || ['取消', '确认']), callback);
		}
		return plus.nativeUI.confirm(message, callback, title, btnArray || ['取消', '确认']);
	};
	var createPrompt = function(message, placeholder, title, btnArray, callback, type) {
		if (typeof message === 'undefined') {
			return;
		} else {
			if (typeof placeholder === 'function') {
				callback = placeholder;
				placeholder = null;
				title = null;
				btnArray = null;
			} else if (typeof title === 'function') {
				callback = title;
				title = null;
				btnArray = null;
			} else if (typeof btnArray === 'function') {
				callback = btnArray;
				btnArray = null;
			}
		}
		if (!$.os.plus || type === 'div') {
			return createPopup(createInner(message, title || '提示', createInput(placeholder)) + createButtons(btnArray || ['取消', '确认']), callback);
		}
		return plus.nativeUI.prompt(message, callback, title || '提示', placeholder, btnArray || ['取消', '确认']);
	};
	var closePopup = function() {
		if (popupStack.length) {
			popupStack[popupStack.length - 1]['close']();
			return true;
		} else {
			return false;
		}
	};
	var closePopups = function() {
		while (popupStack.length) {
			popupStack[popupStack.length - 1]['close']();
		}
	};

	$.closePopup = closePopup;
	$.closePopups = closePopups;
	$.alert = createAlert;
	$.confirm = createConfirm;
	$.prompt = createPrompt;
})(mui, window, document);
/**
 * Input(TODO resize)
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {
	var CLASS_ICON = 'mui-icon';
	var CLASS_ICON_CLEAR = 'mui-icon-clear';
	var CLASS_ICON_SPEECH = 'mui-icon-speech';
	var CLASS_ICON_SEARCH = 'mui-icon-search';
	var CLASS_ICON_PASSWORD = 'mui-icon-eye';
	var CLASS_INPUT_ROW = 'mui-input-row';
	var CLASS_PLACEHOLDER = 'mui-placeholder';
	var CLASS_TOOLTIP = 'mui-tooltip';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_FOCUSIN = 'mui-focusin';
	var SELECTOR_ICON_CLOSE = '.' + CLASS_ICON_CLEAR;
	var SELECTOR_ICON_SPEECH = '.' + CLASS_ICON_SPEECH;
	var SELECTOR_ICON_PASSWORD = '.' + CLASS_ICON_PASSWORD;
	var SELECTOR_PLACEHOLDER = '.' + CLASS_PLACEHOLDER;
	var SELECTOR_TOOLTIP = '.' + CLASS_TOOLTIP;

	var findRow = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList && target.classList.contains(CLASS_INPUT_ROW)) {
				return target;
			}
		}
		return null;
	};
	var Input = function(element, options) {
		this.element = element;
		this.options = options || {
			actions: 'clear'
		};
		if (~this.options.actions.indexOf('slider')) { //slider
			this.sliderActionClass = CLASS_TOOLTIP + ' ' + CLASS_HIDDEN;
			this.sliderActionSelector = SELECTOR_TOOLTIP;
		} else { //clear,speech,search
			if (~this.options.actions.indexOf('clear')) {
				this.clearActionClass = CLASS_ICON + ' ' + CLASS_ICON_CLEAR + ' ' + CLASS_HIDDEN;
				this.clearActionSelector = SELECTOR_ICON_CLOSE;
			}
			if (~this.options.actions.indexOf('speech')) { //only for 5+
				this.speechActionClass = CLASS_ICON + ' ' + CLASS_ICON_SPEECH;
				this.speechActionSelector = SELECTOR_ICON_SPEECH;
			}
			if (~this.options.actions.indexOf('search')) {
				this.searchActionClass = CLASS_PLACEHOLDER;
				this.searchActionSelector = SELECTOR_PLACEHOLDER;
			}
			if (~this.options.actions.indexOf('password')) {
				this.passwordActionClass = CLASS_ICON + ' ' + CLASS_ICON_PASSWORD;
				this.passwordActionSelector = SELECTOR_ICON_PASSWORD;
			}
		}
		this.init();
	};
	Input.prototype.init = function() {
		this.initAction();
		this.initElementEvent();
	};
	Input.prototype.initAction = function() {
		var self = this;

		var row = self.element.parentNode;
		if (row) {
			if (self.sliderActionClass) {
				self.sliderAction = self.createAction(row, self.sliderActionClass, self.sliderActionSelector);
			} else {
				if (self.searchActionClass) {
					self.searchAction = self.createAction(row, self.searchActionClass, self.searchActionSelector);
					self.searchAction.addEventListener('tap', function(e) {
						$.focus(self.element);
						e.stopPropagation();
					});
				}
				if (self.speechActionClass) {
					self.speechAction = self.createAction(row, self.speechActionClass, self.speechActionSelector);
					self.speechAction.addEventListener('click', $.stopPropagation);
					self.speechAction.addEventListener('tap', function(event) {
						self.speechActionClick(event);
					});
				}
				if (self.clearActionClass) {
					self.clearAction = self.createAction(row, self.clearActionClass, self.clearActionSelector);
					self.clearAction.addEventListener('tap', function(event) {
						self.clearActionClick(event);
					});
				}
				if (self.passwordActionClass) {
					self.passwordAction = self.createAction(row, self.passwordActionClass, self.passwordActionSelector);
					self.passwordAction.addEventListener('tap', function(event) {
						self.passwordActionClick(event);
					});
				}
			}
		}
	};
	Input.prototype.createAction = function(row, actionClass, actionSelector) {
		var action = row.querySelector(actionSelector);
		if (!action) {
			var action = document.createElement('span');
			action.className = actionClass;
			if (actionClass === this.searchActionClass) {
				action.innerHTML = '<span class="' + CLASS_ICON + ' ' + CLASS_ICON_SEARCH + '"></span><span>' + this.element.getAttribute('placeholder') + '</span>';
				this.element.setAttribute('placeholder', '');
				if (this.element.value.trim()) {
					row.classList.add('mui-active');
				}
			}
			row.insertBefore(action, this.element.nextSibling);
		}
		return action;
	};
	Input.prototype.initElementEvent = function() {
		var element = this.element;

		if (this.sliderActionClass) {
			var tooltip = this.sliderAction;
			//TODO resize
			var offsetLeft = element.offsetLeft;
			var width = element.offsetWidth - 28;
			var tooltipWidth = tooltip.offsetWidth;
			var distince = Math.abs(element.max - element.min);

			var timer = null;
			var showTip = function() {
				tooltip.classList.remove(CLASS_HIDDEN);
				tooltipWidth = tooltipWidth || tooltip.offsetWidth;
				var scaleWidth = (width / distince) * Math.abs(element.value - element.min);
				tooltip.style.left = (14 + offsetLeft + scaleWidth - tooltipWidth / 2) + 'px';
				tooltip.innerText = element.value;
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					tooltip.classList.add(CLASS_HIDDEN);
				}, 1000);
			};
			element.addEventListener('input', showTip);
			element.addEventListener('tap', showTip);
			element.addEventListener($.EVENT_MOVE, function(e) {
				e.stopPropagation();
			});
		} else {
			if (this.clearActionClass) {
				var action = this.clearAction;
				if (!action) {
					return;
				}
				$.each(['keyup', 'change', 'input', 'focus', 'cut', 'paste'], function(index, type) {
					(function(type) {
						element.addEventListener(type, function() {
							action.classList[element.value.trim() ? 'remove' : 'add'](CLASS_HIDDEN);
						});
					})(type);
				});
				element.addEventListener('blur', function() {
					action.classList.add(CLASS_HIDDEN);
				});
			}
			if (this.searchActionClass) {
				element.addEventListener('focus', function() {
					element.parentNode.classList.add('mui-active');
				});
				element.addEventListener('blur', function() {
					if (!element.value.trim()) {
						element.parentNode.classList.remove('mui-active');
					}
				});
			}
		}
	};
	Input.prototype.setPlaceholder = function(text) {
		if (this.searchActionClass) {
			var placeholder = this.element.parentNode.querySelector(SELECTOR_PLACEHOLDER);
			placeholder && (placeholder.getElementsByTagName('span')[1].innerText = text);
		} else {
			this.element.setAttribute('placeholder', text);
		}
	};
	Input.prototype.passwordActionClick = function(event) {
		if (this.element.type === 'text') {
			this.element.type = 'password';
		} else {
			this.element.type = 'text';
		}
		this.passwordAction.classList.toggle('mui-active');
		event.preventDefault();
	};
	Input.prototype.clearActionClick = function(event) {
		var self = this;
		self.element.value = '';
		$.focus(self.element);
		self.clearAction.classList.add(CLASS_HIDDEN);
		event.preventDefault();
	};
	Input.prototype.speechActionClick = function(event) {
		if (window.plus) {
			var self = this;
			var oldValue = self.element.value;
			self.element.value = '';
			document.body.classList.add(CLASS_FOCUSIN);
			plus.speech.startRecognize({
				engine: 'iFly'
			}, function(s) {
				self.element.value += s;
				$.focus(self.element);
				plus.speech.stopRecognize();
				$.trigger(self.element, 'recognized', {
					value: self.element.value
				});
				if (oldValue !== self.element.value) {
					$.trigger(self.element, 'change');
					$.trigger(self.element, 'input');
				}
				// document.body.classList.remove(CLASS_FOCUSIN);
			}, function(e) {
				document.body.classList.remove(CLASS_FOCUSIN);
			});
		} else {
			alert('only for 5+');
		}
		event.preventDefault();
	};
	$.fn.input = function(options) {
		var inputApis = [];
		this.each(function() {
			var inputApi = null;
			var actions = [];
			var row = findRow(this.parentNode);
			if (this.type === 'range' && row.classList.contains('mui-input-range')) {
				actions.push('slider');
			} else {
				var classList = this.classList;
				if (classList.contains('mui-input-clear')) {
					actions.push('clear');
				}
				if (classList.contains('mui-input-speech')) {
					actions.push('speech');
				}
				if (classList.contains('mui-input-password')) {
					actions.push('password');
				}
				if (this.type === 'search' && row.classList.contains('mui-search')) {
					actions.push('search');
				}
			}
			var id = this.getAttribute('data-input-' + actions[0]);
			if (!id) {
				id = ++$.uuid;
				inputApi = $.data[id] = new Input(this, {
					actions: actions.join(',')
				});
				for (var i = 0, len = actions.length; i < len; i++) {
					this.setAttribute('data-input-' + actions[i], id);
				}
			} else {
				inputApi = $.data[id];
			}
			inputApis.push(inputApi);
		});
		return inputApis.length === 1 ? inputApis[0] : inputApis;
	};
	$.ready(function() {
		$('.mui-input-row input').input();
	});
})(mui, window, document);
/**
 * 数字输入框
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($) {

	var touchSupport = ('ontouchstart' in document);
	var tapEventName = touchSupport ? 'tap' : 'click';
	var changeEventName = 'change';
	var holderClassName = 'mui-numbox';
	var plusClassSelector = '.mui-btn-numbox-plus,.mui-numbox-btn-plus';
	var minusClassSelector = '.mui-btn-numbox-minus,.mui-numbox-btn-minus';
	var inputClassSelector = '.mui-input-numbox,.mui-numbox-input';

	var Numbox = $.Numbox = $.Class.extend({
		/**
		 * 构造函数
		 **/
		init: function(holder, options) {
			var self = this;
			if (!holder) {
				throw "构造 numbox 时缺少容器元素";
			}
			self.holder = holder;
			options = options || {};
			options.step = parseInt(options.step || 1);
			self.options = options;
			self.input = $.qsa(inputClassSelector, self.holder)[0];
			self.plus = $.qsa(plusClassSelector, self.holder)[0];
			self.minus = $.qsa(minusClassSelector, self.holder)[0];
			self.checkValue();
			self.initEvent();
		},
		/**
		 * 初始化事件绑定
		 **/
		initEvent: function() {
			var self = this;
			self.plus.addEventListener(tapEventName, function(event) {
				var val = parseInt(self.input.value) + self.options.step;
				self.input.value = val.toString();
				$.trigger(self.input, changeEventName, null);
			});
			self.minus.addEventListener(tapEventName, function(event) {
				var val = parseInt(self.input.value) - self.options.step;
				self.input.value = val.toString();
				$.trigger(self.input, changeEventName, null);
			});
			self.input.addEventListener(changeEventName, function(event) {
				self.checkValue();
				var val = parseInt(self.input.value);
				//触发顶层容器
				$.trigger(self.holder, changeEventName, {
					value: val
				});
			});
		},
		/**
		 * 获取当前值
		 **/
		getValue: function() {
			var self = this;
			return parseInt(self.input.value);
		},
		/**
		 * 验证当前值是法合法
		 **/
		checkValue: function() {
			var self = this;
			var val = self.input.value;
			if (val == null || val == '' || isNaN(val)) {
				self.input.value = self.options.min || 0;
				self.minus.disabled = self.options.min != null;
			} else {
				var val = parseInt(val);
				if (self.options.max != null && !isNaN(self.options.max) && val >= parseInt(self.options.max)) {
					val = self.options.max;
					self.plus.disabled = true;
				} else {
					self.plus.disabled = false;
				}
				if (self.options.min != null && !isNaN(self.options.min) && val <= parseInt(self.options.min)) {
					val = self.options.min;
					self.minus.disabled = true;
				} else {
					self.minus.disabled = false;
				}
				self.input.value = val;
			}
		},
		/**
		 * 更新选项
		 **/
		setOption: function(name, value) {
			var self = this;
			self.options[name] = value;
		}
	});

	$.fn.numbox = function(options) {
		var instanceArray = [];
		//遍历选择的元素
		this.each(function(i, element) {
			if (element.numbox) {
				return;
			}
			if (options) {
				element.numbox = new Numbox(element, options);
			} else {
				var optionsText = element.getAttribute('data-numbox-options');
				var options = optionsText ? JSON.parse(optionsText) : {};
				options.step = element.getAttribute('data-numbox-step') || options.step;
				options.min = element.getAttribute('data-numbox-min') || options.min;
				options.max = element.getAttribute('data-numbox-max') || options.max;
				element.numbox = new Numbox(element, options);
			}
		});
		return this[0] ? this[0].numbox : null;
	}

	//自动处理 class='mui-locker' 的 dom
	$.ready(function() {
		$('.' + holderClassName).numbox();
	});

}(mui))

})


;/*!/component_modules/mui.lazyload.img.js*/
define('component_modules/mui.lazyload.img', function(require, exports, module) {

(function($, window, document) {
	var ImageLazyload = $.Lazyload.extend({
		init: function(element, options) {
			this._super(element, options);
		},
		_init: function() {
			this.options.selector = '[data-lazyload]';
			this._super();
		},
		_set: function(element, uri) {
			if (element.tagName === 'IMG') {
				element.src = uri;
			} else {
				element.style.backgroundImage = "url(" + uri + ")";
			}
		},
		_hasPlaceholder: function(element) {
			if (element.offsetWidth) {
				if (element.tagName === 'IMG') {
					return !!element.src;
				} else {
					return !!element.style.backgroundImage;
				}
			}
			return false;
		},
		_addPlaceHolder: function(element) {
			var self = this;
			if (element.tagName === 'IMG') {
				self._counter++;
				element.onload = function() {
					self._counter--;
					self.addCallback(element, self.handle);
					this.onload = null;
				};
				self.onPlaceHolder(function(placeholder) {
					self._set(element, placeholder);
				});
			} else {
				element.style.backgroundImage = "url(" + self.options.placeholder + ")";
			}
		},
		addElement: function(element) {
			var self = this;
			var uri = element.getAttribute('data-lazyload');
			if (uri) {
				if (self._hasPlaceholder(element)) {
					self.addCallback(element, self.handle);
				} else {
					self.onPlaceHolder = self._createLoader(function(callback) {
						var img = new Image();
						var placeholder = self.options.placeholder;
						img.src = placeholder;
						img.onload = img.onerror = function() {
							callback(placeholder);
						};
					});
					//self._addPlaceHolder(element);
				}
				return true;
			}
			return false;
		},
		set: function(element, uri) {
			var self = this;
			var img = new Image();
			img.onload = function() {
				self._set(element, uri);
				$.trigger(self.element, 'success', {
					element: element,
					uri: uri
				});
			};
			img.onerror = function() {
				$.trigger(self.element, 'error', {
					element: element,
					uri: uri
				});
			};
			img.src = uri;
			element.removeAttribute('data-lazyload'); //只尝试一次，后续可能支持多次尝试
		},
		handle: function(element, key) {
			var uri = element.getAttribute('data-lazyload');
			if (uri) {
				this.set(element, uri);
				//element.parentNode.parentNode.setAttribute('data-lazyload', 'true'); //debug
			}
		},
		destroy: function() {
			this._super();
			this.element.removeAttribute('data-imageLazyload');
		}

	});
	$.fn.imageLazyload = function(options) {
		var lazyloadApis = [];
		this.each(function() {
			var self = this;
			var lazyloadApi = null;
			if (self === document || self === window) {
				self = document.body;
			}
			var id = self.getAttribute('data-imageLazyload');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = lazyloadApi = new ImageLazyload(self, options);
				self.setAttribute('data-imageLazyload', id);
			} else {
				lazyloadApi = $.data[id];
			}
			lazyloadApis.push(lazyloadApi);
		});
		return lazyloadApis.length === 1 ? lazyloadApis[0] : lazyloadApis;
	}
})(mui, window, document);

});

;/*!/component_modules/mui.lazyload.js*/
define('component_modules/mui.lazyload', function(require, exports, module) {

(function($, window, document) {
	var mid = 0;
	$.Lazyload = $.Class.extend({
		init: function(element, options) {
			var self = this;
			this.container = this.element = element;
			this.options = $.extend({
				selector: '',
				diff: false,
				force: false,
				autoDestroy: true,
				duration: 100
			}, options);

			this._key = 0;
			this._containerIsNotDocument = this.container.nodeType !== 9;
			this._callbacks = {};

			this._init();
		},
		_init: function() {
			this._initLoadFn();

			this.addElements();

			this._loadFn();

			$.ready(function() {
				this._loadFn();
			}.bind(this));

			this.resume();
		},
		_initLoadFn: function() {
			var self = this;
			self._loadFn = this._buffer(function() { // 加载延迟项
				if (self.options.autoDestroy && self._counter == 0 && $.isEmptyObject(self._callbacks)) {
					self.destroy();
				}
				self._loadItems();
			}, self.options.duration, self);
		},
		/**
		 *根据加载函数实现加载器
		 *@param {Function} load 加载函数
		 *@returns {Function} 加载器
		 */
		_createLoader: function(load) {
			var value, loading, handles = [],
				h;
			return function(handle) {
				if (!loading) {
					loading = true;
					load(function(v) {
						value = v;
						while (h = handles.shift()) {
							try {
								h && h.apply(null, [value]);
							} catch (e) {
								setTimeout(function() {
									throw e;
								}, 0)
							}
						}
					})
				}
				if (value) {
					handle && handle.apply(null, [value]);
					return value;
				}
				handle && handles.push(handle);
				return value;
			}
		},
		_buffer: function(fn, ms, context) {
			var timer;
			var lastStart = 0;
			var lastEnd = 0;
			var ms = ms || 150;

			function run() {
				if (timer) {
					timer.cancel();
					timer = 0;
				}
				lastStart = $.now();
				fn.apply(context || this, arguments);
				lastEnd = $.now();
			}

			return $.extend(function() {
				if (
					(!lastStart) || // 从未运行过
					(lastEnd >= lastStart && $.now() - lastEnd > ms) || // 上次运行成功后已经超过ms毫秒
					(lastEnd < lastStart && $.now() - lastStart > ms * 8) // 上次运行或未完成，后8*ms毫秒
				) {
					run();
				} else {
					if (timer) {
						timer.cancel();
					}
					timer = $.later(run, ms, null, arguments);
				}
			}, {
				stop: function() {
					if (timer) {
						timer.cancel();
						timer = 0;
					}
				}
			});
		},
		_getBoundingRect: function(c) {
			var vh, vw, left, top;

			if (c !== undefined) {
				vh = c.offsetHeight;
				vw = c.offsetWidth;
				var offset = $.offset(c);
				left = offset.left;
				top = offset.top;
			} else {
				vh = window.innerHeight;
				vw = window.innerWidth;
				left = 0;
				top = window.pageYOffset;
			}

			var diff = this.options.diff;

			var diffX = diff === false ? vw : diff;
			var diffX0 = 0;
			var diffX1 = diffX;

			var diffY = diff === false ? vh : diff;
			var diffY0 = 0;
			var diffY1 = diffY;

			var right = left + vw;
			var bottom = top + vh;


			left -= diffX0;
			right += diffX1;
			top -= diffY0;
			bottom += diffY1;
			return {
				left: left,
				top: top,
				right: right,
				bottom: bottom
			};
		},
		_cacheWidth: function(el) {
			if (el._mui_lazy_width) {
				return el._mui_lazy_width;
			}
			return el._mui_lazy_width = el.offsetWidth;
		},
		_cacheHeight: function(el) {
			if (el._mui_lazy_height) {
				return el._mui_lazy_height;
			}
			return el._mui_lazy_height = el.offsetHeight;
		},
		_isCross: function(r1, r2) {
			var r = {};
			r.top = Math.max(r1.top, r2.top);
			r.bottom = Math.min(r1.bottom, r2.bottom);
			r.left = Math.max(r1.left, r2.left);
			r.right = Math.min(r1.right, r2.right);
			return r.bottom >= r.top && r.right >= r.left;
		},
		_elementInViewport: function(elem, windowRegion, containerRegion) {
			// display none or inside display none
			if (!elem.offsetWidth) {
				return false;
			}
			var elemOffset = $.offset(elem);
			var inContainer = true;
			var inWin;
			var left = elemOffset.left;
			var top = elemOffset.top;
			var elemRegion = {
				left: left,
				top: top,
				right: left + this._cacheWidth(elem),
				bottom: top + this._cacheHeight(elem)
			};

			inWin = this._isCross(windowRegion, elemRegion);

			if (inWin && containerRegion) {
				inContainer = this._isCross(containerRegion, elemRegion);
			}
			// 确保在容器内出现
			// 并且在视窗内也出现
			return inContainer && inWin;
		},
		_loadItems: function() {
			var self = this;
			// container is display none
			if (self._containerIsNotDocument && !self.container.offsetWidth) {
				return;
			}
			self._windowRegion = self._getBoundingRect();

			if (self._containerIsNotDocument) {
				self._containerRegion = self._getBoundingRect(this.container);
			}
			$.each(self._callbacks, function(key, callback) {
				callback && self._loadItem(key, callback);
			});
		},
		_loadItem: function(key, callback) {
			var self = this;
			callback = callback || self._callbacks[key];
			if (!callback) {
				return true;
			}
			var el = callback.el;
			var remove = false;
			var fn = callback.fn;
			if (self.options.force || self._elementInViewport(el, self._windowRegion, self._containerRegion)) {
				try {
					remove = fn.call(self, el, key);
				} catch (e) {
					setTimeout(function() {
						throw e;
					}, 0);
				}
			}
			if (remove !== false) {
				delete self._callbacks[key];
			}
			return remove;
		},
		addCallback: function(el, fn) {
			var self = this;
			var callbacks = self._callbacks;
			var callback = {
				el: el,
				fn: fn || $.noop
			};
			var key = ++this._key;
			callbacks[key] = callback;

			// add 立即检测，防止首屏元素问题
			if (self._windowRegion) {
				self._loadItem(key, callback);
			} else {
				self.refresh();
			}
		},
		addElements: function(elements) {
			var self = this;
			self._counter = self._counter || 0;
			var lazyloads = [];
			if (!elements && self.options.selector) {
				lazyloads = self.container.querySelectorAll(self.options.selector);
			} else {
				$.each(elements, function(index, el) {
					lazyloads = lazyloads.concat($.qsa(self.options.selector, el));
				});
			}
			$.each(lazyloads, function(index, el) {
				if (!el.getAttribute('data-lazyload-id')) {
					if (self.addElement(el)) {
						el.setAttribute('data-lazyload-id', mid++);
						self.addCallback(el, self.handle);
					}
				}
			});
		},
		addElement: function(el) {
			return true;
		},
		handle: function() {
			//throw new Error('需子类实现');
		},
		refresh: function(check) {
			if (check) { //检查新的lazyload
				this.addElements();
			}
			this._loadFn();
		},
		pause: function() {
			var load = this._loadFn;
			if (this._destroyed) {
				return;
			}
			window.removeEventListener('scroll', load);
			window.removeEventListener('touchmove', load);
			window.removeEventListener('resize', load);
			if (this._containerIsNotDocument) {
				this.container.removeEventListener('scrollend', load);
				this.container.removeEventListener('scroll', load);
				this.container.removeEventListener('touchmove', load);
			}
		},
		resume: function() {
			var load = this._loadFn;
			if (this._destroyed) {
				return;
			}
			window.addEventListener('scroll', load, false);
			window.addEventListener('touchmove', load, false);
			window.addEventListener('resize', load, false);
			if (this._containerIsNotDocument) {
				this.container.addEventListener('scrollend', load, false);
				this.container.addEventListener('scroll', load, false);
				this.container.addEventListener('touchmove', load, false);
			}
		},
		destroy: function() {
			var self = this;
			self.pause();
			self._callbacks = {};
			$.trigger(this.container, 'destory', self);
			self._destroyed = 1;
		}
	});
})(mui, window, document);

});

;/*!/component_modules/mui.previewimage.js*/
define('component_modules/mui.previewimage', function(require, exports, module) {



(function($, window) {

	var template = '<div id="{{id}}" class="mui-slider mui-preview-image mui-fullscreen"><div class="mui-preview-header">{{header}}</div><div class="mui-slider-group"></div><div class="mui-preview-footer mui-hidden">{{footer}}</div><div class="mui-preview-loading"><span class="mui-spinner mui-spinner-white"></span></div></div>';
	var itemTemplate = '<div class="mui-slider-item mui-zoom-wrapper {{className}}"><div class="mui-zoom-scroller"><img src="{{src}}" data-preview-lazyload="{{lazyload}}" style="{{style}}" class="mui-zoom"></div></div>';
	var defaultGroupName = '__DEFAULT';
	var div = document.createElement('div');
	var imgId = 0;
	var PreviewImage = function(options) {
		this.options = $.extend(true, {
			id: '__MUI_PREVIEWIMAGE',
			zoom: true,
			header: '<span class="mui-preview-indicator"></span>',
			footer: ''
		}, options || {});
		this.init();
		this.initEvent();
	};
	var proto = PreviewImage.prototype;
	proto.init = function() {
		var options = this.options;
		var el = document.getElementById(this.options.id);
		if (!el) {
			div.innerHTML = template.replace(/\{\{id\}\}/g, this.options.id).replace('{{header}}', options.header).replace('{{footer}}', options.footer);
			document.body.appendChild(div.firstElementChild);
			el = document.getElementById(this.options.id);
		}

		this.element = el;
		this.scroller = this.element.querySelector($.classSelector('.slider-group'));
		this.indicator = this.element.querySelector($.classSelector('.preview-indicator'));
		this.loader = this.element.querySelector($.classSelector('.preview-loading'));
		if (options.footer) {
			this.element.querySelector($.classSelector('.preview-footer')).classList.remove($.className('hidden'));
		}
		this.addImages();
	};
	proto.initEvent = function() {
		var self = this;
		$(document.body).on('tap', 'img[data-preview-src]', function() {
			if (self.isAnimationing()) {
				return false;
			}
			self.open(this);
			return false;
		});
		var laterClose = null;
		var laterCloseEvent = function() {
			!laterClose && (laterClose = $.later(function() {
				self.isInAnimation = true;
				self.loader.removeEventListener('tap', laterCloseEvent);
				self.scroller.removeEventListener('tap', laterCloseEvent);
				self.close();
			}, 300));
		};
		this.scroller.addEventListener('doubletap', function() {
			if (laterClose) {
				laterClose.cancel();
				laterClose = null;
			}
		});
		this.element.addEventListener('webkitAnimationEnd', function() {
			if (self.element.classList.contains($.className('preview-out'))) { //close
				self.element.style.display = 'none';
				self.element.classList.remove($.className('preview-out'));
				laterClose = null;
			} else { //open
				self.loader.addEventListener('tap', laterCloseEvent);
				self.scroller.addEventListener('tap', laterCloseEvent);
			}
			self.isInAnimation = false;
		});
		this.element.addEventListener('slide', function(e) {
			if (self.options.zoom) {
				var lastZoomerEl = self.element.querySelector('.mui-zoom-wrapper:nth-child(' + (self.lastIndex + 1) + ')');
				if (lastZoomerEl) {
					$(lastZoomerEl).zoom().setZoom(1);
				}
			}
			var slideNumber = e.detail.slideNumber;
			self.lastIndex = slideNumber;
			self.indicator && (self.indicator.innerText = (slideNumber + 1) + '/' + self.currentGroup.length);
			self._loadItem(slideNumber);

		});
	};
	proto.isAnimationing = function() {
		if (this.isInAnimation) {
			return true;
		}
		this.isInAnimation = true;
		return false;
	};
	proto.addImages = function(group, index) {
		this.groups = {};
		var imgs = [];
		if (group) {
			if (group === defaultGroupName) {
				imgs = document.querySelectorAll("img[data-preview-src]:not([data-preview-group])");
			} else {
				imgs = document.querySelectorAll("img[data-preview-src][data-preview-group='" + group + "']");
			}
		} else {
			imgs = document.querySelectorAll("img[data-preview-src]");
		}
		if (imgs.length) {
			for (var i = 0, len = imgs.length; i < len; i++) {
				this.addImage(imgs[i]);
			}
		}
	};
	proto.addImage = function(img) {
		var group = img.getAttribute('data-preview-group');
		group = group || defaultGroupName;
		if (!this.groups[group]) {
			this.groups[group] = [];
		}
		var src = img.getAttribute('src');
		if (img.__mui_img_data && img.__mui_img_data.src === src) { //已缓存且图片未变化
			this.groups[group].push(img.__mui_img_data);
		} else {
			var lazyload = img.getAttribute('data-preview-src');
			if (!lazyload) {
				lazyload = src;
			}
			var imgObj = {
				src: src,
				lazyload: src === lazyload ? '' : lazyload,
				loaded: src === lazyload ? true : false,
				sWidth: 0,
				sHeight: 0,
				sTop: 0,
				sLeft: 0,
				sScale: 1,
				el: img
			};
			this.groups[group].push(imgObj);
			img.__mui_img_data = imgObj;
		}
	};


	proto.empty = function() {
		this.scroller.innerHTML = '';
	};
	proto._initImgData = function(itemData, imgEl) {
		if (!itemData.sWidth) {
			var img = itemData.el;
			itemData.sWidth = img.offsetWidth;
			itemData.sHeight = img.offsetHeight;
			var offset = $.offset(img);
			itemData.sTop = offset.top;
			itemData.sLeft = offset.left;
			itemData.sScale = Math.max(itemData.sWidth / window.innerWidth, itemData.sHeight / window.innerHeight);
		}
		imgEl.style.webkitTransform = 'translate3d(0,0,0) scale(' + itemData.sScale + ')';
	};

	proto._getScale = function(from, to) {
		var scaleX = from.width / to.width;
		var scaleY = from.height / to.height;
		var scale = 1;
		if (scaleX <= scaleY) {
			scale = from.height / (to.height * scaleX);
		} else {
			scale = from.width / (to.width * scaleY);
		}
		return scale;
	};
	proto._imgTransitionEnd = function(e) {
		var img = e.target;
		img.classList.remove($.className('transitioning'));
		img.removeEventListener('webkitTransitionEnd', this._imgTransitionEnd.bind(this));
	};
	proto._loadItem = function(index, isOpening) { //TODO 暂时仅支持img
		var itemEl = this.scroller.querySelector($.classSelector('.slider-item:nth-child(' + (index + 1) + ')'));
		var itemData = this.currentGroup[index];
		var imgEl = itemEl.querySelector('img');
		this._initImgData(itemData, imgEl);
		if (isOpening) {
			var posi = this._getPosition(itemData);
			imgEl.style.webkitTransitionDuration = '0ms';
			imgEl.style.webkitTransform = 'translate3d(' + posi.x + 'px,' + posi.y + 'px,0) scale(' + itemData.sScale + ')';
			imgEl.offsetHeight;
		}
		if (!itemData.loaded && imgEl.getAttribute('data-preview-lazyload')) {
			var self = this;
			self.loader.classList.add($.className('active'));
			//移动位置动画
			imgEl.style.webkitTransitionDuration = '0.5s';
			imgEl.addEventListener('webkitTransitionEnd', self._imgTransitionEnd.bind(self));
			imgEl.style.webkitTransform = 'translate3d(0,0,0) scale(' + itemData.sScale + ')';
			this.loadImage(imgEl, function() {
				itemData.loaded = true;
				imgEl.src = itemData.lazyload;
				self._initZoom(itemEl, this.width, this.height);
				imgEl.classList.add($.className('transitioning'));
				imgEl.addEventListener('webkitTransitionEnd', self._imgTransitionEnd.bind(self));
				imgEl.setAttribute('style', '');
				imgEl.offsetHeight;
				self.loader.classList.remove($.className('active'));
			});
		} else {
			itemData.lazyload && (imgEl.src = itemData.lazyload);
			this._initZoom(itemEl, imgEl.width, imgEl.height);
			imgEl.classList.add($.className('transitioning'));
			imgEl.addEventListener('webkitTransitionEnd', this._imgTransitionEnd.bind(this));
			imgEl.setAttribute('style', '');
			imgEl.offsetHeight;
		}
		this._preloadItem(index + 1);
		this._preloadItem(index - 1);
	};
	proto._preloadItem = function(index) {
		var itemEl = this.scroller.querySelector($.classSelector('.slider-item:nth-child(' + (index + 1) + ')'));
		if (itemEl) {
			var itemData = this.currentGroup[index];
			if (!itemData.sWidth) {
				var imgEl = itemEl.querySelector('img');
				this._initImgData(itemData, imgEl);
			}
		}
	};
	proto._initZoom = function(zoomWrapperEl, zoomerWidth, zoomerHeight) {
		if (!this.options.zoom) {
			return;
		}
		if (zoomWrapperEl.getAttribute('data-zoomer')) {
			return;
		}
		var zoomEl = zoomWrapperEl.querySelector($.classSelector('.zoom'));
		if (zoomEl.tagName === 'IMG') {
			var self = this;
			var maxZoom = self._getScale({
				width: zoomWrapperEl.offsetWidth,
				height: zoomWrapperEl.offsetHeight
			}, {
				width: zoomerWidth,
				height: zoomerHeight
			});
			$(zoomWrapperEl).zoom({
				maxZoom: Math.max(maxZoom, 1)
			});
		} else {
			$(zoomWrapperEl).zoom();
		}
	};
	proto.loadImage = function(imgEl, callback) {
		var onReady = function() {
			callback && callback.call(this);
		};
		var img = new Image();
		img.onload = onReady;
		img.onerror = onReady;
		img.src = imgEl.getAttribute('data-preview-lazyload');
	};
	proto.getRangeByIndex = function(index, length) {
		return {
			from: 0,
			to: length - 1
		};
		//		var from = Math.max(index - 1, 0);
		//		var to = Math.min(index + 1, length);
		//		if (index === length - 1) {
		//			from = Math.max(length - 3, 0);
		//			to = length - 1;
		//		}
		//		if (index === 0) {
		//			from = 0;
		//			to = Math.min(2, length - 1);
		//		}
		//		return {
		//			from: from,
		//			to: to
		//		};
	};

	proto._getPosition = function(itemData) {
		var sLeft = itemData.sLeft - window.pageXOffset;
		var sTop = itemData.sTop - window.pageYOffset;
		var left = (window.innerWidth - itemData.sWidth) / 2;
		var top = (window.innerHeight - itemData.sHeight) / 2;
		return {
			left: sLeft,
			top: sTop,
			x: sLeft - left,
			y: sTop - top
		};
	};
	proto.refresh = function(index, groupArray) {
		this.currentGroup = groupArray;
		//重新生成slider
		var length = groupArray.length;
		var itemHtml = [];
		var currentRange = this.getRangeByIndex(index, length);
		var from = currentRange.from;
		var to = currentRange.to + 1;
		var currentIndex = index;
		var className = '';
		var itemStr = '';
		var wWidth = window.innerWidth;
		var wHeight = window.innerHeight;
		for (var i = 0; from < to; from++, i++) {
			var itemData = groupArray[from];
			var style = '';
			if (itemData.sWidth) {
				style = '-webkit-transform:translate3d(0,0,0) scale(' + itemData.sScale + ');transform:translate3d(0,0,0) scale(' + itemData.sScale + ')';
			}
			itemStr = itemTemplate.replace('{{src}}', itemData.src).replace('{{lazyload}}', itemData.lazyload).replace('{{style}}', style);
			if (from === index) {
				currentIndex = i;
				className = $.className('active');
			} else {
				className = '';
			}
			itemHtml.push(itemStr.replace('{{className}}', className));
		}
		this.scroller.innerHTML = itemHtml.join('');
		this.element.style.display = 'block';
		this.element.classList.add($.className('preview-in'));
		this.lastIndex = currentIndex;
		this.element.offsetHeight;
		$(this.element).slider().gotoItem(currentIndex, 0);
		this.indicator && (this.indicator.innerText = (currentIndex + 1) + '/' + this.currentGroup.length);
		this._loadItem(currentIndex, true);
	};
	proto.openByGroup = function(index, group) {
		index = Math.min(Math.max(0, index), this.groups[group].length - 1);
		this.refresh(index, this.groups[group]);
	};
	proto.open = function(index, group) {
		if (this.element.classList.contains($.className('preview-in'))) {
			return;
		}
		if (typeof index === "number") {
			group = group || defaultGroupName;
			this.addImages(group, index); //刷新当前group
			this.openByGroup(index, group);
		} else {
			group = index.getAttribute('data-preview-group');
			group = group || defaultGroupName;
			this.addImages(group, index); //刷新当前group
			this.openByGroup(this.groups[group].indexOf(index.__mui_img_data), group);
		}
	};
	proto.close = function(index, group) {
		this.element.classList.remove($.className('preview-in'));
		this.element.classList.add($.className('preview-out'));
		var itemEl = this.scroller.querySelector($.classSelector('.slider-item:nth-child(' + (this.lastIndex + 1) + ')'));
		var imgEl = itemEl.querySelector('img');
		if (imgEl) {
			imgEl.classList.add($.className('transitioning'));
			var itemData = this.currentGroup[this.lastIndex];
			var posi = this._getPosition(itemData);
			var sLeft = posi.left;
			var sTop = posi.top;
			if (sTop > window.innerHeight || sLeft > window.innerWidth || sTop < 0 || sLeft < 0) { //out viewport
				imgEl.style.opacity = 0;
				imgEl.style.webkitTransitionDuration = '0.5s';
				imgEl.style.webkitTransform = 'scale(' + itemData.sScale + ')';
			} else {
				if (this.options.zoom) {
					$(imgEl.parentNode.parentNode).zoom().toggleZoom(0);
				}
				imgEl.style.webkitTransitionDuration = '0.5s';
				imgEl.style.webkitTransform = 'translate3d(' + posi.x + 'px,' + posi.y + 'px,0) scale(' + itemData.sScale + ')';
			}
		}
		var zoomers = this.element.querySelectorAll($.classSelector('.zoom-wrapper'));
		for (var i = 0, len = zoomers.length; i < len; i++) {
			$(zoomers[i]).zoom().destory();
		}
		//		$(this.element).slider().destory();
		//		this.empty();
	};
	proto.isShown = function() {
		return this.element.classList.contains($.className('preview-in'));
	};

	var previewImageApi = null;
	$.previewImage = function(options) {
		if (!previewImageApi) {
			previewImageApi = new PreviewImage(options);
		}
		return previewImageApi;
	};
	$.getPreviewImage = function() {
		return previewImageApi;
	}

})(mui, window);

});

;/*!/component_modules/mui.zoom.js*/
define('component_modules/mui.zoom', function(require, exports, module) {

(function($, window) {
	var CLASS_ZOOM = $.className('zoom');
	var CLASS_ZOOM_SCROLLER = $.className('zoom-scroller');

	var SELECTOR_ZOOM = '.' + CLASS_ZOOM;
	var SELECTOR_ZOOM_SCROLLER = '.' + CLASS_ZOOM_SCROLLER;

	var EVENT_PINCH_START = 'pinchstart';
	var EVENT_PINCH = 'pinch';
	var EVENT_PINCH_END = 'pinchend';
	if ('ongesturestart' in window) {
		EVENT_PINCH_START = 'gesturestart';
		EVENT_PINCH = 'gesturechange';
		EVENT_PINCH_END = 'gestureend';
	}
	$.Zoom = function(element, options) {
		var zoom = this;

		zoom.options = $.extend($.Zoom.defaults, options);

		zoom.wrapper = zoom.element = element;
		zoom.scroller = element.querySelector(SELECTOR_ZOOM_SCROLLER);
		zoom.scrollerStyle = zoom.scroller && zoom.scroller.style;

		zoom.zoomer = element.querySelector(SELECTOR_ZOOM);
		zoom.zoomerStyle = zoom.zoomer && zoom.zoomer.style;

		zoom.init = function() {
			//自动启用
			$.options.gestureConfig.pinch = true;
			$.options.gestureConfig.doubletap = true;
			zoom.initEvents();
		};

		zoom.initEvents = function(detach) {
			var action = detach ? 'removeEventListener' : 'addEventListener';
			var target = zoom.scroller;

			target[action](EVENT_PINCH_START, zoom.onPinchstart);
			target[action](EVENT_PINCH, zoom.onPinch);
			target[action](EVENT_PINCH_END, zoom.onPinchend);

			target[action]('touchstart', zoom.onTouchstart);
			target[action]('touchmove', zoom.onTouchMove);
			target[action]('touchcancel', zoom.onTouchEnd);
			target[action]('touchend', zoom.onTouchEnd);

			target[action]('drag', function(e) {
				if (imageIsMoved || isGesturing) {
					e.stopPropagation();
				}
			});
			target[action]('doubletap', function(e) {
				zoom.toggleZoom(e.detail.center);
			});
		};
		zoom.transition = function(style, time) {
			time = time || 0;
			style['webkitTransitionDuration'] = time + 'ms';
			return zoom;
		};
		zoom.translate = function(style, x, y) {
			x = x || 0;
			y = y || 0;
			style['webkitTransform'] = 'translate3d(' + x + 'px,' + y + 'px,0px)';
			return zoom;
		};
		zoom.scale = function(style, scale) {
			scale = scale || 1;
			style['webkitTransform'] = 'translate3d(0,0,0) scale(' + scale + ')';
			return zoom;
		};
		zoom.scrollerTransition = function(time) {
			return zoom.transition(zoom.scrollerStyle, time);
		};
		zoom.scrollerTransform = function(x, y) {
			return zoom.translate(zoom.scrollerStyle, x, y);
		};
		zoom.zoomerTransition = function(time) {
			return zoom.transition(zoom.zoomerStyle, time);
		};
		zoom.zoomerTransform = function(scale) {
			return zoom.scale(zoom.zoomerStyle, scale);
		};

		// Gestures
		var scale = 1,
			currentScale = 1,
			isScaling = false,
			isGesturing = false;
		zoom.onPinchstart = function(e) {
			isGesturing = true;
		};
		zoom.onPinch = function(e) {
			if (!isScaling) {
				zoom.zoomerTransition(0);
				isScaling = true;
			}
			scale = (e.detail ? e.detail.scale : e.scale) * currentScale;
			if (scale > zoom.options.maxZoom) {
				scale = zoom.options.maxZoom - 1 + Math.pow((scale - zoom.options.maxZoom + 1), 0.5);
			}
			if (scale < zoom.options.minZoom) {
				scale = zoom.options.minZoom + 1 - Math.pow((zoom.options.minZoom - scale + 1), 0.5);
			}
			zoom.zoomerTransform(scale);
		};
		zoom.onPinchend = function(e) {
			scale = Math.max(Math.min(scale, zoom.options.maxZoom), zoom.options.minZoom);
			zoom.zoomerTransition(zoom.options.speed).zoomerTransform(scale);
			currentScale = scale;
			isScaling = false;
		};
		zoom.setZoom = function(newScale) {
			scale = currentScale = newScale;
			zoom.scrollerTransition(zoom.options.speed).scrollerTransform(0, 0);
			zoom.zoomerTransition(zoom.options.speed).zoomerTransform(scale);
		};
		zoom.toggleZoom = function(position, speed) {
			if (typeof position === 'number') {
				speed = position;
				position = undefined;
			}
			speed = typeof speed === 'undefined' ? zoom.options.speed : speed;
			if (scale && scale !== 1) {
				scale = currentScale = 1;
				zoom.scrollerTransition(speed).scrollerTransform(0, 0);
			} else {
				scale = currentScale = zoom.options.maxZoom;
				if (position) {
					var offset = $.offset(zoom.zoomer);
					var top = offset.top;
					var left = offset.left;
					var offsetX = (position.x - left) * scale;
					var offsetY = (position.y - top) * scale;
					this._cal();
					if (offsetX >= imageMaxX && offsetX <= (imageMaxX + wrapperWidth)) { //center
						offsetX = imageMaxX - offsetX + wrapperWidth / 2;
					} else if (offsetX < imageMaxX) { //left
						offsetX = imageMaxX - offsetX + wrapperWidth / 2;
					} else if (offsetX > (imageMaxX + wrapperWidth)) { //right
						offsetX = imageMaxX + wrapperWidth - offsetX - wrapperWidth / 2;
					}
					if (offsetY >= imageMaxY && offsetY <= (imageMaxY + wrapperHeight)) { //middle
						offsetY = imageMaxY - offsetY + wrapperHeight / 2;
					} else if (offsetY < imageMaxY) { //top
						offsetY = imageMaxY - offsetY + wrapperHeight / 2;
					} else if (offsetY > (imageMaxY + wrapperHeight)) { //bottom
						offsetY = imageMaxY + wrapperHeight - offsetY - wrapperHeight / 2;
					}
					offsetX = Math.min(Math.max(offsetX, imageMinX), imageMaxX);
					offsetY = Math.min(Math.max(offsetY, imageMinY), imageMaxY);
					zoom.scrollerTransition(speed).scrollerTransform(offsetX, offsetY);
				} else {
					zoom.scrollerTransition(speed).scrollerTransform(0, 0);
				}
			}
			zoom.zoomerTransition(speed).zoomerTransform(scale);
		};

		zoom._cal = function() {
			wrapperWidth = zoom.wrapper.offsetWidth;
			wrapperHeight = zoom.wrapper.offsetHeight;
			imageWidth = zoom.zoomer.offsetWidth;
			imageHeight = zoom.zoomer.offsetHeight;
			var scaledWidth = imageWidth * scale;
			var scaledHeight = imageHeight * scale;
			imageMinX = Math.min((wrapperWidth / 2 - scaledWidth / 2), 0);
			imageMaxX = -imageMinX;
			imageMinY = Math.min((wrapperHeight / 2 - scaledHeight / 2), 0);
			imageMaxY = -imageMinY;
		};

		var wrapperWidth, wrapperHeight, imageIsTouched, imageIsMoved, imageCurrentX, imageCurrentY, imageMinX, imageMinY, imageMaxX, imageMaxY, imageWidth, imageHeight, imageTouchesStart = {},
			imageTouchesCurrent = {},
			imageStartX, imageStartY, velocityPrevPositionX, velocityPrevTime, velocityX, velocityPrevPositionY, velocityY;

		zoom.onTouchstart = function(e) {
			e.preventDefault();
			imageIsTouched = true;
			imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
			imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
		};
		zoom.onTouchMove = function(e) {
			e.preventDefault();
			if (!imageIsTouched) return;
			if (!imageIsMoved) {
				wrapperWidth = zoom.wrapper.offsetWidth;
				wrapperHeight = zoom.wrapper.offsetHeight;
				imageWidth = zoom.zoomer.offsetWidth;
				imageHeight = zoom.zoomer.offsetHeight;
				var translate = $.parseTranslateMatrix($.getStyles(zoom.scroller, 'webkitTransform'));
				imageStartX = translate.x || 0;
				imageStartY = translate.y || 0;
				zoom.scrollerTransition(0);
			}
			var scaledWidth = imageWidth * scale;
			var scaledHeight = imageHeight * scale;

			if (scaledWidth < wrapperWidth && scaledHeight < wrapperHeight) return;

			imageMinX = Math.min((wrapperWidth / 2 - scaledWidth / 2), 0);
			imageMaxX = -imageMinX;
			imageMinY = Math.min((wrapperHeight / 2 - scaledHeight / 2), 0);
			imageMaxY = -imageMinY;

			imageTouchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
			imageTouchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

			if (!imageIsMoved && !isScaling) {
				//				if (Math.abs(imageTouchesCurrent.y - imageTouchesStart.y) < Math.abs(imageTouchesCurrent.x - imageTouchesStart.x)) {
				//TODO 此处需要优化，当遇到长图，需要上下滚动时，下列判断会导致滚动不流畅
				if (
					(Math.floor(imageMinX) === Math.floor(imageStartX) && imageTouchesCurrent.x < imageTouchesStart.x) ||
					(Math.floor(imageMaxX) === Math.floor(imageStartX) && imageTouchesCurrent.x > imageTouchesStart.x)
				) {
					imageIsTouched = false;
					return;
				}
				//				}
			}
			imageIsMoved = true;
			imageCurrentX = imageTouchesCurrent.x - imageTouchesStart.x + imageStartX;
			imageCurrentY = imageTouchesCurrent.y - imageTouchesStart.y + imageStartY;

			if (imageCurrentX < imageMinX) {
				imageCurrentX = imageMinX + 1 - Math.pow((imageMinX - imageCurrentX + 1), 0.8);
			}
			if (imageCurrentX > imageMaxX) {
				imageCurrentX = imageMaxX - 1 + Math.pow((imageCurrentX - imageMaxX + 1), 0.8);
			}

			if (imageCurrentY < imageMinY) {
				imageCurrentY = imageMinY + 1 - Math.pow((imageMinY - imageCurrentY + 1), 0.8);
			}
			if (imageCurrentY > imageMaxY) {
				imageCurrentY = imageMaxY - 1 + Math.pow((imageCurrentY - imageMaxY + 1), 0.8);
			}

			//Velocity
			if (!velocityPrevPositionX) velocityPrevPositionX = imageTouchesCurrent.x;
			if (!velocityPrevPositionY) velocityPrevPositionY = imageTouchesCurrent.y;
			if (!velocityPrevTime) velocityPrevTime = $.now();
			velocityX = (imageTouchesCurrent.x - velocityPrevPositionX) / ($.now() - velocityPrevTime) / 2;
			velocityY = (imageTouchesCurrent.y - velocityPrevPositionY) / ($.now() - velocityPrevTime) / 2;
			if (Math.abs(imageTouchesCurrent.x - velocityPrevPositionX) < 2) velocityX = 0;
			if (Math.abs(imageTouchesCurrent.y - velocityPrevPositionY) < 2) velocityY = 0;
			velocityPrevPositionX = imageTouchesCurrent.x;
			velocityPrevPositionY = imageTouchesCurrent.y;
			velocityPrevTime = $.now();

			zoom.scrollerTransform(imageCurrentX, imageCurrentY);
		};
		zoom.onTouchEnd = function(e) {
			if (!e.touches.length) {
				isGesturing = false;
			}
			if (!imageIsTouched || !imageIsMoved) {
				imageIsTouched = false;
				imageIsMoved = false;
				return;
			}
			imageIsTouched = false;
			imageIsMoved = false;
			var momentumDurationX = 300;
			var momentumDurationY = 300;
			var momentumDistanceX = velocityX * momentumDurationX;
			var newPositionX = imageCurrentX + momentumDistanceX;
			var momentumDistanceY = velocityY * momentumDurationY;
			var newPositionY = imageCurrentY + momentumDistanceY;

			if (velocityX !== 0) momentumDurationX = Math.abs((newPositionX - imageCurrentX) / velocityX);
			if (velocityY !== 0) momentumDurationY = Math.abs((newPositionY - imageCurrentY) / velocityY);
			var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

			imageCurrentX = newPositionX;
			imageCurrentY = newPositionY;

			var scaledWidth = imageWidth * scale;
			var scaledHeight = imageHeight * scale;
			imageMinX = Math.min((wrapperWidth / 2 - scaledWidth / 2), 0);
			imageMaxX = -imageMinX;
			imageMinY = Math.min((wrapperHeight / 2 - scaledHeight / 2), 0);
			imageMaxY = -imageMinY;
			imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
			imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);

			zoom.scrollerTransition(momentumDuration).scrollerTransform(imageCurrentX, imageCurrentY);
		};
		zoom.destory = function() {
			zoom.initEvents(true); //detach
			delete $.data[zoom.wrapper.getAttribute('data-zoomer')];
			zoom.wrapper.setAttribute('data-zoomer', '');
		}
		zoom.init();
		return zoom;
	};
	$.Zoom.defaults = {
		speed: 300,
		maxZoom: 3,
		minZoom: 1,
	};
	$.fn.zoom = function(options) {
		var zoomApis = [];
		this.each(function() {
			var zoomApi = null;
			var self = this;
			var id = self.getAttribute('data-zoomer');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = zoomApi = new $.Zoom(self, options);
				self.setAttribute('data-zoomer', id);
			} else {
				zoomApi = $.data[id];
			}
			zoomApis.push(zoomApi);
		});
		return zoomApis.length === 1 ? zoomApis[0] : zoomApis;
	};
})(mui, window);

});

;/*!/component_modules/vue-router.js*/
define('component_modules/vue-router', function(require, exports, module) {

/*!
 * vue-router v0.7.11
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  module.exports = factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  function Target(path, matcher, delegate) {
    this.path = path;
    this.matcher = matcher;
    this.delegate = delegate;
  }

  Target.prototype = {
    to: function to(target, callback) {
      var delegate = this.delegate;

      if (delegate && delegate.willAddRoute) {
        target = delegate.willAddRoute(this.matcher.target, target);
      }

      this.matcher.add(this.path, target);

      if (callback) {
        if (callback.length === 0) {
          throw new Error("You must have an argument in the function passed to `to`");
        }
        this.matcher.addChild(this.path, target, callback, this.delegate);
      }
      return this;
    }
  };

  function Matcher(target) {
    this.routes = {};
    this.children = {};
    this.target = target;
  }

  Matcher.prototype = {
    add: function add(path, handler) {
      this.routes[path] = handler;
    },

    addChild: function addChild(path, target, callback, delegate) {
      var matcher = new Matcher(target);
      this.children[path] = matcher;

      var match = generateMatch(path, matcher, delegate);

      if (delegate && delegate.contextEntered) {
        delegate.contextEntered(target, match);
      }

      callback(match);
    }
  };

  function generateMatch(startingPath, matcher, delegate) {
    return function (path, nestedCallback) {
      var fullPath = startingPath + path;

      if (nestedCallback) {
        nestedCallback(generateMatch(fullPath, matcher, delegate));
      } else {
        return new Target(startingPath + path, matcher, delegate);
      }
    };
  }

  function addRoute(routeArray, path, handler) {
    var len = 0;
    for (var i = 0, l = routeArray.length; i < l; i++) {
      len += routeArray[i].path.length;
    }

    path = path.substr(len);
    var route = { path: path, handler: handler };
    routeArray.push(route);
  }

  function eachRoute(baseRoute, matcher, callback, binding) {
    var routes = matcher.routes;

    for (var path in routes) {
      if (routes.hasOwnProperty(path)) {
        var routeArray = baseRoute.slice();
        addRoute(routeArray, path, routes[path]);

        if (matcher.children[path]) {
          eachRoute(routeArray, matcher.children[path], callback, binding);
        } else {
          callback.call(binding, routeArray);
        }
      }
    }
  }

  function map (callback, addRouteCallback) {
    var matcher = new Matcher();

    callback(generateMatch("", matcher, this.delegate));

    eachRoute([], matcher, function (route) {
      if (addRouteCallback) {
        addRouteCallback(this, route);
      } else {
        this.add(route);
      }
    }, this);
  }

  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

  function isArray(test) {
    return Object.prototype.toString.call(test) === "[object Array]";
  }

  // A Segment represents a segment in the original route description.
  // Each Segment type provides an `eachChar` and `regex` method.
  //
  // The `eachChar` method invokes the callback with one or more character
  // specifications. A character specification consumes one or more input
  // characters.
  //
  // The `regex` method returns a regex fragment for the segment. If the
  // segment is a dynamic of star segment, the regex fragment also includes
  // a capture.
  //
  // A character specification contains:
  //
  // * `validChars`: a String with a list of all valid characters, or
  // * `invalidChars`: a String with a list of all invalid characters
  // * `repeat`: true if the character specification can repeat

  function StaticSegment(string) {
    this.string = string;
  }
  StaticSegment.prototype = {
    eachChar: function eachChar(callback) {
      var string = this.string,
          ch;

      for (var i = 0, l = string.length; i < l; i++) {
        ch = string.charAt(i);
        callback({ validChars: ch });
      }
    },

    regex: function regex() {
      return this.string.replace(escapeRegex, '\\$1');
    },

    generate: function generate() {
      return this.string;
    }
  };

  function DynamicSegment(name) {
    this.name = name;
  }
  DynamicSegment.prototype = {
    eachChar: function eachChar(callback) {
      callback({ invalidChars: "/", repeat: true });
    },

    regex: function regex() {
      return "([^/]+)";
    },

    generate: function generate(params) {
      var val = params[this.name];
      return val == null ? ":" + this.name : val;
    }
  };

  function StarSegment(name) {
    this.name = name;
  }
  StarSegment.prototype = {
    eachChar: function eachChar(callback) {
      callback({ invalidChars: "", repeat: true });
    },

    regex: function regex() {
      return "(.+)";
    },

    generate: function generate(params) {
      var val = params[this.name];
      return val == null ? ":" + this.name : val;
    }
  };

  function EpsilonSegment() {}
  EpsilonSegment.prototype = {
    eachChar: function eachChar() {},
    regex: function regex() {
      return "";
    },
    generate: function generate() {
      return "";
    }
  };

  function parse(route, names, specificity) {
    // normalize route as not starting with a "/". Recognition will
    // also normalize.
    if (route.charAt(0) === "/") {
      route = route.substr(1);
    }

    var segments = route.split("/"),
        results = [];

    // A routes has specificity determined by the order that its different segments
    // appear in. This system mirrors how the magnitude of numbers written as strings
    // works.
    // Consider a number written as: "abc". An example would be "200". Any other number written
    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
    // leading symbol, "1".
    // The rule is that symbols to the left carry more weight than symbols to the right
    // when a number is written out as a string. In the above strings, the leading digit
    // represents how many 100's are in the number, and it carries more weight than the middle
    // number which represents how many 10's are in the number.
    // This system of number magnitude works well for route specificity, too. A route written as
    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
    // `x`, irrespective of the other parts.
    // Because of this similarity, we assign each type of segment a number value written as a
    // string. We can find the specificity of compound routes by concatenating these strings
    // together, from left to right. After we have looped through all of the segments,
    // we convert the string to a number.
    specificity.val = '';

    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i],
          match;

      if (match = segment.match(/^:([^\/]+)$/)) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        specificity.val += '3';
      } else if (match = segment.match(/^\*([^\/]+)$/)) {
        results.push(new StarSegment(match[1]));
        specificity.val += '2';
        names.push(match[1]);
      } else if (segment === "") {
        results.push(new EpsilonSegment());
        specificity.val += '1';
      } else {
        results.push(new StaticSegment(segment));
        specificity.val += '4';
      }
    }

    specificity.val = +specificity.val;

    return results;
  }

  // A State has a character specification and (`charSpec`) and a list of possible
  // subsequent states (`nextStates`).
  //
  // If a State is an accepting state, it will also have several additional
  // properties:
  //
  // * `regex`: A regular expression that is used to extract parameters from paths
  //   that reached this accepting state.
  // * `handlers`: Information on how to convert the list of captures into calls
  //   to registered handlers with the specified parameters
  // * `types`: How many static, dynamic or star segments in this route. Used to
  //   decide which route to use if multiple registered routes match a path.
  //
  // Currently, State is implemented naively by looping over `nextStates` and
  // comparing a character specification against a character. A more efficient
  // implementation would use a hash of keys pointing at one or more next states.

  function State(charSpec) {
    this.charSpec = charSpec;
    this.nextStates = [];
  }

  State.prototype = {
    get: function get(charSpec) {
      var nextStates = this.nextStates;

      for (var i = 0, l = nextStates.length; i < l; i++) {
        var child = nextStates[i];

        var isEqual = child.charSpec.validChars === charSpec.validChars;
        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

        if (isEqual) {
          return child;
        }
      }
    },

    put: function put(charSpec) {
      var state;

      // If the character specification already exists in a child of the current
      // state, just return that state.
      if (state = this.get(charSpec)) {
        return state;
      }

      // Make a new state for the character spec
      state = new State(charSpec);

      // Insert the new state as a child of the current state
      this.nextStates.push(state);

      // If this character specification repeats, insert the new state as a child
      // of itself. Note that this will not trigger an infinite loop because each
      // transition during recognition consumes a character.
      if (charSpec.repeat) {
        state.nextStates.push(state);
      }

      // Return the new state
      return state;
    },

    // Find a list of child states matching the next character
    match: function match(ch) {
      // DEBUG "Processing `" + ch + "`:"
      var nextStates = this.nextStates,
          child,
          charSpec,
          chars;

      // DEBUG "  " + debugState(this)
      var returned = [];

      for (var i = 0, l = nextStates.length; i < l; i++) {
        child = nextStates[i];

        charSpec = child.charSpec;

        if (typeof (chars = charSpec.validChars) !== 'undefined') {
          if (chars.indexOf(ch) !== -1) {
            returned.push(child);
          }
        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
          if (chars.indexOf(ch) === -1) {
            returned.push(child);
          }
        }
      }

      return returned;
    }

    /** IF DEBUG
    , debug: function() {
      var charSpec = this.charSpec,
          debug = "[",
          chars = charSpec.validChars || charSpec.invalidChars;
       if (charSpec.invalidChars) { debug += "^"; }
      debug += chars;
      debug += "]";
       if (charSpec.repeat) { debug += "+"; }
       return debug;
    }
    END IF **/
  };

  /** IF DEBUG
  function debug(log) {
    console.log(log);
  }

  function debugState(state) {
    return state.nextStates.map(function(n) {
      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
    }).join(", ")
  }
  END IF **/

  // Sort the routes by specificity
  function sortSolutions(states) {
    return states.sort(function (a, b) {
      return b.specificity.val - a.specificity.val;
    });
  }

  function recognizeChar(states, ch) {
    var nextStates = [];

    for (var i = 0, l = states.length; i < l; i++) {
      var state = states[i];

      nextStates = nextStates.concat(state.match(ch));
    }

    return nextStates;
  }

  var oCreate = Object.create || function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };

  function RecognizeResults(queryParams) {
    this.queryParams = queryParams || {};
  }
  RecognizeResults.prototype = oCreate({
    splice: Array.prototype.splice,
    slice: Array.prototype.slice,
    push: Array.prototype.push,
    length: 0,
    queryParams: null
  });

  function findHandler(state, path, queryParams) {
    var handlers = state.handlers,
        regex = state.regex;
    var captures = path.match(regex),
        currentCapture = 1;
    var result = new RecognizeResults(queryParams);

    for (var i = 0, l = handlers.length; i < l; i++) {
      var handler = handlers[i],
          names = handler.names,
          params = {};

      for (var j = 0, m = names.length; j < m; j++) {
        params[names[j]] = captures[currentCapture++];
      }

      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
    }

    return result;
  }

  function addSegment(currentState, segment) {
    segment.eachChar(function (ch) {
      var state;

      currentState = currentState.put(ch);
    });

    return currentState;
  }

  function decodeQueryParamPart(part) {
    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
    part = part.replace(/\+/gm, '%20');
    return decodeURIComponent(part);
  }

  // The main interface

  var RouteRecognizer = function RouteRecognizer() {
    this.rootState = new State();
    this.names = {};
  };

  RouteRecognizer.prototype = {
    add: function add(routes, options) {
      var currentState = this.rootState,
          regex = "^",
          specificity = {},
          handlers = [],
          allSegments = [],
          name;

      var isEmpty = true;

      for (var i = 0, l = routes.length; i < l; i++) {
        var route = routes[i],
            names = [];

        var segments = parse(route.path, names, specificity);

        allSegments = allSegments.concat(segments);

        for (var j = 0, m = segments.length; j < m; j++) {
          var segment = segments[j];

          if (segment instanceof EpsilonSegment) {
            continue;
          }

          isEmpty = false;

          // Add a "/" for the new segment
          currentState = currentState.put({ validChars: "/" });
          regex += "/";

          // Add a representation of the segment to the NFA and regex
          currentState = addSegment(currentState, segment);
          regex += segment.regex();
        }

        var handler = { handler: route.handler, names: names };
        handlers.push(handler);
      }

      if (isEmpty) {
        currentState = currentState.put({ validChars: "/" });
        regex += "/";
      }

      currentState.handlers = handlers;
      currentState.regex = new RegExp(regex + "$");
      currentState.specificity = specificity;

      if (name = options && options.as) {
        this.names[name] = {
          segments: allSegments,
          handlers: handlers
        };
      }
    },

    handlersFor: function handlersFor(name) {
      var route = this.names[name],
          result = [];
      if (!route) {
        throw new Error("There is no route named " + name);
      }

      for (var i = 0, l = route.handlers.length; i < l; i++) {
        result.push(route.handlers[i]);
      }

      return result;
    },

    hasRoute: function hasRoute(name) {
      return !!this.names[name];
    },

    generate: function generate(name, params) {
      var route = this.names[name],
          output = "";
      if (!route) {
        throw new Error("There is no route named " + name);
      }

      var segments = route.segments;

      for (var i = 0, l = segments.length; i < l; i++) {
        var segment = segments[i];

        if (segment instanceof EpsilonSegment) {
          continue;
        }

        output += "/";
        output += segment.generate(params);
      }

      if (output.charAt(0) !== '/') {
        output = '/' + output;
      }

      if (params && params.queryParams) {
        output += this.generateQueryString(params.queryParams);
      }

      return output;
    },

    generateQueryString: function generateQueryString(params) {
      var pairs = [];
      var keys = [];
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      keys.sort();
      for (var i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        var value = params[key];
        if (value == null) {
          continue;
        }
        var pair = encodeURIComponent(key);
        if (isArray(value)) {
          for (var j = 0, l = value.length; j < l; j++) {
            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
            pairs.push(arrayPair);
          }
        } else {
          pair += "=" + encodeURIComponent(value);
          pairs.push(pair);
        }
      }

      if (pairs.length === 0) {
        return '';
      }

      return "?" + pairs.join("&");
    },

    parseQueryString: function parseQueryString(queryString) {
      var pairs = queryString.split("&"),
          queryParams = {};
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('='),
            key = decodeQueryParamPart(pair[0]),
            keyLength = key.length,
            isArray = false,
            value;
        if (pair.length === 1) {
          value = 'true';
        } else {
          //Handle arrays
          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
            isArray = true;
            key = key.slice(0, keyLength - 2);
            if (!queryParams[key]) {
              queryParams[key] = [];
            }
          }
          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
        }
        if (isArray) {
          queryParams[key].push(value);
        } else {
          queryParams[key] = value;
        }
      }
      return queryParams;
    },

    recognize: function recognize(path) {
      var states = [this.rootState],
          pathLen,
          i,
          l,
          queryStart,
          queryParams = {},
          isSlashDropped = false;

      queryStart = path.indexOf('?');
      if (queryStart !== -1) {
        var queryString = path.substr(queryStart + 1, path.length);
        path = path.substr(0, queryStart);
        queryParams = this.parseQueryString(queryString);
      }

      path = decodeURI(path);

      // DEBUG GROUP path

      if (path.charAt(0) !== "/") {
        path = "/" + path;
      }

      pathLen = path.length;
      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
        path = path.substr(0, pathLen - 1);
        isSlashDropped = true;
      }

      for (i = 0, l = path.length; i < l; i++) {
        states = recognizeChar(states, path.charAt(i));
        if (!states.length) {
          break;
        }
      }

      // END DEBUG GROUP

      var solutions = [];
      for (i = 0, l = states.length; i < l; i++) {
        if (states[i].handlers) {
          solutions.push(states[i]);
        }
      }

      states = sortSolutions(solutions);

      var state = solutions[0];

      if (state && state.handlers) {
        // if a trailing slash was dropped and a star segment is the last segment
        // specified, put the trailing slash back
        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
          path = path + "/";
        }
        return findHandler(state, path, queryParams);
      }
    }
  };

  RouteRecognizer.prototype.map = map;

  RouteRecognizer.VERSION = '0.1.9';

  var genQuery = RouteRecognizer.prototype.generateQueryString;

  // export default for holding the Vue reference
  var exports$1 = {};
  /**
   * Warn stuff.
   *
   * @param {String} msg
   */

  function warn(msg) {
    /* istanbul ignore next */
    if (window.console) {
      console.warn('[vue-router] ' + msg);
      if (!exports$1.Vue || exports$1.Vue.config.debug) {
        console.warn(new Error('warning stack trace:').stack);
      }
    }
  }

  /**
   * Resolve a relative path.
   *
   * @param {String} base
   * @param {String} relative
   * @param {Boolean} append
   * @return {String}
   */

  function resolvePath(base, relative, append) {
    var query = base.match(/(\?.*)$/);
    if (query) {
      query = query[1];
      base = base.slice(0, -query.length);
    }
    // a query!
    if (relative.charAt(0) === '?') {
      return base + relative;
    }
    var stack = base.split('/');
    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
      stack.pop();
    }
    // resolve relative path
    var segments = relative.replace(/^\//, '').split('/');
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment === '.') {
        continue;
      } else if (segment === '..') {
        stack.pop();
      } else {
        stack.push(segment);
      }
    }
    // ensure leading slash
    if (stack[0] !== '') {
      stack.unshift('');
    }
    return stack.join('/');
  }

  /**
   * Forgiving check for a promise
   *
   * @param {Object} p
   * @return {Boolean}
   */

  function isPromise(p) {
    return p && typeof p.then === 'function';
  }

  /**
   * Retrive a route config field from a component instance
   * OR a component contructor.
   *
   * @param {Function|Vue} component
   * @param {String} name
   * @return {*}
   */

  function getRouteConfig(component, name) {
    var options = component && (component.$options || component.options);
    return options && options.route && options.route[name];
  }

  /**
   * Resolve an async component factory. Have to do a dirty
   * mock here because of Vue core's internal API depends on
   * an ID check.
   *
   * @param {Object} handler
   * @param {Function} cb
   */

  var resolver = undefined;

  function resolveAsyncComponent(handler, cb) {
    if (!resolver) {
      resolver = {
        resolve: exports$1.Vue.prototype._resolveComponent,
        $options: {
          components: {
            _: handler.component
          }
        }
      };
    } else {
      resolver.$options.components._ = handler.component;
    }
    resolver.resolve('_', function (Component) {
      handler.component = Component;
      cb(Component);
    });
  }

  /**
   * Map the dynamic segments in a path to params.
   *
   * @param {String} path
   * @param {Object} params
   * @param {Object} query
   */

  function mapParams(path, params, query) {
    if (params === undefined) params = {};

    path = path.replace(/:([^\/]+)/g, function (_, key) {
      var val = params[key];
      /* istanbul ignore if */
      if (!val) {
        warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
      }
      return val || '';
    });
    if (query) {
      path += genQuery(query);
    }
    return path;
  }

  var hashRE = /#.*$/;

  var HTML5History = (function () {
    function HTML5History(_ref) {
      var root = _ref.root;
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, HTML5History);

      if (root && root !== '/') {
        // make sure there's the starting slash
        if (root.charAt(0) !== '/') {
          root = '/' + root;
        }
        // remove trailing slash
        this.root = root.replace(/\/$/, '');
        this.rootRE = new RegExp('^\\' + this.root);
      } else {
        this.root = null;
      }
      this.onChange = onChange;
      // check base tag
      var baseEl = document.querySelector('base');
      this.base = baseEl && baseEl.getAttribute('href');
    }

    HTML5History.prototype.start = function start() {
      var _this = this;

      this.listener = function (e) {
        var url = decodeURI(location.pathname + location.search);
        if (_this.root) {
          url = url.replace(_this.rootRE, '');
        }
        _this.onChange(url, e && e.state, location.hash);
      };
      window.addEventListener('popstate', this.listener);
      this.listener();
    };

    HTML5History.prototype.stop = function stop() {
      window.removeEventListener('popstate', this.listener);
    };

    HTML5History.prototype.go = function go(path, replace, append) {
      var url = this.formatPath(path, append);
      if (replace) {
        history.replaceState({}, '', url);
      } else {
        // record scroll position by replacing current state
        history.replaceState({
          pos: {
            x: window.pageXOffset,
            y: window.pageYOffset
          }
        }, '', location.href);
        // then push new state
        history.pushState({}, '', url);
      }
      var hashMatch = path.match(hashRE);
      var hash = hashMatch && hashMatch[0];
      path = url
      // strip hash so it doesn't mess up params
      .replace(hashRE, '')
      // remove root before matching
      .replace(this.rootRE, '');
      this.onChange(path, null, hash);
    };

    HTML5History.prototype.formatPath = function formatPath(path, append) {
      return path.charAt(0) === '/'
      // absolute path
      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
    };

    return HTML5History;
  })();

  var HashHistory = (function () {
    function HashHistory(_ref) {
      var hashbang = _ref.hashbang;
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, HashHistory);

      this.hashbang = hashbang;
      this.onChange = onChange;
    }

    HashHistory.prototype.start = function start() {
      var self = this;
      this.listener = function () {
        var path = location.hash;
        var raw = path.replace(/^#!?/, '');
        // always
        if (raw.charAt(0) !== '/') {
          raw = '/' + raw;
        }
        var formattedPath = self.formatPath(raw);
        if (formattedPath !== path) {
          location.replace(formattedPath);
          return;
        }
        // determine query
        // note it's possible to have queries in both the actual URL
        // and the hash fragment itself.
        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
        self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
      };
      window.addEventListener('hashchange', this.listener);
      this.listener();
    };

    HashHistory.prototype.stop = function stop() {
      window.removeEventListener('hashchange', this.listener);
    };

    HashHistory.prototype.go = function go(path, replace, append) {
      path = this.formatPath(path, append);
      if (replace) {
        location.replace(path);
      } else {
        location.hash = path;
      }
    };

    HashHistory.prototype.formatPath = function formatPath(path, append) {
      var isAbsoloute = path.charAt(0) === '/';
      var prefix = '#' + (this.hashbang ? '!' : '');
      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
    };

    return HashHistory;
  })();

  var AbstractHistory = (function () {
    function AbstractHistory(_ref) {
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, AbstractHistory);

      this.onChange = onChange;
      this.currentPath = '/';
    }

    AbstractHistory.prototype.start = function start() {
      this.onChange('/');
    };

    AbstractHistory.prototype.stop = function stop() {
      // noop
    };

    AbstractHistory.prototype.go = function go(path, replace, append) {
      path = this.currentPath = this.formatPath(path, append);
      this.onChange(path);
    };

    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
    };

    return AbstractHistory;
  })();

  /**
   * Determine the reusability of an existing router view.
   *
   * @param {Directive} view
   * @param {Object} handler
   * @param {Transition} transition
   */

  function canReuse(view, handler, transition) {
    var component = view.childVM;
    if (!component || !handler) {
      return false;
    }
    // important: check view.Component here because it may
    // have been changed in activate hook
    if (view.Component !== handler.component) {
      return false;
    }
    var canReuseFn = getRouteConfig(component, 'canReuse');
    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
      to: transition.to,
      from: transition.from
    }) : true; // defaults to true
  }

  /**
   * Check if a component can deactivate.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Function} next
   */

  function canDeactivate(view, transition, next) {
    var fromComponent = view.childVM;
    var hook = getRouteConfig(fromComponent, 'canDeactivate');
    if (!hook) {
      next();
    } else {
      transition.callHook(hook, fromComponent, next, {
        expectBoolean: true
      });
    }
  }

  /**
   * Check if a component can activate.
   *
   * @param {Object} handler
   * @param {Transition} transition
   * @param {Function} next
   */

  function canActivate(handler, transition, next) {
    resolveAsyncComponent(handler, function (Component) {
      // have to check due to async-ness
      if (transition.aborted) {
        return;
      }
      // determine if this component can be activated
      var hook = getRouteConfig(Component, 'canActivate');
      if (!hook) {
        next();
      } else {
        transition.callHook(hook, null, next, {
          expectBoolean: true
        });
      }
    });
  }

  /**
   * Call deactivate hooks for existing router-views.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Function} next
   */

  function deactivate(view, transition, next) {
    var component = view.childVM;
    var hook = getRouteConfig(component, 'deactivate');
    if (!hook) {
      next();
    } else {
      transition.callHooks(hook, component, next);
    }
  }

  /**
   * Activate / switch component for a router-view.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Number} depth
   * @param {Function} [cb]
   */

  function activate(view, transition, depth, cb, reuse) {
    var handler = transition.activateQueue[depth];
    if (!handler) {
      saveChildView(view);
      if (view._bound) {
        view.setComponent(null);
      }
      cb && cb();
      return;
    }

    var Component = view.Component = handler.component;
    var activateHook = getRouteConfig(Component, 'activate');
    var dataHook = getRouteConfig(Component, 'data');
    var waitForData = getRouteConfig(Component, 'waitForData');

    view.depth = depth;
    view.activated = false;

    var component = undefined;
    var loading = !!(dataHook && !waitForData);

    // "reuse" is a flag passed down when the parent view is
    // either reused via keep-alive or as a child of a kept-alive view.
    // of course we can only reuse if the current kept-alive instance
    // is of the correct type.
    reuse = reuse && view.childVM && view.childVM.constructor === Component;

    if (reuse) {
      // just reuse
      component = view.childVM;
      component.$loadingRouteData = loading;
    } else {
      saveChildView(view);

      // unbuild current component. this step also destroys
      // and removes all nested child views.
      view.unbuild(true);

      // build the new component. this will also create the
      // direct child view of the current one. it will register
      // itself as view.childView.
      component = view.build({
        _meta: {
          $loadingRouteData: loading
        },
        created: function created() {
          this._routerView = view;
        }
      });

      // handle keep-alive.
      // when a kept-alive child vm is restored, we need to
      // add its cached child views into the router's view list,
      // and also properly update current view's child view.
      if (view.keepAlive) {
        component.$loadingRouteData = loading;
        var cachedChildView = component._keepAliveRouterView;
        if (cachedChildView) {
          view.childView = cachedChildView;
          component._keepAliveRouterView = null;
        }
      }
    }

    // cleanup the component in case the transition is aborted
    // before the component is ever inserted.
    var cleanup = function cleanup() {
      component.$destroy();
    };

    // actually insert the component and trigger transition
    var insert = function insert() {
      if (reuse) {
        cb && cb();
        return;
      }
      var router = transition.router;
      if (router._rendered || router._transitionOnLoad) {
        view.transition(component);
      } else {
        // no transition on first render, manual transition
        /* istanbul ignore if */
        if (view.setCurrent) {
          // 0.12 compat
          view.setCurrent(component);
        } else {
          // 1.0
          view.childVM = component;
        }
        component.$before(view.anchor, null, false);
      }
      cb && cb();
    };

    var afterData = function afterData() {
      // activate the child view
      if (view.childView) {
        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
      }
      insert();
    };

    // called after activation hook is resolved
    var afterActivate = function afterActivate() {
      view.activated = true;
      if (dataHook && waitForData) {
        // wait until data loaded to insert
        loadData(component, transition, dataHook, afterData, cleanup);
      } else {
        // load data and insert at the same time
        if (dataHook) {
          loadData(component, transition, dataHook);
        }
        afterData();
      }
    };

    if (activateHook) {
      transition.callHooks(activateHook, component, afterActivate, {
        cleanup: cleanup,
        postActivate: true
      });
    } else {
      afterActivate();
    }
  }

  /**
   * Reuse a view, just reload data if necessary.
   *
   * @param {Directive} view
   * @param {Transition} transition
   */

  function reuse(view, transition) {
    var component = view.childVM;
    var dataHook = getRouteConfig(component, 'data');
    if (dataHook) {
      loadData(component, transition, dataHook);
    }
  }

  /**
   * Asynchronously load and apply data to component.
   *
   * @param {Vue} component
   * @param {Transition} transition
   * @param {Function} hook
   * @param {Function} cb
   * @param {Function} cleanup
   */

  function loadData(component, transition, hook, cb, cleanup) {
    component.$loadingRouteData = true;
    transition.callHooks(hook, component, function () {
      component.$loadingRouteData = false;
      component.$emit('route-data-loaded', component);
      cb && cb();
    }, {
      cleanup: cleanup,
      postActivate: true,
      processData: function processData(data) {
        // handle promise sugar syntax
        var promises = [];
        if (isPlainObject(data)) {
          Object.keys(data).forEach(function (key) {
            var val = data[key];
            if (isPromise(val)) {
              promises.push(val.then(function (resolvedVal) {
                component.$set(key, resolvedVal);
              }));
            } else {
              component.$set(key, val);
            }
          });
        }
        if (promises.length) {
          return promises[0].constructor.all(promises);
        }
      }
    });
  }

  /**
   * Save the child view for a kept-alive view so that
   * we can restore it when it is switched back to.
   *
   * @param {Directive} view
   */

  function saveChildView(view) {
    if (view.keepAlive && view.childVM && view.childView) {
      view.childVM._keepAliveRouterView = view.childView;
    }
    view.childView = null;
  }

  /**
   * Check plain object.
   *
   * @param {*} val
   */

  function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  /**
   * A RouteTransition object manages the pipeline of a
   * router-view switching process. This is also the object
   * passed into user route hooks.
   *
   * @param {Router} router
   * @param {Route} to
   * @param {Route} from
   */

  var RouteTransition = (function () {
    function RouteTransition(router, to, from) {
      babelHelpers.classCallCheck(this, RouteTransition);

      this.router = router;
      this.to = to;
      this.from = from;
      this.next = null;
      this.aborted = false;
      this.done = false;
    }

    /**
     * Abort current transition and return to previous location.
     */

    RouteTransition.prototype.abort = function abort() {
      if (!this.aborted) {
        this.aborted = true;
        // if the root path throws an error during validation
        // on initial load, it gets caught in an infinite loop.
        var abortingOnLoad = !this.from.path && this.to.path === '/';
        if (!abortingOnLoad) {
          this.router.replace(this.from.path || '/');
        }
      }
    };

    /**
     * Abort current transition and redirect to a new location.
     *
     * @param {String} path
     */

    RouteTransition.prototype.redirect = function redirect(path) {
      if (!this.aborted) {
        this.aborted = true;
        if (typeof path === 'string') {
          path = mapParams(path, this.to.params, this.to.query);
        } else {
          path.params = path.params || this.to.params;
          path.query = path.query || this.to.query;
        }
        this.router.replace(path);
      }
    };

    /**
     * A router view transition's pipeline can be described as
     * follows, assuming we are transitioning from an existing
     * <router-view> chain [Component A, Component B] to a new
     * chain [Component A, Component C]:
     *
     *  A    A
     *  | => |
     *  B    C
     *
     * 1. Reusablity phase:
     *   -> canReuse(A, A)
     *   -> canReuse(B, C)
     *   -> determine new queues:
     *      - deactivation: [B]
     *      - activation: [C]
     *
     * 2. Validation phase:
     *   -> canDeactivate(B)
     *   -> canActivate(C)
     *
     * 3. Activation phase:
     *   -> deactivate(B)
     *   -> activate(C)
     *
     * Each of these steps can be asynchronous, and any
     * step can potentially abort the transition.
     *
     * @param {Function} cb
     */

    RouteTransition.prototype.start = function start(cb) {
      var transition = this;

      // determine the queue of views to deactivate
      var deactivateQueue = [];
      var view = this.router._rootView;
      while (view) {
        deactivateQueue.unshift(view);
        view = view.childView;
      }
      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

      // determine the queue of route handlers to activate
      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
        return match.handler;
      });

      // 1. Reusability phase
      var i = undefined,
          reuseQueue = undefined;
      for (i = 0; i < reverseDeactivateQueue.length; i++) {
        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
          break;
        }
      }
      if (i > 0) {
        reuseQueue = reverseDeactivateQueue.slice(0, i);
        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
        activateQueue = activateQueue.slice(i);
      }

      // 2. Validation phase
      transition.runQueue(deactivateQueue, canDeactivate, function () {
        transition.runQueue(activateQueue, canActivate, function () {
          transition.runQueue(deactivateQueue, deactivate, function () {
            // 3. Activation phase

            // Update router current route
            transition.router._onTransitionValidated(transition);

            // trigger reuse for all reused views
            reuseQueue && reuseQueue.forEach(function (view) {
              return reuse(view, transition);
            });

            // the root of the chain that needs to be replaced
            // is the top-most non-reusable view.
            if (deactivateQueue.length) {
              var _view = deactivateQueue[deactivateQueue.length - 1];
              var depth = reuseQueue ? reuseQueue.length : 0;
              activate(_view, transition, depth, cb);
            } else {
              cb();
            }
          });
        });
      });
    };

    /**
     * Asynchronously and sequentially apply a function to a
     * queue.
     *
     * @param {Array} queue
     * @param {Function} fn
     * @param {Function} cb
     */

    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
      var transition = this;
      step(0);
      function step(index) {
        if (index >= queue.length) {
          cb();
        } else {
          fn(queue[index], transition, function () {
            step(index + 1);
          });
        }
      }
    };

    /**
     * Call a user provided route transition hook and handle
     * the response (e.g. if the user returns a promise).
     *
     * If the user neither expects an argument nor returns a
     * promise, the hook is assumed to be synchronous.
     *
     * @param {Function} hook
     * @param {*} [context]
     * @param {Function} [cb]
     * @param {Object} [options]
     *                 - {Boolean} expectBoolean
     *                 - {Boolean} postActive
     *                 - {Function} processData
     *                 - {Function} cleanup
     */

    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      var _ref$expectBoolean = _ref.expectBoolean;
      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
      var _ref$postActivate = _ref.postActivate;
      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
      var processData = _ref.processData;
      var cleanup = _ref.cleanup;

      var transition = this;
      var nextCalled = false;

      // abort the transition
      var abort = function abort() {
        cleanup && cleanup();
        transition.abort();
      };

      // handle errors
      var onError = function onError(err) {
        postActivate ? next() : abort();
        if (err && !transition.router._suppress) {
          warn('Uncaught error during transition: ');
          throw err instanceof Error ? err : new Error(err);
        }
      };

      // since promise swallows errors, we have to
      // throw it in the next tick...
      var onPromiseError = function onPromiseError(err) {
        try {
          onError(err);
        } catch (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        }
      };

      // advance the transition to the next step
      var next = function next() {
        if (nextCalled) {
          warn('transition.next() should be called only once.');
          return;
        }
        nextCalled = true;
        if (transition.aborted) {
          cleanup && cleanup();
          return;
        }
        cb && cb();
      };

      var nextWithBoolean = function nextWithBoolean(res) {
        if (typeof res === 'boolean') {
          res ? next() : abort();
        } else if (isPromise(res)) {
          res.then(function (ok) {
            ok ? next() : abort();
          }, onPromiseError);
        } else if (!hook.length) {
          next();
        }
      };

      var nextWithData = function nextWithData(data) {
        var res = undefined;
        try {
          res = processData(data);
        } catch (err) {
          return onError(err);
        }
        if (isPromise(res)) {
          res.then(next, onPromiseError);
        } else {
          next();
        }
      };

      // expose a clone of the transition object, so that each
      // hook gets a clean copy and prevent the user from
      // messing with the internals.
      var exposed = {
        to: transition.to,
        from: transition.from,
        abort: abort,
        next: processData ? nextWithData : next,
        redirect: function redirect() {
          transition.redirect.apply(transition, arguments);
        }
      };

      // actually call the hook
      var res = undefined;
      try {
        res = hook.call(context, exposed);
      } catch (err) {
        return onError(err);
      }

      if (expectBoolean) {
        // boolean hooks
        nextWithBoolean(res);
      } else if (isPromise(res)) {
        // promise
        if (processData) {
          res.then(nextWithData, onPromiseError);
        } else {
          res.then(next, onPromiseError);
        }
      } else if (processData && isPlainOjbect(res)) {
        // data promise sugar
        nextWithData(res);
      } else if (!hook.length) {
        next();
      }
    };

    /**
     * Call a single hook or an array of async hooks in series.
     *
     * @param {Array} hooks
     * @param {*} context
     * @param {Function} cb
     * @param {Object} [options]
     */

    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
      var _this = this;

      if (Array.isArray(hooks)) {
        this.runQueue(hooks, function (hook, _, next) {
          if (!_this.aborted) {
            _this.callHook(hook, context, next, options);
          }
        }, cb);
      } else {
        this.callHook(hooks, context, cb, options);
      }
    };

    return RouteTransition;
  })();

  function isPlainOjbect(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  function toArray(val) {
    return val ? Array.prototype.slice.call(val) : [];
  }

  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

  /**
   * Route Context Object
   *
   * @param {String} path
   * @param {Router} router
   */

  var Route = function Route(path, router) {
    var _this = this;

    babelHelpers.classCallCheck(this, Route);

    var matched = router._recognizer.recognize(path);
    if (matched) {
      // copy all custom fields from route configs
      [].forEach.call(matched, function (match) {
        for (var key in match.handler) {
          if (!internalKeysRE.test(key)) {
            _this[key] = match.handler[key];
          }
        }
      });
      // set query and params
      this.query = matched.queryParams;
      this.params = [].reduce.call(matched, function (prev, cur) {
        if (cur.params) {
          for (var key in cur.params) {
            prev[key] = cur.params[key];
          }
        }
        return prev;
      }, {});
    }
    // expose path and router
    this.path = path;
    // for internal use
    this.matched = matched || router._notFoundHandler;
    // internal reference to router
    Object.defineProperty(this, 'router', {
      enumerable: false,
      value: router
    });
    // Important: freeze self to prevent observation
    Object.freeze(this);
  };

  function applyOverride (Vue) {
    var _Vue$util = Vue.util;
    var extend = _Vue$util.extend;
    var isArray = _Vue$util.isArray;
    var defineReactive = _Vue$util.defineReactive;

    // override Vue's init and destroy process to keep track of router instances
    var init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      options = options || {};
      var root = options._parent || options.parent || this;
      var router = root.$router;
      var route = root.$route;
      if (router) {
        // expose router
        this.$router = router;
        router._children.push(this);
        /* istanbul ignore if */
        if (this._defineMeta) {
          // 0.12
          this._defineMeta('$route', route);
        } else {
          // 1.0
          defineReactive(this, '$route', route);
        }
      }
      init.call(this, options);
    };

    var destroy = Vue.prototype._destroy;
    Vue.prototype._destroy = function () {
      if (!this._isBeingDestroyed && this.$router) {
        this.$router._children.$remove(this);
      }
      destroy.apply(this, arguments);
    };

    // 1.0 only: enable route mixins
    var strats = Vue.config.optionMergeStrategies;
    var hooksToMergeRE = /^(data|activate|deactivate)$/;

    if (strats) {
      strats.route = function (parentVal, childVal) {
        if (!childVal) return parentVal;
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key in childVal) {
          var a = ret[key];
          var b = childVal[key];
          // for data, activate and deactivate, we need to merge them into
          // arrays similar to lifecycle hooks.
          if (a && hooksToMergeRE.test(key)) {
            ret[key] = (isArray(a) ? a : [a]).concat(b);
          } else {
            ret[key] = b;
          }
        }
        return ret;
      };
    }
  }

  function View (Vue) {

    var _ = Vue.util;
    var componentDef =
    // 0.12
    Vue.directive('_component') ||
    // 1.0
    Vue.internalDirectives.component;
    // <router-view> extends the internal component directive
    var viewDef = _.extend({}, componentDef);

    // with some overrides
    _.extend(viewDef, {

      _isRouterView: true,

      bind: function bind() {
        var route = this.vm.$route;
        /* istanbul ignore if */
        if (!route) {
          warn('<router-view> can only be used inside a ' + 'router-enabled app.');
          return;
        }
        // force dynamic directive so v-component doesn't
        // attempt to build right now
        this._isDynamicLiteral = true;
        // finally, init by delegating to v-component
        componentDef.bind.call(this);

        // locate the parent view
        var parentView = undefined;
        var parent = this.vm;
        while (parent) {
          if (parent._routerView) {
            parentView = parent._routerView;
            break;
          }
          parent = parent.$parent;
        }
        if (parentView) {
          // register self as a child of the parent view,
          // instead of activating now. This is so that the
          // child's activate hook is called after the
          // parent's has resolved.
          this.parentView = parentView;
          parentView.childView = this;
        } else {
          // this is the root view!
          var router = route.router;
          router._rootView = this;
        }

        // handle late-rendered view
        // two possibilities:
        // 1. root view rendered after transition has been
        //    validated;
        // 2. child view rendered after parent view has been
        //    activated.
        var transition = route.router._currentTransition;
        if (!parentView && transition.done || parentView && parentView.activated) {
          var depth = parentView ? parentView.depth + 1 : 0;
          activate(this, transition, depth);
        }
      },

      unbind: function unbind() {
        if (this.parentView) {
          this.parentView.childView = null;
        }
        componentDef.unbind.call(this);
      }
    });

    Vue.elementDirective('router-view', viewDef);
  }

  var trailingSlashRE = /\/$/;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var queryStringRE = /\?.*$/;

  // install v-link, which provides navigation support for
  // HTML5 history mode
  function Link (Vue) {
    var _Vue$util = Vue.util;
    var _bind = _Vue$util.bind;
    var isObject = _Vue$util.isObject;
    var addClass = _Vue$util.addClass;
    var removeClass = _Vue$util.removeClass;

    Vue.directive('link-active', {
      priority: 1001,
      bind: function bind() {
        this.el.__v_link_active = true;
      }
    });

    Vue.directive('link', {
      priority: 1000,

      bind: function bind() {
        var vm = this.vm;
        /* istanbul ignore if */
        if (!vm.$route) {
          warn('v-link can only be used inside a router-enabled app.');
          return;
        }
        this.router = vm.$route.router;
        // update things when the route changes
        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
        // check if active classes should be applied to a different element
        this.activeEl = this.el;
        var parent = this.el.parentNode;
        while (parent) {
          if (parent.__v_link_active) {
            this.activeEl = parent;
            break;
          }
          parent = parent.parentNode;
        }
        // no need to handle click if link expects to be opened
        // in a new window/tab.
        /* istanbul ignore if */
        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
          return;
        }
        // handle click
        this.handler = _bind(this.onClick, this);
        this.el.addEventListener('click', this.handler);
      },

      update: function update(target) {
        this.target = target;
        if (isObject(target)) {
          this.append = target.append;
          this.exact = target.exact;
          this.prevActiveClass = this.activeClass;
          this.activeClass = target.activeClass;
        }
        this.onRouteUpdate(this.vm.$route);
      },

      onClick: function onClick(e) {
        // don't redirect with control keys
        /* istanbul ignore if */
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        // don't redirect when preventDefault called
        /* istanbul ignore if */
        if (e.defaultPrevented) return;
        // don't redirect on right click
        /* istanbul ignore if */
        if (e.button !== 0) return;

        var target = this.target;
        if (target) {
          // v-link with expression, just go
          e.preventDefault();
          this.router.go(target);
        } else {
          // no expression, delegate for an <a> inside
          var el = e.target;
          while (el.tagName !== 'A' && el !== this.el) {
            el = el.parentNode;
          }
          if (el.tagName === 'A' && sameOrigin(el)) {
            e.preventDefault();
            var path = el.pathname;
            if (this.router.history.root) {
              path = path.replace(this.router.history.rootRE, '');
            }
            this.router.go({
              path: path,
              replace: target && target.replace,
              append: target && target.append
            });
          }
        }
      },

      onRouteUpdate: function onRouteUpdate(route) {
        // router.stringifyPath is dependent on current route
        // and needs to be called again whenver route changes.
        var newPath = this.router.stringifyPath(this.target);
        if (this.path !== newPath) {
          this.path = newPath;
          this.updateActiveMatch();
          this.updateHref();
        }
        this.updateClasses(route.path);
      },

      updateActiveMatch: function updateActiveMatch() {
        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
      },

      updateHref: function updateHref() {
        if (this.el.tagName !== 'A') {
          return;
        }
        var path = this.path;
        var router = this.router;
        var isAbsolute = path.charAt(0) === '/';
        // do not format non-hash relative paths
        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
        if (href) {
          this.el.href = href;
        } else {
          this.el.removeAttribute('href');
        }
      },

      updateClasses: function updateClasses(path) {
        var el = this.activeEl;
        var activeClass = this.activeClass || this.router._linkActiveClass;
        // clear old class
        if (this.prevActiveClass !== activeClass) {
          removeClass(el, this.prevActiveClass);
        }
        // remove query string before matching
        var dest = this.path.replace(queryStringRE, '');
        path = path.replace(queryStringRE, '');
        // add new class
        if (this.exact) {
          if (dest === path ||
          // also allow additional trailing slash
          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
            addClass(el, activeClass);
          } else {
            removeClass(el, activeClass);
          }
        } else {
          if (this.activeRE && this.activeRE.test(path)) {
            addClass(el, activeClass);
          } else {
            removeClass(el, activeClass);
          }
        }
      },

      unbind: function unbind() {
        this.el.removeEventListener('click', this.handler);
        this.unwatch && this.unwatch();
      }
    });

    function sameOrigin(link) {
      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
    }
  }

  var historyBackends = {
    abstract: AbstractHistory,
    hash: HashHistory,
    html5: HTML5History
  };

  // late bind during install
  var Vue = undefined;

  /**
   * Router constructor
   *
   * @param {Object} [options]
   */

  var Router = (function () {
    function Router() {
      var _this = this;

      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$hashbang = _ref.hashbang;
      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
      var _ref$abstract = _ref.abstract;
      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
      var _ref$history = _ref.history;
      var history = _ref$history === undefined ? false : _ref$history;
      var _ref$saveScrollPosition = _ref.saveScrollPosition;
      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
      var _ref$transitionOnLoad = _ref.transitionOnLoad;
      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
      var _ref$suppressTransitionError = _ref.suppressTransitionError;
      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
      var _ref$root = _ref.root;
      var root = _ref$root === undefined ? null : _ref$root;
      var _ref$linkActiveClass = _ref.linkActiveClass;
      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
      babelHelpers.classCallCheck(this, Router);

      /* istanbul ignore if */
      if (!Router.installed) {
        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
      }

      // Vue instances
      this.app = null;
      this._children = [];

      // route recognizer
      this._recognizer = new RouteRecognizer();
      this._guardRecognizer = new RouteRecognizer();

      // state
      this._started = false;
      this._startCb = null;
      this._currentRoute = {};
      this._currentTransition = null;
      this._previousTransition = null;
      this._notFoundHandler = null;
      this._notFoundRedirect = null;
      this._beforeEachHooks = [];
      this._afterEachHooks = [];

      // trigger transition on initial render?
      this._rendered = false;
      this._transitionOnLoad = transitionOnLoad;

      // history mode
      this._root = root;
      this._abstract = abstract;
      this._hashbang = hashbang;

      // check if HTML5 history is available
      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
      this._history = history && hasPushState;
      this._historyFallback = history && !hasPushState;

      // create history object
      var inBrowser = Vue.util.inBrowser;
      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

      var History = historyBackends[this.mode];
      this.history = new History({
        root: root,
        hashbang: this._hashbang,
        onChange: function onChange(path, state, anchor) {
          _this._match(path, state, anchor);
        }
      });

      // other options
      this._saveScrollPosition = saveScrollPosition;
      this._linkActiveClass = linkActiveClass;
      this._suppress = suppressTransitionError;
    }

    /**
     * Allow directly passing components to a route
     * definition.
     *
     * @param {String} path
     * @param {Object} handler
     */

    // API ===================================================

    /**
    * Register a map of top-level paths.
    *
    * @param {Object} map
    */

    Router.prototype.map = function map(_map) {
      for (var route in _map) {
        this.on(route, _map[route]);
      }
      return this;
    };

    /**
     * Register a single root-level path
     *
     * @param {String} rootPath
     * @param {Object} handler
     *                 - {String} component
     *                 - {Object} [subRoutes]
     *                 - {Boolean} [forceRefresh]
     *                 - {Function} [before]
     *                 - {Function} [after]
     */

    Router.prototype.on = function on(rootPath, handler) {
      if (rootPath === '*') {
        this._notFound(handler);
      } else {
        this._addRoute(rootPath, handler, []);
      }
      return this;
    };

    /**
     * Set redirects.
     *
     * @param {Object} map
     */

    Router.prototype.redirect = function redirect(map) {
      for (var path in map) {
        this._addRedirect(path, map[path]);
      }
      return this;
    };

    /**
     * Set aliases.
     *
     * @param {Object} map
     */

    Router.prototype.alias = function alias(map) {
      for (var path in map) {
        this._addAlias(path, map[path]);
      }
      return this;
    };

    /**
     * Set global before hook.
     *
     * @param {Function} fn
     */

    Router.prototype.beforeEach = function beforeEach(fn) {
      this._beforeEachHooks.push(fn);
      return this;
    };

    /**
     * Set global after hook.
     *
     * @param {Function} fn
     */

    Router.prototype.afterEach = function afterEach(fn) {
      this._afterEachHooks.push(fn);
      return this;
    };

    /**
     * Navigate to a given path.
     * The path can be an object describing a named path in
     * the format of { name: '...', params: {}, query: {}}
     * The path is assumed to be already decoded, and will
     * be resolved against root (if provided)
     *
     * @param {String|Object} path
     * @param {Boolean} [replace]
     */

    Router.prototype.go = function go(path) {
      var replace = false;
      var append = false;
      if (Vue.util.isObject(path)) {
        replace = path.replace;
        append = path.append;
      }
      path = this.stringifyPath(path);
      if (path) {
        this.history.go(path, replace, append);
      }
    };

    /**
     * Short hand for replacing current path
     *
     * @param {String} path
     */

    Router.prototype.replace = function replace(path) {
      if (typeof path === 'string') {
        path = { path: path };
      }
      path.replace = true;
      this.go(path);
    };

    /**
     * Start the router.
     *
     * @param {VueConstructor} App
     * @param {String|Element} container
     * @param {Function} [cb]
     */

    Router.prototype.start = function start(App, container, cb) {
      /* istanbul ignore if */
      if (this._started) {
        warn('already started.');
        return;
      }
      this._started = true;
      this._startCb = cb;
      if (!this.app) {
        /* istanbul ignore if */
        if (!App || !container) {
          throw new Error('Must start vue-router with a component and a ' + 'root container.');
        }
        /* istanbul ignore if */
        if (App instanceof Vue) {
          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
        }
        this._appContainer = container;
        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
        // give it a name for better debugging
        Ctor.options.name = Ctor.options.name || 'RouterApp';
      }

      // handle history fallback in browsers that do not
      // support HTML5 history API
      if (this._historyFallback) {
        var _location = window.location;
        var _history = new HTML5History({ root: this._root });
        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
        if (path && path !== '/') {
          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
          return;
        }
      }

      this.history.start();
    };

    /**
     * Stop listening to route changes.
     */

    Router.prototype.stop = function stop() {
      this.history.stop();
      this._started = false;
    };

    /**
     * Normalize named route object / string paths into
     * a string.
     *
     * @param {Object|String|Number} path
     * @return {String}
     */

    Router.prototype.stringifyPath = function stringifyPath(path) {
      var fullPath = '';
      if (path && typeof path === 'object') {
        if (path.name) {
          var extend = Vue.util.extend;
          var currentParams = this._currentTransition && this._currentTransition.to.params;
          var targetParams = path.params || {};
          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
          if (path.query) {
            params.queryParams = path.query;
          }
          fullPath = encodeURI(this._recognizer.generate(path.name, params));
        } else if (path.path) {
          fullPath = encodeURI(path.path);
          if (path.query) {
            var query = this._recognizer.generateQueryString(path.query);
            if (fullPath.indexOf('?') > -1) {
              fullPath += '&' + query.slice(1);
            } else {
              fullPath += query;
            }
          }
        }
      } else {
        fullPath = encodeURI(path ? path + '' : '');
      }
      return fullPath;
    };

    // Internal methods ======================================

    /**
    * Add a route containing a list of segments to the internal
    * route recognizer. Will be called recursively to add all
    * possible sub-routes.
    *
    * @param {String} path
    * @param {Object} handler
    * @param {Array} segments
    */

    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
      guardComponent(path, handler);
      handler.path = path;
      handler.fullPath = (segments.reduce(function (path, segment) {
        return path + segment.path;
      }, '') + path).replace('//', '/');
      segments.push({
        path: path,
        handler: handler
      });
      this._recognizer.add(segments, {
        as: handler.name
      });
      // add sub routes
      if (handler.subRoutes) {
        for (var subPath in handler.subRoutes) {
          // recursively walk all sub routes
          this._addRoute(subPath, handler.subRoutes[subPath],
          // pass a copy in recursion to avoid mutating
          // across branches
          segments.slice());
        }
      }
    };

    /**
     * Set the notFound route handler.
     *
     * @param {Object} handler
     */

    Router.prototype._notFound = function _notFound(handler) {
      guardComponent('*', handler);
      this._notFoundHandler = [{ handler: handler }];
    };

    /**
     * Add a redirect record.
     *
     * @param {String} path
     * @param {String} redirectPath
     */

    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
      if (path === '*') {
        this._notFoundRedirect = redirectPath;
      } else {
        this._addGuard(path, redirectPath, this.replace);
      }
    };

    /**
     * Add an alias record.
     *
     * @param {String} path
     * @param {String} aliasPath
     */

    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
      this._addGuard(path, aliasPath, this._match);
    };

    /**
     * Add a path guard.
     *
     * @param {String} path
     * @param {String} mappedPath
     * @param {Function} handler
     */

    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
      var _this2 = this;

      this._guardRecognizer.add([{
        path: path,
        handler: function handler(match, query) {
          var realPath = mapParams(mappedPath, match.params, query);
          _handler.call(_this2, realPath);
        }
      }]);
    };

    /**
     * Check if a path matches any redirect records.
     *
     * @param {String} path
     * @return {Boolean} - if true, will skip normal match.
     */

    Router.prototype._checkGuard = function _checkGuard(path) {
      var matched = this._guardRecognizer.recognize(path);
      if (matched) {
        matched[0].handler(matched[0], matched.queryParams);
        return true;
      } else if (this._notFoundRedirect) {
        matched = this._recognizer.recognize(path);
        if (!matched) {
          this.replace(this._notFoundRedirect);
          return true;
        }
      }
    };

    /**
     * Match a URL path and set the route context on vm,
     * triggering view updates.
     *
     * @param {String} path
     * @param {Object} [state]
     * @param {String} [anchor]
     */

    Router.prototype._match = function _match(path, state, anchor) {
      var _this3 = this;

      if (this._checkGuard(path)) {
        return;
      }

      var currentRoute = this._currentRoute;
      var currentTransition = this._currentTransition;

      if (currentTransition) {
        if (currentTransition.to.path === path) {
          // do nothing if we have an active transition going to the same path
          return;
        } else if (currentRoute.path === path) {
          // We are going to the same path, but we also have an ongoing but
          // not-yet-validated transition. Abort that transition and reset to
          // prev transition.
          currentTransition.aborted = true;
          this._currentTransition = this._prevTransition;
          return;
        } else {
          // going to a totally different path. abort ongoing transition.
          currentTransition.aborted = true;
        }
      }

      // construct new route and transition context
      var route = new Route(path, this);
      var transition = new RouteTransition(this, route, currentRoute);

      // current transition is updated right now.
      // however, current route will only be updated after the transition has
      // been validated.
      this._prevTransition = currentTransition;
      this._currentTransition = transition;

      if (!this.app) {
        (function () {
          // initial render
          var router = _this3;
          _this3.app = new _this3._appConstructor({
            el: _this3._appContainer,
            created: function created() {
              this.$router = router;
            },
            _meta: {
              $route: route
            }
          });
        })();
      }

      // check global before hook
      var beforeHooks = this._beforeEachHooks;
      var startTransition = function startTransition() {
        transition.start(function () {
          _this3._postTransition(route, state, anchor);
        });
      };

      if (beforeHooks.length) {
        transition.runQueue(beforeHooks, function (hook, _, next) {
          if (transition === _this3._currentTransition) {
            transition.callHook(hook, null, next, {
              expectBoolean: true
            });
          }
        }, startTransition);
      } else {
        startTransition();
      }

      if (!this._rendered && this._startCb) {
        this._startCb.call(null);
      }

      // HACK:
      // set rendered to true after the transition start, so
      // that components that are acitvated synchronously know
      // whether it is the initial render.
      this._rendered = true;
    };

    /**
     * Set current to the new transition.
     * This is called by the transition object when the
     * validation of a route has succeeded.
     *
     * @param {Transition} transition
     */

    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
      // set current route
      var route = this._currentRoute = transition.to;
      // update route context for all children
      if (this.app.$route !== route) {
        this.app.$route = route;
        this._children.forEach(function (child) {
          child.$route = route;
        });
      }
      // call global after hook
      if (this._afterEachHooks.length) {
        this._afterEachHooks.forEach(function (hook) {
          return hook.call(null, {
            to: transition.to,
            from: transition.from
          });
        });
      }
      this._currentTransition.done = true;
    };

    /**
     * Handle stuff after the transition.
     *
     * @param {Route} route
     * @param {Object} [state]
     * @param {String} [anchor]
     */

    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
      // handle scroll positions
      // saved scroll positions take priority
      // then we check if the path has an anchor
      var pos = state && state.pos;
      if (pos && this._saveScrollPosition) {
        Vue.nextTick(function () {
          window.scrollTo(pos.x, pos.y);
        });
      } else if (anchor) {
        Vue.nextTick(function () {
          var el = document.getElementById(anchor.slice(1));
          if (el) {
            window.scrollTo(window.scrollX, el.offsetTop);
          }
        });
      }
    };

    return Router;
  })();

  function guardComponent(path, handler) {
    var comp = handler.component;
    if (Vue.util.isPlainObject(comp)) {
      comp = handler.component = Vue.extend(comp);
    }
    /* istanbul ignore if */
    if (typeof comp !== 'function') {
      handler.component = null;
      warn('invalid component for route "' + path + '".');
    }
  }

  /* Installation */

  Router.installed = false;

  /**
   * Installation interface.
   * Install the necessary directives.
   */

  Router.install = function (externalVue) {
    /* istanbul ignore if */
    if (Router.installed) {
      warn('already installed.');
      return;
    }
    Vue = externalVue;
    applyOverride(Vue);
    View(Vue);
    Link(Vue);
    exports$1.Vue = Vue;
    Router.installed = true;
  };

  // auto install
  /* istanbul ignore if */
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Router);
  }

  return Router;

}));

});

;/*!/component_modules/vue.js*/
define('component_modules/vue', function(require, exports, module) {

/*!
 * Vue.js v1.0.20
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  module.exports = factory();
}(this, function () { 'use strict';

  function set(obj, key, val) {
    if (hasOwn(obj, key)) {
      obj[key] = val;
      return;
    }
    if (obj._isVue) {
      set(obj._data, key, val);
      return;
    }
    var ob = obj.__ob__;
    if (!ob) {
      obj[key] = val;
      return;
    }
    ob.convert(key, val);
    ob.dep.notify();
    if (ob.vms) {
      var i = ob.vms.length;
      while (i--) {
        var vm = ob.vms[i];
        vm._proxy(key);
        vm._digest();
      }
    }
    return val;
  }

  /**
   * Delete a property and trigger change if necessary.
   *
   * @param {Object} obj
   * @param {String} key
   */

  function del(obj, key) {
    if (!hasOwn(obj, key)) {
      return;
    }
    delete obj[key];
    var ob = obj.__ob__;
    if (!ob) {
      return;
    }
    ob.dep.notify();
    if (ob.vms) {
      var i = ob.vms.length;
      while (i--) {
        var vm = ob.vms[i];
        vm._unproxy(key);
        vm._digest();
      }
    }
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Check whether the object has the property.
   *
   * @param {Object} obj
   * @param {String} key
   * @return {Boolean}
   */

  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  /**
   * Check if an expression is a literal value.
   *
   * @param {String} exp
   * @return {Boolean}
   */

  var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }

  /**
   * Check if a string starts with $ or _
   *
   * @param {String} str
   * @return {Boolean}
   */

  function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
  }

  /**
   * Guard text output, make sure undefined outputs
   * empty string
   *
   * @param {*} value
   * @return {String}
   */

  function _toString(value) {
    return value == null ? '' : value.toString();
  }

  /**
   * Check and convert possible numeric strings to numbers
   * before setting back to data
   *
   * @param {*} value
   * @return {*|Number}
   */

  function toNumber(value) {
    if (typeof value !== 'string') {
      return value;
    } else {
      var parsed = Number(value);
      return isNaN(parsed) ? value : parsed;
    }
  }

  /**
   * Convert string boolean literals into real booleans.
   *
   * @param {*} value
   * @return {*|Boolean}
   */

  function toBoolean(value) {
    return value === 'true' ? true : value === 'false' ? false : value;
  }

  /**
   * Strip quotes from a string
   *
   * @param {String} str
   * @return {String | false}
   */

  function stripQuotes(str) {
    var a = str.charCodeAt(0);
    var b = str.charCodeAt(str.length - 1);
    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
  }

  /**
   * Camelize a hyphen-delmited string.
   *
   * @param {String} str
   * @return {String}
   */

  var camelizeRE = /-(\w)/g;

  function camelize(str) {
    return str.replace(camelizeRE, toUpper);
  }

  function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
  }

  /**
   * Hyphenate a camelCase string.
   *
   * @param {String} str
   * @return {String}
   */

  var hyphenateRE = /([a-z\d])([A-Z])/g;

  function hyphenate(str) {
    return str.replace(hyphenateRE, '$1-$2').toLowerCase();
  }

  /**
   * Converts hyphen/underscore/slash delimitered names into
   * camelized classNames.
   *
   * e.g. my-component => MyComponent
   *      some_else    => SomeElse
   *      some/comp    => SomeComp
   *
   * @param {String} str
   * @return {String}
   */

  var classifyRE = /(?:^|[-_\/])(\w)/g;

  function classify(str) {
    return str.replace(classifyRE, toUpper);
  }

  /**
   * Simple bind, faster than native
   *
   * @param {Function} fn
   * @param {Object} ctx
   * @return {Function}
   */

  function bind(fn, ctx) {
    return function (a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    };
  }

  /**
   * Convert an Array-like object to a real Array.
   *
   * @param {Array-like} list
   * @param {Number} [start] - start index
   * @return {Array}
   */

  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }

  /**
   * Mix properties into target object.
   *
   * @param {Object} to
   * @param {Object} from
   */

  function extend(to, from) {
    var keys = Object.keys(from);
    var i = keys.length;
    while (i--) {
      to[keys[i]] = from[keys[i]];
    }
    return to;
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   *
   * @param {*} obj
   * @return {Boolean}
   */

  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   *
   * @param {*} obj
   * @return {Boolean}
   */

  var toString = Object.prototype.toString;
  var OBJECT_STRING = '[object Object]';

  function isPlainObject(obj) {
    return toString.call(obj) === OBJECT_STRING;
  }

  /**
   * Array type check.
   *
   * @param {*} obj
   * @return {Boolean}
   */

  var isArray = Array.isArray;

  /**
   * Define a property.
   *
   * @param {Object} obj
   * @param {String} key
   * @param {*} val
   * @param {Boolean} [enumerable]
   */

  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Debounce a function so it only gets called after the
   * input stops arriving after the given wait period.
   *
   * @param {Function} func
   * @param {Number} wait
   * @return {Function} - the debounced function
   */

  function _debounce(func, wait) {
    var timeout, args, context, timestamp, result;
    var later = function later() {
      var last = Date.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    };
    return function () {
      context = this;
      args = arguments;
      timestamp = Date.now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      return result;
    };
  }

  /**
   * Manual indexOf because it's slightly faster than
   * native.
   *
   * @param {Array} arr
   * @param {*} obj
   */

  function indexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * Make a cancellable version of an async callback.
   *
   * @param {Function} fn
   * @return {Function}
   */

  function cancellable(fn) {
    var cb = function cb() {
      if (!cb.cancelled) {
        return fn.apply(this, arguments);
      }
    };
    cb.cancel = function () {
      cb.cancelled = true;
    };
    return cb;
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   *
   * @param {*} a
   * @param {*} b
   * @return {Boolean}
   */

  function looseEqual(a, b) {
    /* eslint-disable eqeqeq */
    return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
    /* eslint-enable eqeqeq */
  }

  var hasProto = ('__proto__' in {});

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  // UA sniffing for working around browser-specific quirks
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isAndroid = UA && UA.indexOf('android') > 0;

  var transitionProp = undefined;
  var transitionEndEvent = undefined;
  var animationProp = undefined;
  var animationEndEvent = undefined;

  // Transition property/event sniffing
  if (inBrowser && !isIE9) {
    var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
    var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
    transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
    transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
    animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
    animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
  }

  /**
   * Defer a task to execute it asynchronously. Ideally this
   * should be executed as a microtask, so we leverage
   * MutationObserver if it's available, and fallback to
   * setTimeout(0).
   *
   * @param {Function} cb
   * @param {Object} ctx
   */

  var nextTick = (function () {
    var callbacks = [];
    var pending = false;
    var timerFunc;
    function nextTickHandler() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks = [];
      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
    }

    /* istanbul ignore if */
    if (typeof MutationObserver !== 'undefined') {
      var counter = 1;
      var observer = new MutationObserver(nextTickHandler);
      var textNode = document.createTextNode(counter);
      observer.observe(textNode, {
        characterData: true
      });
      timerFunc = function () {
        counter = (counter + 1) % 2;
        textNode.data = counter;
      };
    } else {
      // webpack attempts to inject a shim for setImmediate
      // if it is used as a global, so we have to work around that to
      // avoid bundling unnecessary code.
      var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
      timerFunc = context.setImmediate || setTimeout;
    }
    return function (cb, ctx) {
      var func = ctx ? function () {
        cb.call(ctx);
      } : cb;
      callbacks.push(func);
      if (pending) return;
      pending = true;
      timerFunc(nextTickHandler, 0);
    };
  })();

  function Cache(limit) {
    this.size = 0;
    this.limit = limit;
    this.head = this.tail = undefined;
    this._keymap = Object.create(null);
  }

  var p = Cache.prototype;

  /**
   * Put <value> into the cache associated with <key>.
   * Returns the entry which was removed to make room for
   * the new entry. Otherwise undefined is returned.
   * (i.e. if there was enough room already).
   *
   * @param {String} key
   * @param {*} value
   * @return {Entry|undefined}
   */

  p.put = function (key, value) {
    var removed;
    if (this.size === this.limit) {
      removed = this.shift();
    }

    var entry = this.get(key, true);
    if (!entry) {
      entry = {
        key: key
      };
      this._keymap[key] = entry;
      if (this.tail) {
        this.tail.newer = entry;
        entry.older = this.tail;
      } else {
        this.head = entry;
      }
      this.tail = entry;
      this.size++;
    }
    entry.value = value;

    return removed;
  };

  /**
   * Purge the least recently used (oldest) entry from the
   * cache. Returns the removed entry or undefined if the
   * cache was empty.
   */

  p.shift = function () {
    var entry = this.head;
    if (entry) {
      this.head = this.head.newer;
      this.head.older = undefined;
      entry.newer = entry.older = undefined;
      this._keymap[entry.key] = undefined;
      this.size--;
    }
    return entry;
  };

  /**
   * Get and register recent use of <key>. Returns the value
   * associated with <key> or undefined if not in cache.
   *
   * @param {String} key
   * @param {Boolean} returnEntry
   * @return {Entry|*}
   */

  p.get = function (key, returnEntry) {
    var entry = this._keymap[key];
    if (entry === undefined) return;
    if (entry === this.tail) {
      return returnEntry ? entry : entry.value;
    }
    // HEAD--------------TAIL
    //   <.older   .newer>
    //  <--- add direction --
    //   A  B  C  <D>  E
    if (entry.newer) {
      if (entry === this.head) {
        this.head = entry.newer;
      }
      entry.newer.older = entry.older; // C <-- E.
    }
    if (entry.older) {
      entry.older.newer = entry.newer; // C. --> E
    }
    entry.newer = undefined; // D --x
    entry.older = this.tail; // D. --> E
    if (this.tail) {
      this.tail.newer = entry; // E. <-- D
    }
    this.tail = entry;
    return returnEntry ? entry : entry.value;
  };

  var cache$1 = new Cache(1000);
  var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
  var reservedArgRE = /^in$|^-?\d+/;

  /**
   * Parser state
   */

  var str;
  var dir;
  var c;
  var prev;
  var i;
  var l;
  var lastFilterIndex;
  var inSingle;
  var inDouble;
  var curly;
  var square;
  var paren;
  /**
   * Push a filter to the current directive object
   */

  function pushFilter() {
    var exp = str.slice(lastFilterIndex, i).trim();
    var filter;
    if (exp) {
      filter = {};
      var tokens = exp.match(filterTokenRE);
      filter.name = tokens[0];
      if (tokens.length > 1) {
        filter.args = tokens.slice(1).map(processFilterArg);
      }
    }
    if (filter) {
      (dir.filters = dir.filters || []).push(filter);
    }
    lastFilterIndex = i + 1;
  }

  /**
   * Check if an argument is dynamic and strip quotes.
   *
   * @param {String} arg
   * @return {Object}
   */

  function processFilterArg(arg) {
    if (reservedArgRE.test(arg)) {
      return {
        value: toNumber(arg),
        dynamic: false
      };
    } else {
      var stripped = stripQuotes(arg);
      var dynamic = stripped === arg;
      return {
        value: dynamic ? arg : stripped,
        dynamic: dynamic
      };
    }
  }

  /**
   * Parse a directive value and extract the expression
   * and its filters into a descriptor.
   *
   * Example:
   *
   * "a + 1 | uppercase" will yield:
   * {
   *   expression: 'a + 1',
   *   filters: [
   *     { name: 'uppercase', args: null }
   *   ]
   * }
   *
   * @param {String} s
   * @return {Object}
   */

  function parseDirective(s) {
    var hit = cache$1.get(s);
    if (hit) {
      return hit;
    }

    // reset parser state
    str = s;
    inSingle = inDouble = false;
    curly = square = paren = 0;
    lastFilterIndex = 0;
    dir = {};

    for (i = 0, l = str.length; i < l; i++) {
      prev = c;
      c = str.charCodeAt(i);
      if (inSingle) {
        // check single quote
        if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
      } else if (inDouble) {
        // check double quote
        if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
      } else if (c === 0x7C && // pipe
          str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
        if (dir.expression == null) {
          // first filter, end of expression
          lastFilterIndex = i + 1;
          dir.expression = str.slice(0, i).trim();
        } else {
          // already has filter
          pushFilter();
        }
      } else {
        switch (c) {
          case 0x22:
            inDouble = true;break; // "
          case 0x27:
            inSingle = true;break; // '
          case 0x28:
            paren++;break; // (
          case 0x29:
            paren--;break; // )
          case 0x5B:
            square++;break; // [
          case 0x5D:
            square--;break; // ]
          case 0x7B:
            curly++;break; // {
          case 0x7D:
            curly--;break; // }
        }
      }
    }

    if (dir.expression == null) {
      dir.expression = str.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }

    cache$1.put(s, dir);
    return dir;
  }

  var directive = Object.freeze({
    parseDirective: parseDirective
  });

  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var cache = undefined;
  var tagRE = undefined;
  var htmlRE = undefined;
  /**
   * Escape a string so it can be used in a RegExp
   * constructor.
   *
   * @param {String} str
   */

  function escapeRegex(str) {
    return str.replace(regexEscapeRE, '\\$&');
  }

  function compileRegex() {
    var open = escapeRegex(config.delimiters[0]);
    var close = escapeRegex(config.delimiters[1]);
    var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
    var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
    tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
    htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
    // reset cache
    cache = new Cache(1000);
  }

  /**
   * Parse a template text string into an array of tokens.
   *
   * @param {String} text
   * @return {Array<Object> | null}
   *               - {String} type
   *               - {String} value
   *               - {Boolean} [html]
   *               - {Boolean} [oneTime]
   */

  function parseText(text) {
    if (!cache) {
      compileRegex();
    }
    var hit = cache.get(text);
    if (hit) {
      return hit;
    }
    text = text.replace(/\n/g, '');
    if (!tagRE.test(text)) {
      return null;
    }
    var tokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index, html, value, first, oneTime;
    /* eslint-disable no-cond-assign */
    while (match = tagRE.exec(text)) {
      /* eslint-enable no-cond-assign */
      index = match.index;
      // push text token
      if (index > lastIndex) {
        tokens.push({
          value: text.slice(lastIndex, index)
        });
      }
      // tag token
      html = htmlRE.test(match[0]);
      value = html ? match[1] : match[2];
      first = value.charCodeAt(0);
      oneTime = first === 42; // *
      value = oneTime ? value.slice(1) : value;
      tokens.push({
        tag: true,
        value: value.trim(),
        html: html,
        oneTime: oneTime
      });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push({
        value: text.slice(lastIndex)
      });
    }
    cache.put(text, tokens);
    return tokens;
  }

  /**
   * Format a list of tokens into an expression.
   * e.g. tokens parsed from 'a {{b}} c' can be serialized
   * into one single expression as '"a " + b + " c"'.
   *
   * @param {Array} tokens
   * @param {Vue} [vm]
   * @return {String}
   */

  function tokensToExp(tokens, vm) {
    if (tokens.length > 1) {
      return tokens.map(function (token) {
        return formatToken(token, vm);
      }).join('+');
    } else {
      return formatToken(tokens[0], vm, true);
    }
  }

  /**
   * Format a single token.
   *
   * @param {Object} token
   * @param {Vue} [vm]
   * @param {Boolean} [single]
   * @return {String}
   */

  function formatToken(token, vm, single) {
    return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
  }

  /**
   * For an attribute with multiple interpolation tags,
   * e.g. attr="some-{{thing | filter}}", in order to combine
   * the whole thing into a single watchable expression, we
   * have to inline those filters. This function does exactly
   * that. This is a bit hacky but it avoids heavy changes
   * to directive parser and watcher mechanism.
   *
   * @param {String} exp
   * @param {Boolean} single
   * @return {String}
   */

  var filterRE = /[^|]\|[^|]/;
  function inlineFilters(exp, single) {
    if (!filterRE.test(exp)) {
      return single ? exp : '(' + exp + ')';
    } else {
      var dir = parseDirective(exp);
      if (!dir.filters) {
        return '(' + exp + ')';
      } else {
        return 'this._applyFilters(' + dir.expression + // value
            ',null,' + // oldValue (null for read)
            JSON.stringify(dir.filters) + // filter descriptors
            ',false)'; // write?
      }
    }
  }

  var text = Object.freeze({
    compileRegex: compileRegex,
    parseText: parseText,
    tokensToExp: tokensToExp
  });

  var delimiters = ['{{', '}}'];
  var unsafeDelimiters = ['{{{', '}}}'];

  var config = Object.defineProperties({

    /**
     * Whether to print debug messages.
     * Also enables stack trace for warnings.
     *
     * @type {Boolean}
     */

    debug: false,

    /**
     * Whether to suppress warnings.
     *
     * @type {Boolean}
     */

    silent: false,

    /**
     * Whether to use async rendering.
     */

    async: true,

    /**
     * Whether to warn against errors caught when evaluating
     * expressions.
     */

    warnExpressionErrors: true,

    /**
     * Whether to allow devtools inspection.
     * Disabled by default in production builds.
     */

    devtools: 'development' !== 'production',

    /**
     * Internal flag to indicate the delimiters have been
     * changed.
     *
     * @type {Boolean}
     */

    _delimitersChanged: true,

    /**
     * List of asset types that a component can own.
     *
     * @type {Array}
     */

    _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

    /**
     * prop binding modes
     */

    _propBindingModes: {
      ONE_WAY: 0,
      TWO_WAY: 1,
      ONE_TIME: 2
    },

    /**
     * Max circular updates allowed in a batcher flush cycle.
     */

    _maxUpdateCount: 100

  }, {
    delimiters: { /**
     * Interpolation delimiters. Changing these would trigger
     * the text parser to re-compile the regular expressions.
     *
     * @type {Array<String>}
     */

    get: function get() {
      return delimiters;
    },
      set: function set(val) {
        delimiters = val;
        compileRegex();
      },
      configurable: true,
      enumerable: true
    },
    unsafeDelimiters: {
      get: function get() {
        return unsafeDelimiters;
      },
      set: function set(val) {
        unsafeDelimiters = val;
        compileRegex();
      },
      configurable: true,
      enumerable: true
    }
  });

  var warn = undefined;

  if ('development' !== 'production') {
    (function () {
      var hasConsole = typeof console !== 'undefined';
      warn = function (msg, e) {
        if (hasConsole && (!config.silent || config.debug)) {
          console.warn('[Vue warn]: ' + msg);
          /* istanbul ignore if */
          if (config.debug) {
            if (e) {
              throw e;
            } else {
              console.warn(new Error('Warning Stack Trace').stack);
            }
          }
        }
      };
    })();
  }

  /**
   * Append with transition.
   *
   * @param {Element} el
   * @param {Element} target
   * @param {Vue} vm
   * @param {Function} [cb]
   */

  function appendWithTransition(el, target, vm, cb) {
    applyTransition(el, 1, function () {
      target.appendChild(el);
    }, vm, cb);
  }

  /**
   * InsertBefore with transition.
   *
   * @param {Element} el
   * @param {Element} target
   * @param {Vue} vm
   * @param {Function} [cb]
   */

  function beforeWithTransition(el, target, vm, cb) {
    applyTransition(el, 1, function () {
      before(el, target);
    }, vm, cb);
  }

  /**
   * Remove with transition.
   *
   * @param {Element} el
   * @param {Vue} vm
   * @param {Function} [cb]
   */

  function removeWithTransition(el, vm, cb) {
    applyTransition(el, -1, function () {
      remove(el);
    }, vm, cb);
  }

  /**
   * Apply transitions with an operation callback.
   *
   * @param {Element} el
   * @param {Number} direction
   *                  1: enter
   *                 -1: leave
   * @param {Function} op - the actual DOM operation
   * @param {Vue} vm
   * @param {Function} [cb]
   */

  function applyTransition(el, direction, op, vm, cb) {
    var transition = el.__v_trans;
    if (!transition ||
          // skip if there are no js hooks and CSS transition is
          // not supported
        !transition.hooks && !transitionEndEvent ||
          // skip transitions for initial compile
        !vm._isCompiled ||
          // if the vm is being manipulated by a parent directive
          // during the parent's compilation phase, skip the
          // animation.
        vm.$parent && !vm.$parent._isCompiled) {
      op();
      if (cb) cb();
      return;
    }
    var action = direction > 0 ? 'enter' : 'leave';
    transition[action](op, cb);
  }

  var transition = Object.freeze({
    appendWithTransition: appendWithTransition,
    beforeWithTransition: beforeWithTransition,
    removeWithTransition: removeWithTransition,
    applyTransition: applyTransition
  });

  /**
   * Query an element selector if it's not an element already.
   *
   * @param {String|Element} el
   * @return {Element}
   */

  function query(el) {
    if (typeof el === 'string') {
      var selector = el;
      el = document.querySelector(el);
      if (!el) {
        'development' !== 'production' && warn('Cannot find element: ' + selector);
      }
    }
    return el;
  }

  /**
   * Check if a node is in the document.
   * Note: document.documentElement.contains should work here
   * but always returns false for comment nodes in phantomjs,
   * making unit tests difficult. This is fixed by doing the
   * contains() check on the node's parentNode instead of
   * the node itself.
   *
   * @param {Node} node
   * @return {Boolean}
   */

  function inDoc(node) {
    var doc = document.documentElement;
    var parent = node && node.parentNode;
    return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
  }

  /**
   * Get and remove an attribute from a node.
   *
   * @param {Node} node
   * @param {String} _attr
   */

  function getAttr(node, _attr) {
    var val = node.getAttribute(_attr);
    if (val !== null) {
      node.removeAttribute(_attr);
    }
    return val;
  }

  /**
   * Get an attribute with colon or v-bind: prefix.
   *
   * @param {Node} node
   * @param {String} name
   * @return {String|null}
   */

  function getBindAttr(node, name) {
    var val = getAttr(node, ':' + name);
    if (val === null) {
      val = getAttr(node, 'v-bind:' + name);
    }
    return val;
  }

  /**
   * Check the presence of a bind attribute.
   *
   * @param {Node} node
   * @param {String} name
   * @return {Boolean}
   */

  function hasBindAttr(node, name) {
    return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  function before(el, target) {
    target.parentNode.insertBefore(el, target);
  }

  /**
   * Insert el after target
   *
   * @param {Element} el
   * @param {Element} target
   */

  function after(el, target) {
    if (target.nextSibling) {
      before(el, target.nextSibling);
    } else {
      target.parentNode.appendChild(el);
    }
  }

  /**
   * Remove el from DOM
   *
   * @param {Element} el
   */

  function remove(el) {
    el.parentNode.removeChild(el);
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  function prepend(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  }

  /**
   * Replace target with el
   *
   * @param {Element} target
   * @param {Element} el
   */

  function replace(target, el) {
    var parent = target.parentNode;
    if (parent) {
      parent.replaceChild(el, target);
    }
  }

  /**
   * Add event listener shorthand.
   *
   * @param {Element} el
   * @param {String} event
   * @param {Function} cb
   * @param {Boolean} [useCapture]
   */

  function on(el, event, cb, useCapture) {
    el.addEventListener(event, cb, useCapture);
  }

  /**
   * Remove event listener shorthand.
   *
   * @param {Element} el
   * @param {String} event
   * @param {Function} cb
   */

  function off(el, event, cb) {
    el.removeEventListener(event, cb);
  }

  /**
   * For IE9 compat: when both class and :class are present
   * getAttribute('class') returns wrong value...
   *
   * @param {Element} el
   * @return {String}
   */

  function getClass(el) {
    var classname = el.className;
    if (typeof classname === 'object') {
      classname = classname.baseVal || '';
    }
    return classname;
  }

  /**
   * In IE9, setAttribute('class') will result in empty class
   * if the element also has the :class attribute; However in
   * PhantomJS, setting `className` does not work on SVG elements...
   * So we have to do a conditional check here.
   *
   * @param {Element} el
   * @param {String} cls
   */

  function setClass(el, cls) {
    /* istanbul ignore if */
    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
      el.className = cls;
    } else {
      el.setAttribute('class', cls);
    }
  }

  /**
   * Add class with compatibility for IE & SVG
   *
   * @param {Element} el
   * @param {String} cls
   */

  function addClass(el, cls) {
    if (el.classList) {
      el.classList.add(cls);
    } else {
      var cur = ' ' + getClass(el) + ' ';
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        setClass(el, (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for IE & SVG
   *
   * @param {Element} el
   * @param {String} cls
   */

  function removeClass(el, cls) {
    if (el.classList) {
      el.classList.remove(cls);
    } else {
      var cur = ' ' + getClass(el) + ' ';
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      setClass(el, cur.trim());
    }
    if (!el.className) {
      el.removeAttribute('class');
    }
  }

  /**
   * Extract raw content inside an element into a temporary
   * container div
   *
   * @param {Element} el
   * @param {Boolean} asFragment
   * @return {Element|DocumentFragment}
   */

  function extractContent(el, asFragment) {
    var child;
    var rawContent;
    /* istanbul ignore if */
    if (isTemplate(el) && isFragment(el.content)) {
      el = el.content;
    }
    if (el.hasChildNodes()) {
      trimNode(el);
      rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
      /* eslint-disable no-cond-assign */
      while (child = el.firstChild) {
        /* eslint-enable no-cond-assign */
        rawContent.appendChild(child);
      }
    }
    return rawContent;
  }

  /**
   * Trim possible empty head/tail text and comment
   * nodes inside a parent.
   *
   * @param {Node} node
   */

  function trimNode(node) {
    var child;
    /* eslint-disable no-sequences */
    while ((child = node.firstChild, isTrimmable(child))) {
      node.removeChild(child);
    }
    while ((child = node.lastChild, isTrimmable(child))) {
      node.removeChild(child);
    }
    /* eslint-enable no-sequences */
  }

  function isTrimmable(node) {
    return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
  }

  /**
   * Check if an element is a template tag.
   * Note if the template appears inside an SVG its tagName
   * will be in lowercase.
   *
   * @param {Element} el
   */

  function isTemplate(el) {
    return el.tagName && el.tagName.toLowerCase() === 'template';
  }

  /**
   * Create an "anchor" for performing dom insertion/removals.
   * This is used in a number of scenarios:
   * - fragment instance
   * - v-html
   * - v-if
   * - v-for
   * - component
   *
   * @param {String} content
   * @param {Boolean} persist - IE trashes empty textNodes on
   *                            cloneNode(true), so in certain
   *                            cases the anchor needs to be
   *                            non-empty to be persisted in
   *                            templates.
   * @return {Comment|Text}
   */

  function createAnchor(content, persist) {
    var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
    anchor.__v_anchor = true;
    return anchor;
  }

  /**
   * Find a component ref attribute that starts with $.
   *
   * @param {Element} node
   * @return {String|undefined}
   */

  var refRE = /^v-ref:/;

  function findRef(node) {
    if (node.hasAttributes()) {
      var attrs = node.attributes;
      for (var i = 0, l = attrs.length; i < l; i++) {
        var name = attrs[i].name;
        if (refRE.test(name)) {
          return camelize(name.replace(refRE, ''));
        }
      }
    }
  }

  /**
   * Map a function to a range of nodes .
   *
   * @param {Node} node
   * @param {Node} end
   * @param {Function} op
   */

  function mapNodeRange(node, end, op) {
    var next;
    while (node !== end) {
      next = node.nextSibling;
      op(node);
      node = next;
    }
    op(end);
  }

  /**
   * Remove a range of nodes with transition, store
   * the nodes in a fragment with correct ordering,
   * and call callback when done.
   *
   * @param {Node} start
   * @param {Node} end
   * @param {Vue} vm
   * @param {DocumentFragment} frag
   * @param {Function} cb
   */

  function removeNodeRange(start, end, vm, frag, cb) {
    var done = false;
    var removed = 0;
    var nodes = [];
    mapNodeRange(start, end, function (node) {
      if (node === end) done = true;
      nodes.push(node);
      removeWithTransition(node, vm, onRemoved);
    });
    function onRemoved() {
      removed++;
      if (done && removed >= nodes.length) {
        for (var i = 0; i < nodes.length; i++) {
          frag.appendChild(nodes[i]);
        }
        cb && cb();
      }
    }
  }

  /**
   * Check if a node is a DocumentFragment.
   *
   * @param {Node} node
   * @return {Boolean}
   */

  function isFragment(node) {
    return node && node.nodeType === 11;
  }

  /**
   * Get outerHTML of elements, taking care
   * of SVG elements in IE as well.
   *
   * @param {Element} el
   * @return {String}
   */

  function getOuterHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }

  var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
  var reservedTagRE = /^(slot|partial|component)$/i;

  var isUnknownElement = undefined;
  if ('development' !== 'production') {
    isUnknownElement = function (el, tag) {
      if (tag.indexOf('-') > -1) {
        // http://stackoverflow.com/a/28210364/1070244
        return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
      } else {
        return (/HTMLUnknownElement/.test(el.toString()) &&
              // Chrome returns unknown for several HTML5 elements.
              // https://code.google.com/p/chromium/issues/detail?id=540526
            !/^(data|time|rtc|rb)$/.test(tag)
        );
      }
    };
  }

  /**
   * Check if an element is a component, if yes return its
   * component id.
   *
   * @param {Element} el
   * @param {Object} options
   * @return {Object|undefined}
   */

  function checkComponentAttr(el, options) {
    var tag = el.tagName.toLowerCase();
    var hasAttrs = el.hasAttributes();
    if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
      if (resolveAsset(options, 'components', tag)) {
        return { id: tag };
      } else {
        var is = hasAttrs && getIsBinding(el);
        if (is) {
          return is;
        } else if ('development' !== 'production') {
          var expectedTag = options._componentNameMap && options._componentNameMap[tag];
          if (expectedTag) {
            warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
          } else if (isUnknownElement(el, tag)) {
            warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
          }
        }
      }
    } else if (hasAttrs) {
      return getIsBinding(el);
    }
  }

  /**
   * Get "is" binding from an element.
   *
   * @param {Element} el
   * @return {Object|undefined}
   */

  function getIsBinding(el) {
    // dynamic syntax
    var exp = getAttr(el, 'is');
    if (exp != null) {
      return { id: exp };
    } else {
      exp = getBindAttr(el, 'is');
      if (exp != null) {
        return { id: exp, dynamic: true };
      }
    }
  }

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   *
   * All strategy functions follow the same signature:
   *
   * @param {*} parentVal
   * @param {*} childVal
   * @param {Vue} [vm]
   */

  var strats = config.optionMergeStrategies = Object.create(null);

  /**
   * Helper that recursively merges two data objects together.
   */

  function mergeData(to, from) {
    var key, toVal, fromVal;
    for (key in from) {
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (isObject(toVal) && isObject(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to;
  }

  /**
   * Data
   */

  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal;
      }
      if (typeof childVal !== 'function') {
        'development' !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn() {
        return mergeData(childVal.call(this), parentVal.call(this));
      };
    } else if (parentVal || childVal) {
      return function mergedInstanceDataFn() {
        // instance merge
        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
        if (instanceData) {
          return mergeData(instanceData, defaultData);
        } else {
          return defaultData;
        }
      };
    }
  };

  /**
   * El
   */

  strats.el = function (parentVal, childVal, vm) {
    if (!vm && childVal && typeof childVal !== 'function') {
      'development' !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
      return;
    }
    var ret = childVal || parentVal;
    // invoke the element factory if this is instance merge
    return vm && typeof ret === 'function' ? ret.call(vm) : ret;
  };

  /**
   * Hooks and param attributes are merged as arrays.
   */

  strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  };

  /**
   * 0.11 deprecation warning
   */

  strats.paramAttributes = function () {
    /* istanbul ignore next */
    'development' !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
  };

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */

  function mergeAssets(parentVal, childVal) {
    var res = Object.create(parentVal);
    return childVal ? extend(res, guardArrayAssets(childVal)) : res;
  }

  config._assetTypes.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Events & Watchers.
   *
   * Events & watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */

  strats.watch = strats.events = function (parentVal, childVal) {
    if (!childVal) return parentVal;
    if (!parentVal) return childVal;
    var ret = {};
    extend(ret, parentVal);
    for (var key in childVal) {
      var parent = ret[key];
      var child = childVal[key];
      if (parent && !isArray(parent)) {
        parent = [parent];
      }
      ret[key] = parent ? parent.concat(child) : [child];
    }
    return ret;
  };

  /**
   * Other object hashes.
   */

  strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
    if (!childVal) return parentVal;
    if (!parentVal) return childVal;
    var ret = Object.create(null);
    extend(ret, parentVal);
    extend(ret, childVal);
    return ret;
  };

  /**
   * Default strategy.
   */

  var defaultStrat = function defaultStrat(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  };

  /**
   * Make sure component options get converted to actual
   * constructors.
   *
   * @param {Object} options
   */

  function guardComponents(options) {
    if (options.components) {
      var components = options.components = guardArrayAssets(options.components);
      var ids = Object.keys(components);
      var def;
      if ('development' !== 'production') {
        var map = options._componentNameMap = {};
      }
      for (var i = 0, l = ids.length; i < l; i++) {
        var key = ids[i];
        if (commonTagRE.test(key) || reservedTagRE.test(key)) {
          'development' !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
          continue;
        }
        // record a all lowercase <-> kebab-case mapping for
        // possible custom element case error warning
        if ('development' !== 'production') {
          map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
        }
        def = components[key];
        if (isPlainObject(def)) {
          components[key] = Vue.extend(def);
        }
      }
    }
  }

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   *
   * @param {Object} options
   */

  function guardProps(options) {
    var props = options.props;
    var i, val;
    if (isArray(props)) {
      options.props = {};
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          options.props[val] = null;
        } else if (val.name) {
          options.props[val.name] = val;
        }
      }
    } else if (isPlainObject(props)) {
      var keys = Object.keys(props);
      i = keys.length;
      while (i--) {
        val = props[keys[i]];
        if (typeof val === 'function') {
          props[keys[i]] = { type: val };
        }
      }
    }
  }

  /**
   * Guard an Array-format assets option and converted it
   * into the key-value Object format.
   *
   * @param {Object|Array} assets
   * @return {Object}
   */

  function guardArrayAssets(assets) {
    if (isArray(assets)) {
      var res = {};
      var i = assets.length;
      var asset;
      while (i--) {
        asset = assets[i];
        var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
        if (!id) {
          'development' !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
        } else {
          res[id] = asset;
        }
      }
      return res;
    }
    return assets;
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   *
   * @param {Object} parent
   * @param {Object} child
   * @param {Vue} [vm] - if vm is present, indicates this is
   *                     an instantiation merge.
   */

  function mergeOptions(parent, child, vm) {
    guardComponents(child);
    guardProps(child);
    var options = {};
    var key;
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   *
   * @param {Object} options
   * @param {String} type
   * @param {String} id
   * @return {Object|Function}
   */

  function resolveAsset(options, type, id) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return;
    }
    var assets = options[type];
    var camelizedId;
    return assets[id] ||
          // camelCase ID
        assets[camelizedId = camelize(id)] ||
          // Pascal Case ID
        assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
  }

  /**
   * Assert asset exists
   */

  function assertAsset(val, type, id) {
    if (!val) {
      'development' !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
    }
  }

  var uid$1 = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   *
   * @constructor
   */
  function Dep() {
    this.id = uid$1++;
    this.subs = [];
  }

  // the current target watcher being evaluated.
  // this is globally unique because there could be only one
  // watcher being evaluated at any time.
  Dep.target = null;

  /**
   * Add a directive subscriber.
   *
   * @param {Directive} sub
   */

  Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
  };

  /**
   * Remove a directive subscriber.
   *
   * @param {Directive} sub
   */

  Dep.prototype.removeSub = function (sub) {
    this.subs.$remove(sub);
  };

  /**
   * Add self as a dependency to the target watcher.
   */

  Dep.prototype.depend = function () {
    Dep.target.addDep(this);
  };

  /**
   * Notify all subscribers of a new value.
   */

  Dep.prototype.notify = function () {
    // stablize the subscriber list first
    var subs = toArray(this.subs);
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto)

  /**
   * Intercept mutating methods and emit events
   */

      ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      // avoid leaking arguments:
      // http://jsperf.com/closure-with-arguments
      var i = arguments.length;
      var args = new Array(i);
      while (i--) {
        args[i] = arguments[i];
      }
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
          inserted = args;
          break;
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) ob.observeArray(inserted);
      // notify change
      ob.dep.notify();
      return result;
    });
  });

  /**
   * Swap the element at the given index with a new value
   * and emits corresponding event.
   *
   * @param {Number} index
   * @param {*} val
   * @return {*} - replaced element
   */

  def(arrayProto, '$set', function $set(index, val) {
    if (index >= this.length) {
      this.length = Number(index) + 1;
    }
    return this.splice(index, 1, val)[0];
  });

  /**
   * Convenience method to remove the element at given index.
   *
   * @param {Number} index
   * @param {*} val
   */

  def(arrayProto, '$remove', function $remove(item) {
    /* istanbul ignore if */
    if (!this.length) return;
    var index = indexOf(this, item);
    if (index > -1) {
      return this.splice(index, 1);
    }
  });

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * By default, when a reactive property is set, the new value is
   * also converted to become reactive. However in certain cases, e.g.
   * v-for scope alias and props, we don't want to force conversion
   * because the value may be a nested value under a frozen data structure.
   *
   * So whenever we want to set a reactive property without forcing
   * conversion on the new value, we wrap that call inside this function.
   */

  var shouldConvert = true;

  function withoutConversion(fn) {
    shouldConvert = false;
    fn();
    shouldConvert = true;
  }

  /**
   * Observer class that are attached to each observed
   * object. Once attached, the observer converts target
   * object's property keys into getter/setters that
   * collect dependencies and dispatches updates.
   *
   * @param {Array|Object} value
   * @constructor
   */

  function Observer(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);
    if (isArray(value)) {
      var augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  // Instance methods

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   *
   * @param {Object} obj
   */

  Observer.prototype.walk = function (obj) {
    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
      this.convert(keys[i], obj[keys[i]]);
    }
  };

  /**
   * Observe a list of Array items.
   *
   * @param {Array} items
   */

  Observer.prototype.observeArray = function (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  /**
   * Convert a property into getter/setter so we can emit
   * the events when the property is accessed/changed.
   *
   * @param {String} key
   * @param {*} val
   */

  Observer.prototype.convert = function (key, val) {
    defineReactive(this.value, key, val);
  };

  /**
   * Add an owner vm, so that when $set/$delete mutations
   * happen we can notify owner vms to proxy the keys and
   * digest the watchers. This is only called when the object
   * is observed as an instance's root $data.
   *
   * @param {Vue} vm
   */

  Observer.prototype.addVm = function (vm) {
    (this.vms || (this.vms = [])).push(vm);
  };

  /**
   * Remove an owner vm. This is called when the object is
   * swapped out as an instance's $data object.
   *
   * @param {Vue} vm
   */

  Observer.prototype.removeVm = function (vm) {
    this.vms.$remove(vm);
  };

  // helpers

  /**
   * Augment an target Object or Array by intercepting
   * the prototype chain using __proto__
   *
   * @param {Object|Array} target
   * @param {Object} src
   */

  function protoAugment(target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment an target Object or Array by defining
   * hidden properties.
   *
   * @param {Object|Array} target
   * @param {Object} proto
   */

  function copyAugment(target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   *
   * @param {*} value
   * @param {Vue} [vm]
   * @return {Observer|undefined}
   * @static
   */

  function observe(value, vm) {
    if (!value || typeof value !== 'object') {
      return;
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
      ob = new Observer(value);
    }
    if (ob && vm) {
      ob.addVm(vm);
    }
    return ob;
  }

  /**
   * Define a reactive property on an Object.
   *
   * @param {Object} obj
   * @param {String} key
   * @param {*} val
   */

  function defineReactive(obj, key, val) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;

    var childOb = observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
          }
          if (isArray(value)) {
            for (var e, i = 0, l = value.length; i < l; i++) {
              e = value[i];
              e && e.__ob__ && e.__ob__.dep.depend();
            }
          }
        }
        return value;
      },
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;
        if (newVal === value) {
          return;
        }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = observe(newVal);
        dep.notify();
      }
    });
  }



  var util = Object.freeze({
    defineReactive: defineReactive,
    set: set,
    del: del,
    hasOwn: hasOwn,
    isLiteral: isLiteral,
    isReserved: isReserved,
    _toString: _toString,
    toNumber: toNumber,
    toBoolean: toBoolean,
    stripQuotes: stripQuotes,
    camelize: camelize,
    hyphenate: hyphenate,
    classify: classify,
    bind: bind,
    toArray: toArray,
    extend: extend,
    isObject: isObject,
    isPlainObject: isPlainObject,
    def: def,
    debounce: _debounce,
    indexOf: indexOf,
    cancellable: cancellable,
    looseEqual: looseEqual,
    isArray: isArray,
    hasProto: hasProto,
    inBrowser: inBrowser,
    devtools: devtools,
    isIE9: isIE9,
    isAndroid: isAndroid,
    get transitionProp () { return transitionProp; },
    get transitionEndEvent () { return transitionEndEvent; },
    get animationProp () { return animationProp; },
    get animationEndEvent () { return animationEndEvent; },
    nextTick: nextTick,
    query: query,
    inDoc: inDoc,
    getAttr: getAttr,
    getBindAttr: getBindAttr,
    hasBindAttr: hasBindAttr,
    before: before,
    after: after,
    remove: remove,
    prepend: prepend,
    replace: replace,
    on: on,
    off: off,
    setClass: setClass,
    addClass: addClass,
    removeClass: removeClass,
    extractContent: extractContent,
    trimNode: trimNode,
    isTemplate: isTemplate,
    createAnchor: createAnchor,
    findRef: findRef,
    mapNodeRange: mapNodeRange,
    removeNodeRange: removeNodeRange,
    isFragment: isFragment,
    getOuterHTML: getOuterHTML,
    mergeOptions: mergeOptions,
    resolveAsset: resolveAsset,
    assertAsset: assertAsset,
    checkComponentAttr: checkComponentAttr,
    commonTagRE: commonTagRE,
    reservedTagRE: reservedTagRE,
    get warn () { return warn; }
  });

  var uid = 0;

  function initMixin (Vue) {
    /**
     * The main init sequence. This is called for every
     * instance, including ones that are created from extended
     * constructors.
     *
     * @param {Object} options - this options object should be
     *                           the result of merging class
     *                           options and the options passed
     *                           in to the constructor.
     */

    Vue.prototype._init = function (options) {
      options = options || {};

      this.$el = null;
      this.$parent = options.parent;
      this.$root = this.$parent ? this.$parent.$root : this;
      this.$children = [];
      this.$refs = {}; // child vm references
      this.$els = {}; // element references
      this._watchers = []; // all watchers as an array
      this._directives = []; // all directives

      // a uid
      this._uid = uid++;

      // a flag to avoid this being observed
      this._isVue = true;

      // events bookkeeping
      this._events = {}; // registered callbacks
      this._eventsCount = {}; // for $broadcast optimization

      // fragment instance properties
      this._isFragment = false;
      this._fragment = // @type {DocumentFragment}
          this._fragmentStart = // @type {Text|Comment}
              this._fragmentEnd = null; // @type {Text|Comment}

      // lifecycle state
      this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
      this._unlinkFn = null;

      // context:
      // if this is a transcluded component, context
      // will be the common parent vm of this instance
      // and its host.
      this._context = options._context || this.$parent;

      // scope:
      // if this is inside an inline v-for, the scope
      // will be the intermediate scope created for this
      // repeat fragment. this is used for linking props
      // and container directives.
      this._scope = options._scope;

      // fragment:
      // if this instance is compiled inside a Fragment, it
      // needs to reigster itself as a child of that fragment
      // for attach/detach to work properly.
      this._frag = options._frag;
      if (this._frag) {
        this._frag.children.push(this);
      }

      // push self into parent / transclusion host
      if (this.$parent) {
        this.$parent.$children.push(this);
      }

      // merge options.
      options = this.$options = mergeOptions(this.constructor.options, options, this);

      // set ref
      this._updateRef();

      // initialize data as empty object.
      // it will be filled up in _initScope().
      this._data = {};

      // save raw constructor data before merge
      // so that we know which properties are provided at
      // instantiation.
      this._runtimeData = options.data;

      // call init hook
      this._callHook('init');

      // initialize data observation and scope inheritance.
      this._initState();

      // setup event system and option events.
      this._initEvents();

      // call created hook
      this._callHook('created');

      // if `el` option is passed, start compilation.
      if (options.el) {
        this.$mount(options.el);
      }
    };
  }

  var pathCache = new Cache(1000);

  // actions
  var APPEND = 0;
  var PUSH = 1;
  var INC_SUB_PATH_DEPTH = 2;
  var PUSH_SUB_PATH = 3;

  // states
  var BEFORE_PATH = 0;
  var IN_PATH = 1;
  var BEFORE_IDENT = 2;
  var IN_IDENT = 3;
  var IN_SUB_PATH = 4;
  var IN_SINGLE_QUOTE = 5;
  var IN_DOUBLE_QUOTE = 6;
  var AFTER_PATH = 7;
  var ERROR = 8;

  var pathStateMachine = [];

  pathStateMachine[BEFORE_PATH] = {
    'ws': [BEFORE_PATH],
    'ident': [IN_IDENT, APPEND],
    '[': [IN_SUB_PATH],
    'eof': [AFTER_PATH]
  };

  pathStateMachine[IN_PATH] = {
    'ws': [IN_PATH],
    '.': [BEFORE_IDENT],
    '[': [IN_SUB_PATH],
    'eof': [AFTER_PATH]
  };

  pathStateMachine[BEFORE_IDENT] = {
    'ws': [BEFORE_IDENT],
    'ident': [IN_IDENT, APPEND]
  };

  pathStateMachine[IN_IDENT] = {
    'ident': [IN_IDENT, APPEND],
    '0': [IN_IDENT, APPEND],
    'number': [IN_IDENT, APPEND],
    'ws': [IN_PATH, PUSH],
    '.': [BEFORE_IDENT, PUSH],
    '[': [IN_SUB_PATH, PUSH],
    'eof': [AFTER_PATH, PUSH]
  };

  pathStateMachine[IN_SUB_PATH] = {
    "'": [IN_SINGLE_QUOTE, APPEND],
    '"': [IN_DOUBLE_QUOTE, APPEND],
    '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
    ']': [IN_PATH, PUSH_SUB_PATH],
    'eof': ERROR,
    'else': [IN_SUB_PATH, APPEND]
  };

  pathStateMachine[IN_SINGLE_QUOTE] = {
    "'": [IN_SUB_PATH, APPEND],
    'eof': ERROR,
    'else': [IN_SINGLE_QUOTE, APPEND]
  };

  pathStateMachine[IN_DOUBLE_QUOTE] = {
    '"': [IN_SUB_PATH, APPEND],
    'eof': ERROR,
    'else': [IN_DOUBLE_QUOTE, APPEND]
  };

  /**
   * Determine the type of a character in a keypath.
   *
   * @param {Char} ch
   * @return {String} type
   */

  function getPathCharType(ch) {
    if (ch === undefined) {
      return 'eof';
    }

    var code = ch.charCodeAt(0);

    switch (code) {
      case 0x5B: // [
      case 0x5D: // ]
      case 0x2E: // .
      case 0x22: // "
      case 0x27: // '
      case 0x30:
        // 0
        return ch;

      case 0x5F: // _
      case 0x24:
        // $
        return 'ident';

      case 0x20: // Space
      case 0x09: // Tab
      case 0x0A: // Newline
      case 0x0D: // Return
      case 0xA0: // No-break space
      case 0xFEFF: // Byte Order Mark
      case 0x2028: // Line Separator
      case 0x2029:
        // Paragraph Separator
        return 'ws';
    }

    // a-z, A-Z
    if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
      return 'ident';
    }

    // 1-9
    if (code >= 0x31 && code <= 0x39) {
      return 'number';
    }

    return 'else';
  }

  /**
   * Format a subPath, return its plain form if it is
   * a literal string or number. Otherwise prepend the
   * dynamic indicator (*).
   *
   * @param {String} path
   * @return {String}
   */

  function formatSubPath(path) {
    var trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(path)) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
  }

  /**
   * Parse a string path into an array of segments
   *
   * @param {String} path
   * @return {Array|undefined}
   */

  function parse(path) {
    var keys = [];
    var index = -1;
    var mode = BEFORE_PATH;
    var subPathDepth = 0;
    var c, newChar, key, type, transition, action, typeMap;

    var actions = [];

    actions[PUSH] = function () {
      if (key !== undefined) {
        keys.push(key);
        key = undefined;
      }
    };

    actions[APPEND] = function () {
      if (key === undefined) {
        key = newChar;
      } else {
        key += newChar;
      }
    };

    actions[INC_SUB_PATH_DEPTH] = function () {
      actions[APPEND]();
      subPathDepth++;
    };

    actions[PUSH_SUB_PATH] = function () {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = IN_SUB_PATH;
        actions[APPEND]();
      } else {
        subPathDepth = 0;
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[PUSH]();
        }
      }
    };

    function maybeUnescapeQuote() {
      var nextChar = path[index + 1];
      if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
        index++;
        newChar = '\\' + nextChar;
        actions[APPEND]();
        return true;
      }
    }

    while (mode != null) {
      index++;
      c = path[index];

      if (c === '\\' && maybeUnescapeQuote()) {
        continue;
      }

      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap['else'] || ERROR;

      if (transition === ERROR) {
        return; // parse error
      }

      mode = transition[0];
      action = actions[transition[1]];
      if (action) {
        newChar = transition[2];
        newChar = newChar === undefined ? c : newChar;
        if (action() === false) {
          return;
        }
      }

      if (mode === AFTER_PATH) {
        keys.raw = path;
        return keys;
      }
    }
  }

  /**
   * External parse that check for a cache hit first
   *
   * @param {String} path
   * @return {Array|undefined}
   */

  function parsePath(path) {
    var hit = pathCache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        pathCache.put(path, hit);
      }
    }
    return hit;
  }

  /**
   * Get from an object from a path string
   *
   * @param {Object} obj
   * @param {String} path
   */

  function getPath(obj, path) {
    return parseExpression(path).get(obj);
  }

  /**
   * Warn against setting non-existent root path on a vm.
   */

  var warnNonExistent;
  if ('development' !== 'production') {
    warnNonExistent = function (path) {
      warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
    };
  }

  /**
   * Set on an object from a path
   *
   * @param {Object} obj
   * @param {String | Array} path
   * @param {*} val
   */

  function setPath(obj, path, val) {
    var original = obj;
    if (typeof path === 'string') {
      path = parse(path);
    }
    if (!path || !isObject(obj)) {
      return false;
    }
    var last, key;
    for (var i = 0, l = path.length; i < l; i++) {
      last = obj;
      key = path[i];
      if (key.charAt(0) === '*') {
        key = parseExpression(key.slice(1)).get.call(original, original);
      }
      if (i < l - 1) {
        obj = obj[key];
        if (!isObject(obj)) {
          obj = {};
          if ('development' !== 'production' && last._isVue) {
            warnNonExistent(path);
          }
          set(last, key, obj);
        }
      } else {
        if (isArray(obj)) {
          obj.$set(key, val);
        } else if (key in obj) {
          obj[key] = val;
        } else {
          if ('development' !== 'production' && obj._isVue) {
            warnNonExistent(path);
          }
          set(obj, key, val);
        }
      }
    }
    return true;
  }

  var path = Object.freeze({
    parsePath: parsePath,
    getPath: getPath,
    setPath: setPath
  });

  var expressionCache = new Cache(1000);

  var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
  var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

  // keywords that don't make sense inside expressions
  var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
  var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

  var wsRE = /\s/g;
  var newlineRE = /\n/g;
  var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
  var restoreRE = /"(\d+)"/g;
  var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
  var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
  var booleanLiteralRE = /^(?:true|false)$/;

  /**
   * Save / Rewrite / Restore
   *
   * When rewriting paths found in an expression, it is
   * possible for the same letter sequences to be found in
   * strings and Object literal property keys. Therefore we
   * remove and store these parts in a temporary array, and
   * restore them after the path rewrite.
   */

  var saved = [];

  /**
   * Save replacer
   *
   * The save regex can match two possible cases:
   * 1. An opening object literal
   * 2. A string
   * If matched as a plain string, we need to escape its
   * newlines, since the string needs to be preserved when
   * generating the function body.
   *
   * @param {String} str
   * @param {String} isString - str if matched as a string
   * @return {String} - placeholder with index
   */

  function save(str, isString) {
    var i = saved.length;
    saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
    return '"' + i + '"';
  }

  /**
   * Path rewrite replacer
   *
   * @param {String} raw
   * @return {String}
   */

  function rewrite(raw) {
    var c = raw.charAt(0);
    var path = raw.slice(1);
    if (allowedKeywordsRE.test(path)) {
      return raw;
    } else {
      path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
      return c + 'scope.' + path;
    }
  }

  /**
   * Restore replacer
   *
   * @param {String} str
   * @param {String} i - matched save index
   * @return {String}
   */

  function restore(str, i) {
    return saved[i];
  }

  /**
   * Rewrite an expression, prefixing all path accessors with
   * `scope.` and generate getter/setter functions.
   *
   * @param {String} exp
   * @return {Function}
   */

  function compileGetter(exp) {
    if (improperKeywordsRE.test(exp)) {
      'development' !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
    }
    // reset state
    saved.length = 0;
    // save strings and object literal keys
    var body = exp.replace(saveRE, save).replace(wsRE, '');
    // rewrite all paths
    // pad 1 space here becaue the regex matches 1 extra char
    body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
    return makeGetterFn(body);
  }

  /**
   * Build a getter function. Requires eval.
   *
   * We isolate the try/catch so it doesn't affect the
   * optimization of the parse function when it is not called.
   *
   * @param {String} body
   * @return {Function|undefined}
   */

  function makeGetterFn(body) {
    try {
      /* eslint-disable no-new-func */
      return new Function('scope', 'return ' + body + ';');
      /* eslint-enable no-new-func */
    } catch (e) {
      'development' !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
    }
  }

  /**
   * Compile a setter function for the expression.
   *
   * @param {String} exp
   * @return {Function|undefined}
   */

  function compileSetter(exp) {
    var path = parsePath(exp);
    if (path) {
      return function (scope, val) {
        setPath(scope, path, val);
      };
    } else {
      'development' !== 'production' && warn('Invalid setter expression: ' + exp);
    }
  }

  /**
   * Parse an expression into re-written getter/setters.
   *
   * @param {String} exp
   * @param {Boolean} needSet
   * @return {Function}
   */

  function parseExpression(exp, needSet) {
    exp = exp.trim();
    // try cache
    var hit = expressionCache.get(exp);
    if (hit) {
      if (needSet && !hit.set) {
        hit.set = compileSetter(hit.exp);
      }
      return hit;
    }
    var res = { exp: exp };
    res.get = isSimplePath(exp) && exp.indexOf('[') < 0
      // optimized super simple getter
        ? makeGetterFn('scope.' + exp)
      // dynamic getter
        : compileGetter(exp);
    if (needSet) {
      res.set = compileSetter(exp);
    }
    expressionCache.put(exp, res);
    return res;
  }

  /**
   * Check if an expression is a simple path.
   *
   * @param {String} exp
   * @return {Boolean}
   */

  function isSimplePath(exp) {
    return pathTestRE.test(exp) &&
          // don't treat true/false as paths
        !booleanLiteralRE.test(exp) &&
          // Math constants e.g. Math.PI, Math.E etc.
        exp.slice(0, 5) !== 'Math.';
  }

  var expression = Object.freeze({
    parseExpression: parseExpression,
    isSimplePath: isSimplePath
  });

  // we have two separate queues: one for directive updates
  // and one for user watcher registered via $watch().
  // we want to guarantee directive updates to be called
  // before user watchers so that when user watchers are
  // triggered, the DOM would have already been in updated
  // state.

  var queueIndex;
  var queue = [];
  var userQueue = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var internalQueueDepleted = false;

  /**
   * Reset the batcher's state.
   */

  function resetBatcherState() {
    queue = [];
    userQueue = [];
    has = {};
    circular = {};
    waiting = internalQueueDepleted = false;
  }

  /**
   * Flush both queues and run the watchers.
   */

  function flushBatcherQueue() {
    runBatcherQueue(queue);
    internalQueueDepleted = true;
    runBatcherQueue(userQueue);
    // dev tool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
    resetBatcherState();
  }

  /**
   * Run the watchers in a single queue.
   *
   * @param {Array} queue
   */

  function runBatcherQueue(queue) {
    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
      var watcher = queue[queueIndex];
      var id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if ('development' !== 'production' && has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > config._maxUpdateCount) {
          queue.splice(has[id], 1);
          warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
        }
      }
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   *
   * @param {Watcher} watcher
   *   properties:
   *   - {Number} id
   *   - {Function} run
   */

  function pushWatcher(watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      if (internalQueueDepleted && !watcher.user) {
        // an internal watcher triggered by a user watcher...
        // let's run it immediately after current user watcher is done.
        userQueue.splice(queueIndex + 1, 0, watcher);
      } else {
        // push watcher into appropriate queue
        var q = watcher.user ? userQueue : queue;
        has[id] = q.length;
        q.push(watcher);
        // queue the flush
        if (!waiting) {
          waiting = true;
          nextTick(flushBatcherQueue);
        }
      }
    }
  }

  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   *
   * @param {Vue} vm
   * @param {String|Function} expOrFn
   * @param {Function} cb
   * @param {Object} options
   *                 - {Array} filters
   *                 - {Boolean} twoWay
   *                 - {Boolean} deep
   *                 - {Boolean} user
   *                 - {Boolean} sync
   *                 - {Boolean} lazy
   *                 - {Function} [preProcess]
   *                 - {Function} [postProcess]
   * @constructor
   */
  function Watcher(vm, expOrFn, cb, options) {
    // mix in options
    if (options) {
      extend(this, options);
    }
    var isFn = typeof expOrFn === 'function';
    this.vm = vm;
    vm._watchers.push(this);
    this.expression = expOrFn;
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = Object.create(null);
    this.newDepIds = null;
    this.prevError = null; // for async error stacks
    // parse expression for getter/setter
    if (isFn) {
      this.getter = expOrFn;
      this.setter = undefined;
    } else {
      var res = parseExpression(expOrFn, this.twoWay);
      this.getter = res.get;
      this.setter = res.set;
    }
    this.value = this.lazy ? undefined : this.get();
    // state for avoiding false triggers for deep and Array
    // watchers during vm._digest()
    this.queued = this.shallow = false;
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */

  Watcher.prototype.get = function () {
    this.beforeGet();
    var scope = this.scope || this.vm;
    var value;
    try {
      value = this.getter.call(scope, scope);
    } catch (e) {
      if ('development' !== 'production' && config.warnExpressionErrors) {
        warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
      }
    }
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    if (this.preProcess) {
      value = this.preProcess(value);
    }
    if (this.filters) {
      value = scope._applyFilters(value, null, this.filters, false);
    }
    if (this.postProcess) {
      value = this.postProcess(value);
    }
    this.afterGet();
    return value;
  };

  /**
   * Set the corresponding value with the setter.
   *
   * @param {*} value
   */

  Watcher.prototype.set = function (value) {
    var scope = this.scope || this.vm;
    if (this.filters) {
      value = scope._applyFilters(value, this.value, this.filters, true);
    }
    try {
      this.setter.call(scope, scope, value);
    } catch (e) {
      if ('development' !== 'production' && config.warnExpressionErrors) {
        warn('Error when evaluating setter "' + this.expression + '"', e);
      }
    }
    // two-way sync for v-for alias
    var forContext = scope.$forContext;
    if (forContext && forContext.alias === this.expression) {
      if (forContext.filters) {
        'development' !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
        return;
      }
      forContext._withLock(function () {
        if (scope.$key) {
          // original is an object
          forContext.rawValue[scope.$key] = value;
        } else {
          forContext.rawValue.$set(scope.$index, value);
        }
      });
    }
  };

  /**
   * Prepare for dependency collection.
   */

  Watcher.prototype.beforeGet = function () {
    Dep.target = this;
    this.newDepIds = Object.create(null);
    this.newDeps.length = 0;
  };

  /**
   * Add a dependency to this directive.
   *
   * @param {Dep} dep
   */

  Watcher.prototype.addDep = function (dep) {
    var id = dep.id;
    if (!this.newDepIds[id]) {
      this.newDepIds[id] = true;
      this.newDeps.push(dep);
      if (!this.depIds[id]) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */

  Watcher.prototype.afterGet = function () {
    Dep.target = null;
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds[dep.id]) {
        dep.removeSub(this);
      }
    }
    this.depIds = this.newDepIds;
    var tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   *
   * @param {Boolean} shallow
   */

  Watcher.prototype.update = function (shallow) {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync || !config.async) {
      this.run();
    } else {
      // if queued, only overwrite shallow with non-shallow,
      // but not the other way around.
      this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
      this.queued = true;
      // record before-push error stack in debug mode
      /* istanbul ignore if */
      if ('development' !== 'production' && config.debug) {
        this.prevError = new Error('[vue] async stack trace');
      }
      pushWatcher(this);
    }
  };

  /**
   * Batcher job interface.
   * Will be called by the batcher.
   */

  Watcher.prototype.run = function () {
    if (this.active) {
      var value = this.get();
      if (value !== this.value ||
            // Deep watchers and watchers on Object/Arrays should fire even
            // when the value is the same, because the value may
            // have mutated; but only do so if this is a
            // non-shallow update (caused by a vm digest).
          (isObject(value) || this.deep) && !this.shallow) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        // in debug + async mode, when a watcher callbacks
        // throws, we also throw the saved before-push error
        // so the full cross-tick stack trace is available.
        var prevError = this.prevError;
        /* istanbul ignore if */
        if ('development' !== 'production' && config.debug && prevError) {
          this.prevError = null;
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            nextTick(function () {
              throw prevError;
            }, 0);
            throw e;
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
      this.queued = this.shallow = false;
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */

  Watcher.prototype.evaluate = function () {
    // avoid overwriting another watcher that is being
    // collected.
    var current = Dep.target;
    this.value = this.get();
    this.dirty = false;
    Dep.target = current;
  };

  /**
   * Depend on all deps collected by this watcher.
   */

  Watcher.prototype.depend = function () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subcriber list.
   */

  Watcher.prototype.teardown = function () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed or is performing a v-for
      // re-render (the watcher list is then filtered by v-for).
      if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
        this.vm._watchers.$remove(this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
      this.vm = this.cb = this.value = null;
    }
  };

  /**
   * Recrusively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   *
   * @param {*} val
   */

  function traverse(val) {
    var i, keys;
    if (isArray(val)) {
      i = val.length;
      while (i--) traverse(val[i]);
    } else if (isObject(val)) {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) traverse(val[keys[i]]);
    }
  }

  var text$1 = {

    bind: function bind() {
      this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
    },

    update: function update(value) {
      this.el[this.attr] = _toString(value);
    }
  };

  var templateCache = new Cache(1000);
  var idSelectorCache = new Cache(1000);

  var map = {
    efault: [0, '', ''],
    legend: [1, '<fieldset>', '</fieldset>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
  };

  map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

  map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

  map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

  map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

  /**
   * Check if a node is a supported template node with a
   * DocumentFragment content.
   *
   * @param {Node} node
   * @return {Boolean}
   */

  function isRealTemplate(node) {
    return isTemplate(node) && isFragment(node.content);
  }

  var tagRE$1 = /<([\w:-]+)/;
  var entityRE = /&#?\w+?;/;

  /**
   * Convert a string template to a DocumentFragment.
   * Determines correct wrapping by tag types. Wrapping
   * strategy found in jQuery & component/domify.
   *
   * @param {String} templateString
   * @param {Boolean} raw
   * @return {DocumentFragment}
   */

  function stringToFragment(templateString, raw) {
    // try a cache hit first
    var cacheKey = raw ? templateString : templateString.trim();
    var hit = templateCache.get(cacheKey);
    if (hit) {
      return hit;
    }

    var frag = document.createDocumentFragment();
    var tagMatch = templateString.match(tagRE$1);
    var entityMatch = entityRE.test(templateString);

    if (!tagMatch && !entityMatch) {
      // text only, return a single text node.
      frag.appendChild(document.createTextNode(templateString));
    } else {
      var tag = tagMatch && tagMatch[1];
      var wrap = map[tag] || map.efault;
      var depth = wrap[0];
      var prefix = wrap[1];
      var suffix = wrap[2];
      var node = document.createElement('div');

      node.innerHTML = prefix + templateString + suffix;
      while (depth--) {
        node = node.lastChild;
      }

      var child;
      /* eslint-disable no-cond-assign */
      while (child = node.firstChild) {
        /* eslint-enable no-cond-assign */
        frag.appendChild(child);
      }
    }
    if (!raw) {
      trimNode(frag);
    }
    templateCache.put(cacheKey, frag);
    return frag;
  }

  /**
   * Convert a template node to a DocumentFragment.
   *
   * @param {Node} node
   * @return {DocumentFragment}
   */

  function nodeToFragment(node) {
    // if its a template tag and the browser supports it,
    // its content is already a document fragment.
    if (isRealTemplate(node)) {
      trimNode(node.content);
      return node.content;
    }
    // script template
    if (node.tagName === 'SCRIPT') {
      return stringToFragment(node.textContent);
    }
    // normal node, clone it to avoid mutating the original
    var clonedNode = cloneNode(node);
    var frag = document.createDocumentFragment();
    var child;
    /* eslint-disable no-cond-assign */
    while (child = clonedNode.firstChild) {
      /* eslint-enable no-cond-assign */
      frag.appendChild(child);
    }
    trimNode(frag);
    return frag;
  }

  // Test for the presence of the Safari template cloning bug
  // https://bugs.webkit.org/showug.cgi?id=137755
  var hasBrokenTemplate = (function () {
    /* istanbul ignore else */
    if (inBrowser) {
      var a = document.createElement('div');
      a.innerHTML = '<template>1</template>';
      return !a.cloneNode(true).firstChild.innerHTML;
    } else {
      return false;
    }
  })();

  // Test for IE10/11 textarea placeholder clone bug
  var hasTextareaCloneBug = (function () {
    /* istanbul ignore else */
    if (inBrowser) {
      var t = document.createElement('textarea');
      t.placeholder = 't';
      return t.cloneNode(true).value === 't';
    } else {
      return false;
    }
  })();

  /**
   * 1. Deal with Safari cloning nested <template> bug by
   *    manually cloning all template instances.
   * 2. Deal with IE10/11 textarea placeholder bug by setting
   *    the correct value after cloning.
   *
   * @param {Element|DocumentFragment} node
   * @return {Element|DocumentFragment}
   */

  function cloneNode(node) {
    /* istanbul ignore if */
    if (!node.querySelectorAll) {
      return node.cloneNode();
    }
    var res = node.cloneNode(true);
    var i, original, cloned;
    /* istanbul ignore if */
    if (hasBrokenTemplate) {
      var tempClone = res;
      if (isRealTemplate(node)) {
        node = node.content;
        tempClone = res.content;
      }
      original = node.querySelectorAll('template');
      if (original.length) {
        cloned = tempClone.querySelectorAll('template');
        i = cloned.length;
        while (i--) {
          cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
        }
      }
    }
    /* istanbul ignore if */
    if (hasTextareaCloneBug) {
      if (node.tagName === 'TEXTAREA') {
        res.value = node.value;
      } else {
        original = node.querySelectorAll('textarea');
        if (original.length) {
          cloned = res.querySelectorAll('textarea');
          i = cloned.length;
          while (i--) {
            cloned[i].value = original[i].value;
          }
        }
      }
    }
    return res;
  }

  /**
   * Process the template option and normalizes it into a
   * a DocumentFragment that can be used as a partial or a
   * instance template.
   *
   * @param {*} template
   *        Possible values include:
   *        - DocumentFragment object
   *        - Node object of type Template
   *        - id selector: '#some-template-id'
   *        - template string: '<div><span>{{msg}}</span></div>'
   * @param {Boolean} shouldClone
   * @param {Boolean} raw
   *        inline HTML interpolation. Do not check for id
   *        selector and keep whitespace in the string.
   * @return {DocumentFragment|undefined}
   */

  function parseTemplate(template, shouldClone, raw) {
    var node, frag;

    // if the template is already a document fragment,
    // do nothing
    if (isFragment(template)) {
      trimNode(template);
      return shouldClone ? cloneNode(template) : template;
    }

    if (typeof template === 'string') {
      // id selector
      if (!raw && template.charAt(0) === '#') {
        // id selector can be cached too
        frag = idSelectorCache.get(template);
        if (!frag) {
          node = document.getElementById(template.slice(1));
          if (node) {
            frag = nodeToFragment(node);
            // save selector to cache
            idSelectorCache.put(template, frag);
          }
        }
      } else {
        // normal string template
        frag = stringToFragment(template, raw);
      }
    } else if (template.nodeType) {
      // a direct node
      frag = nodeToFragment(template);
    }

    return frag && shouldClone ? cloneNode(frag) : frag;
  }

  var template = Object.freeze({
    cloneNode: cloneNode,
    parseTemplate: parseTemplate
  });

  var html = {

    bind: function bind() {
      // a comment node means this is a binding for
      // {{{ inline unescaped html }}}
      if (this.el.nodeType === 8) {
        // hold nodes
        this.nodes = [];
        // replace the placeholder with proper anchor
        this.anchor = createAnchor('v-html');
        replace(this.el, this.anchor);
      }
    },

    update: function update(value) {
      value = _toString(value);
      if (this.nodes) {
        this.swap(value);
      } else {
        this.el.innerHTML = value;
      }
    },

    swap: function swap(value) {
      // remove old nodes
      var i = this.nodes.length;
      while (i--) {
        remove(this.nodes[i]);
      }
      // convert new value to a fragment
      // do not attempt to retrieve from id selector
      var frag = parseTemplate(value, true, true);
      // save a reference to these nodes so we can remove later
      this.nodes = toArray(frag.childNodes);
      before(frag, this.anchor);
    }
  };

  /**
   * Abstraction for a partially-compiled fragment.
   * Can optionally compile content with a child scope.
   *
   * @param {Function} linker
   * @param {Vue} vm
   * @param {DocumentFragment} frag
   * @param {Vue} [host]
   * @param {Object} [scope]
   * @param {Fragment} [parentFrag]
   */
  function Fragment(linker, vm, frag, host, scope, parentFrag) {
    this.children = [];
    this.childFrags = [];
    this.vm = vm;
    this.scope = scope;
    this.inserted = false;
    this.parentFrag = parentFrag;
    if (parentFrag) {
      parentFrag.childFrags.push(this);
    }
    this.unlink = linker(vm, frag, host, scope, this);
    var single = this.single = frag.childNodes.length === 1 &&
          // do not go single mode if the only node is an anchor
        !frag.childNodes[0].__v_anchor;
    if (single) {
      this.node = frag.childNodes[0];
      this.before = singleBefore;
      this.remove = singleRemove;
    } else {
      this.node = createAnchor('fragment-start');
      this.end = createAnchor('fragment-end');
      this.frag = frag;
      prepend(this.node, frag);
      frag.appendChild(this.end);
      this.before = multiBefore;
      this.remove = multiRemove;
    }
    this.node.__v_frag = this;
  }

  /**
   * Call attach/detach for all components contained within
   * this fragment. Also do so recursively for all child
   * fragments.
   *
   * @param {Function} hook
   */

  Fragment.prototype.callHook = function (hook) {
    var i, l;
    for (i = 0, l = this.childFrags.length; i < l; i++) {
      this.childFrags[i].callHook(hook);
    }
    for (i = 0, l = this.children.length; i < l; i++) {
      hook(this.children[i]);
    }
  };

  /**
   * Insert fragment before target, single node version
   *
   * @param {Node} target
   * @param {Boolean} withTransition
   */

  function singleBefore(target, withTransition) {
    this.inserted = true;
    var method = withTransition !== false ? beforeWithTransition : before;
    method(this.node, target, this.vm);
    if (inDoc(this.node)) {
      this.callHook(attach);
    }
  }

  /**
   * Remove fragment, single node version
   */

  function singleRemove() {
    this.inserted = false;
    var shouldCallRemove = inDoc(this.node);
    var self = this;
    this.beforeRemove();
    removeWithTransition(this.node, this.vm, function () {
      if (shouldCallRemove) {
        self.callHook(detach);
      }
      self.destroy();
    });
  }

  /**
   * Insert fragment before target, multi-nodes version
   *
   * @param {Node} target
   * @param {Boolean} withTransition
   */

  function multiBefore(target, withTransition) {
    this.inserted = true;
    var vm = this.vm;
    var method = withTransition !== false ? beforeWithTransition : before;
    mapNodeRange(this.node, this.end, function (node) {
      method(node, target, vm);
    });
    if (inDoc(this.node)) {
      this.callHook(attach);
    }
  }

  /**
   * Remove fragment, multi-nodes version
   */

  function multiRemove() {
    this.inserted = false;
    var self = this;
    var shouldCallRemove = inDoc(this.node);
    this.beforeRemove();
    removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
      if (shouldCallRemove) {
        self.callHook(detach);
      }
      self.destroy();
    });
  }

  /**
   * Prepare the fragment for removal.
   */

  Fragment.prototype.beforeRemove = function () {
    var i, l;
    for (i = 0, l = this.childFrags.length; i < l; i++) {
      // call the same method recursively on child
      // fragments, depth-first
      this.childFrags[i].beforeRemove(false);
    }
    for (i = 0, l = this.children.length; i < l; i++) {
      // Call destroy for all contained instances,
      // with remove:false and defer:true.
      // Defer is necessary because we need to
      // keep the children to call detach hooks
      // on them.
      this.children[i].$destroy(false, true);
    }
    var dirs = this.unlink.dirs;
    for (i = 0, l = dirs.length; i < l; i++) {
      // disable the watchers on all the directives
      // so that the rendered content stays the same
      // during removal.
      dirs[i]._watcher && dirs[i]._watcher.teardown();
    }
  };

  /**
   * Destroy the fragment.
   */

  Fragment.prototype.destroy = function () {
    if (this.parentFrag) {
      this.parentFrag.childFrags.$remove(this);
    }
    this.node.__v_frag = null;
    this.unlink();
  };

  /**
   * Call attach hook for a Vue instance.
   *
   * @param {Vue} child
   */

  function attach(child) {
    if (!child._isAttached && inDoc(child.$el)) {
      child._callHook('attached');
    }
  }

  /**
   * Call detach hook for a Vue instance.
   *
   * @param {Vue} child
   */

  function detach(child) {
    if (child._isAttached && !inDoc(child.$el)) {
      child._callHook('detached');
    }
  }

  var linkerCache = new Cache(5000);

  /**
   * A factory that can be used to create instances of a
   * fragment. Caches the compiled linker if possible.
   *
   * @param {Vue} vm
   * @param {Element|String} el
   */
  function FragmentFactory(vm, el) {
    this.vm = vm;
    var template;
    var isString = typeof el === 'string';
    if (isString || isTemplate(el)) {
      template = parseTemplate(el, true);
    } else {
      template = document.createDocumentFragment();
      template.appendChild(el);
    }
    this.template = template;
    // linker can be cached, but only for components
    var linker;
    var cid = vm.constructor.cid;
    if (cid > 0) {
      var cacheId = cid + (isString ? el : getOuterHTML(el));
      linker = linkerCache.get(cacheId);
      if (!linker) {
        linker = compile(template, vm.$options, true);
        linkerCache.put(cacheId, linker);
      }
    } else {
      linker = compile(template, vm.$options, true);
    }
    this.linker = linker;
  }

  /**
   * Create a fragment instance with given host and scope.
   *
   * @param {Vue} host
   * @param {Object} scope
   * @param {Fragment} parentFrag
   */

  FragmentFactory.prototype.create = function (host, scope, parentFrag) {
    var frag = cloneNode(this.template);
    return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
  };

  var ON = 700;
  var MODEL = 800;
  var BIND = 850;
  var TRANSITION = 1100;
  var EL = 1500;
  var COMPONENT = 1500;
  var PARTIAL = 1750;
  var FOR = 2000;
  var IF = 2000;
  var SLOT = 2100;

  var uid$3 = 0;

  var vFor = {

    priority: FOR,
    terminal: true,

    params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

    bind: function bind() {
      // support "item in/of items" syntax
      var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
      if (inMatch) {
        var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
        if (itMatch) {
          this.iterator = itMatch[1].trim();
          this.alias = itMatch[2].trim();
        } else {
          this.alias = inMatch[1].trim();
        }
        this.expression = inMatch[2];
      }

      if (!this.alias) {
        'development' !== 'production' && warn('Alias is required in v-for.');
        return;
      }

      // uid as a cache identifier
      this.id = '__v-for__' + ++uid$3;

      // check if this is an option list,
      // so that we know if we need to update the <select>'s
      // v-model when the option list has changed.
      // because v-model has a lower priority than v-for,
      // the v-model is not bound here yet, so we have to
      // retrive it in the actual updateModel() function.
      var tag = this.el.tagName;
      this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

      // setup anchor nodes
      this.start = createAnchor('v-for-start');
      this.end = createAnchor('v-for-end');
      replace(this.el, this.end);
      before(this.start, this.end);

      // cache
      this.cache = Object.create(null);

      // fragment factory
      this.factory = new FragmentFactory(this.vm, this.el);
    },

    update: function update(data) {
      this.diff(data);
      this.updateRef();
      this.updateModel();
    },

    /**
     * Diff, based on new data and old data, determine the
     * minimum amount of DOM manipulations needed to make the
     * DOM reflect the new data Array.
     *
     * The algorithm diffs the new data Array by storing a
     * hidden reference to an owner vm instance on previously
     * seen data. This allows us to achieve O(n) which is
     * better than a levenshtein distance based algorithm,
     * which is O(m * n).
     *
     * @param {Array} data
     */

    diff: function diff(data) {
      // check if the Array was converted from an Object
      var item = data[0];
      var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

      var trackByKey = this.params.trackBy;
      var oldFrags = this.frags;
      var frags = this.frags = new Array(data.length);
      var alias = this.alias;
      var iterator = this.iterator;
      var start = this.start;
      var end = this.end;
      var inDocument = inDoc(start);
      var init = !oldFrags;
      var i, l, frag, key, value, primitive;

      // First pass, go through the new Array and fill up
      // the new frags array. If a piece of data has a cached
      // instance for it, we reuse it. Otherwise build a new
      // instance.
      for (i = 0, l = data.length; i < l; i++) {
        item = data[i];
        key = convertedFromObject ? item.$key : null;
        value = convertedFromObject ? item.$value : item;
        primitive = !isObject(value);
        frag = !init && this.getCachedFrag(value, i, key);
        if (frag) {
          // reusable fragment
          frag.reused = true;
          // update $index
          frag.scope.$index = i;
          // update $key
          if (key) {
            frag.scope.$key = key;
          }
          // update iterator
          if (iterator) {
            frag.scope[iterator] = key !== null ? key : i;
          }
          // update data for track-by, object repeat &
          // primitive values.
          if (trackByKey || convertedFromObject || primitive) {
            withoutConversion(function () {
              frag.scope[alias] = value;
            });
          }
        } else {
          // new isntance
          frag = this.create(value, alias, i, key);
          frag.fresh = !init;
        }
        frags[i] = frag;
        if (init) {
          frag.before(end);
        }
      }

      // we're done for the initial render.
      if (init) {
        return;
      }

      // Second pass, go through the old fragments and
      // destroy those who are not reused (and remove them
      // from cache)
      var removalIndex = 0;
      var totalRemoved = oldFrags.length - frags.length;
      // when removing a large number of fragments, watcher removal
      // turns out to be a perf bottleneck, so we batch the watcher
      // removals into a single filter call!
      this.vm._vForRemoving = true;
      for (i = 0, l = oldFrags.length; i < l; i++) {
        frag = oldFrags[i];
        if (!frag.reused) {
          this.deleteCachedFrag(frag);
          this.remove(frag, removalIndex++, totalRemoved, inDocument);
        }
      }
      this.vm._vForRemoving = false;
      if (removalIndex) {
        this.vm._watchers = this.vm._watchers.filter(function (w) {
          return w.active;
        });
      }

      // Final pass, move/insert new fragments into the
      // right place.
      var targetPrev, prevEl, currentPrev;
      var insertionIndex = 0;
      for (i = 0, l = frags.length; i < l; i++) {
        frag = frags[i];
        // this is the frag that we should be after
        targetPrev = frags[i - 1];
        prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
        if (frag.reused && !frag.staggerCb) {
          currentPrev = findPrevFrag(frag, start, this.id);
          if (currentPrev !== targetPrev && (!currentPrev ||
                // optimization for moving a single item.
                // thanks to suggestions by @livoras in #1807
              findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
            this.move(frag, prevEl);
          }
        } else {
          // new instance, or still in stagger.
          // insert with updated stagger index.
          this.insert(frag, insertionIndex++, prevEl, inDocument);
        }
        frag.reused = frag.fresh = false;
      }
    },

    /**
     * Create a new fragment instance.
     *
     * @param {*} value
     * @param {String} alias
     * @param {Number} index
     * @param {String} [key]
     * @return {Fragment}
     */

    create: function create(value, alias, index, key) {
      var host = this._host;
      // create iteration scope
      var parentScope = this._scope || this.vm;
      var scope = Object.create(parentScope);
      // ref holder for the scope
      scope.$refs = Object.create(parentScope.$refs);
      scope.$els = Object.create(parentScope.$els);
      // make sure point $parent to parent scope
      scope.$parent = parentScope;
      // for two-way binding on alias
      scope.$forContext = this;
      // define scope properties
      // important: define the scope alias without forced conversion
      // so that frozen data structures remain non-reactive.
      withoutConversion(function () {
        defineReactive(scope, alias, value);
      });
      defineReactive(scope, '$index', index);
      if (key) {
        defineReactive(scope, '$key', key);
      } else if (scope.$key) {
        // avoid accidental fallback
        def(scope, '$key', null);
      }
      if (this.iterator) {
        defineReactive(scope, this.iterator, key !== null ? key : index);
      }
      var frag = this.factory.create(host, scope, this._frag);
      frag.forId = this.id;
      this.cacheFrag(value, frag, index, key);
      return frag;
    },

    /**
     * Update the v-ref on owner vm.
     */

    updateRef: function updateRef() {
      var ref = this.descriptor.ref;
      if (!ref) return;
      var hash = (this._scope || this.vm).$refs;
      var refs;
      if (!this.fromObject) {
        refs = this.frags.map(findVmFromFrag);
      } else {
        refs = {};
        this.frags.forEach(function (frag) {
          refs[frag.scope.$key] = findVmFromFrag(frag);
        });
      }
      hash[ref] = refs;
    },

    /**
     * For option lists, update the containing v-model on
     * parent <select>.
     */

    updateModel: function updateModel() {
      if (this.isOption) {
        var parent = this.start.parentNode;
        var model = parent && parent.__v_model;
        if (model) {
          model.forceUpdate();
        }
      }
    },

    /**
     * Insert a fragment. Handles staggering.
     *
     * @param {Fragment} frag
     * @param {Number} index
     * @param {Node} prevEl
     * @param {Boolean} inDocument
     */

    insert: function insert(frag, index, prevEl, inDocument) {
      if (frag.staggerCb) {
        frag.staggerCb.cancel();
        frag.staggerCb = null;
      }
      var staggerAmount = this.getStagger(frag, index, null, 'enter');
      if (inDocument && staggerAmount) {
        // create an anchor and insert it synchronously,
        // so that we can resolve the correct order without
        // worrying about some elements not inserted yet
        var anchor = frag.staggerAnchor;
        if (!anchor) {
          anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
          anchor.__v_frag = frag;
        }
        after(anchor, prevEl);
        var op = frag.staggerCb = cancellable(function () {
          frag.staggerCb = null;
          frag.before(anchor);
          remove(anchor);
        });
        setTimeout(op, staggerAmount);
      } else {
        frag.before(prevEl.nextSibling);
      }
    },

    /**
     * Remove a fragment. Handles staggering.
     *
     * @param {Fragment} frag
     * @param {Number} index
     * @param {Number} total
     * @param {Boolean} inDocument
     */

    remove: function remove(frag, index, total, inDocument) {
      if (frag.staggerCb) {
        frag.staggerCb.cancel();
        frag.staggerCb = null;
        // it's not possible for the same frag to be removed
        // twice, so if we have a pending stagger callback,
        // it means this frag is queued for enter but removed
        // before its transition started. Since it is already
        // destroyed, we can just leave it in detached state.
        return;
      }
      var staggerAmount = this.getStagger(frag, index, total, 'leave');
      if (inDocument && staggerAmount) {
        var op = frag.staggerCb = cancellable(function () {
          frag.staggerCb = null;
          frag.remove();
        });
        setTimeout(op, staggerAmount);
      } else {
        frag.remove();
      }
    },

    /**
     * Move a fragment to a new position.
     * Force no transition.
     *
     * @param {Fragment} frag
     * @param {Node} prevEl
     */

    move: function move(frag, prevEl) {
      // fix a common issue with Sortable:
      // if prevEl doesn't have nextSibling, this means it's
      // been dragged after the end anchor. Just re-position
      // the end anchor to the end of the container.
      /* istanbul ignore if */
      if (!prevEl.nextSibling) {
        this.end.parentNode.appendChild(this.end);
      }
      frag.before(prevEl.nextSibling, false);
    },

    /**
     * Cache a fragment using track-by or the object key.
     *
     * @param {*} value
     * @param {Fragment} frag
     * @param {Number} index
     * @param {String} [key]
     */

    cacheFrag: function cacheFrag(value, frag, index, key) {
      var trackByKey = this.params.trackBy;
      var cache = this.cache;
      var primitive = !isObject(value);
      var id;
      if (key || trackByKey || primitive) {
        id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
        if (!cache[id]) {
          cache[id] = frag;
        } else if (trackByKey !== '$index') {
          'development' !== 'production' && this.warnDuplicate(value);
        }
      } else {
        id = this.id;
        if (hasOwn(value, id)) {
          if (value[id] === null) {
            value[id] = frag;
          } else {
            'development' !== 'production' && this.warnDuplicate(value);
          }
        } else {
          def(value, id, frag);
        }
      }
      frag.raw = value;
    },

    /**
     * Get a cached fragment from the value/index/key
     *
     * @param {*} value
     * @param {Number} index
     * @param {String} key
     * @return {Fragment}
     */

    getCachedFrag: function getCachedFrag(value, index, key) {
      var trackByKey = this.params.trackBy;
      var primitive = !isObject(value);
      var frag;
      if (key || trackByKey || primitive) {
        var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
        frag = this.cache[id];
      } else {
        frag = value[this.id];
      }
      if (frag && (frag.reused || frag.fresh)) {
        'development' !== 'production' && this.warnDuplicate(value);
      }
      return frag;
    },

    /**
     * Delete a fragment from cache.
     *
     * @param {Fragment} frag
     */

    deleteCachedFrag: function deleteCachedFrag(frag) {
      var value = frag.raw;
      var trackByKey = this.params.trackBy;
      var scope = frag.scope;
      var index = scope.$index;
      // fix #948: avoid accidentally fall through to
      // a parent repeater which happens to have $key.
      var key = hasOwn(scope, '$key') && scope.$key;
      var primitive = !isObject(value);
      if (trackByKey || key || primitive) {
        var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
        this.cache[id] = null;
      } else {
        value[this.id] = null;
        frag.raw = null;
      }
    },

    /**
     * Get the stagger amount for an insertion/removal.
     *
     * @param {Fragment} frag
     * @param {Number} index
     * @param {Number} total
     * @param {String} type
     */

    getStagger: function getStagger(frag, index, total, type) {
      type = type + 'Stagger';
      var trans = frag.node.__v_trans;
      var hooks = trans && trans.hooks;
      var hook = hooks && (hooks[type] || hooks.stagger);
      return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
    },

    /**
     * Pre-process the value before piping it through the
     * filters. This is passed to and called by the watcher.
     */

    _preProcess: function _preProcess(value) {
      // regardless of type, store the un-filtered raw value.
      this.rawValue = value;
      return value;
    },

    /**
     * Post-process the value after it has been piped through
     * the filters. This is passed to and called by the watcher.
     *
     * It is necessary for this to be called during the
     * wathcer's dependency collection phase because we want
     * the v-for to update when the source Object is mutated.
     */

    _postProcess: function _postProcess(value) {
      if (isArray(value)) {
        return value;
      } else if (isPlainObject(value)) {
        // convert plain object to array.
        var keys = Object.keys(value);
        var i = keys.length;
        var res = new Array(i);
        var key;
        while (i--) {
          key = keys[i];
          res[i] = {
            $key: key,
            $value: value[key]
          };
        }
        return res;
      } else {
        if (typeof value === 'number' && !isNaN(value)) {
          value = range(value);
        }
        return value || [];
      }
    },

    unbind: function unbind() {
      if (this.descriptor.ref) {
        (this._scope || this.vm).$refs[this.descriptor.ref] = null;
      }
      if (this.frags) {
        var i = this.frags.length;
        var frag;
        while (i--) {
          frag = this.frags[i];
          this.deleteCachedFrag(frag);
          frag.destroy();
        }
      }
    }
  };

  /**
   * Helper to find the previous element that is a fragment
   * anchor. This is necessary because a destroyed frag's
   * element could still be lingering in the DOM before its
   * leaving transition finishes, but its inserted flag
   * should have been set to false so we can skip them.
   *
   * If this is a block repeat, we want to make sure we only
   * return frag that is bound to this v-for. (see #929)
   *
   * @param {Fragment} frag
   * @param {Comment|Text} anchor
   * @param {String} id
   * @return {Fragment}
   */

  function findPrevFrag(frag, anchor, id) {
    var el = frag.node.previousSibling;
    /* istanbul ignore if */
    if (!el) return;
    frag = el.__v_frag;
    while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
      el = el.previousSibling;
      /* istanbul ignore if */
      if (!el) return;
      frag = el.__v_frag;
    }
    return frag;
  }

  /**
   * Find a vm from a fragment.
   *
   * @param {Fragment} frag
   * @return {Vue|undefined}
   */

  function findVmFromFrag(frag) {
    var node = frag.node;
    // handle multi-node frag
    if (frag.end) {
      while (!node.__vue__ && node !== frag.end && node.nextSibling) {
        node = node.nextSibling;
      }
    }
    return node.__vue__;
  }

  /**
   * Create a range array from given number.
   *
   * @param {Number} n
   * @return {Array}
   */

  function range(n) {
    var i = -1;
    var ret = new Array(Math.floor(n));
    while (++i < n) {
      ret[i] = i;
    }
    return ret;
  }

  if ('development' !== 'production') {
    vFor.warnDuplicate = function (value) {
      warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
    };
  }

  var vIf = {

    priority: IF,
    terminal: true,

    bind: function bind() {
      var el = this.el;
      if (!el.__vue__) {
        // check else block
        var next = el.nextElementSibling;
        if (next && getAttr(next, 'v-else') !== null) {
          remove(next);
          this.elseEl = next;
        }
        // check main block
        this.anchor = createAnchor('v-if');
        replace(el, this.anchor);
      } else {
        'development' !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
        this.invalid = true;
      }
    },

    update: function update(value) {
      if (this.invalid) return;
      if (value) {
        if (!this.frag) {
          this.insert();
        }
      } else {
        this.remove();
      }
    },

    insert: function insert() {
      if (this.elseFrag) {
        this.elseFrag.remove();
        this.elseFrag = null;
      }
      // lazy init factory
      if (!this.factory) {
        this.factory = new FragmentFactory(this.vm, this.el);
      }
      this.frag = this.factory.create(this._host, this._scope, this._frag);
      this.frag.before(this.anchor);
    },

    remove: function remove() {
      if (this.frag) {
        this.frag.remove();
        this.frag = null;
      }
      if (this.elseEl && !this.elseFrag) {
        if (!this.elseFactory) {
          this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
        }
        this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
        this.elseFrag.before(this.anchor);
      }
    },

    unbind: function unbind() {
      if (this.frag) {
        this.frag.destroy();
      }
      if (this.elseFrag) {
        this.elseFrag.destroy();
      }
    }
  };

  var show = {

    bind: function bind() {
      // check else block
      var next = this.el.nextElementSibling;
      if (next && getAttr(next, 'v-else') !== null) {
        this.elseEl = next;
      }
    },

    update: function update(value) {
      this.apply(this.el, value);
      if (this.elseEl) {
        this.apply(this.elseEl, !value);
      }
    },

    apply: function apply(el, value) {
      if (inDoc(el)) {
        applyTransition(el, value ? 1 : -1, toggle, this.vm);
      } else {
        toggle();
      }
      function toggle() {
        el.style.display = value ? '' : 'none';
      }
    }
  };

  var text$2 = {

    bind: function bind() {
      var self = this;
      var el = this.el;
      var isRange = el.type === 'range';
      var lazy = this.params.lazy;
      var number = this.params.number;
      var debounce = this.params.debounce;

      // handle composition events.
      //   http://blog.evanyou.me/2014/01/03/composition-event/
      // skip this for Android because it handles composition
      // events quite differently. Android doesn't trigger
      // composition events for language input methods e.g.
      // Chinese, but instead triggers them for spelling
      // suggestions... (see Discussion/#162)
      var composing = false;
      if (!isAndroid && !isRange) {
        this.on('compositionstart', function () {
          composing = true;
        });
        this.on('compositionend', function () {
          composing = false;
          // in IE11 the "compositionend" event fires AFTER
          // the "input" event, so the input handler is blocked
          // at the end... have to call it here.
          //
          // #1327: in lazy mode this is unecessary.
          if (!lazy) {
            self.listener();
          }
        });
      }

      // prevent messing with the input when user is typing,
      // and force update on blur.
      this.focused = false;
      if (!isRange && !lazy) {
        this.on('focus', function () {
          self.focused = true;
        });
        this.on('blur', function () {
          self.focused = false;
          // do not sync value after fragment removal (#2017)
          if (!self._frag || self._frag.inserted) {
            self.rawListener();
          }
        });
      }

      // Now attach the main listener
      this.listener = this.rawListener = function () {
        if (composing || !self._bound) {
          return;
        }
        var val = number || isRange ? toNumber(el.value) : el.value;
        self.set(val);
        // force update on next tick to avoid lock & same value
        // also only update when user is not typing
        nextTick(function () {
          if (self._bound && !self.focused) {
            self.update(self._watcher.value);
          }
        });
      };

      // apply debounce
      if (debounce) {
        this.listener = _debounce(this.listener, debounce);
      }

      // Support jQuery events, since jQuery.trigger() doesn't
      // trigger native events in some cases and some plugins
      // rely on $.trigger()
      //
      // We want to make sure if a listener is attached using
      // jQuery, it is also removed with jQuery, that's why
      // we do the check for each directive instance and
      // store that check result on itself. This also allows
      // easier test coverage control by unsetting the global
      // jQuery variable in tests.
      this.hasjQuery = typeof jQuery === 'function';
      if (this.hasjQuery) {
        var method = jQuery.fn.on ? 'on' : 'bind';
        jQuery(el)[method]('change', this.rawListener);
        if (!lazy) {
          jQuery(el)[method]('input', this.listener);
        }
      } else {
        this.on('change', this.rawListener);
        if (!lazy) {
          this.on('input', this.listener);
        }
      }

      // IE9 doesn't fire input event on backspace/del/cut
      if (!lazy && isIE9) {
        this.on('cut', function () {
          nextTick(self.listener);
        });
        this.on('keyup', function (e) {
          if (e.keyCode === 46 || e.keyCode === 8) {
            self.listener();
          }
        });
      }

      // set initial value if present
      if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
        this.afterBind = this.listener;
      }
    },

    update: function update(value) {
      this.el.value = _toString(value);
    },

    unbind: function unbind() {
      var el = this.el;
      if (this.hasjQuery) {
        var method = jQuery.fn.off ? 'off' : 'unbind';
        jQuery(el)[method]('change', this.listener);
        jQuery(el)[method]('input', this.listener);
      }
    }
  };

  var radio = {

    bind: function bind() {
      var self = this;
      var el = this.el;

      this.getValue = function () {
        // value overwrite via v-bind:value
        if (el.hasOwnProperty('_value')) {
          return el._value;
        }
        var val = el.value;
        if (self.params.number) {
          val = toNumber(val);
        }
        return val;
      };

      this.listener = function () {
        self.set(self.getValue());
      };
      this.on('change', this.listener);

      if (el.hasAttribute('checked')) {
        this.afterBind = this.listener;
      }
    },

    update: function update(value) {
      this.el.checked = looseEqual(value, this.getValue());
    }
  };

  var select = {

    bind: function bind() {
      var self = this;
      var el = this.el;

      // method to force update DOM using latest value.
      this.forceUpdate = function () {
        if (self._watcher) {
          self.update(self._watcher.get());
        }
      };

      // check if this is a multiple select
      var multiple = this.multiple = el.hasAttribute('multiple');

      // attach listener
      this.listener = function () {
        var value = getValue(el, multiple);
        value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
        self.set(value);
      };
      this.on('change', this.listener);

      // if has initial value, set afterBind
      var initValue = getValue(el, multiple, true);
      if (multiple && initValue.length || !multiple && initValue !== null) {
        this.afterBind = this.listener;
      }

      // All major browsers except Firefox resets
      // selectedIndex with value -1 to 0 when the element
      // is appended to a new parent, therefore we have to
      // force a DOM update whenever that happens...
      this.vm.$on('hook:attached', this.forceUpdate);
    },

    update: function update(value) {
      var el = this.el;
      el.selectedIndex = -1;
      var multi = this.multiple && isArray(value);
      var options = el.options;
      var i = options.length;
      var op, val;
      while (i--) {
        op = options[i];
        val = op.hasOwnProperty('_value') ? op._value : op.value;
        /* eslint-disable eqeqeq */
        op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
        /* eslint-enable eqeqeq */
      }
    },

    unbind: function unbind() {
      /* istanbul ignore next */
      this.vm.$off('hook:attached', this.forceUpdate);
    }
  };

  /**
   * Get select value
   *
   * @param {SelectElement} el
   * @param {Boolean} multi
   * @param {Boolean} init
   * @return {Array|*}
   */

  function getValue(el, multi, init) {
    var res = multi ? [] : null;
    var op, val, selected;
    for (var i = 0, l = el.options.length; i < l; i++) {
      op = el.options[i];
      selected = init ? op.hasAttribute('selected') : op.selected;
      if (selected) {
        val = op.hasOwnProperty('_value') ? op._value : op.value;
        if (multi) {
          res.push(val);
        } else {
          return val;
        }
      }
    }
    return res;
  }

  /**
   * Native Array.indexOf uses strict equal, but in this
   * case we need to match string/numbers with custom equal.
   *
   * @param {Array} arr
   * @param {*} val
   */

  function indexOf$1(arr, val) {
    var i = arr.length;
    while (i--) {
      if (looseEqual(arr[i], val)) {
        return i;
      }
    }
    return -1;
  }

  var checkbox = {

    bind: function bind() {
      var self = this;
      var el = this.el;

      this.getValue = function () {
        return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
      };

      function getBooleanValue() {
        var val = el.checked;
        if (val && el.hasOwnProperty('_trueValue')) {
          return el._trueValue;
        }
        if (!val && el.hasOwnProperty('_falseValue')) {
          return el._falseValue;
        }
        return val;
      }

      this.listener = function () {
        var model = self._watcher.value;
        if (isArray(model)) {
          var val = self.getValue();
          if (el.checked) {
            if (indexOf(model, val) < 0) {
              model.push(val);
            }
          } else {
            model.$remove(val);
          }
        } else {
          self.set(getBooleanValue());
        }
      };

      this.on('change', this.listener);
      if (el.hasAttribute('checked')) {
        this.afterBind = this.listener;
      }
    },

    update: function update(value) {
      var el = this.el;
      if (isArray(value)) {
        el.checked = indexOf(value, this.getValue()) > -1;
      } else {
        if (el.hasOwnProperty('_trueValue')) {
          el.checked = looseEqual(value, el._trueValue);
        } else {
          el.checked = !!value;
        }
      }
    }
  };

  var handlers = {
    text: text$2,
    radio: radio,
    select: select,
    checkbox: checkbox
  };

  var model = {

    priority: MODEL,
    twoWay: true,
    handlers: handlers,
    params: ['lazy', 'number', 'debounce'],

    /**
     * Possible elements:
     *   <select>
     *   <textarea>
     *   <input type="*">
     *     - text
     *     - checkbox
     *     - radio
     *     - number
     */

    bind: function bind() {
      // friendly warning...
      this.checkFilters();
      if (this.hasRead && !this.hasWrite) {
        'development' !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
      }
      var el = this.el;
      var tag = el.tagName;
      var handler;
      if (tag === 'INPUT') {
        handler = handlers[el.type] || handlers.text;
      } else if (tag === 'SELECT') {
        handler = handlers.select;
      } else if (tag === 'TEXTAREA') {
        handler = handlers.text;
      } else {
        'development' !== 'production' && warn('v-model does not support element type: ' + tag);
        return;
      }
      el.__v_model = this;
      handler.bind.call(this);
      this.update = handler.update;
      this._unbind = handler.unbind;
    },

    /**
     * Check read/write filter stats.
     */

    checkFilters: function checkFilters() {
      var filters = this.filters;
      if (!filters) return;
      var i = filters.length;
      while (i--) {
        var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
        if (typeof filter === 'function' || filter.read) {
          this.hasRead = true;
        }
        if (filter.write) {
          this.hasWrite = true;
        }
      }
    },

    unbind: function unbind() {
      this.el.__v_model = null;
      this._unbind && this._unbind();
    }
  };

  // keyCode aliases
  var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    'delete': [8, 46],
    up: 38,
    left: 37,
    right: 39,
    down: 40
  };

  function keyFilter(handler, keys) {
    var codes = keys.map(function (key) {
      var charCode = key.charCodeAt(0);
      if (charCode > 47 && charCode < 58) {
        return parseInt(key, 10);
      }
      if (key.length === 1) {
        charCode = key.toUpperCase().charCodeAt(0);
        if (charCode > 64 && charCode < 91) {
          return charCode;
        }
      }
      return keyCodes[key];
    });
    codes = [].concat.apply([], codes);
    return function keyHandler(e) {
      if (codes.indexOf(e.keyCode) > -1) {
        return handler.call(this, e);
      }
    };
  }

  function stopFilter(handler) {
    return function stopHandler(e) {
      e.stopPropagation();
      return handler.call(this, e);
    };
  }

  function preventFilter(handler) {
    return function preventHandler(e) {
      e.preventDefault();
      return handler.call(this, e);
    };
  }

  function selfFilter(handler) {
    return function selfHandler(e) {
      if (e.target === e.currentTarget) {
        return handler.call(this, e);
      }
    };
  }

  var on$1 = {

    priority: ON,
    acceptStatement: true,
    keyCodes: keyCodes,

    bind: function bind() {
      // deal with iframes
      if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
        var self = this;
        this.iframeBind = function () {
          on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
        };
        this.on('load', this.iframeBind);
      }
    },

    update: function update(handler) {
      // stub a noop for v-on with no value,
      // e.g. @mousedown.prevent
      if (!this.descriptor.raw) {
        handler = function () {};
      }

      if (typeof handler !== 'function') {
        'development' !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
        return;
      }

      // apply modifiers
      if (this.modifiers.stop) {
        handler = stopFilter(handler);
      }
      if (this.modifiers.prevent) {
        handler = preventFilter(handler);
      }
      if (this.modifiers.self) {
        handler = selfFilter(handler);
      }
      // key filter
      var keys = Object.keys(this.modifiers).filter(function (key) {
        return key !== 'stop' && key !== 'prevent' && key !== 'self';
      });
      if (keys.length) {
        handler = keyFilter(handler, keys);
      }

      this.reset();
      this.handler = handler;

      if (this.iframeBind) {
        this.iframeBind();
      } else {
        on(this.el, this.arg, this.handler, this.modifiers.capture);
      }
    },

    reset: function reset() {
      var el = this.iframeBind ? this.el.contentWindow : this.el;
      if (this.handler) {
        off(el, this.arg, this.handler);
      }
    },

    unbind: function unbind() {
      this.reset();
    }
  };

  var prefixes = ['-webkit-', '-moz-', '-ms-'];
  var camelPrefixes = ['Webkit', 'Moz', 'ms'];
  var importantRE = /!important;?$/;
  var propCache = Object.create(null);

  var testEl = null;

  var style = {

    deep: true,

    update: function update(value) {
      if (typeof value === 'string') {
        this.el.style.cssText = value;
      } else if (isArray(value)) {
        this.handleObject(value.reduce(extend, {}));
      } else {
        this.handleObject(value || {});
      }
    },

    handleObject: function handleObject(value) {
      // cache object styles so that only changed props
      // are actually updated.
      var cache = this.cache || (this.cache = {});
      var name, val;
      for (name in cache) {
        if (!(name in value)) {
          this.handleSingle(name, null);
          delete cache[name];
        }
      }
      for (name in value) {
        val = value[name];
        if (val !== cache[name]) {
          cache[name] = val;
          this.handleSingle(name, val);
        }
      }
    },

    handleSingle: function handleSingle(prop, value) {
      prop = normalize(prop);
      if (!prop) return; // unsupported prop
      // cast possible numbers/booleans into strings
      if (value != null) value += '';
      if (value) {
        var isImportant = importantRE.test(value) ? 'important' : '';
        if (isImportant) {
          value = value.replace(importantRE, '').trim();
        }
        this.el.style.setProperty(prop, value, isImportant);
      } else {
        this.el.style.removeProperty(prop);
      }
    }

  };

  /**
   * Normalize a CSS property name.
   * - cache result
   * - auto prefix
   * - camelCase -> dash-case
   *
   * @param {String} prop
   * @return {String}
   */

  function normalize(prop) {
    if (propCache[prop]) {
      return propCache[prop];
    }
    var res = prefix(prop);
    propCache[prop] = propCache[res] = res;
    return res;
  }

  /**
   * Auto detect the appropriate prefix for a CSS property.
   * https://gist.github.com/paulirish/523692
   *
   * @param {String} prop
   * @return {String}
   */

  function prefix(prop) {
    prop = hyphenate(prop);
    var camel = camelize(prop);
    var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
    if (!testEl) {
      testEl = document.createElement('div');
    }
    var i = prefixes.length;
    var prefixed;
    while (i--) {
      prefixed = camelPrefixes[i] + upper;
      if (prefixed in testEl.style) {
        return prefixes[i] + prop;
      }
    }
    if (camel in testEl.style) {
      return prop;
    }
  }

  // xlink
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var xlinkRE = /^xlink:/;

  // check for attributes that prohibit interpolations
  var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
  // these attributes should also set their corresponding properties
  // because they only affect the initial state of the element
  var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
  // these attributes expect enumrated values of "true" or "false"
  // but are not boolean attributes
  var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

  // these attributes should set a hidden property for
  // binding v-model to object values
  var modelProps = {
    value: '_value',
    'true-value': '_trueValue',
    'false-value': '_falseValue'
  };

  var bind$1 = {

    priority: BIND,

    bind: function bind() {
      var attr = this.arg;
      var tag = this.el.tagName;
      // should be deep watch on object mode
      if (!attr) {
        this.deep = true;
      }
      // handle interpolation bindings
      var descriptor = this.descriptor;
      var tokens = descriptor.interp;
      if (tokens) {
        // handle interpolations with one-time tokens
        if (descriptor.hasOneTime) {
          this.expression = tokensToExp(tokens, this._scope || this.vm);
        }

        // only allow binding on native attributes
        if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
          'development' !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
          this.el.removeAttribute(attr);
          this.invalid = true;
        }

        /* istanbul ignore if */
        if ('development' !== 'production') {
          var raw = attr + '="' + descriptor.raw + '": ';
          // warn src
          if (attr === 'src') {
            warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
          }

          // warn style
          if (attr === 'style') {
            warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
          }
        }
      }
    },

    update: function update(value) {
      if (this.invalid) {
        return;
      }
      var attr = this.arg;
      if (this.arg) {
        this.handleSingle(attr, value);
      } else {
        this.handleObject(value || {});
      }
    },

    // share object handler with v-bind:class
    handleObject: style.handleObject,

    handleSingle: function handleSingle(attr, value) {
      var el = this.el;
      var interp = this.descriptor.interp;
      if (this.modifiers.camel) {
        attr = camelize(attr);
      }
      if (!interp && attrWithPropsRE.test(attr) && attr in el) {
        el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
            ? '' : value : value;
      }
      // set model props
      var modelProp = modelProps[attr];
      if (!interp && modelProp) {
        el[modelProp] = value;
        // update v-model if present
        var model = el.__v_model;
        if (model) {
          model.listener();
        }
      }
      // do not set value attribute for textarea
      if (attr === 'value' && el.tagName === 'TEXTAREA') {
        el.removeAttribute(attr);
        return;
      }
      // update attribute
      if (enumeratedAttrRE.test(attr)) {
        el.setAttribute(attr, value ? 'true' : 'false');
      } else if (value != null && value !== false) {
        if (attr === 'class') {
          // handle edge case #1960:
          // class interpolation should not overwrite Vue transition class
          if (el.__v_trans) {
            value += ' ' + el.__v_trans.id + '-transition';
          }
          setClass(el, value);
        } else if (xlinkRE.test(attr)) {
          el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
        } else {
          el.setAttribute(attr, value === true ? '' : value);
        }
      } else {
        el.removeAttribute(attr);
      }
    }
  };

  var el = {

    priority: EL,

    bind: function bind() {
      /* istanbul ignore if */
      if (!this.arg) {
        return;
      }
      var id = this.id = camelize(this.arg);
      var refs = (this._scope || this.vm).$els;
      if (hasOwn(refs, id)) {
        refs[id] = this.el;
      } else {
        defineReactive(refs, id, this.el);
      }
    },

    unbind: function unbind() {
      var refs = (this._scope || this.vm).$els;
      if (refs[this.id] === this.el) {
        refs[this.id] = null;
      }
    }
  };

  var ref = {
    bind: function bind() {
      'development' !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
    }
  };

  var cloak = {
    bind: function bind() {
      var el = this.el;
      this.vm.$once('pre-hook:compiled', function () {
        el.removeAttribute('v-cloak');
      });
    }
  };

  // must export plain object
  var directives = {
    text: text$1,
    html: html,
    'for': vFor,
    'if': vIf,
    show: show,
    model: model,
    on: on$1,
    bind: bind$1,
    el: el,
    ref: ref,
    cloak: cloak
  };

  var vClass = {

    deep: true,

    update: function update(value) {
      if (value && typeof value === 'string') {
        this.handleObject(stringToObject(value));
      } else if (isPlainObject(value)) {
        this.handleObject(value);
      } else if (isArray(value)) {
        this.handleArray(value);
      } else {
        this.cleanup();
      }
    },

    handleObject: function handleObject(value) {
      this.cleanup(value);
      this.prevKeys = Object.keys(value);
      setObjectClasses(this.el, value);
    },

    handleArray: function handleArray(value) {
      this.cleanup(value);
      for (var i = 0, l = value.length; i < l; i++) {
        var val = value[i];
        if (val && isPlainObject(val)) {
          setObjectClasses(this.el, val);
        } else if (val && typeof val === 'string') {
          addClass(this.el, val);
        }
      }
      this.prevKeys = value.slice();
    },

    cleanup: function cleanup(value) {
      if (this.prevKeys) {
        var i = this.prevKeys.length;
        while (i--) {
          var key = this.prevKeys[i];
          if (!key) continue;
          if (isPlainObject(key)) {
            var keys = Object.keys(key);
            for (var k = 0; k < keys.length; k++) {
              removeClass(this.el, keys[k]);
            }
          } else {
            removeClass(this.el, key);
          }
        }
      }
    }
  };

  function setObjectClasses(el, obj) {
    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      if (obj[key]) {
        addClass(el, key);
      }
    }
  }

  function stringToObject(value) {
    var res = {};
    var keys = value.trim().split(/\s+/);
    var i = keys.length;
    while (i--) {
      res[keys[i]] = true;
    }
    return res;
  }

  var component = {

    priority: COMPONENT,

    params: ['keep-alive', 'transition-mode', 'inline-template'],

    /**
     * Setup. Two possible usages:
     *
     * - static:
     *   <comp> or <div v-component="comp">
     *
     * - dynamic:
     *   <component :is="view">
     */

    bind: function bind() {
      if (!this.el.__vue__) {
        // keep-alive cache
        this.keepAlive = this.params.keepAlive;
        if (this.keepAlive) {
          this.cache = {};
        }
        // check inline-template
        if (this.params.inlineTemplate) {
          // extract inline template as a DocumentFragment
          this.inlineTemplate = extractContent(this.el, true);
        }
        // component resolution related state
        this.pendingComponentCb = this.Component = null;
        // transition related state
        this.pendingRemovals = 0;
        this.pendingRemovalCb = null;
        // create a ref anchor
        this.anchor = createAnchor('v-component');
        replace(this.el, this.anchor);
        // remove is attribute.
        // this is removed during compilation, but because compilation is
        // cached, when the component is used elsewhere this attribute
        // will remain at link time.
        this.el.removeAttribute('is');
        // remove ref, same as above
        if (this.descriptor.ref) {
          this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
        }
        // if static, build right now.
        if (this.literal) {
          this.setComponent(this.expression);
        }
      } else {
        'development' !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
      }
    },

    /**
     * Public update, called by the watcher in the dynamic
     * literal scenario, e.g. <component :is="view">
     */

    update: function update(value) {
      if (!this.literal) {
        this.setComponent(value);
      }
    },

    /**
     * Switch dynamic components. May resolve the component
     * asynchronously, and perform transition based on
     * specified transition mode. Accepts a few additional
     * arguments specifically for vue-router.
     *
     * The callback is called when the full transition is
     * finished.
     *
     * @param {String} value
     * @param {Function} [cb]
     */

    setComponent: function setComponent(value, cb) {
      this.invalidatePending();
      if (!value) {
        // just remove current
        this.unbuild(true);
        this.remove(this.childVM, cb);
        this.childVM = null;
      } else {
        var self = this;
        this.resolveComponent(value, function () {
          self.mountComponent(cb);
        });
      }
    },

    /**
     * Resolve the component constructor to use when creating
     * the child vm.
     *
     * @param {String|Function} value
     * @param {Function} cb
     */

    resolveComponent: function resolveComponent(value, cb) {
      var self = this;
      this.pendingComponentCb = cancellable(function (Component) {
        self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
        self.Component = Component;
        cb();
      });
      this.vm._resolveComponent(value, this.pendingComponentCb);
    },

    /**
     * Create a new instance using the current constructor and
     * replace the existing instance. This method doesn't care
     * whether the new component and the old one are actually
     * the same.
     *
     * @param {Function} [cb]
     */

    mountComponent: function mountComponent(cb) {
      // actual mount
      this.unbuild(true);
      var self = this;
      var activateHooks = this.Component.options.activate;
      var cached = this.getCached();
      var newComponent = this.build();
      if (activateHooks && !cached) {
        this.waitingFor = newComponent;
        callActivateHooks(activateHooks, newComponent, function () {
          if (self.waitingFor !== newComponent) {
            return;
          }
          self.waitingFor = null;
          self.transition(newComponent, cb);
        });
      } else {
        // update ref for kept-alive component
        if (cached) {
          newComponent._updateRef();
        }
        this.transition(newComponent, cb);
      }
    },

    /**
     * When the component changes or unbinds before an async
     * constructor is resolved, we need to invalidate its
     * pending callback.
     */

    invalidatePending: function invalidatePending() {
      if (this.pendingComponentCb) {
        this.pendingComponentCb.cancel();
        this.pendingComponentCb = null;
      }
    },

    /**
     * Instantiate/insert a new child vm.
     * If keep alive and has cached instance, insert that
     * instance; otherwise build a new one and cache it.
     *
     * @param {Object} [extraOptions]
     * @return {Vue} - the created instance
     */

    build: function build(extraOptions) {
      var cached = this.getCached();
      if (cached) {
        return cached;
      }
      if (this.Component) {
        // default options
        var options = {
          name: this.ComponentName,
          el: cloneNode(this.el),
          template: this.inlineTemplate,
          // make sure to add the child with correct parent
          // if this is a transcluded component, its parent
          // should be the transclusion host.
          parent: this._host || this.vm,
          // if no inline-template, then the compiled
          // linker can be cached for better performance.
          _linkerCachable: !this.inlineTemplate,
          _ref: this.descriptor.ref,
          _asComponent: true,
          _isRouterView: this._isRouterView,
          // if this is a transcluded component, context
          // will be the common parent vm of this instance
          // and its host.
          _context: this.vm,
          // if this is inside an inline v-for, the scope
          // will be the intermediate scope created for this
          // repeat fragment. this is used for linking props
          // and container directives.
          _scope: this._scope,
          // pass in the owner fragment of this component.
          // this is necessary so that the fragment can keep
          // track of its contained components in order to
          // call attach/detach hooks for them.
          _frag: this._frag
        };
        // extra options
        // in 1.0.0 this is used by vue-router only
        /* istanbul ignore if */
        if (extraOptions) {
          extend(options, extraOptions);
        }
        var child = new this.Component(options);
        if (this.keepAlive) {
          this.cache[this.Component.cid] = child;
        }
        /* istanbul ignore if */
        if ('development' !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
          warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
        }
        return child;
      }
    },

    /**
     * Try to get a cached instance of the current component.
     *
     * @return {Vue|undefined}
     */

    getCached: function getCached() {
      return this.keepAlive && this.cache[this.Component.cid];
    },

    /**
     * Teardown the current child, but defers cleanup so
     * that we can separate the destroy and removal steps.
     *
     * @param {Boolean} defer
     */

    unbuild: function unbuild(defer) {
      if (this.waitingFor) {
        if (!this.keepAlive) {
          this.waitingFor.$destroy();
        }
        this.waitingFor = null;
      }
      var child = this.childVM;
      if (!child || this.keepAlive) {
        if (child) {
          // remove ref
          child._inactive = true;
          child._updateRef(true);
        }
        return;
      }
      // the sole purpose of `deferCleanup` is so that we can
      // "deactivate" the vm right now and perform DOM removal
      // later.
      child.$destroy(false, defer);
    },

    /**
     * Remove current destroyed child and manually do
     * the cleanup after removal.
     *
     * @param {Function} cb
     */

    remove: function remove(child, cb) {
      var keepAlive = this.keepAlive;
      if (child) {
        // we may have a component switch when a previous
        // component is still being transitioned out.
        // we want to trigger only one lastest insertion cb
        // when the existing transition finishes. (#1119)
        this.pendingRemovals++;
        this.pendingRemovalCb = cb;
        var self = this;
        child.$remove(function () {
          self.pendingRemovals--;
          if (!keepAlive) child._cleanup();
          if (!self.pendingRemovals && self.pendingRemovalCb) {
            self.pendingRemovalCb();
            self.pendingRemovalCb = null;
          }
        });
      } else if (cb) {
        cb();
      }
    },

    /**
     * Actually swap the components, depending on the
     * transition mode. Defaults to simultaneous.
     *
     * @param {Vue} target
     * @param {Function} [cb]
     */

    transition: function transition(target, cb) {
      var self = this;
      var current = this.childVM;
      // for devtool inspection
      if (current) current._inactive = true;
      target._inactive = false;
      this.childVM = target;
      switch (self.params.transitionMode) {
        case 'in-out':
          target.$before(self.anchor, function () {
            self.remove(current, cb);
          });
          break;
        case 'out-in':
          self.remove(current, function () {
            target.$before(self.anchor, cb);
          });
          break;
        default:
          self.remove(current);
          target.$before(self.anchor, cb);
      }
    },

    /**
     * Unbind.
     */

    unbind: function unbind() {
      this.invalidatePending();
      // Do not defer cleanup when unbinding
      this.unbuild();
      // destroy all keep-alive cached instances
      if (this.cache) {
        for (var key in this.cache) {
          this.cache[key].$destroy();
        }
        this.cache = null;
      }
    }
  };

  /**
   * Call activate hooks in order (asynchronous)
   *
   * @param {Array} hooks
   * @param {Vue} vm
   * @param {Function} cb
   */

  function callActivateHooks(hooks, vm, cb) {
    var total = hooks.length;
    var called = 0;
    hooks[0].call(vm, next);
    function next() {
      if (++called >= total) {
        cb();
      } else {
        hooks[called].call(vm, next);
      }
    }
  }

  var propBindingModes = config._propBindingModes;
  var empty = {};

  // regexes
  var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
  var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

  /**
   * Compile props on a root element and return
   * a props link function.
   *
   * @param {Element|DocumentFragment} el
   * @param {Array} propOptions
   * @return {Function} propsLinkFn
   */

  function compileProps(el, propOptions) {
    var props = [];
    var names = Object.keys(propOptions);
    var i = names.length;
    var options, name, attr, value, path, parsed, prop;
    while (i--) {
      name = names[i];
      options = propOptions[name] || empty;

      if ('development' !== 'production' && name === '$data') {
        warn('Do not use $data as prop.');
        continue;
      }

      // props could contain dashes, which will be
      // interpreted as minus calculations by the parser
      // so we need to camelize the path here
      path = camelize(name);
      if (!identRE$1.test(path)) {
        'development' !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
        continue;
      }

      prop = {
        name: name,
        path: path,
        options: options,
        mode: propBindingModes.ONE_WAY,
        raw: null
      };

      attr = hyphenate(name);
      // first check dynamic version
      if ((value = getBindAttr(el, attr)) === null) {
        if ((value = getBindAttr(el, attr + '.sync')) !== null) {
          prop.mode = propBindingModes.TWO_WAY;
        } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
          prop.mode = propBindingModes.ONE_TIME;
        }
      }
      if (value !== null) {
        // has dynamic binding!
        prop.raw = value;
        parsed = parseDirective(value);
        value = parsed.expression;
        prop.filters = parsed.filters;
        // check binding type
        if (isLiteral(value) && !parsed.filters) {
          // for expressions containing literal numbers and
          // booleans, there's no need to setup a prop binding,
          // so we can optimize them as a one-time set.
          prop.optimizedLiteral = true;
        } else {
          prop.dynamic = true;
          // check non-settable path for two-way bindings
          if ('development' !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
            prop.mode = propBindingModes.ONE_WAY;
            warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
          }
        }
        prop.parentPath = value;

        // warn required two-way
        if ('development' !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
          warn('Prop "' + name + '" expects a two-way binding type.');
        }
      } else if ((value = getAttr(el, attr)) !== null) {
        // has literal binding!
        prop.raw = value;
      } else if ('development' !== 'production') {
        // check possible camelCase prop usage
        var lowerCaseName = path.toLowerCase();
        value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
        if (value) {
          warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.');
        } else if (options.required) {
          // warn missing required
          warn('Missing required prop: ' + name);
        }
      }
      // push prop
      props.push(prop);
    }
    return makePropsLinkFn(props);
  }

  /**
   * Build a function that applies props to a vm.
   *
   * @param {Array} props
   * @return {Function} propsLinkFn
   */

  function makePropsLinkFn(props) {
    return function propsLinkFn(vm, scope) {
      // store resolved props info
      vm._props = {};
      var i = props.length;
      var prop, path, options, value, raw;
      while (i--) {
        prop = props[i];
        raw = prop.raw;
        path = prop.path;
        options = prop.options;
        vm._props[path] = prop;
        if (raw === null) {
          // initialize absent prop
          initProp(vm, prop, undefined);
        } else if (prop.dynamic) {
          // dynamic prop
          if (prop.mode === propBindingModes.ONE_TIME) {
            // one time binding
            value = (scope || vm._context || vm).$get(prop.parentPath);
            initProp(vm, prop, value);
          } else {
            if (vm._context) {
              // dynamic binding
              vm._bindDir({
                name: 'prop',
                def: propDef,
                prop: prop
              }, null, null, scope); // el, host, scope
            } else {
              // root instance
              initProp(vm, prop, vm.$get(prop.parentPath));
            }
          }
        } else if (prop.optimizedLiteral) {
          // optimized literal, cast it and just set once
          var stripped = stripQuotes(raw);
          value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
          initProp(vm, prop, value);
        } else {
          // string literal, but we need to cater for
          // Boolean props with no value, or with same
          // literal value (e.g. disabled="disabled")
          // see https://github.com/vuejs/vue-loader/issues/182
          value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
          initProp(vm, prop, value);
        }
      }
    };
  }

  /**
   * Set a prop's initial value on a vm and its data object.
   *
   * @param {Vue} vm
   * @param {Object} prop
   * @param {*} value
   */

  function initProp(vm, prop, value) {
    var key = prop.path;
    value = coerceProp(prop, value);
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop.options);
    }
    if (assertProp(prop, value)) {
      defineReactive(vm, key, value);
    }
  }

  /**
   * Get the default value of a prop.
   *
   * @param {Vue} vm
   * @param {Object} options
   * @return {*}
   */

  function getPropDefaultValue(vm, options) {
    // no default, return undefined
    if (!hasOwn(options, 'default')) {
      // absent boolean value defaults to false
      return options.type === Boolean ? false : undefined;
    }
    var def = options['default'];
    // warn against non-factory defaults for Object & Array
    if (isObject(def)) {
      'development' !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
    }
    // call factory function for non-Function types
    return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
  }

  /**
   * Assert whether a prop is valid.
   *
   * @param {Object} prop
   * @param {*} value
   */

  function assertProp(prop, value) {
    if (!prop.options.required && ( // non-required
        prop.raw === null || // abscent
        value == null) // null or undefined
    ) {
      return true;
    }
    var options = prop.options;
    var type = options.type;
    var valid = true;
    var expectedType;
    if (type) {
      if (type === String) {
        expectedType = 'string';
        valid = typeof value === expectedType;
      } else if (type === Number) {
        expectedType = 'number';
        valid = typeof value === 'number';
      } else if (type === Boolean) {
        expectedType = 'boolean';
        valid = typeof value === 'boolean';
      } else if (type === Function) {
        expectedType = 'function';
        valid = typeof value === 'function';
      } else if (type === Object) {
        expectedType = 'object';
        valid = isPlainObject(value);
      } else if (type === Array) {
        expectedType = 'array';
        valid = isArray(value);
      } else {
        valid = value instanceof type;
      }
    }
    if (!valid) {
      'development' !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
      return false;
    }
    var validator = options.validator;
    if (validator) {
      if (!validator(value)) {
        'development' !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
        return false;
      }
    }
    return true;
  }

  /**
   * Force parsing value with coerce option.
   *
   * @param {*} value
   * @param {Object} options
   * @return {*}
   */

  function coerceProp(prop, value) {
    var coerce = prop.options.coerce;
    if (!coerce) {
      return value;
    }
    // coerce is a function
    return coerce(value);
  }

  function formatType(val) {
    return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
  }

  function formatValue(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  }

  var bindingModes = config._propBindingModes;

  var propDef = {

    bind: function bind() {
      var child = this.vm;
      var parent = child._context;
      // passed in from compiler directly
      var prop = this.descriptor.prop;
      var childKey = prop.path;
      var parentKey = prop.parentPath;
      var twoWay = prop.mode === bindingModes.TWO_WAY;
      var isSimple = isSimplePath(parentKey);

      var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
        val = coerceProp(prop, val);
        if (assertProp(prop, val)) {
          if (isSimple) {
            withoutConversion(function () {
              child[childKey] = val;
            });
          } else {
            child[childKey] = val;
          }
        }
      }, {
        twoWay: twoWay,
        filters: prop.filters,
        // important: props need to be observed on the
        // v-for scope if present
        scope: this._scope
      });

      // set the child initial value.
      var value = parentWatcher.value;
      if (isSimple && value !== undefined) {
        withoutConversion(function () {
          initProp(child, prop, value);
        });
      } else {
        initProp(child, prop, value);
      }

      // setup two-way binding
      if (twoWay) {
        // important: defer the child watcher creation until
        // the created hook (after data observation)
        var self = this;
        child.$once('pre-hook:created', function () {
          self.childWatcher = new Watcher(child, childKey, function (val) {
            parentWatcher.set(val);
          }, {
            // ensure sync upward before parent sync down.
            // this is necessary in cases e.g. the child
            // mutates a prop array, then replaces it. (#1683)
            sync: true
          });
        });
      }
    },

    unbind: function unbind() {
      this.parentWatcher.teardown();
      if (this.childWatcher) {
        this.childWatcher.teardown();
      }
    }
  };

  var queue$1 = [];
  var queued = false;

  /**
   * Push a job into the queue.
   *
   * @param {Function} job
   */

  function pushJob(job) {
    queue$1.push(job);
    if (!queued) {
      queued = true;
      nextTick(flush);
    }
  }

  /**
   * Flush the queue, and do one forced reflow before
   * triggering transitions.
   */

  function flush() {
    // Force layout
    var f = document.documentElement.offsetHeight;
    for (var i = 0; i < queue$1.length; i++) {
      queue$1[i]();
    }
    queue$1 = [];
    queued = false;
    // dummy return, so js linters don't complain about
    // unused variable f
    return f;
  }

  var TYPE_TRANSITION = 'transition';
  var TYPE_ANIMATION = 'animation';
  var transDurationProp = transitionProp + 'Duration';
  var animDurationProp = animationProp + 'Duration';

  /**
   * If a just-entered element is applied the
   * leave class while its enter transition hasn't started yet,
   * and the transitioned property has the same value for both
   * enter/leave, then the leave transition will be skipped and
   * the transitionend event never fires. This function ensures
   * its callback to be called after a transition has started
   * by waiting for double raf.
   *
   * It falls back to setTimeout on devices that support CSS
   * transitions but not raf (e.g. Android 4.2 browser) - since
   * these environments are usually slow, we are giving it a
   * relatively large timeout.
   */

  var raf = inBrowser && window.requestAnimationFrame;
  var waitForTransitionStart = raf
    /* istanbul ignore next */
      ? function (fn) {
    raf(function () {
      raf(fn);
    });
  } : function (fn) {
    setTimeout(fn, 50);
  };

  /**
   * A Transition object that encapsulates the state and logic
   * of the transition.
   *
   * @param {Element} el
   * @param {String} id
   * @param {Object} hooks
   * @param {Vue} vm
   */
  function Transition(el, id, hooks, vm) {
    this.id = id;
    this.el = el;
    this.enterClass = hooks && hooks.enterClass || id + '-enter';
    this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
    this.hooks = hooks;
    this.vm = vm;
    // async state
    this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
    this.justEntered = false;
    this.entered = this.left = false;
    this.typeCache = {};
    // check css transition type
    this.type = hooks && hooks.type;
    /* istanbul ignore if */
    if ('development' !== 'production') {
      if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
        warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type);
      }
    }
    // bind
    var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
      self[m] = bind(self[m], self);
    });
  }

  var p$1 = Transition.prototype;

  /**
   * Start an entering transition.
   *
   * 1. enter transition triggered
   * 2. call beforeEnter hook
   * 3. add enter class
   * 4. insert/show element
   * 5. call enter hook (with possible explicit js callback)
   * 6. reflow
   * 7. based on transition type:
   *    - transition:
   *        remove class now, wait for transitionend,
   *        then done if there's no explicit js callback.
   *    - animation:
   *        wait for animationend, remove class,
   *        then done if there's no explicit js callback.
   *    - no css transition:
   *        done now if there's no explicit js callback.
   * 8. wait for either done or js callback, then call
   *    afterEnter hook.
   *
   * @param {Function} op - insert/show the element
   * @param {Function} [cb]
   */

  p$1.enter = function (op, cb) {
    this.cancelPending();
    this.callHook('beforeEnter');
    this.cb = cb;
    addClass(this.el, this.enterClass);
    op();
    this.entered = false;
    this.callHookWithCb('enter');
    if (this.entered) {
      return; // user called done synchronously.
    }
    this.cancel = this.hooks && this.hooks.enterCancelled;
    pushJob(this.enterNextTick);
  };

  /**
   * The "nextTick" phase of an entering transition, which is
   * to be pushed into a queue and executed after a reflow so
   * that removing the class can trigger a CSS transition.
   */

  p$1.enterNextTick = function () {
    var _this = this;

    // prevent transition skipping
    this.justEntered = true;
    waitForTransitionStart(function () {
      _this.justEntered = false;
    });
    var enterDone = this.enterDone;
    var type = this.getCssTransitionType(this.enterClass);
    if (!this.pendingJsCb) {
      if (type === TYPE_TRANSITION) {
        // trigger transition by removing enter class now
        removeClass(this.el, this.enterClass);
        this.setupCssCb(transitionEndEvent, enterDone);
      } else if (type === TYPE_ANIMATION) {
        this.setupCssCb(animationEndEvent, enterDone);
      } else {
        enterDone();
      }
    } else if (type === TYPE_TRANSITION) {
      removeClass(this.el, this.enterClass);
    }
  };

  /**
   * The "cleanup" phase of an entering transition.
   */

  p$1.enterDone = function () {
    this.entered = true;
    this.cancel = this.pendingJsCb = null;
    removeClass(this.el, this.enterClass);
    this.callHook('afterEnter');
    if (this.cb) this.cb();
  };

  /**
   * Start a leaving transition.
   *
   * 1. leave transition triggered.
   * 2. call beforeLeave hook
   * 3. add leave class (trigger css transition)
   * 4. call leave hook (with possible explicit js callback)
   * 5. reflow if no explicit js callback is provided
   * 6. based on transition type:
   *    - transition or animation:
   *        wait for end event, remove class, then done if
   *        there's no explicit js callback.
   *    - no css transition:
   *        done if there's no explicit js callback.
   * 7. wait for either done or js callback, then call
   *    afterLeave hook.
   *
   * @param {Function} op - remove/hide the element
   * @param {Function} [cb]
   */

  p$1.leave = function (op, cb) {
    this.cancelPending();
    this.callHook('beforeLeave');
    this.op = op;
    this.cb = cb;
    addClass(this.el, this.leaveClass);
    this.left = false;
    this.callHookWithCb('leave');
    if (this.left) {
      return; // user called done synchronously.
    }
    this.cancel = this.hooks && this.hooks.leaveCancelled;
    // only need to handle leaveDone if
    // 1. the transition is already done (synchronously called
    //    by the user, which causes this.op set to null)
    // 2. there's no explicit js callback
    if (this.op && !this.pendingJsCb) {
      // if a CSS transition leaves immediately after enter,
      // the transitionend event never fires. therefore we
      // detect such cases and end the leave immediately.
      if (this.justEntered) {
        this.leaveDone();
      } else {
        pushJob(this.leaveNextTick);
      }
    }
  };

  /**
   * The "nextTick" phase of a leaving transition.
   */

  p$1.leaveNextTick = function () {
    var type = this.getCssTransitionType(this.leaveClass);
    if (type) {
      var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
      this.setupCssCb(event, this.leaveDone);
    } else {
      this.leaveDone();
    }
  };

  /**
   * The "cleanup" phase of a leaving transition.
   */

  p$1.leaveDone = function () {
    this.left = true;
    this.cancel = this.pendingJsCb = null;
    this.op();
    removeClass(this.el, this.leaveClass);
    this.callHook('afterLeave');
    if (this.cb) this.cb();
    this.op = null;
  };

  /**
   * Cancel any pending callbacks from a previously running
   * but not finished transition.
   */

  p$1.cancelPending = function () {
    this.op = this.cb = null;
    var hasPending = false;
    if (this.pendingCssCb) {
      hasPending = true;
      off(this.el, this.pendingCssEvent, this.pendingCssCb);
      this.pendingCssEvent = this.pendingCssCb = null;
    }
    if (this.pendingJsCb) {
      hasPending = true;
      this.pendingJsCb.cancel();
      this.pendingJsCb = null;
    }
    if (hasPending) {
      removeClass(this.el, this.enterClass);
      removeClass(this.el, this.leaveClass);
    }
    if (this.cancel) {
      this.cancel.call(this.vm, this.el);
      this.cancel = null;
    }
  };

  /**
   * Call a user-provided synchronous hook function.
   *
   * @param {String} type
   */

  p$1.callHook = function (type) {
    if (this.hooks && this.hooks[type]) {
      this.hooks[type].call(this.vm, this.el);
    }
  };

  /**
   * Call a user-provided, potentially-async hook function.
   * We check for the length of arguments to see if the hook
   * expects a `done` callback. If true, the transition's end
   * will be determined by when the user calls that callback;
   * otherwise, the end is determined by the CSS transition or
   * animation.
   *
   * @param {String} type
   */

  p$1.callHookWithCb = function (type) {
    var hook = this.hooks && this.hooks[type];
    if (hook) {
      if (hook.length > 1) {
        this.pendingJsCb = cancellable(this[type + 'Done']);
      }
      hook.call(this.vm, this.el, this.pendingJsCb);
    }
  };

  /**
   * Get an element's transition type based on the
   * calculated styles.
   *
   * @param {String} className
   * @return {Number}
   */

  p$1.getCssTransitionType = function (className) {
    /* istanbul ignore if */
    if (!transitionEndEvent ||
          // skip CSS transitions if page is not visible -
          // this solves the issue of transitionend events not
          // firing until the page is visible again.
          // pageVisibility API is supported in IE10+, same as
          // CSS transitions.
        document.hidden ||
          // explicit js-only transition
        this.hooks && this.hooks.css === false ||
          // element is hidden
        isHidden(this.el)) {
      return;
    }
    var type = this.type || this.typeCache[className];
    if (type) return type;
    var inlineStyles = this.el.style;
    var computedStyles = window.getComputedStyle(this.el);
    var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
    if (transDuration && transDuration !== '0s') {
      type = TYPE_TRANSITION;
    } else {
      var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
      if (animDuration && animDuration !== '0s') {
        type = TYPE_ANIMATION;
      }
    }
    if (type) {
      this.typeCache[className] = type;
    }
    return type;
  };

  /**
   * Setup a CSS transitionend/animationend callback.
   *
   * @param {String} event
   * @param {Function} cb
   */

  p$1.setupCssCb = function (event, cb) {
    this.pendingCssEvent = event;
    var self = this;
    var el = this.el;
    var onEnd = this.pendingCssCb = function (e) {
      if (e.target === el) {
        off(el, event, onEnd);
        self.pendingCssEvent = self.pendingCssCb = null;
        if (!self.pendingJsCb && cb) {
          cb();
        }
      }
    };
    on(el, event, onEnd);
  };

  /**
   * Check if an element is hidden - in that case we can just
   * skip the transition alltogether.
   *
   * @param {Element} el
   * @return {Boolean}
   */

  function isHidden(el) {
    if (/svg$/.test(el.namespaceURI)) {
      // SVG elements do not have offset(Width|Height)
      // so we need to check the client rect
      var rect = el.getBoundingClientRect();
      return !(rect.width || rect.height);
    } else {
      return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }
  }

  var transition$1 = {

    priority: TRANSITION,

    update: function update(id, oldId) {
      var el = this.el;
      // resolve on owner vm
      var hooks = resolveAsset(this.vm.$options, 'transitions', id);
      id = id || 'v';
      el.__v_trans = new Transition(el, id, hooks, this.vm);
      if (oldId) {
        removeClass(el, oldId + '-transition');
      }
      addClass(el, id + '-transition');
    }
  };

  var internalDirectives = {
    style: style,
    'class': vClass,
    component: component,
    prop: propDef,
    transition: transition$1
  };

  // special binding prefixes
  var bindRE = /^v-bind:|^:/;
  var onRE = /^v-on:|^@/;
  var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
  var modifierRE = /\.[^\.]+/g;
  var transitionRE = /^(v-bind:|:)?transition$/;

  // default directive priority
  var DEFAULT_PRIORITY = 1000;
  var DEFAULT_TERMINAL_PRIORITY = 2000;

  /**
   * Compile a template and return a reusable composite link
   * function, which recursively contains more link functions
   * inside. This top level compile function would normally
   * be called on instance root nodes, but can also be used
   * for partial compilation if the partial argument is true.
   *
   * The returned composite link function, when called, will
   * return an unlink function that tearsdown all directives
   * created during the linking phase.
   *
   * @param {Element|DocumentFragment} el
   * @param {Object} options
   * @param {Boolean} partial
   * @return {Function}
   */

  function compile(el, options, partial) {
    // link function for the node itself.
    var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
    // link function for the childNodes
    var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

    /**
     * A composite linker function to be called on a already
     * compiled piece of DOM, which instantiates all directive
     * instances.
     *
     * @param {Vue} vm
     * @param {Element|DocumentFragment} el
     * @param {Vue} [host] - host vm of transcluded content
     * @param {Object} [scope] - v-for scope
     * @param {Fragment} [frag] - link context fragment
     * @return {Function|undefined}
     */

    return function compositeLinkFn(vm, el, host, scope, frag) {
      // cache childNodes before linking parent, fix #657
      var childNodes = toArray(el.childNodes);
      // link
      var dirs = linkAndCapture(function compositeLinkCapturer() {
        if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
        if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
      }, vm);
      return makeUnlinkFn(vm, dirs);
    };
  }

  /**
   * Apply a linker to a vm/element pair and capture the
   * directives created during the process.
   *
   * @param {Function} linker
   * @param {Vue} vm
   */

  function linkAndCapture(linker, vm) {
    /* istanbul ignore if */
    if ('development' === 'production') {}
    var originalDirCount = vm._directives.length;
    linker();
    var dirs = vm._directives.slice(originalDirCount);
    dirs.sort(directiveComparator);
    for (var i = 0, l = dirs.length; i < l; i++) {
      dirs[i]._bind();
    }
    return dirs;
  }

  /**
   * Directive priority sort comparator
   *
   * @param {Object} a
   * @param {Object} b
   */

  function directiveComparator(a, b) {
    a = a.descriptor.def.priority || DEFAULT_PRIORITY;
    b = b.descriptor.def.priority || DEFAULT_PRIORITY;
    return a > b ? -1 : a === b ? 0 : 1;
  }

  /**
   * Linker functions return an unlink function that
   * tearsdown all directives instances generated during
   * the process.
   *
   * We create unlink functions with only the necessary
   * information to avoid retaining additional closures.
   *
   * @param {Vue} vm
   * @param {Array} dirs
   * @param {Vue} [context]
   * @param {Array} [contextDirs]
   * @return {Function}
   */

  function makeUnlinkFn(vm, dirs, context, contextDirs) {
    function unlink(destroying) {
      teardownDirs(vm, dirs, destroying);
      if (context && contextDirs) {
        teardownDirs(context, contextDirs);
      }
    }
    // expose linked directives
    unlink.dirs = dirs;
    return unlink;
  }

  /**
   * Teardown partial linked directives.
   *
   * @param {Vue} vm
   * @param {Array} dirs
   * @param {Boolean} destroying
   */

  function teardownDirs(vm, dirs, destroying) {
    var i = dirs.length;
    while (i--) {
      dirs[i]._teardown();
      if ('development' !== 'production' && !destroying) {
        vm._directives.$remove(dirs[i]);
      }
    }
  }

  /**
   * Compile link props on an instance.
   *
   * @param {Vue} vm
   * @param {Element} el
   * @param {Object} props
   * @param {Object} [scope]
   * @return {Function}
   */

  function compileAndLinkProps(vm, el, props, scope) {
    var propsLinkFn = compileProps(el, props);
    var propDirs = linkAndCapture(function () {
      propsLinkFn(vm, scope);
    }, vm);
    return makeUnlinkFn(vm, propDirs);
  }

  /**
   * Compile the root element of an instance.
   *
   * 1. attrs on context container (context scope)
   * 2. attrs on the component template root node, if
   *    replace:true (child scope)
   *
   * If this is a fragment instance, we only need to compile 1.
   *
   * @param {Element} el
   * @param {Object} options
   * @param {Object} contextOptions
   * @return {Function}
   */

  function compileRoot(el, options, contextOptions) {
    var containerAttrs = options._containerAttrs;
    var replacerAttrs = options._replacerAttrs;
    var contextLinkFn, replacerLinkFn;

    // only need to compile other attributes for
    // non-fragment instances
    if (el.nodeType !== 11) {
      // for components, container and replacer need to be
      // compiled separately and linked in different scopes.
      if (options._asComponent) {
        // 2. container attributes
        if (containerAttrs && contextOptions) {
          contextLinkFn = compileDirectives(containerAttrs, contextOptions);
        }
        if (replacerAttrs) {
          // 3. replacer attributes
          replacerLinkFn = compileDirectives(replacerAttrs, options);
        }
      } else {
        // non-component, just compile as a normal element.
        replacerLinkFn = compileDirectives(el.attributes, options);
      }
    } else if ('development' !== 'production' && containerAttrs) {
      // warn container directives for fragment instances
      var names = containerAttrs.filter(function (attr) {
        // allow vue-loader/vueify scoped css attributes
        return attr.name.indexOf('_v-') < 0 &&
              // allow event listeners
            !onRE.test(attr.name) &&
              // allow slots
            attr.name !== 'slot';
      }).map(function (attr) {
        return '"' + attr.name + '"';
      });
      if (names.length) {
        var plural = names.length > 1;
        warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
      }
    }

    options._containerAttrs = options._replacerAttrs = null;
    return function rootLinkFn(vm, el, scope) {
      // link context scope dirs
      var context = vm._context;
      var contextDirs;
      if (context && contextLinkFn) {
        contextDirs = linkAndCapture(function () {
          contextLinkFn(context, el, null, scope);
        }, context);
      }

      // link self
      var selfDirs = linkAndCapture(function () {
        if (replacerLinkFn) replacerLinkFn(vm, el);
      }, vm);

      // return the unlink function that tearsdown context
      // container directives.
      return makeUnlinkFn(vm, selfDirs, context, contextDirs);
    };
  }

  /**
   * Compile a node and return a nodeLinkFn based on the
   * node type.
   *
   * @param {Node} node
   * @param {Object} options
   * @return {Function|null}
   */

  function compileNode(node, options) {
    var type = node.nodeType;
    if (type === 1 && node.tagName !== 'SCRIPT') {
      return compileElement(node, options);
    } else if (type === 3 && node.data.trim()) {
      return compileTextNode(node, options);
    } else {
      return null;
    }
  }

  /**
   * Compile an element and return a nodeLinkFn.
   *
   * @param {Element} el
   * @param {Object} options
   * @return {Function|null}
   */

  function compileElement(el, options) {
    // preprocess textareas.
    // textarea treats its text content as the initial value.
    // just bind it as an attr directive for value.
    if (el.tagName === 'TEXTAREA') {
      var tokens = parseText(el.value);
      if (tokens) {
        el.setAttribute(':value', tokensToExp(tokens));
        el.value = '';
      }
    }
    var linkFn;
    var hasAttrs = el.hasAttributes();
    var attrs = hasAttrs && toArray(el.attributes);
    // check terminal directives (for & if)
    if (hasAttrs) {
      linkFn = checkTerminalDirectives(el, attrs, options);
    }
    // check element directives
    if (!linkFn) {
      linkFn = checkElementDirectives(el, options);
    }
    // check component
    if (!linkFn) {
      linkFn = checkComponent(el, options);
    }
    // normal directives
    if (!linkFn && hasAttrs) {
      linkFn = compileDirectives(attrs, options);
    }
    return linkFn;
  }

  /**
   * Compile a textNode and return a nodeLinkFn.
   *
   * @param {TextNode} node
   * @param {Object} options
   * @return {Function|null} textNodeLinkFn
   */

  function compileTextNode(node, options) {
    // skip marked text nodes
    if (node._skip) {
      return removeText;
    }

    var tokens = parseText(node.wholeText);
    if (!tokens) {
      return null;
    }

    // mark adjacent text nodes as skipped,
    // because we are using node.wholeText to compile
    // all adjacent text nodes together. This fixes
    // issues in IE where sometimes it splits up a single
    // text node into multiple ones.
    var next = node.nextSibling;
    while (next && next.nodeType === 3) {
      next._skip = true;
      next = next.nextSibling;
    }

    var frag = document.createDocumentFragment();
    var el, token;
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i];
      el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
      frag.appendChild(el);
    }
    return makeTextNodeLinkFn(tokens, frag, options);
  }

  /**
   * Linker for an skipped text node.
   *
   * @param {Vue} vm
   * @param {Text} node
   */

  function removeText(vm, node) {
    remove(node);
  }

  /**
   * Process a single text token.
   *
   * @param {Object} token
   * @param {Object} options
   * @return {Node}
   */

  function processTextToken(token, options) {
    var el;
    if (token.oneTime) {
      el = document.createTextNode(token.value);
    } else {
      if (token.html) {
        el = document.createComment('v-html');
        setTokenType('html');
      } else {
        // IE will clean up empty textNodes during
        // frag.cloneNode(true), so we have to give it
        // something here...
        el = document.createTextNode(' ');
        setTokenType('text');
      }
    }
    function setTokenType(type) {
      if (token.descriptor) return;
      var parsed = parseDirective(token.value);
      token.descriptor = {
        name: type,
        def: directives[type],
        expression: parsed.expression,
        filters: parsed.filters
      };
    }
    return el;
  }

  /**
   * Build a function that processes a textNode.
   *
   * @param {Array<Object>} tokens
   * @param {DocumentFragment} frag
   */

  function makeTextNodeLinkFn(tokens, frag) {
    return function textNodeLinkFn(vm, el, host, scope) {
      var fragClone = frag.cloneNode(true);
      var childNodes = toArray(fragClone.childNodes);
      var token, value, node;
      for (var i = 0, l = tokens.length; i < l; i++) {
        token = tokens[i];
        value = token.value;
        if (token.tag) {
          node = childNodes[i];
          if (token.oneTime) {
            value = (scope || vm).$eval(value);
            if (token.html) {
              replace(node, parseTemplate(value, true));
            } else {
              node.data = value;
            }
          } else {
            vm._bindDir(token.descriptor, node, host, scope);
          }
        }
      }
      replace(el, fragClone);
    };
  }

  /**
   * Compile a node list and return a childLinkFn.
   *
   * @param {NodeList} nodeList
   * @param {Object} options
   * @return {Function|undefined}
   */

  function compileNodeList(nodeList, options) {
    var linkFns = [];
    var nodeLinkFn, childLinkFn, node;
    for (var i = 0, l = nodeList.length; i < l; i++) {
      node = nodeList[i];
      nodeLinkFn = compileNode(node, options);
      childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
      linkFns.push(nodeLinkFn, childLinkFn);
    }
    return linkFns.length ? makeChildLinkFn(linkFns) : null;
  }

  /**
   * Make a child link function for a node's childNodes.
   *
   * @param {Array<Function>} linkFns
   * @return {Function} childLinkFn
   */

  function makeChildLinkFn(linkFns) {
    return function childLinkFn(vm, nodes, host, scope, frag) {
      var node, nodeLinkFn, childrenLinkFn;
      for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
        node = nodes[n];
        nodeLinkFn = linkFns[i++];
        childrenLinkFn = linkFns[i++];
        // cache childNodes before linking parent, fix #657
        var childNodes = toArray(node.childNodes);
        if (nodeLinkFn) {
          nodeLinkFn(vm, node, host, scope, frag);
        }
        if (childrenLinkFn) {
          childrenLinkFn(vm, childNodes, host, scope, frag);
        }
      }
    };
  }

  /**
   * Check for element directives (custom elements that should
   * be resovled as terminal directives).
   *
   * @param {Element} el
   * @param {Object} options
   */

  function checkElementDirectives(el, options) {
    var tag = el.tagName.toLowerCase();
    if (commonTagRE.test(tag)) {
      return;
    }
    var def = resolveAsset(options, 'elementDirectives', tag);
    if (def) {
      return makeTerminalNodeLinkFn(el, tag, '', options, def);
    }
  }

  /**
   * Check if an element is a component. If yes, return
   * a component link function.
   *
   * @param {Element} el
   * @param {Object} options
   * @return {Function|undefined}
   */

  function checkComponent(el, options) {
    var component = checkComponentAttr(el, options);
    if (component) {
      var ref = findRef(el);
      var descriptor = {
        name: 'component',
        ref: ref,
        expression: component.id,
        def: internalDirectives.component,
        modifiers: {
          literal: !component.dynamic
        }
      };
      var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
        if (ref) {
          defineReactive((scope || vm).$refs, ref, null);
        }
        vm._bindDir(descriptor, el, host, scope, frag);
      };
      componentLinkFn.terminal = true;
      return componentLinkFn;
    }
  }

  /**
   * Check an element for terminal directives in fixed order.
   * If it finds one, return a terminal link function.
   *
   * @param {Element} el
   * @param {Array} attrs
   * @param {Object} options
   * @return {Function} terminalLinkFn
   */

  function checkTerminalDirectives(el, attrs, options) {
    // skip v-pre
    if (getAttr(el, 'v-pre') !== null) {
      return skip;
    }
    // skip v-else block, but only if following v-if
    if (el.hasAttribute('v-else')) {
      var prev = el.previousElementSibling;
      if (prev && prev.hasAttribute('v-if')) {
        return skip;
      }
    }

    var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
    for (var i = 0, j = attrs.length; i < j; i++) {
      attr = attrs[i];
      modifiers = parseModifiers(attr.name);
      name = attr.name.replace(modifierRE, '');
      if (matched = name.match(dirAttrRE)) {
        def = resolveAsset(options, 'directives', matched[1]);
        if (def && def.terminal) {
          if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
            termDef = def;
            rawName = attr.name;
            value = attr.value;
            dirName = matched[1];
            arg = matched[2];
          }
        }
      }
    }

    if (termDef) {
      return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
    }
  }

  function skip() {}
  skip.terminal = true;

  /**
   * Build a node link function for a terminal directive.
   * A terminal link function terminates the current
   * compilation recursion and handles compilation of the
   * subtree in the directive.
   *
   * @param {Element} el
   * @param {String} dirName
   * @param {String} value
   * @param {Object} options
   * @param {Object} def
   * @param {String} [rawName]
   * @param {String} [arg]
   * @param {Object} [modifiers]
   * @return {Function} terminalLinkFn
   */

  function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
    var parsed = parseDirective(value);
    var descriptor = {
      name: dirName,
      arg: arg,
      expression: parsed.expression,
      filters: parsed.filters,
      raw: value,
      attr: rawName,
      modifiers: modifiers,
      def: def
    };
    // check ref for v-for and router-view
    if (dirName === 'for' || dirName === 'router-view') {
      descriptor.ref = findRef(el);
    }
    var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
      if (descriptor.ref) {
        defineReactive((scope || vm).$refs, descriptor.ref, null);
      }
      vm._bindDir(descriptor, el, host, scope, frag);
    };
    fn.terminal = true;
    return fn;
  }

  /**
   * Compile the directives on an element and return a linker.
   *
   * @param {Array|NamedNodeMap} attrs
   * @param {Object} options
   * @return {Function}
   */

  function compileDirectives(attrs, options) {
    var i = attrs.length;
    var dirs = [];
    var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
    while (i--) {
      attr = attrs[i];
      name = rawName = attr.name;
      value = rawValue = attr.value;
      tokens = parseText(value);
      // reset arg
      arg = null;
      // check modifiers
      modifiers = parseModifiers(name);
      name = name.replace(modifierRE, '');

      // attribute interpolations
      if (tokens) {
        value = tokensToExp(tokens);
        arg = name;
        pushDir('bind', directives.bind, tokens);
        // warn against mixing mustaches with v-bind
        if ('development' !== 'production') {
          if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
                return attr.name === ':class' || attr.name === 'v-bind:class';
              })) {
            warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
          }
        }
      } else

      // special attribute: transition
      if (transitionRE.test(name)) {
        modifiers.literal = !bindRE.test(name);
        pushDir('transition', internalDirectives.transition);
      } else

      // event handlers
      if (onRE.test(name)) {
        arg = name.replace(onRE, '');
        pushDir('on', directives.on);
      } else

      // attribute bindings
      if (bindRE.test(name)) {
        dirName = name.replace(bindRE, '');
        if (dirName === 'style' || dirName === 'class') {
          pushDir(dirName, internalDirectives[dirName]);
        } else {
          arg = dirName;
          pushDir('bind', directives.bind);
        }
      } else

      // normal directives
      if (matched = name.match(dirAttrRE)) {
        dirName = matched[1];
        arg = matched[2];

        // skip v-else (when used with v-show)
        if (dirName === 'else') {
          continue;
        }

        dirDef = resolveAsset(options, 'directives', dirName);

        if ('development' !== 'production') {
          assertAsset(dirDef, 'directive', dirName);
        }

        if (dirDef) {
          pushDir(dirName, dirDef);
        }
      }
    }

    /**
     * Push a directive.
     *
     * @param {String} dirName
     * @param {Object|Function} def
     * @param {Array} [interpTokens]
     */

    function pushDir(dirName, def, interpTokens) {
      var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
      var parsed = !hasOneTimeToken && parseDirective(value);
      dirs.push({
        name: dirName,
        attr: rawName,
        raw: rawValue,
        def: def,
        arg: arg,
        modifiers: modifiers,
        // conversion from interpolation strings with one-time token
        // to expression is differed until directive bind time so that we
        // have access to the actual vm context for one-time bindings.
        expression: parsed && parsed.expression,
        filters: parsed && parsed.filters,
        interp: interpTokens,
        hasOneTime: hasOneTimeToken
      });
    }

    if (dirs.length) {
      return makeNodeLinkFn(dirs);
    }
  }

  /**
   * Parse modifiers from directive attribute name.
   *
   * @param {String} name
   * @return {Object}
   */

  function parseModifiers(name) {
    var res = Object.create(null);
    var match = name.match(modifierRE);
    if (match) {
      var i = match.length;
      while (i--) {
        res[match[i].slice(1)] = true;
      }
    }
    return res;
  }

  /**
   * Build a link function for all directives on a single node.
   *
   * @param {Array} directives
   * @return {Function} directivesLinkFn
   */

  function makeNodeLinkFn(directives) {
    return function nodeLinkFn(vm, el, host, scope, frag) {
      // reverse apply because it's sorted low to high
      var i = directives.length;
      while (i--) {
        vm._bindDir(directives[i], el, host, scope, frag);
      }
    };
  }

  /**
   * Check if an interpolation string contains one-time tokens.
   *
   * @param {Array} tokens
   * @return {Boolean}
   */

  function hasOneTime(tokens) {
    var i = tokens.length;
    while (i--) {
      if (tokens[i].oneTime) return true;
    }
  }

  var specialCharRE = /[^\w\-:\.]/;

  /**
   * Process an element or a DocumentFragment based on a
   * instance option object. This allows us to transclude
   * a template node/fragment before the instance is created,
   * so the processed fragment can then be cloned and reused
   * in v-for.
   *
   * @param {Element} el
   * @param {Object} options
   * @return {Element|DocumentFragment}
   */

  function transclude(el, options) {
    // extract container attributes to pass them down
    // to compiler, because they need to be compiled in
    // parent scope. we are mutating the options object here
    // assuming the same object will be used for compile
    // right after this.
    if (options) {
      options._containerAttrs = extractAttrs(el);
    }
    // for template tags, what we want is its content as
    // a documentFragment (for fragment instances)
    if (isTemplate(el)) {
      el = parseTemplate(el);
    }
    if (options) {
      if (options._asComponent && !options.template) {
        options.template = '<slot></slot>';
      }
      if (options.template) {
        options._content = extractContent(el);
        el = transcludeTemplate(el, options);
      }
    }
    if (isFragment(el)) {
      // anchors for fragment instance
      // passing in `persist: true` to avoid them being
      // discarded by IE during template cloning
      prepend(createAnchor('v-start', true), el);
      el.appendChild(createAnchor('v-end', true));
    }
    return el;
  }

  /**
   * Process the template option.
   * If the replace option is true this will swap the $el.
   *
   * @param {Element} el
   * @param {Object} options
   * @return {Element|DocumentFragment}
   */

  function transcludeTemplate(el, options) {
    var template = options.template;
    var frag = parseTemplate(template, true);
    if (frag) {
      var replacer = frag.firstChild;
      var tag = replacer.tagName && replacer.tagName.toLowerCase();
      if (options.replace) {
        /* istanbul ignore if */
        if (el === document.body) {
          'development' !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
        }
        // there are many cases where the instance must
        // become a fragment instance: basically anything that
        // can create more than 1 root nodes.
        if (
            // multi-children template
        frag.childNodes.length > 1 ||
          // non-element template
        replacer.nodeType !== 1 ||
          // single nested component
        tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
          // element directive
        resolveAsset(options, 'elementDirectives', tag) ||
          // for block
        replacer.hasAttribute('v-for') ||
          // if block
        replacer.hasAttribute('v-if')) {
          return frag;
        } else {
          options._replacerAttrs = extractAttrs(replacer);
          mergeAttrs(el, replacer);
          return replacer;
        }
      } else {
        el.appendChild(frag);
        return el;
      }
    } else {
      'development' !== 'production' && warn('Invalid template option: ' + template);
    }
  }

  /**
   * Helper to extract a component container's attributes
   * into a plain object array.
   *
   * @param {Element} el
   * @return {Array}
   */

  function extractAttrs(el) {
    if (el.nodeType === 1 && el.hasAttributes()) {
      return toArray(el.attributes);
    }
  }

  /**
   * Merge the attributes of two elements, and make sure
   * the class names are merged properly.
   *
   * @param {Element} from
   * @param {Element} to
   */

  function mergeAttrs(from, to) {
    var attrs = from.attributes;
    var i = attrs.length;
    var name, value;
    while (i--) {
      name = attrs[i].name;
      value = attrs[i].value;
      if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
        to.setAttribute(name, value);
      } else if (name === 'class' && !parseText(value)) {
        value.trim().split(/\s+/).forEach(function (cls) {
          addClass(to, cls);
        });
      }
    }
  }

  /**
   * Scan and determine slot content distribution.
   * We do this during transclusion instead at compile time so that
   * the distribution is decoupled from the compilation order of
   * the slots.
   *
   * @param {Element|DocumentFragment} template
   * @param {Element} content
   * @param {Vue} vm
   */

  function resolveSlots(vm, content) {
    if (!content) {
      return;
    }
    var contents = vm._slotContents = Object.create(null);
    var el, name;
    for (var i = 0, l = content.children.length; i < l; i++) {
      el = content.children[i];
      /* eslint-disable no-cond-assign */
      if (name = el.getAttribute('slot')) {
        (contents[name] || (contents[name] = [])).push(el);
      }
      /* eslint-enable no-cond-assign */
      if ('development' !== 'production' && getBindAttr(el, 'slot')) {
        warn('The "slot" attribute must be static.');
      }
    }
    for (name in contents) {
      contents[name] = extractFragment(contents[name], content);
    }
    if (content.hasChildNodes()) {
      contents['default'] = extractFragment(content.childNodes, content);
    }
  }

  /**
   * Extract qualified content nodes from a node list.
   *
   * @param {NodeList} nodes
   * @return {DocumentFragment}
   */

  function extractFragment(nodes, parent) {
    var frag = document.createDocumentFragment();
    nodes = toArray(nodes);
    for (var i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
        parent.removeChild(node);
        node = parseTemplate(node);
      }
      frag.appendChild(node);
    }
    return frag;
  }



  var compiler = Object.freeze({
    compile: compile,
    compileAndLinkProps: compileAndLinkProps,
    compileRoot: compileRoot,
    transclude: transclude,
    resolveSlots: resolveSlots
  });

  function stateMixin (Vue) {
    /**
     * Accessor for `$data` property, since setting $data
     * requires observing the new object and updating
     * proxied properties.
     */

    Object.defineProperty(Vue.prototype, '$data', {
      get: function get() {
        return this._data;
      },
      set: function set(newData) {
        if (newData !== this._data) {
          this._setData(newData);
        }
      }
    });

    /**
     * Setup the scope of an instance, which contains:
     * - observed data
     * - computed properties
     * - user methods
     * - meta properties
     */

    Vue.prototype._initState = function () {
      this._initProps();
      this._initMeta();
      this._initMethods();
      this._initData();
      this._initComputed();
    };

    /**
     * Initialize props.
     */

    Vue.prototype._initProps = function () {
      var options = this.$options;
      var el = options.el;
      var props = options.props;
      if (props && !el) {
        'development' !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
      }
      // make sure to convert string selectors into element now
      el = options.el = query(el);
      this._propsUnlinkFn = el && el.nodeType === 1 && props
        // props must be linked in proper scope if inside v-for
          ? compileAndLinkProps(this, el, props, this._scope) : null;
    };

    /**
     * Initialize the data.
     */

    Vue.prototype._initData = function () {
      var dataFn = this.$options.data;
      var data = this._data = dataFn ? dataFn() : {};
      if (!isPlainObject(data)) {
        data = {};
        'development' !== 'production' && warn('data functions should return an object.');
      }
      var props = this._props;
      var runtimeData = this._runtimeData ? typeof this._runtimeData === 'function' ? this._runtimeData() : this._runtimeData : null;
      // proxy data on instance
      var keys = Object.keys(data);
      var i, key;
      i = keys.length;
      while (i--) {
        key = keys[i];
        // there are two scenarios where we can proxy a data key:
        // 1. it's not already defined as a prop
        // 2. it's provided via a instantiation option AND there are no
        //    template prop present
        if (!props || !hasOwn(props, key) || runtimeData && hasOwn(runtimeData, key) && props[key].raw === null) {
          this._proxy(key);
        } else if ('development' !== 'production') {
          warn('Data field "' + key + '" is already defined ' + 'as a prop. Use prop default value instead.');
        }
      }
      // observe data
      observe(data, this);
    };

    /**
     * Swap the instance's $data. Called in $data's setter.
     *
     * @param {Object} newData
     */

    Vue.prototype._setData = function (newData) {
      newData = newData || {};
      var oldData = this._data;
      this._data = newData;
      var keys, key, i;
      // unproxy keys not present in new data
      keys = Object.keys(oldData);
      i = keys.length;
      while (i--) {
        key = keys[i];
        if (!(key in newData)) {
          this._unproxy(key);
        }
      }
      // proxy keys not already proxied,
      // and trigger change for changed values
      keys = Object.keys(newData);
      i = keys.length;
      while (i--) {
        key = keys[i];
        if (!hasOwn(this, key)) {
          // new property
          this._proxy(key);
        }
      }
      oldData.__ob__.removeVm(this);
      observe(newData, this);
      this._digest();
    };

    /**
     * Proxy a property, so that
     * vm.prop === vm._data.prop
     *
     * @param {String} key
     */

    Vue.prototype._proxy = function (key) {
      if (!isReserved(key)) {
        // need to store ref to self here
        // because these getter/setters might
        // be called by child scopes via
        // prototype inheritance.
        var self = this;
        Object.defineProperty(self, key, {
          configurable: true,
          enumerable: true,
          get: function proxyGetter() {
            return self._data[key];
          },
          set: function proxySetter(val) {
            self._data[key] = val;
          }
        });
      }
    };

    /**
     * Unproxy a property.
     *
     * @param {String} key
     */

    Vue.prototype._unproxy = function (key) {
      if (!isReserved(key)) {
        delete this[key];
      }
    };

    /**
     * Force update on every watcher in scope.
     */

    Vue.prototype._digest = function () {
      for (var i = 0, l = this._watchers.length; i < l; i++) {
        this._watchers[i].update(true); // shallow updates
      }
    };

    /**
     * Setup computed properties. They are essentially
     * special getter/setters
     */

    function noop() {}
    Vue.prototype._initComputed = function () {
      var computed = this.$options.computed;
      if (computed) {
        for (var key in computed) {
          var userDef = computed[key];
          var def = {
            enumerable: true,
            configurable: true
          };
          if (typeof userDef === 'function') {
            def.get = makeComputedGetter(userDef, this);
            def.set = noop;
          } else {
            def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
            def.set = userDef.set ? bind(userDef.set, this) : noop;
          }
          Object.defineProperty(this, key, def);
        }
      }
    };

    function makeComputedGetter(getter, owner) {
      var watcher = new Watcher(owner, getter, null, {
        lazy: true
      });
      return function computedGetter() {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value;
      };
    }

    /**
     * Setup instance methods. Methods must be bound to the
     * instance since they might be passed down as a prop to
     * child components.
     */

    Vue.prototype._initMethods = function () {
      var methods = this.$options.methods;
      if (methods) {
        for (var key in methods) {
          this[key] = bind(methods[key], this);
        }
      }
    };

    /**
     * Initialize meta information like $index, $key & $value.
     */

    Vue.prototype._initMeta = function () {
      var metas = this.$options._meta;
      if (metas) {
        for (var key in metas) {
          defineReactive(this, key, metas[key]);
        }
      }
    };
  }

  var eventRE = /^v-on:|^@/;

  function eventsMixin (Vue) {
    /**
     * Setup the instance's option events & watchers.
     * If the value is a string, we pull it from the
     * instance's methods by name.
     */

    Vue.prototype._initEvents = function () {
      var options = this.$options;
      if (options._asComponent) {
        registerComponentEvents(this, options.el);
      }
      registerCallbacks(this, '$on', options.events);
      registerCallbacks(this, '$watch', options.watch);
    };

    /**
     * Register v-on events on a child component
     *
     * @param {Vue} vm
     * @param {Element} el
     */

    function registerComponentEvents(vm, el) {
      var attrs = el.attributes;
      var name, handler;
      for (var i = 0, l = attrs.length; i < l; i++) {
        name = attrs[i].name;
        if (eventRE.test(name)) {
          name = name.replace(eventRE, '');
          handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
          if (typeof handler === 'function') {
            handler._fromParent = true;
            vm.$on(name.replace(eventRE), handler);
          } else if ('development' !== 'production') {
            warn('v-on:' + name + '="' + attrs[i].value + '"' + (vm.$options.name ? ' on component <' + vm.$options.name + '>' : '') + ' expects a function value, got ' + handler);
          }
        }
      }
    }

    /**
     * Register callbacks for option events and watchers.
     *
     * @param {Vue} vm
     * @param {String} action
     * @param {Object} hash
     */

    function registerCallbacks(vm, action, hash) {
      if (!hash) return;
      var handlers, key, i, j;
      for (key in hash) {
        handlers = hash[key];
        if (isArray(handlers)) {
          for (i = 0, j = handlers.length; i < j; i++) {
            register(vm, action, key, handlers[i]);
          }
        } else {
          register(vm, action, key, handlers);
        }
      }
    }

    /**
     * Helper to register an event/watch callback.
     *
     * @param {Vue} vm
     * @param {String} action
     * @param {String} key
     * @param {Function|String|Object} handler
     * @param {Object} [options]
     */

    function register(vm, action, key, handler, options) {
      var type = typeof handler;
      if (type === 'function') {
        vm[action](key, handler, options);
      } else if (type === 'string') {
        var methods = vm.$options.methods;
        var method = methods && methods[handler];
        if (method) {
          vm[action](key, method, options);
        } else {
          'development' !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
        }
      } else if (handler && type === 'object') {
        register(vm, action, key, handler.handler, handler);
      }
    }

    /**
     * Setup recursive attached/detached calls
     */

    Vue.prototype._initDOMHooks = function () {
      this.$on('hook:attached', onAttached);
      this.$on('hook:detached', onDetached);
    };

    /**
     * Callback to recursively call attached hook on children
     */

    function onAttached() {
      if (!this._isAttached) {
        this._isAttached = true;
        this.$children.forEach(callAttach);
      }
    }

    /**
     * Iterator to call attached hook
     *
     * @param {Vue} child
     */

    function callAttach(child) {
      if (!child._isAttached && inDoc(child.$el)) {
        child._callHook('attached');
      }
    }

    /**
     * Callback to recursively call detached hook on children
     */

    function onDetached() {
      if (this._isAttached) {
        this._isAttached = false;
        this.$children.forEach(callDetach);
      }
    }

    /**
     * Iterator to call detached hook
     *
     * @param {Vue} child
     */

    function callDetach(child) {
      if (child._isAttached && !inDoc(child.$el)) {
        child._callHook('detached');
      }
    }

    /**
     * Trigger all handlers for a hook
     *
     * @param {String} hook
     */

    Vue.prototype._callHook = function (hook) {
      this.$emit('pre-hook:' + hook);
      var handlers = this.$options[hook];
      if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
          handlers[i].call(this);
        }
      }
      this.$emit('hook:' + hook);
    };
  }

  function noop() {}

  /**
   * A directive links a DOM element with a piece of data,
   * which is the result of evaluating an expression.
   * It registers a watcher with the expression and calls
   * the DOM update function when a change is triggered.
   *
   * @param {Object} descriptor
   *                 - {String} name
   *                 - {Object} def
   *                 - {String} expression
   *                 - {Array<Object>} [filters]
   *                 - {Object} [modifiers]
   *                 - {Boolean} literal
   *                 - {String} attr
   *                 - {String} arg
   *                 - {String} raw
   *                 - {String} [ref]
   *                 - {Array<Object>} [interp]
   *                 - {Boolean} [hasOneTime]
   * @param {Vue} vm
   * @param {Node} el
   * @param {Vue} [host] - transclusion host component
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - owner fragment
   * @constructor
   */
  function Directive(descriptor, vm, el, host, scope, frag) {
    this.vm = vm;
    this.el = el;
    // copy descriptor properties
    this.descriptor = descriptor;
    this.name = descriptor.name;
    this.expression = descriptor.expression;
    this.arg = descriptor.arg;
    this.modifiers = descriptor.modifiers;
    this.filters = descriptor.filters;
    this.literal = this.modifiers && this.modifiers.literal;
    // private
    this._locked = false;
    this._bound = false;
    this._listeners = null;
    // link context
    this._host = host;
    this._scope = scope;
    this._frag = frag;
    // store directives on node in dev mode
    if ('development' !== 'production' && this.el) {
      this.el._vue_directives = this.el._vue_directives || [];
      this.el._vue_directives.push(this);
    }
  }

  /**
   * Initialize the directive, mixin definition properties,
   * setup the watcher, call definition bind() and update()
   * if present.
   */

  Directive.prototype._bind = function () {
    var name = this.name;
    var descriptor = this.descriptor;

    // remove attribute
    if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
      var attr = descriptor.attr || 'v-' + name;
      this.el.removeAttribute(attr);
    }

    // copy def properties
    var def = descriptor.def;
    if (typeof def === 'function') {
      this.update = def;
    } else {
      extend(this, def);
    }

    // setup directive params
    this._setupParams();

    // initial bind
    if (this.bind) {
      this.bind();
    }
    this._bound = true;

    if (this.literal) {
      this.update && this.update(descriptor.raw);
    } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
      // wrapped updater for context
      var dir = this;
      if (this.update) {
        this._update = function (val, oldVal) {
          if (!dir._locked) {
            dir.update(val, oldVal);
          }
        };
      } else {
        this._update = noop;
      }
      var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
      var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
      var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
          {
            filters: this.filters,
            twoWay: this.twoWay,
            deep: this.deep,
            preProcess: preProcess,
            postProcess: postProcess,
            scope: this._scope
          });
      // v-model with inital inline value need to sync back to
      // model instead of update to DOM on init. They would
      // set the afterBind hook to indicate that.
      if (this.afterBind) {
        this.afterBind();
      } else if (this.update) {
        this.update(watcher.value);
      }
    }
  };

  /**
   * Setup all param attributes, e.g. track-by,
   * transition-mode, etc...
   */

  Directive.prototype._setupParams = function () {
    if (!this.params) {
      return;
    }
    var params = this.params;
    // swap the params array with a fresh object.
    this.params = Object.create(null);
    var i = params.length;
    var key, val, mappedKey;
    while (i--) {
      key = hyphenate(params[i]);
      mappedKey = camelize(key);
      val = getBindAttr(this.el, key);
      if (val != null) {
        // dynamic
        this._setupParamWatcher(mappedKey, val);
      } else {
        // static
        val = getAttr(this.el, key);
        if (val != null) {
          this.params[mappedKey] = val === '' ? true : val;
        }
      }
    }
  };

  /**
   * Setup a watcher for a dynamic param.
   *
   * @param {String} key
   * @param {String} expression
   */

  Directive.prototype._setupParamWatcher = function (key, expression) {
    var self = this;
    var called = false;
    var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
      self.params[key] = val;
      // since we are in immediate mode,
      // only call the param change callbacks if this is not the first update.
      if (called) {
        var cb = self.paramWatchers && self.paramWatchers[key];
        if (cb) {
          cb.call(self, val, oldVal);
        }
      } else {
        called = true;
      }
    }, {
      immediate: true,
      user: false
    });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
  };

  /**
   * Check if the directive is a function caller
   * and if the expression is a callable one. If both true,
   * we wrap up the expression and use it as the event
   * handler.
   *
   * e.g. on-click="a++"
   *
   * @return {Boolean}
   */

  Directive.prototype._checkStatement = function () {
    var expression = this.expression;
    if (expression && this.acceptStatement && !isSimplePath(expression)) {
      var fn = parseExpression(expression).get;
      var scope = this._scope || this.vm;
      var handler = function handler(e) {
        scope.$event = e;
        fn.call(scope, scope);
        scope.$event = null;
      };
      if (this.filters) {
        handler = scope._applyFilters(handler, null, this.filters);
      }
      this.update(handler);
      return true;
    }
  };

  /**
   * Set the corresponding value with the setter.
   * This should only be used in two-way directives
   * e.g. v-model.
   *
   * @param {*} value
   * @public
   */

  Directive.prototype.set = function (value) {
    /* istanbul ignore else */
    if (this.twoWay) {
      this._withLock(function () {
        this._watcher.set(value);
      });
    } else if ('development' !== 'production') {
      warn('Directive.set() can only be used inside twoWay' + 'directives.');
    }
  };

  /**
   * Execute a function while preventing that function from
   * triggering updates on this directive instance.
   *
   * @param {Function} fn
   */

  Directive.prototype._withLock = function (fn) {
    var self = this;
    self._locked = true;
    fn.call(self);
    nextTick(function () {
      self._locked = false;
    });
  };

  /**
   * Convenience method that attaches a DOM event listener
   * to the directive element and autometically tears it down
   * during unbind.
   *
   * @param {String} event
   * @param {Function} handler
   * @param {Boolean} [useCapture]
   */

  Directive.prototype.on = function (event, handler, useCapture) {
    on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
  };

  /**
   * Teardown the watcher and call unbind.
   */

  Directive.prototype._teardown = function () {
    if (this._bound) {
      this._bound = false;
      if (this.unbind) {
        this.unbind();
      }
      if (this._watcher) {
        this._watcher.teardown();
      }
      var listeners = this._listeners;
      var i;
      if (listeners) {
        i = listeners.length;
        while (i--) {
          off(this.el, listeners[i][0], listeners[i][1]);
        }
      }
      var unwatchFns = this._paramUnwatchFns;
      if (unwatchFns) {
        i = unwatchFns.length;
        while (i--) {
          unwatchFns[i]();
        }
      }
      if ('development' !== 'production' && this.el) {
        this.el._vue_directives.$remove(this);
      }
      this.vm = this.el = this._watcher = this._listeners = null;
    }
  };

  function lifecycleMixin (Vue) {
    /**
     * Update v-ref for component.
     *
     * @param {Boolean} remove
     */

    Vue.prototype._updateRef = function (remove) {
      var ref = this.$options._ref;
      if (ref) {
        var refs = (this._scope || this._context).$refs;
        if (remove) {
          if (refs[ref] === this) {
            refs[ref] = null;
          }
        } else {
          refs[ref] = this;
        }
      }
    };

    /**
     * Transclude, compile and link element.
     *
     * If a pre-compiled linker is available, that means the
     * passed in element will be pre-transcluded and compiled
     * as well - all we need to do is to call the linker.
     *
     * Otherwise we need to call transclude/compile/link here.
     *
     * @param {Element} el
     */

    Vue.prototype._compile = function (el) {
      var options = this.$options;

      // transclude and init element
      // transclude can potentially replace original
      // so we need to keep reference; this step also injects
      // the template and caches the original attributes
      // on the container node and replacer node.
      var original = el;
      el = transclude(el, options);
      this._initElement(el);

      // handle v-pre on root node (#2026)
      if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
        return;
      }

      // root is always compiled per-instance, because
      // container attrs and props can be different every time.
      var contextOptions = this._context && this._context.$options;
      var rootLinker = compileRoot(el, options, contextOptions);

      // resolve slot distribution
      resolveSlots(this, options._content);

      // compile and link the rest
      var contentLinkFn;
      var ctor = this.constructor;
      // component compilation can be cached
      // as long as it's not using inline-template
      if (options._linkerCachable) {
        contentLinkFn = ctor.linker;
        if (!contentLinkFn) {
          contentLinkFn = ctor.linker = compile(el, options);
        }
      }

      // link phase
      // make sure to link root with prop scope!
      var rootUnlinkFn = rootLinker(this, el, this._scope);
      var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

      // register composite unlink function
      // to be called during instance destruction
      this._unlinkFn = function () {
        rootUnlinkFn();
        // passing destroying: true to avoid searching and
        // splicing the directives
        contentUnlinkFn(true);
      };

      // finally replace original
      if (options.replace) {
        replace(original, el);
      }

      this._isCompiled = true;
      this._callHook('compiled');
    };

    /**
     * Initialize instance element. Called in the public
     * $mount() method.
     *
     * @param {Element} el
     */

    Vue.prototype._initElement = function (el) {
      if (isFragment(el)) {
        this._isFragment = true;
        this.$el = this._fragmentStart = el.firstChild;
        this._fragmentEnd = el.lastChild;
        // set persisted text anchors to empty
        if (this._fragmentStart.nodeType === 3) {
          this._fragmentStart.data = this._fragmentEnd.data = '';
        }
        this._fragment = el;
      } else {
        this.$el = el;
      }
      this.$el.__vue__ = this;
      this._callHook('beforeCompile');
    };

    /**
     * Create and bind a directive to an element.
     *
     * @param {Object} descriptor - parsed directive descriptor
     * @param {Node} node   - target node
     * @param {Vue} [host] - transclusion host component
     * @param {Object} [scope] - v-for scope
     * @param {Fragment} [frag] - owner fragment
     */

    Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
      this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
    };

    /**
     * Teardown an instance, unobserves the data, unbind all the
     * directives, turn off all the event listeners, etc.
     *
     * @param {Boolean} remove - whether to remove the DOM node.
     * @param {Boolean} deferCleanup - if true, defer cleanup to
     *                                 be called later
     */

    Vue.prototype._destroy = function (remove, deferCleanup) {
      if (this._isBeingDestroyed) {
        if (!deferCleanup) {
          this._cleanup();
        }
        return;
      }

      var destroyReady;
      var pendingRemoval;

      var self = this;
      // Cleanup should be called either synchronously or asynchronoysly as
      // callback of this.$remove(), or if remove and deferCleanup are false.
      // In any case it should be called after all other removing, unbinding and
      // turning of is done
      var cleanupIfPossible = function cleanupIfPossible() {
        if (destroyReady && !pendingRemoval && !deferCleanup) {
          self._cleanup();
        }
      };

      // remove DOM element
      if (remove && this.$el) {
        pendingRemoval = true;
        this.$remove(function () {
          pendingRemoval = false;
          cleanupIfPossible();
        });
      }

      this._callHook('beforeDestroy');
      this._isBeingDestroyed = true;
      var i;
      // remove self from parent. only necessary
      // if parent is not being destroyed as well.
      var parent = this.$parent;
      if (parent && !parent._isBeingDestroyed) {
        parent.$children.$remove(this);
        // unregister ref (remove: true)
        this._updateRef(true);
      }
      // destroy all children.
      i = this.$children.length;
      while (i--) {
        this.$children[i].$destroy();
      }
      // teardown props
      if (this._propsUnlinkFn) {
        this._propsUnlinkFn();
      }
      // teardown all directives. this also tearsdown all
      // directive-owned watchers.
      if (this._unlinkFn) {
        this._unlinkFn();
      }
      i = this._watchers.length;
      while (i--) {
        this._watchers[i].teardown();
      }
      // remove reference to self on $el
      if (this.$el) {
        this.$el.__vue__ = null;
      }

      destroyReady = true;
      cleanupIfPossible();
    };

    /**
     * Clean up to ensure garbage collection.
     * This is called after the leave transition if there
     * is any.
     */

    Vue.prototype._cleanup = function () {
      if (this._isDestroyed) {
        return;
      }
      // remove self from owner fragment
      // do it in cleanup so that we can call $destroy with
      // defer right when a fragment is about to be removed.
      if (this._frag) {
        this._frag.children.$remove(this);
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (this._data.__ob__) {
        this._data.__ob__.removeVm(this);
      }
      // Clean up references to private properties and other
      // instances. preserve reference to _data so that proxy
      // accessors still work. The only potential side effect
      // here is that mutating the instance after it's destroyed
      // may affect the state of other components that are still
      // observing the same object, but that seems to be a
      // reasonable responsibility for the user rather than
      // always throwing an error on them.
      this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
      // call the last hook...
      this._isDestroyed = true;
      this._callHook('destroyed');
      // turn off all instance listeners.
      this.$off();
    };
  }

  function miscMixin (Vue) {
    /**
     * Apply a list of filter (descriptors) to a value.
     * Using plain for loops here because this will be called in
     * the getter of any watcher with filters so it is very
     * performance sensitive.
     *
     * @param {*} value
     * @param {*} [oldValue]
     * @param {Array} filters
     * @param {Boolean} write
     * @return {*}
     */

    Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
      var filter, fn, args, arg, offset, i, l, j, k;
      for (i = 0, l = filters.length; i < l; i++) {
        filter = filters[write ? l - i - 1 : i];
        fn = resolveAsset(this.$options, 'filters', filter.name);
        if ('development' !== 'production') {
          assertAsset(fn, 'filter', filter.name);
        }
        if (!fn) continue;
        fn = write ? fn.write : fn.read || fn;
        if (typeof fn !== 'function') continue;
        args = write ? [value, oldValue] : [value];
        offset = write ? 2 : 1;
        if (filter.args) {
          for (j = 0, k = filter.args.length; j < k; j++) {
            arg = filter.args[j];
            args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
          }
        }
        value = fn.apply(this, args);
      }
      return value;
    };

    /**
     * Resolve a component, depending on whether the component
     * is defined normally or using an async factory function.
     * Resolves synchronously if already resolved, otherwise
     * resolves asynchronously and caches the resolved
     * constructor on the factory.
     *
     * @param {String|Function} value
     * @param {Function} cb
     */

    Vue.prototype._resolveComponent = function (value, cb) {
      var factory;
      if (typeof value === 'function') {
        factory = value;
      } else {
        factory = resolveAsset(this.$options, 'components', value);
        if ('development' !== 'production') {
          assertAsset(factory, 'component', value);
        }
      }
      if (!factory) {
        return;
      }
      // async component factory
      if (!factory.options) {
        if (factory.resolved) {
          // cached
          cb(factory.resolved);
        } else if (factory.requested) {
          // pool callbacks
          factory.pendingCallbacks.push(cb);
        } else {
          factory.requested = true;
          var cbs = factory.pendingCallbacks = [cb];
          factory.call(this, function resolve(res) {
            if (isPlainObject(res)) {
              res = Vue.extend(res);
            }
            // cache resolved
            factory.resolved = res;
            // invoke callbacks
            for (var i = 0, l = cbs.length; i < l; i++) {
              cbs[i](res);
            }
          }, function reject(reason) {
            'development' !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
          });
        }
      } else {
        // normal component
        cb(factory);
      }
    };
  }

  var filterRE$1 = /[^|]\|[^|]/;

  function dataAPI (Vue) {
    /**
     * Get the value from an expression on this vm.
     *
     * @param {String} exp
     * @param {Boolean} [asStatement]
     * @return {*}
     */

    Vue.prototype.$get = function (exp, asStatement) {
      var res = parseExpression(exp);
      if (res) {
        if (asStatement && !isSimplePath(exp)) {
          var self = this;
          return function statementHandler() {
            self.$arguments = toArray(arguments);
            var result = res.get.call(self, self);
            self.$arguments = null;
            return result;
          };
        } else {
          try {
            return res.get.call(this, this);
          } catch (e) {}
        }
      }
    };

    /**
     * Set the value from an expression on this vm.
     * The expression must be a valid left-hand
     * expression in an assignment.
     *
     * @param {String} exp
     * @param {*} val
     */

    Vue.prototype.$set = function (exp, val) {
      var res = parseExpression(exp, true);
      if (res && res.set) {
        res.set.call(this, this, val);
      }
    };

    /**
     * Delete a property on the VM
     *
     * @param {String} key
     */

    Vue.prototype.$delete = function (key) {
      del(this._data, key);
    };

    /**
     * Watch an expression, trigger callback when its
     * value changes.
     *
     * @param {String|Function} expOrFn
     * @param {Function} cb
     * @param {Object} [options]
     *                 - {Boolean} deep
     *                 - {Boolean} immediate
     * @return {Function} - unwatchFn
     */

    Vue.prototype.$watch = function (expOrFn, cb, options) {
      var vm = this;
      var parsed;
      if (typeof expOrFn === 'string') {
        parsed = parseDirective(expOrFn);
        expOrFn = parsed.expression;
      }
      var watcher = new Watcher(vm, expOrFn, cb, {
        deep: options && options.deep,
        sync: options && options.sync,
        filters: parsed && parsed.filters,
        user: !options || options.user !== false
      });
      if (options && options.immediate) {
        cb.call(vm, watcher.value);
      }
      return function unwatchFn() {
        watcher.teardown();
      };
    };

    /**
     * Evaluate a text directive, including filters.
     *
     * @param {String} text
     * @param {Boolean} [asStatement]
     * @return {String}
     */

    Vue.prototype.$eval = function (text, asStatement) {
      // check for filters.
      if (filterRE$1.test(text)) {
        var dir = parseDirective(text);
        // the filter regex check might give false positive
        // for pipes inside strings, so it's possible that
        // we don't get any filters here
        var val = this.$get(dir.expression, asStatement);
        return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
      } else {
        // no filter
        return this.$get(text, asStatement);
      }
    };

    /**
     * Interpolate a piece of template text.
     *
     * @param {String} text
     * @return {String}
     */

    Vue.prototype.$interpolate = function (text) {
      var tokens = parseText(text);
      var vm = this;
      if (tokens) {
        if (tokens.length === 1) {
          return vm.$eval(tokens[0].value) + '';
        } else {
          return tokens.map(function (token) {
            return token.tag ? vm.$eval(token.value) : token.value;
          }).join('');
        }
      } else {
        return text;
      }
    };

    /**
     * Log instance data as a plain JS object
     * so that it is easier to inspect in console.
     * This method assumes console is available.
     *
     * @param {String} [path]
     */

    Vue.prototype.$log = function (path) {
      var data = path ? getPath(this._data, path) : this._data;
      if (data) {
        data = clean(data);
      }
      // include computed fields
      if (!path) {
        var key;
        for (key in this.$options.computed) {
          data[key] = clean(this[key]);
        }
        if (this._props) {
          for (key in this._props) {
            data[key] = clean(this[key]);
          }
        }
      }
      console.log(data);
    };

    /**
     * "clean" a getter/setter converted object into a plain
     * object copy.
     *
     * @param {Object} - obj
     * @return {Object}
     */

    function clean(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }

  function domAPI (Vue) {
    /**
     * Convenience on-instance nextTick. The callback is
     * auto-bound to the instance, and this avoids component
     * modules having to rely on the global Vue.
     *
     * @param {Function} fn
     */

    Vue.prototype.$nextTick = function (fn) {
      nextTick(fn, this);
    };

    /**
     * Append instance to target
     *
     * @param {Node} target
     * @param {Function} [cb]
     * @param {Boolean} [withTransition] - defaults to true
     */

    Vue.prototype.$appendTo = function (target, cb, withTransition) {
      return insert(this, target, cb, withTransition, append, appendWithTransition);
    };

    /**
     * Prepend instance to target
     *
     * @param {Node} target
     * @param {Function} [cb]
     * @param {Boolean} [withTransition] - defaults to true
     */

    Vue.prototype.$prependTo = function (target, cb, withTransition) {
      target = query(target);
      if (target.hasChildNodes()) {
        this.$before(target.firstChild, cb, withTransition);
      } else {
        this.$appendTo(target, cb, withTransition);
      }
      return this;
    };

    /**
     * Insert instance before target
     *
     * @param {Node} target
     * @param {Function} [cb]
     * @param {Boolean} [withTransition] - defaults to true
     */

    Vue.prototype.$before = function (target, cb, withTransition) {
      return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
    };

    /**
     * Insert instance after target
     *
     * @param {Node} target
     * @param {Function} [cb]
     * @param {Boolean} [withTransition] - defaults to true
     */

    Vue.prototype.$after = function (target, cb, withTransition) {
      target = query(target);
      if (target.nextSibling) {
        this.$before(target.nextSibling, cb, withTransition);
      } else {
        this.$appendTo(target.parentNode, cb, withTransition);
      }
      return this;
    };

    /**
     * Remove instance from DOM
     *
     * @param {Function} [cb]
     * @param {Boolean} [withTransition] - defaults to true
     */

    Vue.prototype.$remove = function (cb, withTransition) {
      if (!this.$el.parentNode) {
        return cb && cb();
      }
      var inDocument = this._isAttached && inDoc(this.$el);
      // if we are not in document, no need to check
      // for transitions
      if (!inDocument) withTransition = false;
      var self = this;
      var realCb = function realCb() {
        if (inDocument) self._callHook('detached');
        if (cb) cb();
      };
      if (this._isFragment) {
        removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
      } else {
        var op = withTransition === false ? removeWithCb : removeWithTransition;
        op(this.$el, this, realCb);
      }
      return this;
    };

    /**
     * Shared DOM insertion function.
     *
     * @param {Vue} vm
     * @param {Element} target
     * @param {Function} [cb]
     * @param {Boolean} [withTransition]
     * @param {Function} op1 - op for non-transition insert
     * @param {Function} op2 - op for transition insert
     * @return vm
     */

    function insert(vm, target, cb, withTransition, op1, op2) {
      target = query(target);
      var targetIsDetached = !inDoc(target);
      var op = withTransition === false || targetIsDetached ? op1 : op2;
      var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
      if (vm._isFragment) {
        mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
          op(node, target, vm);
        });
        cb && cb();
      } else {
        op(vm.$el, target, vm, cb);
      }
      if (shouldCallHook) {
        vm._callHook('attached');
      }
      return vm;
    }

    /**
     * Check for selectors
     *
     * @param {String|Element} el
     */

    function query(el) {
      return typeof el === 'string' ? document.querySelector(el) : el;
    }

    /**
     * Append operation that takes a callback.
     *
     * @param {Node} el
     * @param {Node} target
     * @param {Vue} vm - unused
     * @param {Function} [cb]
     */

    function append(el, target, vm, cb) {
      target.appendChild(el);
      if (cb) cb();
    }

    /**
     * InsertBefore operation that takes a callback.
     *
     * @param {Node} el
     * @param {Node} target
     * @param {Vue} vm - unused
     * @param {Function} [cb]
     */

    function beforeWithCb(el, target, vm, cb) {
      before(el, target);
      if (cb) cb();
    }

    /**
     * Remove operation that takes a callback.
     *
     * @param {Node} el
     * @param {Vue} vm - unused
     * @param {Function} [cb]
     */

    function removeWithCb(el, vm, cb) {
      remove(el);
      if (cb) cb();
    }
  }

  function eventsAPI (Vue) {
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     */

    Vue.prototype.$on = function (event, fn) {
      (this._events[event] || (this._events[event] = [])).push(fn);
      modifyListenerCount(this, event, 1);
      return this;
    };

    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     */

    Vue.prototype.$once = function (event, fn) {
      var self = this;
      function on() {
        self.$off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.$on(event, on);
      return this;
    };

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     */

    Vue.prototype.$off = function (event, fn) {
      var cbs;
      // all
      if (!arguments.length) {
        if (this.$parent) {
          for (event in this._events) {
            cbs = this._events[event];
            if (cbs) {
              modifyListenerCount(this, event, -cbs.length);
            }
          }
        }
        this._events = {};
        return this;
      }
      // specific event
      cbs = this._events[event];
      if (!cbs) {
        return this;
      }
      if (arguments.length === 1) {
        modifyListenerCount(this, event, -cbs.length);
        this._events[event] = null;
        return this;
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          modifyListenerCount(this, event, -1);
          cbs.splice(i, 1);
          break;
        }
      }
      return this;
    };

    /**
     * Trigger an event on self.
     *
     * @param {String|Object} event
     * @return {Boolean} shouldPropagate
     */

    Vue.prototype.$emit = function (event) {
      var isSource = typeof event === 'string';
      event = isSource ? event : event.name;
      var cbs = this._events[event];
      var shouldPropagate = isSource || !cbs;
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        // this is a somewhat hacky solution to the question raised
        // in #2102: for an inline component listener like <comp @test="doThis">,
        // the propagation handling is somewhat broken. Therefore we
        // need to treat these inline callbacks differently.
        var hasParentCbs = isSource && cbs.some(function (cb) {
              return cb._fromParent;
            });
        if (hasParentCbs) {
          shouldPropagate = false;
        }
        var args = toArray(arguments, 1);
        for (var i = 0, l = cbs.length; i < l; i++) {
          var cb = cbs[i];
          var res = cb.apply(this, args);
          if (res === true && (!hasParentCbs || cb._fromParent)) {
            shouldPropagate = true;
          }
        }
      }
      return shouldPropagate;
    };

    /**
     * Recursively broadcast an event to all children instances.
     *
     * @param {String|Object} event
     * @param {...*} additional arguments
     */

    Vue.prototype.$broadcast = function (event) {
      var isSource = typeof event === 'string';
      event = isSource ? event : event.name;
      // if no child has registered for this event,
      // then there's no need to broadcast.
      if (!this._eventsCount[event]) return;
      var children = this.$children;
      var args = toArray(arguments);
      if (isSource) {
        // use object event to indicate non-source emit
        // on children
        args[0] = { name: event, source: this };
      }
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        var shouldPropagate = child.$emit.apply(child, args);
        if (shouldPropagate) {
          child.$broadcast.apply(child, args);
        }
      }
      return this;
    };

    /**
     * Recursively propagate an event up the parent chain.
     *
     * @param {String} event
     * @param {...*} additional arguments
     */

    Vue.prototype.$dispatch = function (event) {
      var shouldPropagate = this.$emit.apply(this, arguments);
      if (!shouldPropagate) return;
      var parent = this.$parent;
      var args = toArray(arguments);
      // use object event to indicate non-source emit
      // on parents
      args[0] = { name: event, source: this };
      while (parent) {
        shouldPropagate = parent.$emit.apply(parent, args);
        parent = shouldPropagate ? parent.$parent : null;
      }
      return this;
    };

    /**
     * Modify the listener counts on all parents.
     * This bookkeeping allows $broadcast to return early when
     * no child has listened to a certain event.
     *
     * @param {Vue} vm
     * @param {String} event
     * @param {Number} count
     */

    var hookRE = /^hook:/;
    function modifyListenerCount(vm, event, count) {
      var parent = vm.$parent;
      // hooks do not get broadcasted so no need
      // to do bookkeeping for them
      if (!parent || !count || hookRE.test(event)) return;
      while (parent) {
        parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
        parent = parent.$parent;
      }
    }
  }

  function lifecycleAPI (Vue) {
    /**
     * Set instance target element and kick off the compilation
     * process. The passed in `el` can be a selector string, an
     * existing Element, or a DocumentFragment (for block
     * instances).
     *
     * @param {Element|DocumentFragment|string} el
     * @public
     */

    Vue.prototype.$mount = function (el) {
      if (this._isCompiled) {
        'development' !== 'production' && warn('$mount() should be called only once.');
        return;
      }
      el = query(el);
      if (!el) {
        el = document.createElement('div');
      }
      this._compile(el);
      this._initDOMHooks();
      if (inDoc(this.$el)) {
        this._callHook('attached');
        ready.call(this);
      } else {
        this.$once('hook:attached', ready);
      }
      return this;
    };

    /**
     * Mark an instance as ready.
     */

    function ready() {
      this._isAttached = true;
      this._isReady = true;
      this._callHook('ready');
    }

    /**
     * Teardown the instance, simply delegate to the internal
     * _destroy.
     *
     * @param {Boolean} remove
     * @param {Boolean} deferCleanup
     */

    Vue.prototype.$destroy = function (remove, deferCleanup) {
      this._destroy(remove, deferCleanup);
    };

    /**
     * Partially compile a piece of DOM and return a
     * decompile function.
     *
     * @param {Element|DocumentFragment} el
     * @param {Vue} [host]
     * @param {Object} [scope]
     * @param {Fragment} [frag]
     * @return {Function}
     */

    Vue.prototype.$compile = function (el, host, scope, frag) {
      return compile(el, this.$options, true)(this, el, host, scope, frag);
    };
  }

  /**
   * The exposed Vue constructor.
   *
   * API conventions:
   * - public API methods/properties are prefixed with `$`
   * - internal methods/properties are prefixed with `_`
   * - non-prefixed properties are assumed to be proxied user
   *   data.
   *
   * @constructor
   * @param {Object} [options]
   * @public
   */

  function Vue(options) {
    this._init(options);
  }

  // install internals
  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  miscMixin(Vue);

  // install instance APIs
  dataAPI(Vue);
  domAPI(Vue);
  eventsAPI(Vue);
  lifecycleAPI(Vue);

  var slot = {

    priority: SLOT,
    params: ['name'],

    bind: function bind() {
      // this was resolved during component transclusion
      var name = this.params.name || 'default';
      var content = this.vm._slotContents && this.vm._slotContents[name];
      if (!content || !content.hasChildNodes()) {
        this.fallback();
      } else {
        this.compile(content.cloneNode(true), this.vm._context, this.vm);
      }
    },

    compile: function compile(content, context, host) {
      if (content && context) {
        if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
          // if the inserted slot has v-if
          // inject fallback content as the v-else
          var elseBlock = document.createElement('template');
          elseBlock.setAttribute('v-else', '');
          elseBlock.innerHTML = this.el.innerHTML;
          // the else block should be compiled in child scope
          elseBlock._context = this.vm;
          content.appendChild(elseBlock);
        }
        var scope = host ? host._scope : this._scope;
        this.unlink = context.$compile(content, host, scope, this._frag);
      }
      if (content) {
        replace(this.el, content);
      } else {
        remove(this.el);
      }
    },

    fallback: function fallback() {
      this.compile(extractContent(this.el, true), this.vm);
    },

    unbind: function unbind() {
      if (this.unlink) {
        this.unlink();
      }
    }
  };

  var partial = {

    priority: PARTIAL,

    params: ['name'],

    // watch changes to name for dynamic partials
    paramWatchers: {
      name: function name(value) {
        vIf.remove.call(this);
        if (value) {
          this.insert(value);
        }
      }
    },

    bind: function bind() {
      this.anchor = createAnchor('v-partial');
      replace(this.el, this.anchor);
      this.insert(this.params.name);
    },

    insert: function insert(id) {
      var partial = resolveAsset(this.vm.$options, 'partials', id);
      if ('development' !== 'production') {
        assertAsset(partial, 'partial', id);
      }
      if (partial) {
        this.factory = new FragmentFactory(this.vm, partial);
        vIf.insert.call(this);
      }
    },

    unbind: function unbind() {
      if (this.frag) {
        this.frag.destroy();
      }
    }
  };

  var elementDirectives = {
    slot: slot,
    partial: partial
  };

  var convertArray = vFor._postProcess;

  /**
   * Limit filter for arrays
   *
   * @param {Number} n
   * @param {Number} offset (Decimal expected)
   */

  function limitBy(arr, n, offset) {
    offset = offset ? parseInt(offset, 10) : 0;
    n = toNumber(n);
    return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
  }

  /**
   * Filter filter for arrays
   *
   * @param {String} search
   * @param {String} [delimiter]
   * @param {String} ...dataKeys
   */

  function filterBy(arr, search, delimiter) {
    arr = convertArray(arr);
    if (search == null) {
      return arr;
    }
    if (typeof search === 'function') {
      return arr.filter(search);
    }
    // cast to lowercase string
    search = ('' + search).toLowerCase();
    // allow optional `in` delimiter
    // because why not
    var n = delimiter === 'in' ? 3 : 2;
    // extract and flatten keys
    var keys = toArray(arguments, n).reduce(function (prev, cur) {
      return prev.concat(cur);
    }, []);
    var res = [];
    var item, key, val, j;
    for (var i = 0, l = arr.length; i < l; i++) {
      item = arr[i];
      val = item && item.$value || item;
      j = keys.length;
      if (j) {
        while (j--) {
          key = keys[j];
          if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
            res.push(item);
            break;
          }
        }
      } else if (contains(item, search)) {
        res.push(item);
      }
    }
    return res;
  }

  /**
   * Filter filter for arrays
   *
   * @param {String} sortKey
   * @param {String} reverse
   */

  function orderBy(arr, sortKey, reverse) {
    arr = convertArray(arr);
    if (!sortKey) {
      return arr;
    }
    var order = reverse && reverse < 0 ? -1 : 1;
    // sort on a copy to avoid mutating original array
    return arr.slice().sort(function (a, b) {
      if (sortKey !== '$key') {
        if (isObject(a) && '$value' in a) a = a.$value;
        if (isObject(b) && '$value' in b) b = b.$value;
      }
      a = isObject(a) ? getPath(a, sortKey) : a;
      b = isObject(b) ? getPath(b, sortKey) : b;
      return a === b ? 0 : a > b ? order : -order;
    });
  }

  /**
   * String contain helper
   *
   * @param {*} val
   * @param {String} search
   */

  function contains(val, search) {
    var i;
    if (isPlainObject(val)) {
      var keys = Object.keys(val);
      i = keys.length;
      while (i--) {
        if (contains(val[keys[i]], search)) {
          return true;
        }
      }
    } else if (isArray(val)) {
      i = val.length;
      while (i--) {
        if (contains(val[i], search)) {
          return true;
        }
      }
    } else if (val != null) {
      return val.toString().toLowerCase().indexOf(search) > -1;
    }
  }

  var digitsRE = /(\d{3})(?=\d)/g;

  // asset collections must be a plain object.
  var filters = {

    orderBy: orderBy,
    filterBy: filterBy,
    limitBy: limitBy,

    /**
     * Stringify value.
     *
     * @param {Number} indent
     */

    json: {
      read: function read(value, indent) {
        return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
      },
      write: function write(value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
    },

    /**
     * 'abc' => 'Abc'
     */

    capitalize: function capitalize(value) {
      if (!value && value !== 0) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    /**
     * 'abc' => 'ABC'
     */

    uppercase: function uppercase(value) {
      return value || value === 0 ? value.toString().toUpperCase() : '';
    },

    /**
     * 'AbC' => 'abc'
     */

    lowercase: function lowercase(value) {
      return value || value === 0 ? value.toString().toLowerCase() : '';
    },

    /**
     * 12345 => $12,345.00
     *
     * @param {String} sign
     */

    currency: function currency(value, _currency) {
      value = parseFloat(value);
      if (!isFinite(value) || !value && value !== 0) return '';
      _currency = _currency != null ? _currency : '$';
      var stringified = Math.abs(value).toFixed(2);
      var _int = stringified.slice(0, -3);
      var i = _int.length % 3;
      var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
      var _float = stringified.slice(-3);
      var sign = value < 0 ? '-' : '';
      return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
    },

    /**
     * 'item' => 'items'
     *
     * @params
     *  an array of strings corresponding to
     *  the single, double, triple ... forms of the word to
     *  be pluralized. When the number to be pluralized
     *  exceeds the length of the args, it will use the last
     *  entry in the array.
     *
     *  e.g. ['single', 'double', 'triple', 'multiple']
     */

    pluralize: function pluralize(value) {
      var args = toArray(arguments, 1);
      return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
    },

    /**
     * Debounce a handler function.
     *
     * @param {Function} handler
     * @param {Number} delay = 300
     * @return {Function}
     */

    debounce: function debounce(handler, delay) {
      if (!handler) return;
      if (!delay) {
        delay = 300;
      }
      return _debounce(handler, delay);
    }
  };

  function installGlobalAPI (Vue) {
    /**
     * Vue and every constructor that extends Vue has an
     * associated options object, which can be accessed during
     * compilation steps as `this.constructor.options`.
     *
     * These can be seen as the default options of every
     * Vue instance.
     */

    Vue.options = {
      directives: directives,
      elementDirectives: elementDirectives,
      filters: filters,
      transitions: {},
      components: {},
      partials: {},
      replace: true
    };

    /**
     * Expose useful internals
     */

    Vue.util = util;
    Vue.config = config;
    Vue.set = set;
    Vue['delete'] = del;
    Vue.nextTick = nextTick;

    /**
     * The following are exposed for advanced usage / plugins
     */

    Vue.compiler = compiler;
    Vue.FragmentFactory = FragmentFactory;
    Vue.internalDirectives = internalDirectives;
    Vue.parsers = {
      path: path,
      text: text,
      template: template,
      directive: directive,
      expression: expression
    };

    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */

    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     *
     * @param {Object} extendOptions
     */

    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var isFirstExtend = Super.cid === 0;
      if (isFirstExtend && extendOptions._Ctor) {
        return extendOptions._Ctor;
      }
      var name = extendOptions.name || Super.options.name;
      if ('development' !== 'production') {
        if (!/^[a-zA-Z][\w-]*$/.test(name)) {
          warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
          name = null;
        }
      }
      var Sub = createClass(name || 'VueComponent');
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub['super'] = Super;
      // allow further extension
      Sub.extend = Super.extend;
      // create asset registers, so extended classes
      // can have their private assets too.
      config._assetTypes.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }
      // cache constructor
      if (isFirstExtend) {
        extendOptions._Ctor = Sub;
      }
      return Sub;
    };

    /**
     * A function that returns a sub-class constructor with the
     * given name. This gives us much nicer output when
     * logging instances in the console.
     *
     * @param {String} name
     * @return {Function}
     */

    function createClass(name) {
      /* eslint-disable no-new-func */
      return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
      /* eslint-enable no-new-func */
    }

    /**
     * Plugin system
     *
     * @param {Object} plugin
     */

    Vue.use = function (plugin) {
      /* istanbul ignore if */
      if (plugin.installed) {
        return;
      }
      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else {
        plugin.apply(null, args);
      }
      plugin.installed = true;
      return this;
    };

    /**
     * Apply a global mixin by merging it into the default
     * options.
     */

    Vue.mixin = function (mixin) {
      Vue.options = mergeOptions(Vue.options, mixin);
    };

    /**
     * Create asset registration methods with the following
     * signature:
     *
     * @param {String} id
     * @param {*} definition
     */

    config._assetTypes.forEach(function (type) {
      Vue[type] = function (id, definition) {
        if (!definition) {
          return this.options[type + 's'][id];
        } else {
          /* istanbul ignore if */
          if ('development' !== 'production') {
            if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
              warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
            }
          }
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = id;
            definition = Vue.extend(definition);
          }
          this.options[type + 's'][id] = definition;
          return definition;
        }
      };
    });

    // expose internal transition API
    extend(Vue.transition, transition);
  }

  installGlobalAPI(Vue);

  Vue.version = '1.0.20';

  // devtools global hook
  /* istanbul ignore next */
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue);
    } else if ('development' !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }

  return Vue;

}));

});
