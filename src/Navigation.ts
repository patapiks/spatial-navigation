interface INextFocusedCandidate {
  distance?: number;
  key?: string;
}

interface IAddElement {
  key: string;
  node: Element;
  setFocused: (value: boolean) => void;
}

interface IFocusableEl {
  key: string;
  node: Element;
  setFocused: (value: boolean) => void;
  x: number;
  y: number;
}

class Navigation {
  private isStarted: boolean;
  private focusableElements: { [key: string]: IFocusableEl };
  private focusedElement: IFocusableEl | null;

  private calculateDistance(
    from: Pick<IFocusableEl, 'x' | 'y'>,
    to: Pick<IFocusableEl, 'x' | 'y'>
  ) {
    return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
  }

  private keydownListener = (event: KeyboardEvent) => {
    if (this.focusedElement) {
      const candidates = Object.entries(this.focusableElements);
      let nextFocusedCandidate = null;

      switch (event.key) {
        case 'ArrowLeft':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [key, coord]) => {
            if (this.focusedElement && coord.x >= this.focusedElement.x) return acc;

            const distance = this.calculateDistance(this.focusedElement!, coord); //TODO

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, key };
          }, {});
          break;
        case 'ArrowRight':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [key, coord]) => {
            if (this.focusedElement && coord.x <= this.focusedElement.x) return acc;

            const distance = this.calculateDistance(this.focusedElement!, coord); //TODO

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, key };
          }, {});
          break;
        case 'ArrowUp':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [key, coord]) => {
            if (this.focusedElement && coord.y >= this.focusedElement.y) return acc;

            const distance = this.calculateDistance(this.focusedElement!, coord); //TODO

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, key };
          }, {});
          break;
        case 'ArrowDown':
          nextFocusedCandidate = candidates.reduce<INextFocusedCandidate>((acc, [key, coord]) => {
            if (this.focusedElement && coord.y <= this.focusedElement.y) return acc;

            const distance = this.calculateDistance(this.focusedElement!, coord); //TODO

            if (acc.distance && acc.distance < distance) return acc;
            return { distance, key };
          }, {});
          break;
      }

      if (nextFocusedCandidate?.key) {
        this.focusedElement?.setFocused(false);
        this.focusedElement = this.focusableElements[nextFocusedCandidate.key];
        this.focusedElement.setFocused(true);
      }
    }
  };

  constructor() {
    this.focusableElements = {};
    this.focusedElement = null;
    this.isStarted = false;
  }

  start(key: string) {
    if (!this.isStarted) {
      this.isStarted = true;
      this.focusedElement = this.focusableElements[key];
      this.focusedElement.setFocused(true);

      document.addEventListener('keydown', this.keydownListener);
    }
  }

  stop() {
    this.isStarted = false;
    this.focusedElement?.setFocused(false);
    this.focusedElement = null;

    document.removeEventListener('keydown', this.keydownListener);
  }

  addElement({ key, node, setFocused }: IAddElement) {
    const { x, y } = node.getBoundingClientRect();

    this.focusableElements[key] = {
      key,
      x,
      y,
      node,
      setFocused,
    };
  }

  removeElement(key: string) {
    delete this.focusableElements[key];
  }
}

export default new Navigation();
