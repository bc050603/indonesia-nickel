// Reading presentation only: research records, quantities and source links stay intact.
const readingAudit=/待核|待确认|待验证|待补|仍需|还需|尚缺|需要进一步|尚未.*(?:核|确认|查|闭合)|尚无|未(?:能|见|取得|查实|独立|确认|核实|查明|披露|证明|提供|公开)|证据(?:不足|缺口|链)|缺少|没有.*(?:证据|资料|披露)/;
function readingParts(text){const sentences=String(text).match(/[^。！？\n]+[。！？]?|\n+/g)||[];return {body:sentences.filter(s=>!readingAudit.test(s)).join('').trim(),notes:sentences.filter(s=>readingAudit.test(s)).join('').trim()}}
function readingFold(html,title='需要再确认'){return /确认/.test(title)?`<details class="reading-notes"><summary>${title}</summary>${html}</details>`:`<section class="reading-notes reading-information"><h3>${title}</h3>${html}</section>`}
const readingMhpIntros={
 MHP003:'HPL是力勤与Harita合作开发的Obi岛湿法镍项目。工厂以HPAL处理红土镍矿，生产镍钴中间品，并连接岛上的镍钴盐加工与力勤销售体系。',
 MHP005:'ONC是Obi岛湿法镍产业链的另一家主要生产企业，由力勤与Harita体系共同投资。项目以MHP生产和后续镍钴加工为核心，与HPL共同形成Obi岛的湿法业务布局。',
 MHP006:'华越位于印尼Morowali，是华友体系的重要湿法镍钴原料基地。项目采用HPAL处理褐铁矿、生产MHP，连接上游供矿企业与中国镍钴精炼、材料加工客户。',
 MHP007:'SLNC是Merdeka、华友和青山相关投资体系参与的湿法镍项目，围绕SCM矿源与园区加工配套建设。2026年项目处于投产准备阶段，首批MHP计划于下半年产出。',
 MHP008:'华飞是华友在印尼布局的大型HPAL镍钴项目。工厂将褐铁矿加工成MHP，为后续镍钴盐和电池材料加工提供原料，销售网络覆盖集团关联企业及其他买方。',
 MHP010:'Go STAL采用分段温度酸浸路线生产镍钴中间品，是印尼湿法镍产业中区别于大型HPAL项目的一条工艺路径。企业披露的商业装置能力为每年3,200吨MHP实物量。',
 MHP011:'QMB由格林美及合作伙伴在印尼建设，将镍资源开发与湿法冶炼、电池材料原料供应相连接。其MHP通过集团贸易和加工体系以及其他客户渠道销售。',
 MHP013:'ESG是格林美与Merdeka相关投资体系合作的湿法项目。项目依托SCM矿源与园区配套生产MHP，销售同时涉及贸易渠道和下游材料供应链。',
 MHP014:'Meiming是格林美参与投资的印尼MHP生产项目，连接Merdeka相关资源和基础设施体系。工厂生产镍钴中间品，面向后续精炼及材料加工市场。',
 MHP015:'Green Eco Nickel是格林美与EcoPro等合作伙伴参与的印尼湿法镍项目。它把印尼镍资源加工与韩国电池材料企业的原料需求连接起来，股权合作和产品承购共同构成项目的商业安排。',
 MHP016:'Blue Sparking Energy是Harum参与投资的湿法镍项目，采用HPAL生产MHP。企业2026年半年报披露，项目在3月底进入商业生产并完成产能爬坡。',
 MHP017:'ENC是Nickel Industries与合作伙伴布局的大型湿法镍项目，产品布局涵盖MHP及后续精炼镍。项目于2026年7月产出首批MHP，随后进入爬坡阶段。',
 MHP023:'Teluk Metal Industry是Nickel Industries及合作伙伴参与推进的HPAL项目，计划连接MHP生产与下游镍加工需求。项目仍在建设与投资安排落实阶段，目标于2027年进入调试。',
 MHP024:'Nickel Cobalt Halmahera由ANTAM与香港CBL共同投资，属于印尼镍资源与电池材料产业链合作的一部分。项目围绕镍钴资源加工建设湿法冶炼能力。',
 MHP037:'瑞木项目位于巴布亚新几内亚，采用HPAL加工红土镍矿并生产镍钴中间品。它是海外成熟湿法镍项目的重要比较对象，生产与销售数据由项目投资方定期披露。',
 MHP042:'LS MnM位于产业链的下游加工环节，通过采购镍原料建设电池材料用镍盐供应能力。其印尼项目投资与承购安排，服务于韩国精炼和材料业务的长期原料需求。'
};
function readingIntro(p){return readingMhpIntros[p.canonical_id]||readingParts(p.process).body.split('。').filter(Boolean).slice(0,2).join('。')+(readingParts(p.process).body?'。':'')}
function readingPresentation(){
 if(document.querySelector('.pc-page'))return;
 const root=document.getElementById('main');if(!root?.querySelectorAll)return;
 readingShowSources(root);
 if(root.querySelector('.wiki-prose'))return;
 const key=location.hash.replace(/^#\/?/,'').split('/')[0];if(['','research','status-review','sources','source','npi-sources','npi-source','mhp-sources','mhp-source','about','search'].includes(key))return;
 const project=key==='project'?window.UNIFIED.projects.find(p=>p.id===location.hash.split('/')[2]):null;
 if(project){
  const introductions={NPI020:'Sunny（旭日）是华新体系在印尼的上游镍冶炼企业，采用四条60MVA RKEF生产体系，产品包括镍铁和低冰镍。其控制的Walhsu承担后续高冰镍转换，形成跨厂衔接的加工链。',NPI022:'华科是华友在印尼的高冰镍项目，配置RKEF冶炼和PS转炉吹炼工序。它与友山的低冰镍加工环节相连接，把上游镍铁原料进一步转化为高冰镍。',NPI004:'Nicole既有镍铁业务，也参与POSCO布局的冰镍原料供应链。项目的冰镍改造连接印尼镍资源与韩国后续精炼加工业务。',NPI005:'Angel采用四条RKEF生产镍铁，原始设计能力为每年36,000镍吨。项目与青山体系形成工程、运营及产品承购合作，由Shanghai Decent承购其NPI。'};
  const lead=root.querySelector(':scope > p.lead');
  const hp=window.MHP.projects.find(x=>project.mhp_ids?.includes(x.id));
  if(lead&&(introductions[project.id]||hp&&readingIntro(hp)))lead.textContent=introductions[project.id]||readingIntro(hp);
  const chapterLead=root.querySelector('#umhp > section > p.lead');if(chapterLead&&chapterLead.textContent===lead?.textContent)chapterLead.remove();
  root.querySelectorAll('section').forEach(s=>{const h=s.firstElementChild;if(h?.textContent==='产品与经营概况'&&!s.querySelector('tbody tr'))s.remove()});
 }
 readingCells(root);
 let end=root.querySelector(':scope > .reading-appendix');
 function appendix(){if(!end){end=document.createElement('details');end.className='reading-notes reading-appendix';end.innerHTML='<summary>需要再确认</summary>';root.append(end)}return end}
 function label(el){let scope=el.closest('section,article,.panel');return scope?.querySelector('h2,h3')?.textContent||root.querySelector('h1')?.textContent||'需要再确认'}
 function addNote(text,context){if(!text.trim())return;let div=document.createElement('div');div.className='reading-note';let h=document.createElement('h3');h.textContent=context;let p=document.createElement('p');p.textContent=text;div.append(h,p);appendix().append(div)}
 // Move whole question/source sections. Never remove a qualifier from a claim.
 [...root.querySelectorAll('h2,h3')].forEach(h=>{if(h.closest('details'))return;if(!/^(仍需(?:确认|验证)|哪些细节还需要证实|还需要确认什么|证据与待核)$/.test(h.textContent.trim()))return;
  const div=document.createElement('section');let next=h.nextElementSibling;div.append(h.cloneNode(true));while(next&&!/^H[123]$/.test(next.tagName)){let after=next.nextElementSibling;div.append(next);next=after}h.remove();appendix().append(div);
 });
 // Audit commentary goes to the end; dates, planned status, product units and conditional terms stay with factual sentences.
 [...root.querySelectorAll('p')].forEach(p=>{if(p.closest('details,table,.source-entry')||p.children.length)return;let parts=readingParts(p.textContent);if(!parts.notes)return;const context=label(p);addNote(parts.notes,context);if(parts.body)p.textContent=parts.body;else p.remove()});
 [...root.querySelectorAll('.note')].forEach(n=>{if(n.closest('details')||n.querySelector('input,button,select,table')||!readingAudit.test(n.textContent))return;appendix().append(n)});
 // Empty headings left by moved prose do not interrupt the narrative.
 [...root.querySelectorAll('section')].forEach(s=>{if(s.closest('details')||s.querySelector('table,a,input,button,details'))return;if(s.children.length===1&&/^H[23]$/.test(s.firstElementChild.tagName))s.remove()});
}

function readingMhpView(p){const edits={MHP006:{ownership:'华友于2025年12月将华越权益由57%增至60%。Nickel Industries于2023年从Newstride取得华越间接10%权益。',history:'华越于2021年11月启动调试，2022年4月达到设计能力。华友2024年度披露显示，项目持续超产。',capacity:'设计年产6万镍金属吨、约5,000钴金属吨，均包含在MHP产品中。',process:'华越采用高压酸浸（HPAL）处理褐铁矿，经过浸出、净化和沉淀，生产含镍钴的MHP。'}};let e=edits[p.id];return e?{...p,...e,uncertainties:p.uncertainties+'\n\n'+Object.keys(e).map(k=>p[k]).join('\n\n')}:p}
function readingCells(root){if(!root?.querySelectorAll)return;root.querySelectorAll('td').forEach(td=>{if(td.children.length)return;let {body,notes}=readingParts(td.textContent);if(!notes)return;td.textContent=body;let fold=document.createElement('details');fold.className='reading-notes';let summary=document.createElement('summary');summary.textContent='需要再确认';let p=document.createElement('p');p.textContent=notes;fold.append(summary,p);td.append(fold)})}
const readingOldURows=uRows;uRows=function(kind){readingOldURows(kind);readingCells(document.getElementById('uResults'))};
const readingOldMRows=mhRows;mhRows=function(){readingOldMRows();readingCells(document.getElementById('mhResults'))};

function readingShowSources(root){if(!root?.querySelectorAll)return;root.querySelectorAll('details').forEach(d=>{const t=d.querySelector(':scope > summary')?.textContent||'';if(/资料|来源|证据|说明|原表对照/.test(t)&&!/需要|待核|再确认|原始研究记录/.test(t))d.open=true})}
