# Improving attribute lazy loading

Optimizing lazy loading for image, video, and audio that includes time visibility in the viewport. In other words, if the image, video, audio is not minimum 1 second in the browser viewport then don't load it.

## Features

* Set `preload` attribute value on `<video>` or `<audio>` element once it's in the viewport.
* Load the image `<img>`, `<video>` or `<audio>` when it's visible for at least 1 second in the viewport. This will prevent fetching the image while the user scrolls fast through the page.
* Pause and resume automatically playing `<video>` or `<audio>` when it's not in the viewport. This is configurable.

## Settings

### Automatically play and pause depending on the visibility in the viewport

For scenarios where you want to play video automatically when it's in the viewport and pause when it's outside of the viewport, you may use `data-media-autoplay="true"` and `data-media-autopause="true"`.

```HTML
<video src="video/ljubljana-in-4k.mp4" data-media-autoplay="true" data-media-autopause="true" loop muted preload="none" poster="video/ljubljana-in-4k.thumbnail.jpg"></video>
```

## Demo

[Improving attribute lazy loading](https://www.sitelint.com/lab/improved-attribute-lazy-loading/)

## Benefits

* For `<audio>` and `<video>` elements this will help to avoid preloading the whole media file or metadata only.
* For `<img>` element this will help to fetch the image only when it's visible within the viewport for more than 1 second. **There is no need to fetch the image while the user scrolls fast the page**.

## Getting started

### NPM

```bash
npm install @sitelintcode/improved-attribute-lazy-loading --save
```

## HTML

Example code with minimum requirements.

```HTML
<audio preload="none" data-preload="metadata"></audio>
<video preload="none" data-preload="metadata"></video>
<img loading="lazy">
```

## TypeScript

Following options are available:

* `timeout`: number, default: `1000` (in ms). Set the timeout after which visibility should be checked.
* `cssSelector`: string, default: `audio, img[loading="lazy"], video`
* `debug`: boolean, default: `false`. Settings it to `true` will help to set event listeners: `play`, `pause` to each media element so you can track it's state when they are in the viewport or outside.

```TypeScript
import { ImprovedAttributeLazyLoading } from '@sitelintcode/improved-attribute-lazy-loading';

const improvedAttributeLazyLoading: ImprovedAttributeLazyLoading = new ImprovedAttributeLazyLoading();

improvedAttributeLazyLoading.install(timeout, cssSelector);
```

## Browser environment

Note that options passed to method `install` are the same as above.

```HTML
<script src="https://cdn.jsdelivr.net/npm/@sitelintcode/improved-attribute-lazy-loading@0.0.1/dist/improved-attribute-lazy-loading.js"></script>
<script>
(function() {
  const improvedAttributeLazyLoading = new window.sitelint.ImprovedAttributeLazyLoading();
  improvedAttributeLazyLoading.install();
}())
</script>
```

### Notes

Note the version number in the jsdelivr URL: **0.0.1**. Don't forget to set desired version. You may check releases: https://github.com/sitelint/improved-attribute-lazy-loading/releases

Worth to mention that [jsdelivr](https://www.jsdelivr.com) suggests:

> Omit the version completely or use latest to load the latest one (not recommended for production usage).

## Technical

1. `import { terser } from "rollup-plugin-terser";` was replaced with  `import { terser } from "rollup-plugin-minification";` because `rollup-plugin-terser` is not compatible with Rollup 3.x version. See: https://github.com/TrySound/rollup-plugin-terser/issues/119

## Contributing

Contributions are welcome, and greatly appreciated! Contributing doesn't just mean submitting pull requests. There are many different ways for you to get involved, including answering questions on the issues, reporting or triaging bugs, and participating in the features evolution process.

## License

MOZILLA PUBLIC LICENSE, VERSION 2.0
