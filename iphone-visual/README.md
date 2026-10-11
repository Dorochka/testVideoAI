# iHub Pay — iPhone visual

Remotion composition: `IPhoneVisual`, 1080 × 1920, 30 fps, 150 frames (5 seconds).

The iPhone rotates from a side angle. Screen 1 is shown first, then slides to screen 2 between 2.25 and 2.8 seconds. The background is dark with a mint glow.

## Screenshots

Original screenshots loaded from Dorochka/testVideoAI, main commit 0036b0913a020e3611924ce9df72a7132e4f08d5. `1ihubpay.jpg` is used as `public/screen-1.jpg` (Codes); `2ihubpay.jpg` as `public/screen-2.jpg` (Applications). Composition props `firstScreen` and `secondScreen` allow replacing them.

## Develop

Use the existing checkout; a separate Git worktree is unnecessary.

```sh
cd iphone-visual
npm ci
npm run dev -- --no-open --port=3000
```

Run these commands from the repository root. Open the `IPhoneVisual` composition in Studio. Processes must be restarted in new tasks. In the Codex cloud environment, if npm requires proxy configuration, use `npm_config_cache=/workspace/.npm-cache npm_config_proxy="$HTTPS_PROXY" npm_config_https_proxy="$HTTPS_PROXY" npm ci`.

## Validate

```sh
npm run lint
npx remotion still src/index.ts IPhoneVisual out/check-first.png --frame=45 --browser-executable=/usr/bin/chromium
npx remotion still src/index.ts IPhoneVisual out/check-second.png --frame=110 --browser-executable=/usr/bin/chromium
```

## Export

```sh
npx remotion render src/index.ts IPhoneVisual out/ihub-pay-5s.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --concurrency=2
```

Output: H.264 MP4, 1080 × 1920, 30 fps, 5 seconds, no audio.

For the same broadly compatible output as the published MP4, run after rendering (requires FFmpeg):

```sh
ffmpeg -i out/ihub-pay-5s.mp4 -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -color_range tv -movflags +faststart -an out/ihub-pay-5s-compatible.mp4 -y
```

The Chromium path above is for the current Linux cloud environment. On another machine, omit `--browser-executable=/usr/bin/chromium` to use the Remotion-managed browser.

## Reuse

Keep the existing animation and replace `public/screen-1.jpg` and `public/screen-2.jpg` with new screenshots. For future requests, reference the `iphone-visual` folder and the `IPhoneVisual` composition. The editable animation and timings are in `src/Composition.tsx`.
