import sharp from 'sharp'
import { readdir, stat, writeFile } from 'fs/promises'
import { join, extname, basename, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Resolve paths from the project root
const projectRoot = resolve(__dirname, '..')
const imagesDir = join(projectRoot, 'public', 'images')
const publicDir = join(projectRoot, 'public')

// Images to compress
const imagesToCompress = [
  // Project section images (public/images/...)
  { dir: imagesDir, path: 'Gaming-forum/games.png' },
  { dir: imagesDir, path: 'Plant-harvest/harvest.jpg' },
  { dir: imagesDir, path: 'Restaurent/foodix.png' },
  { dir: imagesDir, path: 'Villa-Booking/villa_booking.png' },
  { dir: imagesDir, path: 'SpillVision/test-oil_spill.jpg' },
  // Case Studies section
  { dir: imagesDir, path: 'Perk/image1.png' },
  { dir: imagesDir, path: 'Perk/image2.png' },
  // Other large images in /public root
  { dir: publicDir, path: 'glasspatch-screenshot.png' },
  { dir: publicDir, path: 'norams-auto-screenshot.png' },
  { dir: publicDir, path: 'dreambox-screenshot.png' },
  { dir: publicDir, path: 'chatchill-generic.png' },
  { dir: publicDir, path: 'bevel-razors.png' },
  { dir: publicDir, path: 'fisher-labs-sign.png' },
]

const MAX_WIDTH = 1400  // px — sufficient for full-width cards even on large screens
const JPEG_QUALITY = 82  // good quality/size balance

async function compressImage({ dir, path }) {
  const inputPath = join(dir, path)
  const ext = extname(path).toLowerCase()
  const name = basename(path)

  let s
  try {
    s = await stat(inputPath)
  } catch {
    console.log(`  ⚠️  Skipped (not found): ${path}`)
    return
  }

  const originalSize = s.size
  const image = sharp(inputPath)
  const meta = await image.metadata()

  // Only resize if wider than max
  const resized = meta.width > MAX_WIDTH
    ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : image

  let outBuffer

  if (ext === '.jpg' || ext === '.jpeg') {
    outBuffer = await resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
  } else if (ext === '.png') {
    // For large PNGs (screenshots), convert to JPEG for much better compression.
    // We save with the same .png extension — browser doesn't care about the actual format
    // as long as the mime type matches, but since Next.js serves static files, we'll
    // save as JPEG with .jpg extension and update paths accordingly, OR just use
    // PNG with max compression.
    // Strategy: use PNG with compression=9 + effort mode
    outBuffer = await resized.png({ compressionLevel: 9, effort: 10 }).toBuffer()
    
    // If PNG result is still > 800KB, fallback to JPEG (saves ~80% for screenshots)
    if (outBuffer.length > 800 * 1024) {
      outBuffer = await resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
    }
  }

  if (!outBuffer) {
    console.log(`  ⏭️  ${name}: Unsupported format`)
    return
  }

  if (outBuffer.length < originalSize) {
    await writeFile(inputPath, outBuffer)
    const savedKB = ((originalSize - outBuffer.length) / 1024).toFixed(0)
    const pct = (((originalSize - outBuffer.length) / originalSize) * 100).toFixed(0)
    console.log(`  ✅ ${name}: ${(originalSize / 1024).toFixed(0)}KB → ${(outBuffer.length / 1024).toFixed(0)}KB  (saved ${savedKB}KB / ${pct}%)`)
  } else {
    console.log(`  ⏭️  ${name}: Already optimal (${(originalSize / 1024).toFixed(0)}KB)`)
  }
}

console.log('🗜️  Compressing project & case study images...\n')
console.log(`   Images dir: ${imagesDir}`)
console.log(`   Public dir: ${publicDir}\n`)

for (const img of imagesToCompress) {
  await compressImage(img)
}

console.log('\n✨ Done! All images processed.')
