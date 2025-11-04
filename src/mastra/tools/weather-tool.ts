import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { sendWeatherArtifact } from '../../artifacts/index.js';

interface GeocodingResponse {
  results: {
    latitude: number;
    longitude: number;
    name: string;
  }[];
}
interface WeatherResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    weather_code: number;
  };
}

export const weatherTool = createTool({
  id: 'get-weather',
  description: 'Get current weather for a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    windGust: z.number(),
    conditions: z.string(),
    location: z.string(),
  }),
  execute: async ({ context, runtimeContext }: any) => {
    console.log('[Weather Tool] Fetching weather for:', context.location);
    
    const weatherData = await getWeather(context.location);
    
    // アーティファクトとして画面に表示
    if (runtimeContext?.room) {
      console.log('[Weather Tool] Sending artifact to frontend');
      await sendWeatherArtifact(runtimeContext.room, {
        kind: 'weather',
        data: {
          location: weatherData.location,
          temperature: Math.round(weatherData.temperature),
          condition: translateCondition(weatherData.conditions),
          icon: getWeatherEmoji(weatherData.conditions),
          humidity: weatherData.humidity,
          windSpeed: Math.round(weatherData.windSpeed),
        },
      });
    } else {
      console.warn('[Weather Tool] No room context available, artifact not sent');
    }
    
    return weatherData;
  },
});

// 日本語の地名を英語に変換するマッピング
const locationMapping: Record<string, string> = {
  '東京': 'Tokyo',
  '東京都': 'Tokyo',
  '大阪': 'Osaka',
  '大阪府': 'Osaka',
  '京都': 'Kyoto',
  '京都府': 'Kyoto',
  '横浜': 'Yokohama',
  '名古屋': 'Nagoya',
  '福岡': 'Fukuoka',
  '札幌': 'Sapporo',
  '仙台': 'Sendai',
  '広島': 'Hiroshima',
  '新潟': 'Niigata',
  '神戸': 'Kobe',
  '千葉': 'Chiba',
  '埼玉': 'Saitama',
  '埼玉県': 'Saitama',
  '千葉県': 'Chiba',
  '神奈川': 'Kanagawa',
  '神奈川県': 'Kanagawa',
  '愛知': 'Aichi',
  '愛知県': 'Aichi',
  '兵庫': 'Hyogo',
  '兵庫県': 'Hyogo',
  '北海道': 'Hokkaido',
  '沖縄': 'Okinawa',
  '沖縄県': 'Okinawa',
  'ニューヨーク': 'New York',
  'ロンドン': 'London',
  'パリ': 'Paris',
  'ロサンゼルス': 'Los Angeles',
  'シカゴ': 'Chicago',
  'シドニー': 'Sydney',
  'メルボルン': 'Melbourne',
  'バンクーバー': 'Vancouver',
  'トロント': 'Toronto',
  'シンガポール': 'Singapore',
  '香港': 'Hong Kong',
  'ソウル': 'Seoul',
  '北京': 'Beijing',
  '上海': 'Shanghai',
  'バンコク': 'Bangkok',
  'マニラ': 'Manila',
  'ジャカルタ': 'Jakarta',
};

// 日本語の地名を英語に変換
function translateLocation(location: string): string {
  // マッピングに存在する場合は英語名を返す
  if (locationMapping[location]) {
    return locationMapping[location]!;
  }
  
  // 部分一致でマッピングを確認（例：「東京の天気」→「東京」）
  for (const [japanese, english] of Object.entries(locationMapping)) {
    if (location.includes(japanese)) {
      return english;
    }
  }
  
  // マッピングにない場合はそのまま返す（英語名の場合など）
  return location;
}

const getWeather = async (location: string) => {
  // 日本語の地名を英語に変換
  const translatedLocation = translateLocation(location);
  console.log(`[Weather Tool] Original location: "${location}", Translated: "${translatedLocation}"`);
  
  // 複数の検索クエリを試す（英語名、英語名+国名）
  const searchQueries = [
    translatedLocation,
    `${translatedLocation}, Japan`,
    location, // 元の文字列も試す
  ];
  
  let geocodingData: GeocodingResponse | null = null;
  
  for (const query of searchQueries) {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=ja`;
    console.log(`[Weather Tool] Trying geocoding query: "${query}"`);
    
    try {
      const geocodingResponse = await fetch(geocodingUrl);
      const data = (await geocodingResponse.json()) as GeocodingResponse;
      
      if (data.results?.[0]) {
        geocodingData = data;
        console.log(`[Weather Tool] Found location: "${data.results[0].name}"`);
        break;
      }
    } catch (error) {
      console.warn(`[Weather Tool] Geocoding query failed for "${query}":`, error);
      continue;
    }
  }

  if (!geocodingData?.results?.[0]) {
    throw new Error(`Location '${location}' not found. Please try using the English name or a more specific location name.`);
  }

  const { latitude, longitude, name } = geocodingData.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code`;

  const response = await fetch(weatherUrl);
  const data = (await response.json()) as WeatherResponse;

  return {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windGust: data.current.wind_gusts_10m,
    conditions: getWeatherCondition(data.current.weather_code),
    location: name,
  };
};

function getWeatherCondition(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return conditions[code] || 'Unknown';
}

// 英語の天気を日本語に翻訳
function translateCondition(condition: string): string {
  const translations: Record<string, string> = {
    'Clear sky': '快晴',
    'Mainly clear': '晴れ',
    'Partly cloudy': '曇り時々晴れ',
    'Overcast': '曇り',
    'Foggy': '霧',
    'Light drizzle': '霧雨',
    'Moderate drizzle': '小雨',
    'Dense drizzle': '雨',
    'Slight rain': '小雨',
    'Moderate rain': '雨',
    'Heavy rain': '大雨',
    'Slight snow fall': '小雪',
    'Moderate snow fall': '雪',
    'Heavy snow fall': '大雪',
    'Thunderstorm': '雷雨',
  };
  return translations[condition] || condition;
}

// 天気に対応する絵文字を取得
function getWeatherEmoji(condition: string): string {
  const emojis: Record<string, string> = {
    'Clear sky': '☀️',
    'Mainly clear': '🌤️',
    'Partly cloudy': '⛅',
    'Overcast': '☁️',
    'Foggy': '🌫️',
    'Light drizzle': '🌦️',
    'Moderate drizzle': '🌧️',
    'Dense drizzle': '🌧️',
    'Slight rain': '🌧️',
    'Moderate rain': '🌧️',
    'Heavy rain': '⛈️',
    'Slight snow fall': '🌨️',
    'Moderate snow fall': '❄️',
    'Heavy snow fall': '❄️',
    'Thunderstorm': '⛈️',
  };
  return emojis[condition] || '🌤️';
}
