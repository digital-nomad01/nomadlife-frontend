interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  description: string;
  icon: string;
}

export async function getWeatherByCoordinates(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      console.warn("OpenWeather API key not configured");
      return null;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      console.error(`Weather API request failed: ${response.status} ${response.statusText}`);
      return null; // Return null instead of throwing
    }

    const data = await response.json();

    // Validate that we have the required data
    if (!data.main || !data.weather || !data.weather[0]) {
      console.error("Invalid weather data received:", data);
      return null;
    }

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main || "Unknown",
      humidity: data.main.humidity || 0,
      description: data.weather[0].description || "No description",
      icon: data.weather[0].icon || "",
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null; // Always return null on error instead of throwing
  }
}

export async function getWeatherByCity(
  city: string
): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      console.warn("OpenWeather API key not configured");
      return null;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      console.error(`Weather API request failed for city ${city}: ${response.status} ${response.statusText}`);
      return null; // Return null instead of throwing
    }

    const data = await response.json();

    // Validate that we have the required data
    if (!data.main || !data.weather || !data.weather[0]) {
      console.error("Invalid weather data received for city:", city, data);
      return null;
    }

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main || "Unknown",
      humidity: data.main.humidity || 0,
      description: data.weather[0].description || "No description",
      icon: data.weather[0].icon || "",
    };
  } catch (error) {
    console.error("Error fetching weather for city:", city, error);
    return null; // Always return null on error instead of throwing
  }
}
