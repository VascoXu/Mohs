(this.webpackJsonpmohs=this.webpackJsonpmohs||[]).push([[0],[,,,,,,,,,function(e,t,n){},,,,,,,,,,function(e,t,n){e.exports=n.p+"static/media/SmashLab.17d6023a.png"},,function(e,t,n){e.exports=n(37)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n.n(r),c=n(17),s=n.n(c),i=(n(26),n(2)),l=n(3),p=n(5),u=n(4),m=n(18),d=n(19),h=n.n(d),f=(n(27),n(8)),g=Object(f.a)();function v(e){(e=e.toLowerCase()).includes("vaseline")&&(e=e.replace("vaseline","vaselleen")),e.includes("wound")&&(e=e.replace("wound","woond")),window.speechSynthesis.cancel();var t=new SpeechSynthesisUtterance(e);"undefined"!==typeof speechSynthesis&&void 0!==speechSynthesis.onvoiceschanged&&(t.voice=a[49],t.rate=.75,window.speechSynthesis.speak(t))}function b(e,t,n){!function(e){fetch("/api/log",{method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e)}))}({foldername:n,abs_timestamp:S(),rel_timestamp:"start"===t?"00:00:00":function(e){var t=new Date-e;return t/=1e3,function(e){var t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60),a=e-3600*t-60*n;t<10&&(t="0"+t);n<10&&(n="0"+n);a<10&&(a="0"+a);return t+":"+n+":"+a}(Math.round(t))}(t),action:e})}function E(){var e=new Date,t=e.getDate(),n=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,a=e.getFullYear();return"".concat(n).concat(t).concat(a)}function S(){var e=(new Date).toLocaleString("en-US",{timeZone:"America/New_York"});return e=(e=e.slice(e.lastIndexOf(",")+2)).substring(0,e.length-3)}window.speechSynthesis.onvoiceschanged=function(){a=window.speechSynthesis.getVoices()};var y=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=e.target.value;(a.setState(Object(m.a)({},e.target.name,t)),"enum"===e.target.name)&&(JSON.parse(localStorage.getItem("enums")||"[]").includes(e.target.value)?a.setState({econsent:!0}):a.state.econsented||a.setState({econsent:!1}))},a.handleExperimenterConsent=function(){a.setState({econsent:!a.state.econsent,econsented:!0})},a.handleParticipantConsent=function(){a.setState({pconsent:!a.state.pconsent})},a.experimenterReady=function(){var e=JSON.parse(localStorage.getItem("enums")||"[]");e.includes(a.state.enum)||(e.push(a.state.enum),localStorage.setItem("enums",JSON.stringify(e))),a.setState({eready:!0,etime:S()})},a.participantReady=function(){localStorage.setItem("currentPnum",a.state.pnum),localStorage.setItem("currentEnum",a.state.enum);var e=E(),t=S().replace(/:/g,""),n="".concat(e,"_").concat(t,"_").concat(a.state.enum,"_").concat(a.state.pnum);g.push("/Home",{pnum:a.state.pnum,foldername:n}),fetch("/api/pnum",{method:"POST",body:JSON.stringify({foldername:n,pnum:a.state.pnum,etime:a.state.etime,ptime:S()}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e)}))},a.state={pnum:"",enum:"",etime:"",filename:"",eready:!1,econsent:!1,econsented:!1,pconsent:!1,edit:!1},a}return Object(l.a)(n,[{key:"render",value:function(){var e,t;return e=!(""===this.state.pnum.trim()||""===this.state.enum.trim()||!this.state.econsent||!this.state.pconsent)?o.a.createElement("button",{id:"eready",onClick:this.experimenterReady,className:"btn btn-lg btn-primary btn-block"},"Experimenter Ready"):"",t=this.state.eready?o.a.createElement("button",{id:"pready",onClick:this.participantReady,className:"btn btn-lg btn-info btn-block",type:"submit"},"Participant Ready"):"",o.a.createElement("div",{className:"login text-center"},o.a.createElement("div",{className:"form-signin"},o.a.createElement("img",{className:"mb-4 smash_logo",src:h.a,alt:"Smash Lab"}),o.a.createElement("h1",{className:"h3 mb-3 font-weight-normal"},"Please sign in"),o.a.createElement("div",{className:"input-group mb-2"},o.a.createElement("input",{onChange:this.handleChange,type:"text",name:"enum",id:"inputEnum",className:"form-control",placeholder:"Experimenter number",value:this.state.enum,required:!0,autoFocus:!0}),o.a.createElement("div",{className:"input-group-append"},o.a.createElement("div",{className:"input-group-text"},o.a.createElement("input",{className:"mr-1",onChange:this.handleExperimenterConsent,type:"checkbox",value:"econsent",checked:this.state.econsent})," consent"))),o.a.createElement("div",{className:"input-group mb-3"},o.a.createElement("input",{onChange:this.handleChange,type:"text",name:"pnum",id:"inputPnum",className:"form-control",placeholder:"Participant Number",value:this.state.pnum,required:!0}),o.a.createElement("div",{className:"input-group-append"},o.a.createElement("div",{className:"input-group-text"},o.a.createElement("input",{className:"mr-1",onChange:this.handleParticipantConsent,type:"checkbox",value:"pconsent",checked:this.state.pconsent})," consent"))),e,t))}}]),n}(r.Component),w=n(11),N=(n(9),n(28),function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){return Object(i.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement("div",{className:"bottom-right mr-3 mb-3"},o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-xs-6"},o.a.createElement("button",{className:"btn btn-light"},o.a.createElement("svg",{className:"bi bi-mic-fill",width:"2em",height:"2em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},o.a.createElement("path",{fill:this.props.recording?"green":"currentColor",d:"M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"}),o.a.createElement("path",{fillRule:"evenodd",d:"M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"})))))))}}]),n}(r.Component)),O=(n(29),function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleChange=function(e,t){var n=Object(w.a)(a.state.questions);n[e]=t.target.value,a.setState({questions:n})},a.handleClick=function(e,t){var n=a.props.procedure[a.props.step].questions[e][0],r=a.props.procedure[a.props.step].questions[e][1];b("P".concat(a.props.step+1,"Q").concat(e+1,": ").concat(n),a.props.startTime,a.props.foldername),v(r)},a.reminder=function(){v("Please remember to describe what you are doing as you perform each step.");b("Reminder clicked.",a.props.startTime,a.props.foldername)},a.setEditMode=function(){a.setState({edit:!0})},a.state={edit:!1},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this,t=[];return this.props.procedure.length>0&&this.props.step>=0&&(t=this.props.procedure[this.props.step].questions.slice(0,4)),o.a.createElement("div",{className:"container full-height mt-2"},o.a.createElement("h2",{className:"text-center"},"Questions"),o.a.createElement("hr",null),o.a.createElement("div",{className:"list-group"},t.map((function(t,n){return o.a.createElement("button",{key:n,onClick:e.handleClick.bind(e,n),type:"button",className:"btn btn-light btn-block question ".concat(e.props.step<0?"none":"")},"Q",n+1,": ",t[0])}))),o.a.createElement("div",{className:"container text-center mt-5"},o.a.createElement("button",{type:"button",onClick:this.reminder,className:"btn shadow ml-3 btn-dark btn-lg light-border"},o.a.createElement("i",{className:"fa fa-bell","aria-hidden":"true"}),o.a.createElement("span",{className:"ml-2"},"Reminder"))),o.a.createElement(N,{recording:this.props.step>=0&&this.props.step<this.props.procedure.length-1}))}}]),n}(r.Component)),k=(n(30),{}),C=[];function j(){navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?(console.log("getUserMedia supported."),navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){return function(e){(k=new MediaRecorder(e)).start(10),console.log("recorder started"),k.ondataavailable=function(e){C.push(e.data)}}(e)})).catch((function(e){console.log("The following getUserMedia error occured: "+e)}))):console.log("getUserMedia not supported on your browser!")}function x(e,t){k.stop(),console.log(k.state),console.log("recorder stopped"),k.onstop=function(n){return function(e,t,n){console.log("recorder onstopped");var a=new Blob(C,{type:"audio/wav; codecs=0"}),r=new FormData;r.append("filename",t),r.append("foldername",n),r.append("pnum",localStorage.getItem("currentPnum")),r.append("audio",a),fetch("/api/audio",{method:"POST",body:r}).then((function(e){return e.json()})).then((function(e){console.log(e)})),C=[]}(0,e,t)}}var T=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).inputChange=function(e,t){var n=Object(w.a)(a.props.procedure);n[e]=t.target.value,a.setState({procedure:n})},a.procedureClick=function(e,t){if(a.state.started){if(a.props.updateStep(e),b("P".concat(e+1,": ").concat(a.props.procedure[e].procedure),a.props.startTime,a.props.foldername),v(a.props.procedure[e].procedure),a.state.started){var n=E(),r=S().replace(/:/g,""),o=localStorage.getItem("currentEnum"),c=localStorage.getItem("currentPnum");x("".concat(n,"_").concat(r,"_").concat(o,"_").concat(c,"-").concat(a.state.index),a.props.foldername)}e<a.props.procedure.length-1&&j(),a.setState({index:a.state.index+1})}},a.setEditMode=function(){a.setState({edit:!0})},a.export=function(){fetch("/api/export",{method:"POST",body:JSON.stringify({foldername:a.props.foldername}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.blob()})).then((function(e){var t=window.URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download="".concat(a.props.foldername,".zip"),document.body.appendChild(n),n.click(),n.remove()})),a.setState({started:!1})},a.startProcedure=function(){a.setState({started:!0}),j();var e="Procedure started.";b(e,"start",a.props.foldername);var t=new Date;a.props.updateStartTime(t),a.props.updateStep(0),new Audio("beep.mp3").play(),setTimeout((function(){b(e="P".concat(a.props.step+1,": ").concat(a.props.procedure[a.props.step].procedure),a.props.startTime,a.props.foldername),v(a.props.procedure[0].procedure)}),2e3)},a.state={started:!1,ended:!1,edit:!1,index:0},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"full-height mt-2"},o.a.createElement("h2",{className:"text-white text-center"},"Procedure"),o.a.createElement("hr",null),o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col"},o.a.createElement("ul",{className:"list-group list-group-hover mt-2 mb-5 procedure-list"},o.a.createElement("li",{onClick:this.startProcedure,id:"start",className:"list-group-item"},"Click ",o.a.createElement("b",null,"here")," to begin the procedure recording. "),this.props.procedure.map((function(t,n){return o.a.createElement("li",{key:n,onClick:e.procedureClick.bind(e,n),id:"l"+n,className:"list-group-item ".concat(e.props.step===n&&e.state.started?"active":""," ").concat(e.state.started?"":"list-group-item-secondary disabled")},t.procedure)})),o.a.createElement("li",{onClick:this.export,id:"start",className:"list-group-item ".concat(this.state.started?"":"list-group-item-secondary disabled")},"Click ",o.a.createElement("b",null,"here")," to end procedure recording and download data."))))),o.a.createElement(N,{recording:this.state.started}))}}]),n}(r.Component),P=(n(31),function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).getProcedure=function(){fetch("/api/procedure").then((function(e){return e.json()})).then((function(e){a.setState({procedure:e})}))},a.updateStartTime=function(e){a.setState({startTime:e})},a.updateStep=function(e){a.setState({step:e})},a.incrementStep=function(){a.setState({step:(a.state.step+1)%a.state.procedure.length})},a.state={procedure:[],startTime:0,step:-1},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.getProcedure()}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"bg-dark split left"},o.a.createElement("div",null,o.a.createElement(T,{incrementStep:this.incrementStep,updateStep:this.updateStep,step:this.state.step,updateStartTime:this.updateStartTime,startTime:this.state.startTime,procedure:this.state.procedure,foldername:this.props.location.state.foldername}))),o.a.createElement("div",{className:"bg-light split right"},o.a.createElement("div",null,o.a.createElement(O,{incrementStep:this.incrementStep,updateStep:this.updateStep,step:this.state.step,updateStartTime:this.updateStartTime,startTime:this.state.startTime,procedure:this.state.procedure,foldername:this.props.location.state.foldername}))))}}]),n}(r.Component)),M=n(39),R=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(e){return Object(i.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement(M.b,{history:g},o.a.createElement(M.c,null,o.a.createElement(M.a,{path:"/",exact:!0,component:y}),o.a.createElement(M.a,{path:"/Home",component:P})))}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[21,1,2]]]);
//# sourceMappingURL=main.04763414.chunk.js.map