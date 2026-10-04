/* ORVEXA — The Infinite Profile. Vanilla JavaScript, no dependencies. */
(function () {
'use strict';
const G = typeof window !== 'undefined' ? window : globalThis;

/* =====================================================================
   1. CONTENT DATA (separate from rendering; extend freely)
   ===================================================================== */
const NOUN = 'signal,pattern,threshold,archive,orbit,mirror,lattice,echo,gradient,margin,seam,tide,index,fold,drift,axis,cipher,horizon,residue,contour,ledger,prism,loop,canvas,vessel,thread,map,relay,anchor,current,grain,lens,frame,trace,spiral,compass,layer,pulse,field,gate'.split(',');
const ADJ = 'quiet,recursive,unfinished,luminous,dense,porous,slow,inverted,latent,parallel,fragile,open,layered,silent,persistent,hidden,elastic,minimal,ambient,orbital,tangled,patient,clear,restless,distant,modular,woven,still,nested,borrowed'.split(',');
const DOM = 'memory,language,structure,attention,time,scale,identity,perception,systems,craft,motion,silence,proximity,boundaries,rhythm,distance,meaning,habit,light,repetition,change,origin,balance,curiosity'.split(',');
const VB = 'unfold,converge,repeat,dissolve,accumulate,reorient,compress,branch,return,settle,drift,echo,expand,resolve'.split(',');
const BANK = { a: ADJ, n: NOUN, d: DOM, v: VB };
const SYMS = ['○', '◇', '△', '□', '▽', '∴', '≈', '×'];
const DIMS = ['Past', 'Present', 'Future', 'Possibility', 'Unknown'];
const STATUS = ['Sketch', 'Exploring', 'Taking shape', 'Dormant', 'Conceptual', 'Evolving', 'Open question'];

/* type: [label, number range, label digits] */
const TY = {
  idea: ['IDEA', 1000, 3], thought: ['THOUGHT', 1000, 3], concept: ['CONCEPT', 1000, 3],
  project: ['PROJECT', 1000, 3], discovery: ['DISCOVERY', 1000, 3], experiment: ['EXPERIMENT', 1000, 3],
  principle: ['PRINCIPLE', 1000, 3], question: ['QUESTION', 1000, 3], possibility: ['POSSIBILITY', 1000, 3],
  artifact: ['ARTIFACT', 1000, 3], collection: ['COLLECTION', 1000, 3], knowledge: ['KNOWLEDGE', 1000, 3],
  curiosity: ['CURIOSITY', 1000, 3], connection: ['CONNECTION', 1000, 3], evolution: ['EVOLUTION', 1000, 3],
  unknown: ['UNKNOWN', 1000, 3], fragment: ['FRAGMENT', 10000, 4]
};

const TITLES = ['{A} {N}', 'The {N} of {D}', '{N} and {N2}', 'On {a} {d}', '{A} {D}'];
const ID_ST = [
  'In this state, ORVEXA is a {a} {n}: one identity moving through {d}.',
  'ORVEXA reads as {a} here, shaped by {d} and held together by a single {n}.',
  'This is ORVEXA seen through {d}: {a}, unfinished, and still unfolding.',
  'One identity, one {n}. In this state it leans toward {d} and stays {a}.'
];
const TPL = {
  idea: ['What if {d} behaved like a {a} {n}? It would {v} rather than hold still, and every state would be another view of it.', 'Treat {d} as a {a} {n}, then follow how it {vs} when you change {d2}.', 'Start with {d}. Add a {a} {n}. See what {vs} when you stop trying to finish it.'],
  thought: ['{D}: less a {n} than a {a} {n2}. Something you move through, not something you hold.', 'Most of {d} is {a}. What you see is only the {n} it leaves behind.', 'A {a} {n} can say more about {d} than a long explanation of {d2}.'],
  concept: ['A concept that treats {d} as a {a} {n}. A working idea, not a claim about the world.', 'A {n} that {vs} between {d} and {d2}, kept {a} on purpose.', '{D} reframed as {a} structure: a {n}, a {n2}, and the way they {v} together.'],
  project: ['A conceptual project exploring how {d} can take the shape of a {a} {n}.', 'An ongoing sketch connecting {d} to {d2} through one {a} {n}.', 'A thought experiment in building a {n} that can {v} without a fixed form.'],
  discovery: ['Observed: {d} and {d2} share a {a} {n}. It appears whenever one of them changes.', 'A recurring {n} turns up in {d}. Its {a} shape hints at a link with {d2}.', 'Noticed while tracing {d}: a {a} {n} that {vs} the same way every time.'],
  experiment: ['Try this: describe {d} with one {n} and one {a} word, then compare it with how {d2} reads.', 'Let a {a} {n} {v} for {k} steps and note what changes at each one.', 'Hold {d} constant, vary {d2}, and watch the {n}.'],
  principle: ['Keep the {n} {a}. Everything else can {v} around it.', 'Prefer a {a} {n} to a finished one: what stays open is where {d} can grow.', 'If {d} must change, let it {v} slowly and keep the {n} in view.'],
  question: ['What would {d} look like without a {n}?', 'Where does a {a} {n} end and {d} begin?', 'Can {d} stay {a} if you change {d2}?'],
  possibility: ['A possible direction: {d} reorganised around a {a} {n}. Hypothetical, not planned.', 'Possibility: a future where {d} and {d2} {v} through the same {n}. Purely speculative.', 'One potential evolution: the {n} grows {a} enough to {v} on its own. A concept, not an event.'],
  artifact: ['An artifact in the form of a {a} {n}, described rather than built.', 'An imagined object: a {n} made of {d}, {a} at the edges.', 'A made-up relic: the {n} of {d}, kept {a} and just out of reach.'],
  collection: ['A collection of {k} fragments about {d}, each one a {a} {n}.', 'A set of {k} small studies of {d}, ordered by how {a} they feel.', 'Collection: {k} views of one {n}, each shaped by {d}.'],
  knowledge: ['Knowing {d} usually means knowing its {n}. Here that {n} is {a}.', 'Working knowledge: a {a} {n} tends to {v} when left alone.', 'Core note: it is easier to follow {d} through a {n} than through a definition.'],
  curiosity: ['Curious about why a {a} {n} feels like {d}.', 'A small curiosity: can {d} {v} the way a {n} can?', 'Still wondering how {d} and {d2} ended up sharing one {n}.'],
  connection: ['A link between {d} and {d2}, carried by a {a} {n}.', '{D} and {d2} meet at a single point: the {n}.', 'Connected through a {a} {n}: {d} on one side, {d2} on the other.'],
  evolution: ['From a {a} {n} to a {a2} {n2}, with {d} keeping its {n3} throughout.', 'Step by step, you can follow {d} from {n} to {n2}, growing more {a} along the way.', 'How a {n} evolves: first {a}, then {a2}, always about {d}.'],
  unknown: ['Unresolved: a {a} {n} with no clear link to {d}.', 'Not yet understood: why {d2} keeps returning to the {n}.', 'An open gap between {d} and {d2}, shaped like a {n}.']
};
const FR = [
  ['An earlier way of seeing {d}: as a {a} {n}. A conceptual origin, not a record.', 'Before {d2}, there was only a {a} {n}. A framing, not a fact.'],
  ['Right now, think of {d} as a {a} {n}.', 'In this state, {d} and {d2} are held together by one {n}.'],
  ['A possible next step: {d} reshaped by a {a} {n}. Hypothetical.', 'Potential direction: let {d2} {v} around the {n}. Not a plan.'],
  ['A possibility: the {n} becomes {a}, and {d} can follow. A hypothetical evolution.', 'Perhaps {d} could {v} the way a {a} {n} does. Speculation.'],
  ['No one knows yet how {d} and the {a} {n} relate.', 'Unmapped: what a {n} means for {d2}.']
];
/* compositions: A identity/thought/discovery, B concept/project/question, C timeline/idea/connection,
   D discovery/principle/experiment, E project/nodes/possibility, F minimal, G connected nodes, H timeline */
const COMP = [
  ['identity', 'thought', 'discovery'], ['concept', 'project', 'question'], ['fragment', 'idea', 'connection'],
  ['discovery', 'principle', 'experiment'], ['project', 'nodes', 'possibility'], ['identity'],
  ['connection', 'nodes', 'evolution'], ['fragment', 'fragment', 'fragment', 'fragment', 'fragment']
];
const EXTRA = ['artifact', 'collection', 'knowledge', 'curiosity', 'evolution', 'unknown', 'possibility', 'principle'];
const UNUSUAL = ['unknown', 'artifact', 'curiosity', 'evolution', 'collection', 'knowledge', 'possibility', 'experiment', 'fragment', 'connection'];
const EGGS = {
  '1': 'The origin. Every state can be traced back here.',
  '8': 'A loop with no start and no end. ∞',
  '404': 'Nothing is missing. This state is simply quiet.',
  '1618': 'A state that keeps unfolding into itself.',
  '31415': 'Round and round, never repeating.'
};

/* =====================================================================
   2. SEED ENGINE (deterministic, no Math.random for content)
   ===================================================================== */
function hash32(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 16; h = Math.imul(h, 2246822507); h ^= h >>> 13; h = Math.imul(h, 3266489909); h ^= h >>> 16;
  return h >>> 0;
}
function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
function rngFrom(key) {
  const r = sfc32(hash32(key + '|a'), hash32(key + '|b'), hash32(key + '|c'), hash32(key + '|d'));
  for (let i = 0; i < 10; i++) r();
  r.int = n => Math.floor(r() * n);
  r.pick = a => a[Math.floor(r() * a.length)];
  return r;
}
const s3 = v => (/(ch|sh|o)$/.test(v) ? v + 'es' : v + 's');
function expand(t, r) {
  const used = {}, val = {};
  const get = lk => {
    if (val[lk] !== undefined) return val[lk];
    let v;
    if (lk === 'vs') v = s3(get('v'));
    else if (lk[0] === 'k') v = String(3 + r.int(7));
    else {
      const g = lk[0], u = used[g] || (used[g] = []);
      for (let i = 0; i < 6; i++) { v = r.pick(BANK[g]); if (!u.includes(v)) break; }
      u.push(v);
    }
    return (val[lk] = v);
  };
  const out = t.replace(/\{(\w+)\}/g, (m, k) => {
    const v = get(k.toLowerCase());
    return k[0] === k[0].toUpperCase() ? v[0].toUpperCase() + v.slice(1) : v;
  });
  return out.replace(/\b([Aa]) (?=[aeiouAEIOU])/g, '$1n ');
}

/* =====================================================================
   3. IDENTITY ENGINE: state IDs as strings, arithmetic with BigInt
   ===================================================================== */
const MAXD = 1000;
const pad = id => (id.length < 6 ? id.padStart(6, '0') : id);
const revStr = s => s.split('').reverse().join('');
function normalizeId(raw) {
  let s = String(raw == null ? '' : raw).trim().toLowerCase();
  if (s === '∞' || s === 'infinity') s = '8';
  s = s.replace(/^orvexa\s*\/?/, '').replace(/^\s*(state\s*)?#?/, '').replace(/[\s,_]/g, '');
  if (!s) return { ok: false, msg: 'Enter a state number, like 18472.' };
  if (!/^\d+$/.test(s)) {
    if (/^[-+]?\d*\.\d+$/.test(s)) return { ok: false, msg: 'State IDs are whole numbers.' };
    if (s[0] === '-') return { ok: false, msg: 'State IDs start at 1.' };
    return { ok: false, msg: 'Use digits only, like 18472.' };
  }
  s = s.replace(/^0+/, '');
  if (!s) return { ok: false, msg: 'State IDs start at 1.' };
  if (s.length > MAXD) return { ok: false, msg: 'That ID has ' + s.length + ' digits. ORVEXA has no maximum, but this browser keeps IDs to ' + MAXD + ' digits.' };
  return { ok: true, id: s };
}

/* ---- relationship generator: every state links to other states ---- */
function relations(id) {
  const b = BigInt(id), h = hash32(id + '|echo'), out = [];
  if (b > 1n) out.push(['Parent', b >> 1n]);
  out.push(['Child', b * 2n], ['Child', b * 2n + 1n], ['Echo', b + BigInt(1 + (h % 9999))]);
  const m = revStr(id).replace(/^0+/, '');
  if (m && m !== id) out.push(['Mirror', BigInt(m)]);
  return out.map(x => ({ rel: x[0], id: x[1].toString() }));
}
/* separate seed transformation for discovery */
function discoverTarget(id) {
  const b = BigInt(id), h = hash32(id + '|discover'), k = h % 4;
  let t;
  if (k === 0) t = b + BigInt(1000 + (h % 90000));
  else if (k === 1) t = b * BigInt(3 + (h % 5)) + BigInt(h % 17);
  else if (k === 2) {
    const m = BigInt(revStr(id).replace(/^0+/, '') || '1');
    t = m !== b ? m * 7n + BigInt((h % 97) + 1) : b + BigInt((h % 5000) + 7);
  } else t = b > 20n ? b / BigInt(2 + (h % 9)) + 1n : b * 11n + BigInt((h % 101) + 1);
  if (t < 1n) t = 1n;
  if (t === b) t = b + 1n;
  return t.toString();
}

/* =====================================================================
   4. DNA, CONTENT, LAYOUT GENERATORS
   ===================================================================== */
function eggOf(id) {
  if (EGGS[id]) return { t: EGGS[id], solo: true };
  const n = id.length;
  if (n < 4) return null;
  let same = true, pal = true;
  for (let i = 1; i < n; i++) if (id[i] !== id[0]) { same = false; break; }
  for (let i = 0, j = n - 1; i < j; i++, j--) if (id[i] !== id[j]) { pal = false; break; }
  if (same) return { t: 'A repeating state: one digit, held steady.' };
  if (pal && n >= 5) return { t: 'A mirror state: it reads the same from both ends.' };
  return null;
}
/* cheap composition lookup, also used to find states that feature an item */
function slotsFor(id) {
  const e = eggOf(id);
  let c = hash32('C|' + id) % 8;
  if (e && e.solo) c = 5;
  const slots = COMP[c].slice();
  if (c !== 5 && c !== 7) {
    const h = hash32('X|' + id);
    if (h % 100 < 55) slots.push(EXTRA[(h >>> 8) % EXTRA.length]);
  }
  return { c, slots };
}
function featuredN(id, type, k, c) {
  const h = hash32('F|' + id + '|' + type + '|' + k) % TY[type][1];
  return type === 'fragment' && c === 7 ? Math.floor(h / 5) * 5 + k : h;
}
function findStates(type, n, count) {
  const out = [];
  for (let i = 1; i <= 500000 && out.length < count; i++) {
    const id = String(i), sc = slotsFor(id);
    for (let k = 0; k < sc.slots.length; k++) {
      if (sc.slots[k] === type && featuredN(id, type, k, sc.c) === n) { out.push(id); break; }
    }
  }
  return out;
}

const icache = new Map();
function genItem(type, n, nocache) {
  const key = type + n;
  if (!nocache && icache.has(key)) return icache.get(key);
  const t = TY[type], r = rngFrom('I|' + type + '|' + n);
  const title = expand(r.pick(TITLES), r);
  const dim = type === 'fragment' ? n % 5 : -1;
  const body = expand(r.pick(dim >= 0 ? FR[dim] : TPL[type]), r);
  const it = { type, n, label: t[0] + ' ' + String(n).padStart(t[2], '0'), title, body, dim };
  if (!nocache) { if (icache.size > 400) icache.clear(); icache.set(key, it); }
  return it;
}
const pcache = new Map();
function projInfo(n) {
  if (pcache.has(n)) return pcache.get(n);
  const q = rngFrom('PX|' + n);
  const info = {
    status: q.pick(STATUS),
    concept: expand('{A} {n} as a way to read {d}', q),
    ideas: [genItem('idea', q.int(1000)), genItem('idea', q.int(1000))],
    discs: [genItem('discovery', q.int(1000)), genItem('discovery', q.int(1000))],
    evo: expand('{N} → {n2} → {n3}', q),
    future: expand('A possible direction, not a plan: let {d} {v} around the {n}.', q),
    states: findStates('project', n, 2)
  };
  pcache.set(n, info);
  return info;
}

const mcache = new Map();
function buildState(id, mode) {
  const key = mode + id, hit = mcache.get(key);
  if (hit) return hit;
  const r = rngFrom('N|' + mode + '|' + id);
  const dna = {
    lay: r.pick(['center', 'split', 'stack']), dens: r.int(3), type: r.int(3), hue: 200 + r.int(40),
    acc: (0.06 + r() * 0.14).toFixed(3), ax: r.int(100), ay: r.int(50), motion: r.int(3), sym: r.pick(SYMS), rot: r.int(5)
  };
  dna.p1 = r.pick(ADJ);
  do { dna.p2 = r.pick(ADJ); } while (dna.p2 === dna.p1);
  const ident = { epithet: expand('The {A} {N}', r), statement: expand(r.pick(ID_ST), r) };
  const egg = eggOf(id);
  let blocks = [], items = [], c = -1;
  if (mode === 'D') {
    const q = rngFrom('DS|' + id), pool = UNUSUAL.slice();
    const t1 = pool.splice(q.int(pool.length), 1)[0], t2 = pool.splice(q.int(pool.length), 1)[0];
    const d0 = genItem('discovery', hash32('DID|' + id) % 1000);
    const a = genItem(t1, hash32('DF|' + id + '|' + t1) % TY[t1][1]);
    const b = genItem(t2, hash32('DF|' + id + '|' + t2) % TY[t2][1]);
    items = [d0, a, b];
    const cross = { type: 'cross', text: expand('Crossing: ' + TY[t1][0].toLowerCase() + ' and ' + TY[t2][0].toLowerCase() + ' share a {a} {n} between {d} and {d2}.', q) };
    blocks = [cross, d0, a, b, { type: 'nodes' }];
    if (dna.lay === 'center') dna.lay = 'split';
  } else {
    const sc = slotsFor(id);
    c = sc.c;
    sc.slots.forEach((t, k) => {
      if (t === 'identity' || t === 'nodes') blocks.push({ type: t });
      else { const it = genItem(t, featuredN(id, t, k, c)); items.push(it); blocks.push(it); }
    });
    if (c === 7) { blocks = [{ type: 'timeline', items: items.slice() }]; dna.lay = 'stack'; }
    if (c === 5) dna.lay = 'center';
    if (c !== 5 && c !== 7 && blocks.length > 1) {
      if (dna.rot === 1) blocks.reverse(); else if (dna.rot === 2) blocks.push(blocks.shift());
    }
  }
  if (egg) blocks.unshift({ type: 'egg', text: egg.t });
  const m = { id, mode, c, dna, ident, egg, blocks, items, nodes: relations(id) };
  if (mcache.size > 40) mcache.clear();
  mcache.set(key, m);
  return m;
}

function originText(id) {
  if (id === '1') return 'This is the first state. Every other state can be traced back to it by halving.';
  const bits = BigInt(id).toString(2).length - 1, anc = [];
  let b = BigInt(id);
  for (let i = 0; i < 4 && b > 1n; i++) { b >>= 1n; anc.push(b.toString()); }
  return 'This state is ' + bits + ' step' + (bits === 1 ? '' : 's') + ' from the first state, found by halving its ID. Nearest ancestors: ' + anc.join(', ') + '.';
}
function deepLayers(m) {
  const q = rngFrom('DP|' + m.mode + '|' + m.id), it = m.items;
  const conn = it.length > 1
    ? expand(it[0].label + ' and ' + it[1].label + ' are linked through a {a} {n}.', q)
    : 'This state connects to the rest of ORVEXA through ' + m.nodes.length + ' nearby nodes.';
  return [
    { name: 'Context', text: expand('This state sits in the {d} region of ORVEXA, where a {a} {n} keeps {d2} in view.', q) },
    { name: 'Connection', text: conn },
    { name: 'Origin', text: originText(m.id) },
    { name: 'Meaning', text: expand('Taken together, this state suggests {d} as a {a} {n}: something to follow, not to finish.', q) },
    { name: 'Related nodes', nodes: m.nodes },
    { name: 'Future possibility', text: expand('A possible future, purely hypothetical: this state could {v} toward {d2}. Not a prediction.', q) }
  ];
}

G.ORVEXA = { engine: { normalizeId, buildState, genItem, hash32, relations, discoverTarget, findStates, eggOf, slotsFor, deepLayers, projInfo, expand, rngFrom } };
if (typeof document === 'undefined') return;

/* =====================================================================
   5. STORAGE (always safe, falls back to memory)
   ===================================================================== */
let storeOk = true;
const mem = new Map();
const store = {
  get(k) { if (storeOk) { try { return localStorage.getItem(k); } catch (e) { storeOk = false; } } return mem.has(k) ? mem.get(k) : null; },
  set(k, v) { mem.set(k, v); if (storeOk) { try { localStorage.setItem(k, v); } catch (e) { storeOk = false; } } }
};
const sess = {
  get(k) { try { return sessionStorage.getItem(k); } catch (e) { return mem.get('s' + k) || null; } },
  set(k, v) { mem.set('s' + k, v); try { sessionStorage.setItem(k, v); } catch (e) { /* memory only */ } }
};
function loadList(k, max) {
  try {
    const p = JSON.parse(store.get(k) || '[]');
    if (Array.isArray(p)) return p.filter(x => typeof x === 'string' && /^[1-9]\d{0,999}$/.test(x)).slice(0, max);
  } catch (e) { /* corrupted: start fresh */ }
  return [];
}
const persist = (k, a) => store.set(k, JSON.stringify(a));

/* =====================================================================
   6. RENDERER
   ===================================================================== */
const $ = s => document.querySelector(s);
function el(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
}
const reduced = () => { try { return G.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
const BASE_TITLE = 'ORVEXA — The Infinite Profile';

let view = 'gate', cur = { id: '1', mode: 'S' }, deepLevel = 0, startId = '1', startMode = 'S', pendingNotice = '', entering = false;
let saved = [], hist = [];

function chips(list) {
  const w = el('div', 'chips');
  list.forEach(n => {
    const b = el('button', 'chip', 'NODE ' + n.id);
    b.type = 'button'; b.dataset.act = 'open'; b.dataset.id = n.id;
    b.setAttribute('aria-label', 'Open state ' + n.id + (n.rel ? ' (' + n.rel + ')' : ''));
    if (n.rel) b.append(el('small', '', n.rel));
    w.append(b);
  });
  return w;
}
function stateChips(ids) {
  return chips(ids.map(id => ({ id, rel: id === cur.id ? 'this state' : '' })));
}
function projectEl(s, n) {
  const p = projInfo(n), dl = el('dl', 'pj');
  const row = (k, node) => { const d = el('div'); d.append(el('dt', '', k)); const dd = el('dd'); dd.append(node); d.append(dd); dl.append(d); };
  const list = arr => { const u = el('ul'); arr.forEach(i => u.append(el('li', '', i.label + ' — ' + i.title))); return u; };
  row('Status', document.createTextNode(p.status));
  row('Concept', document.createTextNode(p.concept));
  row('Related ideas', list(p.ideas));
  row('Related discoveries', list(p.discs));
  row('Evolution', document.createTextNode(p.evo));
  row('Connections', p.states.length ? stateChips(p.states) : document.createTextNode('Not yet placed in a state.'));
  const f = el('span'); f.append(document.createTextNode(p.future + ' '), el('span', 'tag', 'Hypothetical'));
  row('Future direction', f);
  s.append(dl);
}
function blockEl(m, b) {
  const t = b.type;
  if (t === 'identity') {
    const s = el('section', 'blk k-identity'), sy = el('span', 'sym', m.dna.sym);
    sy.setAttribute('aria-hidden', 'true');
    s.append(sy, el('h2', 'ttl', m.ident.epithet), el('p', 'lead', m.ident.statement), el('p', 'dim', 'Personality: ' + m.dna.p1 + ', ' + m.dna.p2 + '.'));
    return s;
  }
  if (t === 'egg') { const s = el('section', 'blk k-egg'); s.append(el('p', '', b.text)); return s; }
  if (t === 'cross') { const s = el('section', 'blk k-cross'); s.append(el('p', '', b.text)); return s; }
  if (t === 'nodes') { const s = el('section', 'blk k-nodes'); s.append(el('h2', 'sub-h', 'Related nodes'), chips(m.nodes)); return s; }
  if (t === 'timeline') {
    const s = el('section', 'blk k-timeline'), ol = el('ol', 'tl');
    s.append(el('h2', 'sub-h', 'Timeline fragments'));
    b.items.forEach(it => {
      const li = el('li'), h = el('p', 'lbl', DIMS[it.dim]);
      h.append(el('span', 'tag', it.label));
      if (it.dim === 2 || it.dim === 3) h.append(el('span', 'tag', 'Hypothetical'));
      li.append(h, el('p', '', it.body));
      ol.append(li);
    });
    s.append(ol);
    return s;
  }
  const s = el('section', 'blk k-' + t), lab = el('p', 'lbl', b.label);
  if (t === 'fragment') lab.append(el('span', 'tag', DIMS[b.dim]));
  if (t === 'possibility' || b.dim === 2 || b.dim === 3) lab.append(el('span', 'tag', 'Hypothetical'));
  s.append(lab);
  if (t !== 'question' && t !== 'thought') s.append(el('h2', 'ttl', b.title));
  s.append(el('p', '', b.body));
  if (t === 'project') projectEl(s, b.n);
  return s;
}
function paintDeep() {
  const m = buildState(cur.id, cur.mode), box = $('#deep'), btn = $('#deepBtn');
  box.replaceChildren();
  box.hidden = deepLevel === 0;
  if (deepLevel > 0) {
    const ol = el('ol', 'deep-list');
    ol.style.cssText = 'list-style:none;padding:0;margin:0;display:grid;gap:1.4rem';
    deepLayers(m).slice(0, deepLevel).forEach(l => {
      const li = el('li');
      li.append(el('h3', '', l.name));
      li.append(l.nodes ? chips(l.nodes) : el('p', '', l.text));
      ol.append(li);
    });
    box.append(ol);
    const last = ol.lastChild;
    if (last && last.scrollIntoView) { try { last.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); } catch (e) { /* ignore */ } }
  }
  btn.textContent = deepLevel === 0 ? 'Deep dive' : deepLevel >= 6 ? 'Surface' : 'Deeper';
  btn.setAttribute('aria-pressed', String(deepLevel > 0));
}
function paintSave() {
  const on = saved.includes(cur.id), b = $('#saveBtn');
  b.textContent = on ? 'Saved' : 'Save';
  b.setAttribute('aria-pressed', String(on));
}
function paint() {
  const root = $('#state');
  try {
    const m = buildState(cur.id, cur.mode), d = m.dna, app = $('#app');
    app.style.setProperty('--hue', d.hue);
    app.style.setProperty('--accA', d.acc);
    app.style.setProperty('--ax', d.ax + '%');
    app.style.setProperty('--ay', d.ay + '%');
    const sid = $('#sid');
    sid.textContent = 'ORVEXA / ' + pad(cur.id);
    sid.dataset.size = cur.id.length > 40 ? 'xl' : cur.id.length > 14 ? 'l' : 'm';
    sid.setAttribute('aria-label', 'ORVEXA state ' + pad(cur.id));
    $('#epi').textContent = m.ident.epithet;
    $('#modeLine').hidden = cur.mode !== 'D';
    root.className = 'state lay-' + d.lay + ' d' + d.dens + ' t' + d.type + ' m' + d.motion;
    root.replaceChildren(...m.blocks.map(b => blockEl(m, b)));
    document.title = 'ORVEXA / ' + pad(cur.id) + ' — The Infinite Profile';
    $('#announce').textContent = 'State ' + cur.id + (cur.mode === 'D' ? ', discovery view' : '') + '. ' + m.ident.epithet;
  } catch (e) {
    root.className = 'state lay-center';
    const s = el('section', 'blk'), a = el('button', 'btn pri', 'Open state 000001');
    a.type = 'button'; a.dataset.act = 'open'; a.dataset.id = '1';
    s.append(el('h2', 'ttl', 'This state could not be built'), el('p', '', 'Your place is safe. Try another state, or start again from the first one.'), a);
    root.replaceChildren(s);
  }
  deepLevel = 0;
  paintDeep();
  paintSave();
}

/* =====================================================================
   7. NAVIGATION / URL / HISTORY
   ===================================================================== */
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('on');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('on'), 2800);
}
function showNotice(msg) { $('#noticeText').textContent = msg; $('#notice').hidden = false; }
function setView(v) {
  view = v;
  $('#gate').hidden = v !== 'gate';
  $('#app').hidden = v !== 'app';
  document.body.dataset.view = v;
  if (v === 'gate') document.title = BASE_TITLE;
}
function linkFor(id, mode) {
  try {
    const u = new URL(G.location.href);
    u.search = ''; u.hash = '';
    u.searchParams.set('state', id);
    if (mode === 'D') u.searchParams.set('mode', 'discover');
    return u.toString();
  } catch (e) { return '?state=' + id + (mode === 'D' ? '&mode=discover' : ''); }
}
function parseUrl() {
  let sp;
  try { sp = new URLSearchParams(G.location.search); } catch (e) { return {}; }
  const mode = sp.get('mode') === 'discover' ? 'D' : 'S', raw = sp.get('state');
  if (raw === null) return { mode };
  const n = normalizeId(raw);
  return n.ok ? { id: n.id, mode } : { bad: n.msg, mode };
}
function writeUrl(how) {
  if (how === 'none') return;
  const q = '?state=' + cur.id + (cur.mode === 'D' ? '&mode=discover' : '');
  try {
    if (G.location.search === q) return;
    if (how === 'replace') G.history.replaceState(null, '', q); else G.history.pushState(null, '', q);
  } catch (e) { /* History API unavailable: the app still works */ }
}
function record(id) {
  if (hist[0] === id) return;
  hist = [id].concat(hist.filter(x => x !== id)).slice(0, 60);
  persist('orvexa.history', hist);
}
function go(raw, mode, how) {
  const n = normalizeId(raw);
  if (!n.ok) { toast(n.msg); return false; }
  closeSheet();
  if (view !== 'app') setView('app');
  cur = { id: n.id, mode: mode || 'S' };
  writeUrl(how || 'push');
  record(cur.id);
  paint();
  G.scrollTo(0, 0);
  return true;
}
function step(d) {
  const b = BigInt(cur.id) + BigInt(d);
  if (b < 1n) { toast('State 000001 is the first state. Try Next or Discover.'); return; }
  go(b.toString(), cur.mode, 'push');
}
function rnd01() {
  try { const a = new Uint32Array(1); G.crypto.getRandomValues(a); return a[0] / 4294967296; } catch (e) { return Math.random(); }
}
function randomId() {
  for (let t = 0; t < 5; t++) {
    const len = 1 + Math.floor(Math.pow(rnd01(), 1.6) * 15);
    let s = '';
    for (let i = 0; i < len; i++) s += Math.floor(rnd01() * 10);
    s = s.replace(/^0+/, '');
    if (s && s !== cur.id) return s;
  }
  return String(Number(cur.id.slice(-9)) + 1);
}
const discover = () => go(discoverTarget(cur.id), 'D', 'push');
function deepStep() { deepLevel = deepLevel >= 6 ? 0 : deepLevel + 1; paintDeep(); }

function enter() {
  if (entering) return;
  entering = true;
  sess.set('entered', '1');
  const g = $('#gate');
  const done = () => {
    g.classList.remove('out');
    go(startId, startMode, 'replace');
    if (pendingNotice) { showNotice(pendingNotice); pendingNotice = ''; }
    entering = false;
    try { $('#stage').focus({ preventScroll: true }); } catch (e) { /* ignore */ }
  };
  if (reduced()) done(); else { g.classList.add('out'); setTimeout(done, 340); }
}
function returnToGate() {
  closeSheet();
  startId = cur.id; startMode = cur.mode;
  const h = $('#gateHint');
  h.textContent = 'State ' + pad(cur.id) + ' is waiting.'; h.hidden = false;
  setView('gate');
  $('#enter').focus();
}

/* =====================================================================
   8. SHEETS: jump, search, library, share, connections
   ===================================================================== */
const sheet = $('#sheet');
const SHEET_TITLES = { jump: 'Jump to a state', search: 'Search', library: 'Library', share: 'Share this state', graph: 'Connections' };
const sheetOpen = () => sheet.open || sheet.hasAttribute('open');
function closeSheet() {
  if (!sheetOpen()) return;
  try { sheet.close(); } catch (e) { sheet.removeAttribute('open'); }
}
function openSheet(name) {
  document.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== name; });
  $('#sheetTitle').textContent = SHEET_TITLES[name];
  if (name === 'library') renderLibrary();
  if (name === 'share') $('#shareLink').value = linkFor(cur.id, cur.mode);
  if (name === 'graph') renderGraph();
  if (name === 'jump') { $('#jumpErr').textContent = ''; $('#jumpIn').value = ''; }
  if (name === 'search') { $('#q').value = ''; runSearch('', false); }
  if (!sheetOpen()) { if (typeof sheet.showModal === 'function') { try { sheet.showModal(); } catch (e) { sheet.setAttribute('open', ''); } } else sheet.setAttribute('open', ''); }
  const f = name === 'jump' ? $('#jumpIn') : name === 'search' ? $('#q') : null;
  if (f) f.focus();
}
function renderGraph() {
  const m = buildState(cur.id, cur.mode), ol = $('#chain');
  ol.replaceChildren();
  const steps = [['ORVEXA', 'One identity'], ['Identity', m.ident.epithet]]
    .concat(m.items.map(i => [i.label, i.title]))
    .concat([['State ' + pad(m.id), 'You are here']]);
  steps.forEach(s => { const li = el('li'); li.append(el('strong', '', s[0]), ' ', el('span', 'dim', s[1])); ol.append(li); });
  $('#nodes').replaceChildren(chips(m.nodes));
  $('#trace').textContent = originText(m.id);
}
function fillList(ul, arr, removable) {
  ul.replaceChildren();
  arr.forEach(id => {
    const li = el('li', 'row'), o = el('button', 'lnk', 'ORVEXA / ' + pad(id));
    o.type = 'button'; o.dataset.act = 'open'; o.dataset.id = id;
    const s = el('button', 'mini', 'Share');
    s.type = 'button'; s.dataset.act = 'share-id'; s.dataset.id = id; s.setAttribute('aria-label', 'Share state ' + id);
    li.append(o, s);
    if (removable) {
      const x = el('button', 'mini', 'Remove');
      x.type = 'button'; x.dataset.act = 'unsave'; x.dataset.id = id; x.setAttribute('aria-label', 'Remove state ' + id + ' from saved');
      li.append(x);
    }
    ul.append(li);
  });
}
function renderLibrary() {
  fillList($('#savedList'), saved, true);
  fillList($('#histList'), hist, false);
  $('#savedEmpty').hidden = saved.length > 0;
  $('#histEmpty').hidden = hist.length > 0;
  $('#clearHist').hidden = hist.length === 0;
  $('#storeNote').hidden = storeOk;
}
function toggleSave() {
  const i = saved.indexOf(cur.id);
  if (i >= 0) { saved.splice(i, 1); toast('Removed from saved.'); }
  else { saved.unshift(cur.id); saved = saved.slice(0, 500); toast('State saved.'); }
  persist('orvexa.saved', saved);
  paintSave();
}

