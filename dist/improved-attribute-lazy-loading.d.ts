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
    private createDebugEvents;
    uninstall(): void;
    install(timeout?: number, cssSelector?: string, debug?: boolean): void;
}

export { ImprovedAttributeLazyLoading };
