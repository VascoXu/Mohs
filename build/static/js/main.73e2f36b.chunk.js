(this.webpackJsonpmohs=this.webpackJsonpmohs||[]).push([[0],{20:function(e,t,n){e.exports=n.p+"static/media/SmashLab.17d6023a.png"},22:function(e,t,n){e.exports=n(38)},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a,o,r=n(0),s=n.n(r),c=n(18),i=n.n(c),l=(n(27),n(2)),p=n(3),u=n(5),d=n(4),m=n(19),h=n(20),f=n.n(h),g=(n(28),n(8)),b=Object(g.a)();function v(e){(e=e.toLowerCase()).includes("vaseline")&&(e=e.replace("vaseline","vaselleen")),e.includes("wound")&&(e=e.replace("wound","woond")),window.speechSynthesis.cancel();var t=new SpeechSynthesisUtterance(e);"undefined"!==typeof speechSynthesis&&void 0!==speechSynthesis.onvoiceschanged&&(t.voice=a[o],t.rate=.75,window.speechSynthesis.speak(t))}function E(e,t,n){!function(e){fetch("/api/log",{method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e)}))}({foldername:n,abs_timestamp:y(),rel_timestamp:"start"===t?"00:00:00":function(e){var t=new Date-e;return t/=1e3,function(e){var t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60),a=e-3600*t-60*n;t<10&&(t="0"+t);n<10&&(n="0"+n);a<10&&(a="0"+a);return t+":"+n+":"+a}(Math.round(t))}(t),action:e})}function S(){var e=new Date,t=e.getDate(),n=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,a=e.getFullYear();return"".concat(n).concat(t).concat(a)}function y(){var e=(new Date).toLocaleString("en-US",{timeZone:"America/New_York"});return e=(e=e.slice(e.lastIndexOf(",")+2)).substring(0,e.length-3)}window.speechSynthesis.onvoiceschanged=function(){a=window.speechSynthesis.getVoices();for(var e=0;e<a.length;e++)"Google US English"===a[e].name&&(o=e)};var k=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=e.target.value;(a.setState(Object(m.a)({},e.target.name,t)),"enum"===e.target.name)&&(JSON.parse(localStorage.getItem("enums")||"[]").includes(e.target.value)?a.setState({econsent:!0}):a.state.econsented||a.setState({econsent:!1}))},a.handleExperimenterConsent=function(){a.setState({econsent:!a.state.econsent,econsented:!0})},a.handleParticipantConsent=function(){a.setState({pconsent:!a.state.pconsent})},a.experimenterReady=function(){var e=JSON.parse(localStorage.getItem("enums")||"[]");e.includes(a.state.enum)||(e.push(a.state.enum),localStorage.setItem("enums",JSON.stringify(e))),a.setState({eready:!0,etime:y()})},a.participantReady=function(){localStorage.setItem("currentPnum",a.state.pnum),localStorage.setItem("currentEnum",a.state.enum);S();var e=y().replace(/:/g,""),t="".concat(e,"_").concat(a.state.enum,"_").concat(a.state.pnum,"_").concat(a.state.version);b.push("/Home",{pnum:a.state.pnum,foldername:t}),fetch("/api/pnum",{method:"POST",body:JSON.stringify({foldername:t,pnum:a.state.pnum,etime:a.state.etime,ptime:y()}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e)})),fetch("/api/version",{method:"POST"}).then((function(e){return e.json()})).then((function(e){console.log(e)}))},a.state={pnum:"",enum:"",etime:"",filename:"",eready:!1,econsent:!1,econsented:!1,pconsent:!1,edit:!1},a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/version").then((function(e){return e.json()})).then((function(t){e.setState({version:t.version})}))}},{key:"render",value:function(){var e,t;return e=!(""===this.state.pnum.trim()||""===this.state.enum.trim()||!this.state.econsent||!this.state.pconsent)?s.a.createElement("button",{id:"eready",onClick:this.experimenterReady,className:"btn btn-lg btn-primary btn-block"},"Experimenter Ready"):"",t=this.state.eready?s.a.createElement("button",{id:"pready",onClick:this.participantReady,className:"btn btn-lg btn-info btn-block",type:"submit"},"Participant Ready"):"",s.a.createElement("div",{className:"login text-center"},s.a.createElement("div",{className:"form-signin"},s.a.createElement("img",{className:"mb-4 smash_logo",src:f.a,alt:"Smash Lab"}),s.a.createElement("h1",{className:"h3 font-weight-normal"},"Please sign in"),s.a.createElement("div",{className:"mb-4"},s.a.createElement("p",{className:"h5"},"Session ID: ",this.state.version)),s.a.createElement("div",{className:"input-group mb-2"},s.a.createElement("input",{onChange:this.handleChange,type:"text",name:"enum",id:"inputEnum",className:"form-control",placeholder:"Experimenter number",value:this.state.enum,required:!0,autoFocus:!0}),s.a.createElement("div",{className:"input-group-append"},s.a.createElement("div",{className:"input-group-text"},s.a.createElement("input",{className:"mr-1",onChange:this.handleExperimenterConsent,type:"checkbox",value:"econsent",checked:this.state.econsent})," consent"))),s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{onChange:this.handleChange,type:"text",name:"pnum",id:"inputPnum",className:"form-control",placeholder:"Participant Number",value:this.state.pnum,required:!0}),s.a.createElement("div",{className:"input-group-append"},s.a.createElement("div",{className:"input-group-text"},s.a.createElement("input",{className:"mr-1",onChange:this.handleParticipantConsent,type:"checkbox",value:"pconsent",checked:this.state.pconsent})," consent"))),e,t))}}]),n}(r.Component),w=n(12),C=n(10),N=(n(9),n(29),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).reminder=function(){v("Please remember to describe what you are doing as you perform each step.");E("Reminder clicked.",a.props.startTime,a.props.foldername)},a}return Object(p.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"bottom-right mr-3 mb-3"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-xs-6"},s.a.createElement("button",{onClick:this.reminder,className:"btn btn-dark"},s.a.createElement("svg",{width:"2em",height:"2em",viewBox:"0 0 16 16",className:"bi bi-bell-fill",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{fill:"light-gray",d:"M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"})))))))}}]),n}(r.Component)),O=(n(30),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).handleChange=function(e,t){var n=Object(w.a)(a.state.questions);n[e]=t.target.value,a.setState({questions:n})},a.handleClick=function(e,t,n){var o=a.props.procedure[t].questions[e][0],r=a.props.procedure[t].questions[e][1];E("P".concat(t+1,"Q").concat(e+1,": ").concat(o),a.props.startTime,a.props.foldername),v(r)},a.handleUnanswerable=function(){E("P".concat(a.props.step+1,"Q: Unanswerable"),a.props.startTime,a.props.foldername)},a.reminder=function(){v("Please remember to describe what you are doing as you perform each step.");E("Reminder clicked.",a.props.startTime,a.props.foldername)},a.setEditMode=function(){a.setState({edit:!0})},a.setRef=function(e){a.props.updateQRefs(e)},a.renderQuestions=function(e,t){return s.a.createElement("div",{key:"".concat(t),className:"".concat(a.props.step>=0?"question-box":""),style:{backgroundColor:"#".concat(a.props.colors[t])}},e.map((function(e,n){return s.a.createElement("button",{key:"".concat(t).concat(n),ref:a.setRef,onClick:a.handleClick.bind(Object(C.a)(a),n,t),type:"button",className:"btn btn-light btn-block question ".concat(a.props.step<0?"none":"")},"Q",n+1,": ",e[0])})),s.a.createElement("button",{onClick:a.handleUnanswerable,type:"button",className:"btn btn-light btn-block question ".concat(a.props.step<0?"none":"")},"Unanswerable"))},a.state={edit:!1},a}return Object(p.a)(n,[{key:"render",value:function(){for(var e=this,t=[],n=0;n<this.props.procedure.length;n++)t.push(this.props.procedure[n].questions);return this.props.procedure.length>0&&this.props.step>=0&&this.props.procedure[this.props.step].questions,s.a.createElement("div",{className:"container full-height mt-2"},s.a.createElement("h2",{className:"text-center"},"Questions"),s.a.createElement("hr",null),s.a.createElement("div",{className:"list-group mb-4"},t.map((function(t,n){return e.renderQuestions(t,n)}))),s.a.createElement(N,{startTime:this.props.startTime,foldername:this.props.foldername}))}}]),n}(r.Component)),j=(n(31),{}),T=[];function P(){navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?(console.log("getUserMedia supported."),navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){return function(e){(j=new MediaRecorder(e)).start(10),console.log("recorder started"),j.ondataavailable=function(e){T.push(e.data)}}(e)})).catch((function(e){console.log("The following getUserMedia error occured: "+e)}))):console.log("getUserMedia not supported on your browser!")}function x(e,t){j.stop(),console.log(j.state),console.log("recorder stopped"),j.onstop=function(n){return function(e,t,n){console.log("recorder onstopped");var a=new Blob(T,{type:"audio/wav; codecs=0"}),o=new FormData;o.append("filename",t),o.append("foldername",n),o.append("pnum",localStorage.getItem("currentPnum")),o.append("audio",a),fetch("/api/audio",{method:"POST",body:o}).then((function(e){return e.json()})).then((function(e){console.log(e)})),T=[]}(0,e,t)}}var R=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).inputChange=function(e,t){var n=Object(w.a)(a.props.procedure);n[e]=t.target.value,a.setState({procedure:n})},a.procedureClick=function(e,t){if(a.state.started){if(t.target.style.background="#".concat(a.props.colors[e]),a.prevClicked&&(a.prevClicked.style.background="white"),a.prevClicked=t.target,a.props.updateStep(e),E("P".concat(e+1,": ").concat(a.props.procedure[e].procedure),a.props.startTime,a.props.foldername),v(a.props.procedure[e].procedure),a.state.started){S(),y().replace(/:/g,""),localStorage.getItem("currentEnum"),localStorage.getItem("currentPnum");x("".concat(a.props.foldername,"-").concat(a.state.index),a.props.foldername),a.setState({isRecording:!1})}if(e<a.props.procedure.length)P(),a.setState({isRecording:!0}),a.scrollToQuestion(e);else{E("Procedure ended.",a.props.startTime,a.props.foldername)}a.setState({index:a.state.index+1})}},a.setEditMode=function(){a.setState({edit:!0})},a.export=function(){if(a.state.isRecording){S(),y().replace(/:/g,""),localStorage.getItem("currentEnum"),localStorage.getItem("currentPnum");x("".concat(a.props.foldername,"-").concat(a.state.index),a.props.foldername);E("Procedure ended.",a.props.startTime,a.props.foldername),a.setState({isRecording:!1})}setTimeout((function(){fetch("/api/export",{method:"POST",body:JSON.stringify({foldername:a.props.foldername}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.blob()})).then((function(e){var t=window.URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download="".concat(a.props.foldername,".zip"),document.body.appendChild(n),n.click(),n.remove()})),a.setState({started:!1})}),1e3)},a.startProcedure=function(){a.setState({started:!0}),P();var e=0;a.qPos.push(1);for(var t=0;t<a.props.procedure.length;t++)e+=a.props.procedure[t].questions.length,a.qPos.push(e);var n="Procedure started.";E(n,"start",a.props.foldername);var o=new Date;a.props.updateStartTime(o),a.props.updateStep(0),document.getElementById("l0").style.background="#".concat(a.props.colors[0]),a.prevClicked=document.getElementById("l0"),setTimeout((function(){new Audio("beep.mp3").play()}),1500),setTimeout((function(){E(n="P".concat(a.props.step+1,": ").concat(a.props.procedure[a.props.step].procedure),a.props.startTime,a.props.foldername),v(a.props.procedure[0].procedure)}),2e3)},a.changeBackground=function(e,t){t.target.style.background="#".concat(a.props.colors[e])},a.resetBackground=function(e,t){t.target!==a.prevClicked&&(t.target.style.background="white")},a.scrollToQuestion=function(e){var t=a.qPos[e];t<a.props.qRefs.length&&a.props.qRefs[t].scrollIntoView({block:"start",behavior:"smooth"})},a.state={started:!1,ended:!1,edit:!1,isRecording:!1,index:0},a.qPos=[],a.prevClicked=null,a}return Object(p.a)(n,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"full-height mt-2"},s.a.createElement("h2",{className:"text-white text-center"},"Procedure"),s.a.createElement("hr",null),s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("div",{className:"list-group mt-2 mb-5 procedure-list"},s.a.createElement("button",{onClick:this.startProcedure,id:"start",className:"btn-block procedure"},"Click ",s.a.createElement("b",null,"here")," to begin the procedure recording. "),this.props.procedure.map((function(t,n){return s.a.createElement("button",{key:n,onClick:e.procedureClick.bind(e,n),id:"l"+n,disabled:!e.state.started,onMouseOver:e.changeBackground.bind(e,n),onMouseOut:e.resetBackground.bind(e,n),style:{borderColor:"#".concat(e.props.colors[n])},className:"btn-block procedure ".concat((e.props.step===n&&e.state.started,"")," ").concat(e.state.started?"":"disabled")},t.procedure)})),s.a.createElement("button",{onClick:this.export,id:"start",className:"btn-block procedure ".concat(this.state.started?"":"list-group-item-secondary disabled")},"Click ",s.a.createElement("b",null,"here")," to end procedure recording and download data."))))))}}]),n}(r.Component),q=(n(32),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).getProcedure=function(){fetch("/api/procedure").then((function(e){return e.json()})).then((function(e){a.setState({procedure:e})}))},a.updateStartTime=function(e){a.setState({startTime:e})},a.updateStep=function(e){a.setState({step:e})},a.incrementStep=function(){a.setState({step:(a.state.step+1)%a.state.procedure.length})},a.qRefs=[],a.updateQRefs=function(e){a.qRefs.push(e)},a.state={procedure:[],startTime:0,step:-1},a.colors=["F47C7C","F7F48B","A1DE93","F2AFA3","70A1D7","B399D4","E1B894","58949C","FEC8D8","B3A580","E18AAA","8DA290","DAF0EE"],a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.getProcedure()}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"bg-dark split left"},s.a.createElement("div",null,s.a.createElement(R,{incrementStep:this.incrementStep,updateStep:this.updateStep,step:this.state.step,updateStartTime:this.updateStartTime,startTime:this.state.startTime,updateQRefs:this.updateQRefs,qRefs:this.qRefs,colors:this.colors,procedure:this.state.procedure,foldername:this.props.location.state.foldername}))),s.a.createElement("div",{className:"bg-light split right"},s.a.createElement("div",null,s.a.createElement(O,{incrementStep:this.incrementStep,updateStep:this.updateStep,step:this.state.step,updateStartTime:this.updateStartTime,startTime:this.state.startTime,updateQRefs:this.updateQRefs,qRefs:this.qRefs,colors:this.colors,procedure:this.state.procedure,foldername:this.props.location.state.foldername}))))}}]),n}(r.Component)),M=n(40),D=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){return Object(l.a)(this,n),t.call(this,e)}return Object(p.a)(n,[{key:"render",value:function(){return s.a.createElement(M.b,{history:b},s.a.createElement(M.c,null,s.a.createElement(M.a,{path:"/",exact:!0,component:k}),s.a.createElement(M.a,{path:"/Home",component:q})))}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){}},[[22,1,2]]]);
//# sourceMappingURL=main.73e2f36b.chunk.js.map