module.exports=[91920,a=>{"use strict";var b=a.i(71010);a.s(["makeGate",0,function(){let a=(0,b.createSignal)(!1),c=null,d=null;return{held:a,promise:()=>d,hold(){null===d&&(d=new Promise(a=>c=a),a.set(!0))},release(){c?.(),c=null,d=null,a.set(!1)}}}])}];

//# sourceMappingURL=packages_app_src_gate_ts_0p5sekl._.js.map