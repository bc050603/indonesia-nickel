// Canonical display names, independent of original customs spellings.
function projectTitle(id,fallback=''){return window.PROJECT_NAMES?.[id]?.title||fallback}
(function syncProjectDisplayNames(){let u=window.UNIFIED,names=window.PROJECT_NAMES;function set(p,id){if(p&&names[id]){p.name=names[id].title;p.display_name=names[id].title}}
 for(let p of window.KB.projects)set(p,u.project_matte_map[p.id]);
 for(let p of window.NPI.projects)set(p,u.project_npi_map[p.id]);
 for(let p of window.MHP.projects)set(p,p.canonical_id);
 for(let p of window.REFINING.projects)set(p,p.id);
 for(let k of ['progress','pending'])for(let p of window.NPI_RESEARCH[k]||[])set(p,p.id);
 for(let r of window.KB.relations||[])set(r,u.project_matte_map[r.project]);
})();
