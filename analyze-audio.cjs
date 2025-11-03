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

if (files.length === 0) {
  console.error('No debug files found');
  process.exit(1);
}

const filePath = files[0].path;
console.log(`Analyzing: ${files[0].name}`);
console.log(`File size: ${fs.statSync(filePath).size} bytes\n`);

const data = fs.readFileSync(filePath);

// 基本情報
console.log('=== BASIC INFO ===');
console.log('File size:', data.length, 'bytes');
console.log('First 32 bytes (hex):', data.slice(0, 32).toString('hex'));
console.log('First 32 bytes (decimal):', Array.from(data.slice(0, 32)).join(', '));

// Int16として解釈
console.log('\n=== INT16 ANALYSIS ===');
const samples = new Int16Array(data.buffer, data.byteOffset, data.length / 2);
const samplesArray = Array.from(samples);
const min = Math.min(...samplesArray);
const max = Math.max(...samplesArray);
const absMax = Math.max(Math.abs(min), Math.abs(max));
console.log('Total samples:', samples.length);
console.log('Sample range:', min, 'to', max);
console.log('Absolute max:', absMax);
console.log('Percentage of Int16 range:', ((absMax / 32767) * 100).toFixed(2) + '%');

// 値の分布
const valueCounts = {};
samplesArray.forEach(s => {
  valueCounts[s] = (valueCounts[s] || 0) + 1;
});
const uniqueValues = Object.keys(valueCounts).map(Number).sort((a, b) => b - a);
console.log('Unique values:', uniqueValues.length);
console.log('Top 10 values:', uniqueValues.slice(0, 10).map(v => `${v}:${valueCounts[v]}`).join(', '));

// ゼロと-1の割合
const zeroCount = (valueCounts[0] || 0);
const minusOneCount = (valueCounts[-1] || 0);
console.log('Zero samples:', zeroCount, `(${((zeroCount / samples.length) * 100).toFixed(2)}%)`);
console.log('-1 samples:', minusOneCount, `(${((minusOneCount / samples.length) * 100).toFixed(2)}%)`);

// エントロピー
console.log('\n=== ENTROPY ANALYSIS ===');
const sampleSize = Math.min(1000, data.length);
const byteCounts = new Array(256).fill(0);
for (let i = 0; i < sampleSize; i++) {
  byteCounts[data[i]]++;
}
let entropy = 0;
for (let i = 0; i < 256; i++) {
  if (byteCounts[i] > 0) {
    const p = byteCounts[i] / sampleSize;
    entropy -= p * Math.log2(p);
  }
}
console.log('Entropy:', entropy.toFixed(2), '(normal PCM: ~7-8, compressed: < 5)');

// バイト頻度
const topBytes = byteCounts.map((count, byte) => ({ byte, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);
console.log('Top 10 bytes:', topBytes.map(({byte, count}) => `0x${byte.toString(16).padStart(2, '0').toUpperCase()}:${count}`).join(', '));

// チャンクごとの分析（最初の10チャンク、各約800バイト）
console.log('\n=== CHUNK-BY-CHUNK ANALYSIS ===');
const chunkSize = 812; // ログから最初のチャンクサイズ
const numChunks = Math.min(10, Math.floor(data.length / chunkSize));
for (let i = 0; i < numChunks; i++) {
  const chunkStart = i * chunkSize;
  const chunkEnd = Math.min(chunkStart + chunkSize, data.length);
  const chunk = data.slice(chunkStart, chunkEnd);
  const chunkSamples = new Int16Array(chunk.buffer, chunk.byteOffset, chunk.length / 2);
  const chunkSamplesArray = Array.from(chunkSamples);
  const chunkMin = Math.min(...chunkSamplesArray);
  const chunkMax = Math.max(...chunkSamplesArray);
  const chunkAbsMax = Math.max(Math.abs(chunkMin), Math.abs(chunkMax));
  console.log(`Chunk ${i + 1}: range=[${chunkMin}, ${chunkMax}], absMax=${chunkAbsMax}, unique=${new Set(chunkSamplesArray).size}`);
}

// データ形式の判定
console.log('\n=== FORMAT DETECTION ===');

// MP3チェック
const firstBytes = data.slice(0, 4);
const hexString = firstBytes.toString('hex').toUpperCase();
if (hexString.startsWith('FF')) {
  const secondByte = firstBytes[1];
  const mp3SyncPatterns = [0xFB, 0xF3, 0xF2, 0xFA, 0xE3, 0xE2, 0xE1, 0xE0];
  if (mp3SyncPatterns.includes(secondByte)) {
    console.log('✓ MP3 format detected');
  } else {
    console.log('⚠️ First bytes suggest MP3-like pattern but no sync pattern match');
  }
} else {
  console.log('✗ Not MP3 format');
}

// WAVチェック
if (data.length >= 12) {
  const riff = data.slice(0, 4).toString('ascii');
  const wave = data.slice(8, 12).toString('ascii');
  if (riff === 'RIFF' && wave === 'WAVE') {
    console.log('✓ WAV format detected');
  } else {
    console.log('✗ Not WAV format');
  }
}

// PCM形式の可能性
console.log('\n=== CONCLUSION ===');
if (uniqueValues.length === 2 && uniqueValues.includes(0) && uniqueValues.includes(-1)) {
  console.log('⚠️ DATA APPEARS TO BE CORRUPTED OR INVALID PCM');
  console.log('  - Only two values: -1 and 0');
  console.log('  - This is NOT normal PCM audio data');
  console.log('  - Possible causes:');
  console.log('    1. Data is compressed (MP3/Opus) being interpreted as PCM');
  console.log('    2. Data is corrupted or incomplete');
  console.log('    3. Data format mismatch (e.g., Float32 interpreted as Int16)');
} else if (absMax < 100) {
  console.log('⚠️ AMPLITUDE IS EXTREMELY LOW');
  console.log(`  - Max amplitude: ${absMax} (${((absMax / 32767) * 100).toFixed(2)}% of Int16 range)`);
  console.log('  - This suggests normalized data or incorrect format interpretation');
} else {
  console.log('✓ Data appears to be valid PCM (but amplitude is low)');
}

