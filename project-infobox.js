// Shared project infobox. Detailed evidence stays in the article and its sources.
function projectInfobox(id,a,c){
 const names=window.PROJECT_NAMES?.[id]||{},photo=window.PROJECT_MEDIA?.[id],status=opGet(id),loc=geoLoc(id),place=loc&&geoPlace(loc.place_id);
 const rows=[],used=new Set();
 const add=(label,value,html=false)=>{if(value!==undefined&&value!==null&&String(value).trim()&&!used.has(label)){used.add(label);rows.push([label,html?value:E(value)])}};
 add('中文名称',names.chinese);add('公司抬头',c.p.legal||names.english);add('运行状态',status?opBadge(id):'',true);
 add('国家',a.facts.find(([k])=>/^(所在国家|国家)$/.test(k))?.[1]||(loc?.island_id==='overseas'?loc.province:'印度尼西亚'));if(loc){if(loc.island_id!=='overseas')add('岛屿',A('island',loc.island_id,loc.island),true);if(place)add(place.kind==='park'?'园区':'区域',A('park',place.id,place.name),true);if(loc.island_id!=='overseas')add('省份',loc.province);add('地点',[loc.regency,loc.locality].filter(Boolean).join('，'))}
 if(c.groups.length)add('关联集团',c.groups.map(g=>A('group',g.id,g.name)).join('<br>'),true);
 const omit=/(地理|所在地|所在国家|岛屿|园区|位置|法律实体|法律主体|项目法人|公司抬头|生产法人|运行状态|投产与运行状态|^状态$|当前状态|项目状态|2026年状态|^国家$|原表行)/;
 for(const [k,v] of a.facts){if((id==='NPI037'&&['主要工艺','冰镍环节','主要节点'].includes(k))||omit.test(k)||!v||/^(?:空缺|未披露|暂无|待核|待确认|不详|—|-)$/.test(String(v)))continue;
  const label=({'主要产品':'产品','生产方法':'工艺','主要工艺':'工艺','生产工艺':'工艺','生产路线':'工艺','主要设备':'设备','已披露设备':'设备','设计镍能力':'设计镍产能'})[k]||k;
  const value=String(v);
  // Keep qualifying language intact when a fact needs more than a short line.
  add(label,value.length>100?`<details class="fact-more"><summary>展开记录</summary><p>${E(value)}</p></details>`:E(value),true);
 }
 if(!a.facts.some(([k])=>/股东|股权|权益|控制方|所有者/.test(k))&&c.p.ownership)add('股东关系',`<details class="fact-more"><summary>展开记录</summary><p>${E(c.p.ownership)}</p></details>`,true);
 if(id==='NPI037'){
  add('工艺','回转窑—电炉（RKEF）');
  add('供货对象','园区青山不锈钢厂');
  add('披露产能','15万实物吨 NPI／年（现行园区介绍）');
  add('产能资料',`<details class="fact-more"><summary>历史口径</summary><p>2022年园区刊物列30万实物吨；两版口径不同，详见正文。不能据此认定停运一半。</p></details>`,true);
 }
 const homepage=a.sources.find(s=>/^https:\/\/imip\.co\.id\/pt-/.test(s.url));if(homepage)add('项目介绍',`<a href="${E(homepage.url)}" target="_blank" rel="noopener">园区官方介绍 ↗</a>`,true);
 const image=photo?`<figure class="project-photo ${photo.kind==='logo'?'is-logo':''}"><a href="${E(photo.src)}" target="_blank" rel="noopener" aria-label="查看${E(photo.caption)}原图"><img src="${E(photo.src)}" alt="${E(photo.caption)}" width="443" height="315" decoding="async"></a><figcaption>${E(photo.caption)}<br><a href="${E(photo.source)}" target="_blank" rel="noopener">来源：${E(photo.credit)} ↗</a></figcaption></figure>`:'';
 return `<aside class="wiki-facts project-infobox" aria-label="项目简明资料"><div class="infobox-title"><span>项目资料</span><h2>${E(names.chinese||a.title)}</h2><p>${E(names.english||c.p.legal||'')}</p></div>${image}${projectMapBlock(id)}<dl>${rows.map(([k,v])=>`<div class="fact-row"><dt>${E(k)}</dt><dd>${v}</dd></div>`).join('')}</dl><div class="infobox-foot"><a href="#" data-scroll="wiki-sources">资料来源 ↓</a>${exportMiniLinks(id)}<a href="#/graph">产业关系图 →</a></div></aside>`;
}
