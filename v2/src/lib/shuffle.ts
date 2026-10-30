// Moves letters into a new order with a small hop, like tiles being rearranged.
// Uses FLIP: measure where each node is, reorder the DOM, measure again,
// then animate from the old spot to the new one.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animations pause in background tabs, so never wait on them longer than they should take.
const within = (promise: Promise<unknown>, ms: number) =>
  Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);

// Picks existing letter nodes to spell `word`, reusing each node once.
// A node's letter is its data-ch, or its text when it has none.
export function arrange(letters: HTMLElement[], word: string) {
  const pool = [...letters];
  return [...word].map((ch) => {
    const i = pool.findIndex((el) => (el.dataset.ch ?? el.textContent)?.toLowerCase() === ch.toLowerCase());
    return pool.splice(i, 1)[0];
  });
}

export function flip(container: HTMLElement, nodes: HTMLElement[], { duration = 760, stagger = 40 } = {}) {
  const before = new Map<Element, DOMRect>();
  for (const el of container.children) before.set(el, el.getBoundingClientRect());

  container.replaceChildren(...nodes);
  if (reduceMotion()) return Promise.resolve();

  const em = parseFloat(getComputedStyle(container).fontSize);
  const animations = nodes.map((el, i) => {
    const from = before.get(el);
    if (!from) {
      return el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: duration * 0.5,
        delay: duration * 0.6,
        fill: 'backwards',
      });
    }
    const to = el.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return null;
    // Letters moving right hop over, letters moving left duck under.
    const lift = (dx < 0 ? -0.32 : 0.22) * em;
    return el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px)` },
        { transform: `translate(${dx / 2}px, ${dy / 2 + lift}px)`, offset: 0.5 },
        { transform: 'none' },
      ],
      { duration, delay: i * stagger, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'backwards' },
    );
  });
  return within(Promise.all(animations.map((a) => a?.finished)), duration * 1.6 + nodes.length * stagger);
}

export function swapOut(nodes: HTMLElement[]) {
  if (reduceMotion()) return Promise.resolve();
  return within(Promise.all(
    nodes.map(
      (el, i) =>
        el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-0.25em)' }], {
          duration: 260,
          delay: i * 25,
          easing: 'ease-in',
          fill: 'forwards',
        }).finished,
    ),
  ), 600);
}

export function swapIn(nodes: HTMLElement[]) {
  if (reduceMotion()) return Promise.resolve();
  return within(Promise.all(
    nodes.map(
      (el, i) =>
        el.animate([{ opacity: 0, transform: 'translateY(0.3em)' }, { opacity: 1, transform: 'none' }], {
          duration: 380,
          delay: i * 35,
          easing: 'cubic-bezier(.2,.7,.2,1)',
          fill: 'backwards',
        }).finished,
    ),
  ), 800);
}
