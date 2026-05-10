enum AppConfig {
  Title = "EduRise",
  Subtitle = "Tingkatkan kemampuanmu, raih masa depan lebih baik",
}

const BaseURL = process.env.BASE_URL ?? "";

const defaultErrorMessage = 'Unexpected Server Error'

export { AppConfig };
export { BaseURL, defaultErrorMessage };
