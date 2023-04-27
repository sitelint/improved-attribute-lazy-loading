export class DomUtility {
  private static currentVisibleViewportSize: { height: number; width: number } | null = null;

  public static getBodyElement(): HTMLElement {
    return document.body ? document.body : document.getElementsByTagName('body')[0];
  }

  public static getRootElement(): HTMLElement {
    return document.documentElement || document.getElementsByTagName('html')[0];
  }

  public static getCurrentVisibleViewportSize(): { height: number; width: number } {
    if (DomUtility.currentVisibleViewportSize) {
      return DomUtility.currentVisibleViewportSize;
    }

    return {
      height: window.innerHeight || document.documentElement.clientHeight,
      width: window.innerWidth || document.documentElement.clientWidth
    };
  }

  public static updatePageSize(): void {
    DomUtility.currentVisibleViewportSize = DomUtility.getCurrentVisibleViewportSize();
  }

  public static isAnyPartOfElementRenderedOnPage(element: Element): boolean {
    const rect: DOMRect = element.getBoundingClientRect();

    if (rect.height === 0 && rect.width === 0) {
      return false;
    }

    const pageSize: { height: number; width: number } = DomUtility.getCurrentVisibleViewportSize();

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const verticalInView: boolean = (rect.top <= pageSize.height) && ((rect.top + rect.height) >= 0);
    const horizontalInView: boolean = (rect.left <= pageSize.width) && ((rect.left + rect.width) >= 0);

    return (verticalInView && horizontalInView);
  }

}
