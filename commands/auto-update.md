---
description: Pull the latest RIGGR repo changes and reinstall the current managed targets.
disable-model-invocation: true
---

# Auto Update

Update RIGGR from its upstream repo and regenerate the current context's managed install using the original install-state request.

## Usage

```bash
# Preview the update without mutating anything
RIGGR_ROOT="$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=(process.env.CLAUDE_CONFIG_DIR||'').trim()||p.join(o.homedir(),'.claude');if(d==='~')d=o.homedir();else if(d.charAt(0)==='~'&&(d.charAt(1)==='/'||d.charCodeAt(1)===92))d=p.join(o.homedir(),d.slice(2));try{if(o.platform()==='linux'){var v=f.readFileSync('/proc/version','utf8').toLowerCase();if(v.includes('microsoft')){var b=String.fromCharCode(92),m=d.match(/^([A-Za-z]):/);if(m&&(d.charAt(2)==='/'||d.charAt(2)===b)){var dl=m[1].toLowerCase();d='/mnt/'+dl+d.slice(2).split(b).join('/')}}}}catch(_){}d=p.resolve(d);function L(x){try{return require(p.join(x,'scripts','lib','resolve-riggr-root')).resolveEccRoot({probe:p.join('scripts','auto-update.js')})}catch(_){return null}}var r=L(d);if(r)return r;var s=['riggr','riggr@riggr','marketplaces/riggr','riggr-legacy','riggr-legacy@riggr-legacy','marketplaces/riggr-legacy'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}function D(x){try{return f.readdirSync(x,{withFileTypes:true}).filter(function(z){return z.isDirectory()}).map(function(z){return z.name})}catch(e){if(e.code==='ENOENT')return [];throw e}}var g=['riggr','riggr-legacy'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=D(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=D(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}return d})();console.log(r)")" &&
node "$RIGGR_ROOT/scripts/auto-update.js" --dry-run

# Update only Cursor-managed files in the current project
node "$RIGGR_ROOT/scripts/auto-update.js" --target cursor

# Override the RIGGR repo root explicitly
node "$RIGGR_ROOT/scripts/auto-update.js" --repo-root /path/to/RIGGR
```

## Notes

- This command uses the recorded install-state request and reruns `install-apply.js` after pulling the latest repo changes.
- Reinstall is intentional: it handles upstream renames and deletions that `repair.js` cannot safely reconstruct from stale operations alone.
- Use `--dry-run` first if you want to see the reconstructed reinstall plan before mutating anything.
