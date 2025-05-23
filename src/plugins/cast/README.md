# Plugin: Cast

Supports for Google Cast API.

## Overview

| <!-- -->         | <!-- -->                        |
| ---------------- | ------------------------------- |
| Name             | `cast`                          |
| Path             | `vlitejs/plugins/cast`          |
| Entry point      | `vlitejs/plugins/cast/cast.js`  |
| Stylesheet       | `vlitejs/plugins/cast/cast.css` |
| Provider&sup2;   | `'html5'`                       |
| Media type&sup3; | `'video'`                       |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/cast.css';
import Vlitejs from 'vlitejs';
import VlitejsCast from 'vlitejs/plugins/cast.js';

Vlitejs.registerPlugin('cast', VlitejsCast);

new Vlitejs('#player', {
  plugins: ['cast']
});
```

## Events

The plugin exposes the following native `Event` on the `.v-vlite` element.

| Event Type           | Description                                 |
| -------------------- | ------------------------------------------- |
| `castsessionstarted` | Sent when the cast session is established.  |
| `castsessionended`   | Sent when the cast session is disconnected. |

## Configuration

The plugin allows customization with an optional object as the third parameter of the `registerPlugin` function.

### Subtitle

Describes style information for a text subtitle.

```js
Vlitejs.registerPlugin('cast', VlitejsCast, {
  textTrackStyle: {
    backgroundColor: '#21212190'
  }
});
```

See the [TextTrackStyle](https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.TextTrackStyle) reference for available fields.

### Metadata

Describes media metadata description.

```js
Vlitejs.registerPlugin('cast', VlitejsCast, {
  metadata: {
    title: 'The Jungle Book',
    subtitle: 'Walt Disney Animation Studios'
  }
});
```

> [!NOTE]
> The `images` field automatically displays the poster available in the [Vlitejs options](../../../README.md#Options).

See the [Metadata](https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.GenericMediaMetadata) reference for available fields.
