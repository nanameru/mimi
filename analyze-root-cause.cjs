const fs = require('fs');
const path = require('path');

// 最新のファイルを取得
const debugDir = path.join(__dirname, 'debug-audio');
const files = fs.readdirSync(debugDir)
  .filter(f => f.startsWith('fish-audio-') && f.endsWith('.bin'))
  .map(f => ({
    name: f,
    path: path.join(debugDir, f),
    mtime: fs.statSync(path.join(debugDir, f)).mtime
  }))
  .sort((a, b) => b.mtime - a.mtime);

const filePath = files[0].path;
console.log(`Analyzing: ${files[0].name}\n`);

const data = fs.readFileSync(filePath);

// ログから、後続のチャンクの範囲を確認
// Chunk 19: range=[-7159, 4135], absMax=7159
// Chunk 20: range=[-7159, 4135], absMax=7159

// 実際のデータが保存されている範囲を確認
const chunkSize = 812;
console.log('=== ACTUAL DATA ANALYSIS ===');
console.log('Total chunks saved:', Math.floor(data.length / chunkSize));
console.log('File size:', data.length, 'bytes\n');

// 各チャンクの振幅を確認
for (let i = 0; i < Math.min(20, Math.floor(data.length / chunkSize)); i++) {
  const chunkStart = i * chunkSize;
  const chunkEnd = Math.min(chunkStart + chunkSize, data.length);
  const chunk = data.slice(chunkStart, chunkEnd);
  
  if (chunk.length < 2) continue;
  
  const samples = new Int16Array(chunk.buffer, chunk.byteOffset, chunk.length / 2);
  const samplesArray = Array.from(samples);
  const min = Math.min(...samplesArray);
  const max = Math.max(...samplesArray);
  const absMax = Math.max(Math.abs(min), Math.abs(max));
  const uniqueValues = new Set(samplesArray).size;
  
  console.log(`Chunk ${i + 1}: range=[${min}, ${max}], absMax=${absMax}, unique=${uniqueValues}`);
  
  // チャンク19と20を詳細に分析
  if (i === 18 || i === 19) {
    console.log(`  First 20 samples: ${samplesArray.slice(0, 20).join(', ')}`);
    console.log(`  Sample distribution: ${Object.entries(samplesArray.reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {})).slice(0, 5).map(([v, c]) => `${v}:${c}`).join(', ')}`);
  }
}

console.log('\n=== CRITICAL ANALYSIS ===');
console.log('Looking at the actual problem:');

// ログから、Chunk 19では range=[-7159, 4135] となっているが、
// 実際のファイルではどのようになっているか確認
const chunk19Start = 18 * chunkSize;
if (chunk19Start < data.length) {
  const chunk19 = data.slice(chunk19Start, Math.min(chunk19Start + chunkSize, data.length));
  const samples19 = new Int16Array(chunk19.buffer, chunk19.byteOffset, chunk19.length / 2);
  const samples19Array = Array.from(samples19);
  const min19 = Math.min(...samples19Array);
  const max19 = Math.max(...samples19Array);
  const absMax19 = Math.max(Math.abs(min19), Math.abs(max19));
  
  console.log('\nChunk 19 (should have normal amplitude):');
  console.log('  Range:', min19, 'to', max19);
  console.log('  AbsMax:', absMax19);
  console.log('  Expected from log: range=[-7159, 4135], absMax=7159');
  
  if (absMax19 < 100) {
    console.log('  ⚠️ PROBLEM: Actual data does NOT match log!');
    console.log('  ⚠️ The saved file only contains the first 10 chunks (silence)');
    console.log('  ⚠️ This means the analysis is incomplete');
  } else {
    console.log('  ✓ Data matches log');
  }
}

// 問題の原因を推測
console.log('\n=== ROOT CAUSE ANALYSIS ===');
console.log('Based on the logs:');
console.log('1. First 10 chunks: range=[-1, 0] (silence or corrupted)');
console.log('2. Chunk 11-20: amplitude gradually increases to 7159');
console.log('3. Chunk 20+: normal amplitude range');
console.log('\nPossible causes of "garbled audio":');
console.log('1. First chunks are sent as-is (silence), causing audio gaps');
console.log('2. Data format mismatch: normalized data interpreted as Int16');
console.log('3. Sample rate mismatch: 44100Hz expected but different rate returned');
console.log('4. Endianness issue: wrong byte order');

// 推奨される解決策
console.log('\n=== RECOMMENDED SOLUTION ===');
console.log('The "garbled audio" is likely caused by:');
console.log('- First chunks containing silence/corrupted data being sent to LiveKit');
console.log('- These chunks are processed BEFORE gain calibration completes');
console.log('- Solution: Skip or drop chunks until amplitude > threshold');

