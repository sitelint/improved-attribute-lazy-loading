declare class ImprovedAttributeLazyLoading {
    private defaultCssSelector;
    private mediaElements;
    private handleObserverReference;
    private intersectionObserver;
    private timeout;
    constructor();
    private checkForVisibility;
    private processEntry;
    private handleObserver;
    uninstall(): void;
    install(timeout?: number, cssSelector?: string): void;
}

export { ImprovedAttributeLazyLoading };