/* ---- search ---- */
const ALIAS = { node: 'node', state: 'node', orvexa: 'node', timeline: 'fragment', future: 'possibility', discover: 'discovery' };
Object.keys(TY).forEach(k => { ALIAS[k] = k; });
function card(label, title, body, btnText, data) {
  const c = el('div', 'rc');
  c.append(el('p', 'lbl', label), el('h3', '', title));
  if (body) c.append(el('p', '', body));
  const b = el('button', 'btn', btnText);
  b.type = 'button';
  Object.keys(data).forEach(k => { b.dataset[k] = data[k]; });
  c.append(b);
  return c;
}
function stateCard(id, note) {
  const m = buildState(id, 'S');
  return card('STATE ' + pad(id), m.ident.epithet, note || m.ident.statement, 'Open state', { act: 'open', id });
}
function itemCard(it, note) {
  return card(it.label, it.title, it.body, note || 'Open a state featuring it', { act: 'open-item', type: it.type, n: String(it.n) });
}
function runSearch(raw, submit) {
  const out = $('#results'), q = raw.trim().slice(0, 60);
  out.replaceChildren();
  if (!q) { out.append(el('p', 'hint', 'Try a state number, “idea 903”, “project 42”, or a word like “memory”.')); return; }
  const im = /^([a-z]+?)s?\s*#?\s*(\d+)$/i.exec(q);
  const alias = im && ALIAS[im[1].toLowerCase()];
  if (alias && alias !== 'node') {
    const t = TY[alias], n = parseInt(im[2], 10) % t[1];
    const it = genItem(alias, n);
    if (n !== parseInt(im[2], 10)) out.append(el('p', 'hint', t[0] + ' numbers run from 0 to ' + (t[1] - 1) + '. Showing ' + it.label + '.'));
    out.append(itemCard(it));
    return;
  }
  const stateLike = alias === 'node' || /^(?:orvexa|state)?[\s/#]*[\d\s,_]+$/i.test(q) || /^(∞|infinity)$/i.test(q);
  if (stateLike) {
    const n = normalizeId(alias === 'node' ? im[2] : q);
    if (!n.ok) { out.append(el('p', 'err', n.msg)); return; }
    if (submit) { go(n.id, 'S', 'push'); return; }
    out.append(stateCard(n.id));
    return;
  }
  const kw = q.toLowerCase();
  const sid = ((BigInt(hash32('K|' + kw + '|1')) << 32n) | BigInt(hash32('K|' + kw + '|2'))) + 1n;
  out.append(stateCard(sid.toString(), 'A state derived from “' + q + '”. The same word always opens the same state.'));
  let found = 0;
  ['idea', 'concept', 'project', 'discovery', 'thought'].forEach(type => {
    let per = 0;
    for (let n = 0; n < 1000 && per < 2; n++) {
      const it = genItem(type, n, true);
      if ((it.title + ' ' + it.body).toLowerCase().includes(kw)) { out.append(itemCard(it)); per++; found++; }
    }
  });
  if (!found) {
    const it = genItem('idea', hash32('K|' + kw) % 1000);
    out.append(el('p', 'hint', 'No item uses that exact word, so here is the idea ORVEXA derives from it.'));
    out.append(itemCard(it));
  }
}

/* ---- share ---- */
async function copy(text, msg) {
  try {
    if (navigator.clipboard && G.isSecureContext) { await navigator.clipboard.writeText(text); toast(msg); return; }
  } catch (e) { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    (sheetOpen() ? sheet : document.body).append(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    if (ok) { toast(msg); return; }
  } catch (e) { /* fall through */ }
  const inp = $('#shareLink');
  if (inp && sheetOpen()) { inp.focus(); inp.select(); }
  toast('Copy is unavailable here. The link is selected so you can copy it by hand.');
}
async function shareState(id, mode) {
  const url = linkFor(id, mode);
  if (navigator.share) {
    try { await navigator.share({ title: 'ORVEXA / ' + pad(id), text: 'ORVEXA: one identity, infinite states.', url }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  copy(url, 'Link copied.');
}

/* =====================================================================
   9. EVENTS
   ===================================================================== */
const ACTIONS = {
  enter, return: returnToGate, prev: () => step(-1), next: () => step(1),
  random: () => go(randomId(), 'S', 'push'), discover, deep: deepStep,
  jump: () => openSheet('jump'), search: () => openSheet('search'), library: () => openSheet('library'),
  graph: () => openSheet('graph'), share: () => openSheet('share'), save: toggleSave, close: closeSheet,
  standard: () => go(cur.id, 'S', 'push'),
  dismiss: () => { $('#notice').hidden = true; },
  'copy-link': () => copy(linkFor(cur.id, cur.mode), 'Link copied.'),
  'copy-id': () => copy(cur.id, 'State ID copied.'),
  'native-share': () => shareState(cur.id, cur.mode),
  'clear-history': () => { hist = []; persist('orvexa.history', hist); renderLibrary(); toast('History cleared.'); }
};
document.addEventListener('click', e => {
  const t = e.target.closest ? e.target.closest('[data-act]') : null;
  if (!t) return;
  const a = t.dataset.act, d = t.dataset;
  if (a === 'open') go(d.id, 'S', 'push');
  else if (a === 'open-item') {
    const id = findStates(d.type, parseInt(d.n, 10), 1)[0];
    if (id) go(id, 'S', 'push'); else toast('No state features that item yet.');
  }
  else if (a === 'share-id') shareState(d.id, 'S');
  else if (a === 'unsave') { saved = saved.filter(x => x !== d.id); persist('orvexa.saved', saved); renderLibrary(); paintSave(); }
  else if (ACTIONS[a]) ACTIONS[a]();
});
sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });

$('#jumpForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = normalizeId($('#jumpIn').value);
  if (!n.ok) { $('#jumpErr').textContent = n.msg; $('#jumpIn').focus(); return; }
  go(n.id, 'S', 'push');
});
let searchT;
$('#searchForm').addEventListener('submit', e => { e.preventDefault(); clearTimeout(searchT); runSearch($('#q').value, true); });
$('#q').addEventListener('input', () => { clearTimeout(searchT); searchT = setTimeout(() => runSearch($('#q').value, false), 160); });

let typed = '';
document.addEventListener('keydown', e => {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target, typing = t && t.closest && t.closest('input,textarea,select,[contenteditable="true"]');
  if (e.key === 'Escape') { if (sheetOpen()) closeSheet(); return; }
  if (typing) return;
  const onControl = t && t.closest && t.closest('button,a,summary,[role="button"]');
  if (view === 'gate') { if (e.key === 'Enter' && !onControl) { e.preventDefault(); enter(); } return; }
  if (sheetOpen()) return;
  const k = e.key;
  if (k === 'ArrowRight') { e.preventDefault(); step(1); }
  else if (k === 'ArrowLeft') { e.preventDefault(); step(-1); }
  else if ((k === ' ' || k === 'Spacebar') && !onControl) { e.preventDefault(); if (e.shiftKey) discover(); else step(1); }
  else if (k === 'Enter' && !onControl) { e.preventDefault(); deepStep(); }
  else if (k.length === 1 && /[a-z]/i.test(k)) {
    typed = (typed + k.toLowerCase()).slice(-6);
    if (typed === 'orvexa') { typed = ''; go('777777777', 'S', 'push'); }
  }
});

/* touch: horizontal swipe = previous/next, swipe up at the end of the page = discover */
let tx = 0, ty = 0, tt = 0, tOn = false;
const stage = $('#stage');
stage.addEventListener('touchstart', e => {
  if (e.touches.length !== 1 || (e.target.closest && e.target.closest('input,textarea'))) { tOn = false; return; }
  tx = e.touches[0].clientX; ty = e.touches[0].clientY; tt = Date.now(); tOn = true;
}, { passive: true });
stage.addEventListener('touchcancel', () => { tOn = false; }, { passive: true });
stage.addEventListener('touchend', e => {
  if (!tOn || sheetOpen()) return;
  tOn = false;
  const t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
  if (Date.now() - tt > 700) return;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) step(dx < 0 ? 1 : -1);
  else if (dy < -90 && Math.abs(dy) > Math.abs(dx) * 1.8 && G.innerHeight + G.scrollY >= document.documentElement.scrollHeight - 6) discover();
}, { passive: true });

G.addEventListener('popstate', () => {
  const p = parseUrl();
  go(p.id || '1', p.mode || 'S', 'none');
});
G.addEventListener('error', () => { try { toast('Something went wrong. Your place is safe.'); } catch (e) { /* ignore */ } });
G.addEventListener('unhandledrejection', () => { try { toast('Something went wrong. Your place is safe.'); } catch (e) { /* ignore */ } });

/* =====================================================================
   10. BOOT: URL → state ID → validation → seed → state → render
   ===================================================================== */
function boot() {
  document.documentElement.className = 'js';
  saved = loadList('orvexa.saved', 500);
  hist = loadList('orvexa.history', 60);
  const p = parseUrl();
  startId = p.id || '1'; startMode = p.mode || 'S';
  if (p.bad) pendingNotice = 'That link had an invalid state ID, so ORVEXA opened state 000001. ' + p.bad;
  const h = $('#gateHint');
  if (sess.get('entered') === '1') {
    setView('app');
    go(startId, startMode, 'replace');
    if (pendingNotice) { showNotice(pendingNotice); pendingNotice = ''; }
  } else {
    setView('gate');
    if (p.id) { h.textContent = 'State ' + pad(p.id) + ' is waiting.'; h.hidden = false; }
    else if (p.bad) { h.textContent = 'That link had an invalid state ID. You will start at state 000001.'; h.hidden = false; }
  }
  if ('serviceWorker' in navigator && /^https?:$/.test(G.location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
  }
}
boot();
})();
