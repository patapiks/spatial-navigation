interface IInit {
  initialId: string;
  onEnter?: (el: IFocusableEl) => void;
}
interface INextFocusedCandidate {
  distance?: number;
  id?: string;
}

interface IAddElement {
  id: string;
  node: Element;
  setFocused: (value: boolean) => void;
}

interface IFocusableEl {
  id: string;
  node: Element;
  setFocused: (value: boolean) => void;
  x: number;
  y: number;
}

class Navigation {
  private isInitialized: boolean;
  private focusableElements: { [id: string]: IFocusableEl };
  private focusedElement: IFocusableEl | null;
  private onEnter: ((el: IFocusableEl) => void) | null;

  private calculateDistance(
    from: Pick<IFocusableEl, 'x' | 'y'>,
    to: Pick<IFocusableEl, 'x' | 'y'>
  ) {
    return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
  }

  private keydownListener = (event: KeyboardEvent) => {
    const candidates = Object.entries(this.focusableElements);
    const currentEl = this.focusedElement;

    if (currentEl && candidates.length) {
      let nextFocusedCandidate = null;

      switch (event.key) {
        case 'ArrowLeft':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [id, coord]) => {
            if (coord.x >= currentEl.x) return acc;

            const distance = this.calculateDistance(currentEl, coord);

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, id };
          }, {});
          break;
        case 'ArrowRight':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [id, coord]) => {
            if (coord.x <= currentEl.x) return acc;

            const distance = this.calculateDistance(currentEl, coord);

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, id };
          }, {});
          break;
        case 'ArrowUp':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [id, coord]) => {
            if (coord.y >= currentEl.y) return acc;

            const distance = this.calculateDistance(currentEl, coord);

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, id };
          }, {});
          break;
        case 'ArrowDown':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [id, coord]) => {
            if (coord.y <= currentEl.y) return acc;

            const distance = this.calculateDistance(currentEl, coord);

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, id };
          }, {});
          break;
        case 'Enter':
          this.onEnter && this.onEnter(currentEl);
          break;
      }

      if (nextFocusedCandidate?.id) {
        currentEl.setFocused(false);
        this.focusedElement = this.focusableElements[nextFocusedCandidate.id];
        this.focusedElement.setFocused(true);
      }
    }
  };

  constructor() {
    this.focusableElements = {};
    this.focusedElement = null;
    this.isInitialized = false;
    this.onEnter = null;
  }

  init({ initialId, onEnter }: IInit) {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.focusedElement = this.focusableElements[initialId];
      this.focusedElement?.setFocused(true);
      this.onEnter = onEnter ?? null;

      document.addEventListener('keydown', this.keydownListener);
    }
  }

  destroy() {
    this.isInitialized = false;
    this.focusedElement?.setFocused(false);
    this.focusedElement = null;
    this.focusableElements = {};
    this.onEnter = null;

    document.removeEventListener('keydown', this.keydownListener);
  }

  addElement({ id, node, setFocused }: IAddElement) {
    const { x, y } = node.getBoundingClientRect();

    this.focusableElements[id] = {
      id,
      x,
      y,
      node,
      setFocused,
    };
  }

  removeElement(id: string) {
    delete this.focusableElements[id];
  }
}

export default new Navigation();
