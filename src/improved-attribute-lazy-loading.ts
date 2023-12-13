import { DomUtility } from './utilities/dom.utility';

export class ImprovedAttributeLazyLoading {
  private defaultCssSelector: string;
  private mediaElements: string[];
  private handleObserverReference: any;
  private intersectionObserver: IntersectionObserver | undefined;
  private timeout: number; // in ms

  constructor() {
    this.defaultCssSelector = 'audio, img[loading="lazy"], video';
    this.mediaElements = ['audio', 'video'];
    this.timeout = 1000;
  }

  private checkForVisibility(observedElement: Element): void {
    const target: HTMLElement = observedElement as HTMLElement;
    const isAnyPartOfElementRenderedOnPage: boolean = DomUtility.isAnyPartOfElementRenderedOnPage(target);
    const isMediaAutopauseUsed: boolean = typeof (target as HTMLMediaElement).dataset.mediaAutoplay === 'string';

    if (isAnyPartOfElementRenderedOnPage === false) {

      if (this.mediaElements.includes(target.nodeName.toLowerCase()) && isMediaAutopauseUsed && target.dataset.mediaAutopause === 'true') {
        (target as HTMLMediaElement).pause();
      }

      return;
    }

    switch (target.nodeName.toLowerCase()) {
      case 'audio':
      case 'video':

        if (this.mediaElements.includes(target.nodeName.toLowerCase())) {
          if (typeof (target as HTMLMediaElement).dataset.preload === 'string') {
            (target as HTMLMediaElement).preload = (target as HTMLMediaElement).dataset.preload as '' | 'none' | 'metadata' | 'auto';
          } else {
            (target as HTMLMediaElement).preload = 'metadata';
          }

          if (isMediaAutopauseUsed && (target as HTMLMediaElement).dataset.mediaAutoplay === 'true') {
            (target as HTMLMediaElement).play();
          }
        }

        break;

      case 'img':

        if (typeof (target as HTMLImageElement).dataset.src === 'string') {
          (target as HTMLImageElement).src = (target as HTMLImageElement).dataset.src as string;
        }

        break;

      default:
        break;
    }

    if (isMediaAutopauseUsed) {
      return;
    }

    this.intersectionObserver?.unobserve(target);
  }

  private processEntry(entry: IntersectionObserverEntry): void {
    window.setTimeout((): void => {
      window.requestAnimationFrame(this.checkForVisibility.bind(this, entry.target));
    },
    this.timeout);
  }

  private handleObserver(entries: IntersectionObserverEntry[], _observer: IntersectionObserver): void {
    for (const entry of entries) {
      if (entry.isIntersecting === false) {
        continue;
      }

      this.processEntry(entry);
    }
  }

  private createDebugEvents(cssSelector: string): void {
    const handleMediaChanges = (event: Event): void => {
      console.log(`Event type: ${event.type}, Element: `, event.target);
    };

    Array.from(document.querySelectorAll(cssSelector)).forEach((element: Element): void => {
      'play pause'.split(' ').forEach((eventType: string): void => {
        element.addEventListener(eventType, handleMediaChanges);
      });
    });
  }

  public uninstall(): void {
    if (this.intersectionObserver instanceof IntersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    this.handleObserverReference = undefined;
  }

  public install(timeout: number = 1000, cssSelector: string = this.defaultCssSelector, debug: boolean = false): void {
    this.timeout = timeout;

    const intersectionObserverOptions: IntersectionObserverInit = {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    };

    this.handleObserverReference = this.handleObserver.bind(this);
    this.intersectionObserver = new IntersectionObserver(this.handleObserverReference, intersectionObserverOptions);

    for (const element of Array.from(document.querySelectorAll(cssSelector))) {
      if (DomUtility.isAnyPartOfElementRenderedOnPage(element)) {

        if (typeof (element as HTMLMediaElement).dataset.mediaAutoplay === 'string' && (element as HTMLMediaElement).dataset.mediaAutoplay === 'true') {
          (element as HTMLMediaElement).play();
        }

        continue;
      }

      if (element.nodeName.toLowerCase() === 'img') {
        (element as HTMLImageElement).dataset.src = (element as HTMLImageElement).src;
        (element as HTMLImageElement).src = '';
      }

      this.intersectionObserver.observe(element);
    }

    if (debug) {
      this.createDebugEvents(cssSelector);
    }
  }
}
