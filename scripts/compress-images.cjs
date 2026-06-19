const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const imagesDir = path.join(projectRoot, 'public', 'images')
const publicDir = path.join(projectRoot, 'public')

const imagesToCompress = [
  // Projects section
  { dir: imagesDir, rel: 'Gaming-forum/games.png' },
  { dir: imagesDir, rel: 'Plant-harvest/harvest.jpg' },
  { dir: imagesDir, rel: 'Restaurent/foodix.png' },
  { dir: imagesDir, rel: 'Villa-Booking/villa_booking.png' },
  { dir: imagesDir, rel: 'SpillVision/test-oil_spill.jpg' },
  // Case Studies
  { dir: imagesDir, rel: 'Perk/image1.png' },
  { dir: imagesDir, rel: 'Perk/image2.png' },
  // Other large images in /public root
  { dir: publicDir, rel: 'glasspatch-screenshot.png' },
  { dir: publicDir, rel: 'norams-auto-screenshot.png' },
  { dir: publicDir, rel: 'dreambox-screenshot.png' },
  { dir: publicDir, rel: 'chatchill-generic.png' },
  { dir: publicDir, rel: 'bevel-razors.png' },
  { dir: publicDir, rel: 'fisher-labs-sign.png' },
]

const MAX_WIDTH = 1400
const JPEG_QUALITY = 82

async function compressOne({ dir, rel }) {
  const inputPath = path.join(dir, rel)
  const ext = path.extname(rel).toLowerCase()
  const name = path.basename(rel)
  const tmpPath = inputPath + '.__tmp__'

  if (!fs.existsSync(inputPath)) {
    console.log(`  ⚠️  Skipped (not found): ${rel}`)
    return
  }

  const originalSize = fs.statSync(inputPath).size
  const meta = await sharp(inputPath).metadata()
  
  const resizeOpts = meta.width > MAX_WIDTH
    ? { width: MAX_WIDTH, withoutEnlargement: true }
    : null

  let info
  try {
    let pipeline = sharp(inputPath)
    if (resizeOpts) pipeline = pipeline.resize(resizeOpts)

    if (ext === '.jpg' || ext === '.jpeg') {
      info = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath)
    } else if (ext === '.png') {
      // Try PNG first
      info = await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(tmpPath)
      // If still large (>700KB), convert to JPEG for screenshots
      if (info.size > 700 * 1024) {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
        let pipeline2 = sharp(inputPath)
        if (resizeOpts) pipeline2 = pipeline2.resize(resizeOpts)
        info = await pipeline2.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath)
      }
    } else {
      console.log(`  ⏭️  ${name}: Unsupported format (${ext})`)
      return
    }
  } catch (e) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
    console.log(`  ❌ ${name}: Error - ${e.message}`)
    return
  }

  if (info.size < originalSize) {
    // Replace original with compressed version
    fs.unlinkSync(inputPath)
    fs.renameSync(tmpPath, inputPath)
    const savedKB = Math.round((originalSize - info.size) / 1024)
    const pct = Math.round(((originalSize - info.size) / originalSize) * 100)
    const beforeKB = Math.round(originalSize / 1024)
    const afterKB = Math.round(info.size / 1024)
    console.log(`  ✅ ${name.padEnd(35)} ${beforeKB}KB → ${afterKB}KB  (saved ${savedKB}KB / ${pct}%)`)
  } else {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
    console.log(`  ⏭️  ${name.padEnd(35)} Already optimal (${Math.round(originalSize / 1024)}KB)`)
  }
}

async function main() {
  console.log('🗜️  Compressing project & case study images...\n')
  for (const item of imagesToCompress) {
    await compressOne(item)
  }
  console.log('\n✨ Done!')
}

main().catch(console.error)
