/**
 * Automated Brand Asset Pipeline
 * Downloads master logo from gsgroups.net and generates all web/PWA assets.
 * Run: node scripts/generate-brand-assets.js
 */

const https  = require('https')
const http   = require('http')
const fs     = require('fs')
const path   = require('path')
const sharp  = require('sharp')

// ── Config ────────────────────────────────────────────────────────────────────

const LOGO_URL      = 'https://www.gsgroups.net/gslogo.png'
const LOGO_TMP      = path.join(__dirname, '../.tmp-logo-master.png')
const LOGO_OPT      = path.join(__dirname, '../src/assets/logo.png')
const PUBLIC_DIR    = path.join(__dirname, '../public')
const UI_ASSETS_DIR = path.join(__dirname, '../src/assets')

// Solid background colour for assets that must not be transparent (iOS, apple-touch)
const BG_WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

// ── Helpers ───────────────────────────────────────────────────────────────────

function mkdirs(...dirs) {
  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }))
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http
    const file  = fs.createWriteStream(dest)
    proto.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve(dest) })
      file.on('error',  reject)
    }).on('error', reject)
  })
}

/**
 * Build a single-file .ico binary containing multiple RIFF PNG chunks.
 * ICO format: 6-byte header + N×16-byte directory entries + N raw PNG blobs.
 */
function buildIco(layers) {
  // layers = [{ width, height, data: Buffer<PNG> }]
  const n          = layers.length
  const headerSize = 6
  const dirSize    = 16 * n
  let   offset     = headerSize + dirSize

  const header = Buffer.alloc(6)
  header.writeUInt16LE(0,    0) // reserved
  header.writeUInt16LE(1,    2) // type: 1 = ICO
  header.writeUInt16LE(n,    4) // image count

  const dirs = []
  layers.forEach(({ width, height, data }) => {
    const dir = Buffer.alloc(16)
    dir.writeUInt8(width  >= 256 ? 0 : width,   0)
    dir.writeUInt8(height >= 256 ? 0 : height,  1)
    dir.writeUInt8(0,   2)  // color count (0 = 256+)
    dir.writeUInt8(0,   3)  // reserved
    dir.writeUInt16LE(1, 4) // color planes
    dir.writeUInt16LE(32, 6) // bits per pixel
    dir.writeUInt32LE(data.length, 8)
    dir.writeUInt32LE(offset,      12)
    offset += data.length
    dirs.push(dir)
  })

  return Buffer.concat([header, ...dirs, ...layers.map(l => l.data)])
}

// ── Pipeline ──────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n🚀  Brand Asset Pipeline Starting\n')

  mkdirs(PUBLIC_DIR, UI_ASSETS_DIR, path.join(__dirname, '../.'))

  // 1. Download master logo
  console.log('⬇   Downloading master logo …')
  await download(LOGO_URL, LOGO_TMP)
  console.log('✓   Master logo saved to', LOGO_TMP)

  const master = sharp(LOGO_TMP)
  const meta   = await master.metadata()
  console.log(`    Source: ${meta.width}×${meta.height} ${meta.format} (${meta.hasAlpha ? 'RGBA' : 'RGB'})\n`)

  // ── Web Favicons & PWA Icons ─────────────────────────────────────────────────

  // favicon-16x16.png
  await sharp(LOGO_TMP).resize(16, 16).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC_DIR, 'favicon-16x16.png'))
  console.log('✓   favicon-16x16.png')

  // favicon-32x32.png
  await sharp(LOGO_TMP).resize(32, 32).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'))
  console.log('✓   favicon-32x32.png')

  // favicon.ico  (16, 32, 48 embedded)
  const icoSizes = [16, 32, 48]
  const icoLayers = await Promise.all(
    icoSizes.map(async size => ({
      width:  size,
      height: size,
      data:   await sharp(LOGO_TMP).resize(size, size).png().toBuffer(),
    }))
  )
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), buildIco(icoLayers))
  console.log('✓   favicon.ico  (16, 32, 48)')

  // apple-touch-icon.png  180×180 — flat white BG, no transparency (App Store compliant)
  await sharp(LOGO_TMP)
    .resize(180, 180, { fit: 'contain', background: BG_WHITE })
    .flatten({ background: BG_WHITE })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
  console.log('✓   apple-touch-icon.png  (180×180, white bg)')

  // android-chrome-192x192.png
  await sharp(LOGO_TMP).resize(192, 192).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'))
  console.log('✓   android-chrome-192x192.png')

  // android-chrome-512x512.png
  await sharp(LOGO_TMP).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'))
  console.log('✓   android-chrome-512x512.png')

  // ── site.webmanifest ─────────────────────────────────────────────────────────
  const manifest = {
    name:             'AI App Builder',
    short_name:       'AppBuilder',
    description:      'Industry-grade AI prompt sandbox for generating production-ready applications.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#030712',
    theme_color:      '#6366f1',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2))
  console.log('✓   site.webmanifest')

  // ── Optimised in-app logo ─────────────────────────────────────────────────────
  // High-density 2× ready: 400px wide, compressed PNG
  await sharp(LOGO_TMP)
    .resize(400, null, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toFile(LOGO_OPT)
  console.log('✓   src/assets/logo.png  (400px, high-density compressed)')

  // ── Cleanup ───────────────────────────────────────────────────────────────────
  fs.unlinkSync(LOGO_TMP)
  console.log('\n✅  Pipeline complete. All assets written.\n')

  // ── File tree report ──────────────────────────────────────────────────────────
  const report = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '  Asset Verification Checklist',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ...[
      'public/favicon.ico',
      'public/favicon-16x16.png',
      'public/favicon-32x32.png',
      'public/apple-touch-icon.png',
      'public/android-chrome-192x192.png',
      'public/android-chrome-512x512.png',
      'public/site.webmanifest',
      'src/assets/logo.png',
    ].map(f => {
      const full = path.join(__dirname, '..', f)
      const exists = fs.existsSync(full)
      const size   = exists ? `${(fs.statSync(full).size / 1024).toFixed(1)} KB` : 'MISSING'
      return `  ${exists ? '✓' : '✗'} ${f.padEnd(40)} ${size}`
    }),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
  ]
  console.log(report.join('\n'))
}

run().catch(err => { console.error('Pipeline failed:', err); process.exit(1) })
